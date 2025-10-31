import React from "react";
import { MdVerified } from "react-icons/md";

const features = [
  "Public Profile Analysis",
  "Historical Post Retrieval",
  "Campaign Monitoring",
  "Timeline-Based Analysis",
  "Report Export (PDF / Excel)",
  "Engagement Quality Over Time",
  "Competitor Benchmarking",
  "Hashtag Performance",
  "Thread & Carousel Performance",
  "Creator Platform Shifts",
];

export default function HomeFeatures() {
  return (
    <section className="bg-[#F5F7FA] py-12 w-full">
  <div className="max-w-6xl mx-auto px-4 text-left md:text-center">
    {/* Title */}
    <h2 className="text-xl font-semibold text-[#1A202C] mb-2">
      Turn Data Into Action
    </h2>
    <p className="text-sm text-gray-500 max-w-2xl mb-10 md:mx-auto">
      Explore the different ways Socialcrab helps creators, brands, and agencies make smarter decisions.
    </p>

    {/* Features grid */}
    <div className="grid grid-cols-1 md:flex md:flex-wrap md:justify-center gap-6">
      {features.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-start md:justify-center space-x-2 text-base text-[#1A202C]"
        >
          <MdVerified className="text-black text-sm" />
          <span className="text-nowrap">{item}</span>
        </div>
      ))}
    </div>
  </div>
</section>

  );
}
