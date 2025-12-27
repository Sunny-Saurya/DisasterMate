import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    GraduationCap, Calendar, Clock, MapPin, UserCheck, X, Shield,
    ArrowLeft, CheckCircle, Users, Award, BookOpen, Sparkles, Trash2
} from 'lucide-react';

import Button from '../components/ui/Button';
import Toast from '../components/ui/Toast';
import { SAFETY_SESSIONS } from '../data/mockData';
import API_URL from '../config/api';

const SafetySessions = () => {
    const navigate = useNavigate();
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null);
    const [toast, setToast] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState('all'); // 'all' or 'mybookings'
    const [myBookings, setMyBookings] = useState([]);
    const [isLoadingBookings, setIsLoadingBookings] = useState(false);
    const [bookingForm, setBookingForm] = useState({
        name: '',
        location: '',
        sessionType: '',
        preferredDate: ''
    });

    // Fetch user's bookings
    const fetchMyBookings = async () => {
        setIsLoadingBookings(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setToast({
                    message: '⚠️ Please login to view your bookings',
                    type: 'error'
                });
                setTimeout(() => navigate('/login'), 2000);
                return;
            }

            const response = await fetch(`${API_URL}/api/sessions/my-bookings`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (data.success) {
                setMyBookings(data.data);
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
            setToast({
                message: '❌ Failed to load bookings',
                type: 'error'
            });
        } finally {
            setIsLoadingBookings(false);
        }
    };

    // Load bookings when switching to My Bookings tab
    useEffect(() => {
        if (activeTab === 'mybookings') {
            fetchMyBookings();
        }
    }, [activeTab]);

    // Cancel booking function
    const handleCancelBooking = async (bookingId) => {
        if (!confirm('Are you sure you want to cancel this booking?')) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/sessions/${bookingId}/cancel`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (data.success) {
                setToast({
                    message: '✅ Booking cancelled successfully',
                    type: 'success'
                });
                fetchMyBookings(); // Refresh the bookings list
            } else {
                setToast({
                    message: `❌ ${data.message}`,
                    type: 'error'
                });
            }
        } catch (error) {
            console.error('Cancel error:', error);
            setToast({
                message: '❌ Failed to cancel booking',
                type: 'error'
            });
        }
    };

    const handleSessionSelect = (session) => {
        setSelectedSession(session);
        setShowBookingModal(true);
        setBookingForm({
            ...bookingForm,
            sessionType: session.type,
            preferredDate: new Date(session.date).toISOString().split('T')[0]
        });
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Get token from localStorage
            const token = localStorage.getItem('token');
            
            if (!token) {
                setToast({
                    message: '⚠️ Please login to book a session',
                    type: 'error'
                });
                setTimeout(() => navigate('/login'), 2000);
                return;
            }

            // Prepare booking data
            const bookingData = {
                name: bookingForm.name,
                location: bookingForm.location,
                sessionType: bookingForm.sessionType,
                preferredDate: bookingForm.preferredDate,
                sessionDetails: {
                    instructor: selectedSession.instructor,
                    duration: selectedSession.time,
                    price: 0, // Free session
                    slots: selectedSession.spots
                }
            };

            // Send booking request to backend
            const response = await fetch(`${API_URL}/api/sessions/book`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(bookingData)
            });

            const data = await response.json();

            if (data.success) {
                setShowBookingModal(false);
                
                setToast({
                    message: `🎉 Your ${selectedSession.type} session has been successfully booked for ${selectedSession.date}! Check your email for confirmation.`,
                    type: 'success'
                });

                setBookingForm({ name: '', location: '', sessionType: '', preferredDate: '' });
                setSelectedSession(null);
                fetchMyBookings(); // Refresh bookings after successful booking
            } else {
                setToast({
                    message: `❌ ${data.message || 'Failed to book session'}`,
                    type: 'error'
                });
            }
        } catch (error) {
            console.error('Booking error:', error);
            setToast({
                message: '❌ Network error. Please make sure backend is running and try again.',
                type: 'error'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Custom Navbar for Safety Sessions */}
            <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-slate-600" />
                            </button>
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <GraduationCap className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-lg font-bold text-slate-900">Safety Sessions</h1>
                                    <p className="text-xs text-slate-500">Expert-led training programs</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
                                <button 
                                    onClick={() => setActiveTab('all')}
                                    className={`transition-colors ${activeTab === 'all' ? 'text-indigo-600 font-semibold' : 'hover:text-indigo-600'}`}
                                >
                                    All Sessions
                                </button>
                                <button 
                                    onClick={() => setActiveTab('mybookings')}
                                    className={`transition-colors ${activeTab === 'mybookings' ? 'text-indigo-600 font-semibold' : 'hover:text-indigo-600'}`}
                                >
                                    My Bookings
                                </button>
                                <button className="hover:text-indigo-600 transition-colors">Instructors</button>
                            </div>
                            <Button variant="primary" className="shadow-lg shadow-indigo-500/30">
                                <Calendar className="w-4 h-4 mr-2" />
                                View Calendar
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section with Background */}
            <div className="relative bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '50px 50px'
                    }}></div>
                </div>
                
                {/* Floating Shapes */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold mb-6">
                            <Sparkles className="w-4 h-4" />
                            New Sessions Added Weekly
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Master Emergency <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-200 to-pink-200">
                                Preparedness Skills
                            </span>
                        </h1>
                        <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                            Join expert-led safety sessions and become certified in life-saving techniques. 
                            Book your spot in interactive workshops near you.
                        </p>
                        
                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                                <div className="text-3xl font-bold text-white mb-1">50+</div>
                                <div className="text-sm text-indigo-200">Expert Instructors</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                                <div className="text-3xl font-bold text-white mb-1">2.5K</div>
                                <div className="text-sm text-indigo-200">Students Trained</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                                <div className="text-3xl font-bold text-white mb-1">98%</div>
                                <div className="text-sm text-indigo-200">Success Rate</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wave Shape */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" className="w-full h-auto">
                        <path fill="#f8fafc" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
                    </svg>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8 relative z-10">
                
                {/* Features Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {[
                        {
                            icon: Award,
                            title: "Get Certified",
                            description: "Receive official certificates upon completion",
                            color: "from-blue-500 to-cyan-500"
                        },
                        {
                            icon: Users,
                            title: "Small Groups",
                            description: "Maximum 20 students for personalized attention",
                            color: "from-purple-500 to-pink-500"
                        },
                        {
                            icon: BookOpen,
                            title: "Free Materials",
                            description: "All training materials and handbooks included",
                            color: "from-orange-500 to-red-500"
                        }
                    ].map((feature, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
                            <div className={`w-14 h-14 bg-linear-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                                <feature.icon className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                            <p className="text-slate-600 text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* My Bookings Section */}
                {activeTab === 'mybookings' && (
                    <div className="mb-16">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900">My Bookings</h2>
                                <p className="text-slate-600 mt-1">View and manage your session bookings</p>
                            </div>
                        </div>

                        {isLoadingBookings ? (
                            <div className="flex items-center justify-center py-20">
                                <div className="text-center">
                                    <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                                    <p className="text-slate-600">Loading your bookings...</p>
                                </div>
                            </div>
                        ) : myBookings.length === 0 ? (
                            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-12 text-center">
                                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Calendar className="w-10 h-10 text-slate-400" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">No bookings yet</h3>
                                <p className="text-slate-600 mb-6">You haven't booked any sessions. Browse available sessions and book your spot!</p>
                                <Button 
                                    variant="primary" 
                                    onClick={() => setActiveTab('all')}
                                    className="shadow-lg shadow-indigo-500/30"
                                >
                                    Browse Sessions
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {myBookings.map((booking) => {
                                    const statusColors = {
                                        pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
                                        confirmed: 'bg-green-100 text-green-700 border-green-200',
                                        cancelled: 'bg-red-100 text-red-700 border-red-200'
                                    };

                                    const statusIcons = {
                                        pending: '⏳',
                                        confirmed: '✅',
                                        cancelled: '❌'
                                    };

                                    return (
                                        <div key={booking._id} className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow">
                                            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-lg font-bold text-white">{booking.sessionType}</h3>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[booking.status]}`}>
                                                        {statusIcons[booking.status]} {booking.status.toUpperCase()}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="p-6 space-y-3">
                                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                                                        <UserCheck className="w-4 h-4 text-blue-600" />
                                                    </div>
                                                    <span className="font-medium">{booking.name}</span>
                                                </div>

                                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                                    <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                                                        <Calendar className="w-4 h-4 text-indigo-600" />
                                                    </div>
                                                    <span>{new Date(booking.preferredDate).toLocaleDateString('en-US', { 
                                                        weekday: 'long', 
                                                        year: 'numeric', 
                                                        month: 'long', 
                                                        day: 'numeric' 
                                                    })}</span>
                                                </div>

                                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                                    <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center shrink-0">
                                                        <MapPin className="w-4 h-4 text-purple-600" />
                                                    </div>
                                                    <span>{booking.location}</span>
                                                </div>

                                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                                    <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
                                                        <Clock className="w-4 h-4 text-emerald-600" />
                                                    </div>
                                                    <span>Booked on {new Date(booking.bookingDate).toLocaleDateString()}</span>
                                                </div>

                                                {booking.status === 'pending' && (
                                                    <div className="pt-4 border-t border-slate-100">
                                                        <Button 
                                                            variant="outline" 
                                                            className="w-full text-red-600 border-red-200 hover:bg-red-50"
                                                            onClick={() => handleCancelBooking(booking._id)}
                                                        >
                                                            <Trash2 className="w-4 h-4 mr-2" />
                                                            Cancel Booking
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* Sessions Section */}
                {activeTab === 'all' && (
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900">Available Sessions</h2>
                            <p className="text-slate-600 mt-1">Choose from our upcoming training programs</p>
                        </div>
                        <select className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option>All Types</option>
                            <option>Fire Safety</option>
                            <option>First Aid</option>
                            <option>Emergency Planning</option>
                        </select>
                    </div>

                    {/* Sessions Grid with Image Backgrounds */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {SAFETY_SESSIONS.map((session, index) => {
                            const gradients = [
                                'from-rose-400 to-orange-300',
                                'from-cyan-400 to-blue-500',
                                'from-emerald-400 to-teal-500',
                                'from-purple-400 to-pink-500',
                                'from-amber-400 to-orange-500'
                            ];
                            
                            return (
                                <div
                                    key={session.id}
                                    className={`group relative bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden transition-all duration-300 ${
                                        session.available ? 'hover:shadow-2xl hover:-translate-y-2 cursor-pointer' : 'opacity-60 cursor-not-allowed'
                                    }`}
                                    onClick={() => session.available && handleSessionSelect(session)}
                                >
                                    {/* Gradient Header with Pattern */}
                                    <div className={`relative h-48 bg-linear-to-br ${gradients[index % gradients.length]} overflow-hidden`}>
                                        <div className="absolute inset-0 opacity-30" style={{
                                            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                                            backgroundSize: '30px 30px'
                                        }}></div>
                                        
                                        {/* Floating Badge */}
                                        <div className="absolute top-4 right-4">
                                            {session.available ? (
                                                <span className="px-3 py-1.5 bg-white text-emerald-600 text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                                                    <CheckCircle className="w-3 h-3" />
                                                    Available
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1.5 bg-white/90 text-slate-600 text-xs font-bold rounded-full shadow-lg">
                                                    Fully Booked
                                                </span>
                                            )}
                                        </div>

                                        {/* Session Type Icon */}
                                        <div className="absolute bottom-6 left-6">
                                            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-xl">
                                                <GraduationCap className="w-8 h-8 text-white" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                                            {session.type}
                                        </h3>

                                        <div className="space-y-2.5 mb-6">
                                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                                <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                                                    <UserCheck className="w-4 h-4 text-indigo-600" />
                                                </div>
                                                <span className="font-medium">{session.instructor}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                                <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                                                    <Calendar className="w-4 h-4 text-blue-600" />
                                                </div>
                                                <span>{session.date}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                                <div className="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center shrink-0">
                                                    <Clock className="w-4 h-4 text-purple-600" />
                                                </div>
                                                <span>{session.time}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                                <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
                                                    <MapPin className="w-4 h-4 text-emerald-600" />
                                                </div>
                                                <span>{session.location}</span>
                                            </div>
                                        </div>

                                        {session.available ? (
                                            <>
                                                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                                                        Spots Available
                                                    </span>
                                                    <span className="text-sm font-bold text-indigo-600">
                                                        {session.spots} seats left
                                                    </span>
                                                </div>
                                                <Button 
                                                    variant="primary" 
                                                    className="w-full h-12 text-base font-semibold shadow-lg shadow-indigo-500/30 group-hover:shadow-xl group-hover:shadow-indigo-500/40"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleSessionSelect(session);
                                                    }}
                                                >
                                                    Book This Session
                                                    <Calendar className="w-4 h-4 ml-2" />
                                                </Button>
                                            </>
                                        ) : (
                                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                                                <p className="text-sm font-medium text-slate-500">
                                                    This session is fully booked
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                )}

                {/* Call to Action */}
                {activeTab === 'all' && (
                <div className="mt-16 bg-linear-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }}></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl font-bold mb-4">Can't Find What You're Looking For?</h2>
                        <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
                            Request a custom session for your school, organization, or community group.
                        </p>
                        <Button variant="outline" className="bg-white text-indigo-600 hover:bg-indigo-50 border-0 h-12 px-8 text-base font-semibold shadow-xl">
                            Request Custom Session
                        </Button>
                    </div>
                </div>
                )}
            </div>

            {/* Booking Modal */}
            {showBookingModal && selectedSession && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-linear-to-r from-indigo-600 to-purple-600 text-white px-6 py-5 flex items-center justify-between rounded-t-3xl">
                            <div>
                                <h3 className="text-2xl font-bold">Book Your Session</h3>
                                <p className="text-indigo-200 text-sm mt-1">{selectedSession.type}</p>
                            </div>
                            <button
                                onClick={() => {
                                    setShowBookingModal(false);
                                    setSelectedSession(null);
                                    setBookingForm({ name: '', location: '', sessionType: '', preferredDate: '' });
                                }}
                                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Session Details */}
                        <div className="px-6 py-4 bg-indigo-50 border-b border-indigo-100">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="w-4 h-4 text-indigo-600" />
                                    <span className="text-slate-700 font-medium">{selectedSession.date}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Clock className="w-4 h-4 text-indigo-600" />
                                    <span className="text-slate-700 font-medium">{selectedSession.time}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="w-4 h-4 text-indigo-600" />
                                    <span className="text-slate-700 font-medium">{selectedSession.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <UserCheck className="w-4 h-4 text-indigo-600" />
                                    <span className="text-slate-700 font-medium">{selectedSession.instructor}</span>
                                </div>
                            </div>
                        </div>

                        {/* Booking Form */}
                        <form onSubmit={handleBookingSubmit} className="px-6 py-6 space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={bookingForm.name}
                                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-colors"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Your Location (School/Area) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={bookingForm.location}
                                    onChange={(e) => setBookingForm({ ...bookingForm, location: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-colors"
                                    placeholder="e.g., Central High School or Downtown Area"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Session Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    required
                                    value={bookingForm.sessionType}
                                    onChange={(e) => setBookingForm({ ...bookingForm, sessionType: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-colors"
                                >
                                    <option value="">Select a session type</option>
                                    <option value="Fire Safety">Fire Safety</option>
                                    <option value="Earthquake Preparedness">Earthquake Preparedness</option>
                                    <option value="First Aid & CPR">First Aid & CPR</option>
                                    <option value="Flood Safety">Flood Safety</option>
                                    <option value="Emergency Planning">Emergency Planning</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Preferred Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={bookingForm.preferredDate}
                                    onChange={(e) => setBookingForm({ ...bookingForm, preferredDate: e.target.value })}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-colors"
                                />
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                <div className="flex gap-3">
                                    <Shield className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                    <div className="text-sm text-blue-900">
                                        <p className="font-semibold mb-1">Safety Guidelines</p>
                                        <p className="text-blue-700">Please arrive 10 minutes early. Bring a valid ID and wear comfortable clothing.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => {
                                        setShowBookingModal(false);
                                        setSelectedSession(null);
                                        setBookingForm({ name: '', location: '', sessionType: '', preferredDate: '' });
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    type="submit" 
                                    variant="primary" 
                                    className="flex-1 shadow-lg shadow-indigo-500/30"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Booking...
                                        </span>
                                    ) : (
                                        'Confirm Booking'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default SafetySessions;
