import { Link } from "react-router-dom";
import { Sparkles, Mail } from "lucide-react";

// Native SVG Icons for brands since Lucide-React deprecated them
const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/40 backdrop-blur-3xl pt-16 pb-8 text-sm text-muted-foreground transition-colors duration-300 relative z-10 w-full overflow-hidden">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 group mb-4 w-max">
              <Sparkles className="h-6 w-6 text-aura-primary group-hover:text-aura-secondary transition-colors" />
              <span className="text-xl font-bold bg-gradient-to-r from-aura-primary to-aura-accent bg-clip-text text-transparent">
                Aura AI
              </span>
            </Link>
            <p className="max-w-xs leading-relaxed mb-6 font-medium">
              The autonomous research swarm. Automating the academic lifecycle from data discovery to formatted formal IEEE methodology drafts.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 rounded-full border border-border hover:bg-white/5 hover:text-aura-primary transition-colors cursor-pointer">
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full border border-border hover:bg-white/5 hover:text-aura-primary transition-colors cursor-pointer">
                <GithubIcon className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full border border-border hover:bg-white/5 hover:text-aura-primary transition-colors cursor-pointer">
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Cols */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="#features" className="hover:text-aura-primary transition-colors">Features</Link></li>
              <li><Link to="#use-cases" className="hover:text-aura-primary transition-colors">Use Cases</Link></li>
              <li><Link to="#pricing" className="hover:text-aura-primary transition-colors">Pricing</Link></li>
              <li><a href="#" className="hover:text-aura-primary transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-aura-primary transition-colors">System Status</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="hover:text-aura-primary transition-colors">Research Blog</a></li>
              <li><a href="#" className="hover:text-aura-primary transition-colors">Tutorials</a></li>
              <li><a href="#" className="hover:text-aura-primary transition-colors">Community Discord</a></li>
              <li><a href="#" className="hover:text-aura-primary transition-colors">LaTeX Templates</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="hover:text-aura-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-aura-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-aura-primary transition-colors flex items-center gap-1">Contact <Mail className="w-3 h-3"/></a></li>
              <li><a href="#" className="hover:text-aura-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-aura-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold">
          <p>© {new Date().getFullYear()} Aura AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 cursor-help hover:text-emerald-400 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
