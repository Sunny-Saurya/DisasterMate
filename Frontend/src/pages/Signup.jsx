import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const SignupPage = ({ onLogin }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
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

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        // Validate password length
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            setIsLoading(false);
            return;
        }

        try {
            console.log('Sending signup request...');
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    password: formData.password
                })
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
                setError(data.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Signup error details:', error);
            setError(`Network error: ${error.message}. Make sure backend is running on port 5000.`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white">
            {/* Left Side - Visual & Social Proof */}
            <div className="hidden lg:flex w-1/2 bg-blue-600 relative overflow-hidden flex-col justify-between p-12 text-white">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-600 to-blue-900 opacity-90 z-0"></div>
                
                {/* Background Pattern */}
                <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-8">
                        <Shield className="w-8 h-8 text-blue-200" />
                        <span className="text-xl font-bold tracking-tight">DisasterMate</span>
                    </div>
                    <h1 className="text-5xl font-bold leading-tight mb-6">Join the Global Safety Network.</h1>
                    <p className="text-blue-100 text-lg max-w-md">Connect with emergency services, access offline survival guides, and keep your family safe.</p>
                </div>

                <div className="relative z-10 space-y-6">
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                        <p className="italic text-blue-50">"DisasterMate's early warning system gave us the critical 15 minutes we needed to evacuate safely."</p>
                    </div>
                </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50 overflow-y-auto">
                <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 my-8">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-slate-900">Create Account</h2>
                        <p className="text-slate-500 mt-2">Start your 30-day free trial. No credit card required.</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <Input 
                                label="First Name" 
                                name="firstName"
                                placeholder="Jane" 
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                            <Input 
                                label="Last Name" 
                                name="lastName"
                                placeholder="Doe" 
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <Input 
                            label="Email Address" 
                            name="email"
                            type="email" 
                            placeholder="jane@example.com" 
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <Input 
                            label="Password" 
                            name="password"
                            type="password" 
                            placeholder="Create a password" 
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <Input 
                            label="Confirm Password" 
                            name="confirmPassword"
                            type="password" 
                            placeholder="Confirm password" 
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        
                        <div className="text-sm text-slate-500">
                            By creating an account, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
                        </div>

                        <Button fullWidth className="h-12 shadow-lg shadow-blue-600/20 text-lg group">
                            {isLoading ? (
                                "Creating Account..."
                            ) : (
                                <span className="flex items-center justify-center">
                                    Get Started <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </Button>
                    </form>
                    
                    <p className="mt-8 text-center text-slate-500 text-sm">
                        Already have an account? <a onClick={() => navigate('/login')} className="font-bold text-blue-600 hover:text-blue-500 cursor-pointer">Log In</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
