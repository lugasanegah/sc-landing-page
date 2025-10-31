"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdKeyboardArrowDown } from "react-icons/md";

interface Feature {
  label: string;
  text: string;
  img: string;
}

const accordionFeatures: Feature[] = [
  {
    label: "Analyze Any Public Profile or Hashtag",
    text: "Run reports on competitors, communities, or campaigns without social media login.",
    img: "/homepage/features-images.png",
  },
  {
    label: "Competitive Benchmarking",
    text: "See how your brand stacks up against others with side by side insights.",
    img: "/homepage/features-images.png",
  },
  {
    label: "Influencer Mapping & Quality Check",
    text: "Find authentic influencers and spot fake engagement patterns.",
    img: "/homepage/features-images.png",
  },
  {
    label: "Historical Deep Dive",
    text: "Analyze posts from any chosen time range, not just recent activity.",
    img: "/homepage/features-images.png",
  },
  {
    label: "Content & Tagging Insights",
    text: "See content formats at a glance and discover who is tagged or mentioned most.",
    img: "/homepage/features-images.png",
  },
  {
    label: "Best Time to Post",
    text: "Identify the posting times that generate the highest engagement.",
    img: "/homepage/features-images.png",
  },
  {
    label: "Export Ready Reports",
    text: "Download reports in PDF or Excel for easy sharing with teams or clients.",
    img: "/homepage/features-images.png",
  },
  {
    label: "Refresh Anytime",
    text: "Update existing reports with fresh data whenever needed.",
    img: "/homepage/features-images.png",
  },
];

export default function AccordionFeatures() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [lastOpenedIndex, setLastOpenedIndex] = useState<number>(0);

  return (
    <section className="max-w-6xl mx-auto px-6">
      {/* Heading + Subheading */}
      <div className="text-center mb-10">
        <h1 className="text-2xl  font-semibold leading-tight text-gray-900">
          From Data to Decision, Without the Risk
        </h1>
        <p className="mt-3 text-base  text-gray-600 mx-auto">
          Socialcrab gets the insights you need safely. Hassle free, no social media login, ever.
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Left Side - Image */}
        <div className="w-full h-full flex justify-center items-center relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={lastOpenedIndex}
              src={accordionFeatures[lastOpenedIndex].img}
              alt="Feature Image"
              className="rounded-2xl shadow-lg w-full max-h-[500px] object-cover"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
              loading="lazy"
            />
          </AnimatePresence>
        </div>

        {/* Right Side - Accordion */}
        <div className="flex flex-col justify-center font-manrope">
          {accordionFeatures.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="border-b">
                <button
                  onClick={() => {
                    if (isOpen) {
                      setOpenIndex(null);
                    } else {
                      setOpenIndex(index);
                      setLastOpenedIndex(index);
                    }
                  }}
                  className="w-full flex justify-between items-center text-left py-3 px-2 hover:bg-blue-200 transition-colors"
                >
                  <span className="text-[16px] font-normal">{item.label}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-2 text-2xl"
                  >
                    <MdKeyboardArrowDown />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden px-2 pb-3 text-gray-600 text-[14px] font-normal"
                    >
                      {item.text}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
