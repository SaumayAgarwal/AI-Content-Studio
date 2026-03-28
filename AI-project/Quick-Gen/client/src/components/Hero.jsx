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
      className="relative min-h-screen flex items-center px-6 sm:px-16 xl:px-32 pt-[120px] pb-20 overflow-hidden"
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* Animated orbs */}
      <div
        className="absolute rounded-full pointer-events-none animate-orb-float"
        style={{
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(201,151,58,0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
          top: -100, right: "5%",
          animationDelay: "0s",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none animate-orb-float"
        style={{
          width: 400, height: 400,
          background: "radial-gradient(circle, rgba(59,139,212,0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
          bottom: 0, left: "10%",
          animationDelay: "3s",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none animate-orb-float"
        style={{
          width: 300, height: 300,
          background: "radial-gradient(circle, rgba(201,151,58,0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
          top: "40%", left: "40%",
          animationDelay: "5s",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 max-w-[700px]">


        {/* Headline */}
        <h1
          className="font-display font-black text-white leading-[1.1] tracking-[-1.5px] mb-6"
          style={{
            fontSize: "clamp(2.8rem, 5vw, 4.4rem)",
            animation: "slideUp 0.6s ease 0.1s both",
          }}
        >
          One Platform for{" "}
          <em className="not-italic" style={{ background: "linear-gradient(135deg,#E8B65A,#C9973A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            All Your
          </em>{" "}
          Content Needs
        </h1>

        {/* Description */}
        <p
          className="text-slate font-light leading-[1.75] mb-10 max-w-[540px]"
          style={{
            fontSize: "1.15rem",
            animation: "slideUp 0.6s ease 0.2s both",
          }}
        >
          Write articles, generate blogs, create images, remove backgrounds and objects, review resumes — all powered by advanced AI in a single professional workspace.
        </p>

        {/* Actions */}
        <div
          className="flex items-center gap-4 flex-wrap"
          style={{ animation: "slideUp 0.6s ease 0.3s both" }}
        >
          <button
            onClick={handleStart}
            className="px-8 py-3.5 rounded-[10px] bg-gold-gradient text-white text-[0.95rem] font-semibold
              hover:opacity-90 hover:-translate-y-0.5 hover:shadow-gold-sm transition-all duration-200 cursor-pointer"
          >
            Start Creating Free
          </button>
          <a
            href="#tools"
            className="px-8 py-3.5 rounded-[10px] border border-white/[0.07] bg-transparent text-slateLight text-[0.95rem] font-semibold
              hover:border-gold hover:text-gold transition-all duration-200 no-underline"
          >
            Explore Tools →
          </a>
        </div>

        {/* Note */}
        <p
          className="text-slate text-[0.78rem] mt-5"
          style={{ animation: "slideUp 0.6s ease 0.4s both" }}
        >
          No credit card required ·{" "}
          <span className="text-goldLight">6 AI tools</span> in one platform · Free plan available
        </p>
      </div>

      {/* Stats Cards (right side, hidden on mobile) */}
      <div
        className="absolute right-[5%] hidden lg:flex flex-col gap-4 z-10"
        style={{
          top: "50%",
          transform: "translateY(-50%)",
          animation: "fadeRight 0.8s ease 0.5s both",
        }}
      >
        {[
          { num: "50K+", label: "Active Users" },
          { num: "2M+", label: "Contents Created" },
          { num: "4.9★", label: "User Rating" },
          { num: "6", label: "AI Tools" },
        ].map(({ num, label }) => (
          <div
            key={label}
            className="text-center rounded-2xl px-6 py-[18px] backdrop-blur-md transition-all duration-300
              hover:border-gold/30 hover:-translate-x-1 cursor-default"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <span className="block font-display text-[1.9rem] font-bold text-goldLight">{num}</span>
            <span className="text-slate text-[0.76rem] uppercase tracking-widest mt-0.5 block">{label}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeRight {
          from { opacity: 0; transform: translateY(-50%) translateX(30px); }
          to   { opacity: 1; transform: translateY(-50%) translateX(0); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
