
import { projects } from "@/lib/data";
import ProjectCard from "./ProjectCard";
import ThreeJSModel from "./ThreeJSModel";
import { useEffect, useRef } from "react";
import { handleScrollAnimation } from "@/lib/animations";

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Ensure animation handler is executed
    handleScrollAnimation();

    // Force visibility for all project elements
    const projectElements = document.querySelectorAll("#projects .animate-on-scroll");
    projectElements.forEach((el) => {
      // Ensure opacity is set to visible
      (el as HTMLElement).style.opacity = '1';
      
      // Add appropriate animation class
      if (el.classList.contains('fade-up-element')) {
        el.classList.add('animate-fade-up');
      } else {
        el.classList.add('animate-fade-up');
      }
    });

    return () => {
      // Cleanup observers if needed
      const elements = document.querySelectorAll(".animate-on-scroll");
      elements.forEach((el) => {
        const observer = new IntersectionObserver(() => {});
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section id="projects" className="py-24 px-4 bg-gradient-to-b from-white to-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 bg-primary/10 text-primary">
            My Work
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            A showcase of my recent work, featuring web applications, tools, and design projects.
          </p>
        </div>

        <div className="mb-24 mt-12" style={{ opacity: 1, height: '500px' }}>
          <ThreeJSModel />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="animate-on-scroll fade-up-element" style={{ opacity: 1 }}>
              <ProjectCard
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.tags}
                demoLink={project.demoLink}
                githubLink={project.githubLink}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
