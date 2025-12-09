import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, Search, Filter, ChevronDown } from "lucide-react";


const ALL_GALLERY_IMAGES = [
    
    {
        src: "https://images.unsplash.com/photo-1614338577197-5812cb856df7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmlyZSUyMGZpZ2h0ZXJzJTIwcmVzY3VlJTIwaW1hZ2VzfGVufDB8fDB8fHww",
        alt: "Firefighters battling a major wildfire on a hillside.",
        category: "Wildfire Rescue",
        tags: ["fire", "rescue", "emergency", "wildfire"],
    },
    {
        src: "https://images.unsplash.com/photo-1741081288260-877057e3fa27?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zmxvb2QlMjByZXNjdWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
        alt: "Volunteers evacuating people from a flooded neighborhood by boat.",
        category: "Flood Rescue",
        tags: ["flood", "rescue", "water", "evacuation"],
    },
    {
        src: "https://images.unsplash.com/photo-1610774149656-f4d74dafa99b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZWFydGhxdWFrZSUyMHJlc2N1ZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
        alt: "Search and rescue team with a dog sifting through earthquake rubble.",
        category: "Earthquake Rescue",
        tags: ["earthquake", "search and rescue", "rubble", "dog"],
    },
    {
        src: "https://images.unsplash.com/photo-1653786272618-378135c0ac4a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZpcmUlMjBmaWdodGVycyUyMHJlc2N1ZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
        alt: "Firefighter training exercise using a hose on a controlled burn.",
        category: "Preparedness/Training",
        tags: ["training", "fire drill", "preparedness"],
    },
    {
        src: "https://plus.unsplash.com/premium_photo-1681995602372-f37dfb97dc95?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODF8fGZsb29kJTIwcmVzY3VlJTIwaW1hZ2VzfGVufDB8fDB8fHww",
        alt: "Helicopter performing a swift water rescue during a massive flood.",
        category: "Flood Rescue",
        tags: ["flood", "helicopter", "swift water", "rescue"],
    },
    {
        src: "https://plus.unsplash.com/premium_photo-1661868422376-df4cffb18311?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAwfHxmbG9vZCUyMHJlc2N1ZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
        alt: "Community members filling sandbags to protect homes from rising floodwaters.",
        category: "Preparedness/Training",
        tags: ["community", "sandbags", "preparedness", "flood prevention"],
    },
    {
        src: "https://images.unsplash.com/photo-1741110539426-fce3268c3c0d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEwfHxmbG9vZCUyMHJlc2N1ZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
        alt: "Emergency medical services tending to a person in a disaster zone.",
        category: "Medical Aid",
        tags: ["medical", "aid", "emergency", "paramedics"],
    },
    {
        src: "https://plus.unsplash.com/premium_photo-1739748395700-83a8ac9ae8ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE1fHxmbG9vZCUyMHJlc2N1ZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
        alt: "A rescue diver emerging from flooded waters after a successful operation.",
        category: "Flood Rescue",
        tags: ["flood", "diver", "rescue", "water"],
    },
    {
        src: "https://images.unsplash.com/photo-1572810928063-81f2c34aa45a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHN0b3JtJTIwcmVzY3VlJTIwaW1hZ2VzfGVufDB8fDB8fHww",
        alt: "Utility workers repairing downed power lines after a severe storm.",
        category: "Storm Recovery",
        tags: ["storm", "recovery", "power lines", "utility"],
    },
    {
        src: "https://images.unsplash.com/photo-1551527771-efc85e83a1f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHN0b3JtJTIwcmVzY3VlJTIwaW1hZ2VzfGVufDB8fDB8fHww",
        alt: "A family taking shelter in a basement during a tornado warning.",
        category: "Preparedness/Training",
        tags: ["storm", "shelter", "preparedness", "tornado"],
    },
    {
        src: "https://plus.unsplash.com/premium_photo-1682129473095-7d873d486f0d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHN0b3JtJTIwcmVzY3VlJTIwaW1hZ2VzfGVufDB8fDBfHww",
        alt: "First responders assessing damage to a coastal town after a hurricane.",
        category: "Storm Recovery",
        tags: ["hurricane", "damage assessment", "first responders"],
    },
    {
        src: "https://images.unsplash.com/photo-1752553030686-66970a8a990f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHdpbGRmaXJlJTIwcmVzY3VlJTIwaW1hZ2VzfGVufDB8fDB8fHww",
        alt: "Aerial view of a controlled burn for fire mitigation purposes.",
        category: "Preparedness/Training",
        tags: ["wildfire", "mitigation", "controlled burn"],
    },
    {
        src: "https://plus.unsplash.com/premium_photo-1664303807789-29749368de99?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHdpbGRmaXJlJTIwcmVzY3VlJTIwaW1hZ2VzfGVufDB8fDB8fHww",
        alt: "A bulldozer creating a firebreak to stop a raging wildfire.",
        category: "Wildfire Rescue",
        tags: ["wildfire", "firebreak", "equipment"],
    },
    {
        src: "https://images.unsplash.com/photo-1734445558870-72ee57ee3930?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fHdpbGRmaXJlJTIwcmVzY3VlJTIwaW1hZ2VzfGVufDB8fDB8fHww",
        alt: "Fire crew mopping up after containing a large structural fire.",
        category: "Fire Rescue",
        tags: ["fire", "mopping up", "containment"],
    },
    {
        src: "https://images.unsplash.com/photo-1671959784652-8096fd28b17c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHdpbGRmaXJlJTIwcmVzY3VlJTIwaW1hZ2VzfGVufDB8fDB8fHww",
        alt: "Smoke jumpers deploying their parachutes near a fire incident.",
        category: "Wildfire Rescue",
        tags: ["wildfire", "smoke jumpers", "air operations"],
    },
    {
        src: "https://images.unsplash.com/photo-1664911323865-12eea2d04051?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fHdpbGRmaXJlJTIwcmVzY3VlJTIwaW1hZ2VzfGVufDB8fDB8fHww",
        alt: "A large air tanker dropping fire retardant on a mountainous area.",
        category: "Wildfire Rescue",
        tags: ["wildfire", "air tanker", "retardant"],
    },
    {
        src: "https://plus.unsplash.com/premium_photo-1742421624501-49ce5da87756?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zmxvb2QlMjByZXNxdWUlMjBpbWFnZXMlMjBmb3IlMjBkaXNhc3RlciUyMHByZXBhcmVkbmVzc3xlbnwwfHwwfHx8MA%3D%3D",
        alt: "A rescue diver emerging from flooded waters after a successful operation.",
        category: "Flood Rescue",
        tags: ["flood", "diver", "rescue", "water"],
    },
    {
        src: "https://media.istockphoto.com/id/840998314/photo/flood-protection-sandbags-with-flooded-homes-in-the-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=BX-YwVmIRYCuDEICIihcXhRWyiFONU65haC5mP7IK1k=",
        alt: "A rescue diver emerging from flooded waters after a successful operation.",
        category: "Flood Rescue",
        tags: ["flood", "diver", "rescue", "water"],
    },
    {
        src: "https://images.unsplash.com/photo-1692085654385-f04b3b7183d4?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmlyZSUyMHJlc3F1ZSUyMGltYWdlcyUyMGZvciUyMGRpc2FzdGVyJTIwcHJlcGFyZWRuZXNzfGVufDB8fDB8fHww",
        alt: "Fire crew mopping up after containing a large structural fire.",
        category: "Fire Rescue",
        tags: ["fire", "mopping up", "containment"],
    },
    {
        src: "https://plus.unsplash.com/premium_photo-1663100245539-8563165afe61?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmlyZSUyMHJlc3F1ZSUyMGltYWdlcyUyMGZvciUyMGRpc2FzdGVyJTIwcHJlcGFyZWRuZXNzfGVufDB8fDB8fHww",
        alt: "Firefighters controlling a structural fire with a water hose.",
        category: "Fire Rescue",
        tags: ["fire", "hose", "containment"],
    },
];


