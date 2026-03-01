import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  text: string;
  className?: string;
  animation?: "reveal" | "roll" | "flip" | "wave" | "scatter" | "fadeInUp" | "blurFade";
  triggerOnScroll?: boolean;
  delay?: number;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
}

const SplitText = ({
  text,
  className = "",
  animation = "blurFade",
  triggerOnScroll = true,
  delay = 0,
  tag: Tag = "span",
}: SplitTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll(".split-char");
    const words = containerRef.current.querySelectorAll(".split-word");

    const ctx = gsap.context(() => {
      const scrollConfig = triggerOnScroll
        ? { scrollTrigger: { trigger: containerRef.current, start: "top 85%" } }
        : {};

      switch (animation) {
        case "blurFade":
          gsap.fromTo(
            words,
            { 
              opacity: 0, 
              filter: "blur(8px)",
              y: 10
            },
            {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              duration: 0.8,
              stagger: 0.04,
              ease: "power2.out",
              delay,
              ...scrollConfig,
            }
          );
          break;

        case "fadeInUp":
          gsap.fromTo(
            words,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power2.out",
              delay,
              ...scrollConfig,
            }
          );
          break;

        case "reveal":
          gsap.fromTo(
            chars,
            { y: "100%", opacity: 0 },
            {
              y: "0%",
              opacity: 1,
              duration: 0.6,
              stagger: 0.02,
              ease: "power4.out",
              delay,
              ...scrollConfig,
            }
          );
          break;

        case "roll":
          gsap.fromTo(
            chars,
            { rotationX: -90, opacity: 0, transformOrigin: "top center" },
            {
              rotationX: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.03,
              ease: "back.out(1.7)",
              delay,
              ...scrollConfig,
            }
          );
          break;

        case "flip":
          gsap.fromTo(
            chars,
            { rotationY: 90, opacity: 0, scale: 0.5 },
            {
              rotationY: 0,
              opacity: 1,
              scale: 1,
              duration: 0.7,
              stagger: 0.025,
              ease: "power3.out",
              delay,
              ...scrollConfig,
            }
          );
          break;

        case "wave":
          gsap.fromTo(
            chars,
            { y: 50, opacity: 0, rotation: 10 },
            {
              y: 0,
              opacity: 1,
              rotation: 0,
              duration: 0.6,
              stagger: {
                each: 0.03,
                from: "center",
              },
              ease: "elastic.out(1, 0.5)",
              delay,
              ...scrollConfig,
            }
          );
          break;

        case "scatter":
          gsap.fromTo(
            chars,
            {
              x: () => gsap.utils.random(-100, 100),
              y: () => gsap.utils.random(-80, 80),
              rotation: () => gsap.utils.random(-45, 45),
              opacity: 0,
              scale: 0,
            },
            {
              x: 0,
              y: 0,
              rotation: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              stagger: 0.02,
              ease: "power3.out",
              delay,
              ...scrollConfig,
            }
          );
          break;
      }
    }, containerRef);

    return () => ctx.revert();
  }, [animation, triggerOnScroll, delay, text]);

  const renderText = () => {
    return text.split(" ").map((word, wi, arr) => (
      <span key={wi} className="split-word inline-block" style={{ perspective: "600px" }}>
        {word.split("").map((char, ci) => (
          <span
            key={ci}
            className="split-char inline-block"
            style={{ translate: 'none', rotate: 'none', scale: 'none', willChange: "transform, opacity" }}
          >
            {char}
          </span>
        ))}
        {wi < arr.length - 1 && <span className="inline-block">&nbsp;</span>}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <Tag className="inline">{renderText()}</Tag>
    </div>
  );
};

export default SplitText;
