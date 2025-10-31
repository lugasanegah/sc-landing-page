import { HeaderSection } from "@/domains/landing/components/HeaderSection";
import { FooterSection } from "@/domains/landing/components/FooterSection";
import FeaturesPage from "./FeaturesPage";

export const FeaturesSection = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-prelinecowhite">
      <HeaderSection />
      <FeaturesPage />
      <FooterSection />
    </div>
  );
};