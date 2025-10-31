import { Badge } from "@/domains/shared/components/ui/badge";

import {FaqContactUs} from "./FaqContactUs"
import FaqAccordion from "./FaqAcordion";








export const FaqSection = () => {






  return (
    <section id="faq" className="w-full py-20 px-4 md:px-8 lg:px-16 bg-white font-manrope">
      <div className="max-w-7xl mx-auto">
        {/* header */}
        <div className=" mb-16">
            {/* <Badge variant="outline" className="text-prelinecoblue-ribbon border-prelinecoblue-ribbon">FAQ</Badge> */}
          <h2 className="text-3xl md:text-2xl font-bold text-prelinecomirage mb-4 mt-6">
           Policies & FAQs
          </h2>
          <p className="text-lg text-prelinecopale-sky max-w-2xl mb-8">
            From Data to Decision in One Click. Here’s how it works.
          </p>      
      </div>
      {/* accordion */}
      <FaqAccordion/>
      <FaqContactUs/>
      </div>
    </section>
  );
};