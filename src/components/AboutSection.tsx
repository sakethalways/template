import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./SplitText";
import { useContent } from "@/context/ContentContext";

gsap.registerPlugin(ScrollTrigger);

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
    <section id="about" ref={sectionRef} className="project-px project-py -mt-8 md:-mt-12 lg:-mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="flex flex-col gap-8 md:gap-12">
            <div className="text-center">
              <p className="text-sm md:text-base tracking-[0.3em] uppercase text-primary font-body mb-4">
                {content.about.sectionLabel}
              </p>
              <div className="flex flex-col items-center">
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
            <div className="space-y-4 md:space-y-6 text-center">
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
          {content.about.image && (
            <div className="relative h-96 md:h-[500px] lg:h-[550px] rounded-lg overflow-hidden">
              <img
                src={content.about.image}
                alt="About section"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-12 md:mt-20 pt-10 md:pt-16 border-t border-border" style={{ perspective: "600px" }}>
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