const CAROUSEL_IMAGES = [
    {
        src: "https://plus.unsplash.com/premium_photo-1682124443138-8f68117a5c49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGlzYXN0ZXIlMjBwcmVwYXJlZG5lc3MlMjBkcmlsbHMlMjBpbWFnZSUyMGhhcHBlbmVuZCUyMGluJTIwc2Nob29scyUyMGFuZCUyMGNvbGxlZ2VzfGVufDB8fDB8fHww",
        description: "School children participating in a seismic preparedness and 'Drop, Cover, and Hold On' drill.",
    },
    {
        src: "https://images.unsplash.com/photo-1682351888650-9a9ce8e46d05?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3Rvcm0lMjByZXNjdWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
        description: "First responders assisting vehicles stranded on a flooded highway after a severe storm.",
    },
    {
        src: "https://images.unsplash.com/photo-1643930285611-fdf3d45d31f3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2lsZGZpcmUlMjByZXNjdWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
        description: "Helicopter bucket drop operations to contain a fast-moving wildfire in a remote area.",
    },
    {
        src: "https://media.istockphoto.com/id/1055162726/photo/dam-construction-on-the-river-rescue-operation-with-a-boat-oil-spill.webp?a=1&b=1&s=612x612&w=0&k=20&c=F4E16TUJD_RIap7vIR_mZC96aHfdRpHY2qf0a8PVnkI=",
        description: "Emergency teams deploying an oil boom during a simulated water rescue and spill containment exercise.",
    }
];

