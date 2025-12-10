// DisasterPage.jsx
import React, { useState, useEffect } from "react";
import { AlertTriangle, PlayCircle } from "lucide-react";
import { jsPDF } from "jspdf";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import Button from "../components/ui/Button";

// Disaster types
const disasterTypes = [
  { id: "earthquake", title: "Earthquake", color: "from-amber-500 to-amber-600", severity: "High", desc: "Sudden shaking of the ground; know drop-cover-hold procedures and safe exits." },
  { id: "flood", title: "Flood", color: "from-blue-500 to-blue-600", severity: "Medium", desc: "Rising water levels — move to higher ground, avoid driving through water." },
  { id: "cyclone", title: "Cyclone", color: "from-violet-500 to-violet-600", severity: "High", desc: "High winds and heavy rain — prepare shelters and secure loose objects." },
  { id: "fire", title: "Fire", color: "from-red-500 to-red-600", severity: "Medium", desc: "Fast-spreading hazards — know evacuation routes and extinguisher basics." },
  { id: "electrical", title: "Electrical Hazard", color: "from-purple-500 to-purple-600", severity: "Low", desc: "Exposed wires, sparks — turn off mains and keep clear of water." },
];

// Video tutorials
const videoTutorials = [
  { id: "v1", title: "Hands-only CPR", url: "https://www.youtube.com/embed/M4ACYp75mjU" },
  { id: "v2", title: "Using Fire Extinguisher (PASS)", url: "https://www.youtube.com/embed/GVBamXXVD30" },
  { id: "v3", title: "Earthquake Drill - Drop, Cover & Hold", url: "https://www.youtube.com/embed/t36YzCnmjEU" },
];

// Emergency button
const EmergencyBtn = ({ onClick, children, className = "" }) =>
  Button ? (
    <Button onClick={onClick} className={`px-4 py-2 ${className}`}>{children}</Button>
  ) : (
    <button onClick={onClick} className={`px-4 py-2 bg-blue-600 text-white rounded ${className}`}>{children}</button>
  );

