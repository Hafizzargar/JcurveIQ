import React, { useState, useCallback } from 'react';
import { useRunState } from '../hooks/useRunState';
import { useMockStream } from '../mock/useMockStream';
import { RunHeader } from './RunHeader';
import { TaskList } from './TaskList';
import { FinalOutput } from './FinalOutput';
import { EmptyState } from './EmptyState';
import { DebugSidebar } from './DebugSidebar';
import { RefreshCw, AlertCircle, Pause, Play, Clock, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

/**
 * AgentRunPanel is the top-level 'Orchestrator' of the dashboard.
 * It connects the UI state to the mock event stream and handles fixture switching.
 */
export function AgentRunPanel() {
  const [fixture, setFixture] = useState('run_success');
  const [logs, setLogs] = useState([]);
  
  const { state, processEvent: dispatch, reset } = useRunState();

  const handleEvent = useCallback((event) => {
    // 🧠 Inner Machines Tracking
    let actionDescription = "";
    let codeSnippet = "";
    let logicCondition = "";

    switch(event.type) {
      case 'RUN_START': 
        actionDescription = "Stream Initialized";
        logicCondition = "User Click -> startStream()";
        codeSnippet = "useMockStream.start(fixture)";
        break;
      case 'TASK_SPAWN':
        const isP = !!event.payload.is_parallel;
        actionDescription = `Task Spawned: ${event.payload.name}`;
        logicCondition = isP ? "Condition: is_parallel=true -> Grid Mode" : "Condition: is_parallel=false -> List Mode";
        codeSnippet = isP ? "<ParallelGroup />" : "<TaskCard />";
        break;
      case 'TOOL_CALL':
        actionDescription = `API Logic: ${event.payload.tool}`;
        logicCondition = "Action: Tool Triggered -> useRunState.reducer";
        codeSnippet = "task.toolCalls.push(toolPayload)";
        break;
      case 'TASK_OUTPUT':
        actionDescription = "Data Drip (Streaming)";
        logicCondition = "Event: Partial Text -> TaskCard.jsx";
        codeSnippet = "task.output += delta";
        break;
      case 'RUN_COMPLETE':
        actionDescription = "Final Synthesis";
        logicCondition = "Trigger: All Tasks Finished";
        codeSnippet = "render(<FinalOutput />)";
        break;
      default:
        actionDescription = `System Event: ${event.type}`;
        logicCondition = "Internal state update";
    }

    setLogs(prev => [...prev, {
      timestamp: Date.now(),
      action: actionDescription,
      condition: logicCondition,
      details: JSON.stringify(event.payload, null, 2),
      code: codeSnippet
    }]);

    dispatch(event);
  }, [dispatch]);
  
  const { 
    startStream, 
    stopStream, 
    togglePause, 
    toggleSlowMode,
    stepNext,
    isStreaming, 
    isPaused,
    isSlowMode 
  } = useMockStream(handleEvent, fixture);

  const handleStart = (startPaused = false) => {
    reset();
    setLogs([]);
    startStream(startPaused);
  };

  const handleReset = () => {
    stopStream();
    reset();
    setLogs([]);
  };

  return (
    <div className="flex min-h-screen bg-[#0f1117] text-white">
      {/* 🛠️ Inner Machines Sidebar (1/3rd width) */}
      <DebugSidebar logs={logs} />

      {/* 📊 Main Dashboard Panel (2/3rd width) */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 py-12">
          
          {/* Navigation & Global Controls */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-xl font-black italic">J</span>
              </div>
              <div>
                <h2 className="font-bold text-lg tracking-tight">JcurveIQ</h2>
                <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Research Intelligence</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
                <button onClick={() => setFixture('run_success')} className={clsx("px-3 py-1.5 rounded-lg text-xs font-bold transition-all", fixture === 'run_success' ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60")}>Success Path</button>
                <button onClick={() => setFixture('run_error')} className={clsx("px-3 py-1.5 rounded-lg text-xs font-bold transition-all", fixture === 'run_error' ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60")}>Error Path</button>
                <button onClick={() => setFixture('run_security_fail')} className={clsx("px-3 py-1.5 rounded-lg text-xs font-bold transition-all", fixture === 'run_security_fail' ? "bg-red-500/20 text-red-400" : "text-white/40 hover:text-white/60")}>Security Fail</button>
              </div>

              {isStreaming && (
                <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/10">
                  <button 
                    onClick={togglePause} 
                    className={clsx(
                      "p-1.5 rounded-lg transition-all",
                      isPaused ? "bg-orange-500/20 text-orange-400" : "text-white/40 hover:text-white"
                    )}
                    title={isPaused ? "Resume" : "Pause"}
                  >
                    {isPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
                  </button>

                  {isPaused && (
                    <button 
                      onClick={stepNext}
                      className="p-1.5 rounded-lg text-white/40 hover:text-white transition-all"
                      title="Step Next"
                    >
                      <ChevronRight size={16} />
                    </button>
                  )}

                  <button 
                    onClick={toggleSlowMode} 
                    className={clsx(
                      "p-1.5 rounded-lg transition-all",
                      isSlowMode ? "bg-blue-500/20 text-blue-400" : "text-white/40 hover:text-white"
                    )}
                    title="Slow Mode (5s delay)"
                  >
                    <Clock size={16} />
                  </button>
                </div>
              )}

              <button onClick={handleReset} className="p-2.5 hover:bg-white/10 rounded-xl transition-all text-white/40 hover:text-white" title="Reset">
                <RefreshCw size={18} className={clsx(isStreaming && !isPaused && "animate-spin")} />
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          {state.status === 'idle' ? (
            <EmptyState onStart={handleStart} />
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <RunHeader query={state.query} status={state.status} startTime={state.startTime} />
              <div className="space-y-6">
                <TaskList tasks={state.tasks} />
                {state.status === 'error' && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex gap-3 animate-in shake duration-500">
                    <AlertCircle className="text-red-500 shrink-0" size={20} />
                    <p className="text-sm font-medium text-red-200">{state.error}</p>
                  </div>
                )}
                {state.finalOutput && <FinalOutput {...state.finalOutput} />}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
