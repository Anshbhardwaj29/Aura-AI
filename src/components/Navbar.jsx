import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ChevronDown, Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/features/auth/components/AuthModal";

export function Navbar() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState("login");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openLogin = (e) => {
    if (e) e.preventDefault();
    setAuthView("login");
    setAuthModalOpen(true);
  };

  const openSignup = (e) => {
    if (e) e.preventDefault();
    setAuthView("signup");
    setAuthModalOpen(true);
  };

  return (
    <>
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        initialView={authView} 
      />
      <header className="relative z-50 w-full bg-transparent py-4">
        <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-8">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group z-10 w-40">
            <Sparkles className="h-6 w-6 text-aura-primary group-hover:text-aura-secondary transition-colors" />
            <span className="text-xl font-bold bg-gradient-to-r from-aura-primary to-aura-accent bg-clip-text text-transparent">
              Aura AI
            </span>
          </Link>

          {/* Center Navigation Details */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium absolute left-1/2 -translate-x-1/2 z-30 h-14">
            
            {/* Features Dropdown */}
            <div className="relative group h-full flex items-center">
              <div className="flex items-center gap-1 cursor-pointer text-foreground hover:text-aura-primary transition-colors group-hover:text-aura-primary">
                Features <ChevronDown className="h-4 w-4 opacity-50 group-hover:rotate-180 transition-transform duration-300"/>
              </div>
              
              <div className="absolute top-14 left-1/2 -translate-x-1/2 w-[320px] rounded-2xl bg-background/70 backdrop-blur-3xl border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 grid grid-cols-1 gap-1 p-3">
                <a href="#" className="p-3 rounded-xl hover:bg-white/5 dark:hover:bg-white/10 transition-colors flex flex-col group/item">
                  <span className="font-semibold text-foreground group-hover/item:text-aura-primary transition-colors">Deep Scholar Crawl</span>
                  <span className="text-xs text-muted-foreground mt-0.5">Live-scrape Google Scholar, Web of Science, & PubMed for the top 50 relevant papers.</span>
                </a>
                <a href="#" className="p-3 rounded-xl hover:bg-white/5 dark:hover:bg-white/10 transition-colors flex flex-col group/item">
                  <span className="font-semibold text-foreground group-hover/item:text-aura-primary transition-colors">Verified Indexing Shield</span>
                  <span className="text-xs text-muted-foreground mt-0.5">Automate real-time Scopus/WoS indexing and DOI integrity verification.</span>
                </a>
                <a href="#" className="p-3 rounded-xl hover:bg-white/5 dark:hover:bg-white/10 transition-colors flex flex-col group/item">
                  <span className="font-semibold text-foreground group-hover/item:text-aura-primary transition-colors">Structured PDF Drafts</span>
                  <span className="text-xs text-muted-foreground mt-0.5">One-click export for IEEE, Springer, and Nature formatted manuscripts.</span>
                </a>
                <a href="#" className="p-3 rounded-xl hover:bg-white/5 dark:hover:bg-white/10 transition-colors flex flex-col group/item">
                  <span className="font-semibold text-foreground group-hover/item:text-aura-primary transition-colors">Citation Integrity Agent</span>
                  <span className="text-xs text-muted-foreground mt-0.5">Real-time similarity checks, local reference matching, and tone optimization.</span>
                </a>
                <a href="#" className="p-3 rounded-xl hover:bg-white/5 dark:hover:bg-white/10 transition-colors flex flex-col group/item">
                  <span className="font-semibold text-foreground group-hover/item:text-aura-primary transition-colors">Knowledge Base Analytics</span>
                  <span className="text-xs text-muted-foreground mt-0.5">Interactive data visualization of discovered research clusters and trends.</span>
                </a>
              </div>
            </div>

            {/* Use Cases Dropdown */}
            <div className="relative group h-full flex items-center">
              <div className="flex items-center gap-1 cursor-pointer text-foreground hover:text-aura-primary transition-colors group-hover:text-aura-primary">
                Use Cases <ChevronDown className="h-4 w-4 opacity-50 group-hover:rotate-180 transition-transform duration-300"/>
              </div>
              
              <div className="absolute top-14 left-1/2 -translate-x-1/2 w-[550px] rounded-2xl bg-background/70 backdrop-blur-3xl border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 grid grid-cols-2 gap-3 p-4">
                <a href="#" className="p-2 rounded-xl hover:bg-white/5 dark:hover:bg-white/10 transition-colors flex flex-col gap-3 group/item overflow-hidden">
                  <div className="w-full h-28 bg-aura-primary/10 rounded-lg overflow-hidden border border-white/5 relative">
                    <div className="absolute inset-0 bg-aura-primary/20 opacity-0 group-hover/item:opacity-100 transition-opacity z-10" />
                    <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&q=80" alt="Lit Review" className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground text-sm block group-hover/item:text-aura-primary transition-colors">Streamline Lit Reviews</span>
                    <span className="text-xs text-muted-foreground">Build a structured research matrix from 50+ papers in minutes, not weeks.</span>
                  </div>
                </a>

                <a href="#" className="p-2 rounded-xl hover:bg-white/5 dark:hover:bg-white/10 transition-colors flex flex-col gap-3 group/item overflow-hidden">
                  <div className="w-full h-28 bg-aura-primary/10 rounded-lg overflow-hidden border border-white/5 relative">
                    <div className="absolute inset-0 bg-aura-primary/20 opacity-0 group-hover/item:opacity-100 transition-opacity z-10" />
                    <img src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&q=80" alt="Methodology" className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground text-sm block group-hover/item:text-aura-primary transition-colors">Draft Original Methodologies</span>
                    <span className="text-xs text-muted-foreground">Use the 'Methodology Wizard' to transform your raw data into formal academic frameworks.</span>
                  </div>
                </a>

                <a href="#" className="p-2 rounded-xl hover:bg-white/5 dark:hover:bg-white/10 transition-colors flex flex-col gap-3 group/item overflow-hidden">
                  <div className="w-full h-28 bg-aura-primary/10 rounded-lg overflow-hidden border border-white/5 relative">
                    <div className="absolute inset-0 bg-aura-primary/20 opacity-0 group-hover/item:opacity-100 transition-opacity z-10" />
                    <img src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&q=80" alt="Publishing" className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground text-sm block group-hover/item:text-aura-primary transition-colors">Ready-to-Submit Publishing</span>
                    <span className="text-xs text-muted-foreground">Generate final papers with 100% accurate citation mapping and automated formatting.</span>
                  </div>
                </a>

                <a href="#" className="p-2 rounded-xl hover:bg-white/5 dark:hover:bg-white/10 transition-colors flex flex-col gap-3 group/item overflow-hidden">
                  <div className="w-full h-28 bg-aura-primary/10 rounded-lg overflow-hidden border border-white/5 relative">
                    <div className="absolute inset-0 bg-aura-primary/20 opacity-0 group-hover/item:opacity-100 transition-opacity z-10" />
                    <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&q=80" alt="Validation" className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground text-sm block group-hover/item:text-aura-primary transition-colors">Verify Research Gaps</span>
                    <span className="text-xs text-muted-foreground">Identify overlooked areas in your field to frame a unique and defensible thesis topic.</span>
                  </div>
                </a>
              </div>
            </div>

            <a 
              href="#pricing" 
              onClick={(e) => { 
                e.preventDefault(); 
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }); 
              }} 
              className="text-foreground hover:text-aura-primary transition-colors h-full flex items-center cursor-pointer"
            >
              Pricing
            </a>
          </nav>

          {/* Right Action Menu */}
          <div className="flex items-center gap-6 z-20 justify-end">
            <button onClick={openLogin} className="hidden sm:inline-block text-sm font-medium text-foreground hover:text-aura-primary transition-colors cursor-pointer shrink-0">
              Login
            </button>
            <Button onClick={openSignup} className="rounded-full px-5 h-9 font-semibold hidden sm:inline-flex shadow-[0_0_15px_rgba(139,92,246,0.3)] cursor-pointer">
              Get Started
            </Button>
            <div className="pl-4 border-l border-border flex items-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
