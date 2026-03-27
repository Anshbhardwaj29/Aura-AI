import { motion } from "framer-motion";
import { ArrowRight, Sparkles, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-32 md:py-40 relative w-full flex justify-center px-4 sm:px-8">
      
      {/* Massive Full-Width Ambient Glows seamlessly blending into the global layout */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[400px] bg-aura-primary/10 blur-[150px] rounded-[100%] pointer-events-none z-0" />
        
      {/* Seamless Dotted Grid Background Pattern covering the entire section */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CgkJPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPgo8L3N2Zz4=')] opacity-40 z-0" />
      {/* Gradient Overlay to fade the dotted grid cleanly into the strict background color at the top and bottom edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-0 pointer-events-none" />

      {/* Content Wrapper */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center w-full max-w-4xl text-center"
      >
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-aura-primary/10 border border-aura-primary/30 text-aura-primary text-sm font-semibold mb-8 shadow-[0_0_30px_rgba(139,92,246,0.15)] backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4" /> Academic Rigor, Automated.
        </motion.div>
        
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
          Stop chasing citations.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-aura-primary via-aura-secondary to-aura-accent">
            Start publishing.
          </span>
        </h2>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
          Deploy your first autonomous research swarm today. Let Aura AI handle the heavy lifting of crawling, verifying, embedding, and formatting your next PhD methodology.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-5 w-full justify-center">
          <Button size="lg" className="w-full sm:w-auto h-14 px-8 rounded-full text-base font-bold shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_50px_rgba(139,92,246,0.5)] group transition-all duration-300">
            Deploy Agents Now <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 rounded-full text-base font-bold bg-background/50 backdrop-blur-md border-border hover:bg-white/5 hover:text-foreground group transition-colors">
            <FileText className="mr-2 w-5 h-5 group-hover:-translate-y-1 transition-transform" /> View Output Samples
          </Button>
        </div>

      </motion.div>
    </section>
  );
}
