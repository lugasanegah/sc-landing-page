import { HeaderSection } from "@/domains/landing/components/HeaderSection";
import { FooterSection } from "@/domains/landing/components/FooterSection";
import AboutPage from "./AboutPage";

export const AboutSection = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-prelinecowhite">
      <HeaderSection />
      <AboutPage />
      <FooterSection />
    </div>
  );
};