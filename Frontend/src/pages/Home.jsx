import React from 'react';
import { Zap, BookOpen, Activity } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const HomePage = ({ navigate }) => (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100">
        <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 rounded-bl-[100px] blur-3xl opacity-60"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-full bg-slate-50 rounded-tr-[100px] blur-3xl opacity-60"></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-8 animate-fade-in-up">
                    <span className="w-2 h-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
                    Now available in your region
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
                    Resilience Starts <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Before the Storm.</span>
                </h1>
                <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-12 leading-relaxed">
                    DisasterMate empowers you with real-time alerts, personalized survival drills, and community resources. Stay safe, stay connected.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button onClick={() => navigate('login')} className="px-8 py-4 text-lg shadow-xl shadow-blue-600/20">
                        Get Started Free
                    </Button>
                    <Button variant="outline" className="px-8 py-4 text-lg">
                        View Live Map
                    </Button>
                </div>
            </div>
        </div>

        <div className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: Zap, title: "Real-Time Alerts", desc: "Instant notifications for weather, geological, and civil emergencies in your exact location." },
                        { icon: BookOpen, title: "Survival Guides", desc: "Offline-accessible guides for first aid, evacuation routes, and shelter building." },
                        { icon: Activity, title: "Drill Simulations", desc: "Run practice scenarios to ensure you and your family know exactly what to do." }
                    ].map((feature, idx) => (
                        <Card key={idx} className="bg-white border-none shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default HomePage;
