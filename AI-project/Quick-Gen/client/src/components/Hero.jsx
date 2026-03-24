import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, PlayCircle } from "lucide-react";
import { assets } from "../assets/assets";

const Hero = () => {

  const navigate = useNavigate();

  return (
    <div className="px-6 sm:px-20 xl:px-32 relative flex flex-col items-center justify-center min-h-screen text-center bg-[url('/gradientBackground.png')] bg-cover bg-no-repeat">

      {/* Heading */}
      <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold leading-tight max-w-4xl">
        Create Amazing Content <br />
        with{" "}
        <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          AI Tools
        </span>
      </h1>

      {/* Description */}
      <p className="mt-6 text-gray-600 max-w-2xl text-sm sm:text-base">
        Transform your content creation with our suite of premium AI tools.
        Generate articles, images, and ideas instantly and boost your
        productivity.
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-5 mt-10">

        <button
          onClick={() => navigate("/ai")}
          className="flex items-center gap-2 bg-blue-900 text-white px-8 py-3 rounded-full
          shadow-lg hover:bg-blue-800 hover:scale-105 transition-all duration-300"
        >
          Start Creating
          <ArrowRight size={18}/>
        </button>

        <button
          className="flex items-center gap-2 px-8 py-3 rounded-full border border-gray-300
          hover:bg-gray-100 hover:scale-105 transition-all duration-300"
        >
          <PlayCircle size={18}/>
          Watch Demo
        </button>

      </div>

      {/* Users section */}
      <div className="flex items-center gap-4 mt-8 text-gray-600 text-sm">
        <img src={assets.user_group} alt="users" className="h-8"/>
        Sajal ka dick Sabse bdaa hh
      </div>

    </div>
  );
};

export default Hero;
