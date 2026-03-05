import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "./SplitText";
import { useContent } from "@/context/ContentContext";

// Helper to get image path
const getAssetPath = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("data:")) return path;
  // If it's just a filename, assume it's in assets
  const filename = path.split("/").pop();
  return new URL(`../assets/${filename}`, import.meta.url).href;
};

const HeroSection = () => {
  const { content } = useContent();
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        labelRef.current,
        { width: 0, opacity: 0 },
        { width: "auto", opacity: 1, duration: 1 },
        0.2
      )
        .fromTo(
          circleRef.current,
          { scale: 0, opacity: 0, rotation: -180 },
          { scale: 1, opacity: 0.8, rotation: 0, duration: 1.5, ease: "elastic.out(1, 0.5)" },
          0.3
        )
        .fromTo(
          imageRef.current,
          { scale: 0.3, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.4 },
          0.5
        )
        .fromTo(
          buttonsRef.current?.children ? Array.from(buttonsRef.current.children) : [],
          { y: 40, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15 },
          1.2
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90svh] lg:min-h-[100svh] flex flex-col justify-center overflow-hidden pt-20 md:pt-24 lg:pt-0"
    >
      <div className="relative z-10 w-full max-w-[1600px] mx-auto project-px">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center w-full">
          {/* Image Column - Order 2 on mobile, 2 on desktop */}
          <div className="relative flex justify-center items-center h-[300px] md:h-[450px] lg:h-[550px] xl:h-[650px] 2xl:h-[750px] order-2 lg:order-2 w-full">
            {/* Gradient Circle Background */}
            <div
              ref={circleRef}
              className="absolute w-[250px] h-[250px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px] 2xl:w-[600px] 2xl:h-[600px] [@media(min-width:1920px)]:w-[750px] [@media(min-width:1920px)]:h-[750px] red-circle opacity-30 rounded-full"
            />
            
            {/* Image Inside Circle */}
            <div
              ref={imageRef}
              className="absolute w-[250px] h-[250px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px] 2xl:w-[600px] 2xl:h-[600px] [@media(min-width:1920px)]:w-[750px] [@media(min-width:1920px)]:h-[750px] rounded-full overflow-hidden border-2 border-primary/20 shadow-2xl z-10"
              style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                clipPath: 'circle(50%)',
                WebkitMaskImage: 'radial-gradient(circle, black 0%, black 95%, transparent 100%)',
                maskImage: 'radial-gradient(circle, black 0%, black 95%, transparent 100%)',
              }}
            >
              {content.hero.image ? (
                <img
                  src={getAssetPath(content.hero.image)}
                  alt="Alex Rivera - Content Creator"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-b from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">No image</span>
                </div>
              )}
            </div>
          </div>

          {/* Text Column - Order 1 on mobile, 1 on desktop */}
          <div className="text-left order-1 lg:order-1 flex flex-col">
            <p ref={labelRef} className="font-body text-[10px] md:text-sm tracking-[0.3em] uppercase text-muted-foreground mb-2 md:mb-5 overflow-hidden whitespace-nowrap">
              {content.hero.label}
            </p>

            <div className="flex flex-col items-start w-full">
              <SplitText
                text={content.hero.greeting}
                animation="reveal"
                triggerOnScroll={false}
                delay={0.6}
                className="font-display text-[clamp(2rem,7.5vw,6rem)] leading-[0.9] tracking-tight text-foreground"
                tag="h1"
              />
              <SplitText
                text={content.hero.name}
                animation="reveal"
                triggerOnScroll={false}
                delay={0.8}
                className="font-display text-[clamp(2rem,7.5vw,6rem)] leading-[0.9] tracking-tight text-primary"
                tag="h1"
              />
              <SplitText
                text={content.hero.lastName}
                animation="reveal"
                triggerOnScroll={false}
                delay={1.0}
                className="font-display text-[clamp(2rem,7.5vw,6rem)] leading-[0.9] tracking-tight text-foreground"
                tag="h1"
              />
            </div>

            <SplitText
              text={content.hero.description}
              animation="blurFade"
              triggerOnScroll={false}
              delay={1.2}
              className="font-body text-muted-foreground text-sm md:text-base lg:text-lg mt-4 md:mt-5 max-w-md leading-relaxed"
              tag="p"
            />

            <div ref={buttonsRef} className="flex flex-wrap gap-3 mt-6 md:mt-8">
              {content.hero.buttons.map((btn, idx) => (
                <button
                  key={idx}
                  onClick={() => document.getElementById(btn.link)?.scrollIntoView({ behavior: "smooth" })}
                  className={`${
                    btn.style === 'primary'
                      ? 'magnetic-btn bg-primary text-primary-foreground'
                      : 'border border-border text-foreground hover:border-primary hover:text-primary'
                  } px-6 md:px-8 py-3 md:py-4 font-body font-semibold tracking-wider uppercase text-xs md:text-sm relative z-10 transition-colors duration-300`}
                >
                  <span className="relative z-10">{btn.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
