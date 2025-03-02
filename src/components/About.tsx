
import { personalInfo } from "@/lib/data";
import { useEffect, useRef } from "react";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 px-4 bg-secondary/50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Image Side */}
          <div className="w-full md:w-1/2 flex justify-center animate-on-scroll">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 bg-primary/10 rounded-full absolute -top-4 -left-4"></div>
              <div className="w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-full border-4 border-white shadow-xl relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                  alt="SK Rohan Parveag"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="w-24 h-24 bg-primary/20 rounded-full absolute -bottom-2 -right-2 z-0"></div>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full md:w-1/2">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 bg-primary/10 text-primary animate-on-scroll">
              About Me
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-on-scroll">
              Passionate about creating <span className="text-primary">innovative solutions</span>
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed animate-on-scroll">
              {personalInfo.about}
            </p>
            <div className="grid grid-cols-2 gap-4 animate-on-scroll">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Email</span>
                <span className="font-medium">{personalInfo.email}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Phone</span>
                <span className="font-medium">{personalInfo.phone}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">GitHub</span>
                <a 
                  href={personalInfo.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-medium hover:text-primary transition-colors"
                >
                  DevRohan33
                </a>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Location</span>
                <span className="font-medium">India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
