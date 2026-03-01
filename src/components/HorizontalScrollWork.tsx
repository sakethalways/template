import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContent } from "@/context/ContentContext";
import SplitText from "./SplitText";

// Helper to get image path
const getAssetPath = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("data:")) return path;
  const filename = path.split("/").pop();
  return new URL(`../assets/${filename}`, import.meta.url).href;
};

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollWork = () => {
  const { content } = useContent();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const mm = gsap.matchMedia();
    const cards = trackRef.current.querySelectorAll(".hscroll-card");

    mm.add({
      // Desktop
      isDesktop: "(min-width: 1024px)",
      // Mobile
      isMobile: "(max-width: 1023px)"
    }, (context) => {
      const { isDesktop } = context.conditions as { isDesktop: boolean };

      if (isDesktop) {
        const totalWidth = trackRef.current!.scrollWidth - window.innerWidth;

        gsap.to(trackRef.current, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${totalWidth}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        // Animate each card as it enters view
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { rotationY: -15, scale: 0.85, opacity: 0.3 },
            {
              rotationY: 0,
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: gsap.getById?.("hscroll") || undefined,
                start: "left 80%",
                end: "left 30%",
                scrub: 1,
              },
            }
          );
        });
      } else {
        // Mobile layout: reset any horizontal transforms
        gsap.set(trackRef.current, { x: 0 });
        
        // Vertical fade-in for mobile
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none"
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => mm.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative lg:overflow-hidden project-py -mt-8 md:-mt-12 lg:-mt-16">
      {/* Header - relative on mobile, absolute on desktop */}
      <div className="lg:absolute top-0 left-0 z-10 project-px pt-8 lg:pt-16 mb-8 lg:mb-0">
        <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-primary font-body mb-2">
          {content.work.sectionLabel}
        </p>
      </div>

      <div
        ref={trackRef}
        className="flex flex-col lg:flex-row lg:items-start lg:pt-[5vh] gap-10 lg:gap-5 project-px lg:h-screen w-full lg:w-max"
      >
        {/* Title card */}
        <div className="flex-shrink-0 w-full lg:w-[35vw] min-w-[300px] flex flex-col justify-center text-left">
          <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] text-foreground">
            MY<br />
            <span className="text-gradient">PORTFOLIO</span>
          </h2>
          <SplitText
            text="Swipe through my latest projects. Each one tells a unique story."
            animation="blurFade"
            className="font-body text-muted-foreground text-sm md:text-base mt-4 lg:mt-6 max-w-[280px]"
            tag="p"
          />
        </div>

        {content.work.items.map((work, i) => (
          <div
            key={i}
            className="hscroll-card flex-shrink-0 w-full lg:w-[32vw] max-w-[480px] group relative overflow-hidden cursor-pointer"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="aspect-[3/4] lg:max-h-[82vh] overflow-hidden relative rounded-xl lg:rounded-none">
              <img
                src={getAssetPath(work.image)}
                alt={work.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              {/* Overlay with improved contrast and position */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 lg:p-6 opacity-100 transition-all duration-500"
                style={{
                  background:
                    "linear-gradient(to top, hsl(0 0% 10% / 0.95) 0%, hsl(0 0% 10% / 0.4) 40%, transparent 100%)",
                }}
              >
                <span className="text-primary font-body text-xs md:text-sm tracking-[0.2em] uppercase mb-2">
                  {work.category}
                </span>
                <h3 className="font-display text-2xl md:text-4xl text-white leading-tight">
                  {work.title}
                </h3>
                <span className="font-body text-white/70 text-xs md:text-sm mt-3">
                  {work.views}
                </span>
              </div>
              {/* Number */}
              <div className="absolute top-2 right-4 font-display text-6xl md:text-8xl text-foreground/10 group-hover:text-primary/30 transition-colors duration-500">
                0{i + 1}
              </div>
            </div>
          </div>
        ))}

        {/* End CTA */}
        <div className="flex-shrink-0 w-full lg:w-[30vw] min-w-[250px] flex flex-col items-center text-center py-12 lg:py-0 lg:self-center">
          <span className="font-display text-2xl md:text-3xl text-foreground uppercase tracking-tight">
            WANT <span className="text-gradient">MORE?</span>
          </span>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="mt-6 magnetic-btn bg-primary text-primary-foreground px-6 md:px-8 py-3 md:py-4 font-body font-semibold tracking-wider uppercase text-xs md:text-sm relative z-10"
          >
            <span className="relative z-10">Let's Talk</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HorizontalScrollWork;
