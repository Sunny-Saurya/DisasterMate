import React, { useState } from "react";
import jsPDF from "jspdf";
import {
  FileText,
  Video,
  LinkIcon,
  ClipboardList,
  Heart,
  Share2,
  CheckCircle2,
  BookOpen,
  Lightbulb,
  Wand2,
  Download,
  ExternalLink,
} from "lucide-react";

export default function Resources() {
  const [activeTab, setActiveTab] = useState("guides");
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (item) => {
    setFavorites((prev) =>
      prev.includes(item) ? prev.filter((f) => f !== item) : [...prev, item]
    );
  };

  /* ------------------------- PDF GENERATOR ------------------------- */
  const downloadPDF = (title, content) => {
    const pdf = new jsPDF();
    pdf.setFont("Times", "normal");
    pdf.setFontSize(18);
    pdf.text(title, 10, 20);

    pdf.setFontSize(12);
    let yPos = 35;
    content.split("\n").forEach((line) => {
      pdf.text(line, 10, yPos);
      yPos += 8;
    });

    pdf.save(`${title}.pdf`);
  };

  /* ----------------------------- DATA ----------------------------- */
  const guides = [
    {
      title: "Flood Safety Guide",
      desc: "Steps to stay safe during flooding: evacuation, supplies, and what to avoid.",
      pdf: "Flood Safety Guide\n\n1. Move to higher ground.\n2. Avoid floodwaters.\n3. Unplug electrical devices.\n4. Keep a waterproof emergency kit.\n5. Listen to authorities.",
    },
    {
      title: "Earthquake Preparedness",
      desc: "Home safety, structural checks, emergency kit guidance, and drill planning.",
      pdf: "Earthquake Preparedness\n\n1. Secure heavy furniture.\n2. Practice Drop-Cover-Hold.\n3. Store emergency water.\n4. Keep flashlight near bed.\n5. Identify safe spots.",
    },
    {
      title: "Cyclone Survival Tips",
      desc: "Prepare your home, stay informed, secure belongings, and follow alerts.",
      pdf: "Cyclone Survival Tips\n\n1. Track cyclone path.\n2. Charge devices.\n3. Move livestock to safety.\n4. Avoid coastal regions.\n5. Reinforce windows.",
    },
    {
      title: "Fire Emergency Steps",
      desc: "Escape planning, extinguisher use, and smoke safety for emergencies.",
      pdf: "Fire Emergency Steps\n\n1. Crawl under smoke.\n2. Stop, Drop & Roll.\n3. Know exit routes.\n4. Keep fire extinguisher.\n5. Do not re-enter.",
    },
    {
      title: "Landslide Safety Guide",
      desc: "Safety during landslides — warning signs, escape routes, and do’s/don’ts.",
      pdf: "Landslide Safety Guide\n\n1. Stay alert in hilly areas.\n2. Avoid river banks.\n3. Move to open space.\n4. Do not cross debris.\n5. Report cracks immediately.",
    },
    {
      title: "Heatwave Survival Guide",
      desc: "Hydration, heatstroke prevention, and safe home cooling tips.",
      pdf: "Heatwave Survival Guide\n\n1. Drink water every hour.\n2. Avoid outdoor activity.\n3. Wear light clothing.\n4. Use wet cloth cooling.\n5. Watch heatstroke signs.",
    },
    {
      title: "Thunderstorm & Lightning Safety",
      desc: "Avoid metal, avoid trees, how to shelter during storms.",
      pdf: "Lightning Safety\n\n1. Stay indoors.\n2. Avoid water.\n3. Avoid tall structures.\n4. Stay away from windows.\n5. Unplug electronics.",
    },
    {
      title: "Pandemic Preparedness Guide",
      desc: "Hygiene guidelines, mask usage, quarantine planning, and emergency supplies.",
      pdf: "Pandemic Preparedness\n\n1. Wash hands frequently.\n2. Keep masks & sanitizer.\n3. Maintain distance.\n4. Store essential medicines.\n5. Follow government updates.",
    },
  ];

  const videos = [
    {
      title: "Disaster Awareness Training",
      desc: "Understanding types of disasters and basic preparedness.",
      url: "https://www.youtube.com/watch?v=j7eV9f8RvZs&t=27s",
    },
    {
      title: "Flood Rescue Techniques",
      desc: "Emergency water rescue procedures used by professionals.",
      url: "https://www.youtube.com/watch?v=pi_nUPcQz_A",
    },
    {
      title: "Earthquake Safety Steps",
      desc: "Demonstration of Drop-Cover-Hold in real situations.",
      url: "https://www.youtube.com/watch?v=BLEPakj1YTY",
    },
    {
      title: "Cyclone Tracking & Alerts",
      desc: "How meteorologists track cyclones and send alerts.",
      url: "https://www.youtube.com/shorts/lwglySYUuSY",
    },
    {
      title: "First Aid Training Basics",
      desc: "Bandaging, CPR, bleeding control, emergency care.",
      url: "https://www.youtube.com/watch?v=5OKFljZ2GQE",
    },
    {
      title: "Fire Safety Demonstration",
      desc: "Using extinguishers & indoor fire escape strategies.",
      url: "https://www.youtube.com/shorts/L_WRmhPU1KM",
    },
    {
      title: "Landslide Warning Signs",
      desc: "Visual signs of unstable terrain & evacuations.",
      url: "https://www.youtube.com/watch?v=f6iApjqk0F0",
    },
    {
      title: "Heatwave Survival Documentary",
      desc: "Real experiences & survival tips for extreme heat.",
      url: "https://www.youtube.com/watch?v=mEpSfYMGUyQ",
    },
  ];

  const links = [
    {
      title: "National Disaster Portal",
      desc: "Government portal for alerts, warnings, and guidelines.",
      url: "https://ndma.gov.in",
    },
    {
      title: "Weather Forecast (IMD)",
      desc: "Real-time weather conditions & extreme weather alerts.",
      url: "https://mausam.imd.gov.in",
    },
    {
      title: "Emergency Contact Directory",
      desc: "List of verified emergency numbers nationwide.",
      url: "https://ndma.gov.in/emergency-contacts",
    },
    {
      title: "WHO Safety & Health",
      desc: "Global health advisories and protocols.",
      url: "https://www.who.int",
    },
    {
      title: "UNDRR Disaster Resources",
      desc: "Global disaster reduction strategies & tools.",
      url: "https://www.undrr.org",
    },
    {
      title: "Red Cross Safety Tips",
      desc: "International emergency response guidelines.",
      url: "https://www.redcross.org",
    },
    {
      title: "FEMA Disaster Education",
      desc: "US-based resource for disaster preparedness.",
      url: "https://www.fema.gov",
    },
    {
      title: "Real-Time River Flood Alerts",
      desc: "Water level monitoring & flood alerts.",
      url: "https://floodlist.com",
    },
  ];

  const checklists = [
    {
      title: "Emergency Kit Essentials",
      items: [
        "Water (3-day supply)",
        "Flashlight & batteries",
        "First aid kit",
        "Portable charger",
        "Emergency whistle",
        "Non-perishable food",
      ],
    },
    {
      title: "Home Safety Checklist",
      items: [
        "Smoke detectors installed",
        "Emergency exits clear",
        "Fire extinguisher available",
        "Backup power ready",
        "Emergency contact list",
      ],
    },
    {
      title: "First Aid Checklist",
      items: [
        "Bandages",
        "Antiseptic wipes",
        "Pain relievers",
        "Thermometer",
        "Burn cream",
        "Emergency phone numbers",
      ],
    },
  ];

  const tools = [
    {
      title: "Risk Analyzer",
      desc: "Analyze your area's risk using weather & historical data.",
      icon: Lightbulb,
    },
    {
      title: "Evacuation Planner",
      desc: "Plan routes, shelters, and emergency transport.",
      icon: Wand2,
    },
    {
      title: "Alert Notifier",
      desc: "Set alerts for weather, floods, or earthquakes in your area.",
      icon: Lightbulb,
    },
    {
      title: "Resource Locator",
      desc: "Find nearby emergency resources like hospitals & shelters.",
      icon: Wand2,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex font-serif mt-20 pt-6">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-md p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-8">Resources</h2>
        <nav className="space-y-4">
          {[
            ["guides", BookOpen, "Guides"],
            ["videos", Video, "Videos"],
            ["checklists", ClipboardList, "Checklists"],
            ["links", LinkIcon, "Useful Links"],
            ["tools", Wand2, "Tools"],
            ["favorites", Heart, "Favorites"],
          ].map(([key, Icon, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`w-full flex items-center gap-2 p-3 rounded-xl text-left ${
                activeTab === key ? "bg-blue-600 text-white" : "hover:bg-gray-200"
              }`}
            >
              <Icon size={20} /> {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
          <Share2 className="cursor-pointer hover:text-blue-500" size={26} />
        </div>

        <div>
          {/* Guides */}
          {activeTab === "guides" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guides.map((guide) => (
                <div
                  key={guide.title}
                  className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <FileText />
                      <h3 className="text-xl font-semibold">{guide.title}</h3>
                    </div>
                    <Heart
                      onClick={() => toggleFavorite(guide.title)}
                      className={`cursor-pointer ${
                        favorites.includes(guide.title) ? "text-red-500" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <p className="text-gray-600 mb-3">{guide.desc}</p>
                  <button
                    onClick={() => downloadPDF(guide.title, guide.pdf)}
                    className="flex items-center gap-2 mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    <Download size={18} /> Download PDF
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Videos */}
          {activeTab === "videos" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((video) => (
                <div
                  key={video.title}
                  className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
                >
                  <div className="relative pt-[56.25%]">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-t-2xl"
                      src={video.url}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">{video.title}</h3>
                      <Heart
                        onClick={() => toggleFavorite(video.title)}
                        className={`cursor-pointer ${
                          favorites.includes(video.title) ? "text-red-500" : "text-gray-400"
                        }`}
                      />
                    </div>
                    <p className="text-gray-600 mt-2">{video.desc}</p>
                    <a
                      href={video.url.replace("/embed/", "/watch?v=")}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 flex items-center gap-1 mt-3"
                    >
                      Watch on YouTube <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Checklists */}
          {activeTab === "checklists" && (
            <div className="space-y-6">
              {checklists.map((list) => (
                <div key={list.title} className="bg-white p-6 rounded-2xl shadow">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-semibold">{list.title}</h3>
                    <CheckCircle2 className="text-green-500" />
                  </div>
                  <ul className="list-disc ml-6 text-gray-700 mb-3">
                    {list.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => downloadPDF(list.title, list.items.join("\n"))}
                    className="flex items-center gap-2 mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    <Download size={18} /> Download Checklist PDF
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Links */}
          {activeTab === "links" && (
            <div className="space-y-6">
              {links.map((link) => (
                <a
                  key={link.title}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">{link.title}</h3>
                      <p className="text-gray-600">{link.desc}</p>
                    </div>
                    <ExternalLink size={22} />
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Tools */}
          {activeTab === "tools" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tools.map((tool) => (
                <div key={tool.title} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                  <div className="flex items-center gap-3 mb-2">
                    <tool.icon size={22} />
                    <h3 className="text-xl font-semibold">{tool.title}</h3>
                  </div>
                  <p className="text-gray-600">{tool.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Favorites */}
          {activeTab === "favorites" && (
            <div>
              {favorites.length === 0 ? (
                <p className="text-gray-500">No favorites added yet.</p>
              ) : (
                <ul className="space-y-4">
                  {favorites.map((fav) => (
                    <li
                      key={fav}
                      className="p-4 bg-white rounded-2xl shadow flex justify-between items-center"
                    >
                      <span className="text-lg">{fav}</span>
                      <Heart className="text-red-500" />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
