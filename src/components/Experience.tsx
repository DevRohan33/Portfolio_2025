
import { experience, certifications } from "@/lib/data";
import { useEffect, useRef } from "react";
import { Award, Briefcase } from "lucide-react";

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animateElements = entry.target.querySelectorAll(".animate-on-scroll");
            animateElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("animate-fade-up");
              }, index * 100);
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
    <section id="experience" ref={sectionRef} className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 bg-primary/10 text-primary">
            My Journey
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Professional Experience
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            A timeline of my professional journey, showcasing my experience and growth as a developer.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Experience Timeline */}
          <div className="lg:col-span-2">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-secondary"></div>

              {/* Experience Items */}
              {experience.map((item, index) => (
                <div
                  key={item.id}
                  className="relative pl-14 pb-12 animate-on-scroll"
                >
                  {/* Icon */}
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-white border-2 border-primary flex items-center justify-center z-10">
                    <Briefcase size={18} className="text-primary" />
                  </div>

                  {/* Content */}
                  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 bg-secondary text-primary">
                      {item.period}
                    </span>
                    <h3 className="text-xl font-semibold">{item.role}</h3>
                    <p className="text-primary font-medium mb-4">{item.company}</p>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      {item.description.map((desc, idx) => (
                        <li key={idx}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 animate-on-scroll">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Award size={20} className="text-primary" />
                Certifications & Achievements
              </h3>
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="border-l-2 border-primary pl-4 py-2 animate-on-scroll"
                  >
                    <p className="font-medium">{cert.title}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Skills Card */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 mt-6 animate-on-scroll">
              <h3 className="text-xl font-semibold mb-6">Additional Skills</h3>
              <div className="flex flex-wrap gap-2">
                {["OOP", "Data Structures", "Algorithms", "GUI Development", "API Integration", "Database Design", "UX/UI Design", "Responsive Design"].map((skill, index) => (
                  <span
                    key={index}
                    className="inline-block px-3 py-1 rounded-full text-sm bg-secondary text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
