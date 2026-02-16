import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Welcome from "@/components/Welcome";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { handleScrollAnimation } from "@/lib/animations";
import Education from "@/components/Education";
import AIChatbot from "@/components/AIChatbot";

const Index = () => {
  useEffect(() => {
    // Initialize scroll animations
    handleScrollAnimation();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href")?.substring(1);
        const targetElement = targetId
          ? document.getElementById(targetId)
          : null;
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          });
        }
      });
    });

    // Force initial visibility for all elements
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => {
      (el as HTMLElement).style.opacity = "1";
      if (el.classList.contains("fade-up-element"))
        el.classList.add("animate-fade-up");
      else if (el.classList.contains("fade-down-element"))
        el.classList.add("animate-fade-down");
      else if (el.classList.contains("slide-in-left-element"))
        el.classList.add("animate-slide-in-left");
      else if (el.classList.contains("slide-in-right-element"))
        el.classList.add("animate-slide-in-right");
      else if (el.classList.contains("scale-element"))
        el.classList.add("animate-scale");
      else el.classList.add("animate-fade-up");
    });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Welcome />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Contact />
      <Footer />

      {/* Floating Buttons: Scroll to Top and AI Chatbot */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
        {/* Scroll to Top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-14 h-14 bg-white text-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-all duration-300 border border-primary/20 group order-2"
          aria-label="Back to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:-translate-y-1 transition-transform"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </button>

        {/* AI Chatbot replaces WhatsApp */}
        <div className="order-1">
          <AIChatbot />
        </div>
      </div>
    </div>
  );
};

export default Index;
