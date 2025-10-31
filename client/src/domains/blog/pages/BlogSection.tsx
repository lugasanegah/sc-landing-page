import { HeaderSection } from "@/domains/landing/components/HeaderSection";
import { FooterSection } from "@/domains/landing/components/FooterSection";
import { BlogListPage } from "./BlogListPage";

export const BlogSection = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-prelinecowhite">
      <HeaderSection />
      <BlogListPage />
      <FooterSection />
    </div>
  );
};