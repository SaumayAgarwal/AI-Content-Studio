import React, { useEffect } from "react";
import { AiToolsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";

const iconColors = [
  { bg: "rgba(201,151,58,0.15)", color: "#E8B65A" },
  { bg: "rgba(59,139,212,0.15)", color: "#85B7EB" },
  { bg: "rgba(29,158,117,0.15)", color: "#5DCAA5" },
  { bg: "rgba(212,83,126,0.15)", color: "#ED93B1" },
  { bg: "rgba(127,119,221,0.15)", color: "#AFA9EC" },
  { bg: "rgba(239,159,39,0.15)", color: "#FAC775" },
];

const tagColors = [
  { bg: "rgba(201,151,58,0.15)", color: "#E8B65A" },
  { bg: "rgba(59,139,212,0.15)", color: "#85B7EB" },
  { bg: "rgba(29,158,117,0.15)", color: "#5DCAA5" },
  { bg: "rgba(212,83,126,0.15)", color: "#ED93B1" },
  { bg: "rgba(127,119,221,0.15)", color: "#AFA9EC" },
  { bg: "rgba(201,151,58,0.15)", color: "#E8B65A" },
];

const tagLabels = ["AI Writing", "Content", "AI Image", "Image Edit", "Image Edit", "Career"];

const AiTools = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleToolClick = (path) => {
    if (user) navigate(path);
    else openSignIn();
  };

  return (
    <section id="tools" className="py-24 px-6 sm:px-16 xl:px-32" style={{ background: "#111827" }}>
      {/* Section Header */}
      <div className="text-center mb-16 reveal">
        <div className="inline-flex items-center gap-2 text-gold text-[0.75rem] font-semibold uppercase tracking-[3px] mb-4 justify-center">
          Our Tools
        </div>
        <h2 className="font-display font-bold text-white mb-4"
          style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.15, letterSpacing: "-0.5px" }}>
          Everything You Need to{" "}
          <em className="not-italic italic text-goldLight">Create &amp; Edit</em>
        </h2>
        <p className="text-slate max-w-lg mx-auto text-[1.05rem] leading-[1.75] font-light">
          Six powerful AI tools, one seamless platform. No switching apps, no subscriptions for each tool.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid gap-5 max-w-[1200px] mx-auto"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            className="reveal relative rounded-2xl p-8 cursor-pointer overflow-hidden transition-all duration-[350ms]
              hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              transitionDelay: `${index * 0.04}s`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(201,151,58,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
            }}
            onClick={() => handleToolClick(tool.path)}
          >
            {/* Hover gradient overlay */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-[350ms] pointer-events-none
                group-hover:opacity-100"
              style={{ background: "linear-gradient(135deg, rgba(201,151,58,0.06), transparent)" }}
            />

            {/* Icon */}
            <div
              className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center text-[22px] mb-5 relative z-10"
              style={{ background: iconColors[index].bg, color: iconColors[index].color }}
            >
              <tool.Icon className="w-6 h-6" />
            </div>

            {/* Title */}
            <h3 className="font-display text-[1.2rem] font-semibold text-white mb-2.5 relative z-10">
              {tool.title}
            </h3>

            {/* Description */}
            <p className="text-slate text-[0.9rem] leading-[1.65] relative z-10">
              {tool.description}
            </p>

            {/* Tag */}
            <span
              className="inline-block mt-4 px-3 py-1 rounded-full text-[0.72rem] font-semibold tracking-[0.5px] relative z-10"
              style={{ background: tagColors[index].bg, color: tagColors[index].color }}
            >
              {tagLabels[index]}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AiTools;
