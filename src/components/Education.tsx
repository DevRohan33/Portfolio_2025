import { useEffect, useRef } from "react";
import { BookOpen } from "lucide-react";
import { education } from "@/lib/data";

const Education = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animateElements =
              entry.target.querySelectorAll(".animate-on-scroll");
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

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section id="education" ref={sectionRef} className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 bg-primary/10 text-primary">
            Academic Journey
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Education</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            My academic path, showcasing my studies and technical foundation.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-secondary"></div>

          {/* Education Items */}
          {education.map((item) => (
            <div
              key={item.id}
              className="relative pl-14 pb-12 animate-on-scroll"
            >
              {/* Icon */}
              <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-white border-2 border-primary flex items-center justify-center z-10">
                <BookOpen size={18} className="text-primary" />
              </div>

              {/* Content */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 bg-secondary text-primary">
                  {item.period}
                </span>
                <h3 className="text-xl font-semibold">{item.degree}</h3>
                <p className="text-primary font-medium mb-1">{item.field}</p>
                <p className="text-muted-foreground font-medium mb-4">
                  {item.institution}
                </p>
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
    </section>
  );
};

export default Education;
