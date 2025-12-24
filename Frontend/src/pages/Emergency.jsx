import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  AlertTriangle,
  Phone,
  MapPin,
  Battery,
  Heart,
  Clock,
  Users,
  Droplets,
  Gauge,
} from "lucide-react";
import API_URL from "../config/api";

export default function Emergency() {
  const navigate = useNavigate();

  /* ================= BASIC STATES ================= */
  const [location, setLocation] = useState("Your Location");
  const [currentTime, setCurrentTime] = useState("");
  const [showSOSModal, setShowSOSModal] = useState(false);

  /* ================= CONTACTS ================= */
  const [contacts, setContacts] = useState(() => {
    try {
      const raw = localStorage.getItem("dm_emergency_contacts");
      return raw ? JSON.parse(raw) : ["911"];
    } catch {
      return ["911"];
    }
  });
  const [newContact, setNewContact] = useState("");

  const [autoCall, setAutoCall] = useState(false);
  const [useSMSfallback, setUseSMSfallback] = useState(true);

  /* ================= SOS STATES ================= */
  const [isSending, setIsSending] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [sosStatus, setSosStatus] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [batteryLevel, setBatteryLevel] = useState(null);

  const countdownRef = useRef(null);

  /* ================= TIME ================= */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  /* ================= SAVE CONTACTS ================= */
  useEffect(() => {
    localStorage.setItem("dm_emergency_contacts", JSON.stringify(contacts));
  }, [contacts]);

  /* ================= NETWORK STATUS ================= */
  useEffect(() => {
    const online = () => setIsOnline(true);
    const offline = () => setIsOnline(false);
    window.addEventListener("online", online);
    window.addEventListener("offline", offline);
    return () => {
      window.removeEventListener("online", online);
      window.removeEventListener("offline", offline);
    };
  }, []);

  /* ================= BATTERY ================= */
  useEffect(() => {
    if (navigator.getBattery) {
      navigator.getBattery().then((battery) => {
        setBatteryLevel(Math.round(battery.level * 100));
      });
    }
  }, []);

  /* ================= LOCATION ================= */
  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocation("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      () => setLocation("Location Detected"),
      () => setLocation("Location Denied")
    );
  };

  const normalizePhone = (p) => p.replace(/[^0-9]/g, "");

  /* ================= START SOS ================= */
  const startSOS = () => {
    if (!isOnline)
      alert("⚠️ You are offline. SMS / Call fallback will be used.");
    if (batteryLevel !== null && batteryLevel < 15)
      alert("⚠️ Battery critically low.");

    if (!window.confirm("⚠️ Send SOS alert now?")) return;

    setIsSending(true);
    setCountdown(5);
    setSosStatus("sending");

    countdownRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c === 1) {
          clearInterval(countdownRef.current);
          sendSOSAlert();
        }
        return c - 1;
      });
    }, 1000);
  };

  const cancelSOSAlert = () => {
    clearInterval(countdownRef.current);
    setIsSending(false);
    setCountdown(5);
    setSosStatus("");
  };

  /* ================= ACTUAL SOS ALERT ================= */
  const sendSOSAlert = () => {
    if (!navigator.geolocation) {
      alert("Location service not supported.");
      setSosStatus("error");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const locationLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

        const message = `🚨 SOS ALERT 🚨
I need immediate help!
📍 Location: ${locationLink}
🔋 Battery: ${batteryLevel ?? "Unknown"}%`;

        if (navigator.vibrate) navigator.vibrate([300, 200, 300]);

        try {
          await fetch(`${API_URL}/api/sos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ location: locationLink, batteryLevel }),
          });
        } catch {}

        contacts.forEach((raw, idx) => {
          const phone = normalizePhone(raw);
          if (!phone) return;
          setTimeout(() => {
            window.open(
              `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
              "_blank"
            );
          }, idx * 700);
        });

        if (useSMSfallback && contacts.length > 0) {
          setTimeout(() => {
            window.location.href = `sms:${normalizePhone(
              contacts[0]
            )}?body=${encodeURIComponent(message)}`;
          }, contacts.length * 700 + 800);
        }

        if (autoCall && contacts.length > 0) {
          setTimeout(() => {
            window.location.href = `tel:${normalizePhone(contacts[0])}`;
          }, contacts.length * 700 + 2000);
        }

        setSosStatus("success");
        setIsSending(false);
        setShowSOSModal(false);
      },
      () => {
        alert("Unable to detect location.");
        setSosStatus("error");
        setIsSending(false);
      }
    );
  };

  const handleAddContact = () => {
    if (!newContact.trim()) return;
    setContacts((prev) =>
      prev.includes(newContact) ? prev : [...prev, newContact]
    );
    setNewContact("");
  };

  const handleRemoveContact = (idx) =>
    setContacts((prev) => prev.filter((_, i) => i !== idx));

  /* ================= PDF ================= */
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Emergency Kit Checklist", 20, 20);
    doc.text("- Water & food", 20, 30);
    doc.text("- First aid kit", 20, 40);
    doc.text("- Torch & power bank", 20, 50);
    doc.text("- Important documents", 20, 60);
    doc.text("- Medications", 20, 70);
    doc.save("Emergency_Kit.pdf");
  };

  /* ================= FIND NEAREST HOSPITAL ================= */
  const findNearestHospital = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      return;
    }
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      const mapsUrl = `https://www.google.com/maps/search/hospitals/@${latitude},${longitude},15z`;
      window.open(mapsUrl, "_blank");
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 pt-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* HERO ALERT */}
        <div className="bg-red-600 text-white text-center py-6 rounded-lg shadow-lg animate-pulse flex justify-center items-center gap-2 mt-6">
          <AlertTriangle size={22} /> LIVE ALERT: Stay cautious
        </div>

        {/* STATUS CARDS */}
        <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <Battery size={28} className="text-red-500"/>
            <p className="mt-2 font-bold">Battery Level</p>
            <p className="text-gray-600">{batteryLevel ?? "Unknown"}%</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <MapPin size={28} className="text-green-500"/>
            <p className="mt-2 font-bold">Location</p>
            <p className="text-gray-600">{location}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <Clock size={28} className="text-blue-500"/>
            <p className="mt-2 font-bold">Current Time</p>
            <p className="text-gray-600">{currentTime}</p>
          </div>
        </section>

        {/* VIEW SAFETY TIPS BUTTON */}
        <section className="mt-8 flex justify-center">
          <button
            onClick={() => navigate("/safetyTips")}
            className="bg-indigo-600 text-white py-3 px-8 rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-700 transition"
          >
            View Safety Tips
          </button>
        </section>

        {/* HEADER */}
        <header className="text-center mt-6">
          <h1 className="text-5xl font-extrabold text-red-700">
            Emergency Center
          </h1>
        </header>

        {/* MAIN ACTIONS */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => setShowSOSModal(true)}
            className="bg-red-600 text-white py-4 rounded-xl font-bold shadow hover:bg-red-700 transition animate-pulse"
          >
            Send SOS Alert
          </button>

          <a
            href="tel:112"
            className="bg-blue-600 text-white py-4 rounded-xl font-bold text-center shadow hover:bg-blue-700 transition"
          >
            Call Emergency
          </a>

          <button
            onClick={detectLocation}
            className="bg-green-600 text-white py-4 rounded-xl font-bold shadow hover:bg-green-700 transition"
          >
            {location}
          </button>
        </section>

        {/* FIND NEAREST HOSPITAL BUTTON */}
        <section className="mt-10 flex justify-center">
          <button
            onClick={findNearestHospital}
            className="bg-red-500 text-white py-3 px-8 rounded-xl font-bold shadow hover:bg-red-600 transition"
          >
            Find Nearest Hospital
          </button>
        </section>

        {/* EXTRA CONTENT: EMERGENCY TIPS */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Emergency Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Tip 
              icon={<Shield />} 
              title="Stay Calm" 
              description="Keep calm and think logically; panic can worsen the situation." 
            />
            <Tip 
              icon={<Droplets />} 
              title="Water & Food" 
              description="Always have water and non-perishable food in an emergency kit." 
            />
            <Tip 
              icon={<Gauge />} 
              title="Monitor Health" 
              description="Keep an eye on vital signs and injuries while waiting for help." 
            />
            <Tip 
              icon={<Users />} 
              title="Assist Others" 
              description="Help others safely if possible, especially children or elderly." 
            />
          </div>
        </section>

        {/* EMERGENCY TOOLS */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Emergency Tools
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-2 text-center">
            <li>First Aid Kit</li>
            <li>Flashlight & Extra Batteries</li>
            <li>Power Bank / Mobile Charger</li>
            <li>Whistle / Signal Mirror</li>
            <li>Emergency Blanket</li>
            <li>Basic Tools (screwdriver, multi-tool)</li>
          </ul>
        </section>

        {/* CONTACT SUPPORT */}
        <section className="mt-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Contact Support</h2>
          <p className="text-gray-700 mb-2">National Helpline: 112</p>
          <p className="text-gray-700 mb-2">Fire Department: 101</p>
          <p className="text-gray-700 mb-2">Ambulance: 102</p>
          <p className="text-gray-700 mb-2">Disaster Management: 108</p>
        </section>

        {/* DOWNLOAD PDF */}
        <div className="mt-12 text-center">
          <button
            onClick={downloadPDF}
            className="bg-gray-900 text-white px-6 py-3 rounded-xl shadow hover:bg-gray-800 transition"
          >
            Download Emergency Kit Checklist
          </button>
        </div>

        {/* SOS MODAL */}
        {showSOSModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-2xl w-full max-w-xl shadow-lg animate-fade-in">
              <h2 className="text-2xl font-bold text-red-600">SOS Alert</h2>

              <input
                value={newContact}
                onChange={(e) => setNewContact(e.target.value)}
                placeholder="Phone number"
                className="border px-3 py-2 rounded w-full mt-3"
              />

              <button
                onClick={handleAddContact}
                className="mt-2 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition"
              >
                Add Contact
              </button>

              <ul className="mt-3 space-y-2 max-h-40 overflow-y-auto">
                {contacts.map((c, i) => (
                  <li key={i} className="flex justify-between bg-gray-100 p-2 rounded">
                    {c}
                    <button
                      onClick={() => handleRemoveContact(i)}
                      className="text-red-600 font-semibold"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={useSMSfallback}
                    onChange={() => setUseSMSfallback(!useSMSfallback)}
                  /> SMS fallback
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={autoCall}
                    onChange={() => setAutoCall(!autoCall)}
                  /> Auto-call
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowSOSModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={startSOS}
                  className="px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700 transition"
                >
                  Start SOS
                </button>
              </div>
            </div>
          </div>
        )}

        {/* COUNTDOWN */}
        {isSending && (
          <div className="fixed bottom-6 right-6 bg-red-600 text-white px-6 py-4 rounded-xl shadow-lg">
            🚨 Sending SOS in {countdown}s
            <button onClick={cancelSOSAlert} className="block underline mt-2">
              Cancel
            </button>
          </div>
        )}

        {/* STATUS TOASTS */}
        {sosStatus === "success" && (
          <div className="fixed bottom-6 left-6 bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg">
            ✅ SOS Sent Successfully
          </div>
        )}

        {sosStatus === "error" && (
          <div className="fixed bottom-6 left-6 bg-red-700 text-white px-6 py-4 rounded-xl shadow-lg">
            ❌ SOS Failed
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= SMALL TIP COMPONENT ================= */
function Tip({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
      <div className="text-red-600 flex justify-center mb-3">{icon}</div>
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-gray-600 mt-2 text-sm">{description}</p>
    </div>
  );
}
