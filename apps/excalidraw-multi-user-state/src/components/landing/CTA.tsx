import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { gsap, ScrollTrigger } from "@/hooks/useGSAP";

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Floating elements animation
      gsap.to(".float-element", {
        y: -20,
        duration: 3,
        ease: "sine.inOut",
        stagger: 0.5,
        repeat: -1,
        yoyo: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 via-background to-background" />
      
      {/* Decorative Elements */}
      <div className="float-element absolute top-20 left-[10%] w-24 h-24 border border-primary/30 rotate-45" 
        style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} 
      />
      <div className="float-element absolute bottom-20 right-[10%] w-32 h-32 border border-accent/30"
        style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
      />
      <div className="float-element absolute top-1/2 right-[20%] w-4 h-4 bg-primary/50 rounded-full" />
      <div className="float-element absolute top-1/3 left-[15%] w-3 h-3 bg-accent/50 rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={contentRef}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Icon with glow */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent mb-10 shadow-2xl glow-primary animate-pulse-glow">
            <Sparkles className="w-10 h-10 text-primary-foreground" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-8 leading-tight">
            Ready to bring your <br />
            <span className="text-gradient">ideas to life?</span>
          </h2>

          {/* Subheading */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Join thousands of teams who use Sketchflow to brainstorm, plan, and create together.
            Start for free—no credit card required.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button variant="hero" size="xl" className="group min-w-[220px]">
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="heroOutline" size="xl" className="min-w-[220px]">
              Talk to Sales
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
            {["Free forever plan", "No credit card required", "Setup in 30 seconds"].map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm tracking-wide">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
