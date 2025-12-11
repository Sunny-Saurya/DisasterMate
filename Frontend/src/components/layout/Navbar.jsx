import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, Shield, User, Mail, Calendar } from 'lucide-react';
import Button from '../ui/Button';

const Navbar = ({ isLoggedIn, onLogout }) => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            setUserData(user);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isProfileOpen && !event.target.closest('.profile-dropdown')) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isProfileOpen]);

    const navClass = `fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100' : 'bg-transparent'}`;
    const textClass = isScrolled ? 'text-slate-800' : 'text-slate-900';

    return (
        <nav className={navClass}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 mr-3">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <span className={`text-xl font-bold tracking-tight ${textClass}`}>DisasterMate</span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {!isLoggedIn ? (
                            <>
                                <button onClick={() => navigate('/')} className={`font-medium hover:text-blue-600 transition-colors ${textClass}`}>Features</button>
                                <button onClick={() => navigate('/about')} className={`font-medium hover:text-blue-600 transition-colors ${textClass}`}>About</button>
                                <button onClick={() => navigate('/modules')} className={`font-medium hover:text-blue-600 transition-colors ${textClass}`}>Modules</button>
                                <button onClick={() => navigate('/emergency')} className={`font-medium hover:text-blue-600 transition-colors ${textClass}`}>Emergency</button>
                                <button onClick={() => navigate('/gallery')} className={`font-medium hover:text-blue-600 transition-colors ${textClass}`}>Gallery</button>
                                <button onClick={() => navigate('/resources')} className={`font-medium hover:text-blue-600 transition-colors ${textClass}`}>Resources</button>
                                <button onClick={() => navigate('/contact')} className={`font-medium hover:text-blue-600 transition-colors ${textClass}`}>Contact Us</button>
                                <Button onClick={() => navigate('/login')} variant="primary" className="shadow-lg shadow-blue-600/20">Sign In</Button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => navigate('/dashboard')} className="font-medium text-slate-600 hover:text-blue-600">Dashboard</button>
                                <button onClick={() => navigate('/safetysessions')} className="font-medium text-slate-600 hover:text-blue-600">Safety Sessions</button>
                                
                                {/* Profile Dropdown */}
                                <div className="relative profile-dropdown">
                                    <button 
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center space-x-2 p-2 rounded-xl hover:bg-slate-100 transition-colors"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-lg">
                                            {userData?.name?.charAt(0)?.toUpperCase() || 'U'}
                                        </div>
                                    </button>

                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                            {/* Profile Header */}
                                            <div className="px-4 py-3 border-b border-slate-100">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                                        {userData?.name?.charAt(0)?.toUpperCase() || 'U'}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-bold text-slate-900 text-lg">{userData?.name || 'User'}</h3>
                                                        <p className="text-sm text-slate-500">Member</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* User Details */}
                                            <div className="px-4 py-3 space-y-3">
                                                <div className="flex items-center space-x-3 text-sm">
                                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                                        <Mail className="w-4 h-4 text-blue-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-xs text-slate-500 font-medium">Email</p>
                                                        <p className="text-slate-900 font-medium truncate">{userData?.email || 'N/A'}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-3 text-sm">
                                                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                                                        <User className="w-4 h-4 text-green-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-xs text-slate-500 font-medium">User ID</p>
                                                        <p className="text-slate-900 font-mono text-xs">{userData?._id?.slice(-8) || 'N/A'}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-3 text-sm">
                                                    <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                                                        <Calendar className="w-4 h-4 text-purple-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-xs text-slate-500 font-medium">Member Since</p>
                                                        <p className="text-slate-900 font-medium">
                                                            {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="px-4 pt-2 pb-2 border-t border-slate-100 space-y-1">
                                                <button 
                                                    onClick={() => {
                                                        setIsProfileOpen(false);
                                                        navigate('/dashboard');
                                                    }}
                                                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 font-medium text-sm transition-colors"
                                                >
                                                    View Dashboard
                                                </button>
                                                <button 
                                                    onClick={() => {
                                                        setIsProfileOpen(false);
                                                        onLogout();
                                                    }}
                                                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 font-medium text-sm transition-colors flex items-center"
                                                >
                                                    <LogOut className="w-4 h-4 mr-2" />
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-lg text-slate-600 hover:bg-slate-100">
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>
            
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 absolute w-full px-4 py-6 shadow-xl space-y-4">

                    <Button fullWidth variant="outline" onClick={() => navigate('/')}>Home</Button>
                    <Button fullWidth variant="outline" onClick={() => navigate('/about')}>About</Button>
                    <Button fullWidth variant="outline" onClick={() => navigate('/modules')}>Modules</Button>
                    <Button fullWidth variant="outline" onClick={() => navigate('/safetytips')}>Safety Tips</Button>
                    <Button fullWidth variant="outline" onClick={() => navigate('/emergency')}>Emergency</Button>
                    <Button fullWidth variant="outline" onClick={() => navigate('/gallery')}>Gallery</Button>
                    <Button fullWidth variant="outline" onClick={() => navigate('/faq')}>FAQ</Button>
                    <Button fullWidth variant="outline" onClick={() => navigate('/contact')}>Contact Us</Button>
                    <Button fullWidth variant="outline" onClick={() => navigate('/resources')}>Resources</Button>
                    
                    {isLoggedIn && userData && (
                        <div className="bg-slate-50 rounded-xl p-4 mb-4">
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg">
                                    {userData?.name?.charAt(0)?.toUpperCase() || 'U'}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">{userData?.name || 'User'}</h3>
                                    <p className="text-xs text-slate-500">{userData?.email || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <Button fullWidth variant="outline" onClick={() => { navigate('/'); setIsMobileMenuOpen(false); }}>Home</Button>

                    {!isLoggedIn ? (
                        <Button fullWidth onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}>Sign In</Button>
                    ) : (
                        <>
                            <Button fullWidth onClick={() => { navigate('/dashboard'); setIsMobileMenuOpen(false); }}>Dashboard</Button>
                            <Button fullWidth variant="danger" onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}>Sign Out</Button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
