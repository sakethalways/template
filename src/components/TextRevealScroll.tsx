import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContent } from "@/context/ContentContext";

gsap.registerPlugin(ScrollTrigger);

const TextRevealScroll = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { content } = useContent();

  useEffect(() => {
    if (!sectionRef.current) return;
    const words = sectionRef.current.querySelectorAll(".reveal-word");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.1 },
        {
          opacity: 1,
          stagger: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 40%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const sentence = content?.textReveal?.text || "I don't just create content — I build viral movements that make brands unforgettable and turn followers into loyal customers.";

  return (
    <section ref={sectionRef} className="project-px project-py -mt-8 md:-mt-12 lg:-mt-16">
      <div className="max-w-5xl mx-auto">
        <p className="font-display text-[clamp(1.8rem,4vw,3.5rem)] leading-[1.3] text-foreground">
          {sentence.split(" ").map((word, i) => (
            <span key={i} className="reveal-word inline-block mr-[0.3em] opacity-10">
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
};

export default TextRevealScroll;
