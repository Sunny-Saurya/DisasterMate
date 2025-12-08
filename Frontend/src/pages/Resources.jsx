
import React from "react";
import { FileText, Phone, Video, LinkIcon } from "lucide-react";

const Resources = () => {
  const guides = [
    {
      title: "Earthquake Safety Guide",
      desc: "Learn essential steps to stay safe before, during, and after an earthquake.",
      link: "#"
    },
    {
      title: "Flood Preparedness Manual",
      desc: "Important instructions, evacuation tips, and safety steps for floods.",
      link: "#"
    },
    {
      title: "Cyclone Emergency Handbook",
      desc: "Preparation checklist and response guide for cyclones.",
      link: "#"
    }
  ];

  const contacts = [
    {
      title: "National Disaster Response Force (NDRF)",
      number: "1-800-123-456"
    },
    {
      title: "Fire & Rescue Emergency",
      number: "101"
    },
    {
      title: "Medical Emergency",
      number: "102"
    },
    {
      title: "Police",
      number: "100"
    }
  ];

  const videos = [
    {
      title: "How to Prepare an Emergency Kit",
      link: "https://www.youtube.com/watch?v=2i2_PvGdKCo"
    },
    {
      title: "Evacuation Planning for Families",
      link: "https://www.youtube.com/watch?v=KTvYh8ar3_g"
    },
    {
      title: "First Aid Basics Everyone Should Know",
      link: "https://www.youtube.com/watch?v=wzKXWQAGQ0g"
    }
  ];

  const externalLinks = [
    {
      name: "National Disaster Management Authority (NDMA)",
      link: "https://ndma.gov.in/"
    },
    {
      name: "World Health Organization (WHO) - Emergencies",
      link: "https://www.who.int/emergencies"
    },
    {
      name: "UN Disaster Risk Reduction",
      link: "https://www.undrr.org/"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
          Disaster Preparedness Resources
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Access trusted materials, emergency contacts, guides, and videos to help you stay prepared.
        </p>

        {/* Guides Section */}
        <h2 className="text-2xl font-semibold text-blue-600 mb-5">📘 Downloadable Guides</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {guides.map((g, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-xl transition-all"
            >
              <FileText className="w-10 h-10 text-blue-600 mb-3" />
              <h3 className="text-xl font-bold mb-2">{g.title}</h3>
              <p className="text-gray-600 mb-3">{g.desc}</p>
              <a
                href={g.link}
                className="text-blue-600 font-medium hover:underline"
              >
                Download PDF 
              </a>
            </div>
          ))}
        </div>

        {/* Emergency Contacts */}
        <h2 className="text-2xl font-semibold text-blue-600 mb-5">Emergency Contact Numbers</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {contacts.map((c, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-5 border border-gray-200 text-center hover:shadow-lg transition-all"
            >
              <Phone className="w-8 h-8 text-red-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="text-gray-700 text-xl font-bold mt-1">{c.number}</p>
            </div>
          ))}
        </div>

        {/* Videos */}
        <h2 className="text-2xl font-semibold text-blue-600 mb-5">🎥 Helpful Video Resources</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {videos.map((v, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-xl transition-all"
            >
              <Video className="w-10 h-10 text-blue-600 mb-3" />
              <h3 className="text-lg font-bold mb-2">{v.title}</h3>
              <a
                href={v.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium hover:underline"
              >
                Watch Video →
              </a>
            </div>
          ))}
        </div>

        {/* External Links */}
        <h2 className="text-2xl font-semibold text-blue-600 mb-5">🔗 Verified External Resources</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {externalLinks.map((e, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-xl transition-all"
            >
              <LinkIcon className="w-10 h-10 text-blue-600 mb-3" />
              <h3 className="text-lg font-bold mb-2">{e.name}</h3>
              <a
                href={e.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium hover:underline"
              >
                Visit Website →
              </a>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Resources;
