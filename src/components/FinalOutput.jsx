import React from 'react';
import { Sparkles, Quote, Award } from 'lucide-react';

export function FinalOutput({ content, citations, qualityScore }) {
  return (
    <div className="mt-12 animate-in zoom-in-95 duration-700">
      {/* 🟢 FinalOutput.jsx (The Synthesized Result) */}
      <div className="relative glass-card rounded-2xl p-8 border-emerald-500/20 shadow-[0_0_50px_-12px_rgba(16,185,129,0.2)]">
        <div className="absolute -top-4 left-8 bg-emerald-500 flex items-center gap-2 px-4 py-1 rounded-full shadow-lg">
          <Sparkles size={14} className="text-white" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-white">Synthesized Result</span>
        </div>

        <div className="absolute -top-4 right-8 bg-white/10 backdrop-blur-md flex items-center gap-2 px-4 py-1 rounded-full border border-white/10">
          <Award size={14} className="text-emerald-400" />
          <span className="text-[10px] font-bold text-white/80">
            Quality: {qualityScore != null ? Math.round(qualityScore * 100) : "N/A"}%
          </span>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-lg leading-relaxed text-white/90 font-medium italic">
            "{content}"
          </p>
        </div>

        {citations && citations.length > 0 && (
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <Quote size={16} className="text-white/40" />
              <span className="text-xs font-bold uppercase tracking-tighter text-white/40">Sources & Citations</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {citations.map((cite, idx) => (
                <span key={idx} className="px-3 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] text-white/60 hover:border-white/20 transition-colors">
                  {cite}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
