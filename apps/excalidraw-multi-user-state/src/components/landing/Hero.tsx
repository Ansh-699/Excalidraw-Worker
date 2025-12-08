import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users } from "lucide-react";
import CanvasPreview from "./CanvasPreview";
import { gsap, ScrollTrigger } from "@/hooks/useGSAP";
import { useNavigate } from "@tanstack/react-router";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleStartDrawing = () => {
    const roomId = Math.random().toString(36).substring(2, 9);
    navigate({ to: "/excalidraw/$id", params: { id: roomId } });
  };

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".hero-badge",
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8 }
      )
        .fromTo(
          headlineRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.4"
        )
        .fromTo(
          subheadRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          ".collaborators",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          canvasRef.current,
          { y: 100, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1.2 },
          "-=0.5"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:6rem_6rem]" />

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground tracking-wide">
              Collaborate in real-time with your team
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 tracking-tight"
          >
            Everything you need to{" "}
            <span className="font-sketch text-gradient text-shadow-glow px-2">sketch</span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadRef}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Draw, collaborate, and create together. A beautiful whiteboard for teams. Sketch ideas, share instantly, and watch your
            creativity flow in real-time. No sign-up required to start.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button variant="hero" size="xl" className="group" onClick={handleStartDrawing}>
              Start Drawing Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="heroOutline" size="xl">
              <Users className="w-5 h-5" />
              See it in action
            </Button>
          </div>

          {/* Live Collaborators Indicator */}
          <div className="collaborators flex items-center justify-center gap-3 mb-12">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background flex items-center justify-center text-xs font-bold text-primary-foreground"
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground tracking-wide">
              <span className="text-foreground font-semibold">2,000+</span> creators drawing right now
            </span>
          </div>

          {/* Canvas Preview */}
          <div ref={canvasRef}>
            <CanvasPreview />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
