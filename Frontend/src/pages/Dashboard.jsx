import React from 'react';
import { Thermometer, Wind, AlertTriangle, ChevronRight, Activity, MapPin } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { DASHBOARD_DATA } from '../data/mockData';

const Dashboard = ({ user }) => (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Command Center</h1>
                    <p className="text-slate-500 mt-1">Status Overview for {user}</p>
                </div>
                <div className="flex items-center bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
                    <Thermometer className="w-5 h-5 text-slate-400 mr-2" />
                    <span className="font-semibold text-slate-700 mr-4">{DASHBOARD_DATA.weather.temp}</span>
                    <Wind className="w-5 h-5 text-slate-400 mr-2" />
                    <span className="text-slate-600 text-sm">{DASHBOARD_DATA.weather.wind}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {DASHBOARD_DATA.alerts.map(alert => (
                    <div key={alert.id} className="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-l-4 border-l-red-500 border-y-slate-100 border-r-slate-100 p-6 flex flex-col md:flex-row items-start md:items-center justify-between">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -mr-8 -mt-8 z-0"></div>
                        <div className="relative z-10 flex items-start gap-4">
                            <div className="p-3 bg-red-100 rounded-full shrink-0">
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-lg font-bold text-slate-900">{alert.title}</h3>
                                    <Badge level={alert.level}>CRITICAL</Badge>
                                </div>
                                <p className="text-slate-600 text-sm">Affecting {alert.location} • Valid until {alert.time}</p>
                            </div>
                        </div>
                        <Button variant="outline" className="mt-4 md:mt-0 relative z-10 text-sm py-2">
                            View Protocols
                        </Button>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-slate-900">Preparedness Checklist</h3>
                        <span className="text-blue-600 text-sm font-semibold cursor-pointer">Manage All</span>
                    </div>
                    <div className="space-y-6">
                        {DASHBOARD_DATA.preparedness.map(item => (
                            <div key={item.id} className="group">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${item.progress === 100 ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium text-slate-700">{item.title}</span>
                                    </div>
                                    <span className="text-xs font-semibold text-slate-500">{item.status}</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div 
                                        className={`h-2 rounded-full transition-all duration-500 ${item.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                                        style={{ width: `${item.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-slate-800">Complete your First Aid Training</p>
                            <p className="text-xs text-slate-500 mt-1">Earn your certification badge.</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                    </div>
                </Card>

                <Card className="flex flex-col h-full bg-slate-800 text-white border-slate-700">
                    <div className="flex items-center gap-3 mb-6">
                        <Activity className="w-6 h-6 text-blue-400" />
                        <h3 className="text-lg font-bold">Upcoming Drills</h3>
                    </div>
                    <div className="space-y-4 flex-1">
                        {DASHBOARD_DATA.drills.map(drill => (
                            <div key={drill.id} className="p-4 rounded-xl bg-slate-700/50 border border-slate-600 hover:bg-slate-700 transition-colors cursor-pointer">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-semibold">{drill.title}</h4>
                                    <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full">{drill.status}</span>
                                </div>
                                <p className="text-sm text-slate-400 flex items-center">
                                    <MapPin className="w-3 h-3 mr-1" /> Virtual / Home
                                </p>
                                <p className="text-sm text-slate-400 mt-1">{drill.date}</p>
                            </div>
                        ))}
                    </div>
                    <Button className="w-full mt-6 bg-blue-500 hover:bg-blue-400 text-white border-none">
                        Schedule New Drill
                    </Button>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {['Local Shelters', 'Emergency Contacts', 'Offline Maps', 'Community Forum'].map((item, i) => (
                     <button key={i} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all font-medium text-slate-700 text-left">
                         {item}
                     </button>
                 ))}
            </div>
        </div>
    </div>
);

export default Dashboard;
