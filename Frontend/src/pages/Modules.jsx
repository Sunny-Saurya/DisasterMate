import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Flag, CheckCircle, Star, PlayCircle } from "lucide-react";

const Modules = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 pt-28 px-6">
      
      {/* ------------------ HERO SECTION ------------------ */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold text-slate-900">Training Modules</h1>
        <p className="text-slate-600 mt-4 text-lg">
          Structured learning paths, featured safety modules, and upcoming drills to prepare you for any emergency.
        </p>
      </div>

      {/* ------------------ DISASTER QUICK ACCESS ------------------ */}
      <div 
        onClick={() => navigate("/disaster")}
        className="max-w-4xl mx-auto mt-10 mb-16 cursor-pointer group"
      >
        <div className="p-8 rounded-3xl bg-linear-to-r from-red-600 to-orange-500 text-white shadow-lg border border-red-300
                        group-hover:shadow-2xl group-hover:-translate-y-1 transition-all duration-300">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
            <div>
              <h2 className="text-2xl font-bold">🌪️ Disaster Management Hub</h2>
              <p className="text-red-100 mt-2">
                Explore disaster types, emergency kits, live alerts, and quick-action guides.
              </p>
            </div>
            <div className="bg-white/20 px-6 py-3 rounded-xl text-white font-semibold 
                            group-hover:bg-white/30 transition text-center">
              Open →
            </div>
          </div>
        </div>
      </div>

      {/* ------------------ FEATURED MODULE ------------------ */}
      <section className="max-w-5xl mx-auto mb-20">
        <div className="bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-3xl p-10 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold">🔥 Featured Module: Earthquake Emergency Protocol</h2>
          <p className="mt-4 text-blue-100 text-lg">
            Learn critical actions to take before, during, and after an earthquake to stay safe and assist others.
          </p>
          <button className="mt-6 px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl shadow hover:bg-blue-50 transition">
            Start Module
          </button>
        </div>
      </section>

      {/* ------------------ LEARNING PATHS ------------------ */}
      <section className="max-w-6xl mx-auto mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Learning Paths</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Beginner Path", desc: "Basics of safety, first aid & fire prevention.", icon: <Flag className="w-6 h-6 text-blue-600" /> },
            { title: "Advanced Path", desc: "Evacuation leadership & emergency response.", icon: <Star className="w-6 h-6 text-blue-600" /> },
            { title: "Professional Path", desc: "For campus coordinators & trained responders.", icon: <CheckCircle className="w-6 h-6 text-blue-600" /> },
          ].map((item, idx) => (
            <div key={idx} className="border border-slate-200 rounded-2xl p-8 shadow hover:shadow-lg hover:-translate-y-1 transition cursor-pointer bg-white">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------ AVAILABLE MODULES ------------------ */}
      <section className="max-w-6xl mx-auto mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Available Modules</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            "Fire Safety Basics",
            "CPR & First Aid",
            "Flood Preparedness",
            "Electrical Hazard Response",
            "Evacuation Drill Training",
            "Cyclone Readiness"
          ].map((module, index) => (
            <div key={index} className="border border-slate-200 rounded-2xl p-6 shadow hover:shadow-lg transition bg-white">
              <h3 className="font-semibold text-lg mb-3">{module}</h3>
              <p className="text-slate-600 mb-4">
                Learn essential safety steps and procedures for {module.toLowerCase()}.
              </p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
                Start Module
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------ UPCOMING DRILLS ------------------ */}
      <section className="max-w-6xl mx-auto mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Upcoming Drills</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: "Mock Fire Drill", date: "12 Jan 2025", time: "10:00 AM", location: "Block A – Main Ground" },
            { title: "Earthquake Safety Demo", date: "22 Jan 2025", time: "2:00 PM", location: "Auditorium Hall" },
          ].map((drill, index) => (
            <div key={index} className="p-6 border border-slate-200 rounded-2xl shadow hover:shadow-lg bg-white transition">
              <h3 className="text-xl font-semibold mb-2">{drill.title}</h3>
              <div className="flex items-center text-slate-600 gap-2 mb-1"><Calendar className="w-5 h-5" /> {drill.date}</div>
              <div className="flex items-center text-slate-600 gap-2 mb-1"><Clock className="w-5 h-5" /> {drill.time}</div>
              <div className="flex items-center text-slate-600 gap-2"><MapPin className="w-5 h-5" /> {drill.location}</div>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
                Register
              </button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Modules;
