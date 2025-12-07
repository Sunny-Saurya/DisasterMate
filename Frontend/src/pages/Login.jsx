import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const LoginPage = ({ navigate, onLogin }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            console.log('Sending login request...');
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);

            if (data.success) {
                // Store token in localStorage
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('user', JSON.stringify(data.data));
                onLogin();
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error details:', error);
            setError(`Network error: ${error.message}. Make sure backend is running on port 5000.`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white">
            <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-900/40 z-10"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
                
                <div className="relative z-20 max-w-lg px-12 text-center">
                    <Shield className="w-20 h-20 text-blue-500 mx-auto mb-8" />
                    <h2 className="text-4xl font-bold text-white mb-6">Always Prepared.</h2>
                    <p className="text-slate-300 text-lg">Join over 1 million users trusting DisasterMate for their family's safety and emergency planning.</p>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
                <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
                        <p className="text-slate-500 mt-2">Enter your credentials to access the command center.</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input 
                            label="Email Address" 
                            name="email"
                            type="email"
                            placeholder="alex@example.com" 
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <Input 
                            label="Password" 
                            name="password"
                            type="password" 
                            placeholder="••••••••" 
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center text-slate-600 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 mr-2" />
                                Remember me
                            </label>
                            <a href="#" className="font-semibold text-blue-600 hover:text-blue-500">Forgot password?</a>
                        </div>

                        <Button fullWidth className="h-12 shadow-lg shadow-blue-600/20 text-lg">
                            {isLoading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Securing Access...
                                </span>
                            ) : "Sign In"}
                        </Button>
                    </form>
                    
                    <p className="mt-8 text-center text-slate-500 text-sm">
                        Don't have an account? <a onClick={() => navigate('signup')} className="font-bold text-blue-600 hover:text-blue-500 cursor-pointer">Create Account</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;