import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { question: "What is Socialcrab?", answer: "Socialcrab is a social media analytics platform that currently supports Instagram reports — no social media login required. TikTok and X analytics are coming soon. From Data to Decision in One Click." },
  { question: "Do you offer free trials?", answer: "Yes — every new user gets 1 free token to try their first report, plus access to sample reports." },
  { question: "How many reports can I run?", answer: "Each report uses one token. Your plan includes tokens, and you can purchase more anytime." },
  { question: "How long does it take to generate a report?", answer: "Reports are generated on demand and usually take 2–8 hours. We notify you when they’re ready." },
  { question: "Why should I use Socialcrab instead of other tools?", answer: "Unlike other tools, Socialcrab doesn’t require you to connect your social accounts — no suspension risk. You also get more data points per report, automate manual work, and minimize errors." },
  { question: "What payment methods are available?", answer: "Pay securely with Visa, Mastercard, or AmEx." },
];

interface PricingFAQProps {
  sideBySide?: boolean;
}

const FAQItem: React.FC<{
  faq: { question: string; answer: string };
  isOpen: boolean;
  onClick: () => void;
}> = ({ faq, isOpen, onClick }) => (
  <div
    className={`border rounded-lg shadow-sm transition-colors duration-300 ${
      isOpen ? "bg-gray-50" : "bg-white"
    }`}
  >
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center p-4 text-left text-gray-800 font-medium"
    >
      {faq.question}
      <ChevronDown
        className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>

    {/* Reserve space so it doesn't push siblings */}
    <div
      className={`px-4 transition-all duration-300 ease-in-out`}
      style={{
        maxHeight: isOpen ? "200px" : "0", // fixed max height instead of auto
        opacity: isOpen ? 1 : 0,
        overflow: "hidden",
        paddingBottom: isOpen ? "1rem" : "0", // space for readability
      }}
    >
      <p className="text-gray-600 text-sm">{faq.answer}</p>
    </div>
  </div>
);

const PricingFAQ: React.FC<PricingFAQProps> = ({ sideBySide = false }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const leftFaqs = faqs.filter((_, i) => i % 2 === 0);
  const rightFaqs = faqs.filter((_, i) => i % 2 === 1);

  return (
    <div className="max-w-5xl mx-auto py-5 px-4">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <p className="text-gray-500">
          Quick answers about Socialcrab.
        </p>
      </div>

      {sideBySide ? (
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left column */}
          <div className="flex flex-col gap-2 flex-1">
            {leftFaqs.map((faq, i) => {
              const actualIndex = i * 2; // even index
              return (
                <FAQItem
                  key={actualIndex}
                  faq={faq}
                  isOpen={openIndex === actualIndex}
                  onClick={() => toggle(actualIndex)}
                />
              );
            })}
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-2 flex-1">
            {rightFaqs.map((faq, i) => {
              const actualIndex = i * 2 + 1; // odd index
              return (
                <FAQItem
                  key={actualIndex}
                  faq={faq}
                  isOpen={openIndex === actualIndex}
                  onClick={() => toggle(actualIndex)}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onClick={() => toggle(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PricingFAQ;
