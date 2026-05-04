import React from 'react';
import { Code, Database, Terminal, Cpu } from 'lucide-react';

export function DebugSidebar({ logs }) {
  return (
    <div className="w-[350px] bg-[#090b10] border-r border-white/5 h-screen sticky top-0 overflow-y-auto p-6 scrollbar-hide flex flex-col gap-6">
      <div className="flex items-center gap-3 text-blue-400 mb-2">
        <Cpu size={20} />
        <h2 className="font-bold tracking-tight uppercase text-xs">Inner Machines (Backend)</h2>
      </div>

      {logs.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-white/20 text-center gap-4 py-20">
          <Database size={40} strokeWidth={1} />
          <p className="text-xs italic">Waiting for backend signals...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {logs.map((log, idx) => (
            <div key={idx} className="flex flex-col gap-2 animate-in slide-in-from-left duration-500">
              <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400/70">
                <Terminal size={12} />
                <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
              </div>
              
              <div className="bg-white/5 rounded-lg p-3 border border-white/10 flex flex-col gap-2">
                <div className="text-[10px] uppercase font-bold text-blue-400/80 tracking-widest flex items-center gap-2">
                  <Database size={10} />
                  {log.action}
                </div>
                {log.condition && (
                  <div className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {log.condition}
                  </div>
                )}
                <div className="text-xs font-mono text-white/60 leading-relaxed whitespace-pre-wrap break-all">
                  {log.details}
                </div>
              </div>

              {log.code && (
                <div className="bg-blue-500/5 rounded-lg p-3 border border-blue-500/20">
                  <div className="text-[9px] uppercase font-bold text-blue-300/50 mb-2 flex items-center gap-2">
                    <Code size={10} />
                    Source Logic
                  </div>
                  <pre className="text-[10px] font-mono text-blue-200/60 leading-tight">
                    {log.code}
                  </pre>
                </div>
              )}
            </div>
          )).reverse()}
        </div>
      )}
    </div>
  );
}
