import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchText, setSearchText] = useState("");

  const questionRefs = useRef([]);

  const categories = ["All", "General", "Emergency Kit", "Family Plan", "Safety Tips"];

  const faqs = [
    {
      question: "What should I include in an emergency kit?",
      answer:
        "A basic emergency kit includes water, food, flashlight, batteries, first-aid kit, medicines, whistle, maps, and important documents.",
      category: "Emergency Kit"
    },
    {
      question: "How much water should I store?",
      answer:
        "Store at least 3 liters of water per person per day, for a minimum of three days.",
      category: "Emergency Kit"
    },
    {
      question: "How can I prepare my family for disasters?",
      answer:
        "Create a family communication plan, practice evacuation routes, prepare emergency supplies, and stay informed.",
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
      answer:
        "Use Drop–Cover–Hold. Stay away from glass and protect your head.",
      category: "Safety Tips"
    },
    {
      question: "Where should I store my emergency supplies?",
      answer:
        "Keep your kit in an easy-to-reach location and ensure all family members know where it is kept.",
      category: "Emergency Kit"
    },
    {
      question: "How often should I update my emergency kit?",
      answer:
        "Check your kit every 6 months and replace expired items.",
      category: "Emergency Kit"
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
        {parts.map((part, index) =>
          part.toLowerCase() === searchText.toLowerCase() ? (
            <mark key={index} className="bg-yellow-200 px-1 rounded">
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
    <div className="min-h-screen bg-gray-100 py-16 px-6">
      <div className="max-w-4xl mx-auto">

     
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-700">
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
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-all
                ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow"
                    : "bg-white text-gray-700 hover:bg-blue-100"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              ref={(el) => (questionRefs.current[index] = el)}
              className="bg-white shadow-md rounded-xl p-5 border border-gray-200 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="text-lg font-semibold">
                  {highlight(faq.question)}
                </span>

                
                 
                
              </button>

              
              {openIndex === index && (
                <p className="mt-3 text-gray-600 leading-relaxed">
                  {highlight(faq.answer)}
                </p>
              )}

              
              <p className="text-xs text-blue-600 mt-2">
                Category: {faq.category}
              </p>
            </div>
          ))}

          {filteredFaqs.length === 0 && (
            <p className="text-center text-gray-500">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Faq;
