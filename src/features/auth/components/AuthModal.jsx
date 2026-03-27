import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AuthModal({ isOpen, onClose, initialView = 'login' }) {
  const [view, setView] = useState(initialView);

  // Sync state if prop changes while closed
  useEffect(() => {
    if (isOpen) setView(initialView);
  }, [isOpen, initialView]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
        {/* Blurred Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm cursor-pointer"
        />
        
        {/* Central Modal Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-card/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
        >
          {/* Top Decorative Ambient Glow */}
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-aura-primary/20 to-transparent pointer-events-none" />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-white rounded-full hover:bg-white/10 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8 pt-10 flex flex-col relative z-10">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-aura-primary/10 border border-aura-primary/30 text-aura-primary mb-6 mx-auto shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <Sparkles className="w-6 h-6" />
            </div>

            <h2 className="text-2xl font-bold text-foreground text-center mb-2">
              {view === 'login' ? 'Welcome back to Aura' : 'Create your Aura account'}
            </h2>
            <p className="text-sm text-muted-foreground text-center mb-8">
              {view === 'login' 
                ? 'Enter your credentials to access your autonomous agents.' 
                : 'Join the next generation of academic research.'}
            </p>

            {/* Auth Form */}
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              {view === 'signup' && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="w-full bg-[#16161e] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-foreground outline-none focus:border-aura-primary transition-colors"
                  />
                </div>
              )}
              
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-[#16161e] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-foreground outline-none focus:border-aura-primary transition-colors"
                />
              </div>
              
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full bg-[#16161e] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-foreground outline-none focus:border-aura-primary transition-colors"
                />
              </div>

              {view === 'login' && (
                <div className="flex justify-end w-full">
                  <a href="#" className="text-xs text-aura-primary hover:text-aura-secondary transition-colors font-medium">
                    Forgot password?
                  </a>
                </div>
              )}

              <Button className="w-full mt-2 h-12 rounded-xl bg-aura-primary hover:bg-aura-secondary text-white font-semibold text-sm shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all">
                {view === 'login' ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold flex-shrink-0">or continue with</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="mt-6 flex gap-3">
              <button type="button" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium text-foreground">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                GitHub
              </button>
              <button type="button" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium text-foreground">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
            </div>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              {view === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setView(view === 'login' ? 'signup' : 'login')}
                className="text-aura-primary hover:text-aura-secondary font-semibold transition-colors"
              >
                {view === 'login' ? 'Sign up' : 'Log in'}
              </button>
            </p>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
