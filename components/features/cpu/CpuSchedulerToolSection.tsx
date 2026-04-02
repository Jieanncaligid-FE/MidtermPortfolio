"use client";

import { useMemo, useState } from "react";

type ProcessRow = { name: string; arrivalTime: number; burstTime: number };

const initialForm = { name: "", arrival: "", burst: "" };

export function CpuSchedulerToolSection() {
  const [form, setForm] = useState(initialForm);
  const [processes, setProcesses] = useState<ProcessRow[]>([]);
  const [timeQuantum, setTimeQuantum] = useState("");
  const [metrics, setMetrics] = useState<{
    rows: { name: string; waiting: number; turnaround: number }[];
    avgWT: string;
    avgTAT: string;
  } | null>(null);
  const [gantt, setGantt] = useState<{ name: string; start: number; end: number }[]>([]);
  const [error, setError] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  function addProcess() {
    const trimmedName = form.name.trim();
    const arrival = Number(form.arrival);
    const burst = Number(form.burst);

    if (!trimmedName) {
      setError("Please enter process name.");
      return;
    }
    if (!Number.isFinite(arrival) || arrival < 0) {
      setError("Arrival time must be 0 or more.");
      return;
    }
    if (!Number.isFinite(burst) || burst <= 0) {
      setError("Burst time must be greater than 0.");
      return;
    }

    setProcesses((prev) => [...prev, { name: trimmedName, arrivalTime: arrival, burstTime: burst }]);
    setForm(initialForm);
    setError("");
    setMetrics(null);
    setGantt([]);
  }

  function removeProcess(index: number) {
    setProcesses((prev) => prev.filter((_, idx) => idx !== index));
    setMetrics(null);
    setGantt([]);
  }

  function clearAll() {
    setProcesses([]);
    setForm(initialForm);
    setTimeQuantum("");
    setMetrics(null);
    setGantt([]);
    setError("");
  }

  function roundRobin(list: ProcessRow[], quantum: number) {
    const ordered = list
      .map((proc, index) => ({ ...proc, originalIndex: index }))
      .sort((a, b) => a.arrivalTime - b.arrivalTime);

    const n = ordered.length;
    const remainingBurst = ordered.map((p) => p.burstTime);
    const waiting = Array(n).fill(0);
    const turnaround = Array(n).fill(0);
    const completed = Array(n).fill(false);
    const arrived = Array(n).fill(false);
    const queue: number[] = [];
    const ganttBlocks: { name: string; start: number; end: number }[] = [];
    let time = 0;
    let completedCount = 0;

    function enqueueArrivals() {
      ordered.forEach((proc, idx) => {
        if (!arrived[idx] && proc.arrivalTime <= time && !completed[idx]) {
          queue.push(idx);
          arrived[idx] = true;
        }
      });
    }

    enqueueArrivals();
    if (!queue.length) {
      time = ordered[0].arrivalTime;
      queue.push(0);
      arrived[0] = true;
    }

    while (completedCount < n) {
      if (!queue.length) {
        const nextIdx = ordered.findIndex((_, idx) => !completed[idx] && !arrived[idx]);
        if (nextIdx === -1) break;
        time = ordered[nextIdx].arrivalTime;
        queue.push(nextIdx);
        arrived[nextIdx] = true;
      }

      const idx = queue.shift()!;
      const slice = Math.min(remainingBurst[idx], quantum);
      ganttBlocks.push({ name: ordered[idx].name, start: time, end: time + slice });
      time += slice;
      remainingBurst[idx] -= slice;

      if (remainingBurst[idx] === 0) {
        completed[idx] = true;
        completedCount += 1;
        waiting[idx] = time - ordered[idx].arrivalTime - ordered[idx].burstTime;
        turnaround[idx] = time - ordered[idx].arrivalTime;
      }

      enqueueArrivals();
      if (!completed[idx] && !queue.includes(idx)) {
        queue.push(idx);
      }
    }

    const metricsByProcess = ordered.map((proc, idx) => ({
      name: proc.name,
      waiting: waiting[idx],
      turnaround: turnaround[idx],
      originalIndex: proc.originalIndex,
    }));

    metricsByProcess.sort((a, b) => a.originalIndex - b.originalIndex);

    const avgWT = (waiting.reduce((acc: number, value: number) => acc + value, 0) / n).toFixed(2);
    const avgTAT = (turnaround.reduce((acc: number, value: number) => acc + value, 0) / n).toFixed(2);

    return { metricsByProcess, ganttBlocks, avgWT, avgTAT };
  }

  function calculate() {
    if (!processes.length) {
      setError("Add some processes first.");
      return;
    }
    const quantum = Number(timeQuantum);
    if (!Number.isFinite(quantum) || quantum <= 0) {
      setError("Enter a valid time quantum (greater than 0).");
      return;
    }
    const { metricsByProcess, ganttBlocks, avgWT, avgTAT } = roundRobin(processes, quantum);
    setMetrics({ rows: metricsByProcess, avgWT, avgTAT });
    setGantt(ganttBlocks);
    setError("");
  }

  const resultTable = useMemo(() => {
    if (!metrics) return null;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Process</th>
              <th>Waiting Time (WT)</th>
              <th>Turnaround Time (TAT)</th>
            </tr>
          </thead>
          <tbody>
            {metrics.rows.map((row, idx) => (
              <tr key={`${row.name}-${idx}`}>
                <td>{row.name}</td>
                <td>{row.waiting}</td>
                <td>{row.turnaround}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="metrics">
          Avg WT: {metrics.avgWT} · Avg TAT: {metrics.avgTAT}
        </div>
      </div>
    );
  }, [metrics]);

  return (
    <section className="cpu-page">
      <div className="container">
        <h2>Round Robin CPU Scheduling</h2>
        <div className="input-group">
          <input name="name" placeholder="Process Name e.g., P1" value={form.name} onChange={handleChange} />
          <input
            name="arrival"
            type="number"
            placeholder="Arrival Time"
            value={form.arrival}
            onChange={handleChange}
            min={0}
          />
          <input
            name="burst"
            type="number"
            placeholder="Burst Time"
            value={form.burst}
            onChange={handleChange}
            min={1}
          />
          <input
            type="number"
            placeholder="Time Quantum"
            value={timeQuantum}
            onChange={(event) => setTimeQuantum(event.target.value)}
            min={1}
          />
          <button type="button" className="btn add-btn" onClick={addProcess}>
            Add Process
          </button>
          <button type="button" className="btn clear-btn" onClick={clearAll}>
            Clear All
          </button>
        </div>

        <h3>Processes</h3>
        <table>
          <thead>
            <tr>
              <th>Process</th>
              <th>Arrival Time (AT)</th>
              <th>Burst Time (BT)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {processes.length ? (
              processes.map((proc, index) => (
                <tr key={`${proc.name}-${index}`}>
                  <td>{proc.name}</td>
                  <td>{proc.arrivalTime}</td>
                  <td>{proc.burstTime}</td>
                  <td>
                    <button type="button" className="action-btn" onClick={() => removeProcess(index)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="no-processes">
                  No processes added yet. Add processes above to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {error ? (
          <p className="metrics" style={{ color: "#d92c21" }}>
            {error}
          </p>
        ) : null}

        <button type="button" className="btn calculate-btn" onClick={calculate}>
          Calculate RR
        </button>

        <h3>Result</h3>
        {resultTable}

        <h3>Gantt Chart</h3>
        <div className="gantt-chart">
          {gantt.map((block, index) => (
            <div key={`${block.name}-${index}`} className="gantt-block">
              {block.name}
              <div className="gantt-time">
                {block.start} - {block.end}
              </div>
            </div>
          ))}
          {!gantt.length ? <span className="no-processes">Run a calculation to view the chart.</span> : null}
        </div>
      </div>
    </section>
  );
}
