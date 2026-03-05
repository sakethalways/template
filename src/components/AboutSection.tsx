import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./SplitText";
import { useContent } from "@/context/ContentContext";

gsap.registerPlugin(ScrollTrigger);

// Helper to get image path
const getAssetPath = (path: string) => {
  if (!path) return new URL(`../assets/hero-portrait.jpg`, import.meta.url).href;
  if (path.startsWith("http") || path.startsWith("data:")) return path;
  // If it's just a filename, assume it's in assets
  const filename = path.split("/").pop();
  return new URL(`../assets/${filename}`, import.meta.url).href;
};

const AboutSection = () => {
  const { content } = useContent();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stat counter animation
      const statItems = document.querySelectorAll(".stat-item");
      statItems.forEach((item) => {
        gsap.fromTo(
          item,
          { y: 80, opacity: 0, rotationX: 30 },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
            },
          }
        );
      });

      // Number counting animation
      const nums = document.querySelectorAll(".stat-number");
      nums.forEach((num) => {
        const target = parseInt(num.getAttribute("data-target") || "0");
        const suffix = num.getAttribute("data-suffix") || "";
        const countObj = { val: 0 };
        
        gsap.to(countObj, {
          val: target,
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: { trigger: num, start: "top 85%" },
          onUpdate: () => {
            const current = Math.floor(countObj.val);
            (num as HTMLElement).textContent = current + suffix;
          },
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="project-py relative z-20 bg-background w-full max-w-full overflow-hidden">
      <div className="max-w-[1600px] mx-auto project-px w-full overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start lg:items-center w-full overflow-hidden">
          <div className="flex flex-col gap-8 md:gap-12 w-full overflow-hidden">
            <div className="text-left overflow-hidden">
              <p className="text-sm md:text-base tracking-[0.3em] uppercase text-primary font-body mb-4">
                {content.about.sectionLabel}
              </p>
              <div className="flex flex-col items-start overflow-hidden">
                <SplitText
                  text={content.about.heading1}
                  animation="reveal"
                  className="font-display text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] text-foreground"
                  tag="h2"
                />
                <SplitText
                  text={content.about.heading2}
                  animation="reveal"
                  delay={0.3}
                  className="font-display text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] text-primary"
                  tag="h2"
                />
              </div>
            </div>
            <div className="space-y-4 md:space-y-6 text-left">
              {content.about.paragraphs.map((para, idx) => (
                <SplitText
                  key={idx}
                  text={para}
                  animation="blurFade"
                  className="font-body text-muted-foreground text-base md:text-lg leading-relaxed"
                  tag="p"
                  delay={0.1 * idx}
                />
              ))}
            </div>
          </div>

          {/* About Image */}
          <div className="relative h-80 md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden w-full">
            <img
              src={getAssetPath(content.about.image)}
              alt="About section"
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                // Fallback to hero-portrait if the image fails to load
                (e.target as HTMLImageElement).src = getAssetPath("");
              }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-12 md:mt-20 pt-10 md:pt-16 border-t border-border overflow-hidden" style={{ perspective: "600px" }}>
          {content.about.stats.map((stat) => {
            const numericPart = parseInt(stat.number.replace(/\D/g, ""));
            const suffix = stat.number.replace(/\d/g, "");
            return (
              <div key={stat.label} className="stat-item text-center" style={{ transformStyle: "preserve-3d" }}>
                <span
                  className="stat-number font-display text-5xl md:text-6xl text-gradient"
                  data-target={numericPart}
                  data-suffix={suffix}
                >
                  0
                </span>
                <p className="font-body text-muted-foreground text-sm mt-2 tracking-wider uppercase">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
