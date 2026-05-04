import { useEffect, useState, useRef } from 'react';
import run_success from './fixtures/run_success.json';
import run_error from './fixtures/run_error.json';
import run_security_fail from './fixtures/run_security_fail.json';

const fixtures = {
  run_success,
  run_error,
  run_security_fail
};

/**
 * useMockStream simulates a real-time WebSocket or Server-Sent Events (SSE) stream.
 * It reads from static JSON fixtures and 'emits' them over time to the UI.
 */
export function useMockStream(onEvent, fixtureName = 'run_success') {
  const [isStreaming, setIsStreaming] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSlowMode, setIsSlowMode] = useState(false);
  
  const timeoutRef = useRef(null);
  const onEventRef = useRef(onEvent);
  const currentIndexRef = useRef(0);
  const isPausedRef = useRef(false);
  const isSlowModeRef = useRef(false);

  // Sync refs with state for use in the emitNext closure
  useEffect(() => {
    onEventRef.current = onEvent;
  }, [onEvent]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    isSlowModeRef.current = isSlowMode;
  }, [isSlowMode]);

  const startStream = (startPaused = false) => {
    if (isStreaming) return;
    setIsStreaming(true);
    setIsPaused(startPaused);
    isPausedRef.current = startPaused;
    currentIndexRef.current = 0;
    
    const events = fixtures[fixtureName];

    const emitNext = () => {
      if (currentIndexRef.current < events.length) {
        if (isPausedRef.current) {
          // If paused, check back in 100ms
          timeoutRef.current = setTimeout(emitNext, 100);
          return;
        }

        // Trigger the callback in the UI
        onEventRef.current(events[currentIndexRef.current]);
        currentIndexRef.current++;
        
        // Dynamic delay
        let delay = Math.random() * 800 + 400; 
        if (isSlowModeRef.current) {
          delay = 10000; // 10 seconds for "slow mode" as requested
        }
        
        timeoutRef.current = setTimeout(emitNext, delay);
      } else {
        setIsStreaming(false);
        setIsPaused(false);
      }
    };

    emitNext();
  };

  const stopStream = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsStreaming(false);
    setIsPaused(false);
    currentIndexRef.current = 0;
  };

  const togglePause = () => setIsPaused(prev => !prev);
  const toggleSlowMode = () => setIsSlowMode(prev => !prev);

  const stepNext = () => {
    const events = fixtures[fixtureName];
    if (currentIndexRef.current < events.length) {
      onEventRef.current(events[currentIndexRef.current]);
      currentIndexRef.current++;
    } else {
      setIsStreaming(false);
    }
  };

  useEffect(() => {
    return () => stopStream();
  }, []);

  return { 
    startStream, 
    stopStream, 
    togglePause, 
    toggleSlowMode,
    stepNext,
    isStreaming, 
    isPaused,
    isSlowMode 
  };
}
