import React from "react";
import { useNavigate } from "react-router-dom";
import {ShieldCheck,HeartHandshake,Target,Users,Globe,CheckCircle,Zap} from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100">

      {/* HERO SECTION */}
      <div className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="absolute top-0 right-0 -z-10 translate-x-1/3 -translate-y-1/4 opacity-20">
          <svg viewBox="0 0 1024 1024" className="h-[64rem] w-[64rem]" aria-hidden="true">
            <circle cx="512" cy="512" r="512" fill="url(#aboutGradient)" fillOpacity="0.7" />
            <defs>
              <radialGradient
                id="aboutGradient"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(512 512) rotate(90) scale(512)"
              >
                <stop stopColor="#2563EB" />
                <stop offset="1" stopColor="#1E40AF" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center lg:text-left">
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              DisasterMate
            </span>
          </h1>

          <p className="text-xl text-slate-600 mb-10 max-w-2xl">
            We empower people with life-saving technology—so no one is unprepared
            when disaster strikes.
          </p>

          {/* JOIN BUTTON */}
          <Button
            onClick={() => navigate("/login")}
            className="px-10 py-4 text-lg shadow-xl shadow-blue-600/30 hover:-translate-y-1 transition-all"
          >
            Join Us Today
          </Button>
        </div>
      </div>

      {/* MISSION SECTION */}
      <div className="py-24 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            To build the world’s most reliable disaster-preparedness ecosystem —
            powered by real-time alerts and community collaboration.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: ShieldCheck,
                title: "Safety First",
                desc: "Accurate alerts and rapid response to protect lives.",
                color: "text-blue-400",
              },
              {
                icon: Users,
                title: "Community Driven",
                desc: "Crowdsourced data ensures real-time updates.",
                color: "text-indigo-400",
              },
              {
                icon: Globe,
                title: "Global Reach",
                desc: "Helping people across regions and climates.",
                color: "text-emerald-400",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl border border-slate-800 bg-slate-800/40 shadow-xl"
              >
                <item.icon className={`w-12 h-12 mx-auto mb-4 ${item.color}`} />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STORY SECTION */}
      <div className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl md:text-5xl font-bold text-center mb-12">
            Born from necessity. Built for everyone.
          </h3>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-lg text-slate-700">
              <p>
                DisasterMate was founded after witnessing the devastating impact
                of unplanned emergencies.
              </p>
              <p>
                Our team of engineers and disaster experts came together to
                create an accessible preparedness platform.
              </p>
              <p>
                From alerts to survival tools, we evolve continuously to protect
                communities.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Zap, label: "Instant Alerts" },
                  { icon: Target, label: "AI Risk Analysis" },
                  { icon: HeartHandshake, label: "Community Help" },
                  { icon: CheckCircle, label: "Verified Guides" },
                ].map((f, i) => (
                  <Card
                    key={i}
                    className="p-6 text-center hover:-translate-y-1 transition"
                  >
                    <f.icon className="w-8 h-8 mx-auto text-blue-600 mb-3" />
                    <p className="font-semibold">{f.label}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TEAM SECTION */}
      <div className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Meet the Team</h2>

          <div className="grid md:grid-cols-3 gap-10 mt-12">
            {["Himanshu Chaudhary", "Sunny Kumar", "Julie Kumari"].map((name, i) => (
              <div
                key={i}
                className="p-8 border rounded-3xl shadow-xl hover:-translate-y-2 transition"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {name[0]}
                </div>
                <h3 className="text-xl font-bold">{name}</h3>
                <p className="text-slate-500">Disaster Response Specialist</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-24 bg-blue-600 text-center text-white">
        <h2 className="text-4xl font-bold mb-6">
          Ready to be part of our mission?
        </h2>
        <p className="text-xl mb-10">
          Join millions who trust DisasterMate.
        </p>
        <Button
          onClick={() => navigate("/signup")}
          className="bg-white text-blue-600 px-10 py-4 text-lg shadow-xl"
        >
          Get Started
        </Button>
      </div>

    </div>
  );
};

export default About;
