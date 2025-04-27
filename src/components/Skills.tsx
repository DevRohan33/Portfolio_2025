
import { skills } from "@/lib/data";
import { useEffect, useRef } from "react";

const SkillCategory = ({ title, skills }: { title: string; skills: { name: string; level: number }[] }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{skill.name}</span>
              <span className="text-sm text-muted-foreground">{skill.level}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${skill.level}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll(".progress-bar-fill");
            progressBars.forEach((bar) => {
              const width = bar.getAttribute("style")?.match(/width: (\d+)%/)?.[1];
              if (width) {
                bar.setAttribute("style", "width: 0%");
                setTimeout(() => {
                  bar.setAttribute("style", `width: ${width}%`);
                }, 100);
              }
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 bg-primary/10 text-primary">
            My Skills
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technical Expertise
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            My broad technical skill set allows me to create comprehensive solutions, from user interfaces to complex backend systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkillCategory title="Programming Languages" skills={skills.languages} />
          <SkillCategory title="Frontend Development" skills={skills.frontend} />
          <SkillCategory title="Backend Development" skills={skills.backend} />
          <SkillCategory title="Database Management" skills={skills.database} />
          <SkillCategory title="Tools & Technologies" skills={skills.tools} />
          <SkillCategory title="Other Skills" skills={skills.ai} />
        </div>
      </div>
    </section>
  );
};

export default Skills;
