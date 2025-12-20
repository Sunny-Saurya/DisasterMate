import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Zap, ShieldCheck, Users, Activity } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Spotlight } from '../components/ui/spotlight';
import API_URL from '../config/api';

const LoginPage = ({ onLogin }) => {
    const navigate = useNavigate();
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
            const response = await fetch(`${API_URL}/api/auth/login`, {
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
                navigate('/dashboard');
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
                <Spotlight className="-top-40 left-0 md:left-20 md:-top-20" fill="blue" />
                <Spotlight className="top-40 left-60 h-[80vh] w-[50vw]" fill="purple" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-900/40 z-10"></div>
                
                {/* Floating Stats Cards */}
                <div className="absolute top-20 right-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 z-20 animate-float">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-500/20 rounded-lg">
                            <ShieldCheck className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                            <div className="text-white font-bold text-lg">99.9%</div>
                            <div className="text-slate-300 text-xs">Uptime</div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-32 left-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 z-20 animate-float-delayed">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                            <Users className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                            <div className="text-white font-bold text-lg">10K+</div>
                            <div className="text-slate-300 text-xs">Active Users</div>
                        </div>
                    </div>
                </div>

                <div className="absolute top-1/2 left-1/4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 z-20 animate-float-delayed-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/20 rounded-lg">
                            <Activity className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                            <div className="text-white font-bold text-lg">24/7</div>
                            <div className="text-slate-300 text-xs">Monitoring</div>
                        </div>
                    </div>
                </div>
                
                <div className="relative z-20 max-w-lg px-12 text-center">
                    <div className="bg-blue-500/20 backdrop-blur-xl rounded-full p-8 inline-block mb-8">
                        <Shield className="w-20 h-20 text-blue-400" />
                    </div>
                    <h2 className="text-5xl font-bold text-white mb-6">Always Prepared.</h2>
                    <p className="text-slate-300 text-lg leading-relaxed">Join over 1 million users trusting DisasterMate for their family's safety and emergency planning.</p>
                    
                    <div className="mt-12 grid grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-400 mb-2">1M+</div>
                            <div className="text-slate-400 text-sm">Users</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-emerald-400 mb-2">150+</div>
                            <div className="text-slate-400 text-sm">Cities</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-400 mb-2">500K</div>
                            <div className="text-slate-400 text-sm">Alerts</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl"></div>
                
                <div className="w-full max-w-md bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-slate-200/60 relative z-10">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/30">
                            <Zap className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-4xl font-bold text-slate-900 mb-2">Welcome Back</h2>
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

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-xs text-slate-600 mb-2 font-semibold">Default Credentials:</p>
                            <div className="space-y-1">
                                <p className="text-sm text-slate-700"><span className="font-medium">Email:</span> user1@email.com</p>
                                <p className="text-sm text-slate-700"><span className="font-medium">Password:</span> user1234</p>
                            </div>
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
                        Don't have an account? <a onClick={() => navigate('/signup')} className="font-bold text-blue-600 hover:text-blue-500 cursor-pointer">Create Account</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;