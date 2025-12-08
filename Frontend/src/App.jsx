import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Modules from './pages/Modules';
import SafetyTips from './pages/SafetyTips';
import { USER_NAME } from './data/mockData';
import Contact from "./pages/Contact";
import Emergency from './pages/Emergency';
import Faq from './pages/Faq';
import Resources from './pages/Resources';
import Gallery from './pages/Gallery';


const App = () => {
    const [page, setPage] = useState('home');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = (target) => {
        if (target === 'dashboard' && !isLoggedIn) {
            setPage('login');
        } else {
            setPage(target);
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className="antialiased">
            {page !== 'login' && page !== 'signup' && (
                <Navbar 
                    navigate={navigate} 
                    isLoggedIn={isLoggedIn} 
                    onLogout={() => { setIsLoggedIn(false); navigate('home'); }} 
                />
            )}

            <main>
                {page === 'home' && <HomePage navigate={navigate} />}
                {page === 'login' && <LoginPage navigate={navigate} onLogin={() => { setIsLoggedIn(true); navigate('dashboard'); }} />}
                {page === 'signup' && <SignupPage navigate={navigate} onLogin={() => { setIsLoggedIn(true); navigate('dashboard'); }} />}
                {page === 'dashboard' && <Dashboard user={USER_NAME} />}
                {page === 'about' && <About navigate={navigate} />}
                {page === 'modules' && <Modules navigate={navigate} />}
                {page === 'safetytips' && <SafetyTips navigate={navigate} />}
                {page === 'contact' && <Contact />}
                {page === 'emergency' && <Emergency />}
                {page === 'faq' && <Faq />}
                {page === 'resources' && <Resources />}
                {page === 'gallery' && <Gallery />}
            </main>
        </div>
    );
};

export default App;
