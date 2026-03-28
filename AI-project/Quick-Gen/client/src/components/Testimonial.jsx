import React from "react";

const testimonials = [
  {
    stars: 5,
    text: "AI Content Studio completely transformed my workflow. I used to spend hours writing blog posts — now I produce 5x more content with the same quality. The article generator is remarkably good.",
    initials: "SK",
    name: "Sneha Kapoor",
    role: "Content Marketing Lead, Delhi",
    avatarBg: "linear-gradient(135deg,#534AB7,#3C3489)",
  },
  {
    stars: 5,
    text: "The image generation and background removal tools alone are worth the subscription. Our e-commerce product photos now look professional without hiring a photographer. Saved us ₹80,000 last quarter.",
    initials: "RM",
    name: "Rahul Mehta",
    role: "E-Commerce Founder, Mumbai",
    avatarBg: "linear-gradient(135deg,#0F6E56,#085041)",
  },
  {
    stars: 5,
    text: "I used the resume review tool before my job hunt and it completely reshaped my CV. Got interview calls from 3 top companies within a week. The AI feedback was genuinely insightful and specific.",
    initials: "AP",
    name: "Arjun Patel",
    role: "Software Engineer, Bangalore",
    avatarBg: "linear-gradient(135deg,#BA7517,#633806)",
  },
];

const Testimonial = () => {
  return (
    <section id="testimonials" className="py-24 px-6 sm:px-16 xl:px-32" style={{ background: "#111827" }}>
      {/* Header */}
      <div className="text-center mb-14 reveal">
        <div className="inline-flex items-center justify-center gap-2 text-gold text-[0.75rem] font-semibold uppercase tracking-[3px] mb-4">
          Testimonials
        </div>
        <h2
          className="font-display font-bold text-white mb-4"
          style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.15, letterSpacing: "-0.5px" }}
        >
          Trusted by{" "}
          <em className="not-italic italic text-goldLight">Creators</em> Worldwide
        </h2>
        <p className="text-slate text-[1.05rem] leading-[1.75] font-light max-w-[520px] mx-auto">
          See what professionals and businesses are saying about AI Content Studio.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div
        className="grid gap-5 max-w-[1200px] mx-auto"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="reveal rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              transitionDelay: `${i * 0.1}s`,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(201,151,58,0.25)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
          >
            {/* Stars */}
            <div className="text-gold text-[0.85rem] mb-4 tracking-widest">
              {"★".repeat(t.stars)}
            </div>

            {/* Quote */}
            <p className="text-slateLight text-[0.92rem] leading-[1.75] italic mb-6">
              "{t.text}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-[0.9rem] text-white shrink-0"
                style={{ background: t.avatarBg }}
              >
                {t.initials}
              </div>
              <div>
                <p className="font-semibold text-[0.9rem] text-white">{t.name}</p>
                <p className="text-slate text-[0.78rem] mt-0.5">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
