import React, { useState } from "react";
import { Twitter, Facebook,Instagram } from "lucide-react";

export default function Contact() {
  const [location, setLocation] = useState({ lat: null, lon: null });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Message sent successfully! We will reach out soon.");
    setFormData({ name: "", email: "", message: "" });
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
        <p className="text-center text-gray-600 mt-2">Get in touch with the <span className="font-bold text-red-500">DisasterMate</span> Team</p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Send us a Message</h2>
            <label className="font-medium">Name</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full p-3 mt-1 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"/>
            <label className="font-medium">Email</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full p-3 mt-1 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"/>
            <div>
            <label className="font-semibold">Emergency Type</label>
            <select className="w-full p-3 border rounded-lg mt-2">
              <option>Flood</option>
              <option>Earthquake</option>
              <option>Fire Accident</option>
              <option>Medical Emergency</option>
              <option>Other</option>
            </select>
          </div>
            <label className="font-medium">Message</label>
            <textarea name="message" rows="5" required value={formData.message} onChange={handleChange} className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
            <button type="submit" className="w-full mt-5 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"> Submit</button>

            {status && (
              <p className="mt-4 text-green-600 font-medium">{status}</p>
            )}
          </form>


         

          {/* Contact Info Box */}
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
                <span className="font-extrabold italic text-red-500">DisasterMate,</span> Disaster Relief Center, Phagwara, Punjab, India
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold">Follow Us:</h3>
              <div className="flex gap-4 mt-2 text-blue-600 font-medium items-center">
                <span className="cursor-pointer hover:underline"><span><Twitter /></span>Twitter</span>
                <span className="cursor-pointer hover:underline"><Facebook />Facebook</span>
                <span className="cursor-pointer hover:underline"><Instagram />Instagram</span>
              </div>
            </div>
          </div>
           {/* Location Fetching */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-2 text-gray-700">Your Location</h2>

          <button
            onClick={getLocation}
            className="bg-purple-600 text-white px-5 py-2 rounded-lg"
          >
            Get My Location
          </button>

          {location.lat && (
            <div className="mt-4 p-4 bg-gray-200 rounded-lg">
              <p><strong>Latitude:</strong> {location.lat}</p>
              <p><strong>Longitude:</strong> {location.lon}</p>
            </div>
          )}
        </div>

        {/* Google Maps Embed */}
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


