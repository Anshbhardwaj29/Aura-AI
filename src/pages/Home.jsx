import { HeroSection } from "@/features/home/components/HeroSection";
import { WorkflowSection } from "@/features/home/components/WorkflowSection";
import { ComparisonSection } from "@/features/home/components/ComparisonSection";
import { CTASection } from "@/features/home/components/CTASection";

export default function Home() {
  return (
    <div className="w-full flex flex-col pt-0 lg:pt-0">
      <HeroSection />
      <WorkflowSection />
      <ComparisonSection />
      <CTASection />
    </div>
  );
}
