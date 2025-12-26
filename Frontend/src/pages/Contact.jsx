import React, { useState } from "react";
import { Twitter, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import API_URL from "../config/api";

export default function Contact() {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    message: "",
    emergencyType: "Other" 
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("Message sent successfully! We will reach out soon.");
        setFormData({ name: "", email: "", message: "", emergencyType: "Other" });
      } else {
        setStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => alert("Unable to fetch location")
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-5">
      <div className="max-w-5xl mx-auto">
        
        
        <h1 className="text-4xl font-bold text-center text-gray-800">Contact Us</h1>
        <p className="text-center text-gray-600 mt-2">
          Get in touch with the <span className="font-bold text-red-500">DisasterMate</span> Team
        </p>

       
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* form */}
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Send us a Message</h2>

            <label className="font-medium">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 mt-1 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <label className="font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mt-1 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <label className="font-semibold">Emergency Type</label>
            <select 
              name="emergencyType"
              value={formData.emergencyType}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-2 mb-4"
            >
              <option>Flood</option>
              <option>Earthquake</option>
              <option>Fire Accident</option>
              <option>Medical Emergency</option>
              <option>Other</option>
            </select>

            <label className="font-medium">Message</label>
            <textarea
              name="message"
              rows="5"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-5 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Submit'}
            </button>

            {status && (
              <p className={`mt-4 font-medium ${status.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                {status}
              </p>
            )}
          </form>

          {/* information: */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Emergency Contact</h2>
            <p className="text-lg font-medium">24/7 Disaster Helpline:</p>
            <h3 className="text-3xl font-bold text-red-600 mt-1">108 / 112</h3>

            <div className="mt-6">
              <p className="font-medium">Email:</p>
              <p className="text-gray-700">support@disastermate.org</p>
            </div>

            <div className="mt-4">
              <p className="font-medium">Address:</p>
              <p className="text-gray-700">
                <span className="font-extrabold italic text-red-500">DisasterMate,</span>{" "}
                Disaster Relief Center, Phagwara, Punjab, India
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold">Follow Us:</h3>
              <div className="flex gap-4 mt-2 text-blue-600 font-medium items-center">
                <a href="https://twitter.com/disasterMate" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                  <Twitter /> Twitter
                </a>
                <a href="https://facebook.com/disastermate" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                  <Facebook /> Facebook
                </a>
                <a href="https://instagram.com/DisasterMate" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                  <Instagram /> Instagram
                </a>
              </div>
            </div>



            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/faq"
                className="w-full sm:w-[200px] text-center bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Visit FAQ
              </Link>

              <button
                onClick={getLocation}
                className="w-full sm:w-[200px] bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                Get My Location
              </button>
            </div>
          </div>
        </div>

        
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-2 text-gray-700">Your Location</h2>

          {location.lat && (
            <div className="mt-4 p-4 bg-gray-200 rounded-lg">
              <p><strong>Latitude:</strong> {location.lat}</p>
              <p><strong>Longitude:</strong> {location.lon}</p>
            </div>
          )}

          {location.lat && (
            <iframe
              className="w-full h-64 mt-5 rounded-lg"
              src={`https://www.google.com/maps?q=${location.lat},${location.lon}&z=15&output=embed`}
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
}
