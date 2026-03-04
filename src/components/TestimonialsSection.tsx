import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./SplitText";
import { useContent } from "@/context/ContentContext";

gsap.registerPlugin(ScrollTrigger);

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { content } = useContent();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll(".testimonial-card");

      cards.forEach((card, i) => {
        // 3D flip entrance
        gsap.fromTo(
          card,
          {
            rotateY: 90,
            opacity: 0,
            transformPerspective: 1200,
            transformOrigin: i % 2 === 0 ? "left center" : "right center",
          },
          {
            rotateY: 0,
            opacity: 1,
            transformOrigin: "center center",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
          }
        );
      });

      // Pop up and color hover effect on cards
      cards.forEach((card) => {
        const handleEnter = () => {
          gsap.to(card, {
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(var(--color-primary), 0.15)",
            duration: 0.4,
            ease: "power2.out",
          });
        };
        const handleLeave = () => {
          gsap.to(card, {
            scale: 1,
            boxShadow: "0 0px 0px rgba(var(--color-primary), 0)",
            duration: 0.4,
            ease: "power2.out",
          });
        };
        card.addEventListener("mouseenter", handleEnter);
        card.addEventListener("mouseleave", handleLeave);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const testimonialData = content?.testimonials || {
    sectionLabel: "Testimonials",
    heading: "WHAT CLIENTS SAY",
    items: [
      {
        quote: "Alex completely transformed our social media presence. Our engagement went up 400% in just 3 months.",
        name: "Sarah Chen",
        role: "Marketing Director, StyleCo",
      },
      {
        quote: "The viral video Alex created for our launch got 5M views. That's the kind of impact you can't put a price on.",
        name: "Marcus Johnson",
        role: "Founder, FitBrand",
      },
      {
        quote: "Working with Alex was a game-changer. Professional, creative, and delivers results every single time.",
        name: "Elena Rodriguez",
        role: "Brand Manager, LuxBeauty",
      },
    ],
  };

  return (
    <section id="testimonials" ref={sectionRef} className="project-px project-py -mt-8 md:-mt-12 lg:-mt-16">
      <div className="max-w-[2560px] mx-auto">
        <div className="text-center lg:text-left mb-10 md:mb-16">
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-primary font-body mb-4">
            {testimonialData.sectionLabel}
          </p>
          <SplitText
            text={testimonialData.heading}
            animation="reveal"
            className="font-display text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] text-foreground"
            tag="h2"
          />
        </div>

        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1200px" }}>
          {testimonialData.items.map((t, i) => (
            <div
              key={i}
              className="testimonial-card glass-card p-6 md:p-8"
              style={{ transformStyle: "preserve-3d", willChange: "transform", transformOrigin: "center center" }}
            >
              <div className="text-primary text-4xl md:text-5xl font-display leading-none mb-4">"</div>
              <SplitText
                text={t.quote}
                animation="blurFade"
                className="font-body text-foreground text-base md:text-lg leading-relaxed mb-6 md:mb-8"
                tag="p"
              />
              <div>
                <p className="font-body font-semibold text-foreground text-sm md:text-base">{t.name}</p>
                <p className="font-body text-muted-foreground text-xs md:text-sm">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
