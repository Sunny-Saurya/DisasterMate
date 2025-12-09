import React, { useState } from "react";
import { FileText, Video, LinkIcon, Copy, X } from "lucide-react";
import jsPDF from "jspdf";

const Resources = () => {
  const [activeTab, setActiveTab] = useState("guides");
  const [searchTerm, setSearchTerm] = useState("");
  const [previewPDF, setPreviewPDF] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);

  const guides = [
    { title: "Earthquake Safety Guide", desc: "1. Drop, Cover, and Hold On.\n2. Prepare an emergency kit.\n3. Identify safe spots in each room.\n4. Practice evacuation drills.\n5. Stay informed via news and alerts." },
    { title: "Flood Preparedness Manual", desc: "1. Know flood-prone areas.\n2. Keep important documents in waterproof containers.\n3. Evacuate early if advised.\n4. Do not walk or drive through floodwaters.\n5. Prepare an emergency kit with essentials." },
    { title: "Cyclone Emergency Handbook", desc: "1. Stay indoors during the cyclone.\n2. Reinforce windows and doors.\n3. Keep flashlights and batteries ready.\n4. Avoid using electrical appliances.\n5. Listen to official advisories." }
  ];

  const videos = [
    { title: "How to Prepare an Emergency Kit", link: "https://www.youtube.com/embed/KKN7Ewht1DQ" },
    { title: "Evacuation Planning for Families", link: "https://www.youtube.com/embed/dMO4oejW8C8" },
    { title: "First Aid Basics Everyone Should Know", link: "https://www.youtube.com/embed/DHbI3dw4H_I" }
  ];

  const externalLinks = [
    { name: "National Disaster Management Authority (NDMA)", link: "https://ndma.gov.in/" },
    { name: "World Health Organization (WHO) - Emergencies", link: "https://www.who.int/emergencies" },
    { name: "UN Disaster Risk Reduction", link: "https://www.undrr.org/" }
  ];

  const filteredGuides = guides.filter(g => g.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredVideos = videos.filter(v => v.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredLinks = externalLinks.filter(l => l.name.toLowerCase().includes(searchTerm.toLowerCase()));

  
  const generatePDF = (title, content) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(title, 10, 10);
    doc.setFontSize(12);
    const lines = doc.splitTextToSize(content, 180);
    doc.text(lines, 10, 20);
    doc.save(`${title}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-16 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-center text-blue-700 dark:text-blue-400 mb-6">
          Disaster Preparedness Resources
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Access trusted materials, guides, videos, and verified external links to stay prepared.
        </p>

        
        <div className="mb-10 text-center">
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {["guides", "videos", "links"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full font-semibold flex items-center gap-2 ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              } transition-colors duration-300`}
            >
              {tab === "guides" && <FileText className="w-5 h-5"/>}
              {tab === "videos" && <Video className="w-5 h-5"/>}
              {tab === "links" && <LinkIcon className="w-5 h-5"/>}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        
        {activeTab === "guides" && (
          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {filteredGuides.length ? filteredGuides.map((g, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-200 dark:border-gray-700 hover:scale-105 hover:shadow-xl transition-transform">
                <FileText className="w-10 h-10 text-blue-600 mb-3" />
                <h3 className="text-xl font-bold mb-2 dark:text-white">{g.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">{g.desc}</p>
                <div className="flex items-center gap-4">
                  <button onClick={() => generatePDF(g.title, g.desc)} className="flex items-center gap-1 text-blue-600 font-medium hover:underline">
                    Download PDF
                  </button>
                  <button onClick={() => navigator.clipboard.writeText(g.desc)} className="text-gray-500 hover:text-blue-600" title="Copy Content">
                    <Copy className="w-5 h-5"/>
                  </button>
                </div>
              </div>
            )) : <p className="col-span-3 text-center dark:text-gray-300">No guides found.</p>}
          </div>
        )}

        
        {activeTab === "videos" && (
          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {filteredVideos.length ? filteredVideos.map((v, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-200 dark:border-gray-700 hover:scale-105 hover:shadow-xl transition-transform">
                <Video className="w-10 h-10 text-blue-600 mb-3" />
                <h3 className="text-lg font-bold mb-2 dark:text-white">{v.title}</h3>
                <div className="flex items-center gap-4">
                  <button onClick={() => setPreviewVideo(v.link)} className="text-blue-600 font-medium hover:underline">Watch Video</button>
                  <button onClick={() => navigator.clipboard.writeText(v.link)} className="text-gray-500 hover:text-blue-600" title="Copy Link">
                    <Copy className="w-5 h-5"/>
                  </button>
                </div>
              </div>
            )) : <p className="col-span-3 text-center dark:text-gray-300">No videos found.</p>}
          </div>
        )}

        
        {activeTab === "links" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {filteredLinks.length ? filteredLinks.map((e, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-200 dark:border-gray-700 hover:scale-105 hover:shadow-xl transition-transform">
                <LinkIcon className="w-10 h-10 text-blue-600 mb-3" />
                <h3 className="text-lg font-bold mb-2 dark:text-white">{e.name}</h3>
                <div className="flex items-center gap-4">
                  <a href={e.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium hover:underline">
                    Visit Website →
                  </a>
                  <button onClick={() => navigator.clipboard.writeText(e.link)} className="text-gray-500 hover:text-blue-600" title="Copy Link">
                    <Copy className="w-5 h-5"/>
                  </button>
                </div>
              </div>
            )) : <p className="col-span-3 text-center dark:text-gray-300">No links found.</p>}
          </div>
        )}
      </div>

      
      {previewVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 w-11/12 md:w-3/4 h-4/5 rounded-lg overflow-hidden relative">
            <button onClick={() => setPreviewVideo(null)} className="absolute top-3 right-3 text-gray-600 dark:text-white hover:text-red-500">
              <X className="w-6 h-6"/>
            </button>
            <iframe
              src={previewVideo}
              title="Video Preview"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-5 right-5 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        ↑ Top
      </button>
    </div>
  );
};

export default Resources;
