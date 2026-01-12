import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqData = [
  {
    id: 1,
    question: "What is Digital Life Lessons?",
    answer: "Digital Life Lessons is a platform where people share meaningful experiences, insights, and wisdom from their lives. It's a community-driven space for personal growth and learning from real-life experiences."
  },
  {
    id: 2,
    question: "How do I share my own life lesson?",
    answer: "Simply create an account, go to your dashboard, and click 'Add Lesson'. You can share your story, categorize it, and choose whether to make it public or private. Our community values authentic, meaningful experiences."
  },
  {
    id: 3,
    question: "What's the difference between free and premium accounts?",
    answer: "Free accounts can create limited lessons and access public content. Premium accounts get unlimited lesson creation, access to premium content, ad-free experience, and priority listing in search results."
  },
  {
    id: 4,
    question: "How are lessons moderated?",
    answer: "All public lessons go through a review process to ensure they meet our community guidelines. We focus on authentic, respectful, and meaningful content that can genuinely help others learn and grow."
  },
  {
    id: 5,
    question: "Can I save lessons to read later?",
    answer: "Yes! You can save any lesson to your favorites list by clicking the heart icon. All your saved lessons are accessible from your dashboard for easy reference."
  },
  {
    id: 6,
    question: "How do I report inappropriate content?",
    answer: "Each lesson has a report button. You can report content that violates our community guidelines, and our moderation team will review it promptly. We take community safety seriously."
  },
  {
    id: 7,
    question: "Is my personal information safe?",
    answer: "Absolutely. We use industry-standard security measures to protect your data. We never share your personal information with third parties, and you control what information is visible in your profile."
  },
  {
    id: 8,
    question: "Can I edit or delete my lessons?",
    answer: "Yes, you have full control over your content. You can edit, update visibility settings, or delete your lessons at any time from your dashboard."
  }
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set([1])); // First item open by default

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className="faq-section py-12 sm:py-16 bg-base-100">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-base-content mb-3 sm:mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-base-content/70 max-w-2xl mx-auto px-4">
            Got questions? We've got answers. Find everything you need to know about our platform.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqData.map((item) => (
            <div
              key={item.id}
              className="mb-3 sm:mb-4 bg-base-200 rounded-lg border border-base-300 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-center hover:bg-base-300/50 transition-colors"
              >
                <h3 className="text-base sm:text-lg font-semibold text-base-content pr-3 sm:pr-4">
                  {item.question}
                </h3>
                {openItems.has(item.id) ? (
                  <FaChevronUp className="text-primary flex-shrink-0 text-sm sm:text-base" />
                ) : (
                  <FaChevronDown className="text-primary flex-shrink-0 text-sm sm:text-base" />
                )}
              </button>
              
              {openItems.has(item.id) && (
                <div className="px-4 sm:px-6 pb-3 sm:pb-4">
                  <div className="border-t border-base-300 pt-3 sm:pt-4">
                    <p className="text-sm sm:text-base text-base-content/80 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <p className="text-sm sm:text-base text-base-content/70 mb-3 sm:mb-4">
            Still have questions?
          </p>
          <button className="bg-primary text-primary-content px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-secondary transition-colors text-sm sm:text-base">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;