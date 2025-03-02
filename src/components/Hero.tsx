
import { personalInfo } from "@/lib/data";
import { ArrowDown, Github, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-300/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl w-full mx-auto z-10">
        <div className="flex flex-col items-center text-center">
          {/* Name Tag */}
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 bg-secondary text-primary animate-fade-down animate-delay-100">
            Full-Stack Developer
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 animate-fade-down animate-delay-200">
            <span className="text-primary">SK Rohan</span> Parveag
          </h1>

          {/* Description */}
          <p className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-8 animate-fade-down animate-delay-300">
            Building elegant, user-centric web experiences with expertise in Python, SQL, PHP, and JavaScript.
          </p>

          {/* Contact Links */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-down animate-delay-400">
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-secondary/70 transition-colors duration-300"
            >
              <Mail size={16} />
              <span>{personalInfo.email}</span>
            </a>
            <a
              href={`tel:${personalInfo.phone}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-secondary/70 transition-colors duration-300"
            >
              <Phone size={16} />
              <span>{personalInfo.phone}</span>
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-secondary/70 transition-colors duration-300"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center animate-fade-down animate-delay-500">
            <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90">
              View My Projects
            </Button>
            <Button size="lg" variant="outline" className="rounded-full">
              Download Resume
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown size={24} className="text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
