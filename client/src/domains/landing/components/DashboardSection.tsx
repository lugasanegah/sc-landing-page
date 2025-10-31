import { ChevronLeftIcon, ChevronRightIcon, CalendarDays, ArrowRight, Users, Target, FileText, FolderOpen, Search, Monitor, Sparkles, Package, FileText as FileTextIcon, Globe, Briefcase, Paperclip, Calendar, Download, RefreshCw } from "lucide-react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { format } from "date-fns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/domains/shared/components/ui/accordion";
import { Button } from "@/domains/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/domains/shared/components/ui/card";
import { Badge } from "@/domains/shared/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/domains/shared/components/ui/tabs";
import PricingFAQ from "@/domains/pricing/components/PricingFAQ";
import { motion, AnimatePresence } from "framer-motion";
import HomeFeatures from "./HomeFeatures";
import AccordionFeatures from "./AccordionFeatures";

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  featuredImage?: string;
  author: string;
  createdAt: string;
}

interface Feature {
  icon: React.ReactElement;
  title: string;
  description: string;
}

interface SuccessStory {
  icon: React.ReactElement;
  percentage: string;
  title: string;
  description: string;
}

// Define background style outside component to prevent re-render blinking
const HERO_BACKGROUND_STYLE = {
  background: 'url(/homepage/Background.png) 50% 50% / cover'
};

