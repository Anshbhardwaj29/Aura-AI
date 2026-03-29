import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Paperclip, SlidersHorizontal, AlertCircle, Check, Calendar, Save, RotateCcw, Bookmark, ChevronDown } from 'lucide-react';

export function InteractiveChatbox({ 
  placeholders = ["Draft a 15-page IEEE review on Quantum Computing...", "Deep crawl Google Scholar for recent LLaMA models...", "Format my empirical dataset into Springer methodology..."], 
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

  const defaultFilters = {
    yearRange: "last2",
    customStart: "",
    customEnd: "",
    indexing: [],
    openAccess: false,
    quartiles: [],
    pubTypes: [],
    citations: "any",
    methodologies: [],
    languages: []
  };

  const [filters, setFilters] = useState(defaultFilters);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [savedViews, setSavedViews] = useState([]);

  // Auto-resize logic
  const handleInput = (e) => {
    setInputValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  // Typewriter effect
  useEffect(() => {
    if (!placeholders || placeholders.length === 0) return;
    let timeout;
    if (isTyping) {
      if (placeholderText.length < placeholders[currentPlaceholderIndex].length) {
        timeout = setTimeout(() => {
          setPlaceholderText(placeholders[currentPlaceholderIndex].slice(0, placeholderText.length + 1));
        }, 40);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2500);
      }
    } else {
      if (placeholderText.length > 0) {
        timeout = setTimeout(() => {
          setPlaceholderText(placeholderText.slice(0, -1));
        }, 20);
      } else {
        setCurrentPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        setIsTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [placeholderText, isTyping, currentPlaceholderIndex, placeholders]);

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    // Prevent completely empty submission
    if (!inputValue.trim() && Object.values(filters).every(v => v === defaultFilters[Object.keys(filters).find(k => defaultFilters[k] === v)])){
       return;
    }

    if (showLoginTooltip) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        if (onSubmit) {
          onSubmit({ prompt: inputValue, constraints: filters });
        }
      }, 1500);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleArrayFilter = (key, value) => {
    setFilters(prev => {
      const arr = prev[key];
      if (arr.includes(value)) {
        return { ...prev, [key]: arr.filter(v => v !== value) };
      } else {
        return { ...prev, [key]: [...arr, value] };
      }
    });
  };

  const saveCurrentView = () => {
    const newView = { name: `Custom Filter View ${savedViews.length + 1}`, filters: { ...filters } };
    setSavedViews([...savedViews, newView]);
  };

  const loadSavedView = (view) => {
    setFilters(view.filters);
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  const activeFiltersCount = 
    (filters.yearRange !== 'last2' ? 1 : 0) + 
    filters.indexing.length + 
    (filters.openAccess ? 1 : 0) + 
    filters.quartiles.length +
    filters.pubTypes.length +
    (filters.citations !== 'any' ? 1 : 0) +
    (filters.methodologies.length > 0 && filters.methodologies[0] !== "" ? 1 : 0) +
    filters.languages.length;

  return (
    <div className={`relative w-full z-50 ${className}`}>
      <form 
        onSubmit={handleSubmit}
        className={`relative flex flex-col w-full bg-white/95 dark:bg-[#0a0a0f]/80 backdrop-blur-3xl border transition-all duration-300 rounded-[16px] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-2xl overflow-visible ${
          isFocused ? 'border-aura-primary shadow-[0_0_30px_rgba(139,92,246,0.15)] ring-1 ring-aura-primary/30' : 'border-black/10 hover:border-black/20 dark:border-white/10 dark:hover:border-white/20'
        }`}
      >
        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center rounded-[16px]"
            >
              <div className="flex items-center gap-3 bg-background/90 p-3 px-5 rounded-full border border-aura-primary/30 shadow-xl">
                <div className="w-4 h-4 border-2 border-aura-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-semibold text-foreground">Updating Research Results...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={isFocused ? "" : placeholderText}
          className="w-full bg-transparent border-none outline-none text-foreground placeholder-muted-foreground/70 resize-none px-5 pt-5 pb-3 min-h-[70px] max-h-[200px] text-[15px] leading-relaxed scrollbar-thin scrollbar-thumb-black/10 dark:scrollbar-thumb-white/10"
          rows={1}
          style={{ overflowY: inputValue.split('\n').length > 5 ? 'auto' : 'hidden' }}
        />

        {/* Primary Filters (Always Visible) */}
        <div className="px-5 py-3 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-x-6 gap-y-4 bg-black/[0.02] dark:bg-white/[0.02]">
          
          {/* Year Range */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <select 
              value={filters.yearRange}
              onChange={(e) => setFilters({...filters, yearRange: e.target.value})}
              className="bg-transparent border border-black/10 dark:border-white/10 rounded px-1 py-0.5 text-[11px] font-semibold text-foreground cursor-pointer outline-none hover:border-aura-primary transition-colors focus:border-aura-primary"
            >
              <option value="last2">Last 2 Years</option>
              <option value="last5">Last 5 Years</option>
              <option value="last10">Last 10 Years</option>
              <option value="1950">1950 - Current</option>
              <option value="custom">Custom...</option>
            </select>
          </div>
          
          {filters.yearRange === 'custom' && (
            <div className="flex items-center gap-2 -ml-3">
              <input type="number" placeholder="YYYY" value={filters.customStart} onChange={(e) => setFilters({...filters, customStart: e.target.value})} className="w-14 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded pt-1 pb-1 px-1 text-[11px] text-center text-foreground outline-none focus:border-aura-primary" />
              <span className="text-muted-foreground text-xs">-</span>
              <input type="number" placeholder="YYYY" value={filters.customEnd} onChange={(e) => setFilters({...filters, customEnd: e.target.value})} className="w-14 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded pt-1 pb-1 px-1 text-[11px] text-center text-foreground outline-none focus:border-aura-primary" />
            </div>
          )}

          {/* Indexing Sources */}
          <div className="flex items-center gap-3.5 flex-wrap">
             {["Scopus", "WoS", "PubMed", "IEEE Xplore", "ArXiv"].map(src => (
               <label key={src} className="flex items-center gap-1.5 cursor-pointer group">
                  <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${filters.indexing.includes(src) ? 'bg-aura-primary border-aura-primary' : 'border-black/20 dark:border-white/20 group-hover:border-aura-primary/50'}`}>
                    {filters.indexing.includes(src) && <Check className="w-2.5 h-2.5 text-white" />}
                  </div>
                  <span className="text-[11px] font-medium text-muted-foreground group-hover:text-foreground transition-colors select-none">{src}</span>
                  <input type="checkbox" className="hidden" checked={filters.indexing.includes(src)} onChange={() => toggleArrayFilter('indexing', src)} />
               </label>
             ))}
          </div>

          {/* Open Access Toggle */}
          <div className="flex items-center gap-2 sm:ml-auto">
            <span className="text-[10px] font-bold tracking-wider text-emerald-500 uppercase select-none cursor-pointer" onClick={() => setFilters({...filters, openAccess: !filters.openAccess})}>Open Access</span>
            <button 
              type="button" 
              onClick={() => setFilters({...filters, openAccess: !filters.openAccess})} 
              className={`w-7 h-4 rounded-full relative transition-colors ${filters.openAccess ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'bg-black/20 dark:bg-white/20'}`}
            >
              <div className={`absolute top-[2px] w-3 h-3 rounded-full bg-white transition-all`} style={{ left: filters.openAccess ? 'calc(100% - 14px)' : '2px' }} />
            </button>
          </div>
        </div>

        {/* Contextual / Advanced Filters */}
        <AnimatePresence>
          {showAdvanced && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden bg-[#fafafa] dark:bg-[#12121a]"
            >
              <div className="px-5 py-5 border-t border-black/5 dark:border-white/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
                
                {/* Journal Quartile */}
                <div className="flex flex-col gap-3">
                   <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">Journal Ranking</span>
                   <div className="flex flex-col gap-2.5 relative z-10">
                     {["Q1", "Q2", "Q3", "Q4", "Non-Indexed"].map(q => (
                       <label key={q} className="flex items-center gap-2 cursor-pointer group">
                          <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center transition-all ${filters.quartiles.includes(q) ? 'bg-aura-primary border-aura-primary' : 'border-black/20 dark:border-white/20'}`}>
                            {filters.quartiles.includes(q) && <Check className="w-2.5 h-2.5 text-white" />}
                          </div>
                          <span className="text-[12px] text-muted-foreground group-hover:text-foreground select-none">{q}</span>
                          <input type="checkbox" className="hidden" checked={filters.quartiles.includes(q)} onChange={() => toggleArrayFilter('quartiles', q)} />
                       </label>
                     ))}
                   </div>
                </div>

                {/* Publication Type */}
                <div className="flex flex-col gap-3">
                   <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">Publication Type</span>
                   <div className="flex flex-col gap-2.5 relative z-10">
                     {["Journal Article", "Conference Proceeding", "Review Paper", "Case Study", "Theoretical Framework"].map(t => (
                       <label key={t} className="flex items-center gap-2 cursor-pointer group">
                          <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center transition-all ${filters.pubTypes.includes(t) ? 'bg-aura-primary border-aura-primary' : 'border-black/20 dark:border-white/20'}`}>
                            {filters.pubTypes.includes(t) && <Check className="w-2.5 h-2.5 text-white" />}
                          </div>
                          <span className="text-[12px] text-muted-foreground group-hover:text-foreground select-none">{t}</span>
                          <input type="checkbox" className="hidden" checked={filters.pubTypes.includes(t)} onChange={() => toggleArrayFilter('pubTypes', t)} />
                       </label>
                     ))}
                   </div>
                </div>

                {/* Methodology & Language */}
                <div className="flex flex-col gap-6">
                   <div className="flex flex-col gap-2 relative z-10">
                     <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 mb-1">Methodology</span>
                     <select 
                        value={filters.methodologies[0] || ""}
                        onChange={(e) => setFilters({...filters, methodologies: [e.target.value]})}
                        className="w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md p-2 text-xs text-foreground outline-none cursor-pointer focus:border-aura-primary transition-colors"
                     >
                        <option value="">Any Methodology</option>
                        <option value="Quantitative">Quantitative</option>
                        <option value="Qualitative">Qualitative</option>
                        <option value="Mixed Methods">Mixed Methods</option>
                        <option value="Conceptual">Conceptual</option>
                     </select>
                   </div>
                   
                   <div className="flex flex-col gap-2">
                     <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 mb-1">Language</span>
                     <div className="flex flex-wrap gap-2 relative z-10">
                        {["English", "Hindi", "German", "French"].map(l => (
                          <button
                            key={l} type="button"
                            onClick={() => toggleArrayFilter('languages', l)}
                            className={`px-2.5 py-1 text-[11px] font-medium rounded-full border transition-all ${filters.languages.includes(l) ? 'bg-aura-primary shadow-sm border-aura-primary text-white' : 'bg-transparent border-black/10 dark:border-white/10 text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5'}`}
                          >
                            {l}
                          </button>
                        ))}
                     </div>
                   </div>
                </div>

                {/* Citation Threshold */}
                <div className="flex flex-col gap-2 relative z-10">
                   <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 mb-1">Citation Threshold</span>
                   <select 
                      value={filters.citations}
                      onChange={(e) => setFilters({...filters, citations: e.target.value})}
                      className="w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md p-2 text-xs text-foreground outline-none cursor-pointer focus:border-aura-primary transition-colors"
                   >
                      <option value="any">Any Threshold</option>
                      <option value=">10">&gt; 10 Citations</option>
                      <option value=">50">&gt; 50 Citations</option>
                      <option value=">100">&gt; 100 Citations</option>
                   </select>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lower Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-black/5 dark:border-white/5 relative z-20">
          
          <div className="flex w-full sm:w-auto items-center justify-between sm:justify-start gap-1 sm:gap-3">
            <button type="button" className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group flex items-center gap-1.5">
              <Paperclip className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-semibold hidden md:inline-block">Attach</span>
            </button>

            <button 
              type="button" 
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`p-2 rounded-lg transition-colors cursor-pointer group flex items-center gap-1.5 relative ${showAdvanced ? 'text-aura-primary bg-aura-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'}`}
            >
              <SlidersHorizontal className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-semibold">Advanced Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 absolute -top-1.5 -right-1.5 bg-aura-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center pointer-events-none shadow-sm">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <div className="relative border-l border-black/10 dark:border-white/10 pl-2 sm:pl-3 sm:ml-1 flex items-center gap-2">
              <button type="button" onClick={saveCurrentView} className="p-2 rounded-lg text-muted-foreground hover:text-aura-primary hover:bg-aura-primary/10 transition-colors cursor-pointer group flex items-center gap-1.5" title="Save Current View">
                <Bookmark className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
              
              {savedViews.length > 0 && (
                <div className="relative group/menu">
                  <button type="button" className="text-[11px] font-semibold flex items-center gap-1 text-aura-primary bg-aura-primary/10 px-2.5 py-1.5 rounded-md cursor-pointer hover:bg-aura-primary/20 transition-colors">
                    Saved Views <ChevronDown className="w-3 h-3" />
                  </button>
                  <div className="absolute bottom-full mb-2 left-0 w-48 bg-white dark:bg-[#1a1a24] border border-black/10 dark:border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 py-1.5 flex flex-col z-50">
                    <span className="px-3 py-1 text-[10px] font-bold text-muted-foreground border-b border-black/5 dark:border-white/5 mb-1 uppercase tracking-wider">Your Contexts</span>
                    {savedViews.map((view, i) => (
                      <button key={i} type="button" onClick={() => loadSavedView(view)} className="w-full text-left px-3 py-1.5 text-xs hover:bg-aura-primary/10 hover:text-aura-primary transition-colors text-foreground font-medium flex items-center gap-2">
                        <Bookmark className="w-3 h-3 text-aura-primary opacity-70" /> {view.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex w-full sm:w-auto items-center justify-end gap-2 sm:gap-3">
             {activeFiltersCount > 0 && (
               <button 
                 type="button" 
                 onClick={clearFilters}
                 className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
               >
                 <RotateCcw className="w-3.5 h-3.5" /> Reset
               </button>
             )}

             <button
                type="button"
                onClick={handleSubmit} 
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-[8px] text-[11px] font-bold uppercase tracking-wider transition-all duration-300 z-10 relative cursor-pointer ${
                  activeFiltersCount > 0 
                  ? 'bg-aura-primary/10 text-aura-primary border border-aura-primary/30 hover:bg-aura-primary hover:text-white' 
                  : 'bg-black/5 dark:bg-white/5 text-muted-foreground hover:bg-black/10 dark:hover:bg-white/10'
                }`}
             >
                <Check className="w-3.5 h-3.5" /> Apply Filters
             </button>

            <AnimatePresence>
              {showTooltip && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-14 right-2 bg-white/95 dark:bg-card/95 backdrop-blur-xl border border-red-500/30 text-red-500 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-end gap-2 whitespace-nowrap shadow-[0_0_30px_rgba(239,68,68,0.2)] z-[100]"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" /> Login to perform search
                  <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white/95 dark:bg-card/95 border-b border-r border-red-500/30 transform rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={!inputValue.trim() && activeFiltersCount === 0}
              className={`p-2 rounded-[8px] flex items-center justify-center transition-all duration-300 z-[60] relative ${
                inputValue.trim() || activeFiltersCount > 0
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
