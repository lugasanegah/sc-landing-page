import { Card } from "@/domains/shared/components/ui/card";
import { Badge } from "@/domains/shared/components/ui/badge";
import { Button } from "@/domains/shared/components/ui/button";
import { 
  Verify, 
  Link21, 
  TrendUp, 
  Monitor, 
  UserSearch, 
  DocumentText,
  Instagram,
  VideoPlay,
  MessageText1,
  
} from "iconsax-react";

export default function FeaturesPage() {
  const features = [
    {
      icon: Verify,
      title: "AI-Validated Data",
      description: "Machine learning algorithms validate every data point to ensure 99.9% accuracy in social media analytics.",
      category: "Core Analytics",
      benefits: [
        "Real-time data validation",
        "Fraud detection",
        "Quality assurance",
        "Automated error correction"
      ]
    },
    {
      icon: Link21,
      title: "Web3 Ecosystem Insights",
      description: "Track decentralized platforms, NFT trends, and blockchain-based social networks with comprehensive analytics.",
      category: "Web3 Analytics",
      benefits: [
        "DeFi social tracking",
        "NFT community analytics",
        "Token-gated content monitoring",
        "Blockchain social metrics"
      ]
    },
    {
      icon: TrendUp,
      title: "3+ Years Historical Data",
      description: "Access comprehensive historical trends and patterns to make informed strategic decisions.",
      category: "Data Intelligence",
      benefits: [
        "Trend analysis",
        "Seasonal patterns",
        "Growth trajectories",
        "Historical comparisons"
      ]
    },
    {
      icon: Monitor,
      title: "Real-Time Monitoring",
      description: "Get instant notifications and live updates on social media metrics across all platforms.",
      category: "Monitoring",
      benefits: [
        "Live dashboard updates",
        "Instant alerts",
        "Crisis management",
        "Performance tracking"
      ]
    },
    {
      icon: UserSearch,
      title: "Competitor Analysis",
      description: "Deep dive into competitor strategies and benchmark your performance against industry leaders.",
      category: "Competitive Intelligence",
      benefits: [
        "Market positioning",
        "Strategy insights",
        "Performance benchmarking",
        "Opportunity identification"
      ]
    },
    {
      icon: DocumentText,
      title: "Custom Reporting",
      description: "Generate white-label reports with your branding and specific KPIs that matter to your business.",
      category: "Reporting",
      benefits: [
        "White-label reports",
        "Custom KPIs",
        "Automated scheduling",
        "Multiple formats"
      ]
    }
  ];

  const integrations = [
    // { name: "Facebook", icon: Facebook },
    { name: "Instagram", icon: Instagram },
    { name: "TikTok", icon: VideoPlay },
    { name: "Twitter/X", icon: MessageText1 },
    // { name: "LinkedIn", icon: Category },
    // { name: "YouTube", icon: Youtube },
    // { name: "Discord", icon: Microphone2 },
    // { name: "Telegram", icon: Send2 }
  ];

  return (
    <div className="min-h-screen bg-prelinecowhite">
      {/* Hero Section */}
      <div className="flex flex-col items-center w-full py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-prelinecoathens-gray to-prelinecowhite">
        <div className="flex flex-col max-w-4xl mx-auto items-center gap-8 text-center">
          <Badge variant="outline" className="text-prelinecoblue-ribbon border-prelinecoblue-ribbon">
            Powerful Features
          </Badge>
          <h1 className="text-4xl md:text-[48px] font-bold text-prelinecomirage leading-tight font-manrope">
            Everything You Need for Social Media Success
          </h1>
          <p className="text-lg md:text-[18px] font-normal text-prelinecopale-sky leading-relaxed font-inter max-w-2xl">
            Discover our comprehensive suite of tools designed to transform your social media strategy with AI-powered insights and real-time analytics.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="flex flex-col max-w-6xl mx-auto items-start gap-16 py-20 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 bg-prelinecowhite border hover:shadow-lg transition-shadow">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-prelinecoblue-ribbon/10 rounded-lg flex items-center justify-center">
                    <feature.icon size={24} className="text-prelinecoblue-ribbon" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.category}
                  </Badge>
                </div>
                
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-prelinecomirage font-manrope">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-prelinecopale-sky font-inter">
                    {feature.description}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-medium text-prelinecomirage font-inter">Key Benefits:</h4>
                  <ul className="space-y-1">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-prelinecopale-sky font-inter">
                        <div className="w-1.5 h-1.5 bg-prelinecoblue-ribbon rounded-full" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Integrations Section */}
      <div className="flex flex-col max-w-6xl mx-auto items-center gap-12 py-20 px-4 md:px-8 bg-prelinecoathens-gray/50 rounded-2xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl md:text-[36px] font-bold text-prelinecomirage font-manrope">
            Native Platform Integrations
          </h2>
          <p className="text-lg text-prelinecopale-sky font-inter max-w-2xl">
            Connect seamlessly with all major social media platforms and get unified analytics in one dashboard.
          </p>
        </div>

        <div className="flex gap-6 w-full mx-auto overflow-x-auto justify-center md:justify-center">
          {integrations.map((integration, index) => (
            <div key={index} className="shrink-0 flex flex-col items-center gap-3 p-4 bg-prelinecowhite rounded-lg hover:shadow-md transition-shadow">
              <integration.icon size={32} className="text-prelinecoblue-ribbon" />
              <span className="text-xs font-medium text-prelinecomirage font-inter text-center">
                {integration.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="flex flex-col max-w-4xl mx-auto items-center gap-8 py-20 px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-[36px] font-bold text-prelinecomirage font-manrope">
          Ready to Transform Your Social Media Strategy?
        </h2>
        <p className="text-lg text-prelinecopale-sky font-inter">
          Join thousands of brands using SocialCrab to unlock powerful insights and drive growth.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="bg-prelinecoblue-ribbon hover:bg-prelinecoblue-ribbon/90 text-prelinecowhite">
            Start Free Trial
          </Button>
          <Button variant="outline" size="lg">
            Schedule Demo
          </Button>
        </div>
      </div>
    </div>
  );
}