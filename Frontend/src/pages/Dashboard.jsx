import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Thermometer, Wind, AlertTriangle, ChevronRight, Activity, 
    MapPin, Bell, Shield, BookOpen, Clock, CheckCircle, Search,
    MoreVertical, Zap, Calendar, Users, GraduationCap, TrendingUp,
    BarChart3, AlertCircle, Target, Award, Radio
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { DASHBOARD_DATA } from '../data/mockData';
import { Spotlight } from '../components/ui/spotlight';

const Dashboard = ({ user }) => {
    const navigate = useNavigate();
    // Local state for basic interactions
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 pt-24 pb-12 relative overflow-hidden">
            <Spotlight className="-top-40 left-full md:left-[80%] md:-top-20" fill="blue" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
                
                {/* Header Section with Hero Image */}
                <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-3xl shadow-2xl">
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-blue-900/90 to-transparent"></div>
                    
                    <div className="relative z-10 p-8 md:p-10">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div className="flex items-start gap-6">
                                <div className="hidden md:block w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-1 shadow-xl">
                                    <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                                        <Shield className="w-10 h-10 text-blue-600" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h1 className="text-3xl md:text-4xl font-bold text-white">Welcome back, {user}</h1>
                                        <div className="px-3 py-1 bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-full flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                            <span className="text-emerald-300 text-xs font-semibold">ACTIVE</span>
                                        </div>
                                    </div>
                                    <p className="text-blue-200 flex items-center gap-3 text-sm md:text-base">
                                        <Calendar className="w-4 h-4" />
                                        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                                    </p>
                                    <div className="flex items-center gap-4 mt-4">
                                        <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
                                            <Thermometer className="w-5 h-5 text-blue-400 mr-2" />
                                            <span className="font-semibold text-white mr-3">{DASHBOARD_DATA.weather.temp}</span>
                                            <div className="w-px h-4 bg-white/30 mr-3"></div>
                                            <Wind className="w-5 h-5 text-blue-300 mr-2" />
                                            <span className="text-blue-200 text-sm">{DASHBOARD_DATA.weather.wind}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button variant="danger" className="shadow-2xl shadow-red-500/30 h-12 px-6">
                                <Zap className="w-5 h-5 mr-2" />
                                Emergency SOS
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Quick Stats Row - Enhanced */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                     {[
                         { label: "Safety Score", value: "92%", change: "+5%", color: "text-emerald-600", bg: "bg-emerald-50", gradient: "from-emerald-500 to-teal-600", icon: Shield, trend: TrendingUp },
                         { label: "Active Alerts", value: "2", change: "Critical", color: "text-red-600", bg: "bg-red-50", gradient: "from-red-500 to-pink-600", icon: AlertCircle, trend: Radio },
                         { label: "Drills Pending", value: "1", change: "This Week", color: "text-amber-600", bg: "bg-amber-50", gradient: "from-amber-500 to-orange-600", icon: Target, trend: Clock },
                         { label: "Modules Done", value: "4/12", change: "33%", color: "text-blue-600", bg: "bg-blue-50", gradient: "from-blue-500 to-indigo-600", icon: Award, trend: BarChart3 },
                     ].map((stat, i) => (
                         <div key={i} className="group relative overflow-hidden bg-white rounded-2xl shadow-lg border border-slate-200 transition-all hover:shadow-xl hover:-translate-y-2 duration-300">
                             <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                             <div className="relative p-6">
                                 <div className="flex items-start justify-between mb-4">
                                     <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                                         <stat.icon className="w-7 h-7" />
                                     </div>
                                     <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${stat.bg} ${stat.color}`}>
                                         <stat.trend className="w-3 h-3" />
                                         {stat.change}
                                     </div>
                                 </div>
                                 <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                                 <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">{stat.label}</div>
                             </div>
                         </div>
                     ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column (Alerts & Modules) */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Alerts Section - Enhanced */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                                        <AlertTriangle className="w-5 h-5 text-red-600" />
                                    </div>
                                    Priority Alerts
                                </h2>
                                <button className="text-sm text-slate-500 hover:text-blue-600 font-semibold flex items-center gap-2 group">
                                    View History
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                            
                            {DASHBOARD_DATA.alerts.map((alert, idx) => (
                                <div key={alert.id} className="group relative overflow-hidden bg-white rounded-2xl shadow-lg border-l-4 border-l-red-500 hover:shadow-2xl transition-all duration-300">
                                    {/* Background Image */}
                                    <div className="absolute inset-0 opacity-5" style={{
                                        backgroundImage: `url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-red-50/30"></div>
                                    
                                    <div className="relative p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-start gap-4">
                                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shrink-0 shadow-lg animate-pulse">
                                                    <AlertTriangle className="w-7 h-7 text-white" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="text-xl font-bold text-slate-900">{alert.title}</h3>
                                                        <Badge level={alert.level}>CRITICAL</Badge>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-sm text-slate-600 mb-3">
                                                        <div className="flex items-center gap-1">
                                                            <MapPin className="w-4 h-4" />
                                                            {alert.location}
                                                        </div>
                                                        <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                                                        <div className="flex items-center gap-1 text-red-600 font-semibold">
                                                            <Clock className="w-4 h-4" />
                                                            Valid until {alert.time}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <button className="flex items-center gap-2 text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl transition-all hover:shadow-md">
                                                <MapPin className="w-4 h-4" />
                                                View Map
                                            </button>
                                            <button className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white px-4 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-xl">
                                                <Shield className="w-4 h-4" />
                                                Emergency Protocols
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Learning Progress - Enhanced */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                        <BookOpen className="w-5 h-5 text-blue-600" />
                                    </div>
                                    Learning Path
                                </h2>
                                <button className="text-sm text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2 group">
                                    View All Modules
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                            
                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                                <div className="relative h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 overflow-hidden">
                                    <div className="absolute inset-0" style={{
                                        backgroundImage: `url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        opacity: 0.2
                                    }}></div>
                                    <div className="relative z-10 p-6 flex items-center justify-between text-white">
                                        <div>
                                            <div className="text-3xl font-bold mb-1">33%</div>
                                            <div className="text-blue-100">Course Progress</div>
                                        </div>
                                        <GraduationCap className="w-16 h-16 opacity-40" />
                                    </div>
                                </div>
                                
                                <div className="divide-y divide-slate-100">
                                    {DASHBOARD_DATA.preparedness.map((item, i) => (
                                        <div key={item.id} className="p-5 hover:bg-slate-50 transition-all duration-200 flex items-center gap-4 group cursor-pointer">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                                                item.progress === 100 
                                                    ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg' 
                                                    : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
                                            }`}>
                                                {item.progress === 100 ? <CheckCircle className="w-6 h-6" /> : <item.icon className="w-6 h-6" />}
                                            </div>
                                            <div className="grow">
                                                <div className="flex justify-between mb-2">
                                                    <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{item.title}</span>
                                                    <span className="text-sm font-bold text-slate-600">{item.progress}%</span>
                                                </div>
                                                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                    <div 
                                                        className={`h-full rounded-full transition-all duration-1000 shadow-sm ${
                                                            item.progress === 100 ? 'bg-gradient-to-r from-emerald-500 to-teal-600' : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                                                        }`} 
                                                        style={{ width: `${item.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-5 bg-gradient-to-r from-slate-50 to-blue-50 text-center border-t border-slate-100">
                                    <button className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors flex items-center gap-2 mx-auto">
                                        <Award className="w-4 h-4" />
                                        + Start New Certification
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Drills & Resources) */}
                    <div className="space-y-8">
                        
                        {/* Upcoming Drills Widget - Enhanced */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white rounded-3xl p-6 shadow-2xl">
                            <div className="absolute inset-0 opacity-10" style={{
                                backgroundImage: `url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}></div>
                            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-20 -ml-20 -mb-20"></div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 backdrop-blur-sm flex items-center justify-center">
                                            <Calendar className="w-5 h-5 text-blue-400" />
                                        </div>
                                        Drill Schedule
                                    </h2>
                                    <span className="text-xs bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full text-blue-200 font-semibold">2025</span>
                                </div>
                                
                                <div className="space-y-3">
                                    {DASHBOARD_DATA.drills.map((drill, i) => (
                                        <div key={drill.id} className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="font-bold text-white group-hover:text-blue-300 transition-colors text-sm">{drill.title}</div>
                                                {i === 0 && (
                                                    <span className="flex items-center gap-1.5 bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 px-2 py-1 rounded-full">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                                                        <span className="text-xs text-amber-300 font-semibold">NEXT</span>
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-blue-200 mb-4">
                                                <Clock className="w-4 h-4" />
                                                {drill.date}
                                            </div>
                                            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                                                <Bell className="w-4 h-4" />
                                                Set Reminder
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Quick Resources - Enhanced */}
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                                    <Zap className="w-5 h-5 text-indigo-600" />
                                </div>
                                Quick Access
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { name: "Shelters", icon: MapPin, color: "from-blue-500 to-cyan-600", bg: "bg-blue-50" },
                                    { name: "Contacts", icon: Activity, color: "from-emerald-500 to-teal-600", bg: "bg-emerald-50" },
                                    { name: "Maps", icon: MapPin, color: "from-purple-500 to-pink-600", bg: "bg-purple-50" },
                                    { name: "Community", icon: Users, color: "from-amber-500 to-orange-600", bg: "bg-amber-50" },
                                ].map((r, i) => (
                                    <button key={i} className="group relative overflow-hidden flex flex-col items-center justify-center p-5 bg-white border-2 border-slate-200 rounded-2xl hover:shadow-xl hover:border-transparent hover:-translate-y-1 transition-all duration-300 text-center">
                                        <div className={`absolute inset-0 bg-gradient-to-br ${r.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                                        <div className={`relative w-12 h-12 rounded-xl ${r.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                                            <r.icon className="w-6 h-6 text-slate-600" />
                                        </div>
                                        <span className="relative text-sm font-bold text-slate-700 group-hover:text-slate-900">{r.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Banner - Enhanced */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-6 text-white text-center shadow-2xl">
                            <div className="absolute inset-0 opacity-20" style={{
                                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                                backgroundSize: '30px 30px'
                            }}></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-xl mb-2">Invite Your Team</h3>
                                <p className="text-indigo-100 text-sm mb-5">Ensure your entire household is prepared together.</p>
                                <button className="bg-white hover:bg-indigo-50 text-indigo-600 text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl w-full flex items-center justify-center gap-2">
                                    <Users className="w-4 h-4" />
                                    Send Invite Link
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Safety Sessions CTA Banner */}
                <div className="mt-8 relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl">
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }}></div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    
                    <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-white text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                                <GraduationCap className="w-8 h-8" />
                                <h2 className="text-3xl font-bold">Safety Training Sessions</h2>
                            </div>
                            <p className="text-indigo-100 text-lg mb-4 max-w-2xl">
                                Join expert-led safety workshops and get certified in life-saving techniques. 
                                Book your spot in interactive sessions near you.
                            </p>
                            <div className="flex items-center gap-6 justify-center md:justify-start text-sm">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-emerald-300" />
                                    <span>Expert Instructors</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-emerald-300" />
                                    <span>Get Certified</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-emerald-300" />
                                    <span>Small Groups</span>
                                </div>
                            </div>
                        </div>
                        <Button 
                            variant="outline" 
                            className="bg-white text-indigo-600 hover:bg-indigo-50 border-0 h-14 px-8 text-lg font-semibold shadow-2xl shrink-0"
                            onClick={() => navigate('safetysessions')}
                        >
                            <Calendar className="w-5 h-5 mr-2" />
                            Browse Sessions
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;