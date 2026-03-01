import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const mousePos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });

  const animate = useCallback(() => {
    followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.08;
    followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.08;

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${mousePos.current.x - 5}px, ${mousePos.current.y - 5}px, 0)`;
    }
    if (followerRef.current) {
      followerRef.current.style.transform = `translate3d(${followerPos.current.x - 20}px, ${followerPos.current.y - 20}px, 0)`;
    }
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnterInteractive = () => {
      // Disabled pointer effect
    };

    const handleMouseLeaveInteractive = () => {
      // Disabled pointer effect
    };

    document.addEventListener("mousemove", handleMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    const interactives = document.querySelectorAll("a, button, .work-card, .service-item, .testimonial-card");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnterInteractive);
      el.addEventListener("mouseleave", handleMouseLeaveInteractive);
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnterInteractive);
        el.removeEventListener("mouseleave", handleMouseLeaveInteractive);
      });
    };
  }, [animate]);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
        style={{
          willChange: "transform",
          width: "20px",
          height: "20px",
          transform: "translate(-50%, -50%)"
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.5 2L5.5 18M5.5 2L10 7M5.5 2L2 5" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </div>
      <div
        ref={followerRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none hidden"
        style={{ willChange: "transform" }}
      />
    </>
  );
};

export default CustomCursor;
