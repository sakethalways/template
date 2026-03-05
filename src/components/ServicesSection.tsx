import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./SplitText";
import { useContent } from "@/context/ContentContext";

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const { content } = useContent();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current!.querySelectorAll(".service-item");

      items.forEach((item, i) => {
        // Slide in from alternating sides
        const fromX = i % 2 === 0 ? -100 : 100;

        gsap.fromTo(
          item,
          { x: fromX, opacity: 0, skewX: i % 2 === 0 ? -3 : 3 },
          {
            x: 0,
            opacity: 1,
            skewX: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 85%" },
          }
        );

        // Hover fill effect
        const fill = item.querySelector(".service-fill");
        if (fill) {
          item.addEventListener("mouseenter", () => {
            gsap.to(fill, { scaleX: 1, duration: 0.5, ease: "power2.out" });
          });
          item.addEventListener("mouseleave", () => {
            gsap.to(fill, { scaleX: 0, duration: 0.5, ease: "power2.out" });
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="project-py bg-background/50 w-full max-w-full overflow-x-hidden">
      <div className="max-w-[1600px] mx-auto project-px w-full overflow-x-hidden">
        <div className="text-center lg:text-left mb-10 md:mb-16">
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-primary font-body mb-4">
            {content.services.sectionLabel}
          </p>
          <SplitText
            text={content.services.heading}
            animation="reveal"
            className="font-display text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] text-foreground"
            tag="h2"
          />
        </div>

        <div className="services-list space-y-0">
          {content.services.items.map((service, idx) => (
            <div
              key={idx}
              className="service-item group border-t border-border py-8 md:py-10 px-4 md:px-6 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer relative overflow-hidden"
            >
              {/* Hover fill background */}
              <div
                className="service-fill absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 origin-left"
                style={{ transform: "scaleX(0)" }}
              />

              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 relative z-10">
                <span className="font-display text-2xl md:text-3xl text-primary">{service.num}</span>
                <div>
                  <h3 className="font-display text-2xl md:text-4xl text-foreground group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <SplitText
                    text={service.desc}
                    animation="blurFade"
                    className="font-body text-muted-foreground text-sm md:text-base mt-1 md:mt-2 max-w-md"
                    tag="p"
                  />
                </div>
              </div>
              <span className="font-display text-xl md:text-2xl text-foreground whitespace-nowrap relative z-10">
                {service.price}
              </span>
            </div>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
