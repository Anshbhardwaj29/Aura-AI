import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Paperclip, SlidersHorizontal, AlertCircle, X, Check, Info } from 'lucide-react';

export function InteractiveChatbox({ 
  placeholders = ["Type a message..."], 
  onSubmit, 
  showLoginTooltip = false,
  className = "" 
}) {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [placeholderText, setPlaceholderText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const textareaRef = useRef(null);

  // Filter & Info State Management
  const [showFilters, setShowFilters] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [filters, setFilters] = useState({
    yearRange: "any",
    customStart: "",
    customEnd: "",
    q1Only: false,
    openAccess: false,
    paperType: "all"
  });

  // Auto-resize textarea logic
  const handleInput = (e) => {
    setInputValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height bounds
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`; // Adjust up to 200px max
    }
  };

  // Re-implement the Typewriter effect for placeholders
  useEffect(() => {
    if (!placeholders || placeholders.length === 0) return;
    
    let timeout;
    if (isTyping) {
      if (placeholderText.length < placeholders[currentPlaceholderIndex].length) {
        timeout = setTimeout(() => {
          setPlaceholderText(placeholders[currentPlaceholderIndex].slice(0, placeholderText.length + 1));
        }, 40); // Natural Typing speed
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2500); // Pause at end before deleting
      }
    } else {
      if (placeholderText.length > 0) {
        timeout = setTimeout(() => {
          setPlaceholderText(placeholderText.slice(0, -1));
        }, 20); // Faster deleting speed
      } else {
        setCurrentPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        setIsTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [placeholderText, isTyping, currentPlaceholderIndex, placeholders]);

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!inputValue.trim()) return;

    if (showLoginTooltip) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
    } else if (onSubmit) {
      onSubmit({ prompt: inputValue, constraints: filters });
      setInputValue("");
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Calculate active filters badge count
  const activeFiltersCount = 
    (filters.yearRange !== 'any' ? 1 : 0) + 
    (filters.q1Only ? 1 : 0) + 
    (filters.openAccess ? 1 : 0) + 
    (filters.paperType !== 'all' ? 1 : 0);

  return (
    <div className={`relative w-full z-50 ${className}`}>

      {/* Advanced Research Constraints Overlay (Compact Filter Card) */}
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-[4.5rem] left-0 md:left-4 w-[280px] bg-white/95 dark:bg-background/80 backdrop-blur-2xl border border-black/10 dark:border-white/10 rounded-2xl shadow-[0_0_40px_rgba(139,92,246,0.15)] z-[100] overflow-hidden text-left flex flex-col"
          >
            {/* Popover Header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5">
              <span className="font-semibold text-xs flex items-center gap-1.5 text-foreground">
                <SlidersHorizontal className="w-3.5 h-3.5 text-aura-primary" /> Search Filters
              </span>
              <button 
                type="button" 
                onClick={() => setShowFilters(false)} 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Popover Body - Super Compact */}
            <div className="p-3 flex flex-col gap-3">
              
              {/* Publication Year */}
              <div className="flex items-center justify-between gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground w-1/3">Time</label>
                <select 
                  className="w-2/3 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md p-1.5 text-xs text-foreground outline-none focus:border-aura-primary transition-colors cursor-pointer"
                  value={filters.yearRange}
                  onChange={(e) => setFilters({...filters, yearRange: e.target.value})}
                >
                  <option value="any">All Time</option>
                  <option value="1">Last 1 Year</option>
                  <option value="3">Last 3 Years</option>
                  <option value="5">Last 5 Years</option>
                  <option value="custom">Custom...</option>
                </select>
              </div>

              {/* Custom Date Row (Only visible if Custom is selected) */}
              {filters.yearRange === 'custom' && (
                <div className="flex items-center gap-2 w-full pl-[33%] -mt-1">
                  <input type="number" placeholder="From" value={filters.customStart} onChange={(e) => setFilters({...filters, customStart: e.target.value})} className="w-1/2 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md p-1.5 text-xs text-center text-foreground outline-none focus:border-aura-primary" />
                  <span className="text-muted-foreground text-xs">-</span>
                  <input type="number" placeholder="To" value={filters.customEnd} onChange={(e) => setFilters({...filters, customEnd: e.target.value})} className="w-1/2 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md p-1.5 text-xs text-center text-foreground outline-none focus:border-aura-primary" />
                </div>
              )}

              {/* Methodology Type */}
              <div className="flex items-center justify-between gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground w-1/3">Type</label>
                <select 
                  className="w-2/3 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md p-1.5 text-xs text-foreground outline-none focus:border-aura-primary transition-colors cursor-pointer"
                  value={filters.paperType}
                  onChange={(e) => setFilters({...filters, paperType: e.target.value})}
                >
                  <option value="all">Any Type</option>
                  <option value="systematic">Systematic Review</option>
                  <option value="empirical">Empirical Study</option>
                  <option value="clinical">Clinical Trial</option>
                </select>
              </div>

              {/* Toggles */}
              <div className="flex flex-col gap-2 pt-2 border-t border-black/5 dark:border-white/5">
                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Scopus Q1 Indexed</span>
                  <div className={`w-4 h-4 rounded-sm flex items-center justify-center border transition-all duration-300 ${filters.q1Only ? 'bg-aura-primary border-aura-primary shadow-[0_0_10px_rgba(139,92,246,0.3)]' : 'border-black/20 dark:border-white/20'}`}>
                    {filters.q1Only && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <input type="checkbox" className="hidden" checked={filters.q1Only} onChange={(e) => setFilters({...filters, q1Only: e.target.checked})} />
                </label>
                
                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Open Access PDF</span>
                  <div className={`w-4 h-4 rounded-sm flex items-center justify-center border transition-all duration-300 ${filters.openAccess ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'border-black/20 dark:border-white/20'}`}>
                    {filters.openAccess && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <input type="checkbox" className="hidden" checked={filters.openAccess} onChange={(e) => setFilters({...filters, openAccess: e.target.checked})} />
                </label>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Tooltip Overlay (Moved OUTSIDE form to completely prevent overflow-hidden clipping errors) */}
      <AnimatePresence>
        {showInfo && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-[4.5rem] left-10 md:left-24 w-[280px] bg-white/95 dark:bg-background/80 backdrop-blur-2xl border border-black/10 dark:border-white/10 text-foreground p-4 rounded-2xl text-xs leading-relaxed shadow-[0_0_40px_rgba(139,92,246,0.15)] z-[100]"
          >
            Choose filters to mathematically tighten your search query constraints, and add attachment documents if you possess existing datasets you'd like indexed.
            <button 
              onClick={() => setShowInfo(false)} 
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-full p-1 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
            {/* Small triangle pointer pointing to Info icon */}
            <div className="absolute -bottom-2 left-6 md:left-4 w-4 h-4 bg-white/95 dark:bg-background/80 border-b border-r border-black/10 dark:border-white/10 transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <form 
        onSubmit={handleSubmit}
        className={`relative flex flex-col w-full bg-white/95 dark:bg-[#0a0a0f]/80 backdrop-blur-3xl border transition-all duration-300 rounded-[10px] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-2xl overflow-hidden ${
          isFocused ? 'border-aura-primary shadow-[0_0_30px_rgba(139,92,246,0.15)] ring-1 ring-aura-primary/30' : 'border-black/10 hover:border-black/20 dark:border-white/10 dark:hover:border-white/20'
        }`}
      >
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={isFocused ? "" : placeholderText}
          className="w-full bg-transparent border-none outline-none text-foreground placeholder-muted-foreground/70 resize-none px-4 pt-4 pb-2 min-h-[60px] max-h-[200px] text-[15px] leading-relaxed scrollbar-thin scrollbar-thumb-black/10 dark:scrollbar-thumb-white/10"
          rows={1}
          style={{ overflowY: inputValue.split('\n').length > 5 ? 'auto' : 'hidden' }}
        />

        {/* Lower Media/Filter Toolbar */}
        <div className="flex items-center justify-between px-3 pb-3 pt-2">
          <div className="flex items-center gap-2 relative z-[60]">
            {/* Attachment Button */}
            <button type="button" className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group flex items-center gap-1.5 ml-1">
              <Paperclip className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold hidden sm:inline-block">Attach</span>
            </button>

            {/* Filter Toggle Button */}
            <button 
              type="button" 
              onClick={() => { setShowFilters(!showFilters); setShowInfo(false); }}
              className={`p-2 rounded-lg transition-colors cursor-pointer group flex items-center gap-1.5 relative ${showFilters || activeFiltersCount > 0 ? 'text-aura-primary bg-aura-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'}`}
            >
              <SlidersHorizontal className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold hidden sm:inline-block">Constraints</span>
              
              {/* Active Filter Notification Badge */}
              <AnimatePresence>
                {activeFiltersCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-aura-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center"
                  >
                    {activeFiltersCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Info Tooltip Icon Trigger (Overlay is rendering externally) */}
            <button 
              type="button"
              onClick={() => { setShowInfo(!showInfo); setShowFilters(false); }}
              className={`p-2 rounded-lg transition-colors cursor-pointer group flex items-center ${showInfo ? 'text-foreground bg-black/5 dark:bg-white/10' : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'}`}
            >
              <Info className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          <div className="relative">
            {/* Explicit Login Tooltip Anchor tied specifically to the Arrow Submit Button */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-14 right-0 bg-white/95 dark:bg-card/95 backdrop-blur-xl border border-red-500/30 text-red-500 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-end gap-2 whitespace-nowrap shadow-[0_0_30px_rgba(239,68,68,0.2)] z-[100]"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" /> Login to see in action
                  {/* Floating Triangle Pointer directed at the action button */}
                  <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white/95 dark:bg-card/95 border-b border-r border-red-500/30 transform rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={!inputValue.trim()}
              className={`p-2 rounded-[8px] flex items-center justify-center transition-all duration-300 z-[60] relative ${
                inputValue.trim() 
                  ? 'bg-aura-primary text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:bg-aura-secondary hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] cursor-pointer' 
                  : 'bg-black/5 dark:bg-white/5 text-muted-foreground cursor-not-allowed opacity-50'
              }`}
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
