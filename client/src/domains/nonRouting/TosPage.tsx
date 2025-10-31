import React from "react";

import { HeaderSection } from "@/domains/landing/components/HeaderSection";
import { FooterSection } from "@/domains/landing/components/FooterSection";
import { TosSection } from "./components/TosSection";


export const TosPage = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-prelinecowhite">
      <HeaderSection />
     <TosSection/>
      <FooterSection />
    </div>
  );
};