import React, { useState } from "react";
import {
  FileText,
  Video,
  LinkIcon,
  Copy,
  X,
  ClipboardCheck,
  Satellite,
  MapPin,
  Heart,
  Share2,
} from "lucide-react";
import jsPDF from "jspdf";

const Resources = () => {
  const [activeTab, setActiveTab] = useState("guides");
  const [searchTerm, setSearchTerm] = useState("");
  const [previewVideo, setPreviewVideo] = useState(null);
  const [copied, setCopied] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );

  const guides = [
    {
      title: "Earthquake Safety Guide",
      desc: `# Drop, Cover, and Hold On
# Prepare an emergency kit
# Identify safe spots
# Practice evacuation drills
# Stay informed via alerts`,
    },
    {
      title: "Flood Preparedness Manual",
      desc: `# Know flood-prone areas
# Keep documents waterproof
# Don’t walk in floodwater
# Follow evacuation orders
# Keep essential supplies`,
    },
    {
      title: "Cyclone Emergency Handbook",
      desc: `# Stay indoors
# Reinforce windows
# Stock emergency items
# Avoid electrical appliances
# Listen to advisories`,
    },
    {
      title: "Fire Safety & Evacuation",
      desc: `# Know your exits
# Install smoke alarms
# Never use lifts during fire
# Crawl under smoke
# Keep extinguishers ready`,
    },
    {
      title: "Landslide Survival Guide",
      desc: `# Stay away from loose slopes
# Listen to weather warnings
# Avoid river valleys
# Evacuate early
# Keep emergency kit ready`,
    },
  ];

  
  const videos = [
    {
      title: "How to Prepare an Emergency Kit",
      link: "https://www.youtube.com/embed/KKN7Ewht1DQ",
    },
    {
      title: "Evacuation Planning for Families",
      link: "https://www.youtube.com/embed/dMO4oejW8C8",
    },
    {
      title: "First Aid Basics Everyone Should Know",
      link: "https://www.youtube.com/embed/DHbI3dw4H_I",
    },
    {
      title: "Fire Safety Training",
      link: "https://www.youtube.com/watch?v=TA7N0Irkb5M",
    },
  ];


  const externalLinks = [
    { name: "NDMA India", link: "https://ndma.gov.in/" },
    { name: "World Health Organization (WHO)", link: "https://www.who.int/emergencies" },
    { name: "UN Disaster Risk Reduction", link: "https://www.undrr.org/" },
    { name: "Red Cross Disaster Preparedness", link: "https://www.redcross.org/" },
  ];


  const checklists = [
    {
      title: "Home Emergency Kit Checklist",
      items: [
        "Water (3 litres per person)",
        "First Aid Kit",
        "Flashlight + Batteries",
        "Radio",
        "Food Supplies (3 days)",
        "Power Bank",
        "Whistle",
        "Important Documents",
      ],
    },
    {
      title: "Evacuation Checklist",
      items: [
        "Carry ID and documents",
        "Pack clothing",
        "Take emergency medicine",
        "Charge phone",
        "Unplug appliances",
        "Secure pets",
      ],
    },
  ];

 
  const tools = [
    {
      name: "Live Weather Radar",
      desc: "Check live weather patterns in real-time.",
      link: "https://www.windy.com/",
      icon: Satellite,
    },
    {
      name: "Find My Location",
      desc: "Get your current latitude & longitude instantly.",
      link: "https://www.google.com/maps",
      icon: MapPin,
    },
    {
      name: "Government SMS Alert Registration",
      desc: "Register for free emergency alerts.",
      link: "https://ndma.gov.in/",
      icon: ClipboardCheck,
    },
  ];


  const searchFilter = (list) =>
    list.filter((item) => {
      const t = item.title || item.name;
      return t.toLowerCase().includes(searchTerm.toLowerCase());
    });

 
  const shareText = async (title, content) => {
    const text = `${title}\n\n${content}`;

    if (navigator.share) {
      await navigator.share({ title, text });
    } else {
      await navigator.clipboard.writeText(text);
      alert("Guide copied to clipboard!");
    }
  };

 
  const toggleFavorite = (title) => {
    let updated = [];
    if (favorites.includes(title)) {
      updated = favorites.filter((f) => f !== title);
    } else {
      updated = [...favorites, title];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  
  const generatePDF = (title, content) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(title, 10, 15);

    doc.setFontSize(12);
    const lines = doc.splitTextToSize(content, 180);
    doc.text(lines, 10, 30);

    doc.save(`${title}.pdf`);
  };


  const Card = ({ children }) => (
    <div className="bg-white/70 backdrop-blur-lg dark:bg-gray-800/70 shadow-xl border border-gray-200 dark:border-gray-700 rounded-2xl p-6 transition hover:scale-[1.02] hover:shadow-2xl">
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black py-16 px-6">

      <div className="max-w-7xl mx-auto">

        {/* ---------------- TITLE ---------------- */}
        <h1 className="text-5xl font-extrabold text-center text-blue-700 dark:text-blue-400 drop-shadow-lg">
          Disaster Preparedness Resources
        </h1>
        <p className="text-center mt-3 text-gray-700 dark:text-gray-300 text-lg">
          A modern hub with guides, tools, videos, and emergency checklists.
        </p>

        {/* ---------------- SEARCH ---------------- */}
        <div className="mt-10 flex justify-center">
          <input
            type="text"
            placeholder="Search anything..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-3 rounded-lg w-full md:w-1/2 shadow-md dark:bg-gray-800 dark:border-gray-700 border
            text-lg dark:text-white"
          />
        </div>

        <div className="flex justify-center gap-3 flex-wrap mt-10">
          {[
            ["guides", FileText],
            ["videos", Video],
            ["links", LinkIcon],
            ["checklists", ClipboardCheck],
            ["tools", Satellite],
          ].map(([tab, Icon]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 rounded-xl flex items-center gap-2 text-lg font-semibold transition 
              ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-gray-300 text-black dark:bg-gray-700 dark:text-white"
              }`}
            >
              <Icon className="w-6 h-6" /> {tab.toUpperCase()}
            </button>
          ))}
        </div>

        
        {activeTab === "guides" && (
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            {searchFilter(guides).map((g, i) => (
              <Card key={i}>
                <div className="flex justify-between items-start">
                  <FileText className="w-10 h-10 text-blue-600" />
                  <Heart
                    onClick={() => toggleFavorite(g.title)}
                    className={`w-7 h-7 cursor-pointer transition ${
                      favorites.includes(g.title)
                        ? "text-red-500 fill-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </div>

                <h3 className="text-2xl font-bold dark:text-white mt-3">
                  {g.title}
                </h3>

                <p className="mt-4 dark:text-gray-300 whitespace-pre-line text-lg">
                  {g.desc}
                </p>

                <div className="flex gap-4 mt-5">
                  <button
                    onClick={() => generatePDF(g.title, g.desc)}
                    className="text-blue-700 dark:text-blue-300 font-semibold"
                  >
                    Download PDF
                  </button>

                  <Share2
                    className="w-6 h-6 text-gray-500 cursor-pointer hover:text-blue-600"
                    onClick={() => shareText(g.title, g.desc)}
                  />

                  <Copy
                    className="w-6 h-6 text-gray-500 cursor-pointer hover:text-blue-600"
                    onClick={() => {
                      navigator.clipboard.writeText(g.desc);
                      setCopied(i);
                      setTimeout(() => setCopied(null), 1000);
                    }}
                  />

                  {copied === i && (
                    <span className="text-green-600 text-sm font-semibold">
                      Copied!
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

       
        {activeTab === "videos" && (
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            {searchFilter(videos).map((v, i) => (
              <Card key={i}>
                <Video className="w-10 h-10 text-blue-600" />
                <h3 className="text-xl font-bold dark:text-white mt-3">
                  {v.title}
                </h3>

                <button
                  className="text-blue-600 mt-3 text-lg"
                  onClick={() => setPreviewVideo(v.link)}
                >
                  ▶ Watch Video
                </button>
              </Card>
            ))}
          </div>
        )}

        
        {activeTab === "links" && (
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            {searchFilter(externalLinks).map((e, i) => (
              <Card key={i}>
                <LinkIcon className="w-10 h-10 text-blue-600" />
                <h3 className="text-xl font-bold dark:text-white mt-3">
                  {e.name}
                </h3>
                <a
                  href={e.link}
                  target="_blank"
                  className="text-blue-600 mt-2 inline-block text-lg"
                >
                  Visit Website →
                </a>
              </Card>
            ))}
          </div>
        )}

       
        {activeTab === "checklists" && (
          <div className="grid md:grid-cols-2 gap-8 mt-10">
            {checklists.map((c, i) => (
              <Card key={i}>
                <ClipboardCheck className="w-10 h-10 text-blue-600" />

                <h3 className="text-2xl font-bold dark:text-white mt-3">
                  {c.title}
                </h3>

                <ul className="mt-4 dark:text-gray-300 text-lg">
                  {c.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 my-2">
                      ✔ {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        )}

        
        {activeTab === "tools" && (
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            {tools.map((t, i) => {
              const Icon = t.icon;
              return (
                <Card key={i}>
                  <Icon className="w-10 h-10 text-blue-600" />
                  <h3 className="text-xl font-bold dark:text-white mt-3">
                    {t.name}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mt-2 text-lg">
                    {t.desc}
                  </p>

                  <a
                    href={t.link}
                    target="_blank"
                    className="text-blue-600 mt-3 inline-block text-lg"
                  >
                    Open Tool →
                  </a>
                </Card>
              );
            })}
          </div>
        )}

       
        {previewVideo && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 w-11/12 md:w-3/4 h-[80vh] rounded-2xl overflow-hidden relative shadow-2xl">
              <button
                className="absolute top-3 right-3 bg-white dark:bg-gray-700 p-2 rounded-full shadow"
                onClick={() => setPreviewVideo(null)}
              >
                <X className="w-6 h-6 text-gray-700 dark:text-white" />
              </button>

              <iframe
                src={previewVideo}
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 text-2xl"
        >
          ↑
        </button>
      </div>
    </div>
  );
};

export default Resources;
