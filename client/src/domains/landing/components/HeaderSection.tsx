import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/domains/shared/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/domains/shared/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/domains/shared/components/ui/sheet";
import { Menu } from "lucide-react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Instagram } from "iconsax-react";
import SearchAnything from "@/domains/shared/components/search/SearchAnything";
import ErrorBoundary from "@/domains/shared/components/search/ErrorBoundary";

export const HeaderSection = (): JSX.Element => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [justFixed, setJustFixed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileReportOpen, setIsMobileReportOpen] = useState(false);

  // dropdown state for Sample Report
  const [isReportOpen, setIsReportOpen] = useState(false);
  const reportTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // app host from env
  const appHost = (import.meta as any).env?.VITE_SOCIALCRAB_APP_URL
    ? String((import.meta as any).env.VITE_SOCIALCRAB_APP_URL).replace(/\/$/, "")
    : "";
  const buildAppUrl = (path: string) => `${appHost}${path}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (reportTimeoutRef.current) clearTimeout(reportTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (isScrolled) {
      setJustFixed(true);
      requestAnimationFrame(() => setJustFixed(false));
    }
  }, [isScrolled]);

  const handleNavClick = (href: string, label: string, e: React.MouseEvent) => {
    e.preventDefault();
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const navItems: { label: string; href: string; hasDropdown?: boolean }[] = [
    { label: "About Us", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Policies & FAQ", href: "/faq" },
  ];

  // login button should always open external app host in a new tab
  const loginUrl = appHost || "/"; // fallback to root if env not set
  const actionButtons = [
    { label: "Sign Up | Login", href: loginUrl, variant: "ghost" },
    {
      label: "Sample Report",
      href: "/files/sample-report.pdf",
      variant: "primary",
      highlighted: true,
    },
  ];

  const openReport = () => {
    if (reportTimeoutRef.current) clearTimeout(reportTimeoutRef.current);
    setIsReportOpen(true);
  };
  const closeReport = () => {
    reportTimeoutRef.current = setTimeout(() => setIsReportOpen(false), 150);
  };

  return (
    <header
      className={`${isScrolled
          ? `fixed top-0 left-0 right-0 ${justFixed ? "-translate-y-4" : "translate-y-0"}
             w-full max-w-[1500px] mx-auto shadow-xl`
          : "relative w-full max-w-[1700px] mx-auto"
        } bg-prelinecowhite z-50 py-4 rounded-xl transition-[transform,box-shadow] duration-300 ease-out`}
    >
      <div className="flex items-center justify-between w-full px-4 md:px-8 gap-4">
        {/* Left side: Logo */}
        <div className="flex items-center">
          <a
            href="/"
            className="flex items-center gap-1 h-12 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <div className="relative h-12 flex items-center">
              <img
                className="w-[28px] h-[28px] mr-1"
                alt="Logo"
                src="/figmaAssets/logo.svg"
              />
              <img
                className="w-[136px] h-[20px]"
                alt="Socialcrab"
                src="/figmaAssets/socialcrab.svg"
              />
            </div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu className="bg-prelinecowhite relative">
            <NavigationMenuList className="flex items-start gap-1 overflow-x-auto">
              {navItems.map((item, index) =>
                item.hasDropdown ? (
                  <NavigationMenuItem key={index} className="flex-shrink-0 relative">
                    <NavigationMenuTrigger className="px-2.5 py-2 text-prelinecomirage text-[13.2px] font-normal data-[state=open]:bg-gray-100">
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="absolute top-full left-0 mt-1 z-50 min-w-[200px] overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg animate-in fade-in-0 zoom-in-95">
                      <div className="p-4">
                        <ul className="space-y-3">
                          <li>
                            <NavigationMenuLink
                              href="#"
                              className="block px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-100 transition-colors"
                            >
                              Customer Stories
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink
                              href="#"
                              className="block px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-100 transition-colors"
                            >
                              Testimonials
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={index} className="flex-shrink-0">
                    <NavigationMenuLink
                      href={item.href}
                      onClick={(e) => handleNavClick(item.href, item.label, e)}
                      className="inline-flex items-center px-2.5 py-2 rounded-lg text-prelinecomirage text-[13.2px] font-normal leading-5 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Search Input */}
        <div className="hidden md:block flex-1 max-w-xs">
          <ErrorBoundary>
            <SearchAnything
              placeholder="Enter Instagram Profile or Hashtag"
              maxResults={10}
            />
          </ErrorBoundary>
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-1">
          {actionButtons
            .filter((button) => button.label !== "Sample Report")
            .map((button, index) => (
              <Button
                key={index}
                variant={button.highlighted ? "default" : "ghost"}
                className={`px-2.5 py-2 rounded-lg text-[13px] font-normal ${button.highlighted
                    ? "bg-prelinecoblue-ribbon text-prelinecowhite shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a]"
                    : "text-prelinecomirage"
                  }`}
                onClick={() =>
                  window.open(button.href, "_blank", "noopener,noreferrer")
                }
              >
                {button.label}
              </Button>
            ))}

          {/* Sample Report Dropdown with hover delay */}
          {/* Links point to app host from env */}
          <div
            className="relative"
            onMouseEnter={openReport}
            onMouseLeave={closeReport}
          >
            <Button
              variant="default"
              className="px-2.5 py-2 rounded-lg text-[13px] font-normal bg-prelinecoblue-ribbon text-prelinecowhite shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a]"
            >
              Sample Report
            </Button>
            {isReportOpen && (
              <div className="absolute right-0 mt-2 w-48 flex-col rounded-md border border-gray-200 bg-white shadow-lg z-50">
                <button
                  onClick={() =>
                    window.open(
                      buildAppUrl("/sample-report/instagram/profile"),
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left flex items-center gap-2"
                >
                  <Instagram size={16} color="currentColor" aria-hidden />
                  Instagram Profile
                </button>
                <button
                  onClick={() =>
                    window.open(
                      buildAppUrl("/sample-report/instagram/hashtag"),
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left flex items-center gap-2"
                >
                  <Instagram size={16} color="currentColor" aria-hidden />
                  Instagram Hashtag
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Burger Menu */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[280px] sm:w-[350px] bg-prelinecowhite"
            >
              <div className="flex flex-col h-full">
                <div className="flex-1 py-6">
                  <nav className="space-y-2">
                    {navItems.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        onClick={(e) => handleNavClick(item.href, item.label, e)}
                        className="block px-4 py-3 text-prelinecomirage text-base font-medium rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                    <div className="space-y-3 px-4 mt-4">
                      {actionButtons
                        .filter((button) => button.label !== "Sample Report")
                        .map((button, index) => (
                          <Button
                            key={index}
                            variant={button.highlighted ? "default" : "ghost"}
                            className={`w-full py-3 rounded-lg text-sm font-medium ${button.highlighted
                                ? "bg-prelinecoblue-ribbon text-prelinecowhite shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a]"
                                : "text-prelinecomirage border border-gray-200"
                              }`}
                            onClick={() => {
                              window.open(
                                button.href,
                                "_blank",
                                "noopener,noreferrer"
                              );
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            {button.label}
                          </Button>
                        ))}
                      {/* Mobile: Sample Report dropdown */}
                      <div className="pt-2">
                        <Button
                          variant="default"
                          className="w-full py-3 rounded-lg text-sm font-medium bg-prelinecoblue-ribbon text-prelinecowhite shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a]"
                          onClick={() => setIsMobileReportOpen((v) => !v)}
                        >
                          Sample Report
                        </Button>
                        {isMobileReportOpen && (
                          <div className="mt-2 space-y-2">
                            <Button
                              variant="ghost"
                              className="w-full py-3 rounded-lg text-sm font-medium text-prelinecomirage border border-gray-200 flex items-center gap-2"
                              onClick={() => {
                                window.open(
                                  buildAppUrl("/sample-report/instagram/profile"),
                                  "_blank",
                                  "noopener,noreferrer"
                                );
                                setIsMobileMenuOpen(false);
                              }}
                            >
                              <Instagram size={18} color="currentColor" aria-hidden />
                              Instagram Profile
                            </Button>
                            <Button
                              variant="ghost"
                              className="w-full py-3 rounded-lg text-sm font-medium text-prelinecomirage border border-gray-200 flex items-center gap-2"
                              onClick={() => {
                                window.open(
                                  buildAppUrl("/sample-report/instagram/hashtag"),
                                  "_blank",
                                  "noopener,noreferrer"
                                );
                                setIsMobileMenuOpen(false);
                              }}
                            >
                              <Instagram size={18} color="currentColor" aria-hidden />
                              Instagram Hashtag
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
