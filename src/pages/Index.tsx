import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeText from "@/components/MarqueeText";
import TextRevealScroll from "@/components/TextRevealScroll";
import AboutSection from "@/components/AboutSection";
import HorizontalScrollWork from "@/components/HorizontalScrollWork";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import AdminTrigger from "@/components/AdminTrigger";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Refresh ScrollTrigger after all content loads
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <HeroSection />
      <MarqueeText />
      <TextRevealScroll />
      <AboutSection />
      <HorizontalScrollWork />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />
      <AdminTrigger />
    </div>
  );
};

export default Index;
