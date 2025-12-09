import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchText, setSearchText] = useState("");

  const questionRefs = useRef([]);

  const categories = [
    "All",
    "General",
    "Emergency Kit",
    "Family Plan",
    "Safety Tips",
    "Health",
    "Communication"
  ];

  const faqs = [
    {
      question: "What should I include in an emergency kit?",
      answer:
        "A basic emergency kit includes water, food, flashlight, batteries, first-aid kit, medicines, whistle, maps, and important documents.",
      category: "Emergency Kit"
    },
    {
      question: "How much water should I store?",
      answer: "Store at least 3 liters of water per person per day for three days.",
      category: "Emergency Kit"
    },
    {
      question: "How can I prepare my family for disasters?",
      answer:
        "Create a communication plan, practice evacuation routes, prepare supplies, and stay informed.",
      category: "Family Plan"
    },
    {
      question: "Why is disaster preparedness important?",
      answer:
        "Preparedness reduces injuries, saves lives, and limits property damage during emergencies.",
      category: "General"
    },
    {
      question: "What should I do during an earthquake?",
      answer: "Use Drop–Cover–Hold. Stay away from glass and protect your head.",
      category: "Safety Tips"
    },
    {
      question: "Where should I store my emergency supplies?",
      answer:
        "Keep your kit in an easily accessible location known to all family members.",
      category: "Emergency Kit"
    },
    {
      question: "How often should I update my emergency kit?",
      answer: "Check your kit every 6 months and replace expired items.",
      category: "Emergency Kit"
    },
    {
      question: "How do I communicate with family if the network is down?",
      answer:
        "Use SMS instead of calls, set a meeting point, and use offline apps like Bridgefy.",
      category: "Communication"
    },
    {
      question: "What food items should I store for emergencies?",
      answer:
        "Canned foods, protein bars, nuts, rice, and dry fruits are best.",
      category: "Emergency Kit"
    },
    {
      question: "How can I stay updated during a disaster?",
      answer: "Follow IMD, NDMA, radio, and official emergency apps.",
      category: "General"
    },
    {
      question: "What should I do during a flood?",
      answer:
        "Move to higher ground, avoid floodwater, and turn off electricity.",
      category: "Safety Tips"
    },
    {
      question: "How do I care for pets during disasters?",
      answer:
        "Prepare a pet kit with food, water, medicines, and ID tags.",
      category: "Family Plan"
    },
    {
      question: "What first-aid items do I need?",
      answer:
        "Bandages, antiseptic wipes, pain relievers, gloves, and emergency medicines.",
      category: "Health"
    },
    {
      question: "What should I do if someone is injured during a disaster?",
      answer:
        "Provide basic first aid, keep them calm, and call emergency services.",
      category: "Health"
    }
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchCategory = activeCategory === "All" || faq.category === activeCategory;
    const matchSearch =
      faq.question.toLowerCase().includes(searchText.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchText.toLowerCase());
    return matchCategory && matchSearch;
  });

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    if (openIndex !== null && questionRefs.current[openIndex]) {
      questionRefs.current[openIndex].scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }, [openIndex]);

  const highlight = (text) => {
    if (!searchText) return text;
    const parts = text.split(new RegExp(`(${searchText})`, "gi"));
    return (
      <>
        {parts.map((part, idx) =>
          part.toLowerCase() === searchText.toLowerCase() ? (
            <mark key={idx} className="bg-yellow-200 px-1 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-6 animate-fadeIn">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-6 text-blue-700 animate-slideDown">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Find quick answers to common disaster-related questions.
        </p>

        <input
          type="text"
          placeholder="Search FAQs..."
          className="w-full mb-6 p-3 rounded-lg border focus:outline-blue-500 shadow-sm"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />

        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-all hover:scale-105
                ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-blue-100"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              ref={(el) => (questionRefs.current[index] = el)}
              className="bg-white shadow-md rounded-xl p-5 border border-gray-200 transition-all duration-300 animate-fadeUp"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="text-lg font-semibold">{highlight(faq.question)}</span>

                <ChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Smooth expanding animation */}
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="mt-3 text-gray-600 leading-relaxed">
                  {highlight(faq.answer)}
                </p>
              </div>

              <p className="text-xs text-blue-600 mt-2">Category: {faq.category}</p>
            </div>
          ))}

          {filteredFaqs.length === 0 && (
            <p className="text-center text-gray-500 animate-fadeIn">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Faq;
