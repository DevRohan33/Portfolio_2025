
import { personalInfo } from "@/lib/data";
import { Github, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Tagline */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">SK Rohan Parveag</h2>
            <p className="text-gray-300 mb-6 max-w-md">
              Building elegant, scalable web applications and software solutions with a focus on user experience and performance.
            </p>
            <div className="flex space-x-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Mail size={20} />
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
              </li>
              <li>
                <a href="#skills" className="text-gray-300 hover:text-white transition-colors">Skills</a>
              </li>
              <li>
                <a href="#projects" className="text-gray-300 hover:text-white transition-colors">Projects</a>
              </li>
              <li>
                <a href="#experience" className="text-gray-300 hover:text-white transition-colors">Experience</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">
                <span className="block">Email:</span>
                <a href={`mailto:${personalInfo.email}`} className="hover:text-white transition-colors">
                  {personalInfo.email}
                </a>
              </li>
              <li className="text-gray-300">
                <span className="block">Phone:</span>
                <a href={`tel:${personalInfo.phone}`} className="hover:text-white transition-colors">
                  {personalInfo.phone}
                </a>
              </li>
              <li className="text-gray-300">
                <span className="block">GitHub:</span>
                <a 
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  DevRohan33
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} SK Rohan Parveag. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
