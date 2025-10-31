import React, { useMemo, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { PricingSection } from "./components/PricingSection";
import { HeaderSection } from "@/domains/landing/components/HeaderSection";
import { FooterSection } from "@/domains/landing/components/FooterSection";
import PriceDetails from "./components/PriceDetails";
import PricingFAQ from "./components/PricingFAQ";
// useMemo already imported above
import PricingDetails from "./components/PricingDetails";

// ✅ Custom hook to parse query params
const useQueryParams = () => {
  return useMemo(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return Object.fromEntries(searchParams.entries());
  }, []);
};

export const PricingPage = (): JSX.Element => {
  const { data: packageData } = useQuery<any>({
    queryKey: ['/api/packages'],
  });

  const { sid } = useQueryParams();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("annually");

  const handlePlanAction = async (planId: string, name: string) => {
    if (sid) {
      console.log("Subscribing via API for sid:", sid, "and planId:", planId);
      // your API call here
      try {
        const response = await fetch(`${import.meta.env.VITE_SOCIALCRAB_APP_API_URL}/v1/subscribe/direct-sid`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sid, package_id: planId }),
        });

        if (!response.ok) {
          throw new Error("Subscription API error");
        }

        const data = await response.json();
        if (data.redirectUrl || data.subscription.actions[0].url) {
          const redirectUrl = data.redirectUrl ? data.redirectUrl : data.subscription.actions[0].url
          window.location.href = redirectUrl;
        } else {
          console.error("No redirect URL found in subscription actions.");
        }

      } catch (error) {
        console.error("Error subscribing:", error);
      }
    } else {
      window.open(`${import.meta.env.VITE_SOCIALCRAB_APP_URL}/auth/login?packageId=${planId}&redirectFrom=pricing`, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-prelinecowhite">
      <HeaderSection />
      {
        packageData?.data &&
        <PricingSection 
          packages={packageData.data} 
          handlePlanAction={handlePlanAction}
          billingCycle={billingCycle}
          onBillingCycleChange={setBillingCycle}
        />
      }
      <PricingDetails packages={packageData?.data} billingCycle={billingCycle} />

      <PricingFAQ />
      <FooterSection />
    </div>
  );
};
