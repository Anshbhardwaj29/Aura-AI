import { motion } from "framer-motion";
import { ArrowDown, Database, Globe, ShieldCheck, FileText, Wand2, Terminal } from "lucide-react";

const agents = [
  {
    name: "Deep Crawl Agent",
    icon: Globe,
    colorClass: "bg-blue-500/20 text-blue-500",
    outputColor: "text-blue-400 border-blue-500/20 bg-blue-500/10",
    desc: "Takes your raw English prompt and systematically live-scrapes academic databases (Google Scholar, Web of Science) to pull massive lists of potential raw data.",
    input: `{"prompt": "Draft review on Quantum Computing", "limit": 5000}`,
    action: "Scraping DOM structures. Bypassing captchas...",
    output: "[5,200 raw academic URLs extracted]"
  },
  {
    name: "Indexing Verifier",
    icon: ShieldCheck,
    colorClass: "bg-emerald-500/20 text-emerald-500",
    outputColor: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
    desc: "The verifier intercepts the raw URL list, extracts DOIs, and pings authentication APIs like OpenAlex and Scopus to violently filter out unindexed or predatory journals.",
    input: "[5,200 raw academic URLs extracted]",
    action: "Pinging OpenAlex API. Validating Scopus index.",
    output: "[50 Tier-A Indexed DOIs isolated]"
  },
  {
    name: "Database Manager",
    icon: Database,
    colorClass: "bg-aura-secondary/20 text-aura-secondary",
    outputColor: "text-aura-secondary border-aura-secondary/20 bg-aura-secondary/10",
    desc: "Downloads the 50 verified papers, parses the PDFs into text, and embeds them into a specialized high-dimensional Vector Database strictly dedicated to your project.",
    input: "[50 Tier-A Indexed DOIs isolated]",
    action: "Parsing PDFs. Generating 1536-dim vector embeddings...",
    output: "Project Context Vector Space Initialized"
  },
  {
    name: "LaTeX Drafter",
    icon: FileText,
    colorClass: "bg-aura-accent/20 text-aura-accent",
    outputColor: "text-aura-accent border-aura-accent/20 bg-aura-accent/10",
    desc: "Reads from the vector database and systematically writes logical academic prose. Automatically applies complex IEEE or Springer specific formatting templates.",
    input: "Project Context Vector Space Initialized",
    action: "Compiling LaTeX. Generating \\section{Methodology}...",
    output: "IEEE_Draft_v1.tex"
  },
  {
    name: "Tone Hover Agent",
    icon: Wand2,
    colorClass: "bg-purple-500/20 text-purple-500",
    outputColor: "text-purple-400 border-purple-500/20 bg-purple-500/10",
    desc: "A final autonomous read-through. The Hover agent rigorously enforces passive academic voice, verifies internal citation logic, and fixes flow anomalies before final export.",
    input: "IEEE_Draft_v1.tex",
    action: "Converting active voice to passive. Checking citations.",
    output: "Final_Verified_Deliverable.pdf"
  }
];

export function WorkflowSection() {
  return (
    <section id="workflow" className="pt-32 pb-0 relative w-full bg-background overflow-hidden border-t border-border/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">The Autonomous Agent Chain</h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Watch exactly how Aura AI passes your input through 5 specialized agents. Notice how the output of one agent becomes the exact payload for the next.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          {/* Central Vertical Timeline Line (Desktop Only) */}
          <div className="absolute left-[50%] top-6 bottom-6 w-[2px] bg-border transform -translate-x-1/2 hidden md:block" />

          {agents.map((agent, i) => {
            const isEven = i % 2 === 0;
            const isLast = i === agents.length - 1;

            return (
              <div key={i} className={`relative flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 items-center ${isLast ? 'mb-16' : 'mb-20 md:mb-32'}`}>
                
                {/* Visual Connector Arrow from previous step */}
                {i !== 0 && (
                  <div className="md:absolute top-[-3rem] md:top-[-4rem] left-1/2 transform md:-translate-x-1/2 z-10 flex items-center justify-center -my-4 md:my-0">
                    <div className="bg-background p-2 rounded-full border border-border shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                      <ArrowDown className="text-aura-primary w-5 h-5 animate-bounce" />
                    </div>
                  </div>
                )}
                
                {/* Agent Description Side */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`flex flex-col gap-4 ${isEven ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left md:col-start-2'} text-center md:text-left`}
                >
                  <div className={`inline-flex items-center gap-3 justify-center md:justify-start ${isEven ? 'md:flex-row-reverse' : ''}`}>
                    <div className={`p-4 rounded-2xl ${agent.colorClass} shadow-lg`}>
                      <agent.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground">{agent.name}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-base md:text-lg">{agent.desc}</p>
                </motion.div>

                {/* Mock UI Terminal Side */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`w-full ${isEven ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1'}`}
                >
                   {/* Black terminal box simulating the agent running */}
                   <div className="bg-[#0a0a0f] border border-white/10 rounded-2xl shadow-2xl p-6 font-mono text-xs md:text-sm relative group overflow-hidden text-left hover:border-white/20 transition-colors">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-aura-primary to-transparent opacity-30 group-hover:opacity-100 transition-opacity" />
                      
                      {/* Incoming Payload Block */}
                      <div className="mb-6">
                        <span className="text-slate-500 uppercase text-[10px] md:text-xs tracking-wider font-bold mb-2 block flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-slate-500"></div> Incoming Payload
                        </span>
                        <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-slate-300 break-words whitespace-pre-wrap">
                          {agent.input}
                        </div>
                      </div>

                      {/* Running Execution Block */}
                      <div className="mb-6">
                        <span className="text-slate-500 uppercase text-[10px] md:text-xs tracking-wider font-bold mb-2 block flex items-center gap-2">
                          <Terminal className="w-3 h-3 text-aura-secondary animate-pulse" /> Executing Logic
                        </span>
                        <div className="text-aura-secondary/90 flex items-center gap-2">
                          <span>{agent.action}</span>
                        </div>
                      </div>

                      {/* Output Emit Result Block */}
                      <div>
                        <span className="text-slate-500 uppercase text-[10px] md:text-xs tracking-wider font-bold mb-2 block flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Passing Output
                        </span>
                        <div className={`p-3 border rounded-lg break-words font-semibold ${agent.outputColor}`}>
                          {agent.output}
                        </div>
                      </div>

                   </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
