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
  const timeoutRef = useRef(null);

  /**
   * Starts the sequential emission of events.
   * This is designed to mirror the interface of a production WebSocket handler.
   */
  const startStream = () => {
    if (isStreaming) return;
    setIsStreaming(true);
    
    const events = fixtures[fixtureName];
    let currentIndex = 0;

    const emitNext = () => {
      if (currentIndex < events.length) {
        // Trigger the callback in the UI (processEvent)
        onEvent(events[currentIndex]);
        currentIndex++;
        
        // Random delay between 400ms and 1200ms to simulate real-world API latency
        const delay = Math.random() * 800 + 400; 
        timeoutRef.current = setTimeout(emitNext, delay);
      } else {
        setIsStreaming(false);
      }
    };

    emitNext();
  };

  /**
   * Immediately halts the stream. Useful for resets or unmounting.
   */
  const stopStream = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsStreaming(false);
  };

  // Cleanup on unmount to prevent memory leaks or ghost timeouts
  useEffect(() => {
    return () => stopStream();
  }, []);

  return { startStream, stopStream, isStreaming };
}
