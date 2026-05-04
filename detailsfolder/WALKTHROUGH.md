# JcurveIQ Agent Panel - Interactive Walkthrough

This guide provides a "side-by-side" explanation of how the code transforms raw data into the professional UI you see on screen.

## 🟢 1. State Management (`useRunState.js`)
**Code Logic (The Brain)**:
The `reducer` function is the heart of the app. It listens for `TASK_SPAWN` events and checks the `is_parallel` flag.

```javascript
case 'TASK_SPAWN':
  return {
    ...state,
    tasks: [...state.tasks, {
      ...action.payload,
      status: 'running',
      isParallel: !!action.payload.is_parallel
    }]
  };
```

---

## 🟢 2. Parallel Grouping (`TaskList.jsx`)
**Code Logic (The Layout)**:
The `TaskList` scans the tasks. If it sees multiple parallel tasks in a row, it bundles them into a grid.

```javascript
tasks.forEach((task) => {
  if (task.isParallel) {
    currentParallelBatch.push(task);
  } else {
    // Render the grid if we have parallel tasks waiting
    if (currentParallelBatch.length > 0) {
      renderedGroups.push(<ParallelGroup tasks={currentParallelBatch} />);
      currentParallelBatch = [];
    }
    renderedGroups.push(<TaskCard task={task} />);
  }
});
```

---

## 🟢 3. Log Protection (`ToolCallRow.jsx`)
**Code Logic (The Safety)**:
Long technical logs can break a UI. We use `break-all` and `overflow-x-auto` to ensure the text stays inside the box.

```javascript
<div className="flex-wrap gap-x-2 text-xs font-mono">
  <span className="font-bold">{tool}</span>
  <span className="text-white/40 break-all">
    ({JSON.stringify(args)})
  </span>
</div>
```

---

## 🟢 4. Synthesis Engine (`FinalOutput.jsx`)
**Code Logic (The Result)**:
When the final `RUN_COMPLETE` signal arrives, this component renders the synthesized result with a quality score animation.

```javascript
<div className="bg-emerald-500 flex items-center gap-2 px-4 py-1 rounded-full">
  <Sparkles size={14} className="text-white" />
  <span className="text-[10px] font-bold text-white uppercase tracking-wider">
    Synthesized Result
  </span>
</div>
```

---

### 📸 Visual Reference
(See the images in your `detailsfolder` to match these code blocks with the color-coded borders!)
- 🔴 **Red Border** = Main Dashboard logic (`AgentRunPanel.jsx`)
- 🔵 **Blue Border** = Header & Timer logic (`RunHeader.jsx`)
- 🟢 **Green Border** = Grouping & List logic (`TaskList.jsx`)
- 🟠 **Orange Border** = Task Status logic (`TaskCard.jsx`)
- 🟣 **Purple Border** = API Log wrapping logic (`ToolCallRow.jsx`)
- 🟡 **Teal Border** = Synthesis rendering logic (`FinalOutput.jsx`)
