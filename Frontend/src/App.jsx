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
import Contact from "./pages/Contact";
import Emergency from './pages/Emergency';
import Faq from './pages/Faq';
import Resources from './pages/Resources';
import Gallery from './pages/Gallery';
import DisasterChatbot from './components/DisasterChatbot';


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
                                <Dashboard user={JSON.parse(localStorage.getItem('user') || '{}').name || USER_NAME} />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        } 
                    />
                    <Route path="/safetysessions" element={<SafetySessions />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/modules" element={<Modules />} />
                    <Route path="/safetytips" element={<SafetyTips />} />
                    <Route path="/emergency" element={<Emergency />} />
                    <Route path="/Faq" element={<Faq />} />
                    <Route path="/Gallery" element={<Gallery />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/Resources" element={<Resources />} />
                    <Route path="/disaster" element={<DisasterPage />} />

                </Routes>
            </main>

            {/* AI Chatbot - Available on all pages */}
            <DisasterChatbot />
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
