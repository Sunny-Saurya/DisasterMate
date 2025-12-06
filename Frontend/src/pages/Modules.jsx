import React from "react";
import { Calendar, Clock, MapPin, PlayCircle, User, Flag, CheckCircle, Star } from "lucide-react";

const Modules = ({navigate}) => {
  return (
    <div className="min-h-screen bg-white text-slate-800 pt-28 px-6">
     
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900">Training Modules</h1>
        <p className="text-slate-600 mt-3 text-lg">
          Structured learning paths, featured safety modules, and upcoming drills to prepare you for any emergency.
        </p>
      </div>

     
      <section className="max-w-5xl mx-auto mb-16">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-10 shadow-xl">
          <h2 className="text-2xl font-bold">🔥 Featured Module: Earthquake Emergency Protocol</h2>
          <p className="mt-3 text-blue-100">
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
            {
              title: "Beginner Path",
              desc: "Basics of safety, first aid & fire prevention.",
              icon: <Flag className="w-6 h-6 text-blue-600" />,
            },
            {
              title: "Advanced Path",
              desc: "Evacuation leadership & emergency response.",
              icon: <Star className="w-6 h-6 text-blue-600" />,
            },
            {
              title: "Professional Path",
              desc: "For campus coordinators & trained responders.",
              icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-2xl p-8 shadow hover:shadow-lg hover:-translate-y-1 transition cursor-pointer"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

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
            <div
              key={index}
              className="border border-slate-200 rounded-xl p-6 shadow hover:shadow-lg transition bg-white"
            >
              <h3 className="font-semibold text-lg mb-3">{module}</h3>
              <p className="text-slate-600 mb-4">
                Learn essential safety steps and procedures for {module.toLowerCase()}.
              </p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Start Module
              </button>
            </div>
          ))}
        </div>
      </section>

    
      <section className="max-w-6xl mx-auto mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Upcoming Drills</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Mock Fire Drill",
              date: "12 Jan 2025",
              time: "10:00 AM",
              location: "Block A – Main Ground",
            },
            {
              title: "Earthquake Safety Demo",
              date: "22 Jan 2025",
              time: "2:00 PM",
              location: "Auditorium Hall",
            },
          ].map((drill, index) => (
            <div
              key={index}
              className="p-6 border border-slate-200 rounded-xl shadow hover:shadow-lg bg-white transition"
            >
              <h3 className="text-xl font-semibold mb-2">{drill.title}</h3>
              <div className="flex items-center text-slate-600 gap-2 mb-1">
                <Calendar className="w-5 h-5" /> {drill.date}
              </div>
              <div className="flex items-center text-slate-600 gap-2 mb-1">
                <Clock className="w-5 h-5" /> {drill.time}
              </div>
              <div className="flex items-center text-slate-600 gap-2">
                <MapPin className="w-5 h-5" /> {drill.location}
              </div>

              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
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
