import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";

const CtaBanner = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const handleStart = () => {
    if (isSignedIn) navigate("/ai");
    else openSignIn();
  };

  return (
    <section className="py-20 px-6 sm:px-16 xl:px-32" style={{ background: "#111827" }}>
      <div
        className="reveal max-w-[900px] mx-auto rounded-3xl px-10 sm:px-16 py-16 text-center relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(201,151,58,0.12) 0%, rgba(201,151,58,0.04) 100%)",
          border: "1px solid rgba(201,151,58,0.25)",
        }}
      >
        {/* Decorative orb */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            top: -60, right: -60,
            width: 250, height: 250,
            background: "radial-gradient(circle, rgba(201,151,58,0.15), transparent 70%)",
          }}
        />

        <div className="inline-flex items-center justify-center gap-2 text-gold text-[0.75rem] font-semibold uppercase tracking-[3px] mb-5">
          Get Started
        </div>

        <h2
          className="font-display font-bold text-white mb-4 relative z-10"
          style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.15, letterSpacing: "-0.5px" }}
        >
          Ready to{" "}
          <em className="not-italic italic text-goldLight">Transform</em> Your Creative Process?
        </h2>

        <p className="text-slate text-[1.05rem] leading-[1.75] font-light max-w-[520px] mx-auto mb-9 relative z-10">
          Join 50,000+ professionals using AI Content Studio to write, design, and create faster than ever before.
        </p>

        <div className="flex justify-center gap-3.5 flex-wrap relative z-10">
          <button
            onClick={handleStart}
            className="px-8 py-3.5 rounded-[10px] bg-gold-gradient text-white text-[0.95rem] font-semibold
              hover:opacity-90 hover:-translate-y-0.5 hover:shadow-gold-sm transition-all duration-200 cursor-pointer"
          >
            Create Free Account
          </button>
          <a
            href="#tools"
            className="px-8 py-3.5 rounded-[10px] border border-white/[0.07] bg-transparent text-slateLight text-[0.95rem] font-semibold
              hover:border-gold hover:text-gold transition-all duration-200 no-underline"
          >
            View Demo →
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
