import React, { useState, useEffect } from 'react';
import { Search, Clock, Activity, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

export function RunHeader({ query, status, startTime }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (status !== 'running' || !startTime) return;

    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [status, startTime]);

  return (
    <div className="glass p-6 rounded-2xl mb-8 border-white/10 shadow-2xl" style={{ border: '2px solid blue' }}>
      {/* 🔵 RunHeader.jsx (Status & Timer) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="bg-blue-500/20 p-3 rounded-xl border border-blue-500/30">
            <Search className="text-blue-400" size={24} />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-1 block">
              Active Research Query
            </span>
            <h1 className="text-xl md:text-2xl font-bold text-white leading-tight">
              {query || "Initializing Research Agent..."}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-6 px-6 py-3 rounded-xl bg-white/5 border border-white/5">
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-tighter text-white/40 mb-1">Status</span>
            <div className="flex items-center gap-2">
              {status === 'running' ? (
                <>
                  <Loader2 size={14} className="text-blue-400 animate-spin" />
                  <span className="text-sm font-bold text-blue-400 capitalize">{status}</span>
                </>
              ) : (
                <span className={clsx(
                  "text-sm font-bold capitalize",
                  status === 'success' ? "text-emerald-400" : "text-red-400"
                )}>{status}</span>
              )}
            </div>
          </div>

          <div className="w-[1px] h-8 bg-white/10"></div>

          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-tighter text-white/40 mb-1">Elapsed</span>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-white/60" />
              <span className="text-sm font-mono font-bold text-white/90">
                {elapsed}s
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
