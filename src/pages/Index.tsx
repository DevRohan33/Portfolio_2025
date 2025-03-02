
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { handleScrollAnimation } from "@/lib/animations";

const Index = () => {
  useEffect(() => {
    // Initialize scroll animations
    handleScrollAnimation();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for navbar height
          behavior: 'smooth'
        });
      });
    });

    // Force initial visibility for all elements
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => {
      // Make sure elements are visible even if animations haven't triggered
      el.style.opacity = '1';
      
      // Add appropriate animation class based on data attribute or element class
      if (el.classList.contains('fade-up-element')) {
        el.classList.add('animate-fade-up');
      } else if (el.classList.contains('fade-down-element')) {
        el.classList.add('animate-fade-down');
      } else if (el.classList.contains('slide-in-left-element')) {
        el.classList.add('animate-slide-in-left');
      } else if (el.classList.contains('slide-in-right-element')) {
        el.classList.add('animate-slide-in-right');
      } else if (el.classList.contains('scale-element')) {
        el.classList.add('animate-scale');
      } else {
        // Default animation
        el.classList.add('animate-fade-up');
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
