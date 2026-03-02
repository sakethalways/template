import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useContent } from "@/context/ContentContext";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLSpanElement>(null);
  const { content } = useContent();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    // Initialize animation timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.2 }
      );

      // Logo letters animation - simpler on mobile
      if (logoRef.current) {
        const letters = logoRef.current.querySelectorAll(".logo-letter");
        const isMobile = window.innerWidth < 768;
        tl.fromTo(
          letters,
          { y: -30, opacity: 0, rotationX: -90 },
          { y: 0, opacity: 1, rotationX: 0, duration: isMobile ? 0.4 : 0.6, stagger: isMobile ? 0.02 : 0.04, ease: "back.out(1.7)" },
          0.3
        );
      }

      // Nav links stagger (desktop only)
      const links = navRef.current!.querySelectorAll(".nav-link-desktop");
      if (links.length > 0) {
        tl.fromTo(
          links,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" },
          0.5
        );
      }
      
      // Right side buttons stagger
      const rightBtns = navRef.current!.querySelectorAll(".nav-right-btn");
      if (rightBtns.length > 0) {
        tl.fromTo(
          rightBtns,
          { x: 20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, stagger: 0.05 },
          0.6
        );
      }
    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Only hide navbar on desktop screens, never on mobile
      const isMobile = window.innerWidth < 1024;
      if (isMobile) {
        setIsHidden(false); // Always visible on mobile
        return;
      }

      // Only apply hide logic on desktop after user has scrolled
      if (window.scrollY > 50) {
        hasScrolledRef.current = true;
        const heroSection = document.querySelector('section:first-of-type');
        if (!heroSection) return;

        const heroHeight = heroSection.clientHeight;
        const currentScroll = window.scrollY;
        const shouldHide = currentScroll > heroHeight * 0.7;
        setIsHidden(shouldHide);
      } else {
        // Always show navbar at top of page
        setIsHidden(false);
      }
    };

    // Don't call immediately - let animation complete first
    const timeoutId = setTimeout(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const logoText = content.navbar.logo;
  const navButtons = content.navbar.buttons;
  const ctaText = content.navbar.ctaText;

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300 overflow-hidden bg-white"
        style={{ 
          background: "linear-gradient(180deg, hsl(0 0% 98% / 0.98), hsl(0 0% 98% / 0.9), transparent)",
          transform: isHidden ? 'translateY(-100%)' : 'translateY(0)',
          opacity: isHidden ? 0 : 1,
        }}
      >
        {/* Navbar Inner Container with max-width */}
        <div className="flex items-center justify-between w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-2 md:py-4">
          {/* Logo - Compact on mobile */}
          <span ref={logoRef} className="text-xs sm:text-sm md:text-lg lg:text-2xl xl:text-3xl tracking-wider text-foreground font-bold flex-shrink-0 whitespace-nowrap min-w-fit" style={{ perspective: "400px" }}>
            {logoText.split("").map((l, i) => (
              <span key={i} className="logo-letter inline-block">{l}</span>
            ))}
            <span className="text-primary logo-letter inline-block">.</span>
          </span>

          {/* Spacer - flex grow to push buttons to right */}
          <div className="flex-1 min-w-0" />

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10 font-body text-sm lg:text-base tracking-wide font-medium text-muted-foreground">
            {navButtons.map((item: string) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="nav-link-desktop hover:text-primary transition-colors duration-300 relative capitalize after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full whitespace-nowrap"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-0.5 sm:gap-1.5 md:gap-3 flex-shrink-0 ml-4 md:ml-8">
            {/* Hire Me Button - Hidden on tiny mobile */}
            <button
              onClick={() => scrollTo("contact")}
              className="nav-right-btn hidden xs:inline-block magnetic-btn bg-primary text-primary-foreground px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-[8px] sm:text-[10px] md:text-sm font-body font-semibold tracking-wider uppercase relative z-10 whitespace-nowrap rounded transition-all hover:shadow-lg"
            >
              <span className="relative z-10">{ctaText}</span>
            </button>

            {/* Mobile Menu Toggle - Always visible and never hidden */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="nav-right-btn lg:hidden text-foreground p-1 flex-shrink-0 w-auto h-auto"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu size={20} className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-[45] lg:hidden top-16 sm:top-20">
          <div className="flex flex-col items-center justify-start pt-8 gap-6 text-2xl sm:text-3xl font-display tracking-widest capitalize font-semibold">
            {navButtons.map((item: string) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="hover:text-primary transition-all duration-300 transform hover:scale-110"
              >
                {item}
              </button>
            ))}
            {/* Hire Me in mobile menu */}
            <button
              onClick={() => scrollTo("contact")}
              className="mt-6 bg-primary text-primary-foreground px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base font-body font-bold tracking-wider uppercase shadow-lg active:scale-95 transition-all"
            >
              {ctaText}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
