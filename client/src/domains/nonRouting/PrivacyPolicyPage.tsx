import React from "react";

import { HeaderSection } from "@/domains/landing/components/HeaderSection";
import { FooterSection } from "@/domains/landing/components/FooterSection";
import { PrivacyPolicySection } from "./components/PrivacyPolicySection";

export const PrivacyPolicyPage = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-prelinecowhite">
      <HeaderSection />
     <PrivacyPolicySection/>
      <FooterSection />
    </div>
  );
};