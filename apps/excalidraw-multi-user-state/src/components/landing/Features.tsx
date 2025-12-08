import { useEffect, useRef } from "react";
import { Users, Zap, Share2, Lock, Palette, Cloud } from "lucide-react";
import { gsap, ScrollTrigger } from "@/hooks/useGSAP";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Users,
    title: "Real-time Collaboration",
    description: "See your teammates' cursors and edits as they happen. No refresh needed, ever.",
    accent: "primary",
  },
  {
    icon: Zap,
    title: "Instant Sharing",
    description: "Share with a single link. Anyone can view or edit—you control the permissions.",
    accent: "accent",
  },
  {
    icon: Palette,
    title: "Beautiful Hand-drawn Style",
    description: "Everything you draw looks naturally sketched, giving your ideas a human touch.",
    accent: "primary",
  },
  {
    icon: Cloud,
    title: "Auto-save to Cloud",
    description: "Your work is automatically saved. Pick up exactly where you left off, anywhere.",
    accent: "accent",
  },
  {
    icon: Lock,
    title: "Private & Secure",
    description: "End-to-end encryption keeps your ideas safe. Control who sees what.",
    accent: "primary",
  },
  {
    icon: Share2,
    title: "Export Anywhere",
    description: "Download as PNG, SVG, or share directly to Slack, Notion, and more.",
    accent: "accent",
  },
];

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        ".feature-card",
        {
          y: 100,
          opacity: 0,
          rotateY: -15,
          transformPerspective: 1000,
        },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".features-grid",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-widest mb-4">Features</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            Draw, collaborate, and create together
            {/* <span className="font-sketch text-4xl sm:text-5xl md:text-6xl text-gradient">sketch</span> */}
          </h2>
          <p className="text-lg text-muted-foreground">
            A powerful yet simple canvas that helps teams visualize ideas together.
          </p>
        </div>

        {/* Features Grid - Hexagonal-inspired layout */}
        <div className="features-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="feature-card group relative"
            >
              {/* Card with angled cut corners */}
              <div className="relative h-full p-8 bg-card border border-border overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))",
                }}
              >
                {/* Corner accent */}
                <div
                  className={`absolute top-0 right-0 w-12 h-12 ${feature.accent === "primary" ? "bg-primary/20" : "bg-accent/20"
                    } transition-colors duration-300 group-hover:bg-primary/40`}
                  style={{
                    clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                  }}
                />

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 ${feature.accent === "primary"
                      ? "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                      : "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground"
                    }`}
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                  }}
                >
                  <feature.icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3 tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom glow line */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-[2px] ${feature.accent === "primary" ? "bg-primary" : "bg-accent"
                    } transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
