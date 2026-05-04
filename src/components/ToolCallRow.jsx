import React from 'react';
import { Terminal, CheckCircle2, Loader2 } from 'lucide-react';

export function ToolCallRow({ tool, args, result }) {
  return (
    <div className="flex flex-col gap-2 p-3 rounded-lg bg-white/5 border border-white/10 my-2">
      <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
        <Terminal size={14} />
        <span className="font-bold">{tool}</span>
        <span className="text-white/40">({JSON.stringify(args)})</span>
      </div>
      
      <div className="flex items-start gap-2 pl-4 border-l border-white/10">
        {result ? (
          <>
            <CheckCircle2 size={14} className="text-emerald-500 mt-1 shrink-0" />
            <div className="text-xs font-mono text-white/70 overflow-x-auto">
              {typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
            </div>
          </>
        ) : (
          <>
            <Loader2 size={14} className="text-blue-400 animate-spin mt-1 shrink-0" />
            <span className="text-xs font-mono text-white/40">Executing...</span>
          </>
        )}
      </div>
    </div>
  );
}
