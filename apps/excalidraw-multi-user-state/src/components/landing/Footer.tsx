import { useEffect, useRef } from "react";
import { Pencil, Twitter, Github, Linkedin } from "lucide-react";
import { gsap, ScrollTrigger } from "@/hooks/useGSAP";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  const footerLinks = {
    product: [
      { label: "Features", href: "#features" },
      { label: "Templates", href: "#" },
      // { label: "Integrations", href: "#" },
      // { label: "Pricing", href: "#pricing" },
    ],
    resources: [
      { label: "Blog", href: "#" },
      { label: "Help Center", href: "#" },
      // { label: "Tutorials", href: "#" },
      // { label: "API Docs", href: "#" },
    ],
    company: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      // { label: "Contact", href: "#" },
      // { label: "Press", href: "#" },
    ],
    legal: [
      { label: "Privacy", href: "#" },
      // { label: "Terms", href: "#" },
      // { label: "Security", href: "#" },
    ],
  };

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-content",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-secondary/50 border-t border-border relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />

      <div className="footer-content container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div 
                className="w-10 h-10 bg-primary flex items-center justify-center shadow-lg"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                }}
              >
                <Pencil className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground tracking-wide">Sketchflow</span>
            </div>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs leading-relaxed">
              The collaborative whiteboard for teams who love to sketch ideas together.
            </p>
            <div className="flex items-center gap-4">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="https://github.com/Ansh-699"
                  className="w-10 h-10 bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-bold text-foreground mb-4 tracking-wide capitalize">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground tracking-wide">
            © {new Date().getFullYear()} Sketchflow. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground tracking-wide">
            Made with <span className="text-primary">♥</span> by Ansh
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
