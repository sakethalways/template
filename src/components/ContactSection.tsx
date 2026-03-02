import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./SplitText";
import { useContent } from "@/context/ContentContext";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { content } = useContent();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Magnetic button effect
      const btns = sectionRef.current!.querySelectorAll(".magnetic-btn");
      btns.forEach((btn) => {
        const handleMove = (e: Event) => {
          const mouseEvent = e as MouseEvent;
          const rect = (btn as HTMLElement).getBoundingClientRect();
          const x = mouseEvent.clientX - rect.left - rect.width / 2;
          const y = mouseEvent.clientY - rect.top - rect.height / 2;
          gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
        };
        const handleLeave = () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        };
        btn.addEventListener("mousemove", handleMove);
        btn.addEventListener("mouseleave", handleLeave);
      });

      // Social links stagger
      gsap.fromTo(
        ".social-link",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: ".social-links", start: "top 85%" },
        }
      );

      // Big text scale on scroll
      gsap.fromTo(
        ".contact-big-text",
        { scale: 0.7, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-big-text", start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="project-px project-py -mt-8 md:-mt-12 lg:-mt-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center">
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-primary font-body mb-4">
            {content.contact.sectionLabel}
          </p>

          <div className="contact-big-text">
            <SplitText
              text={content.contact.heading}
              animation="scatter"
              className="font-display text-[clamp(2rem,10vw,8rem)] leading-[0.9] text-foreground"
              tag="h2"
            />
            <SplitText
              text={content.contact.subheading}
              animation="roll"
              delay={0.3}
              className="font-display text-[clamp(2rem,10vw,8rem)] leading-[0.9] text-primary"
              tag="h2"
            />
          </div>

          <SplitText
            text={content.contact.description}
            animation="blurFade"
            triggerOnScroll={true}
            delay={0.2}
            className="font-body text-muted-foreground text-base md:text-lg max-w-lg mx-auto mb-10 md:mb-12 mt-6 md:mt-8"
            tag="p"
          />

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
            <a
              href={`mailto:${content.contact.email}`}
              className="magnetic-btn bg-primary text-primary-foreground w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 font-body font-semibold tracking-wider uppercase text-xs md:text-sm relative z-10 inline-block text-center"
            >
              <span className="relative z-10">{content.contact.emailButtonText}</span>
            </a>
          </div>

          <div className="social-links flex flex-wrap justify-center gap-6 md:gap-8 mt-12 md:mt-16">
            {content.contact.socialLinks.map((social: any) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link font-body text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors duration-300 tracking-wider uppercase"
              >
                {social.platform}
              </a>
            ))}
          </div>
        </div>

        <div className="section-divider mt-16 md:mt-20 mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground font-body text-xs md:text-sm text-center md:text-left">
          <span>{content.contact.footerCopyright}</span>
          <span className="tracking-[0.2em] uppercase">{content.contact.footerBranding}</span>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
