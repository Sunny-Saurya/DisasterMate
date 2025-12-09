import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import Dashboard from './pages/Dashboard';
import SafetySessions from './pages/SafetySessions';
import About from './pages/About';
import Modules from './pages/Modules';
import SafetyTips from './pages/SafetyTips';
import DisasterPage from './pages/DisasterPage';
import { USER_NAME } from './data/mockData';

const AppContent = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Check if user is logged in from localStorage
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    // Hide navbar on login, signup, and safetysessions pages
    const hideNavbar = ['/login', '/signup', '/safetysessions'].includes(location.pathname);

    return (
        <div className="antialiased">
            {!hideNavbar && (
                <Navbar 
                    isLoggedIn={isLoggedIn} 
                    onLogout={handleLogout} 
                />
            )}

            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route 
                        path="/login" 
                        element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} 
                    />
                    <Route 
                        path="/signup" 
                        element={<SignupPage onLogin={() => setIsLoggedIn(true)} />} 
                    />
                    <Route 
                        path="/dashboard" 
                        element={
                            isLoggedIn ? (
                                <Dashboard user={USER_NAME} />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        } 
                    />
                    <Route path="/safetysessions" element={<SafetySessions />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/modules" element={<Modules />} />
                    <Route path="/safetytips" element={<SafetyTips />} />
                    <Route path="/disaster" element={<DisasterPage />} />

                </Routes>
            </main>
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

export default App;
