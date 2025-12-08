import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
const Gallery = () => {
  // Carousel
  const carouselImages = [
    "https://plus.unsplash.com/premium_photo-1682124443138-8f68117a5c49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGlzYXN0ZXIlMjBwcmVwYXJlZG5lc3MlMjBkcmlsbHMlMjBpbWFnZSUyMGhhcHBlbmVuZCUyMGluJTIwc2Nob29scyUyMGFuZCUyMGNvbGxlZ2VzfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1682351888650-9a9ce8e46d05?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3Rvcm0lMjByZXNjdWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1643930285611-fdf3d45d31f3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2lsZGZpcmUlMjByZXNjdWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
    "https://media.istockphoto.com/id/1055162726/photo/dam-construction-on-the-river-rescue-operation-with-a-boat-oil-spill.webp?a=1&b=1&s=612x612&w=0&k=20&c=F4E16TUJD_RIap7vIR_mZC96aHfdRpHY2qf0a8PVnkI="
  ];

  // Gallery Img
  const galleryImages = [
    "https://images.unsplash.com/photo-1614338577197-5812cb856df7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmlyZSUyMGZpZ2h0ZXJzJTIwcmVzY3VlJTIwaW1hZ2VzfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1741081288260-877057e3fa27?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zmxvb2QlMjByZXNjdWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1610774149656-f4d74dafa99b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZWFydGhxdWFrZSUyMHJlc2N1ZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1653786272618-378135c0ac4a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZpcmUlMjBmaWdodGVycyUyMHJlc2N1ZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1681995602372-f37dfb97dc95?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODF8fGZsb29kJTIwcmVzY3VlJTIwaW1hZ2VzfGVufDB8fDB8fHww",
    "https://plus.unsplash.com/premium_photo-1661868422376-df4cffb18311?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAwfHxmbG9vZCUyMHJlc2N1ZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1741110539426-fce3268c3c0d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEwfHxmbG9vZCUyMHJlc2N1ZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1739748395700-83a8ac9ae8ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE1fHxmbG9vZCUyMHJlc2N1ZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1572810928063-81f2c34aa45a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHN0b3JtJTIwcmVzY3VlJTIwaW1hZ2VzfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1551527771-efc85e83a1f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHN0b3JtJTIwcmVzY3VlJTIwaW1hZ2VzfGVufDB8fDB8fHww",
    "https://plus.unsplash.com/premium_photo-1682129473095-7d873d486f0d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHN0b3JtJTIwcmVzY3VlJTIwaW1hZ2VzfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1752553030686-66970a8a990f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHdpbGRmaXJlJTIwcmVzY3VlJTIwaW1hZ2VzfGVufDB8fDB8fHww",
    "https://plus.unsplash.com/premium_photo-1664303807789-29749368de99?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHdpbGRmaXJlJTIwcmVzY3VlJTIwaW1hZ2VzfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1734445558870-72ee57ee3930?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fHdpbGRmaXJlJTIwcmVzY3VlJTIwaW1hZ2VzfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1671959784652-8096fd28b17c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHdpbGRmaXJlJTIwcmVzY3VlJTIwaW1hZ2VzfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1664911323865-12eea2d04051?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fHdpbGRmaXJlJTIwcmVzY3VlJTIwaW1hZ2VzfGVufDB8fDB8fHww"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Lightbox modal
  const [lightbox, setLightbox] = useState({ open: false, img: "" });

  // Auto slide
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 3500);
    return () => clearInterval(timer);
  }, [paused, currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === carouselImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-700 drop-shadow-md bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
            DisasterMate's Gallery
          </h1>
          <p className="mt-4 text-gray-600 text-lg md:text-xl">
            Explore real moments of preparedness, rescue operations, and community safety.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl mb-20 group"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <img
            src={carouselImages[currentIndex]}
            alt="carousel"
            className="w-full h-full object-cover transition-all duration-700 opacity-90 hover:opacity-100"
          />

          {/* Buttons */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 
                       bg-white/80 p-3 rounded-full shadow-lg hidden group-hover:block"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 
                       bg-white/80 p-3 rounded-full shadow-lg hidden group-hover:block"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 w-full flex justify-center gap-3">
            {carouselImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-4 h-4 rounded-full transition-all ${
                  idx === currentIndex
                    ? "bg-blue-600 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Gallery Section */}
        <h2 className="text-3xl font-bold text-blue-700 mb-6 border-l-8 border-blue-500 pl-4">
          Photo Gallery
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer"
              onClick={() => setLightbox({ open: true, img })}
            >
              <img
                src={img}
                alt="Gallery"
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all"></div>

              <p className="absolute bottom-3 left-3 text-white text-sm opacity-0 group-hover:opacity-100">
                Click to view
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox.open && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl">
            <img
              src={lightbox.img}
              alt="Full Image"
              className="rounded-xl shadow-2xl"
            />

            <button
              onClick={() => setLightbox({ open: false, img: "" })}
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-xl"
            >
              <X className="w-6 h-6 text-gray-800" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
