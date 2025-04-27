import { personalInfo } from "@/lib/data";
import { ArrowDown, Github, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

const Welcome = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 100;
    
    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsla(${Math.random() * 40 + 200}, 80%, 60%, ${Math.random() * 0.3 + 0.1})`;
      }
    
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
    
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }
    
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Connection lines between particles
    function connectParticles() {
      const maxDistance = 150;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(66, 133, 244, ${1 - distance / maxDistance})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }
    
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(240, 249, 255, 1)');
      gradient.addColorStop(1, 'rgba(214, 240, 255, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      connectParticles();
      requestAnimationFrame(animate);
    }
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-20"
    >
      {/* Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0" 
        style={{ backgroundColor: 'rgba(240, 249, 255, 0.8)' }}
      />

      <div className="max-w-7xl w-full mx-auto z-10 relative">
        <div className="flex flex-col items-center text-center">
          {/* Name Tag */}
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 bg-white/50 backdrop-blur-sm text-primary shadow-sm border border-blue-100/30 animate-fade-down animate-delay-100">
            Web Developer
          </div>

          {/* Main Heading - Removed background */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 animate-fade-down animate-delay-200">
            <span className="text-primary">SK Rohan</span>
            <span className="text-gray-800">Parveag</span>
          </h1>

          {/* Description - Made background transparent */}
          <p className="max-w-2xl text-lg md:text-xl text-gray-700 mb-8 animate-fade-down animate-delay-300">
            Building elegant, user-centric web experiences with expertise in Python, React, and JavaScript.
          </p>

          {/* Contact Links with more transparency */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-down animate-delay-400">
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 hover:bg-white/60 backdrop-blur-sm border border-blue-100/30 shadow-sm transition-all duration-300"
            >
              <Mail size={16} className="text-primary" />
              <span className="text-gray-700">{personalInfo.email}</span>
            </a>
            <a
              href={`tel:${personalInfo.phone}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 hover:bg-white/60 backdrop-blur-sm border border-blue-100/30 shadow-sm transition-all duration-300"
            >
              <Phone size={16} className="text-primary" />
              <span className="text-gray-700">{personalInfo.phone}</span>
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 hover:bg-white/60 backdrop-blur-sm border border-blue-100/30 shadow-sm transition-all duration-300"
            >
              <Github size={16} className="text-primary" />
              <span className="text-gray-700">GitHub</span>
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center animate-fade-down animate-delay-500">
            <Button
              size="lg" 
              className="rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-300"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View My Projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-blue-200 hover:border-primary/40 backdrop-blur-sm bg-white/40 hover:bg-white/60 text-gray-700 shadow-sm transition-all duration-300"
              onClick={() =>
                window.open(
                  "https://drive.google.com/file/d/1-DvqMm3DQRzKOglTDRY8ZyPQ2-uiBskZ/view?usp=drivesdk",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              Download Resume
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Moved to bottom of viewport */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 mb-2">Scroll Down</span>
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center p-1 animate-bounce">
            <div className="w-1 h-2 bg-primary rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;