import { Button } from "@/domains/shared/components/ui/button";

export const FaqContactUs = () => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-6 py-10  rounded-2xl shadow-sm bg-blue-600 bg-opacity-5 border border-blue-600 mt-6 font-manrope">
      {/* Text section */}
      <div className="max-w-xl">
        <h1 className="text-lg font-semibold text-gray-900">
          Have Questions? We're Here to Help!
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Reach out to our support team for any queries or assistance.
        </p>
      </div>

      {/* Button */}
      <a href="/get-demo"
        className={`w-full md:w-auto py-3 px-6 rounded-lg text-sm font-medium text-prelinecomirage text-white border border-gray-200 bg-prelinecoblue-ribbon shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a] hover:bg-prelinecowhite hover:text-prelinecoblue-ribbon hover:shadow-none`}
      >
        Contact Us
      </a>
    </div>
  );
};
