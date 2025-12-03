import React, { useState } from 'react';
import { 
    Thermometer, Wind, AlertTriangle, ChevronRight, Activity, 
    MapPin, Bell, Shield, BookOpen, Clock, CheckCircle, Search,
    MoreVertical, Zap, Calendar, Users
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { DASHBOARD_DATA } from '../data/mockData';

const Dashboard = ({ user }) => {
    // Local state for basic interactions
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="min-h-screen bg-slate-50/50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user}</h1>
                        <p className="text-slate-500 mt-1 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            System Operational • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
                            <Thermometer className="w-5 h-5 text-blue-500 mr-2" />
                            <span className="font-semibold text-slate-700 mr-3">{DASHBOARD_DATA.weather.temp}</span>
                            <div className="w-px h-4 bg-slate-300 mr-3"></div>
                            <Wind className="w-5 h-5 text-slate-400 mr-2" />
                            <span className="text-slate-600 text-sm">{DASHBOARD_DATA.weather.wind}</span>
                        </div>
                        <Button variant="danger" className="shadow-lg shadow-red-500/20">
                            <Zap className="w-4 h-4 mr-2" />
                            SOS Alert
                        </Button>
                    </div>
                </div>

                {/* Quick Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     {[
                         { label: "Safety Score", value: "92%", color: "text-emerald-600", bg: "bg-emerald-50", icon: Shield },
                         { label: "Active Alerts", value: "2", color: "text-red-600", bg: "bg-red-50", icon: Bell },
                         { label: "Drills Pending", value: "1", color: "text-amber-600", bg: "bg-amber-50", icon: Clock },
                         { label: "Modules Done", value: "4/12", color: "text-blue-600", bg: "bg-blue-50", icon: BookOpen },
                     ].map((stat, i) => (
                         <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4 transition-transform hover:-translate-y-1 duration-200">
                             <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                                 <stat.icon className="w-6 h-6" />
                             </div>
                             <div>
                                 <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                                 <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">{stat.label}</div>
                             </div>
                         </div>
                     ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column (Alerts & Modules) */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Alerts Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5 text-red-500" />
                                    Priority Alerts
                                </h2>
                                <button className="text-sm text-slate-500 hover:text-blue-600 font-medium">History</button>
                            </div>
                            
                            {DASHBOARD_DATA.alerts.map(alert => (
                                <div key={alert.id} className="group relative overflow-hidden bg-white rounded-2xl shadow-md border-l-4 border-l-red-500 p-6 transition-all hover:shadow-lg">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-50 to-transparent opacity-50 rounded-bl-full -mr-16 -mt-16 pointer-events-none"></div>
                                    <div className="relative flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                                                <AlertTriangle className="w-5 h-5 text-red-600" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3 className="text-lg font-bold text-slate-900">{alert.title}</h3>
                                                    <Badge level={alert.level}>CRITICAL</Badge>
                                                </div>
                                                <p className="text-slate-600 mb-3">{alert.location} • <span className="font-medium text-red-600">Valid until {alert.time}</span></p>
                                                <div className="flex gap-2">
                                                    <button className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition-colors">
                                                        View Map
                                                    </button>
                                                    <button className="text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-700 px-3 py-1.5 rounded-lg transition-colors">
                                                        Emergency Protocols
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Learning Progress */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-blue-500" />
                                    Learning Path
                                </h2>
                                <button className="text-sm text-blue-600 font-medium hover:underline">View All Modules</button>
                            </div>
                            
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                <div className="divide-y divide-slate-100">
                                    {DASHBOARD_DATA.preparedness.map((item, i) => (
                                        <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                                                item.progress === 100 ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-50 text-blue-600'
                                            }`}>
                                                {item.progress === 100 ? <CheckCircle className="w-5 h-5" /> : <item.icon className="w-5 h-5" />}
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex justify-between mb-1">
                                                    <span className="font-semibold text-slate-900">{item.title}</span>
                                                    <span className="text-xs font-medium text-slate-500">{item.progress}%</span>
                                                </div>
                                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                    <div 
                                                        className={`h-full rounded-full transition-all duration-1000 ${
                                                            item.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'
                                                        }`} 
                                                        style={{ width: `${item.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <button className="p-2 text-slate-400 hover:text-blue-600">
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 bg-slate-50 text-center">
                                    <button className="text-sm font-semibold text-slate-600 hover:text-slate-900">
                                        + Start New Certification
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Drills & Resources) */}
                    <div className="space-y-8">
                        
                        {/* Upcoming Drills Widget */}
                        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-bold flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-blue-400" />
                                        Drill Schedule
                                    </h2>
                                    <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300">Fall 2025</span>
                                </div>
                                
                                <div className="space-y-4">
                                    {DASHBOARD_DATA.drills.map((drill, i) => (
                                        <div key={drill.id} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:bg-slate-800 transition-colors cursor-pointer group">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="font-semibold text-slate-200 group-hover:text-white transition-colors">{drill.title}</div>
                                                {i === 0 && <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                                                <Clock className="w-3 h-3" />
                                                {drill.date}
                                            </div>
                                            <Button variant="outline" className="w-full h-8 text-xs border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">
                                                Add Reminder
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Quick Resources */}
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Resources</h2>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { name: "Shelters", icon: MapPin },
                                    { name: "Emergency Contacts", icon: Activity },
                                    { name: "Offline Maps", icon: MapPin },
                                    { name: "Community", icon: Users },
                                ].map((r, i) => (
                                    <button key={i} className="flex flex-col items-center justify-center p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md hover:border-blue-200 hover:-translate-y-0.5 transition-all text-center">
                                        <r.icon className="w-6 h-6 text-slate-400 mb-2" />
                                        <span className="text-sm font-medium text-slate-700">{r.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Banner */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white text-center shadow-lg shadow-blue-500/30">
                            <h3 className="font-bold text-lg mb-2">Invite Roommates</h3>
                            <p className="text-blue-100 text-sm mb-4">Ensure your entire household is prepared.</p>
                            <button className="bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors w-full">
                                Send Invite Link
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;