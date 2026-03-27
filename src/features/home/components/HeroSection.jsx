import { motion } from "framer-motion";
import { HeroAgentVisualizer } from "@/features/home/components/HeroAgentVisualizer";
import { InteractiveChatbox } from "@/components/ui/InteractiveChatbox";

const placeholders = [
  "Draft a 15-page IEEE review on Quantum Computing...",
  "Deep crawl Google Scholar for recent LLaMA models...",
  "Format my empirical dataset into Springer methodology..."
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden w-full flex flex-col items-center justify-center min-h-[85vh] text-center pt-20 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center w-full"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground max-w-4xl mb-6 leading-[1.1]">
          Launch Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-aura-primary via-aura-secondary to-aura-accent">Intelligent Research</span> Swarm
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed px-4">
          Aura AI orchestrates specialized agents crawling databases, verifying sources, and drafting formal IEEE methodology papers while you supervise.
        </p>

        {/* Central Agent Chat Input Interface */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-3xl px-4 flex flex-col items-center mb-8"
        >
          <InteractiveChatbox 
            placeholders={placeholders} 
            showLoginTooltip={true} 
          />
        </motion.div>
        
        {/* Animated Agent Graph and Terminal */}
        <HeroAgentVisualizer />
      </motion.div>
    </section>
  )
}
