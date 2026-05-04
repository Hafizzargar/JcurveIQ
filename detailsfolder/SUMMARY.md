# Project Details & Implementation Summary

This folder contains the visual evidence and a technical breakdown of the JcurveIQ Agent Run Panel implementation.

## 🛠️ What I Used (Tech Stack)
- **Frontend**: React 18 (Vite template)
- **Styling**: Tailwind CSS (with custom glassmorphism and animations)
- **Icons**: Lucide React
- **Logic**: React Hooks (`useReducer`, `useCallback`, `useRef`)
- **State**: Centralized reducer for event-driven UI updates.

## 🏗️ What I Did (Features & Fixes)
1. **Real-time Pipeline**: Built a dynamic task list that reacts to an event stream.
2. **Parallel Task Grouping**: Implemented logic to automatically group concurrent tasks into a grid layout.
3. **Thought Transparency**: Added a collapsible 'Agent Thoughts' section to show the AI's reasoning.
4. **Streaming Simulation**: Used a mock stream hook that simulates network latency and partial outputs.
5. **UI Polishing**: 
   - Added a "shimmer" effect for streaming text.
   - Implemented neutral styling for "Skipped" tasks.
   - Fixed the Quality Score percentage bug.
   - Added manual expansion for completed tasks to show tool call history.

## 📊 What Data I Gave (Fixtures)
The project is driven by two main JSON fixtures in `src/mock/fixtures/`:
1. **`run_success.json`**: 
   - **Query**: "Analyze Apple's R&D intensity vs large-cap peers 2019–2023"
   - **Workflow**: 10-K data retrieval -> Parallel peer comparison (Google/Microsoft/Amazon) -> Report Synthesis.
   - **Data Points**: Includes tool calls to SEC EDGAR, Bloomberg, and FactSet.
2. **`run_error.json`**: 
   - Simulates a partial run that fails during a Bloomberg API call, triggering a coordinator error banner.

## 📸 Screenshots
The following images (also saved in this folder) demonstrate the UI in action:
- `initial_state.png`: The landing screen with the research query.
- `running_pipeline.png`: The active pipeline showing parallel execution and streaming.
- `final_result.png`: The synthesized report with citations and quality score.
