import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, BookOpen, Activity, Users, Globe, ShieldCheck, ArrowRight, Star, Award, Heart, Shield, MapPin, Clock, CheckCircle, Smartphone, Bell, Navigation } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Marquee from '../components/ui/Marquee';
import Carousel from '../components/ui/Carousel';
import { Lens } from '../components/ui/Lens';
import { SmoothCursor } from '../components/ui/SmoothCursor';
import { VideoText } from '../components/ui/VideoText';

const HomePage = () => {
    const navigate = useNavigate();
    
    return (
        <>
        <SmoothCursor />
        <div className="min-h-screen bg-white font-sans selection:bg-blue-100">
        {/* --- Hero Section --- */}
        <div className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
            <div className="absolute top-0 right-0 -z-10 translate-x-1/3 -translate-y-1/4">
                <svg viewBox="0 0 1024 1024" className="h-[64rem] w-[64rem] opacity-20" aria-hidden="true">
                    <circle cx="512" cy="512" r="512" fill="url(#gradient)" fillOpacity="0.7" />
                    <defs>
                        <radialGradient id="gradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(512 512) rotate(90) scale(512)">
                            <stop stopColor="#2563EB" />
                            <stop offset="1" stopColor="#1E40AF" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                </svg>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-8 animate-fade-in-up border border-blue-100">
                            <span className="relative flex h-3 w-3 mr-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                            </span>
                            Live Disaster Response System Active
                        </div>
                        
                        <Lens zoomFactor={1.5} lensSize={200}>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                            <div className="inline-block relative w-[600px] h-[100px] md:w-[700px] md:h-[120px] align-middle">
                                <VideoText 
                                    src="https://videos.pexels.com/video-files/1918465/1918465-hd_1920_1080_25fps.mp4"
                                    fontSize="100px"
                                    fontWeight="900"
                                    fontFamily="system-ui, sans-serif"
                                >
                                    Resilience
                                </VideoText>
                            </div>
                            <span className="text-slate-900"> Starts</span> <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Before the Storm.</span>
                        </h1>
                        </Lens>
                        
                        <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            DisasterMate empowers communities with real-time alerts, personalized survival drills, and offline guides. Don't just react—be prepared.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                            <Button onClick={() => navigate('/signup')} className="px-8 py-4 text-lg shadow-xl shadow-blue-600/20 hover:shadow-blue-600/30 transition-all hover:-translate-y-1">
                                Start Free Trial
                            </Button>
                            <Button onClick={() => navigate('/login')} variant="outline" className="px-8 py-4 text-lg hover:-translate-y-1 transition-all">
                                View Dashboard
                            </Button>
                        </div>
                        
                        <div className="mt-10 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500">
                            <div className="flex -space-x-2">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                                        {String.fromCharCode(65 + i)}
                                    </div>
                                ))}
                            </div>
                            <p>Trusted by 10,000+ students & families</p>
                        </div>
                    </div>

                    {/* Hero Image/SVG */}
                    <div className="relative hidden lg:block">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-full blur-3xl transform translate-x-10 translate-y-10"></div>
                         <div className="relative bg-white/50 backdrop-blur-sm border border-white/60 p-6 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                            <div className="bg-slate-900 rounded-2xl p-6 text-white space-y-4">
                                <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-red-500/20 rounded-lg">
                                            <Zap className="w-6 h-6 text-red-500" />
                                        </div>
                                        <div>
                                            <div className="font-bold">Emergency Alert</div>
                                            <div className="text-xs text-slate-400">Just Now</div>
                                        </div>
                                    </div>
                                    <div className="px-2 py-1 bg-red-500 text-xs font-bold rounded">CRITICAL</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-2 bg-slate-700 rounded w-3/4"></div>
                                    <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    <div className="bg-slate-800 p-3 rounded-xl text-center">
                                        <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                                        <div className="text-xs text-slate-400">Safe Zone</div>
                                    </div>
                                    <div className="bg-slate-800 p-3 rounded-xl text-center">
                                        <BookOpen className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                                        <div className="text-xs text-slate-400">Guide</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* --- Stats Section --- */}
        <div className="bg-slate-900 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-800/50">
                    {[
                        { icon: Users, label: "Active Users", value: "1.2M+" },
                        { icon: Globe, label: "Regions Covered", value: "142" },
                        { icon: ShieldCheck, label: "Alerts Sent", value: "50k+" },
                        { icon: Activity, label: "Uptime", value: "99.9%" }
                    ].map((stat, idx) => (
                        <div key={idx} className="group p-4">
                            <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                            <div className="text-3xl font-bold mb-1">{stat.value}</div>
                            <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* --- Trusted By Marquee Section --- */}
        <div className="py-16 bg-white border-y border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <h2 className="text-center text-slate-500 font-semibold uppercase text-sm tracking-wider">Trusted by Leading Organizations</h2>
            </div>
            <Marquee speed={40} pauseOnHover={true}>
                {[
                    { name: "Red Cross", icon: Heart, color: "text-red-500" },
                    { name: "FEMA", icon: Shield, color: "text-blue-600" },
                    { name: "WHO", icon: Globe, color: "text-cyan-500" },
                    { name: "Emergency Services", icon: Zap, color: "text-amber-500" },
                    { name: "Civil Defense", icon: ShieldCheck, color: "text-emerald-600" },
                    { name: "Disaster Relief", icon: MapPin, color: "text-purple-600" },
                    { name: "Safety Institute", icon: Award, color: "text-indigo-600" },
                    { name: "Community Centers", icon: Users, color: "text-pink-600" }
                ].map((org, idx) => (
                    <div key={idx} className="mx-8 flex items-center gap-3 px-6 py-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group">
                        <org.icon className={`w-8 h-8 ${org.color} group-hover:scale-110 transition-transform`} />
                        <span className="text-slate-700 font-semibold text-lg whitespace-nowrap">{org.name}</span>
                    </div>
                ))}
            </Marquee>
        </div>

        {/* --- Features Section --- */}
        <div className="py-24 bg-slate-50 relative">
            {/* Decorative background blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
                 <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
                 <div className="absolute top-1/2 right-0 w-64 h-64 bg-indigo-200 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-3">Core Capabilities</h2>
                    <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Everything you need to stay safe</h3>
                    <p className="max-w-2xl mx-auto text-lg text-slate-600">
                        From predictive analytics to community support, our platform ensures you are never alone in a crisis.
                    </p>
                </div>
                
                <Lens zoomFactor={1.6} lensSize={220}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { 
                            icon: Zap, 
                            title: "Real-Time Alerts", 
                            desc: "Instant notifications for weather, geological, and civil emergencies in your exact location.",
                            color: "text-amber-600",
                            bg: "bg-amber-100"
                        },
                        { 
                            icon: BookOpen, 
                            title: "Survival Guides", 
                            desc: "Offline-accessible guides for first aid, evacuation routes, and shelter building.",
                            color: "text-blue-600",
                            bg: "bg-blue-100"
                        },
                        { 
                            icon: Activity, 
                            title: "Drill Simulations", 
                            desc: "Run practice scenarios to ensure you and your family know exactly what to do.",
                            color: "text-emerald-600",
                            bg: "bg-emerald-100"
                        }
                    ].map((feature, idx) => (
                        <Card key={idx} className="group bg-white border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full flex flex-col">
                            <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center ${feature.color} mb-6 group-hover:rotate-12 transition-transform duration-300`}>
                                <feature.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed flex-grow">{feature.desc}</p>
                            <div className="mt-8 flex items-center text-sm font-bold text-blue-600 group-hover:gap-2 transition-all">
                                Learn more <ArrowRight className="ml-2 w-4 h-4" />
                            </div>
                        </Card>
                    ))}
                </div>
                </Lens>
            </div>
        </div>

        {/* --- Interactive Lens Showcase Section --- */}
        <div className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-3">Interactive Experience</h2>
                    <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Explore Our Features Up Close</h3>
                    <p className="max-w-2xl mx-auto text-lg text-slate-600">
                        Hover over the cards to zoom in and see the details of our disaster preparedness platform
                    </p>
                </div>

                <Lens zoomFactor={1.7} lensSize={240}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Lens Card 1 - Real-Time Alerts */}
                        <div className="relative bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl p-8 h-96 overflow-hidden group cursor-pointer">
                            <div className="absolute inset-0 bg-black/20"></div>
                            <div className="absolute inset-0 opacity-10" style={{
                                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                                backgroundSize: '30px 30px'
                            }}></div>
                            
                            <div className="relative z-10 h-full flex flex-col">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                                    <Bell className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Real-Time Alerts</h3>
                                <p className="text-white/90 mb-6 text-sm leading-relaxed">
                                    Get instant notifications about emergencies in your area. Our advanced system monitors multiple sources 24/7.
                                </p>
                                
                                <div className="mt-auto space-y-3">
                                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                        <Zap className="w-5 h-5 text-yellow-300" />
                                        <span className="text-white text-sm font-medium">Lightning-fast delivery</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                        <MapPin className="w-5 h-5 text-yellow-300" />
                                        <span className="text-white text-sm font-medium">Location-specific alerts</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                        <Smartphone className="w-5 h-5 text-yellow-300" />
                                        <span className="text-white text-sm font-medium">Multi-device sync</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    {/* Lens Card 2 - Offline Guides */}
                        <div className="relative bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 h-96 overflow-hidden group cursor-pointer">
                            <div className="absolute inset-0 bg-black/20"></div>
                            <div className="absolute inset-0 opacity-10" style={{
                                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                                backgroundSize: '30px 30px'
                            }}></div>
                            
                            <div className="relative z-10 h-full flex flex-col">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                                    <BookOpen className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Offline Guides</h3>
                                <p className="text-white/90 mb-6 text-sm leading-relaxed">
                                    Access critical survival information even without internet. Download comprehensive guides for any emergency.
                                </p>
                                
                                <div className="mt-auto space-y-3">
                                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                        <Shield className="w-5 h-5 text-cyan-300" />
                                        <span className="text-white text-sm font-medium">First aid protocols</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                        <Navigation className="w-5 h-5 text-cyan-300" />
                                        <span className="text-white text-sm font-medium">Evacuation routes</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                        <Users className="w-5 h-5 text-cyan-300" />
                                        <span className="text-white text-sm font-medium">Family safety plans</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    {/* Lens Card 3 - Practice Drills */}
                        <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 h-96 overflow-hidden group cursor-pointer">
                            <div className="absolute inset-0 bg-black/20"></div>
                            <div className="absolute inset-0 opacity-10" style={{
                                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                                backgroundSize: '30px 30px'
                            }}></div>
                            
                            <div className="relative z-10 h-full flex flex-col">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                                    <Activity className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Practice Drills</h3>
                                <p className="text-white/90 mb-6 text-sm leading-relaxed">
                                    Run realistic simulation scenarios to train your family. Be prepared when it matters most.
                                </p>
                                
                                <div className="mt-auto space-y-3">
                                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                        <CheckCircle className="w-5 h-5 text-emerald-300" />
                                        <span className="text-white text-sm font-medium">Interactive scenarios</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                        <Clock className="w-5 h-5 text-emerald-300" />
                                        <span className="text-white text-sm font-medium">Timed challenges</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                        <Award className="w-5 h-5 text-emerald-300" />
                                        <span className="text-white text-sm font-medium">Progress tracking</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                </Lens>

                <div className="text-center mt-12">
                    <p className="text-slate-500 text-sm">
                        💡 <span className="font-semibold">Pro Tip:</span> Hover over the cards to explore detailed features
                    </p>
                </div>
            </div>
        </div>

        {/* --- Benefits Marquee Section --- */}
        <Lens zoomFactor={1.8} lensSize={250}>
        <div className="py-12 bg-blue-600 overflow-hidden">
            <Marquee speed={35} direction="right" pauseOnHover={false} className="py-2">
                {[
                    { icon: CheckCircle, text: "24/7 Real-Time Monitoring" },
                    { icon: Shield, text: "Bank-Level Security" },
                    { icon: Clock, text: "Instant Alert Delivery" },
                    { icon: Globe, text: "Worldwide Coverage" },
                    { icon: Users, text: "Community Support Network" },
                    { icon: Award, text: "Certified Training Programs" },
                    { icon: BookOpen, text: "Comprehensive Guides" },
                    { icon: Heart, text: "Trusted by Millions" }
                ].map((benefit, idx) => (
                    <div key={idx} className="mx-6 flex items-center gap-3 text-white">
                        <benefit.icon className="w-6 h-6 shrink-0" />
                        <span className="text-lg font-semibold whitespace-nowrap">{benefit.text}</span>
                        <div className="w-2 h-2 rounded-full bg-white/30 ml-6"></div>
                    </div>
                ))}
            </Marquee>
        </div>
        </Lens>

        {/* --- Success Stories Carousel Section --- */}
        <div className="py-24 bg-gradient-to-b from-slate-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-3">Success Stories</h2>
                    <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Real People, Real Results</h3>
                    <p className="max-w-2xl mx-auto text-lg text-slate-600">
                        See how DisasterMate has helped thousands prepare for and survive emergencies
                    </p>
                </div>

                <Carousel 
                    autoPlay={true} 
                    interval={5000}
                    items={[
                        // Testimonial 1
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-12 md:p-16 text-white min-h-[400px] flex flex-col justify-center">
                            <div className="max-w-4xl mx-auto">
                                <div className="flex justify-center md:justify-start mb-6">
                                    {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 text-yellow-300 fill-current" />)}
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
                                    "This app literally saved my family during the floods last year. The offline maps feature is a game changer."
                                </h2>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-2xl border-2 border-white/30">
                                        SJ
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-white text-xl">Sarah Jenkins</div>
                                        <div className="text-blue-100">Community Leader, California</div>
                                    </div>
                                </div>
                            </div>
                        </div>,
                        
                        // Testimonial 2
                        <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-12 md:p-16 text-white min-h-[400px] flex flex-col justify-center">
                            <div className="max-w-4xl mx-auto">
                                <div className="flex justify-center md:justify-start mb-6">
                                    {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 text-yellow-300 fill-current" />)}
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
                                    "The real-time alerts gave us a 30-minute head start during the wildfire evacuation. Every second counted."
                                </h2>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-2xl border-2 border-white/30">
                                        MR
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-white text-xl">Michael Rodriguez</div>
                                        <div className="text-emerald-100">Fire Chief, Colorado</div>
                                    </div>
                                </div>
                            </div>
                        </div>,
                        
                        // Testimonial 3
                        <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-12 md:p-16 text-white min-h-[400px] flex flex-col justify-center">
                            <div className="max-w-4xl mx-auto">
                                <div className="flex justify-center md:justify-start mb-6">
                                    {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 text-yellow-300 fill-current" />)}
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
                                    "The drill simulations helped our school be prepared. When the earthquake hit, everyone knew exactly what to do."
                                </h2>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-2xl border-2 border-white/30">
                                        LC
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-white text-xl">Lisa Chen</div>
                                        <div className="text-purple-100">School Principal, Washington</div>
                                    </div>
                                </div>
                            </div>
                        </div>,

                        // Testimonial 4
                        <div className="bg-gradient-to-br from-orange-600 to-red-600 p-12 md:p-16 text-white min-h-[400px] flex flex-col justify-center">
                            <div className="max-w-4xl mx-auto">
                                <div className="flex justify-center md:justify-start mb-6">
                                    {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 text-yellow-300 fill-current" />)}
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
                                    "As a first responder, having community members trained through DisasterMate makes our job so much easier and safer."
                                </h2>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-2xl border-2 border-white/30">
                                        JT
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-white text-xl">James Thompson</div>
                                        <div className="text-orange-100">EMT Paramedic, Texas</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ]}
                />
            </div>
        </div>

        {/* --- CTA Section --- */}
        <div className="py-24 bg-blue-600 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
            <div className="max-w-4xl mx-auto px-4 text-center relative z-10 text-white">
                <h2 className="text-4xl font-bold mb-6">Ready to secure your future?</h2>
                <p className="text-xl text-blue-100 mb-10">Join millions of users who trust DisasterMate for their safety and preparedness.</p>
                <Button onClick={() => navigate('/signup')} className="bg-white text-blue-600 hover:bg-blue-50 border-none px-10 py-4 text-lg shadow-xl">
                    Get Protected Now
                </Button>
                <p className="mt-6 text-sm text-blue-100">No credit card required for basic plan.</p>
            </div>
        </div>
        </div>
        </>
    );
};

export default HomePage;