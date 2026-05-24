import React from "react";
import { PricingTable } from "@clerk/clerk-react";

const Plan = () => {
  return (
    <section
      id="pricing"
      className="py-24 px-6 sm:px-16 xl:px-32 relative overflow-hidden bg-background"
    >
      {/* Background blob */}
      <div className="absolute top-10 pointer-events-none opacity-50 left-[33%] w-[500px] h-[500px] bg-gold-soft-orb blur-[80px] rounded-full z-0" />

      {/* Header */}
      <div className="text-center mb-14 reveal relative z-10">
        <div className="inline-flex items-center justify-center gap-2 text-gold text-[0.75rem] font-semibold uppercase tracking-[3px] mb-4">
          Pricing
        </div>
        <h2 className="font-display font-bold text-foreground mb-4 text-pricing-headline leading-[1.15] tracking-[-0.5px]">
          Simple, <em className="not-italic text-goldLight">Transparent</em> Pricing
        </h2>
        <p className="text-slate text-[1.05rem] leading-[1.75] font-light max-w-[520px] mx-auto">
          No hidden fees. Choose the plan that fits your creative output.
        </p>
      </div>

      {/* Clerk Pricing Table */}
      <div className="max-w-[800px] mx-auto relative z-10">
  <div className="mt-6">
    <PricingTable
      appearance={{
        variables: {
          colorPrimary: "#E6B24A",        // gold accent (like screenshot)
          colorBackground: "#0A0F1E",     // dark background
          colorText: "#FFFFFF",           // main text
          colorTextSecondary: "#9CA3AF",  // subtle text
          borderRadius: "20px",
        },
        elements: {
          card: `
            rounded-[20px] p-9 
            bg-[#111827]/80 backdrop-blur-xl 
            border border-white/10 
            shadow-[0_0_40px_rgba(230,178,74,0.08)]
            transition-all duration-300
            hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(230,178,74,0.15)]
          `,

          ctaButton: `
            w-full py-3 font-semibold text-[0.9rem] 
            bg-gradient-to-r from-[#E6B24A] to-[#F4C96B] 
            text-black rounded-lg
            hover:opacity-90 transition-all duration-300
          `,

          price: "text-white text-3xl font-bold",
          period: "text-[#9CA3AF]",
          features: "text-[#D1D5DB]",
        },
      }}
    />
  </div>
</div>
    </section>
  );
};

export default Plan;