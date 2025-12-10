import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Flag, CheckCircle, Star, PlayCircle, X } from "lucide-react";

const Modules = () => {
  const navigate = useNavigate();
  const [openModule, setOpenModule] = useState(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  department: "",
  message: ""
});
const handleInput = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};


  const moduleDetails = {
    "Fire Safety Basics": {
      dos: ["Stay low during smoke.", "Use fire extinguishers properly.", "Follow evacuation routes."],
      donts: ["Do not use elevators.", "Do not open hot doors.", "Do not panic."],
      videos: ["https://www.youtube.com/watch?v=GVBamXXVD30", "https://www.youtube.com/watch?v=3aLWlDY_G9w"],
      kit: ["Fire extinguisher", "Whistle", "Smoke mask"]
    },
    "CPR & First Aid": {
      dos: ["Check breathing.", "Call emergency number.", "Start compressions."],
      donts: ["Don’t delay CPR.", "Don’t give food to unconscious person."],
      videos: ["https://www.youtube.com/watch?v=M4ACYp75mjU", "https://www.youtube.com/watch?v=5OKFljZ2GQE"],
      kit: ["Bandages", "Antiseptic", "Gloves"]
    },
    "Flood Preparedness": {
      dos: ["Move to higher ground.", "Turn off electricity.", "Store clean drinking water."],
      donts: ["Do not walk in moving water.", "Don’t ignore warnings."],
      videos: ["https://www.youtube.com/watch?v=dtz4_HzmFT8"],
      kit: ["Flashlight", "Waterproof bag", "Food supply","First aid kit and essential medicines",
        "Emergency food (dry items) and water (packed and sealed)",
        "Candles and matches in a waterproof container",
        "Chlorine tablets or powdered water", 
        "Important documents (Ration card, Voter ID card, Aadhar Card etc.)","Thick ropes and cords"
      ]
    },
    "Electrical Hazard Response":{
      dos: ["Turn off the main power supply before approaching the area.",
            "Use insulated gloves and tools when handling wires.",
            "Maintain a safe distance from fallen power lines (at least 10 meters).",
            "Call the electrical department/emergency services immediately."],
      donts: ["Do not touch a person being electrocuted directly.",
              "Do not pour water on electrical fires.",
              "Do not attempt repairs unless trained." ],
      videos: ["https://www.youtube.com/watch?v=xnK_CGuKhrM",],
      kit: ["Insulated gloves","Rubber boots","Fire extinguisher(class C)","Voltage tester","Flashlight","First-aid kit"]
    },
    "Evacuation Drill Training": {
      dos: ["Stay calm and listen to instructions from drill coordinators.",
            "Follow designated evacuation routes.",
            "Assist children, elderly, or injured individuals.",
            "Walk quickly but do not run."],
      donts: ["Do not push, run, or panic.",
              "Do not use elevators during evacuation.",
              "Do not return to the building until declared safe."],
      videos: ["https://www.youtube.com/watch?v=TuMWWquiqV0&t=127s"],
      kit: ["Evacuation route map","Whistle","Emergency vest for coordinators",
          "Megaphone","Flashlight"]
    },
    "Cyclone Readiness": {
      dos: ["Secure windows and doors with shutters.",
            "Stock up emergency supplies (food, water, batteries).",
            "Move to a safe shelter if you live in low-lying areas.",
            "Charge phones and backup power banks."],
      donts: ["Do not go near beaches or open waters.",
              "Do not drive during the cyclone.",
              "Do not ignore evacuation orders."],
      videos: ["https://www.youtube.com/watch?v=HDJSj-cpRnM&t=15s"],
      kit: ["Emergency radio","Waterproof bag","Drinking water (3-day supply)",
            "Canned food",
            "Flashlight + batteries",
            "First-aid box"]
  },
  "Earthquake Emergency Protocol": {
    dos: [
      "Drop, Cover, and Hold during shaking.",
      "Stay away from windows and heavy objects.",
      "Move to an open area after the shaking stops.",
      "Turn off gas and electricity if safe.",
      "Keep emergency supplies ready."
    ],
    donts: [
      "Do not use elevators during or after an earthquake.",
      "Do not run outside while shaking.",
      "Do not stand near buildings or poles.",
      "Do not light matches near gas leaks."
    ],
    videos: [
      "https://www.youtube.com/watch?v=BLEPakj1YTY",
      "https://www.youtube.com/watch?v=t36YzCnmjEU",
    ],
    kit: [
      "Whistle",
      "Torch",
      "Dust mask",
      "First-aid kit",
      "Portable radio",
      "Non-perishable food"
    ]
  },

  "Landslide Preparedness": {
    dos: [
      "Stay alert during heavy rainfall.",
      "Identify safe zones away from steep inclines.",
      "Keep drains and gutters clear.",
      "Evacuate immediately if cracks or tilting structures appear.",
      "Follow local authority alerts."
    ],
    donts: [
      "Do not build or stay near steep slopes.",
      "Do not cross landslide-prone areas during rain.",
      "Do not ignore warning signs like ground movement.",
      "Do not return to affected areas until cleared."
    ],
    videos: ["https://www.youtube.com/watch?v=_JYEY4duauI",
      "https://www.youtube.com/watch?v=gLZBdflW_J4",
    ],
    kit: [
      "Helmet",
      "Rope",
      "Flashlight",
      "Whistle",
      "Rain gear",
      "First-aid kit"
    ]
  }
  };
  const YouTubeEmbed = ({ url }) => {
  const videoId = url.includes("watch?v=")
    ? url.split("watch?v=")[1].split("&")[0]
    : url.split("/").pop();

  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg border mb-6">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};


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
          <button 
            className="mt-6 px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl shadow hover:bg-blue-50 transition"
            onClick={() => setOpenModule("Earthquake Emergency Protocol")}
          >
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
            "Cyclone Readiness",
            "Earthquake Emergency Protocol",
            "Landslide Preparedness"
          ].map((module, index) => (
            <div key={index} className="border border-slate-200 rounded-2xl p-6 shadow hover:shadow-lg transition bg-white">
              <h3 className="font-semibold text-lg mb-3">{module}</h3>
              <p className="text-slate-600 mb-4">
                Learn essential safety steps and procedures for {module.toLowerCase()}.
              </p>
              <button 
                className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2"
                onClick={() => setOpenModule(module)}
              >
                <PlayCircle className="w-5 h-5" /> Start Module
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
              <button 
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
                onClick={() => setShowRegisterForm(true)}>
                Register
              </button>

            </div>
          ))}
        </div>
      </section>

      {/* ------------------ MODULE POPUP PANEL (CENTER MODAL) ------------------ */}
{openModule && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white w-[90vw] h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-8 relative border border-slate-200">

      {/* Close button */}
      <button 
        className="absolute top-5 right-5 bg-red-500 text-white p-2 rounded-full shadow hover:bg-red-600"
        onClick={() => setOpenModule(null)}
      >
        <X className="w-5 h-5" />
      </button>

      <h2 className="text-3xl font-bold mb-6">{openModule}</h2>

      <div className="space-y-8">

        {/* Do's */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-green-700">✅ Do’s</h3>
          <ul className="list-disc ml-6 text-slate-700">
            {(moduleDetails[openModule]?.dos || []).map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>
        </div>

        {/* Don'ts */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-red-700">❌ Don’ts</h3>
          <ul className="list-disc ml-6 text-slate-700">
            {(moduleDetails[openModule]?.donts || []).map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>
        </div>

        {/* Videos */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-blue-700">🎥 Video Tutorials</h3>

          <div className="grid md:grid-cols-2 gap-6">
            {(moduleDetails[openModule]?.videos || []).map((url, idx) => (
              <YouTubeEmbed key={idx} url={url} />
            ))}
          </div>
        </div>

        {/* Emergency Kit */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-orange-700">🧰 Emergency Kit</h3>
          <ul className="list-disc ml-6 text-slate-700">
            {(moduleDetails[openModule]?.kit || []).map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  </div>
)}


{/* ------------------ REGISTRATION FORM MODAL ------------------ */}
{showRegisterForm && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white w-[90vw] max-w-xl p-8 rounded-3xl shadow-xl relative border">

      {/* Close Button */}
      <button
        onClick={() => setShowRegisterForm(false)}
        className="absolute top-5 right-5 bg-red-500 text-white p-2 rounded-full"
      >
        <X className="w-5 h-5" />
      </button>

      <h2 className="text-2xl font-bold mb-6 text-slate-800">Drill Registration Form</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitForm();
        }}
        className="space-y-5"
      >
        <input
          name="name"
          type="text"
          required
          placeholder="Your Name"
          onChange={handleInput}
          className="w-full p-3 border rounded-xl"
        />

        <input
          name="email"
          type="email"
          required
          placeholder="Email Address"
          onChange={handleInput}
          className="w-full p-3 border rounded-xl"
        />

        <input
          name="phone"
          type="tel"
          required
          placeholder="Phone Number"
          onChange={handleInput}
          className="w-full p-3 border rounded-xl"
        />

        <input
          name="department"
          type="text"
          placeholder="Department / Class"
          onChange={handleInput}
          className="w-full p-3 border rounded-xl"
        />

        <textarea
          name="message"
          placeholder="Any additional information"
          onChange={handleInput}
          className="w-full p-3 border rounded-xl"
          rows="3"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Submit Registration
        </button>
      </form>

    </div>
  </div>
)}
</div>
  )}
export default Modules;
