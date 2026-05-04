# JcurveIQ — Agent Run Panel

A real-time UI component that visualises a live multi-agent research pipeline for financial analysts. Built as a high-fidelity screening assessment for a Frontend Engineer role.

## 🚀 Overview
When an analyst submits a research query, this panel replaces static spinners with a transparent, unfolding execution graph. It tracks sequential and parallel tasks, tool calls, and intermediate streaming outputs, culminating in a synthesized final report with citations.

## ✨ Features
- **Real-time Pipeline**: Sequential and parallel task visualization with live status updates.
- **Thought Transparency**: Collapsible "Agent Thoughts" allow analysts to audit the AI's reasoning process.
- **Tool Call Insights**: Monospaced logs showing exact tool parameters and results (e.g., SEC EDGAR, Bloomberg, FactSet).
- **Streaming Outputs**: Partial results are displayed with a "shimmer" animation while in-flight, becoming solid upon completion.
- **Intelligent Status Handling**: 
  - **Success**: Green highlights for completed paths.
  - **Skipped**: Neutral muted styling for redundant or optimized-out tasks.
  - **Error**: High-visibility alerts for unrecoverable coordinator failures.
- **Synthesis Section**: Premium final output area with Citations and a **Quality Score** indicator.

## 🛠️ Tech Stack
- **React 18**: Functional components and `useReducer` for robust state management.
- **Tailwind CSS**: Custom design system with glassmorphism and premium gradients.
- **Lucide React**: Modern iconography for clinical financial interfaces.
- **Vite**: Ultra-fast development server and build tool.

## 🏗️ Implementation Details

### State Management (`useRunState.js`)
The application uses a centralized state reducer to handle complex event types:
- `RUN_START`: Initializes timer and query.
- `TASK_SPAWN`: Handles both sequential and parallel task registration.
- `TOOL_CALL / RESULT`: Updates individual tool execution states within tasks.
- `TASK_OUTPUT`: Streams partial content and finalizes task statuses.
- `FINAL_OUTPUT`: Normalizes quality scores and renders the synthesized result.

### Component Architecture
- **`AgentRunPanel`**: The main container managing fixture selection and stream control.
- **`RunHeader`**: Real-time elapsed timer and query context.
- **`TaskList`**: Intelligent grouping logic that identifies and bundles consecutive parallel tasks.
- **`TaskCard`**: State-aware card that adapts its UI based on `running`, `completed`, `skipped`, or `failed` status.
- **`FinalOutput`**: High-fidelity result card with data normalization for quality metrics.

### Design Decisions
A full breakdown of UI/UX rationale (Parallel layout, Cancellation styles, etc.) can be found in [DECISIONS.md](./DECISIONS.md).

## 🏁 Getting Started

### Prerequisites
- Node.js v18 or higher
- npm v9 or higher

### Installation
```bash
# Install dependencies
npm install
```

### Development
```bash
# Start the dev server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) (or the port specified by Vite) in your browser.

## 🧪 Switching Fixtures
The UI includes a toggle in the top-right to switch between:
- **Success Path**: A full 14-event research run with parallel retries and synthesis.
- **Error Path**: A partial run demonstrating an API timeout and coordinator abortion.

---

## 🤖 AI Assistance Disclosure
This project was developed with the assistance of **Antigravity (Google DeepMind)**, **ChatGPT**, and **Claude**. AI was utilized for:
- Drafting the core event-driven state architecture.
- Designing high-fidelity Tailwind CSS styles and glassmorphism utilities.
- Generating comprehensive project documentation and technical diagrams.
