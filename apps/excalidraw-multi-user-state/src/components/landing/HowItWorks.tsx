import { Timeline } from "@/components/ui/timeline";
import { Users } from "lucide-react";
import Lottie from "lottie-react";
import penAnimation from "@/assets/Pen draw(1)/animations/b85f0341-e926-4b35-a44d-cf161d35f99c.json";
import shareAnimation from "@/assets/Share(1)/animations/12345.json";
import shipAnimation from "@/assets/Space mail/animations/12345.json";
import aboutAnimation from "@/assets/About Us Team/animations/12345.json";

const HowItWorks = () => {
  const data = [
    {
      title: "Draw",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Start with a blank canvas or choose from templates. No sign-up needed to begin.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-20 w-full rounded-lg bg-gray-800 flex items-center justify-center md:h-44 lg:h-60">
              <Lottie animationData={penAnimation} loop={true} className="w-100 h-100" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Share",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Copy your unique link and send it to teammates. They join instantly.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-20 w-full rounded-lg bg-gray-800 flex items-center justify-center md:h-44 lg:h-60">
              <Lottie animationData={shareAnimation} loop={true} className="w-100 h-100" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Collaborate",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            See each other's cursors in real-time. Brainstorm, plan, and create as a team.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-20 w-full rounded-lg bg-gray-800 flex items-center justify-center md:h-44 lg:h-60">
              <Lottie animationData={aboutAnimation} loop={true} className="w-100 h-100" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Ship",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Export your work or embed it anywhere. Your sketches become reality.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-20 w-full rounded-lg bg-gray-800 flex items-center justify-center md:h-44 lg:h-60">
              <Lottie animationData={shipAnimation} loop={true} className="w-100 h-100" />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full" id="how-it-works">
      <Timeline data={data} />
    </div>
  );
};

export default HowItWorks;
