import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ShieldCheck, Database, FileText, Wand2, Terminal } from "lucide-react";

export function HeroAgentVisualizer() {
  const [activeNode, setActiveNode] = useState(0);
  const [logs, setLogs] = useState([]);
  const terminalBodyRef = useRef(null);

  const fullWorkflow = [
    {
      source: "SYSTEM",
      color: "text-blue-400",
      nodeIndex: 0,
      lines: ["Initializing Aura Swarm Protocol v1.4...", "Booting Deep Crawl Agent..."]
    },
    {
      source: "CRAWL",
      color: "text-aura-primary",
      nodeIndex: 1,
      lines: ["Scraping Google Scholar for target DOIs...", "Located 14,204 papers matching 'Quantum Computing'.", "Executing date-range boundaries (> 2024)..."]
    },
    {
      source: "VERIFIER",
      color: "text-emerald-400",
      nodeIndex: 2,
      lines: ["Pinging OpenAlex API for index validation...", "Discarding 14,154 low-tier sources.", "50 pristine indexing hits confirmed."]
    },
    {
      source: "DATABASE",
      color: "text-aura-secondary",
      nodeIndex: 3,
      lines: ["Compiling vector matrices...", "Project Research Database successfully isolated."]
    },
    {
      source: "DRAFTER",
      color: "text-aura-accent",
      nodeIndex: 4,
      lines: ["Executing LaTeX compiler...", "Applying default IEEE formal conference template...", "Constructing logical branch frameworks..."]
    },
    {
      source: "HOVER",
      color: "text-purple-400",
      nodeIndex: 5,
      lines: ["Deploying independent citation validation agents.", "Scanning academic tone...", "Zero anomalies detected. Structure is flawless."]
    }
  ];

  useEffect(() => {
    let stepIndex = 0;
    let lineIndex = 0;
    let mounted = true;

    const streamLogs = () => {
      if (!mounted) return;
      if (stepIndex >= fullWorkflow.length) {
        // Complete, reset after a long delay to loop the animation
        setTimeout(() => {
          if (mounted) {
            setLogs([]);
            setActiveNode(0);
            stepIndex = 0;
            lineIndex = 0;
            streamLogs();
          }
        }, 5000);
        return;
      }

      const currentStep = fullWorkflow[stepIndex];
      setActiveNode(currentStep.nodeIndex);

      setLogs(prev => [...prev, {
        source: currentStep.source,
        text: currentStep.lines[lineIndex],
        color: currentStep.color,
        id: Math.random()
      }]);

      lineIndex++;
      if (lineIndex >= currentStep.lines.length) {
        stepIndex++;
        lineIndex = 0;
        setTimeout(streamLogs, 1500); // Wait bit before jumping to next agent
      } else {
        setTimeout(streamLogs, 600); // Delay between typing lines
      }
    };

    setTimeout(streamLogs, 1000); // initial start delay
    return () => { mounted = false };
  }, []);

  // Auto scroll terminal without forcing the whole page to jump
  useEffect(() => {
    if (terminalBodyRef.current) {
      const { scrollHeight, clientHeight } = terminalBodyRef.current;
      terminalBodyRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
    }
  }, [logs]);

  const nodes = [
    { icon: Globe, label: "Deep Crawl", desc: "Scraping Data" },
    { icon: ShieldCheck, label: "Verifier", desc: "Checking Output" },
    { icon: Database, label: "DB Manager", desc: "Vector Mapping" },
    { icon: FileText, label: "Drafter", desc: "LaTeX Compilation" },
    { icon: Wand2, label: "Hover Agent", desc: "Tone Polish" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="w-full max-w-[1200px] mx-auto mt-16 flex flex-col gap-8 px-4"
    >
      
      {/* Responsive Node Network Visualizer (No Horizontal Scrolling) */}
      <div className="w-full flex justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-center w-full">
          {nodes.map((node, i) => {
            const isActive = activeNode === i + 1;
            const isPassed = activeNode > i + 1;
            
            return (
              <div key={i} className="flex flex-col lg:flex-row items-center">
                
                {/* Visual Node */}
                <div className={`relative flex items-center gap-2 xl:gap-3 p-2.5 xl:p-3 bg-background/50 backdrop-blur-xl border rounded-[1rem] shadow-xl transition-all duration-500 w-[260px] sm:w-[320px] lg:w-[155px] xl:w-[190px] ${isActive ? 'border-aura-primary shadow-[0_0_20px_rgba(139,92,246,0.3)] lg:-translate-y-1' : isPassed ? 'border-emerald-500/50' : 'border-border'}`}>
                  <div className={`p-2 rounded-lg transition-colors duration-500 flex-shrink-0 ${isActive ? 'bg-aura-primary/20 text-aura-primary' : isPassed ? 'bg-emerald-500/10 text-emerald-500' : 'bg-muted text-muted-foreground'}`}>
                    <node.icon className="h-4 w-4 xl:h-5 xl:w-5" />
                  </div>
                  <div className="flex flex-col text-left overflow-hidden">
                    <span className="text-[13px] xl:text-sm font-semibold text-foreground leading-tight truncate">{node.label}</span>
                    <span className="text-[10px] text-muted-foreground mt-0.5 truncate">{node.desc}</span>
                  </div>
                  {/* Ping Indicator */}
                  {isActive && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aura-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-aura-primary"></span>
                    </span>
                  )}
                </div>

                {/* Animated Data Connection Line */}
                {i < nodes.length - 1 && (
                  <div className="flex items-center justify-center overflow-hidden">
                    {/* Desktop Line (Horizontal) */}
                    <div className={`hidden lg:block h-[3px] w-[18px] xl:w-[30px] relative rounded-full mx-1 transition-colors duration-500 ${isPassed || isActive ? 'bg-aura-primary/20' : 'bg-border'}`}>
                      {(isActive || isPassed) && (
                        <motion.div 
                          initial={{ x: "-100%" }}
                          animate={{ x: "200%" }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 h-full w-1/2 bg-gradient-to-r from-transparent via-aura-primary to-transparent"
                        />
                      )}
                    </div>

                    {/* Mobile/Tablet Line (Vertical) */}
                    <div className={`lg:hidden w-[3px] h-[25px] sm:h-[35px] relative rounded-full my-1 transition-colors duration-500 ${isPassed || isActive ? 'bg-aura-primary/20' : 'bg-border'}`}>
                      {(isActive || isPassed) && (
                        <motion.div 
                          initial={{ y: "-100%" }}
                          animate={{ y: "200%" }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 w-full h-1/2 bg-gradient-to-b from-transparent via-aura-primary to-transparent"
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Terminal Console */}
      <div className="w-full bg-[#0d0d12] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-left relative group">
        {/* Terminal Header */}
        <div className="border-b border-white/5 bg-[#16161e] px-4 py-3 flex items-center gap-2">
          <div className="flex gap-1.5 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          </div>
          <Terminal className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-mono text-muted-foreground">aura-ai-agent-v1.sh</span>
        </div>
        
        {/* Terminal Body */}
        <div ref={terminalBodyRef} className="p-4 h-[250px] overflow-y-auto font-mono text-sm leading-relaxed scroll-smooth flex flex-col">
          <AnimatePresence initial={false}>
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-4 mb-2"
              >
                <span className="text-slate-500 shrink-0 whitespace-nowrap">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
                <span className={`shrink-0 font-semibold ${log.color} w-[80px]`}>{log.source}</span>
                <span className="text-slate-300 break-words">{log.text}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          {/* Typing Cursor */}
          <div className="flex items-center gap-4 mt-2 mb-4">
            <span className="text-slate-500 shrink-0 opacity-0">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
            <span className="w-2 h-4 bg-aura-primary animate-pulse inline-block" />
          </div>
        </div>
      </div>

    </motion.div>
  )
}
