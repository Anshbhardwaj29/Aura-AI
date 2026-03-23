import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp, Sparkles, Globe, Zap, ShieldAlert } from "lucide-react"
import { HeroAgentVisualizer } from "@/features/home/components/HeroAgentVisualizer"

const InteractivePrompt = () => {
  const phrases = [
    "Draft a 15-page IEEE review on Quantum Computing...",
    "Deep crawl Google Scholar for recent LLaMA models...",
    "Format my empirical dataset into Springer methodology..."
  ];
  const [placeholderText, setPlaceholderText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Pause typing effect if user is actively interacting with real input
    if (inputValue.length > 0) return;

    const currentPhrase = phrases[phraseIndex];
    let timeoutId;

    if (isDeleting) {
      if (placeholderText.length === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      } else {
        timeoutId = setTimeout(() => setPlaceholderText(currentPhrase.substring(0, placeholderText.length - 1)), 25);
      }
    } else {
      if (placeholderText.length === currentPhrase.length) {
        timeoutId = setTimeout(() => setIsDeleting(true), 2500);
      } else {
        timeoutId = setTimeout(() => setPlaceholderText(currentPhrase.substring(0, placeholderText.length + 1)), 50);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [placeholderText, isDeleting, phraseIndex, inputValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 3000);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="relative flex items-center bg-background/60 backdrop-blur-2xl border border-aura-primary/40 rounded-full p-2 pl-4 pr-2 shadow-[0_0_40px_rgba(139,92,246,0.2)] hover:shadow-[0_0_50px_rgba(139,92,246,0.3)] transition-shadow duration-300 w-full"
    >
      <Sparkles className="h-6 w-6 text-aura-secondary flex-shrink-0 ml-2 animate-pulse" />
      
      <div className="relative flex-1 mx-4 h-full flex items-center min-h-[40px]">
        {/* Simulated Typing Placeholder (Only visible if real input is empty) */}
        {!inputValue && (
          <div className="absolute inset-x-0 pointer-events-none text-left font-mono text-sm sm:text-base md:text-lg text-muted-foreground whitespace-nowrap overflow-hidden flex items-center">
            {placeholderText}
            <span className="animate-pulse text-aura-primary ml-1 inline-block w-2 bg-aura-primary h-5" />
          </div>
        )}
        
        {/* Actual Interactive Input */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full h-full bg-transparent border-none outline-none text-foreground font-mono text-sm sm:text-base md:text-lg z-10"
        />
      </div>

      <div className="relative">
        <button 
          type="submit"
          disabled={!inputValue.trim()}
          className="flex-shrink-0 h-12 w-12 md:h-14 md:w-14 bg-aura-primary hover:bg-aura-primary/90 text-white rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 shadow-md z-20 relative"
        >
          <ArrowUp className="h-6 w-6" />
        </button>

        {/* Dynamic Login Tooltip built with Framer Motion */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full right-0 mb-4 w-max px-4 py-3 bg-card/95 text-card-foreground text-sm font-semibold rounded-xl shadow-2xl backdrop-blur-md border border-aura-primary/30 flex items-center gap-2 z-50"
            >
              <ShieldAlert className="h-4 w-4 text-aura-primary" />
              Please login first to deploy agents.
              <div className="absolute -bottom-2 right-6 w-4 h-4 bg-card/95 border-b border-r border-aura-primary/30 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden w-full flex flex-col items-center justify-center min-h-[85vh] text-center pt-20 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center"
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
          className="w-full max-w-3xl px-4 flex flex-col items-center"
        >
          <InteractivePrompt />
        </motion.div>
        
        {/* Animated Agent Graph and Terminal */}
        <HeroAgentVisualizer />
      </motion.div>
    </section>
  )
}
