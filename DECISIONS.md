# Design Decisions - JcurveIQ Agent Run Panel

This document outlines the reasoning behind the architectural and UI/UX choices made during the development of the Agent Run Panel.

## 1. Agent Thoughts & Reasoning
**Decision:** Agent "thoughts" are displayed in a subtle, blue-tinted box with a brain icon. They are collapsed by default to keep the UI clean, but expand automatically when a task is active.
**Reasoning:** Financial analysts need to understand *why* an agent is performing a task to build trust. However, once a task is finished, the reasoning becomes secondary to the output, so it's hidable to reduce visual noise.

## 2. Parallel Task Layout
**Decision:** Grouped using a shared header with a left-border accent and a "Layers" icon. On desktop, they use a 2-column grid; on mobile, they stack.
**Reasoning:** The execution model is inherently non-linear. A simple list would misrepresent the speed and efficiency of parallel execution. The left-border accent visually "binds" the related tasks together.

## 3. Partial vs. Final Outputs
**Decision:** Partial outputs (streaming) are displayed with a "shimmer" animation to indicate they are in progress. Once `is_final: true` arrives, the shimmer stops, and the text becomes solid.
**Reasoning:** Real-time feedback is crucial for UX. The shimmer effect provides a clear "live" indicator without the jerkiness of a traditional spinner, letting the user read content as it arrives.

## 4. Cancelled/Skipped Status
**Decision:** Styled as "Skipped — sufficient data" using a neutral grey/white muted style.
**Reasoning:** In multi-agent systems, "cancellation" isn't always an error; often, it's an optimization (e.g., if another agent already found the answer). Using a neutral style prevents the user from perceiving it as a failure.

## 5. Dependency & Execution Flow
**Decision:** Order is implied by the vertical layout and spawning timestamps. 
**Reasoning:** While explicit "DAG" (Directed Acyclic Graph) lines can be visually striking, they often clutter the UI in deep pipelines. A clean vertical flow with parallel groupings is more readable for high-density financial data.

## 6. Premium Aesthetics
**Decision:** Used a "Dark Mode First" approach with glassmorphism, subtle gradients (radial-gradient background), and Lucide icons.
**Reasoning:** Financial tools are often dry and utilitarian. A premium, high-fidelity UI (reminiscent of Bloomberg or high-end trading platforms) enhances the perceived value of the AI research and provides a superior user experience.
