import React from "react";
import { AlertTriangle, Flame, Zap, Droplets, Shield, Heart, PhoneCall, CheckCircle, XCircle } from "lucide-react";

const SafetyTips = ({navigate}) => {
  return (
    <div className="min-h-screen bg-white text-slate-800 pt-28 px-6">
    
      <div className="max-w-6xl mx-auto text-center mb-20">
        <h1 className="text-4xl font-bold text-slate-900">Safety Tips & Guidelines</h1>
        <p className="text-slate-600 mt-3 text-lg max-w-2xl mx-auto">
          Stay informed and prepared. Follow these essential tips to keep yourself, your family,
          and your surroundings safe during emergencies.
        </p>
      </div>

      <section className="max-w-7xl mx-auto mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-10 text-center">Important Safety Categories</h2>

        <div className="grid md:grid-cols-3 gap-10">

        
          <div className="border border-slate-200 rounded-xl p-8 shadow bg-white hover:shadow-lg transition">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Flame className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Fire Safety</h3>
            <ul className="space-y-2 text-slate-700">
              <li>• Keep exits clear at all times.</li>
              <li>• Do not overload electrical sockets.</li>
              <li>• Know your nearest fire extinguisher point.</li>
            </ul>
          </div>

        
          <div className="border border-slate-200 rounded-xl p-8 shadow bg-white hover:shadow-lg transition">
            <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Earthquake Preparedness</h3>
            <ul className="space-y-2 text-slate-700">
              <li>• Drop, Cover & Hold during tremors.</li>
              <li>• Stay away from windows and glass.</li>
              <li>• Move to an open area after shaking stops.</li>
            </ul>
          </div>

       
          <div className="border border-slate-200 rounded-xl p-8 shadow bg-white hover:shadow-lg transition">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Droplets className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Flood Safety</h3>
            <ul className="space-y-2 text-slate-700">
              <li>• Move to higher ground immediately.</li>
              <li>• Avoid walking or driving through floodwater.</li>
              <li>• Keep emergency kit waterproofed.</li>
            </ul>
          </div>

          <div className="border border-slate-200 rounded-xl p-8 shadow bg-white hover:shadow-lg transition">
            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Electrical Hazard Safety</h3>
            <ul className="space-y-2 text-slate-700">
              <li>• Keep electronics away from water.</li>
              <li>• Report exposed wires immediately.</li>
              <li>• Switch off mains during emergencies.</li>
            </ul>
          </div>

         
          <div className="border border-slate-200 rounded-xl p-8 shadow bg-white hover:shadow-lg transition">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Campus & Personal Safety</h3>
            <ul className="space-y-2 text-slate-700">
              <li>• Always be aware of exit routes.</li>
              <li>• Do not wander alone late at night.</li>
              <li>• Report suspicious activity immediately.</li>
            </ul>
          </div>

         
          <div className="border border-slate-200 rounded-xl p-8 shadow bg-white hover:shadow-lg transition">
            <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-rose-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Basic First Aid</h3>
            <ul className="space-y-2 text-slate-700">
              <li>• Know CPR and bleeding control basics.</li>
              <li>• Keep a stocked first-aid kit handy.</li>
              <li>• Avoid moving injured persons unnecessarily.</li>
            </ul>
          </div>

        </div>
      </section>

      
      <section className="max-w-7xl mx-auto mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-10 text-center">Do’s & Don’ts</h2>

        <div className="grid md:grid-cols-2 gap-10">

         
          <div className="bg-green-50 border border-green-200 p-8 rounded-2xl shadow">
            <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              Do’s
            </h3>
            <ul className="space-y-2 text-slate-700">
              <li>• Stay calm and think clearly.</li>
              <li>• Follow instructions from authorities.</li>
              <li>• Keep emergency contacts saved.</li>
              <li>• Maintain an updated emergency kit.</li>
            </ul>
          </div>

         
          <div className="bg-red-50 border border-red-200 p-8 rounded-2xl shadow">
            <h3 className="text-xl font-semibold text-red-700 mb-4 flex items-center gap-2">
              <XCircle className="w-6 h-6" />
              Don'ts
            </h3>
            <ul className="space-y-2 text-slate-700">
              <li>• Do not spread misinformation.</li>
              <li>• Avoid risky areas during alerts.</li>
              <li>• Do not ignore early warning signs.</li>
              <li>• Never block emergency exits.</li>
            </ul>
          </div>

        </div>
      </section>

      <section className="max-w-5xl mx-auto mb-24">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Important Emergency Contacts</h2>

        <div className="grid md:grid-cols-3 gap-8">

          {[
            { title: "Police", number: "100" },
            { title: "Fire Brigade", number: "101" },
            { title: "Ambulance", number: "102" },
            { title: "Disaster Management", number: "108" },
            { title: "Women Helpline", number: "1091" },
            { title: "Child Helpline", number: "1098" },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 bg-white border border-slate-200 rounded-xl shadow hover:shadow-lg transition text-center"
            >
              <PhoneCall className="w-7 h-7 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-blue-900 text-xl font-bold mt-1">{item.number}</p>
            </div>
          ))}

        </div>
      </section>
    </div>
  );
};

export default SafetyTips;
