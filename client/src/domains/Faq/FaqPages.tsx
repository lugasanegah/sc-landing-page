import { FaqSection } from "./components/FaqSection";
import { HeaderSection } from "@/domains/landing/components/HeaderSection";
import { FooterSection } from "@/domains/landing/components/FooterSection";


export const FaqPage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-prelinecowhite">
      <HeaderSection />
      <FaqSection />
      <FooterSection />
    </div>
  );
};