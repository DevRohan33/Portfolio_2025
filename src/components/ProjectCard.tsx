
import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink: string;
  githubLink: string;
}

const ProjectCard = ({
  title,
  description,
  image,
  tags,
  demoLink,
  githubLink,
}: ProjectCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <div 
        className="project-card group h-full flex flex-col"
        onClick={() => setIsOpen(true)}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden h-60">
          <div className={`w-full h-full bg-gray-200 ${!imageLoaded ? 'animate-pulse' : ''}`}>
            <img
              src={image}
              alt={title}
              className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-4 text-white">
              <h3 className="text-lg font-semibold">{title}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-1 text-xs rounded-full bg-primary/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 text-xs rounded-full bg-secondary text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Project Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-4xl overflow-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl">{title}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="md:col-span-2">
              <div className="rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-1">
              <h4 className="font-medium text-lg mb-2">Description</h4>
              <p className="text-muted-foreground mb-4">{description}</p>
              
              <h4 className="font-medium text-lg mb-2">Technologies</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-1 text-sm rounded-full bg-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-col gap-3">
                <Button 
                  asChild 
                  className="w-full gap-2 justify-center"
                >
                  <a href={demoLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} />
                    View Demo
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  asChild
                  className="w-full gap-2 justify-center"
                >
                  <a href={githubLink} target="_blank" rel="noopener noreferrer">
                    <Github size={16} />
                    View Code
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectCard;
