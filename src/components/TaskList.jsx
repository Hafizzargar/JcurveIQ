import React from 'react';
import { TaskCard } from './TaskCard';
import { ParallelGroup } from './ParallelGroup';

/**
 * TaskList is responsible for the 'Layout Strategy'.
 * It scans the flat list of tasks and identifies consecutive parallel tasks 
 * to bundle them into a grid layout (ParallelGroup).
 */
export function TaskList({ tasks }) {
  const renderedGroups = [];
  let currentParallelBatch = [];

  tasks.forEach((task, index) => {
    // If a task is marked as parallel, we start/add to a batch
    if (task.isParallel) {
      currentParallelBatch.push(task);
    } else {
      // Once we hit a sequential task, we must render any pending parallel batch first
      if (currentParallelBatch.length > 0) {
        renderedGroups.push(
          <ParallelGroup key={`parallel-${index}`} tasks={currentParallelBatch} />
        );
        currentParallelBatch = [];
      }
      // Then render the sequential task as a single card
      renderedGroups.push(<TaskCard key={task.id} task={task} />);
    }
  });

  // Final cleanup: if the last few tasks were parallel, render them as a group
  if (currentParallelBatch.length > 0) {
    renderedGroups.push(
      <ParallelGroup key="parallel-final" tasks={currentParallelBatch} />
    );
  }

  return (
    <div className="space-y-4">
      {/* 🟢 TaskList.jsx (The Pipeline Wrapper) */}
      {renderedGroups}
    </div>
  );
}
