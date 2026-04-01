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
    <section id="tools" className="py-24 px-6 sm:px-16 xl:px-32 bg-navy2 transition-colors duration-300">
      {/* Section Header */}
      <div className="text-center mb-16 reveal">
        <div className="inline-flex items-center gap-2 text-gold text-[0.75rem] font-semibold uppercase tracking-[3px] mb-4 justify-center">
          Our Tools
        </div>
        <h2 className="font-display font-bold text-foreground mb-4 text-pricing-headline leading-[1.15] tracking-[-0.5px]">
          Everything You Need to{" "}
          <em className="not-italic italic text-gold-light">Create &amp; Edit</em>
        </h2>
        <p className="text-slate max-w-lg mx-auto text-[1.05rem] leading-[1.75] font-light">
          Six powerful AI tools, one seamless platform. No switching apps, no subscriptions for each tool.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid gap-5 max-w-[1200px] mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            className={`reveal relative rounded-2xl p-8 cursor-pointer overflow-hidden transition-all duration-[300ms]
              hover:-translate-y-2 hover:shadow-gold-sm group bg-card-bg border border-border hover:border-gold
              ${index === 0 ? 'delay-[0s]' : index === 1 ? 'delay-[100ms]' : index === 2 ? 'delay-[200ms]' : index === 3 ? 'delay-[300ms]' : index === 4 ? 'delay-[400ms]' : 'delay-[500ms]'}`}
            onClick={() => handleToolClick(tool.path)}
          >
            {/* Icon */}
            <div
              className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center text-[22px] mb-5 relative z-10 transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: iconColors[index].bg, color: iconColors[index].color }}
            >
              <tool.Icon className="w-6 h-6" />
            </div>

            {/* Title */}
            <h3 className="font-display text-[1.2rem] font-semibold text-foreground mb-2.5 relative z-10">
              {tool.title}
            </h3>

            {/* Description */}
            <p className="text-slate text-[0.9rem] leading-[1.65] relative z-10">
              {tool.description}
            </p>

            {/* Tag */}
            <span
              className="inline-block mt-4 px-3 py-1 rounded-full text-[0.72rem] font-semibold tracking-[0.5px] relative z-10"
              style={{ backgroundColor: tagColors[index].bg, color: tagColors[index].color }}
            >
              {tagLabels[index]}
            </span>
            {/* Note: Kept specific colors in style for complex opacity mapping, 
                but using 'backgroundColor' for better React compatibility. */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AiTools;
