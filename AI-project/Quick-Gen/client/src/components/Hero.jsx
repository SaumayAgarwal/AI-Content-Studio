import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";

const Hero = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleStart = () => {
    if (isSignedIn) navigate("/ai");
    else openSignIn();
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center px-6 sm:px-16 xl:px-32 pt-[120px] pb-20 overflow-hidden bg-background"
    >
      {/* Animated orbs */}
      <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none animate-orb-float opacity-30 bg-gold-orb blur-[80px] -top-[100px] right-[5%]" />
      <div className="absolute w-[400px] h-[400px] rounded-full pointer-events-none animate-orb-float-delayed opacity-20 bg-blue-orb blur-[80px] bottom-0 left-[10%]" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-[700px]">
        {/* Headline */}
        <h1 className="font-display font-black text-foreground leading-[1.1] tracking-[-1.5px] mb-6 text-hero-headline animate-slide-up-1">
          One Platform for{" "}
          <em className="not-italic text-gradient">
            All Your
          </em>{" "}
          Content Needs
        </h1>

        {/* Description */}
        <p className="text-slate font-light leading-[1.75] mb-10 max-w-[540px] text-[1.15rem] animate-slide-up-2">
          Write articles, generate blogs, create images, remove backgrounds and objects, review resumes — all powered by advanced AI in a single professional workspace.
        </p>

        {/* Actions */}
        <div className="flex items-center gap-4 flex-wrap animate-slide-up-3">
          <button
            onClick={handleStart}
            className="px-8 py-3.5 rounded-[10px] bg-gold-gradient text-white text-[0.95rem] font-semibold
              hover:opacity-90 hover:-translate-y-0.5 hover:shadow-gold-sm transition-all duration-200 cursor-pointer"
          >
            Start Creating Free
          </button>
          <a
            href="#tools"
            className="px-8 py-3.5 rounded-[10px] border border-border bg-transparent text-slate text-[0.95rem] font-semibold
              hover:border-gold hover:text-gold transition-all duration-200 no-underline"
          >
            Explore Tools →
          </a>
        </div>

        {/* Note */}
        <p className="text-slate text-[0.78rem] mt-5 animate-slide-up-4">
          No credit card required ·{" "}
          <span className="text-gold-light">6 AI tools</span> in one platform · Free plan available
        </p>
      </div>

      {/* Stats Cards (right side, hidden on mobile) */}
      <div className="absolute right-[5%] hidden lg:flex flex-col gap-4 z-10 top-1/2 -translate-y-1/2 animate-fade-right">
        {[
          { num: "50K+", label: "Active Users", delay: "animate-slide-left-1" },
          { num: "2M+", label: "Contents Created", delay: "animate-slide-left-2" },
          { num: "4.9★", label: "User Rating", delay: "animate-slide-left-3" },
          { num: "6", label: "AI Tools", delay: "animate-slide-left-4" },
        ].map(({ num, label, delay }, i) => (
          <div
            key={label}
            className={`text-center rounded-2xl px-6 py-[18px] backdrop-blur-md transition-all duration-500
              hover:border-gold/30 hover:-translate-x-2 cursor-default group bg-card-bg border border-border ${delay}`}
          >
            <span className="block font-display text-[1.9rem] font-bold text-gold-light group-hover:scale-110 transition-transform duration-300">{num}</span>
            <span className="text-slate text-[0.76rem] uppercase tracking-widest mt-0.5 block">{label}</span>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Hero;
