import React from 'react';
import { Play, Sparkles, Pause } from 'lucide-react';

export function EmptyState({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-1000">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
        <div className="relative bg-white/5 p-8 rounded-full border border-white/10">
          <Sparkles size={48} className="text-blue-400" />
        </div>
      </div>
      
      <h2 className="text-3xl font-bold mb-4">Ready for Research</h2>
      <p className="text-white/40 max-w-md mx-auto mb-10 leading-relaxed">
        Submit a financial research query to start the multi-agent pipeline. 
        Witness real-time data retrieval, tool execution, and synthesis.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button 
          onClick={() => onStart(false)}
          className="group relative flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold transition-all hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(37,99,235,0.5)] active:scale-95"
        >
          <Play size={20} className="fill-current" />
          <span>Live Research Run</span>
        </button>

        <button 
          onClick={() => onStart(true)}
          className="group relative flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 text-white/70 hover:text-white"
        >
          <Pause size={20} className="fill-current" />
          <span>Step-by-Step (Paused)</span>
        </button>
      </div>
    </div>
  );
}
