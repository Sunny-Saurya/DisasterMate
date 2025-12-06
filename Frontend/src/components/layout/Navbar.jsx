import React, { useState, useEffect } from 'react';
import { LogOut, Menu, X, Shield } from 'lucide-react';
import Button from '../ui/Button';

const Navbar = ({ navigate, isLoggedIn, onLogout }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navClass = `fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100' : 'bg-transparent'}`;
    const textClass = isScrolled ? 'text-slate-800' : 'text-slate-900';

    return (
        <nav className={navClass}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center cursor-pointer" onClick={() => navigate('home')}>
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 mr-3">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <span className={`text-xl font-bold tracking-tight ${textClass}`}>DisasterMate</span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {!isLoggedIn ? (
                            <>
                                <button onClick={() => navigate('home')} className={`font-medium hover:text-blue-600 transition-colors ${textClass}`}>Features</button>
                                <button onClick={() => navigate('about')} className={`font-medium hover:text-blue-600 transition-colors ${textClass}`}>About</button>
                                <button onClick={() => navigate('modules')} className={`font-medium hover:text-blue-600 transition-colors ${textClass}`}>Modules</button>
                                <button onClick={() => navigate('safetytips')} className={`font-medium hover:text-blue-600 transition-colors ${textClass}`}>Safety tips</button>
                                <button className={`font-medium hover:text-blue-600 transition-colors ${textClass}`}>Resources</button>
                                <Button onClick={() => navigate('login')} variant="primary" className="shadow-lg shadow-blue-600/20">Sign In</Button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => navigate('dashboard')} className="font-medium text-slate-600 hover:text-blue-600">Dashboard</button>
                                <button onClick={onLogout} className="flex items-center text-slate-500 hover:text-red-500 font-medium transition-colors">
                                    <LogOut className="w-4 h-4 mr-2" /> Sign Out
                                </button>
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
                    <Button fullWidth variant="outline" onClick={() => navigate('home')}>Home</Button>
                    <Button fullWidth variant="outline" onClick={() => navigate('about')}>About</Button>
                    <Button fullWidth variant="outline" onClick={() => navigate('modules')}>Modules</Button>
                    <Button fullWidth variant="outline" onClick={() => navigate('safetytips')}>Safety Tips</Button>
                    {!isLoggedIn ? (
                        <Button fullWidth onClick={() => navigate('login')}>Sign In</Button>
                    ) : (
                        <Button fullWidth variant="danger" onClick={onLogout}>Sign Out</Button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
