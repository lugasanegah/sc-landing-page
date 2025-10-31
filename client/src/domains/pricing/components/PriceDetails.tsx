import React from "react";
import { Check } from "lucide-react";

const plans = [
  { name: "Explore", price: "Free forever" },
  { name: "Discover", price: "$39 per month billed annually" },
  { name: "Focus", price: "$99 per month billed annually" },
  { name: "DeepDive", price: "$149 per month billed annually" },
  { name: "Enterprise", price: "Custom Price" },
];

const features = [
  {
    category: "Features",
    items: [
      {
        name: "Profile Credits / Month",
        values: ["1", "5", "7", "10", "Custom"],
      },
      {
        name: "Hashtag Credits / Month",
        values: ["—", "3", "5", "8", "Custom"],
      },
      {
        name: "Profile History Depth",
        values: ["Recent", "500 posts", "1,000 posts", "1,500 posts", "Custom"],
      },
      {
        name: "Hashtag History Depth",
        values: ["—", "1,000 posts", "2,000 posts", "3,000 posts", "Custom"],
      },
      {
        name: "Exports",
        values: ["PDF", "PDF", "PDF & Excel", "PDF & Excel", "Custom"],
      },
      {
        name: "Processing Speed",
        values: ["Standard", "Standard", "Faster", "Accelerated", "SLA"],
      },
      // {
      //   name: "Platforms",
      //   values: [
      //     "IG only",
      //     "IG + TikTok",
      //     "IG + TikTok + X",
      //     "IG + TikTok + X",
      //     "All + API",
      //   ],
      // },
      {
        name: "Support",
        values: [
          "Community",
          "Email",
          "Priority",
          "Priority",
          "Dedicated Manager",
        ],
      },
    ],
  },
];

const PriceDetails: React.FC = () => {
  return (
    <section
      id="pricing"
      className="w-full py-20 px-4 md:px-8 lg:px-16 bg-white"
    >
      <div className="w-full overflow-x-auto">
        <h2 className="text-2xl font-bold text-center mb-8">
          Compare plan features
        </h2>

        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-4 border-b border-gray-200">
                Features
              </th>
              {plans.map((plan) => (
                <th
                  key={plan.name}
                  className="p-4 border-b border-gray-200 text-center"
                >
                  <div className="font-semibold">{plan.name}</div>
                  <div className="text-sm text-gray-500">{plan.price}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((section) => (
              <React.Fragment key={section.category}>
                <tr>
                  <td
                    colSpan={plans.length + 1}
                    className="bg-gray-50 font-semibold text-gray-700 px-4 py-2 text-sm"
                  >
                    {section.category}
                  </td>
                </tr>
                {section.items.map((feature) => (
                  <tr key={feature.name} className="border-b border-gray-100">
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {feature.name}
                    </td>
                    {feature.values.map((val, i) => (
                      <td key={i} className="text-center px-4 py-3">
                        {val === "—" ? (
                          <span className="text-gray-300">—</span>
                        ) : (
                          <span className="text-sm">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
            <tr>
              <td></td>
              {plans.map((plan) => (
                <td key={plan.name} className="p-4 text-center">
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow text-sm">
                    Get started
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PriceDetails;
