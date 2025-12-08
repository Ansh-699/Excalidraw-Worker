import { useEffect, useRef } from "react";
import { Circle, Square, Type, Pencil, ArrowRight, Eraser, MousePointer2 } from "lucide-react";
import { gsap } from "@/hooks/useGSAP";

const CanvasPreview = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const tools = [
    { icon: MousePointer2, label: "Select" },
    { icon: Pencil, label: "Draw" },
    { icon: Square, label: "Rectangle" },
    { icon: Circle, label: "Circle" },
    { icon: ArrowRight, label: "Arrow" },
    { icon: Type, label: "Text" },
    { icon: Eraser, label: "Eraser" },
  ];

  useEffect(() => {
    if (!containerRef.current || !svgRef.current) return;

    const ctx = gsap.context(() => {
      // Toolbar animation
      gsap.fromTo(
        ".tool-btn",
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, delay: 0.5 }
      );

      // Collaborator avatars
      gsap.fromTo(
        ".collab-avatar",
        { scale: 0 },
        { scale: 1, duration: 0.4, stagger: 0.1, delay: 0.8, ease: "back.out(1.7)" }
      );

      // SVG drawing animations
      gsap.fromTo(
        ".sketch-rect",
        { strokeDashoffset: 1000 },
        { strokeDashoffset: 0, duration: 1.5, delay: 0.6, ease: "power2.out" }
      );

      gsap.fromTo(
        ".sketch-circle",
        { strokeDashoffset: 500 },
        { strokeDashoffset: 0, duration: 1.2, delay: 1, ease: "power2.out" }
      );

      gsap.fromTo(
        ".sketch-arrow",
        { strokeDashoffset: 200 },
        { strokeDashoffset: 0, duration: 0.8, delay: 1.4, ease: "power2.out" }
      );

      gsap.fromTo(
        ".sketch-lines",
        { strokeDashoffset: 300 },
        { strokeDashoffset: 0, duration: 0.6, stagger: 0.2, delay: 1.8, ease: "power2.out" }
      );

      // Cursors animation
      gsap.fromTo(
        ".cursor-indicator",
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.3, delay: 1.2 }
      );

      // Sketch text
      gsap.fromTo(
        ".sketch-text",
        { opacity: 0, rotate: -10 },
        { opacity: 1, rotate: -3, duration: 0.6, delay: 2 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Glow Effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/15 via-accent/15 to-primary/15 rounded-3xl blur-2xl" />
      
      {/* Main Canvas Container */}
      <div 
        className="relative bg-card border border-border shadow-2xl overflow-hidden"
        style={{
          clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))",
        }}
      >
        {/* Corner accent */}
        <div 
          className="absolute top-0 right-0 w-12 h-12 bg-primary/20"
          style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
        />

        {/* Toolbar */}
        <div className="flex items-center gap-2 p-3 border-b border-border bg-secondary/50">
          <div className="flex gap-1.5 mr-4">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          
          <div className="flex items-center gap-1 p-1 bg-background/50 rounded-lg border border-border">
            {tools.map((tool, index) => (
              <button
                key={tool.label}
                className={`tool-btn p-2 rounded-lg transition-colors ${
                  index === 1 ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-muted-foreground"
                }`}
              >
                <tool.icon className="w-4 h-4" />
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="flex -space-x-1">
              <div className="collab-avatar w-6 h-6 rounded-full bg-primary border-2 border-background" />
              <div className="collab-avatar w-6 h-6 rounded-full bg-accent border-2 border-background" />
              <div className="collab-avatar w-6 h-6 rounded-full bg-purple-500 border-2 border-background" />
            </div>
            <span className="text-xs text-muted-foreground tracking-wide">3 online</span>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="relative h-[400px] sm:h-[500px] bg-canvas">
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:20px_20px]" />

          {/* Sketched Elements */}
          <svg ref={svgRef} className="absolute inset-0 w-full h-full" viewBox="0 0 800 500">
            {/* Hand-drawn Rectangle */}
            <path
              className="sketch-rect"
              d="M 100 80 Q 102 78, 280 82 Q 284 84, 282 180 Q 280 184, 102 178 Q 98 176, 100 80"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="1000"
            />
            
            {/* Hand-drawn Circle */}
            <ellipse
              className="sketch-circle"
              cx="500"
              cy="130"
              rx="70"
              ry="65"
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="500"
            />

            {/* Arrow */}
            <path
              className="sketch-arrow"
              d="M 290 130 Q 350 100, 420 125"
              fill="none"
              stroke="hsl(var(--foreground))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="200"
              markerEnd="url(#arrowhead)"
            />
            
            {/* Arrow head */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--foreground))" />
              </marker>
            </defs>

            {/* Hand-drawn text placeholder lines */}
            <path
              className="sketch-lines"
              d="M 120 250 Q 180 248, 360 252"
              fill="none"
              stroke="hsl(var(--foreground))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="300"
            />
            <path
              className="sketch-lines"
              d="M 120 275 Q 160 273, 280 277"
              fill="none"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="300"
              opacity="0.5"
            />

            {/* Star/sparkle */}
            <path
              className="sketch-lines"
              d="M 650 280 L 655 265 L 660 280 L 675 275 L 660 280 L 665 295 L 660 280 L 645 285 Z"
              fill="hsl(var(--primary))"
            />
          </svg>

          {/* Floating Cursor Indicators */}
          <div className="cursor-indicator absolute top-[120px] left-[320px]">
            <div className="relative">
              <MousePointer2 className="w-4 h-4 text-accent rotate-[-90deg]" />
              <div className="absolute -bottom-5 left-2 px-2 py-0.5 bg-accent text-accent-foreground text-[10px] font-medium rounded whitespace-nowrap tracking-wide">
                Sarah
              </div>
            </div>
          </div>

          <div className="cursor-indicator absolute top-[250px] right-[200px]">
            <div className="relative">
              <MousePointer2 className="w-4 h-4 text-purple-500" />
              <div className="absolute -bottom-5 left-2 px-2 py-0.5 bg-purple-500 text-primary-foreground text-[10px] font-medium rounded whitespace-nowrap tracking-wide">
                Mike
              </div>
            </div>
          </div>

          {/* Sketch Text Label */}
          <div className="sketch-text absolute bottom-16 right-16 font-sketch text-2xl text-muted-foreground">
            ✨ Ideas happen here!
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasPreview;
