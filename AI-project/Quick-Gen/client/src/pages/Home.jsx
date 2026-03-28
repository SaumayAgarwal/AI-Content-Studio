import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AiTools from "../components/AiTools";
import HowItWorks from "../components/HowItWorks";
import Testimonial from "../components/Testimonial";
import Plan from "../components/Plan";
import CtaBanner from "../components/CtaBanner";
import Footer from "../components/Footer";

const Home = () => {
  // Scroll-reveal — observe all .reveal elements on the page
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative z-10">
      <Navbar />
      <Hero />
      <AiTools />
      <HowItWorks />
      <Testimonial />
      <Plan />
      <CtaBanner />
      <Footer />
    </div>
  );
};

export default Home;
