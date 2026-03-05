import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContent } from "@/context/ContentContext";

gsap.registerPlugin(ScrollTrigger);

const MarqueeText = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);
  const { content } = useContent();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // First track moves left on scroll
      gsap.to(track1Ref.current, {
        x: "-50%",
        ease: "none",
        scrollTrigger: {
          trigger: marqueeRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // Second track moves right on scroll (opposite direction)
      gsap.fromTo(
        track2Ref.current,
        { x: "-50%" },
        {
          x: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        }
      );

      // Entrance
      gsap.fromTo(
        marqueeRef.current,
        { opacity: 0, scaleY: 0 },
        {
          opacity: 1,
          scaleY: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: "top 90%",
          },
        }
      );
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={marqueeRef} className="py-8 md:py-12 lg:py-16 overflow-hidden space-y-2">
      <div ref={track1Ref} className="flex whitespace-nowrap">
        <span className="font-display text-4xl md:text-6xl lg:text-8xl text-muted-foreground/70 tracking-wider">
          {Array(6).fill(content?.marquee?.text1 || "CONTENT CREATOR • SOCIAL MEDIA • BRAND STRATEGY • UGC EXPERT • ").join("")}
        </span>
      </div>
      <div ref={track2Ref} className="flex whitespace-nowrap">
        <span className="font-display text-4xl md:text-6xl lg:text-8xl text-primary/60 tracking-wider">
          {Array(6).fill(content?.marquee?.text2 || "REELS • TIKTOK • YOUTUBE • INSTAGRAM • BRAND DEALS • ").join("")}
        </span>
      </div>
    </div>
  );
};

export default MarqueeText;
