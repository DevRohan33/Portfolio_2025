import { skills } from "@/lib/data";
import { useEffect, useRef } from "react";
import { 
  BrainCircuit, 
  Code2, 
  Globe, 
  Database, 
  BarChart3, 
  Wrench 
} from "lucide-react";

const SkillCategory = ({ title, icon: Icon, skills }: { title: string; icon: any; skills: { name: string }[] }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-border/40">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1.5 rounded-full text-sm font-medium bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-default"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Removed scroll observation logic as progress bars are gone
  useEffect(() => {
    // Scroll observation logic removed as it's no longer needed for progress bars
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
          <SkillCategory title="AI / ML & Generative AI" icon={BrainCircuit} skills={skills.ai_ml} />
          <SkillCategory title="Programming Languages" icon={Code2} skills={skills.languages} />
          <SkillCategory title="Web Frameworks & APIs" icon={Globe} skills={skills.web_frameworks} />
          <SkillCategory title="Databases & Storage" icon={Database} skills={skills.databases} />
          <SkillCategory title="Data Science & Analytics" icon={BarChart3} skills={skills.data_science} />
          <SkillCategory title="Tools, DevOps & Cloud" icon={Wrench} skills={skills.tools_platforms} />
        </div>
      </div>
    </section>
  );
};

export default Skills;
