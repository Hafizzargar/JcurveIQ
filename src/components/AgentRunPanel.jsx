import React, { useState } from 'react';
import { useRunState } from '../hooks/useRunState';
import { useMockStream } from '../mock/useMockStream';
import { RunHeader } from './RunHeader';
import { TaskList } from './TaskList';
import { FinalOutput } from './FinalOutput';
import { EmptyState } from './EmptyState';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';

/**
 * AgentRunPanel is the top-level 'Orchestrator' of the dashboard.
 * It connects the UI state to the mock event stream and handles fixture switching.
 */
export function AgentRunPanel() {
  // Toggle between 'run_success' and 'run_error' fixtures
  const [fixture, setFixture] = useState('run_success');
  
  // Custom hook to manage the internal state of the agent run
  const { state, processEvent, reset } = useRunState();
  
  // Custom hook to simulate a real-time event stream from the JSON fixtures
  const { startStream, stopStream, isStreaming } = useMockStream(processEvent, fixture);

  const handleStart = () => {
    reset(); // Clear previous state
    startStream(); // Begin emitting events
  };

  const handleReset = () => {
    stopStream(); // Kill current timer
    reset(); // Clear UI
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12" style={{ border: '2px solid red' }}>
      {/* 🔴 AgentRunPanel.jsx (The Main Container) */}
      
      {/* Navigation & Global Controls */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
            <span className="text-xl font-black text-white italic">J</span>
          </div>
          <div>
            <h2 className="font-bold text-lg tracking-tight">JcurveIQ</h2>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Research Intelligence</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Path Selector for Fixture Testing */}
          <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
            <button 
              onClick={() => setFixture('run_success')}
              className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                fixture === 'run_success' ? "bg-white/10 text-white shadow-sm" : "text-white/40 hover:text-white/60"
              )}
            >
              Success Path
            </button>
            <button 
              onClick={() => setFixture('run_error')}
              className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                fixture === 'run_error' ? "bg-white/10 text-white shadow-sm" : "text-white/40 hover:text-white/60"
              )}
            >
              Error Path
            </button>
            <button 
              onClick={() => setFixture('run_security_fail')}
              className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                fixture === 'run_security_fail' ? "bg-red-500/20 text-red-400 shadow-sm" : "text-white/40 hover:text-white/60"
              )}
            >
              Security Fail
            </button>
          </div>

          <button 
            onClick={handleReset}
            className="p-2.5 hover:bg-white/10 rounded-xl transition-all text-white/40 hover:text-white"
            title="Reset Stream"
          >
            <RefreshCw size={18} className={clsx(isStreaming && "animate-spin")} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {state.status === 'idle' ? (
        <EmptyState onStart={handleStart} />
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* Status Header (Query & Timer) */}
          <RunHeader 
            query={state.query} 
            status={state.status} 
            startTime={state.startTime} 
          />

          <div className="space-y-6">
            {/* The dynamically grouped task pipeline */}
            <TaskList tasks={state.tasks} />
            
            {/* Global Error Banner */}
            {state.status === 'error' && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex gap-3 animate-in shake duration-500">
                <AlertCircle className="text-red-500 shrink-0" size={20} />
                <p className="text-sm font-medium text-red-200">
                  {state.error}
                </p>
              </div>
            )}

            {/* Final Report with Citations */}
            {state.finalOutput && (
              <FinalOutput {...state.finalOutput} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
