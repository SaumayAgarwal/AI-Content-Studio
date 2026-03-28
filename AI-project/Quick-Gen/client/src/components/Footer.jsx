import React from "react";
import { useNavigate } from "react-router-dom";

const footerCols = [
  {
    title: "Tools",
    links: [
      { label: "Article Writing", href: "/ai/write-article" },
      { label: "Blog Generation", href: "/ai/blog-titles" },
      { label: "Image Generation", href: "/ai/generate-images" },
      { label: "Remove Background", href: "/ai/remove-background" },
      { label: "Remove Object", href: "/ai/remove-object" },
      { label: "Resume Review", href: "/ai/review-resume" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Refund Policy", href: "#" },
    ],
  },
];

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer
      className="pt-16 pb-9 px-6 sm:px-16 xl:px-32 border-t border-white/[0.07]"
      style={{ background: "#0A0F1E" }}
    >
      {/* Grid */}
      <div
        className="grid gap-12 pb-12 border-b border-white/[0.07] max-w-[1200px] mx-auto"
        style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr" }}
      >
        {/* Brand */}
        <div>
          <button
            className="flex items-center gap-2.5 mb-3 cursor-pointer bg-transparent border-none p-0"
            onClick={() => navigate("/")}
          >
            <div className="w-9 h-9 rounded-[10px] bg-gold-gradient flex items-center justify-center text-white font-display font-black text-sm tracking-tighter">
              AI
            </div>
            <span className="font-display font-bold text-[1.25rem] text-white">Content Studio</span>
          </button>
          <p className="text-slate text-[0.88rem] leading-[1.7] max-w-[280px]">
            The all-in-one AI platform for writing, image creation, and editing. Built for creators, marketers, and professionals.
          </p>
        </div>

        {/* Link Columns */}
        {footerCols.map((col) => (
          <div key={col.title}>
            <h5 className="text-[0.8rem] font-semibold uppercase tracking-[2px] text-slate mb-5 font-sans">
              {col.title}
            </h5>
            <div className="flex flex-col gap-2.5">
              {col.links.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-slateLight text-[0.88rem] no-underline transition-colors duration-200 hover:text-goldLight"
                  onClick={(e) => {
                    if (href.startsWith("/")) {
                      e.preventDefault();
                      navigate(href);
                    }
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <div className="max-w-[1200px] mx-auto flex justify-between items-center flex-wrap gap-3 mt-7">
        <p className="text-slate text-[0.8rem]">
          © {new Date().getFullYear()} AI Content Studio. All rights reserved.
        </p>
        <p className="text-slate text-[0.8rem]">Made with ♥ in India</p>
      </div>
    </footer>
  );
};

export default Footer;
