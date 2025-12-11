import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import { Link } from "react-router-dom";
import { Shield, AlertTriangle } from "lucide-react";

export default function Emergency() {
  const [location, setLocation] = useState("Your Location");
  const [currentTime, setCurrentTime] = useState("");
  const [showSOSModal, setShowSOSModal] = useState(false);

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

  // Fetch current time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("dm_emergency_contacts", JSON.stringify(contacts));
    } catch (e) {
      console.warn("Could not save contacts:", e);
    }
  }, [contacts]);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocation(" Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      () => setLocation(" Location Detected"),
      () => setLocation(" Location Denied")
    );
  };

  // PDF
  const downloadPDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Emergency Kit Checklist", 40, 60);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated: ${new Date().toLocaleString()}`, 40, 80);

    const checklist = [
      "Water supply (3 days)",
      "First aid materials",
      "Flashlight & spare batteries",
      "Phone charger & power bank",
      "Non-perishable food",
      "Whistle for help",
      "Emergency contact list",
      "Essential medicines",
      "Copies of important documents",
      "Warm clothing / blankets"
    ];

    doc.setFontSize(12);
    let y = 110;
    checklist.forEach((item) => {
      doc.text(`• ${item}`, 40, y);
      y += 18;
    });

    doc.save("Emergency_Kit_Checklist.pdf");
  };

  const normalizePhone = (p) => p.replace(/[^0-9]/g, "");

  const sendSOSAlert = () => {
    if (!navigator.geolocation) {
      alert("Location service not supported on this device.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const locationLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        const message = `❗SOS ALERT❗\nI need immediate help!\nMy location:\n${locationLink}`;

        if (navigator.vibrate) {
          navigator.vibrate([300, 200, 300]);
        }

        contacts.forEach((rawNumber, idx) => {
          const phone = normalizePhone(rawNumber);
          if (!phone) return;

          const waURL = `https://wa.me/${phone}?text=${encodeURIComponent(
            message
          )}`;
          setTimeout(() => {
            window.open(waURL, "_blank");
          }, idx * 700);
        });

        if (useSMSfallback && contacts.length > 0) {
          const first = normalizePhone(contacts[0]);
          const smsURL = `sms:${first}?body=${encodeURIComponent(message)}`;
          setTimeout(
            () => (window.location.href = smsURL),
            Math.max(contacts.length * 700, 1000)
          );
        }

        if (autoCall && contacts.length > 0) {
          const callNumber = normalizePhone(contacts[0]);
          setTimeout(() => {
            window.location.href = `tel:${callNumber}`;
          }, Math.max(contacts.length * 700, 2200));
        }

        alert(
          "SOS process started. WhatsApp or SMS will open automatically. If blocked, please send manually."
        );
        setShowSOSModal(false);
      },
      () => alert("Unable to detect your location. Enable GPS."),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleAddContact = () => {
    const formatted = newContact.trim();
    if (!formatted) return;
    setContacts((prev) => {
      if (!prev.includes(formatted)) return [...prev, formatted];
      return prev;
    });
    setNewContact("");
  };

  const handleRemoveContact = (idx) => {
    setContacts((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 pt-20 px-6">
      <div className="max-w-6xl mx-auto mt-10">

        {/* Top Alert */}
        <div className="bg-red-600 text-white text-center py-3 rounded-lg shadow-lg animate-pulse font-medium flex justify-center items-center gap-2">
          <AlertTriangle size={20} />
          LIVE ALERT: Severe weather reported. Stay alert.
        </div>

        <header className="text-center mt-10">
          <h1 className="text-5xl font-extrabold text-red-700 tracking-tight drop-shadow">
            Emergency Center
          </h1>
          <p className="text-gray-700 mt-3 text-lg">
            Quick assistance & survival information.
          </p>
          <p className="text-xl mt-2 text-gray-900 font-semibold">
            {currentTime}
          </p>
        </header>

        <div className="mt-6 flex justify-center">
          <Link
            to="/safetytips"
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-xl font-bold shadow hover:scale-105 transition flex items-center gap-2"
          >
            <Shield size={20} />
            View Safety Tips
          </Link>
        </div>

        <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{ title: "Emergency", number: "112", color: "red" },
            { title: "Medical", number: "108", color: "blue" },
            { title: "Fire", number: "101", color: "orange" }].map((item, index) => (
            <div
              key={index}
              className="bg-white border rounded-2xl p-6 text-center shadow hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <div className={`text-${item.color}-600 text-4xl font-bold`}>
                📞
              </div>
              <h3 className="text-xl font-bold mt-2">{item.title}</h3>
              <p
                className={`text-4xl font-extrabold mt-2 text-${item.color}-700`}
              >
                {item.number}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => setShowSOSModal(true)}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-6 rounded-2xl text-xl font-bold shadow-md hover:scale-105 transition"
          >
            Send SOS Alert
          </button>

          <a
            href="tel:112"
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-2xl text-xl font-bold shadow-md hover:scale-105 transition"
          >
            Call Emergency
          </a>

          <button
            onClick={detectLocation}
            className="bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-2xl text-xl font-bold shadow-md hover:scale-105 transition"
          >
            {location}
          </button>
        </section>

        {/* Hospital */}
        <div className="mt-10 flex justify-center">
          <a
            href="https://www.google.com/maps/search/hospitals+near+me/"
            target="_blank"
            rel="noreferrer"
            className="bg-purple-600 text-white px-6 py-3 rounded-xl font-bold shadow hover:scale-105 transition flex items-center gap-2"
          >
            Find Nearest Hospital
          </a>
        </div>

        {/* Safety Tips*/}
        <h2 className="text-4xl font-bold mt-16 text-gray-900 text-center">
          Quick Safety Tips
        </h2>

        <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{ title: "Fire", color: "red", tips: ["Stay low", "Check doors", "Avoid elevators"] },
            { title: "Flood", color: "blue", tips: ["Move up", "Avoid water", "Turn off electricity"] },
            { title: "Earthquake", color: "yellow", tips: ["Drop & cover", "Avoid windows", "Do not run outside"] }].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <h3 className={`text-${item.color}-600 text-2xl font-bold`}>
                {item.title}
              </h3>
              <ul className="list-disc ml-6 mt-3 text-gray-700">
                {item.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Kit */}
        <h2 className="text-4xl font-bold mt-16 text-gray-900 text-center">
          Emergency Kit Essentials
        </h2>

        <section className="mt-10 bg-white p-6 rounded-2xl shadow-lg">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
            {[
              "Water supply (3 days)",
              "First aid materials",
              "Flashlight & batteries",
              "Phone charger",
              "Non-perishable food",
              "Whistle for help",
              "Emergency contact list",
              "Medicines"
            ].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <button
            onClick={downloadPDF}
            className="mt-6 bg-gray-900 text-white px-5 py-3 rounded-xl font-bold hover:scale-105 transition"
          >
            Download Checklist
          </button>
        </section>

        <p className="text-center text-gray-600 mt-16 mb-10">
          Stay safe. DisasterMate is your emergency companion.
        </p>

        {showSOSModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start md:items-center overflow-auto z-50 p-4">
            <div className="bg-white p-6 rounded-2xl w-full max-w-xl shadow-2xl animate-slideUp">
              <h2 className="text-2xl font-bold text-red-600">
                SOS Alert
              </h2>
              <p className="mt-3 text-gray-700">
                This will send an SOS message with your live location.
              </p>

              {/* Contacts */}
              <div className="mt-4">
                <label className="block text-sm font-semibold mb-2">
                  Emergency Contacts
                </label>
                <div className="flex gap-2">
                  <input
                    value={newContact}
                    onChange={(e) => setNewContact(e.target.value)}
                    placeholder="Enter phone number"
                    className="flex-1 px-3 py-2 border rounded-lg"
                  />
                  <button
                    onClick={handleAddContact}
                    className="px-3 py-2 bg-green-600 text-white rounded-lg"
                  >
                    Add
                  </button>
                </div>

                <ul className="mt-3 space-y-2">
                  {contacts.map((c, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
                    >
                      <span>{c}</span>
                      <button
                        onClick={() => handleRemoveContact(i)}
                        className="text-sm text-red-600 px-2"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={useSMSfallback}
                    onChange={() => setUseSMSfallback((s) => !s)}
                  />
                  <span className="text-sm">
                    Use SMS fallback
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={autoCall}
                    onChange={() => setAutoCall((s) => !s)}
                  />
                  <span className="text-sm">
                    Auto-call first contact
                  </span>
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowSOSModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>

                <button
                  onClick={sendSOSAlert}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Send Alert
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
