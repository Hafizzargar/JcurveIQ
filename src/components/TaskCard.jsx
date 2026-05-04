import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Brain, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import { ToolCallRow } from './ToolCallRow';
import { clsx } from 'clsx';

/**
 * TaskCard represents a single logical step in the research pipeline.
 * It dynamically adjusts its styling and icons based on the task status.
 */
export function TaskCard({ task }) {
  // Collapsed by default to keep the UI clean for analysts.
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine the status icon and color based on the task state
  const getStatusIcon = () => {
    switch (task.status) {
      case 'completed': return <CheckCircle2 size={18} className="text-emerald-500" />;
      case 'failed': return <AlertCircle size={18} className="text-red-500" />;
      case 'running': return <Circle size={18} className="text-blue-500 animate-pulse" />;
      case 'skipped': return <AlertCircle size={18} className="text-white/40" />;
      default: return <Circle size={18} className="text-white/20" />;
    }
  };

  return (
    <div className={clsx(
      "glass-card rounded-xl p-4 transition-all duration-300",
      // Blue ring highlight when the task is actively executing
      task.status === 'running' ? "ring-1 ring-blue-500/50" : "border-white/5",
      // Muted grayscale effect for skipped/cancelled tasks
      task.status === 'skipped' && "opacity-60 grayscale-[0.5]"
    )} >
      {/* 🟠 TaskCard.jsx (Individual Research Step) */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <h3 className={clsx(
            "font-semibold text-sm",
            task.status === 'skipped' ? "text-white/40" : "text-white/90"
          )}>{task.name}</h3>
        </div>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-white/10 rounded-md transition-colors"
        >
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {/* Auto-expand when running, or manual toggle when finished */}
      {(isExpanded || task.status === 'running') && (
        <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
          
          {/* Agent Thoughts (Reasoning) */}
          {task.thought && (
            <div className="flex gap-2 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
              <Brain size={16} className="text-blue-400 shrink-0 mt-0.5" />
              <p className="text-xs italic text-blue-200/70 leading-relaxed">
                {task.thought}
              </p>
            </div>
          )}

          {/* List of Tool/API Calls performed by this task */}
          <div className="space-y-2">
            {task.toolCalls.map((tc, idx) => (
              <ToolCallRow key={idx} {...tc} />
            ))}
          </div>

          {/* Partial or Final Result Text */}
          {task.output && (
            <div className={clsx(
              "text-sm leading-relaxed text-white/80 p-3 rounded-lg bg-white/5",
              // Use shimmer effect while content is still streaming in
              !task.isFinal && "shimmer"
            )}>
              {task.output}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
