import { HeroSection } from "@/features/home/components/HeroSection";
import { WorkflowSection } from "@/features/home/components/WorkflowSection";

export default function Home() {
  return (
    <div className="w-full flex flex-col pt-0 lg:pt-0">
      <HeroSection />
      <WorkflowSection />
    </div>
  );
}