export default function DisasterPage({ navigate }) {
  const [activeKit, setActiveKit] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loadingAlerts, setLoadingAlerts] = useState(true);

  // Kits
  const kits = {
    earthquake: ["3 days water", "Non-perishable food", "Torch + batteries", "Whistle & multi-tool", "Documents in waterproof pouch", "Sturdy shoes"],
    flood: ["Waterproof bag", "Extra food", "Life jackets", "Flashlight + powerbank", "Sanitation wipes and masks"],
    cyclone: ["Tie-downs", "Battery radio", "Extra fuel", "Emergency blankets", "First-aid kit"],
    fire: ["Fire blanket", "Small extinguisher", "Smoke mask", "Escape plan", "Meeting point"],
    electrical: ["Insulated gloves", "Turn off mains", "Electrical extinguisher", "Avoid water around devices"],
  };

  // PDF generator
  const generatePDF = (title, kitItems) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`${title} Emergency Kit`, 15, 20);
    doc.setFontSize(12);
    let y = 40;
    kitItems.forEach((item) => { doc.text(`• ${item}`, 15, y); y += 10; });
    doc.save(`${title.replace(" ", "_")}_Kit.pdf`);
  };

  // Fetch live alerts from NASA EONET
  useEffect(() => {
    fetch("https://eonet.gsfc.nasa.gov/api/v3/events")
      .then(res => res.json())
      .then(data => {
        const first10 = data.events.slice(0, 10); // Limit to 10 alerts
        setAlerts(first10);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800 pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* HERO */}
        <header className="bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-10 shadow-xl">
          <h1 className="text-4xl font-extrabold">Disaster Center</h1>
          <p className="mt-2 text-blue-100 max-w-xl">Learn how to prepare, respond, and recover.</p>
        </header>

        {/* Disaster Cards */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Disaster Types</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {disasterTypes.map((d) => (
              <motion.article
                key={d.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border shadow-sm overflow-hidden hover:shadow-lg transition"
              >
                <div className={`p-6 bg-linear-to-r ${d.color} text-white`}>
                  <h3 className="text-xl font-semibold">{d.title}</h3>
                  <p className="text-sm mt-1 text-white/90">{d.desc}</p>
                  <button
                    onClick={() => setActiveKit(activeKit === d.id ? null : d.id)}
                    className="mt-4 bg-white/20 px-3 py-2 rounded-lg"
                  >
                    View Kit
                  </button>
                </div>
                <div className="p-4 bg-white">
                  {activeKit === d.id ? (
                    <>
                      <h4 className="font-semibold mb-2">Recommended Kit</h4>
                      <ul className="list-disc ml-5 text-sm text-slate-700">
                        {kits[d.id].map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => generatePDF(d.title, kits[d.id])}
                          className="px-3 py-2 bg-blue-600 text-white rounded"
                        >
                          Save Kit
                        </button>
                        <button className="px-3 py-2 bg-white border rounded">Share</button>
                      </div>
                    </>
                  ) : <p className="text-sm text-slate-600">Tap "View Kit"...</p>}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* LIVE ALERTS */}
            {/* LIVE ALERTS - HORIZONTAL MARQUEE */}
<section className="mt-8">
  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
    <AlertTriangle className="text-red-600" /> Live Alerts (NASA EONET)
  </h3>

  {loadingAlerts ? (
    <p>Fetching latest alerts...</p>
  ) : (
    <div className="overflow-hidden relative w-full">
      <motion.div
        className="flex gap-4"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        }}
      >
        {alerts.slice(0, 10).map((alert) => (
          <motion.div
            key={alert.id}
            className="min-w-[250px] border rounded-xl p-4 shadow bg-white"
            whileHover={{ scale: 1.05 }}
          >
            <h4 className="font-bold">{alert.title}</h4>
            <p className="text-sm text-gray-600">
              Category: {alert.categories?.[0]?.title}
            </p>
            {alert.geometry?.[0]?.date && (
              <p className="text-xs text-gray-400 mt-1">
                Date: {new Date(alert.geometry[0].date).toLocaleDateString()}
              </p>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )}
</section>

        {/* Live Alerts Map */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Live Alerts Map</h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="h-96 rounded-xl border overflow-hidden"
          >
            <MapContainer center={[0,0]} zoom={2} style={{ height: "100%", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <MarkerClusterGroup>
                {alerts.map(alert => {
                  const coords = alert.geometry[0].coordinates; // [lon, lat]
                  return (
                    <Marker key={alert.id} position={[coords[1], coords[0]]}>
                      <Popup>
                        <strong>{alert.title}</strong><br />
                        {alert.categories.map(c => c.title).join(", ")}
                      </Popup>
                    </Marker>
                  )
                })}
              </MarkerClusterGroup>
            </MapContainer>
          </motion.div>
        </section>

        {/* Video Tutorials */}
        <section className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Video Tutorials</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {videoTutorials.map((v) => (
              <motion.div key={v.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <iframe src={v.url} title={v.title} className="w-full h-56" allowFullScreen />
                <div className="p-4 font-semibold">{v.title}</div>
              </motion.div>
            ))}
          </div>
        </section>


{/* Quick Emergency Actions */}
<section>
  <h2 className="text-2xl font-bold mb-4">Quick Emergency Actions</h2>

  <div className="grid md:grid-cols-4 gap-6">
    {[
      { title: "Call Emergency Services", desc: "Dial 112 / 911 immediately", color: "from-red-500 to-red-600", action: () => window.open("tel:112") },
      { title: "Find Nearest Shelter", desc: "Locate shelters near you", color: "from-green-500 to-green-600", action: () => alert("Shelter locations coming soon!") },
      { title: "Check Emergency Kit", desc: "Review your emergency kit", color: "from-yellow-500 to-yellow-600", action: () => setActiveKit("earthquake") },
      { title: "Safety Tips", desc: "Learn quick safety protocols", color: "from-blue-500 to-blue-600", action: () => alert("Safety tips coming soon!") },
    ].map((item, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className={`rounded-2xl p-6 text-white bg-linear-to-r ${item.color} cursor-pointer hover:scale-105 hover:shadow-xl transition`}
        onClick={item.action}
      >
        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
        <p className="text-sm">{item.desc}</p>
      </motion.div>
    ))}
  </div>
</section>


      </div>
    </div>
  );
}
