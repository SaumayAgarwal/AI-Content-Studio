import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";

const Navbar = () => {

  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-[#0B1120] backdrop-blur-lg border-b border-gray-800">

      <div className="flex items-center justify-between px-6 sm:px-16 xl:px-32 py-4">

        {/* Logo */}
        <img
          src={assets.logo}
          alt="logo"
          className="w-36 cursor-pointer transition-transform duration-300 hover:scale-105"
          onClick={() => navigate("/")}
        />

        {/* Menu */}
        <div className="hidden md:flex items-center gap-10 text-gray-300 font-medium">

          <p
            onClick={() => navigate("/")}
            className="cursor-pointer hover:text-white transition"
          >
            Home
          </p>

          <p
            onClick={() => navigate("/ai")}
            className="cursor-pointer hover:text-white transition"
          >
            Tools
          </p>

          <p
            onClick={() => navigate("/pricing")}
            className="cursor-pointer hover:text-white transition"
          >
            Pricing
          </p>

        </div>

        {/* Right Side */}
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <button
            onClick={openSignIn}
            className="group flex items-center gap-2 
            bg-gradient-to-r from-indigo-500 to-purple-600 
            px-6 py-2.5 rounded-full text-white font-semibold
            shadow-lg hover:scale-105 transition-all duration-300"
          >
            Get Started
            <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
          </button>
        )}

      </div>
    </div>
  );
};

export default Navbar;

