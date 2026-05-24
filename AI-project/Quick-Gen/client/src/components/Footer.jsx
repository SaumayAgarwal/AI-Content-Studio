import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="relative py-12 px-6 flex flex-col items-center text-center overflow-hidden border-t border-white/[0.08] bg-[#0A0F1E]">

      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-60"></div>

      {/* Glow Background */}
      <div className="absolute w-[300px] h-[300px] bg-yellow-400/10 blur-[120px] rounded-full top-[-100px]"></div>

      {/* Logo */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-3 mb-5 group"
      >
        <div className="w-16 h-16 rounded-[16px] bg-gold-gradient flex items-center justify-center text-white font-black text-xl shadow-lg 
        group-hover:scale-110 transition duration-300 
        shadow-yellow-400/30">
          AI
        </div>

        <span className="text-3xl font-extrabold text-white tracking-tight">
          Content Studio
        </span>
      </button>

      {/* Tagline */}
      <p className="text-slate text-sm max-w-md mb-4">
        Create. Edit. Innovate — All in one AI-powered platform.
      </p>

      {/* Made in India */}
      <p className="text-yellow-400 font-semibold mb-6 tracking-wide">
        Made with ♥ in India
      </p>

      {/* Social Icons */}
      <div className="flex gap-6 text-white text-lg mb-6">
        {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, i) => (
          <a
            key={i}
            href="#"
            className="p-3 rounded-full bg-white/5 backdrop-blur-md 
            hover:bg-yellow-400 hover:text-black 
            transition-all duration-300 transform hover:-translate-y-1 hover:scale-110"
          >
            <Icon />
          </a>
        ))}
      </div>

      {/* Divider */}
      <div className="w-full max-w-[400px] h-[1px] bg-white/10 mb-4"></div>

      {/* Copyright */}
      <p className="text-slate text-xs opacity-80">
        © {new Date().getFullYear()} AI Content Studio. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;