import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

export function ComparisonSection() {
  const comparisons = [
    {
      feature: "Data Discovery",
      standard: "Manual Google Scholar searches, endless tabs, and hours evaluating abstracts by eye.",
      aura: "Agentic Deep Crawl extracting 5,000+ papers, filtering dates and citations in seconds."
    },
    {
      feature: "Verification & Indexing",
      standard: "Guessing journal legitimacy or manually verifying Scopus indexing per paper.",
      aura: "Automated API pings to OpenAlex/Crossref violently querying Tier-A indexing authenticity."
    },
    {
      feature: "Data Synthesis",
      standard: "Reading and highlighting PDFs manually, losing track of critical references.",
      aura: "High-dimensional Vector Database embedding every sentence for perfect mathematical recall."
    },
    {
      feature: "Drafting & Formatting",
      standard: "Tedious manual MS Word formatting, copying LaTeX templates, and building bibliographies.",
      aura: "Autonomous LaTeX compilation mathematically injecting IEEE/Springer methodologies constraints."
    },
    {
      feature: "Editorial Integrity",
      standard: "Paying human editors or relying on basic Grammarly plugins to catch passive voice.",
      aura: "Autonomous Hover Agents enforcing academic tone constraints continuously in the background."
    }
  ];

  return (
    <section className="py-24 relative w-full bg-background overflow-hidden border-t border-border/40">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-aura-primary/5 blur-[120px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">The Research Paradigm Shift</h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              How Aura AI's swarm architecture crushes traditional academic bottlenecks to deliver pristine publications in record time.
            </p>
          </motion.div>
        </div>

        {/* Desktop View (Row-Linked Grid) */}
        <div className="hidden md:flex flex-col gap-4">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-6 px-6 pb-4 border-b border-border/50 text-sm font-bold uppercase tracking-wider text-muted-foreground">
            <div className="col-span-3 xl:col-span-2">Workflow Phase</div>
            <div className="col-span-4 xl:col-span-5 flex items-center gap-2 text-red-400">
              <XCircle className="w-5 h-5"/> Standard Method
            </div>
            <div className="col-span-5 flex items-center gap-2 text-aura-primary">
              <CheckCircle2 className="w-5 h-5"/> Aura AI Autonomous Swarm
            </div>
          </div>

          {/* Comparison Rows */}
          {comparisons.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="grid grid-cols-12 gap-6 p-6 rounded-2xl bg-card/20 border border-border/40 hover:bg-card/40 transition-colors items-center"
            >
              <div className="col-span-3 xl:col-span-2 font-semibold text-foreground text-sm xl:text-base">
                {item.feature}
              </div>
              <div className="col-span-4 xl:col-span-5 text-muted-foreground text-sm leading-relaxed pr-6">
                {item.standard}
              </div>
              <div className="col-span-5 text-foreground text-sm leading-relaxed font-medium bg-aura-primary/10 border border-aura-primary/20 p-5 rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.1)] relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-1 h-full bg-aura-primary" />
                 {item.aura}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View (Cards Stack) */}
        <div className="flex flex-col gap-6 md:hidden">
          {comparisons.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col bg-card/20 border border-border/40 rounded-2xl overflow-hidden"
            >
              <div className="p-4 bg-muted/40 border-b border-border/50 font-bold text-foreground text-center">
                {item.feature}
              </div>
              <div className="p-5 flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.standard}</p>
                </div>
                <div className="h-px w-full bg-border/50 my-1" />
                <div className="flex items-start gap-3 bg-aura-primary/10 p-4 rounded-xl border border-aura-primary/20 shadow-[0_0_15px_rgba(139,92,246,0.05)]">
                  <CheckCircle2 className="w-5 h-5 text-aura-primary shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-foreground leading-relaxed">{item.aura}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
