import { Card } from "@/domains/shared/components/ui/card";
import { Badge } from "@/domains/shared/components/ui/badge";
import { Button } from "@/domains/shared/components/ui/button";
import { 
  FaUsers, 
  FaChartLine, 
  FaGlobe, 
  FaCheckCircle,
  FaEye,
  FaRocket,
  FaShieldAlt,
  FaLock,
  FaDatabase,
  FaChartBar,
  FaHandshake
} from "react-icons/fa";

export default function AboutPage() {
  const stats = [
    { number: "10K+", label: "Users Served", icon: FaUsers },
    { number: "1M+", label: "Reports Generated", icon: FaChartLine },
    { number: "50+", label: "Countries", icon: FaGlobe },
    { number: "99.9%", label: "Accuracy", icon: FaCheckCircle }
  ];

  const teamMembers = [
    {
      name: "Socialcrab Team",
      role: "Based in Indonesia",
      bio: "Supported by NVIDIA Inception, Solana Foundation, DS Launchpad, and Alibaba Cloud",
      image: "/figmaAssets/team-indonesia.jpg",
      linkedin: "#"
    }
  ];

  const values = [
    {
      icon: FaCheckCircle,
      title: "Accuracy",
      description: "Clear, structured insights you can trust."
    },
    {
      icon: FaEye, 
      title: "Transparency",
      description: "Open about what we analyze and how we do it."
    },
    {
      icon: FaRocket,
      title: "Innovation",
      description: "Bridging Web2 analytics with Web3 ecosystems."
    },
    {
      icon: FaHandshake,
      title: "Community-first",
      description: "Built for brands, creators, and DAOs alike."
    }
  ];

  const differentiators = [
    {
      icon: FaLock,
      title: "No Risky Syncs",
      description: "Private data protected, account stays safe."
    },
    {
      icon: FaDatabase,
      title: "Deeper Insights",
      description: "Richer data on competitors, communities, & hashtags"
    },
    {
      icon: FaChartBar,
      title: "Research on Autopilot",
      description: "Reports in hours. No more days of manual doom-scrolling."
    },
    {
      icon: FaGlobe,
      title: "Seamless Web2 to Web3",
      description: "Bridging off-chain and on-chain data for brands, builders, and communities."
    }
  ];

    const logos = [
  { src: "/brands/Alibaba.png", href: "https://google.com", alt: "Google" },
  { src: "/brands/dailysocial.png", href: "https://meta.com", alt: "Meta" },
  { src: "/brands/nvidia.png", href: "https://microsoft.com", alt: "Microsoft" },
  { src: "/brands/solana.png", href: "https://amazon.com", alt: "Amazon" },
  { src: "/brands/superteam.png", href: "https://netflix.com", alt: "Netflix" },
];
  

  return (
    <div className="min-h-screen bg-prelinecowhite">
      {/* Hero Section */}
      <div className="flex flex-col items-center w-full py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-prelinecoathens-gray to-prelinecowhite">
        <div className="flex flex-col max-w-4xl mx-auto items-center gap-8 text-center">
          <Badge variant="outline" className="text-prelinecoblue-ribbon border-prelinecoblue-ribbon">
            About Socialcrab
          </Badge>
          <h1 className="text-4xl md:text-[48px] font-bold text-prelinecomirage leading-tight font-manrope">
            From Data to Decision in One Click
          </h1>
          <p className="text-lg md:text-[18px] font-normal text-prelinecopale-sky leading-relaxed font-inter max-w-3xl">
            Socialcrab is a social media analytics platform for brands, agencies, creators, and communities. 
            We turn public social media data into clear insights without risky logins or hours of manual work.
          </p>
        </div>
      </div>

  

      {/* Story Section */}
      <div className="flex flex-col max-w-6xl mx-auto items-center gap-16 py-20 px-4 md:px-8 bg-prelinecoathens-gray/50 rounded-2xl">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <img 
              src="/homepage/our_story.jpg" 
              alt="Our Story" 
              className="w-full h-[400px] object-cover rounded-xl"
            />
          </div>
          <div className="flex-1 flex flex-col gap-6">
            <h2 className="text-3xl md:text-[36px] font-bold text-prelinecomirage font-manrope">
              Our Story
            </h2>
            <p className="text-lg text-prelinecopale-sky font-inter leading-relaxed">
              We started Socialcrab because existing analytics tools weren't built for everyone. Native insights are too shallow. 
              Traditional tools require account logins, putting users at risk of suspension. Manual research? Slow, expensive, and full of errors.
            </p>
            <p className="text-lg text-prelinecopale-sky font-inter leading-relaxed">
              Even though AI and social media keep growing fast, there's still no infrastructure that makes the process easier. 
              People are using them separately but still doing the research part manually.
            </p>
            <p className="text-lg text-prelinecopale-sky font-inter leading-relaxed">
              What we're building is that missing link: the infrastructure that connects both sides turning raw public data into insights you can act on instantly.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="flex flex-col max-w-6xl mx-auto items-center gap-16 py-20 px-4 md:px-8">
  <div className="flex flex-col lg:flex-row items-center gap-12">
    <div className="flex-1 flex flex-col gap-6">
      <h2 className="text-3xl md:text-[36px] font-bold text-prelinecomirage font-manrope">
        Our Mission
      </h2>
      <p className="text-lg text-prelinecopale-sky font-inter leading-relaxed">
        We believe every business, creator, and community should have access to the same quality of social media insights 
        that were once reserved for enterprise companies with million-dollar budgets.
      </p>
      <p className="text-lg text-prelinecopale-sky font-inter leading-relaxed">
        With Socialcrab, we're leveling the playing field and empowering data-driven decisions that drive real growth and engagement.
      </p>
      <div className="flex flex-col -gap-1 mt-4">
        <div className="flex items-start gap-3 p-4 bg-prelinecowhite rounded-lg">
          <FaChartLine className="text-prelinecoblue-ribbon mt-1 flex-shrink-0" />
          <span className="text-prelinecomirage font-inter">Democratize enterprise-grade analytics</span>
        </div>
        <div className="flex items-start gap-3 p-4 bg-prelinecowhite rounded-lg">
          <FaDatabase className="text-prelinecoblue-ribbon mt-1 flex-shrink-0" />
          <span className="text-prelinecomirage font-inter">Deliver structured, reliable insights</span>
        </div>
        <div className="flex items-start gap-3 p-4 bg-prelinecowhite rounded-lg">
          <FaGlobe className="text-prelinecoblue-ribbon mt-1 flex-shrink-0" />
          <span className="text-prelinecomirage font-inter">Support brands, agencies, and communities worldwide</span>
        </div>
      </div>
    </div>
    <div className="flex-1 h-full">
      <img 
        src="/homepage/our_mission.jpg" 
        alt="Our Mission" 
        className="w-full h-full object-cover rounded-xl"
      />
    </div>
  </div>
</div>

      {/* Differentiators Section */}
      <div className="flex flex-col max-w-6xl mx-auto items-center gap-12 py-20 px-4 md:px-8 bg-prelinecoathens-gray/50 rounded-2xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl md:text-[36px] font-bold text-prelinecomirage font-manrope">
            What Makes Us Different
          </h2>
          <p className="text-lg text-prelinecopale-sky font-inter max-w-2xl">
            Key features that set Socialcrab apart from traditional analytics tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {differentiators.map((item, index) => (
            <Card key={index} className="p-6 bg-prelinecowhite border text-center hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 bg-prelinecoblue-ribbon/10 rounded-lg flex items-center justify-center">
                  <item.icon size={24} className="text-prelinecoblue-ribbon" />
                </div>
                <h3 className="text-lg font-semibold text-prelinecomirage font-manrope">
                  {item.title}
                </h3>
                <p className="text-sm text-prelinecopale-sky font-inter">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="flex flex-col max-w-6xl mx-auto items-center gap-12 py-20 px-4 md:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl md:text-[36px] font-bold text-prelinecomirage font-manrope">
            Our Values
          </h2>
          <p className="text-lg text-prelinecopale-sky font-inter max-w-2xl">
            The principles that guide everything we do at Socialcrab.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {values.map((value, index) => (
            <Card key={index} className="p-6 bg-prelinecowhite border text-center hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 bg-prelinecoblue-ribbon/10 rounded-lg flex items-center justify-center">
                  <value.icon size={24} className="text-prelinecoblue-ribbon" />
                </div>
                <h3 className="text-lg font-semibold text-prelinecomirage font-manrope">
                  {value.title}
                </h3>
                <p className="text-sm text-prelinecopale-sky font-inter">
                  {value.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="flex flex-col max-w-6xl mx-auto items-center gap-12 py-20 px-4 md:px-8 bg-prelinecoathens-gray/50 rounded-2xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl md:text-[36px] font-bold text-prelinecomirage font-manrope">
            Our Team
          </h2>
          <p className="text-lg text-prelinecopale-sky font-inter max-w-2xl">
            We're a small, passionate team based in Indonesia, supported by global accelerator programs.
          </p>
        </div>

        <div className="relative w-full overflow-hidden bg-white">
  <div className="flex w-max mx-auto animate-marquee hover:[animation-play-state:paused]">
    {[...logos, ...logos, ...logos,...logos].map((logo, idx) => (
      <a
        key={idx}
        href={logo.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center mx-4 basis-[60%]"
      >
        <img
          src={logo.src}
          alt={logo.alt}
          className="object-contain w-full h-auto max-h-20 md:max-h-24 lg:max-h-28"
        />
      </a>
    ))}
  </div>
</div>
      </div>

      {/* CTA Section */}
      <div className="flex flex-col max-w-4xl mx-auto items-center gap-8 py-20 px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-[36px] font-bold text-prelinecomirage font-manrope">
          Get Started
        </h2>
        <p className="text-lg text-prelinecopale-sky font-inter">
          Explore a sample report or start analyzing today with Socialcrab.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="bg-prelinecoblue-ribbon hover:bg-prelinecoblue-ribbon/90 text-prelinecowhite">
            View Sample Report
          </Button>
          <Button variant="outline" size="lg">
            Start Analyzing
          </Button>
        </div>
      </div>
    </div>
  );
}