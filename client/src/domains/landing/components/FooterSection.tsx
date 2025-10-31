import React from "react";
import { FaXTwitter, FaInstagram, FaLinkedin, FaTelegram } from "react-icons/fa6"; 
import { FaUsers } from "react-icons/fa"; // for LinkedIn Group

export const FooterSection = (): JSX.Element => {
  const companyLinks = [
    { text: "About Us", href: "#" },
    { text: "Pricing", href: "/pricing" },
    { text: "Blog", href: "#" },
  ];

  const resourcesLinks = [
    // { text: "Case Studies", href: "#" },
    { text: "Whitepaper", href: "https://docs.socialcrab.id/docs/intro" },
    { text: "Flywheel", href: "https://docs.socialcrab.id/flywheel" },
    { text: "Dexscreener", href: "https://dexscreener.com/solana/giucvm1ftguznzr8whabyoaeakxhp1cbhktm6pvswqkq" },
    {text:"coingecko", href:"https://www.coingecko.com/en/coins/socialcrab"}
  ];

  const helpLinks = [
    { text: "FAQs", href: "/faq" },
    { text: "Privacy & Policy", href: "/faq?pages=privacy_policy" },
    { text: "Terms of Service", href: "/faq?pages=tos" },
  ];

  const connectLinks = [
    { text: "Twitter / X", href: "https://x.com/socialcrabdotid", icon: <FaXTwitter className="w-4 h-4" /> },
    { text: "Instagram", href: "https://www.instagram.com/socialcrabdotid/", icon: <FaInstagram className="w-4 h-4" /> },
    { text: "LinkedIn", href: "https://www.linkedin.com/company/socialcrab/", icon: <FaLinkedin className="w-4 h-4" /> },
    { text: "LinkedIn Group", href: "https://www.linkedin.com/groups/10401752/", icon: <FaUsers className="w-4 h-4" /> },
    // { text: "Telegram", href: "#", icon: <FaTelegram className="w-4 h-4" /> },
  ];

  return (
    <footer className="w-full py-16 px-6 md:px-10 lg:px-16 bg-neutral-50 relative">
      <div className="max-w-7xl mx-auto flex flex-col h-full">
        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 text-center lg:text-left">
          {/* Company */}
          <div className="flex flex-col gap-3">
            <h3 className="text-prelinecomirage text-sm font-semibold uppercase tracking-wide">Company</h3>
            <nav className="flex flex-col">
              {companyLinks.map((link, index) => (
                <a
                  key={`company-${index}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-prelinecopale-sky text-sm py-1 hover:underline"
                >
                  {link.text}
                </a>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-3">
            <h3 className="text-prelinecomirage text-sm font-semibold uppercase tracking-wide">Explore $SCRB</h3>
            <nav className="flex flex-col">
              {resourcesLinks.map((link, index) => (
                <a
                  key={`resource-${index}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-prelinecopale-sky text-sm py-1 hover:underline"
                >
                  {link.text}
                </a>
              ))}
            </nav>
          </div>

          {/* Help */}
          <div className="flex flex-col gap-3">
            <h3 className="text-prelinecomirage text-sm font-semibold uppercase tracking-wide">Policies & FAQs</h3>
            <nav className="flex flex-col">
              {helpLinks.map((link, index) => (
                <a
                  key={`help-${index}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-prelinecopale-sky text-sm py-1 hover:underline"
                >
                  {link.text}
                </a>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-3">
            <h3 className="text-prelinecomirage text-sm font-semibold uppercase tracking-wide">Connect</h3>
            <nav className="flex flex-col">
              {connectLinks.map((link, index) => (
                <a
                  key={`connect-${index}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center lg:justify-start gap-2 text-prelinecopale-sky text-sm py-1 hover:underline"
                >
                  {link.icon} {link.text}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex justify-center items-center">
          <div className="text-prelinecopale-sky text-xs text-center">
            © 2025 Socialcrab. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
