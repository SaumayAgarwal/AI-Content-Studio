import React from "react";
import { PricingTable } from "@clerk/clerk-react";

const Plan = () => {
  return (
    <div className="min-h-screen px-6 sm:px-16 lg:px-24 py-24 bg-gradient-to-b from-white to-gray-100">

      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto">

        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800">
          Choose Your{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Plan
          </span>
        </h2>

        <p className="mt-4 text-gray-600 text-sm sm:text-base">
          Start for free and upgrade anytime as your needs grow. 
          Powerful AI tools designed for creators and teams.
        </p>

      </div>

      {/* Pricing Section */}
      <div className="mt-16 max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-10 border border-gray-200">

        <PricingTable />

      </div>

    </div>
  );
};

export default Plan;
