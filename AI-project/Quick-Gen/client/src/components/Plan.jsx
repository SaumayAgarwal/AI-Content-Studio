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
  return (
    <section id="pricing" className="py-24 px-6 sm:px-16 xl:px-32 relative overflow-hidden" style={{ background: "#0A0F1E" }}>
      {/* Background blob */}
      <div
        className="absolute top-10 pointer-events-none"
        style={{
          left: "33%",
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(201,151,58,0.08), transparent 70%)",
          filter: "blur(80px)",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />

      {/* Header */}
      <div className="text-center mb-14 reveal relative z-10">
        <div className="inline-flex items-center justify-center gap-2 text-gold text-[0.75rem] font-semibold uppercase tracking-[3px] mb-4">
          Pricing
        </div>
        <h2
          className="font-display font-bold text-white mb-4"
          style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.15, letterSpacing: "-0.5px" }}
        >
          Simple,{" "}
          <em className="not-italic italic text-goldLight">Transparent</em> Pricing
        </h2>
        <p className="text-slate text-[1.05rem] leading-[1.75] font-light max-w-[520px] mx-auto">
          No hidden fees. Choose the plan that fits your creative output.
        </p>
      </div>

      {/* Clerk Pricing Table wrapped in styled cards */}
      <div className="max-w-[800px] mx-auto relative z-10">
        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
        >
          {plans.map((plan, i) => (
            <div
              key={i}
              className="reveal rounded-[20px] p-9 relative transition-all duration-300"
              style={{
                background: plan.featured
                  ? "linear-gradient(145deg, rgba(201,151,58,0.1), rgba(201,151,58,0.04))"
                  : "rgba(255,255,255,0.03)",
                border: plan.featured
                  ? "1px solid rgba(201,151,58,0.4)"
                  : "1px solid rgba(255,255,255,0.07)",
                transform: plan.featured ? "scale(1.03)" : "scale(1)",
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              {/* Popular badge */}
              {plan.featured && (
                <div
                  className="absolute text-white text-[0.72rem] font-semibold tracking-widest uppercase px-4 py-1 rounded-full"
                  style={{
                    top: -12, left: "50%", transform: "translateX(-50%)",
                    background: "linear-gradient(135deg, #C9973A, #A07420)",
                  }}
                >
                  Most Popular
                </div>
              )}

              {/* Plan name */}
              <p className="text-[0.8rem] font-semibold uppercase tracking-[2px] text-gold mb-2">{plan.name}</p>

              {/* Price */}
              <div className="font-display text-[3rem] font-bold text-white leading-none mb-1 flex items-start">
                <span className="text-[1.4rem] text-gold mt-2 mr-0.5">
                  {plan.price.replace(/[0-9,]+/, "")}
                </span>
                <span>{plan.price.replace(/[^0-9,]/g, "")}</span>
                <span className="text-[0.9rem] text-slate font-sans self-end mb-1 ml-0.5">{plan.period}</span>
              </div>

              {/* Desc */}
              <p className="text-slate text-[0.85rem] mb-7 mt-2">{plan.desc}</p>

              <hr className="border-white/[0.07] mb-6" />

              {/* Features */}
              <ul className="flex flex-col gap-3 mb-8">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-2.5 text-[0.88rem] text-slateLight">
                    <span className="text-gold font-bold text-[0.8rem] mt-0.5 shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className="w-full py-3 rounded-[10px] font-semibold text-[0.9rem] cursor-pointer transition-all duration-200"
                style={
                  plan.ctaStyle === "gold"
                    ? { background: "linear-gradient(135deg,#C9973A,#A07420)", color: "#fff", border: "none" }
                    : { background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.07)" }
                }
                onMouseEnter={(e) => {
                  if (plan.ctaStyle !== "gold") {
                    e.currentTarget.style.borderColor = "#C9973A";
                    e.currentTarget.style.color = "#C9973A";
                  } else {
                    e.currentTarget.style.opacity = "0.9";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(201,151,58,0.35)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (plan.ctaStyle !== "gold") {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.color = "#fff";
                  } else {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
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
