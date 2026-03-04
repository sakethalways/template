import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";

gsap.registerPlugin(ScrollTrigger);

const works = [
  { img: portfolio1, title: "Brand Campaign", category: "Social Media", views: "2.5M Views" },
  { img: portfolio2, title: "Behind The Scenes", category: "Video Production", views: "1.8M Views" },
  { img: portfolio3, title: "Viral Reels", category: "Short Form Content", views: "8.2M Views" },
  { img: portfolio4, title: "Product Launch", category: "Brand Collaboration", views: "3.1M Views" },
];

const WorkSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".work-title",
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: { trigger: ".work-title", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".work-card",
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".work-grid", start: "top 75%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="py-20 md:py-32 px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
      <div className="max-w-[2560px] mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-primary font-body mb-4">
              Selected Work
            </p>
            <h2 className="work-title font-display text-[clamp(1.8rem,4vw,3.5rem)] leading-[0.95] text-foreground">
              MY <span className="text-gradient">PORTFOLIO</span>
            </h2>
          </div>
        </div>

        <div className="work-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {works.map((work, i) => (
            <div
              key={i}
              className="work-card group relative overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={work.img}
                  alt={work.title}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    hoveredIndex === i ? "scale-110 grayscale-0" : "scale-100 grayscale"
                  }`}
                />
              </div>
              {/* Overlay */}
              <div
                className={`absolute inset-0 flex flex-col justify-end p-8 transition-all duration-500 ${
                  hoveredIndex === i ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background:
                    "linear-gradient(to top, hsl(0 0% 0% / 0.9), hsl(0 0% 0% / 0.3), transparent)",
                }}
              >
                <span className="text-primary font-body text-sm tracking-[0.2em] uppercase">
                  {work.category}
                </span>
                <h3 className="font-display text-xl md:text-2xl text-foreground mt-1">
                  {work.title}
                </h3>
                <span className="font-body text-muted-foreground text-sm mt-2">
                  {work.views}
                </span>
              </div>
              {/* Red accent corner */}
              <div
                className={`absolute top-0 right-0 w-20 h-20 transition-all duration-500 ${
                  hoveredIndex === i ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}
                style={{
                  background: "linear-gradient(135deg, transparent 50%, hsl(var(--primary)) 50%)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
