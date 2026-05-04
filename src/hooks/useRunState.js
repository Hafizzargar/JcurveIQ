import { useReducer, useCallback } from 'react';

/**
 * Initial state for the agent run.
 * Tracks the query, run status, timing, tasks, and the final synthesized result.
 */
const initialState = {
  query: '',
  status: 'idle', // 'idle' | 'running' | 'success' | 'error'
  startTime: null,
  tasks: [],
  finalOutput: null,
  error: null
};

/**
 * Reducer function to handle state transitions based on incoming events.
 * This pattern ensures that the UI remains a pure reflection of the event stream.
 */
function reducer(state, action) {
  switch (action.type) {
    case 'RUN_START':
      // Reset state and initialize a new run with the user's query
      return {
        ...initialState,
        query: action.payload.query,
        status: 'running',
        startTime: Date.now(),
      };

    case 'TASK_SPAWN':
      // Add a new task to the pipeline. isParallel determines if it's grouped.
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            ...action.payload,
            status: 'running',
            toolCalls: [],
            thought: '',
            output: '',
            isFinal: false,
            isParallel: !!action.payload.is_parallel
          }
        ]
      };

    case 'TASK_THOUGHT':
      // Update the reasoning/thought block for a specific task
      return {
        ...state,
        tasks: state.tasks.map(t => 
          t.id === action.payload.id ? { ...t, thought: action.payload.thought } : t
        )
      };

    case 'TOOL_CALL':
      // Record an outgoing tool/API call within a task
      return {
        ...state,
        tasks: state.tasks.map(t => 
          t.id === action.payload.task_id 
            ? { ...t, toolCalls: [...t.toolCalls, { ...action.payload, result: null }] } 
            : t
        )
      };

    case 'TOOL_RESULT':
      // Record the result/response of a tool call
      return {
        ...state,
        tasks: state.tasks.map(t => 
          t.id === action.payload.task_id 
            ? { 
                ...t, 
                toolCalls: t.toolCalls.map(tc => 
                  tc.tool === action.payload.tool ? { ...tc, result: action.payload.result } : tc
                ) 
              } 
            : t
        )
      };

    case 'TASK_OUTPUT':
      // Handle partial (streaming) or final output for a task
      return {
        ...state,
        tasks: state.tasks.map(t => 
          t.id === action.payload.id 
            ? { 
                ...t, 
                output: action.payload.output, 
                isFinal: action.payload.is_final,
                // Allow the payload to explicitly set 'skipped' or 'failed' status
                status: action.payload.status || (action.payload.is_final ? 'completed' : 'running')
              } 
            : t
        )
      };

    case 'RUN_ERROR':
      // Terminate the run with a coordinator-level error
      return {
        ...state,
        status: 'error',
        error: action.payload.message
      };

    case 'FINAL_OUTPUT':
      // Store the final synthesized report and mark the run as successful
      return {
        ...state,
        status: 'success',
        finalOutput: {
          ...action.payload,
          // Normalize key name for the component
          qualityScore: action.payload.quality_score
        }
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

/**
 * Hook to manage the state of a research agent run.
 * Provides a processEvent function to ingest raw event data.
 */
export function useRunState() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Helper to dispatch events from the mock stream or a real socket
  const processEvent = useCallback((event) => {
    dispatch({ type: event.type.toUpperCase(), payload: event.payload });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return { state, processEvent, reset };
}
