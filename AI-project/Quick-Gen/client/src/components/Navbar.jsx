import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-16 xl:px-32 h-[72px]
        bg-navy/85 backdrop-blur-xl border-b border-white/[0.07] transition-all duration-300
        ${scrolled ? "shadow-[0_4px_30px_rgba(0,0,0,0.4)]" : ""}`}
    >
      {/* Logo */}
      <a
        href="/"
        className="flex items-center gap-2.5 no-underline"
        onClick={(e) => { e.preventDefault(); navigate("/"); }}
      >
        <div className="w-9 h-9 rounded-[10px] bg-gold-gradient flex items-center justify-center text-white font-display font-black text-sm tracking-tighter">
          AI
        </div>
        <span className="font-display font-bold text-[1.25rem] text-white">
          Content Studio
        </span>
      </a>

      {/* Nav Links */}
      <ul className="hidden md:flex items-center gap-8 list-none">
        {[
          { label: "Tools", href: "#tools" },
          { label: "How it Works", href: "#how" },
          { label: "Pricing", href: "#pricing" },
          { label: "Reviews", href: "#testimonials" },
        ].map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="text-slateLight text-[0.9rem] font-normal hover:text-white transition-colors duration-200 no-underline"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* Right CTA */}
      <div className="flex items-center gap-3">
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <>
            <button
              onClick={openSignIn}
              className="px-5 py-2 rounded-lg border border-white/[0.07] bg-transparent text-slateLight text-[0.88rem] font-medium
                hover:border-gold hover:text-gold transition-all duration-200 cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/ai")}
              className="px-5 py-2 rounded-lg bg-gold-gradient text-white text-[0.88rem] font-semibold
                hover:opacity-90 hover:-translate-y-0.5 hover:shadow-gold-sm transition-all duration-200 cursor-pointer"
            >
              Get Started Free
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
