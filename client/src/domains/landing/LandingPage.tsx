import React from "react";
import { DashboardSection } from "./components/DashboardSection";
import { FooterSection } from "./components/FooterSection";
import { HeaderSection } from "./components/HeaderSection";

export const LandingPage = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-prelinecowhite">
      <HeaderSection />
      <DashboardSection />
      <FooterSection />
    </div>
  );
};