const UNIQUE_CATEGORIES = [
    "All Categories",
    ...new Set(ALL_GALLERY_IMAGES.map(img => img.category))
];


const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    }, [images.length]);

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    useEffect(() => {
        if (paused) return;
        const timer = setInterval(() => {
            nextSlide();
        }, 3500);
        return () => clearInterval(timer);
    }, [paused, nextSlide]);

    const currentImage = images[currentIndex];

    return (
        <div
            className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl mb-20 group"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <img
                key={currentIndex}
                src={currentImage.src}
                alt={currentImage.description} 
                className="w-full h-full object-cover transition duration-1000 ease-in-out opacity-90 hover:opacity-100"
                loading="lazy"
            />

           
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white">
                <p className="text-lg font-semibold drop-shadow-lg">
                    {currentImage.description}
                </p>
            </div>

        
            <button
                onClick={prevSlide}
                aria-label="Previous image"
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            <button
                onClick={nextSlide}
                aria-label="Next image"
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            >
                <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 w-full flex justify-center gap-3 z-10"> {/* Added z-10 to place dots above description bar */}
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`w-4 h-4 rounded-full transition-all duration-300 ${
                            idx === currentIndex
                                ? "bg-blue-600 scale-125"
                                : "bg-gray-300 hover:bg-gray-400 hover:scale-110"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};



const GalleryControls = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories }) => (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search Bar */}
        <div className="relative flex-grow">
            <input
                type="text"
                placeholder="Search by keywords (e.g., 'flood', 'fire drill', 'volunteer')"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg transition-all duration-300 focus:ring-4 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:shadow-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        {/* Category Filter Dropdown */}
        <div className="relative md:w-56">
            <select
                className="appearance-none w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg transition-all duration-300 focus:ring-4 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm hover:shadow-md"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                aria-label="Filter images by category"
            >
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
    </div>
);


const ImageGrid = ({ images, setLightbox }) => {
    if (images.length === 0) {
        return (
            <div className="text-center py-12 text-gray-600 text-xl border-2 border-dashed border-gray-300 rounded-lg transition-all duration-300 hover:bg-gray-100">
                <Search className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                No images found matching your criteria. Try a different search term or filter.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img, index) => (
                <div
                    key={index}
                    onClick={() => setLightbox({ open: true, imgIndex: index })}
                    role="button"
                    tabIndex={0}
                    aria-label={`View image: ${img.alt}`}
                    className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer aspect-video transition-all duration-300 hover:shadow-xl hover:ring-4 hover:ring-blue-300/50"
                >
                    <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                        loading="lazy"
                    />
                    {/* Overlay for metadata */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <p className="text-white font-semibold text-sm drop-shadow-md translate-y-2 group-hover:translate-y-0 transition duration-300">
                            {img.category}
                        </p>
                        <p className="text-white text-xs opacity-80 mt-1 translate-y-2 group-hover:translate-y-0 transition duration-300 delay-100">
                            {img.alt}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

const LightboxModal = ({ lightbox, filteredImages, setLightbox, navigateLightbox, setSearchTerm }) => {
    const currentImage = lightbox.imgIndex !== null ? filteredImages[lightbox.imgIndex] : null;

    if (!lightbox.open || !currentImage) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 transition-opacity duration-300" 
            onClick={() => setLightbox({ open: false, imgIndex: null })}
        >
            <div 
                className="relative max-w-5xl w-full h-full max-h-[90vh] transform transition-transform duration-300 scale-100" 
                onClick={e => e.stopPropagation()}
            >

                {/* Image */}
                <img
                    src={currentImage.src}
                    alt={currentImage.alt}
                    className="rounded-xl shadow-2xl object-contain w-full h-full"
                />

               
                <button
                    onClick={() => setLightbox({ open: false, imgIndex: null })}
                    aria-label="Close image viewer"
                    className="absolute top-4 right-4 bg-white/90 hover:bg-white p-3 rounded-full shadow-xl transition-all hover:scale-110"
                >
                    <X className="w-6 h-6 text-gray-800" />
                </button>

                
                <button
                    onClick={() => navigateLightbox(-1)}
                    aria-label="Previous image"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-xl transition-all hover:scale-110"
                >
                    <ChevronLeft className="w-6 h-6 text-gray-800" />
                </button>

                <button
                    onClick={() => navigateLightbox(1)}
                    aria-label="Next image"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-xl transition-all hover:scale-110"
                >
                    <ChevronRight className="w-6 h-6 text-gray-800" />
                </button>

                {/* Image Description/Metadata */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 rounded-b-xl text-white transform transition duration-300">
                    <p className="font-bold text-lg">{currentImage.category}</p>
                    <p className="text-sm mt-1">{currentImage.alt}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {currentImage.tags.map(tag => (
                            <span
                                key={tag}
                                className="text-xs bg-blue-600/70 px-2 py-1 rounded-full cursor-pointer transition-colors hover:bg-blue-600 hover:scale-105"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent closing the lightbox
                                    setSearchTerm(tag);
                                    setLightbox({ open: false, imgIndex: null });
                                }}
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};




const Gallery = () => {
    // Gallery State
    const [filteredImages, setFilteredImages] = useState(ALL_GALLERY_IMAGES);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Categories");

    // Lightbox modal state
    const [lightbox, setLightbox] = useState({ open: false, imgIndex: null });

    // --- Lightbox Navigation Logic (Memoized) ---
    const navigateLightbox = useCallback((direction) => {
        if (lightbox.imgIndex === null) return;

        let newIndex = lightbox.imgIndex + direction;

        if (newIndex < 0) {
            newIndex = filteredImages.length - 1;
        } else if (newIndex >= filteredImages.length) {
            newIndex = 0;
        }

        setLightbox(prev => ({ ...prev, imgIndex: newIndex }));
    }, [lightbox.imgIndex, filteredImages.length]);

    
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (lightbox.open) {
                if (event.key === "Escape") {
                    setLightbox({ open: false, imgIndex: null });
                } else if (event.key === "ArrowLeft") {
                    navigateLightbox(-1);
                } else if (event.key === "ArrowRight") {
                    navigateLightbox(1);
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [lightbox.open, navigateLightbox]);


    // Filtering logic for the main gallery
    useEffect(() => {
        let newFilteredImages = ALL_GALLERY_IMAGES;

        // 1. Filter by Category
        if (selectedCategory !== "All Categories") {
            newFilteredImages = newFilteredImages.filter(img => img.category === selectedCategory);
        }

        // 2. Filter by Search Term (on alt text or tags)
        if (searchTerm) {
            const lowerSearchTerm = searchTerm.toLowerCase();
            newFilteredImages = newFilteredImages.filter(
                img =>
                    img.alt.toLowerCase().includes(lowerSearchTerm) ||
                    img.category.toLowerCase().includes(lowerSearchTerm) ||
                    img.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm))
            );
        }

        setFilteredImages(newFilteredImages);
        
        setLightbox({ open: false, imgIndex: null });
    }, [searchTerm, selectedCategory]);

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-6">
            <div className="max-w-7xl mx-auto">

                {/* Title */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-blue-700 drop-shadow-md bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent transition duration-500 hover:text-blue-900">
                        🚨  DisasterMate's Gallery
                    </h1>
                    <p className="mt-4 text-gray-600 text-lg md:text-xl transition duration-500 hover:text-blue-800">
                        Explore real moments of preparedness, rescue operations, and community safety.
                    </p>
                </div>

                <hr className="mb-10 border-blue-200" />

                
                <ImageCarousel images={CAROUSEL_IMAGES} />

                <hr className="mb-10 border-blue-200" />

                
                <h2 className="text-3xl font-bold text-blue-700 mb-6 border-l-8 border-blue-500 pl-4">
                    Photo Gallery
                </h2>

                
                <GalleryControls
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    categories={UNIQUE_CATEGORIES}
                />

                <hr className="mb-10 border-blue-200" />

                
                <ImageGrid 
                    images={filteredImages} 
                    setLightbox={setLightbox} 
                />
            </div>

           
            <LightboxModal
                lightbox={lightbox}
                filteredImages={filteredImages}
                setLightbox={setLightbox}
                navigateLightbox={navigateLightbox}
                setSearchTerm={setSearchTerm}
            />
        </div>
    );
};

export default Gallery;