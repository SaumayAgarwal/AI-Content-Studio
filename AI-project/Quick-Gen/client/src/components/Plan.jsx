import React from "react";
import { PricingTable } from "@clerk/clerk-react";

const plans = [
  {
    name: "Starter",
    price: "₹0",
    period: "/mo",
    desc: "Perfect for trying out AI Content Studio.",
    features: [
      "5 articles per month",
      "10 image generations",
      "5 background removals",
      "1 resume review",
      "Basic export formats",
    ],
    featured: false,
    cta: "Get Started Free",
    ctaStyle: "outline",
  },
  {
    name: "Premium",
    price: "₹999",
    period: "/mo",
    desc: "For creators and professionals who create daily.",
    features: [
      "Unlimited articles & blogs",
      "200 image generations/mo",
      "Unlimited background removal",
      "Unlimited object removal",
      "10 resume reviews/mo",
      "Priority AI processing",
      "All export formats",
    ],
    featured: true,
    cta: "Start Premium Trial →",
    ctaStyle: "gold",
  },
];

const Plan = () => {
  const handleUpgrade = (planName) => {
    if (planName === "Starter") return;

    // Direct Stripe Checkout Redirection
    // REPLACE the URL below with your actual Stripe Payment Link
    const STRIPE_LINK = "https://buy.stripe.com/test_placeholder";
    
    window.open(STRIPE_LINK, "_blank");
  };

  return (
    <section id="pricing" className="py-24 px-6 sm:px-16 xl:px-32 relative overflow-hidden bg-background">
      {/* Background blob */}
      <div className="absolute top-10 pointer-events-none opacity-50 left-[33%] w-[500px] h-[500px] bg-gold-soft-orb blur-[80px] rounded-full z-0" />

      {/* Header */}
      <div className="text-center mb-14 reveal relative z-10">
        <div className="inline-flex items-center justify-center gap-2 text-gold text-[0.75rem] font-semibold uppercase tracking-[3px] mb-4">
          Pricing
        </div>
        <h2 className="font-display font-bold text-foreground mb-4 text-pricing-headline leading-[1.15] tracking-[-0.5px]">
          Simple,{" "}
          <em className="not-italic italic text-gold-light">Transparent</em> Pricing
        </h2>
        <p className="text-slate text-[1.05rem] leading-[1.75] font-light max-w-[520px] mx-auto">
          No hidden fees. Choose the plan that fits your creative output.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-[800px] mx-auto relative z-10">
        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
        >
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`reveal rounded-[20px] p-9 relative transition-all duration-300
                ${plan.featured 
                  ? 'bg-[linear-gradient(145deg,rgba(201,151,58,0.1),rgba(201,151,58,0.04))] border-gold/40 scale-[1.03]' 
                  : 'bg-card-bg border-border scale-100'} 
                border`}
            >
              {/* Popular badge */}
              {plan.featured && (
                <div className="absolute text-white text-[0.72rem] font-semibold tracking-widest uppercase px-4 py-1 rounded-full top-[-12px] left-1/2 -translate-x-1/2 bg-gold-gradient">
                  Most Popular
                </div>
              )}

              {/* Plan name */}
              <p className="text-[0.8rem] font-semibold uppercase tracking-[2px] text-gold mb-2">{plan.name}</p>

              {/* Price */}
              <div className="font-display text-[3rem] font-bold text-foreground leading-none mb-1 flex items-start">
                <span className="text-[1.4rem] text-gold mt-2 mr-0.5">₹</span>
                <span>{plan.price.replace(/[^0-9]/g, "") || "0"}</span>
                <span className="text-[0.9rem] text-slate font-sans self-end mb-1 ml-0.5">{plan.period}</span>
              </div>

              {/* Desc */}
              <p className="text-slate text-[0.85rem] mb-7 mt-2">{plan.desc}</p>

              <hr className="border-border mb-6" />

              {/* Features */}
              <ul className="flex flex-col gap-3 mb-8">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-2.5 text-[0.88rem] text-slate">
                    <span className="text-gold font-bold text-[0.8rem] mt-0.5 shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => handleUpgrade(plan.name)}
                className={`w-full py-3 rounded-[10px] font-semibold text-[0.9rem] cursor-pointer transition-all duration-200
                  ${plan.ctaStyle === 'gold' 
                    ? 'bg-gold-gradient text-white border-none hover:opacity-90 hover:shadow-gold-sm' 
                    : 'bg-transparent text-foreground border border-border hover:border-gold hover:text-gold'}
                `}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Clerk pricing table (hidden behind custom UI, but can be toggled) */}
        <div className="mt-14 glass-card p-6 sm:p-10 border border-white/10 rounded-2xl hidden">
          <PricingTable />
        </div>
      </div>
    </section>
  );
};

export default Plan;
