import { FaInstagram, FaXTwitter, FaTiktok } from "react-icons/fa6";
import { IoMdInformationCircle } from "react-icons/io";
import { useMemo } from "react";

type RawPlan = {
  _id: string;
  slug: string;
  name: string;
  description: string;
  term: "monthly" | "annually";
  price_usd: number;
  price_idr?: number;
  discount: number;
  featureText?: string[];
};

interface priceDetails {
  type: string;
  price: string;
  profileCredit: number | "Custom";
  hashtagCredit: number | "Custom";
  profileDepth: number | "Recent" | "Custom";
  hashtagDepth: number | "Custom";
  export: "PDF" | "PDF & Excel" | "Custom";
  processingSpeed: "Accelerated" | "Faster" | "Standard" | "SLA";
  platform: number[];
  support: "Priority" | "Email" | "Community" | "Dedicated Manager";
}

interface categories {
  category: string;
  features: { feature: string; tooltip: string }[];
}

type PricingDetailsProps = {
  packages?: RawPlan[];
  billingCycle: "monthly" | "annually";
};

export default function PricingDetails({ packages = [], billingCycle }: PricingDetailsProps) {
  const priceDetails: priceDetails[] = [
    {
      type: "Explore",
      price: "free forever",
      profileCredit: 1,
      hashtagCredit: 0,
      profileDepth: "Recent",
      hashtagDepth: 0,
      export: "PDF",
      processingSpeed: "Standard",
      platform: [0],
      support: "Community",
    },
    {
      type: "Discover",
      price: "$39 per month billed annually",
      profileCredit: 5,
      hashtagCredit: 3,
      profileDepth: 500,
      hashtagDepth: 1000,
      export: "PDF",
      processingSpeed: "Standard",
      platform: [0, 1],
      support: "Email",
    },
    {
      type: "Focus",
      price: "$99 per month billed annually",
      profileCredit: 7,
      hashtagCredit: 5,
      profileDepth: 1000,
      hashtagDepth: 2000,
      export: "PDF & Excel",
      processingSpeed: "Faster",
      platform: [0, 1, 2],
      support: "Priority",
    },
    {
      type: "Deepdive",
      price: "$149 per month billed annually",
      profileCredit: 10,
      hashtagCredit: 8,
      profileDepth: 1500,
      hashtagDepth: 3000,
      export: "PDF & Excel",
      processingSpeed: "Accelerated",
      platform: [0, 1, 2],
      support: "Priority",
    },
    {
      type: "Enterprise",
      price: "Custom Price",
      profileCredit: "Custom",
      hashtagCredit: "Custom",
      profileDepth: "Custom",
      hashtagDepth: "Custom",
      export: "Custom",
      processingSpeed: "SLA",
      platform: [0, 1, 2],
      support: "Dedicated Manager",
    },
  ];

  // map platform numbers to icons
  const platformIcons: { [key: number]: JSX.Element } = {
    0: <FaInstagram className="text-pink-500 inline-block mx-1" />,
    1: <FaXTwitter className="text-black inline-block mx-1" />,
    2: <FaTiktok className="text-gray-800 inline-block mx-1" />,
  };

  const categories: categories[] = [
    {
      category: "Profile & Hashtag Overview",
      features: [
        {
          feature: "Profile Overview",
          tooltip: "Total likes + comments across a profile’s posts",
        },
        {
          feature: "Overview Insight Performance",
          tooltip: "Overall performance metrics for posts or hashtags",
        },
        {
          feature: "Engagement Overview",
          tooltip: "Spot potential influencers and top contributors",
        },
        {
          feature: "Evaluation of Interactions",
          tooltip: "See which contributors drive the most engagement or reach",
        },
      ],
    },
    {
      category: "Activity Analysis (When, Where, How)",
      features: [
        {
          feature: "Type of Posts",
          tooltip: "Breakdown of post formats: photo, reel, video, carousel",
        },
        {
          feature: "Posting Activity",
          tooltip: "When and how often a profile posts content",
        },
        {
          feature: "Tagged Post Locations",
          tooltip: "Top geographic locations tagged in posts",
        },
        {
          feature: "Audience Activity",
          tooltip: "When followers/viewers engage most with posts",
        },
        {
          feature: "Instagram Duet Posts (NEW)",
          tooltip: "Accounts this profile has collaborated with",
        },
        {
          feature: "Most Tagged Profiles (Outgoing)",
          tooltip: "Accounts this profile tags most often",
        },
        {
          feature: "Most Mentioned Profiles (Incoming)",
          tooltip: "Accounts that mention this profile most often",
        },
      ],
    },
    {
      category: "Performance Analysis (What's Working)",
      features: [
        {
          feature: "Best Time to Post",
          tooltip: "Identify posting times that maximize engagement",
        },
        {
          feature: "Engagement Performance",
          tooltip: "Total likes + comments over a given period",
        },
        {
          feature: "Best Performing Post",
          tooltip: "Top posts by likes and comments",
        },
        {
          feature: "Distribution of Post Types",
          tooltip: "Which post formats generate the most engagement",
        },
        {
          feature: "Post vs. Engagement Comparison",
          tooltip: "Compare posting frequency with engagement",
        },
        {
          feature: "Top Hashtag Participants",
          tooltip: "Users with the highest engagement or reach in a hashtag",
        },
        {
          feature: "Influencer & Contributor Performance",
          tooltip: "Measure influencer results (posts, reach, likes, comments)",
        },
        {
          feature: "Reach & Impressions",
          tooltip: "Estimated reach and impressions from hashtag contributors",
        },
        {
          feature: "Top Captions & Hashtags",
          tooltip: "Most-used captions and hashtags",
        },
        {
          feature: "Total Video Views (NEW)",
          tooltip: "Views from videos and reels (profiles only)",
        },
        {
          feature: "Most Viewed Videos",
          tooltip: "Top videos by number of views (profiles only)",
        },
      ],
    },
  ];

  // Build a quick lookup for plan prices by name and term
  const priceLookup = useMemo(() => {
    const map: Record<string, { monthly?: RawPlan; annually?: RawPlan }> = {};
    (packages || []).forEach((p) => {
      const key = p.name.toLowerCase();
      if (!map[key]) map[key] = {};
      map[key][p.term] = p;
    });
    return map;
  }, [packages]);

  const formatUsdPerMonth = (value: number) => {
    const rounded = Math.round(value * 100) / 100;
    const isInt = Number.isInteger(rounded);
    const amount = isInt ? rounded.toFixed(0) : rounded.toFixed(2);
    return `$${amount} per month`;
  };

  const getDisplayedPrice = (planType: string, fallback: string) => {
    const key = planType.toLowerCase();
    if (key === "explore") return "free forever";
    if (key === "enterprise") return "Custom Price";

    const entry = priceLookup[key];
    if (!entry) return fallback;

    // Prefer the requested cycle; if missing, fall back to whichever exists
    const plan = entry[billingCycle] ?? entry.annually ?? entry.monthly;
    if (!plan) return fallback;

    const discounted = plan.price_usd * (1 - (plan.discount || 0) / 100);
    const base = formatUsdPerMonth(discounted);
    return billingCycle === "annually" ? `${base} billed annually` : base;
  };

  return (
    <section
      id="pricing"
      className="w-full py-20 px-4 md:px-8 lg:px-16 bg-white"
    >
      <div>
        <h2 className="text-2xl font-bold text-center mb-8">
          Compare plan features
        </h2>

        {/* table */}
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-4 text-left border-b-2">Features</th>
              {priceDetails.map((header: priceDetails, index: number) => (
                <th key={index} className="p-4 text-center border-b-2">
                  <h1 className="font-semibold">{header.type}</h1>
                  <h3 className="text-gray-500 text-sm">{getDisplayedPrice(header.type, header.price)}</h3>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan={priceDetails.length + 1}
                className="bg-gray-50 font-semibold text-blue-600 px-4 py-2 text-lg "
              >
                Features
              </td>
            </tr>
            {/* Profile Credits */}
            <tr>
              <td className="p-3">Profile Credits / Month</td>
              {priceDetails.map((plan, idx) => (
                <td key={idx} className="text-center">
                  {plan.profileCredit}
                </td>
              ))}
            </tr>

            {/* Hashtag Credits */}
            <tr>
              <td className="p-3">Hashtag Credits / Month</td>
              {priceDetails.map((plan, idx) => (
                <td key={idx} className="text-center">
                  {plan.hashtagCredit}
                </td>
              ))}
            </tr>

            {/* Profile Depth */}
            <tr>
              <td className="p-3">Profile Depth</td>
              {priceDetails.map((plan, idx) => (
                <td key={idx} className="text-center">
                  {plan.profileDepth}
                </td>
              ))}
            </tr>

            {/* Hashtag Depth */}
            <tr>
              <td className="p-3">Hashtag Depth</td>
              {priceDetails.map((plan, idx) => (
                <td key={idx} className="text-center">
                  {plan.hashtagDepth}
                </td>
              ))}
            </tr>

            {/* Export Options */}
            <tr>
              <td className="p-3">Export</td>
              {priceDetails.map((plan, idx) => (
                <td key={idx} className="text-center">
                  {plan.export}
                </td>
              ))}
            </tr>

            {/* Processing Speed */}
            <tr>
              <td className="p-3">Processing Speed</td>
              {priceDetails.map((plan, idx) => (
                <td key={idx} className="text-center">
                  {plan.processingSpeed}
                </td>
              ))}
            </tr>

            {/* Platforms */}
            <tr>
              <td className="p-3">Platforms</td>
              {priceDetails.map((plan, idx) => (
                <td key={idx} className="text-center">
                  {plan.platform.map((p) => platformIcons[p])}
                </td>
              ))}
            </tr>

            {/* Support */}
            <tr>
              <td className="p-3">Support</td>
              {priceDetails.map((plan, idx) => (
                <td key={idx} className="text-center">
                  {plan.support}
                </td>
              ))}
            </tr>

            {/* Dynamic Categories */}
            {categories.map((cat: categories, index: number) => (
              <>
                <tr key={`cat-${index}`}>
                  <td
                    colSpan={priceDetails.length + 1}
                    className="bg-gray-50 font-semibold text-blue-600 px-4 py-2 text-lg "
                  >
                    {cat.category}
                  </td>
                </tr>
                {cat.features.map(
                  (feat: { feature: string; tooltip: string }, fIdx: number) => (
                    <tr key={`feat-${index}-${fIdx}`}>
                      <td className="p-3 flex items-center gap-2">
                        {feat.feature}
                        <div className="relative group">
                          <IoMdInformationCircle className="text-gray-400 cursor-pointer" />
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                            {feat.tooltip}
                          </div>
                        </div>
                      </td>
                      <td
                        colSpan={priceDetails.length}
                        className="text-center text-gray-400 italic"
                      >
                        Included
                      </td>
                    </tr>
                  )
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
