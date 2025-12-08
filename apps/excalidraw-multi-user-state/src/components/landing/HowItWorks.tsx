import { useEffect, useRef } from "react";
import { Pencil, Link2, Users, Sparkles } from "lucide-react";
import { gsap, ScrollTrigger } from "@/hooks/useGSAP";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    icon: Pencil,
    title: "Create a canvas",
    description: "Start with a blank canvas or choose from templates. No sign-up needed to begin.",
  },
  {
    number: "02",
    icon: Link2,
    title: "Share the link",
    description: "Copy your unique link and send it to teammates. They join instantly.",
  },
  {
    number: "03",
    icon: Users,
    title: "Draw together",
    description: "See each other's cursors in real-time. Brainstorm, plan, and create as a team.",
  },
  {
    number: "04",
    icon: Sparkles,
    title: "Ship your ideas",
    description: "Export your work or embed it anywhere. Your sketches become reality.",
  },
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Header animation
      tl.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
        // Timeline line draw
        .fromTo(
          ".timeline-line",
          { scaleY: 0 },
          { scaleY: 1, duration: 1, ease: "power2.inOut" },
          "-=0.4"
        )
        // Steps stagger
        .fromTo(
          ".step-card",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: "back.out(1.2)" },
          "-=0.8"
        )
        // Step numbers pop
        .fromTo(
          ".step-number",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, stagger: 0.2, ease: "back.out(2)" },
          "<"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-20">
          <span className="inline-block text-accent font-semibold text-sm uppercase tracking-widest mb-4">How it works</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            From idea to canvas in{" "}
            <span className="text-gradient">seconds</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Getting started is as simple as opening your browser. No downloads, no setup.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="max-w-4xl mx-auto relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden lg:block">
            <div className="timeline-line w-full h-full bg-gradient-to-b from-primary via-accent to-primary/50 origin-top" />
          </div>

          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`step-card relative flex items-center gap-8 mb-16 last:mb-0 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
            >
              {/* Step Number Circle */}
              <div className="step-number absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 hidden lg:flex glow-primary shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                <span className="text-xl font-bold text-primary">{step.number}</span>
              </div>

              {/* Horizontal Connector */}
              <div className={`hidden lg:block absolute top-1/2 w-12 h-px bg-primary/30 ${index % 2 === 0 ? "right-[50%] mr-8" : "left-[50%] ml-8"
                }`} />

              {/* Step Card */}
              <div className={`flex-1 ${index % 2 === 1 ? "lg:pr-24" : "lg:pl-24"}`}>
                <div
                  className="relative p-8 bg-card border border-border rounded-2xl overflow-hidden group hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,0,0,0.2)]"
                >
                  {/* Mobile step number */}
                  <div className="lg:hidden flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{step.number}</span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-500">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-foreground mb-3 tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {/* Hover accent */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

              {/* Spacer for alignment */}
              <div className="hidden lg:block flex-1" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
