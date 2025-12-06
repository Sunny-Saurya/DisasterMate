import React from "react";
import { ShieldCheck, HeartHandshake, Target, Users, Globe, CheckCircle, Zap } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const About = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100">

    
      <div className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
       
        <div className="absolute top-0 right-0 -z-10 translate-x-1/3 -translate-y-1/4 opacity-20">
          <svg viewBox="0 0 1024 1024" className="h-[64rem] w-[64rem]" aria-hidden="true">
            <circle cx="512" cy="512" r="512" fill="url(#aboutGradient)" fillOpacity="0.7" />
            <defs>
              <radialGradient
                id="aboutGradient"
                cx="0" cy="0" r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(512 512) rotate(90) scale(512)"
              >
                <stop stopColor="#2563EB" />
                <stop offset="1" stopColor="#1E40AF" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left">
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">DisasterMate</span>
          </h1>

          <p className="text-xl text-slate-600 mb-10 max-w-2xl">
            We exist to empower people with life-saving technology—so no one is ever caught unprepared when disaster strikes.
          </p>

          <Button onClick={() => navigate("signup")} className="px-10 py-4 text-lg shadow-xl shadow-blue-600/30 hover:-translate-y-1 transition-all">
            Join Us Today
          </Button>
        </div>
      </div>


      <div className="py-24 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            To create the world’s most reliable disaster-preparedness ecosystem —
            powered by real-time alerts, community collaboration, and cutting-edge safety tools.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: ShieldCheck,
                title: "Safety First",
                desc: "We prioritize accurate alerts and rapid response to protect every user.",
                color: "text-blue-400",
              },
              {
                icon: Users,
                title: "Community Driven",
                desc: "Crowdsourced data & verified reports ensure fast and reliable updates.",
                color: "text-indigo-400",
              },
              {
                icon: Globe,
                title: "Global Impact",
                desc: "Serving millions of users across varied regions and climates.",
                color: "text-emerald-400",
              },
            ].map((item, idx) => (
              <div key={idx} className="p-8 border border-slate-800 rounded-3xl bg-slate-800/40 backdrop-blur-xl shadow-xl">
                <item.icon className={`w-12 h-12 mx-auto mb-4 ${item.color}`} />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

   
      <div className="py-24 bg-slate-50 relative">
       
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-blue-200 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-center text-blue-600 font-semibold tracking-wide uppercase text-sm mb-3">
            Our Story
          </h2>

          <h3 className="text-3xl md:text-5xl text-center font-bold text-slate-900 mb-12">
            Born from necessity. Built for everyone.
          </h3>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
         
            <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
              <p>
                DisasterMate was founded after witnessing the devastating impact of unplanned emergencies. We realized that millions of people lacked timely alerts, practical instructions, and community assistance.
              </p>
              <p>
                Our team of disaster experts, engineers, and designers came together with a single goal — <strong>to build the world's most accessible preparedness platform.</strong>
              </p>
              <p>
                From simple alerts to advanced survival tools, we continue to evolve, innovate, and protect communities across the globe.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-md border border-slate-200 rounded-3xl shadow-xl p-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Zap, label: "Instant Alerts" },
                  { icon: Target, label: "AI Risk Analysis" },
                  { icon: HeartHandshake, label: "Community Help" },
                  { icon: CheckCircle, label: "Verified Safety Guides" },
                ].map((f, i) => (
                  <Card key={i} className="p-6 bg-white border border-slate-100 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-center">
                    <f.icon className="w-8 h-8 mx-auto text-blue-600 mb-3" />
                    <div className="text-slate-700 font-semibold text-sm">{f.label}</div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Meet The Team</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-16">
            A passionate group of builders committed to saving lives and shaping a safer world.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {["Himanshu Chaudhary", "Sunny Kumar", "Julie Kumari"].map((name, idx) => (
              <div
                key={idx}
                className="p-8 bg-white border border-slate-200 rounded-3xl shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4">
                  {name[0]}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{name}</h3>
                <p className="text-sm text-slate-500 mt-1">Disaster Response Specialist</p>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className="py-24 bg-blue-600 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        ></div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to be part of our mission?</h2>
          <p className="text-xl text-blue-100 mb-10">
            Join millions of users who trust DisasterMate to protect what matters most.
          </p>
          <Button
            onClick={() => navigate("signup")}
            className="bg-white text-black text-blue-600 hover:bg-blue-50 border-none px-10 py-4 text-lg shadow-xl"
          >
            Get Started
          </Button>
        </div>
      </div>

    </div>
  );
};

export default About;