export const DashboardSection = (): JSX.Element => {
  // Fetch latest blogs from database
  const { data: blogs = [], isLoading: blogsLoading } = useQuery<Blog[]>({
    queryKey: ['/api/blogs/latest'],
  });
  const [activeTab, setActiveTab] = React.useState<string>("Dashboard");
  // Navigation tabs data
  const navigationTabs = [
    { name: "Dashboard", disabled: false },
    { name: "Instagram Profile Analytics", disabled: false },
    { name: "Instagram Hashtag Analytics", disabled: false },
    { name: "X Analytics (coming soon)", disabled: true },
    { name: "Tiktok Analytics (coming soon)", disabled: true },
  ];

  // Partner logos data
  const partnerLogos = [
    "homepage/bpjs.svg",
    "homepage/bgs.svg",
    "homepage/block_news.svg",
    "homepage/samira.svg",
    "homepage/dailysocial.svg",
    "homepage/maxchat.svg",
    "homepage/medisin.svg"
  ];

  const logos: { src: string; href: string; alt: string }[] = [
    { src: "homepage/bpjs.svg", href: "https://bpjs.co.id", alt: "BPJS Logo" },
    { src: "homepage/bgs.svg", href: "https://bgs.co.id", alt: "BGS Logo" },
    { src: "homepage/block_news.svg", href: "https://blocknews.com", alt: "Block News Logo" },
    { src: "homepage/samira.svg", href: "https://samira.com", alt: "Samira Logo" },
    { src: "homepage/dailysocial.svg", href: "https://dailysocial.id", alt: "DailySocial Logo" },
    { src: "homepage/maxchat.svg", href: "https://maxchat.com", alt: "MaxChat Logo" },
    { src: "homepage/medisin.svg", href: "https://medisin.com", alt: "Medisin Logo" }
  ]

  const [activeImage, setActiveImage] = useState("/homepage/features-images.png");

  const images: Record<string, string> = {
    "item-1": "/homepage/features-images.png",
    "item-2": "/homepage/features-images.png",
    "item-3": "/homepage/features-images.png",
    "item-4": "/homepage/features-images.png",
  };


  // Features data
  const features: Feature[] = [
    {
      icon: <Users className="w-8 h-8 text-prelinecoblue-ribbon" />,
      title: "Competitor Analysis",
      description:
        "Compare public profiles side-by-side. Great for agency audits or benchmarking.",
    },
    {
      icon: <Target className="w-8 h-8 text-prelinecoblue-ribbon" />,
      title: "Campaign Recaps",
      description: "Pull historical data before/after a campaign to show impact clearly.",
    },
    {
      icon: <FileText className="w-8 h-8 text-prelinecoblue-ribbon" />,
      title: "Pitch Decks & Reports",
      description:
        "Founders export post and engagement data to include in investor decks.",
    },
    {
      icon: <FolderOpen className="w-8 h-8 text-prelinecoblue-ribbon" />,
      title: "Hashtag Monitoring",
      description:
        "Understand which hashtags performed best and when.",
    },
    {
      icon: <Search className="w-8 h-8 text-prelinecoblue-ribbon" />,
      title: "Internal Research",
      description:
        "Researchers analyze timelines, formats, and engagement over time.",
    },
    {
      icon: <Monitor className="w-8 h-8 text-prelinecoblue-ribbon" />,
      title: "Ongoing Monitoring",
      description:
        "Re-check the same profile each month without starting over.",
    },
  ];

  // Blog cards data
  const blogCards = [
    {
      backgroundImage: "/figmaAssets/background-image.png",
      cardImage: "/figmaAssets/card-image.png",
      category: "Calendars",
      description:
        "Discover user-friendly calendar UIs\ndesigned for both dashboard and admin\ninterfaces.",
    },
    {
      backgroundImage: "/figmaAssets/background-image-1.png",
      cardImage: "/figmaAssets/card-image-1.png",
      category: "Modals",
      description:
        "Modals provide a clean way to present\ny2go4 options inside modal windows.",
    },
    {
      backgroundImage: "/figmaAssets/background-image-2.png",
      cardImage: "/figmaAssets/card-image-2.png",
      category: "Checkout Forms",
      description:
        "Simplified checkout process with\nintuitive forms to ensure a smooth and\nquick transaction completion.",
    },
    {
      backgroundImage: "/figmaAssets/background-image-3.png",
      cardImage: "/figmaAssets/card-image-3.png",
      category: "Forms",
      description:
        "Create customizable review forms with\npre-set questions to guide reviewers.",
    },
    {
      backgroundImage: "/figmaAssets/background-image-4.png",
      cardImage: null,
      category: "Referrals",
      description:
        "Powerful e-commerce admin pages with\nproduct & order lists, referrals and more.",
    },
  ];

  // Impact stories data
  const successStories: SuccessStory[] = [
    {
      icon: <Package className="w-8 h-8 text-prelinecoblue-ribbon" />,
      percentage: "1,000+",
      title: "Reports Generated",
      description:
        "Teams across industries use Socialcrab to generate structured insights — from campaign recaps to competitor deep-dives.",
    },
    {
      icon: <FileTextIcon className="w-8 h-8 text-prelinecoblue-ribbon" />,
      percentage: "20+",
      title: "Real-World Projects",
      description:
        "From public sector to private brands, Socialcrab has powered social analysis for agencies, Web3 founders, and internal marketing teams.",
    },
    {
      icon: <Globe className="w-8 h-8 text-prelinecoblue-ribbon" />,
      percentage: "Billions",
      title: "Posts Accessible",
      description:
        "Socialcrab connects to public data across Instagram, TikTok, and X — no login, no scraping — making it easy to analyze any profile or hashtag.",
    },
    {
      icon: <Briefcase className="w-8 h-8 text-prelinecoblue-ribbon" />,
      percentage: "70%",
      title: "Less Manual Work (est.)",
      description:
        "By removing screenshots, copy-pasting, and spreadsheet stitching, Socialcrab streamlines reporting workflows for analysts and marketers.",
    },
  ];

  // FAQ data
  const faqItems = [
    {
      question: "What makes Socialcrab different from other tools?",
      answer:
        "Socialcrab offers 3+ years of historical data, Web3-native analytics, and AI-validated\ninsights with zero manual cleanup. We're built specifically for the modern social\nmedia landscape including crypto ecosystems.",
      defaultOpen: true,
    },
    {
      question: "How can Socialcrab improve my ad campaigns?",
      answer: "Our competitor benchmarks and audience overlap tools help you identify what works\nfor your competitors and optimize your targeting for 70% higher engagement rates.",
      defaultOpen: false,
    },
    {
      question: "How far back does historical data go?",
      answer: "Unlike other platforms that show 90 days, Socialcrab provides 3+ years of\nhistorical data to help you spot seasonal trends and recurring patterns.",
      defaultOpen: false,
    },
    {
      question: "Can I export data to Excel/PDF?",
      answer: "Yes! All plans include export functionality with one-click branded reports\nfor professional presentations and client deliverables.",
      defaultOpen: false,
    },
    {
      question: "Does Socialcrab work in my country?",
      answer: "Socialcrab works globally and supports multiple platforms including Instagram,\nTikTok, Twitter/X, and Web3 ecosystems like Solana.",
      defaultOpen: false,
    },
    {
      question: "What's the cheapest plan for solo creators?",
      answer: "Our Solo Creator plan starts at $19/month and includes basic analytics,\n30-day historical data, and 5 competitor insights.",
      defaultOpen: false,
    },
  ];

  const appHost = (import.meta as any).env?.VITE_SOCIALCRAB_APP_URL
    ? String((import.meta as any).env.VITE_SOCIALCRAB_APP_URL).replace(/\/$/, "")
    : "";

  return (
    <section className="flex flex-col w-full items-center gap-6">
      {/* Hero section with background */}
      <div
        className="flex flex-col items-start w-full px-4 md:pt-8 lg:pt-16 relative"
        style={HERO_BACKGROUND_STYLE}
      >
        <div className="flex flex-col max-w-6xl mx-auto items-start gap-8 px-4 md:px-8 w-full">
          <div className="flex items-end w-full">
            <div className="flex flex-col w-full  items-start gap-4">
              <h1 className="text-4xl md:text-[58.7px] font-bold text-prelinecomirage leading-tight md:leading-[60px] font-manrope text-white">
                Data to Decision in One Click
              </h1>

              <p className="text-base md:text-[16.7px] font-normal text-prelinecomirage leading-7 font-inter pt-1 text-white">
                Turn public posts into structured, on-demand insights
                Analyze Instagram, TikTok, and X profiles. No social media sync or login required

              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <Button
                  className="bg-prelinecoblue-ribbon text-black text-xs md:text-[12.7px] rounded-lg shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a] bg-white hover:bg-prelinecoblue-ribbon hover:text-prelinecowhite"
                  onClick={() => window.open(appHost, '_blank', 'noopener,noreferrer')}
                >
                  Start analyzing for Free
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 w-full">
            <div className="flex flex-col items-start pt-6 w-full z-[1]">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full overflow-x-auto">
                <TabsList className="flex p-0.5 bg-transparent h-auto">
                  {navigationTabs.map((tab) => (
                    <TabsTrigger
                      key={tab.name}
                      value={tab.name}
                      disabled={tab.disabled}
                      className={`px-[13px] py-[8.5px] text-[12.3px] rounded-full ${tab.disabled
                        ? "text-prelinecomirage opacity-70 text-white cursor-not-allowed hidden md:inline-flex"
                        : "text-prelinecomirage hover:bg-white hover:text-black text-white"
                        } ${activeTab === tab.name && !tab.disabled ? "bg-black" : "bg-transparent"}`}
                    >
                      {tab.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            <div className="w-full z-0 relative">
              {/* Invisible spacer to maintain layout height */}
              <img
                src={
                  activeTab === "Dashboard"
                    ? "/homepage/dashboard.png"
                    : activeTab === "Instagram Profile Analytics"
                      ? "/homepage/profile.png"
                      : "/homepage/hashtag.png"
                }
                alt=""
                className="w-full invisible"
              />

              {/* Animated images positioned absolutely for smooth crossfade */}
              <AnimatePresence mode="sync">
                <motion.img
                  key={activeTab}
                  src={
                    activeTab === "Dashboard"
                      ? "/homepage/dashboard.png"
                      : activeTab === "Instagram Profile Analytics"
                        ? "/homepage/profile.png"
                        : "/homepage/hashtag.png"
                  }
                  alt="Dashboard preview"
                  className="absolute top-0 left-0 w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  loading="lazy"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted companies section */}
      <div className="flex flex-col max-w-6xl w-full items-start gap-8 pt-4 px-4 md:px-8">
        <div className="flex flex-col items-center w-full">
          <p className="text-black text-center font-preline-co-manrope-regular">
            For marketers, founders, and analysts building brands, communities, and narratives with data.
          </p>
        </div>

        {/* <div className="w-full h-[20px] md:h-8 overflow-hidden">
          <div className="flex items-center justify-center gap-[5px] md:gap-[40px]">
            {[...partnerLogos].map((logo, index) => (
              <div
                key={`logo-${index}`}
                className="flex w-[140px] h-[20px] md:h-8 items-center justify-center px-4"
              >
                <img
                  className="h-full w-auto max-w-[140px] object-contain"
                  alt={`Partner logo ${index + 1}`}
                  src={logo}
                />
              </div>
            ))}
          </div>
        </div> */}
      </div>

      <div className="relative w-full overflow-hidden bg-white py-6">
        <div className="flex w-max animate-marquee-infinite">
          {[...logos, ...logos, ...logos, ...logos].map((logo, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center mx-6 sm:mx-8 h-[54px]" // 85% of 64px
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="block w-auto h-[54px] object-contain" // scaled down height
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>




      <HomeFeatures />



      {/* What we do section */}
      <div className="flex flex-col max-w-4xl w-full items-center gap-10 pt-4 px-4 md:px-8">
        <div className="flex flex-col max-w-xl w-full items-center gap-3 text-center">
          {/* <p className="text-prelinecopale-sky font-preline-co-manrope-regular text-sm md:text-base">
    Our Features
  </p> */}

          <h2 className="text-2xl font-bold text-prelinecomirage leading-snug font-manrope">
            Social analytics, simplified
          </h2>

          <p className="text-base font-normal text-prelinecomirage leading-7 font-inter pt-2">
            Favorite Use Cases
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {features.map((feature, index) => (
            <div key={`feature-${index}`} className="flex items-start gap-5">
              <div className="w-8 h-9 pt-1 flex items-center justify-center">
                {feature.icon}
              </div>
              <div className="flex flex-col items-start gap-1 flex-1">
                <h3 className="text-[15px] font-normal text-prelinecomirage leading-6 font-inter">
                  {feature.title}
                </h3>
                <p className="text-[15px] font-normal text-prelinecopale-sky leading-6 font-inter">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blog section */}
      {/* <div className="relative w-full py-16 px-4 md:px-8">
        <div className="flex flex-col items-start gap-8 w-full max-w-6xl mx-auto"> */}
      {/* Title and arrows container */}
      {/* <div className="flex items-start justify-between w-full">
          <h2 className="text-xl md:text-[23.4px] font-bold text-prelinecomirage leading-8 font-manrope">
            Blog
          </h2>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="w-10 h-10 rounded-full border border-[#f2f4f6] shadow-[0px_1px_0px_#0000000d] opacity-50 bg-prelinecowhite p-px"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-10 h-10 rounded-full border border-[#f2f4f6] shadow-[0px_1px_0px_#0000000d] bg-prelinecowhite p-px"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>

          <div className="w-full overflow-x-auto">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
              <div className="flex gap-5 pb-4 scrollbar-hide overflow-x-auto">
                {blogsLoading ? ( */}
      {/* // Loading skeleton */}
      {/* [...Array(3)].map((_, index) => (
                    <Card key={`skeleton-${index}`} className="flex flex-col w-[346px] shrink-0 animate-pulse">
                      <div className="h-[250px] bg-gray-300 rounded-t-xl"></div>
                      <CardContent className="flex items-center gap-5 pt-4">
                        <div className="flex flex-col items-start gap-2 flex-1">
                          <div className="h-4 bg-gray-300 rounded w-20"></div>
                          <div className="h-4 bg-gray-300 rounded w-32"></div>
                          <div className="h-4 bg-gray-300 rounded w-24"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : blogs.length > 0 ? (
                  blogs.map((blog) => (
                    <Link key={blog._id} href={`/blog/${blog.slug}`}>
                      <Card className="flex flex-col w-[346px] shrink-0 cursor-pointer group hover:shadow-lg transition-all duration-300">
                        <div className="relative">
                          {blog.featuredImage && (
                            <div className="relative overflow-hidden rounded-t-xl">
                              <img
                                src={blog.featuredImage}
                                alt={blog.title}
                                className="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
                          )}
                        </div>

                        <CardContent className="flex flex-col gap-3 pt-4 pb-4">
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                              {blog.category}
                            </Badge>
                            <div className="flex items-center text-xs text-gray-500">
                              <CalendarDays className="h-3 w-3 mr-1" />
                              <span>{format(new Date(blog.createdAt), 'MMM dd')}</span>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <h3 className="text-[14.9px] font-semibold text-prelinecomirage leading-5 line-clamp-2 group-hover:text-blue-600 transition-colors font-inter">
                              {blog.title}
                            </h3>
                            <p className="text-[13.3px] font-normal text-prelinecopale-sky leading-5 line-clamp-2 font-inter">
                              {blog.excerpt}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">By {blog.author}</span>
                            <div className="flex items-center text-xs text-blue-600 font-medium">
                              <span>Read more</span>
                              <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))
                ) : (
                  // Empty state
                  <div className="flex-1 text-center py-12">
                    <p className="text-prelinecopale-sky">No blog posts available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Success stories section */}
      {/* <div className="flex flex-col w-full max-w-[1248px] items-center gap-16 py-20 px-4 md:px-8 lg:px-20 rounded-2xl bg-[linear-gradient(180deg,rgba(243,244,246,1)_0%,rgba(243,244,246,0)_100%)]">
        <div className="flex flex-col max-w-xl w-full items-center gap-2">
          <h2 className="text-2xl md:text-[29.3px] font-bold text-prelinecomirage text-center leading-9 font-manrope">
            ✨ From Data to Decisions — Where Insights Meet Impact
          </h2>
          <p className="text-[14.9px] font-normal text-prelinecopale-sky text-center leading-6 font-inter">
            Socialcrab helps teams turn public social media data into clarity, strategy, and real outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          {successStories.map((story, index) => (
            <Card key={`story-${index}`} className="p-6 bg-prelinecowhite">
              <div className="flex items-center gap-3 pb-5">
                <div className="w-8 h-8 flex items-center justify-center">
                  {story.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-[27.4px] font-bold text-prelinecomirage leading-9 font-manrope">
                    {story.percentage}
                  </h3>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-10 h-10 rounded-full border border-[#f2f4f6] bg-prelinecowhite p-px"
                >
                  <img
                    className="w-3.5 h-3.5"
                    alt="Arrow"
                    src="/figmaAssets/component-1.svg"
                  />
                </Button>
              </div>

              <div className="flex flex-col gap-1 pb-5">
                <h4 className="text-[17px] font-normal text-prelinecomirage leading-7 font-inter">
                  {story.title}
                </h4>
                <p className="text-[14.8px] font-normal text-prelinecopale-sky leading-6 font-inter">
                  {story.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div> */}

      {/* Features section with image */}

      <AccordionFeatures />

      {/* FAQ section */}
      {/* <div className="flex flex-col max-w-6xl w-full items-center gap-8 pt-24 pb-14 px-4 md:px-8 lg:px-60">
        <div className="flex flex-col max-w-2xl w-full items-center gap-2">
          <h2 className="text-2xl md:text-[29.3px] font-bold text-prelinecomirage text-center leading-9 font-manrope">
            Your questions, answered
          </h2>
          <p className="text-[14.8px] font-normal text-prelinecopale-sky text-center leading-6 font-inter">
            Answers to the most frequently asked questions.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={`faq-${index}`}
              value={`item-${index}`}
              className={
                index === 0
                  ? "bg-prelinecoathens-gray rounded-xl p-6 mb-6"
                  : "border-0 py-6"
              }
            >
              <AccordionTrigger className="text-[15px] font-normal text-prelinecomirage [font-family:'Inter',Helvetica]">
                {item.question}
              </AccordionTrigger>
              {item.answer && (
                <AccordionContent className={index === 0 ? "pt-3" : ""}>
                  <p className="text-[15px] font-normal text-prelinecomirage leading-6 [font-family:'Inter',Helvetica]">
                    {item.answer}
                  </p>
                </AccordionContent>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </div> */}

      {/* CTA section */}
      {/* <div className="flex flex-col w-full max-w-[1248px] items-center gap-8 p-4 md:p-20 rounded-2xl bg-[linear-gradient(180deg,rgba(243,244,246,1)_0%,rgba(243,244,246,0)_100%)]">
        <div className="flex flex-col items-center gap-2 w-full">
          <p className="text-prelinecopale-sky text-center font-preline-co-manrope-regular">
            Get started
          </p>
          <h2 className="text-2xl md:text-[35px] font-bold text-prelinecomirage text-center leading-10 font-preline-co-semantic-heading-2">
            The Web App powering
            <br />
            thousands of companies.
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button className="bg-prelinecoblue-ribbon text-prelinecowhite text-xs md:text-[12.7px] rounded-lg shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a]">
            Try it free
          </Button>

          <Button
            variant="ghost"
            className="text-prelinecomirage text-sm md:text-[13.3px] rounded-lg"
          >
            Get a demo
            <img
              className="w-3.5 h-3.5 ml-1.5"
              alt="Arrow right"
              src="/figmaAssets/component-1-44.svg"
            />
          </Button>
        </div>
      </div> */}

      <PricingFAQ sideBySide={true} />
    </section>
  );
};
