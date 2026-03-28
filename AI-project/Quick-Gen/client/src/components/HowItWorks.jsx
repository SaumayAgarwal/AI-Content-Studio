import React from "react";

const steps = [
  {
    num: "01",
    title: "Choose Your Tool",
    desc: "Select from writing, image generation, or editing tools — all in one unified dashboard.",
  },
  {
    num: "02",
    title: "Describe Your Goal",
    desc: "Enter a prompt, upload a file, or describe what you need in plain language. No technical jargon.",
  },
  {
    num: "03",
    title: "AI Generates Results",
    desc: "Our advanced models process your request and produce high-quality output in seconds.",
  },
  {
    num: "04",
    title: "Refine & Export",
    desc: "Edit, regenerate, or export your content in multiple formats ready for use anywhere.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how" className="py-24 px-6 sm:px-16 xl:px-32 relative" style={{ background: "#0A0F1E" }}>
      <div className="max-w-[1200px] mx-auto grid gap-20 items-center"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>

        {/* Left — Steps */}
        <div className="reveal">
          <div className="inline-flex items-center gap-2 text-gold text-[0.75rem] font-semibold uppercase tracking-[3px] mb-4 section-tag-line">
            How It Works
          </div>
          <h2 className="font-display font-bold text-white mb-4"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.15, letterSpacing: "-0.5px" }}>
            From Idea to{" "}
            <em className="not-italic italic text-goldLight">Output</em> in Minutes
          </h2>
          <p className="text-slate text-[1.05rem] leading-[1.75] font-light mb-10 max-w-[520px]">
            Our streamlined workflow gets you results without the complexity. No technical skill required.
          </p>

          <div className="flex flex-col">
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex gap-6 py-7 border-b border-white/[0.07] last:border-0 first:pt-0 group cursor-default
                  transition-all duration-300"
              >
                <div
                  className="w-[42px] h-[42px] shrink-0 rounded-xl flex items-center justify-center font-display text-[1rem] font-bold text-gold
                    border border-white/[0.07] transition-all duration-300 group-hover:bg-gold group-hover:text-white group-hover:border-gold"
                >
                  {step.num}
                </div>
                <div>
                  <h4 className="font-display text-[1.05rem] font-semibold text-white mb-1.5">{step.title}</h4>
                  <p className="text-slate text-[0.88rem] leading-[1.65]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Dashboard Mockup */}
        <div
          className="reveal rounded-[20px] overflow-hidden shadow-dark-xl"
          style={{
            background: "#1C2535",
            border: "1px solid rgba(255,255,255,0.07)",
            transitionDelay: "0.2s",
          }}
        >
          {/* Mock header */}
          <div
            className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.07]"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            <span className="ml-2 text-[0.75rem] text-slate">AI Content Studio — Dashboard</span>
          </div>

          {/* Mock body */}
          <div className="p-5 flex flex-col gap-3">
            {/* Stats row */}
            <div className="flex gap-3">
              {[
                { label: "Articles Created", val: "247 this month", pct: "78%" },
                { label: "Images Generated", val: "89 this month", pct: "45%" },
              ].map(({ label, val, pct }) => (
                <div
                  key={label}
                  className="flex-1 rounded-xl p-3.5 text-[0.78rem] text-slate"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <strong className="block text-white text-[0.85rem] mb-1">{label}</strong>
                  {val}
                  <div className="h-1.5 rounded-full mt-2 overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
                    <div
                      className="h-full rounded-full animate-bar-grow"
                      style={{ width: pct, background: "linear-gradient(90deg, #C9973A, #E8B65A)" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Typing indicator */}
            <div
              className="rounded-xl p-3 font-mono text-[0.78rem] text-slateLight leading-[1.6]"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <span className="text-goldLight">✦</span> Writing blog post: "Top 10 AI Tools for 2025..."<br />
              <span className="text-slate">→ Introduction complete. Writing section 2...</span><br />
              <span className="mock-cursor" />
            </div>

            {/* Image placeholder */}
            <div
              className="h-[90px] rounded-xl flex items-center justify-center gap-1.5 text-[0.78rem] text-slate"
              style={{
                background: "linear-gradient(135deg, rgba(201,151,58,0.1), rgba(59,139,212,0.1))",
                border: "1px dashed rgba(201,151,58,0.2)",
              }}
            >
              <span className="text-lg">🖼️</span> Image being generated...
            </div>

            {/* Resume score */}
            <div
              className="flex-1 rounded-xl p-3.5 text-[0.78rem] text-slate"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <strong className="text-white text-[0.85rem]">Resume Score</strong>{" "}
              <span className="text-goldLight text-[1.1rem] font-bold font-display">87/100</span>{" "}
              — Strong match for Product Manager roles
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
