import React, { useMemo, useState } from "react";
import { Button } from "@/domains/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/domains/shared/components/ui/card";
import { Badge } from "@/domains/shared/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/domains/shared/components/ui/tabs";
import { CheckIcon } from "lucide-react";

type RawPlan = {
  _id: string;
  slug: string;
  name: string;
  description: string;
  term: "monthly" | "annually";
  price_usd: number;
  price_idr: number;
  discount: number;
  featureText: string[];
};

type PricingSectionProps = {
  packages: RawPlan[];
  handlePlanAction: (planId: string, name: string) => void;
  billingCycle?: "monthly" | "annually";
  onBillingCycleChange?: (cycle: "monthly" | "annually") => void;
};

type GroupedPlan = {
  name: string;
  description: string;
  monthly?: RawPlan;
  annually?: RawPlan;
  isFree: boolean;
  isPopular: boolean;
};

export const PricingSection = ({ packages, handlePlanAction, billingCycle: controlledCycle, onBillingCycleChange }: PricingSectionProps): JSX.Element => {
  const [uncontrolledCycle, setUncontrolledCycle] = useState<"monthly" | "annually">("annually");
  const billingCycle = controlledCycle ?? uncontrolledCycle;
  const setBillingCycle = (cycle: "monthly" | "annually") => {
    if (onBillingCycleChange) onBillingCycleChange(cycle);
    else setUncontrolledCycle(cycle);
  };

  const groupedPlans: GroupedPlan[] = useMemo(() => {
    const result: Record<string, GroupedPlan> = {};

    packages.forEach((pkg) => {
      const key = pkg.name;
      if (!result[key]) {
        result[key] = {
          name: pkg.name,
          description: pkg.description,
          isFree: pkg.price_usd === 0,
          isPopular: pkg.name.toLowerCase() === "focus",
        };
      }
      result[key][pkg.term] = pkg;
    });

    return Object.values(result).sort((a, b) => {
      const priceA = a.monthly?.price_usd ?? a.annually?.price_usd ?? 0;
      const priceB = b.monthly?.price_usd ?? b.annually?.price_usd ?? 0;
      return priceA - priceB;
    });
  }, [packages]);

  const hasDiscount = (plan: RawPlan, cycle: "monthly" | "annually") => {
    if (plan.discount > 0) { return true };
  }

  const getDiscountedPrice = (plan: RawPlan, cycle: "monthly" | "annually") => {
    const discount = plan.discount;
    return plan.price_usd * (1 - discount / 100);
  };

  const formatPrice = (price: number, size: "big" | "small" = "big") => {
    const [whole, cents] = price.toFixed(2).split(".");
    return (
      <span className="inline-flex items-baseline">
        <span className={size === "big" ? "text-4xl font-bold text-prelinecomirage" : "text-lg text-prelinecomirage"}>
          {whole}
        </span>
        <span className="ml-0.5 text-sm text-gray-400">,{cents}</span>
      </span>
    );
  };

  const handlePlanClick = (planId: string, name: string) => {
    handlePlanAction(planId, name);
  };

  return (
    <section id="pricing" className="w-full py-20 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-prelinecomirage mb-4">
            From Data to Decision, at Any Scale
          </h2>
          <p className="text-lg text-prelinecopale-sky max-w-2xl mx-auto mb-8">
            Your data, your way. Flexible credits for profiles and hashtags in every plan
          </p>

          <Tabs
            value={billingCycle}
            onValueChange={(value) => setBillingCycle(value as "monthly" | "annually")}
            className="w-fit mx-auto"
          >
            <TabsList className="grid w-full grid-cols-2 mt-32">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="annually">Annually</TabsTrigger>
              <img
                src="/new-assets/discount-badge.svg"
                alt="discount badge"
                className="absolute -right-12 top-[-38px] w-16 select-none drop-shadow-lg"
              />
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {groupedPlans.map((plan, index) => {
            const currentPlan = plan[billingCycle];
            if (!currentPlan) return null;

            const { price_usd, featureText, _id, name, description } = currentPlan;
            const discountExists = hasDiscount(currentPlan, billingCycle);
            const discountedPrice = discountExists ? getDiscountedPrice(currentPlan, billingCycle) : price_usd;

            return (
              <Card
                key={index}
                className={`relative ${plan.isPopular ? "border-prelinecoblue-ribbon border-2 shadow-lg" : "border-gray-200"
                  } bg-white hover:shadow-lg transition-all duration-300`}
              >
                {plan.isPopular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-prelinecoblue-ribbon text-white px-4 py-1">
                    — Most popular
                  </Badge>
                )}

                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-xl font-semibold text-prelinecomirage mb-2">
                    {plan.name}
                  </CardTitle>
                  <p className="text-sm text-prelinecopale-sky mb-6">{plan.description}</p>

                  <div className="mb-6">
                    {plan.isFree ? (
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-prelinecomirage">
                          <span className="mr-1">$</span>
                          0
                        </span>
                        <span className="text-prelinecopale-sky ml-2">USD</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        {discountExists && (
                          <div className="flex items-baseline justify-center line-through text-gray-400 text-lg mb-1">
                            <span className="mr-1">$</span>
                            {formatPrice(price_usd, "small")}
                            <span className="ml-1 text-sm">USD</span>
                          </div>
                        )}

                        <div className="flex items-baseline justify-center">
                          <span className="text-lg">$</span>
                          {formatPrice(discountedPrice, "big")}
                          <span className="text-prelinecopale-sky ml-2">USD</span>
                        </div>

                        {!discountExists && (
                          <div className="sr-only">No discount applied</div>
                        )}
                      </div>
                    )}

                    <p className="text-sm text-prelinecopale-sky mt-1">
                      {plan.isFree ? "Free forever" : "/Month"}
                    </p>
                  </div>

                  <Button
                    variant={plan.isPopular ? "default" : "outline"}
                    className={`w-full ${plan.isPopular
                      ? "bg-prelinecoblue-ribbon hover:bg-prelinecoblue-ribbon/90 text-white"
                      : "border-prelinecopale-sky text-prelinecomirage hover:bg-gray-50"
                      }`}
                    onClick={() => handlePlanClick(_id, name)}
                  >
                    {plan.isFree ? "Start Free" : `Get ${plan.name === 'Focus' ? 'Started' : plan.name}`}
                  </Button>
                </CardHeader>

                <CardContent className="pb-6">
                  <ul className="space-y-3">
                    {featureText.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckIcon className="w-4 h-4 text-prelinecomalachite mt-0.5 flex-shrink-0" />
                        <span className="text-prelinecomirage text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
