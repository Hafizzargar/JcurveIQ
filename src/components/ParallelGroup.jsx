import React from 'react';
import { Layers } from 'lucide-react';
import { TaskCard } from './TaskCard';

export function ParallelGroup({ tasks }) {
  return (
    <div className="relative pl-6 border-l-2 border-blue-500/30 my-6 space-y-4">
      <div className="absolute -left-[11px] top-0 bg-[#0f1117] p-1">
        <div className="bg-blue-500 p-1 rounded-full">
          <Layers size={12} className="text-white" />
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] uppercase tracking-wider font-bold text-blue-400/80">
          Executing in Parallel
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-blue-500/30 to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
