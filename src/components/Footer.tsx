
import { personalInfo } from "@/lib/data";
import { Github, Mail, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Logo and Tagline */}
          <div className="md:col-span-5">
            <h2 className="text-3xl font-black mb-6 tracking-tight">
              SK ROHAN <span className="text-primary">PARVEAG</span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-sm text-lg leading-relaxed">
              Specializing in <span className="text-white font-medium">LLM Engineering</span>, <span className="text-white font-medium">Full-Stack Development</span>, and <span className="text-white font-medium">Scalable AI Systems</span>.
            </p>
            <div className="flex space-x-5">
              {[
                { icon: Mail, href: `mailto:${personalInfo.email}` },
                { icon: Github, href: personalInfo.github },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary hover:bg-primary/10 transition-all duration-300"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Explore</h3>
            <ul className="grid grid-cols-1 gap-4">
              {["Home", "About", "Skills", "Projects", "Experience", "Contact"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Contact Details</h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                  <Mail size={18} className="text-primary" />
                </div>
                <div>
                  <span className="block text-xs text-gray-500 uppercase font-bold tracking-tighter">Email Me</span>
                  <a href={`mailto:${personalInfo.email}`} className="text-gray-300 hover:text-white transition-colors">
                    {personalInfo.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                  <Phone size={18} className="text-primary" />
                </div>
                <div>
                  <span className="block text-xs text-gray-500 uppercase font-bold tracking-tighter">Call Me</span>
                  <a href={`tel:${personalInfo.phone}`} className="text-gray-300 hover:text-white transition-colors">
                    {personalInfo.phone}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} SK Rohan Parveag. Built with Passion & AI.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
