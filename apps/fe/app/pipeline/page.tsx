"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Loader2, Play, Square, Terminal } from "lucide-react";
import { streamEncryptionProgress, type StreamEvent } from "@/lib/api";
import { cn } from "@/lib/cn";

export default function PipelinePage() {
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [last, setLast] = useState<StreamEvent | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const start = async () => {
    if (running) return;
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setRunning(true);
    setLogs([]);
    setLast(null);
    toast.message("Listening to GET /api/encrypt/stream …");
    await streamEncryptionProgress(
      (evt) => {
        setLast(evt);
        if (evt.log) setLogs((prev) => [...prev, evt.log]);
      },
      () => {
        setRunning(false);
        toast.success("Stream finished");
      },
      (err) => {
        setRunning(false);
        toast.error(err.message);
      },
      abortRef.current.signal
    );
  };

  const stop = () => {
    abortRef.current?.abort();
    setRunning(false);
    toast.message("Stream aborted");
  };

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          GET /api/encrypt/stream
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--text)] sm:text-4xl">
          Operator pipeline stream
        </h1>
        <p className="max-w-2xl text-[var(--muted)]">
          Server-Sent Events simulate each encryption stage. Use this view to validate connectivity,
          latency, and logging before running real workloads.
        </p>
      </header>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={start}
          disabled={running}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-[var(--bg)] transition enabled:hover:brightness-110 disabled:opacity-40"
        >
          {running ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
          Start stream
        </button>
        <button
          type="button"
          onClick={stop}
          disabled={!running}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-[var(--text)] transition enabled:hover:border-red-400/50 enabled:hover:text-red-300 disabled:opacity-30"
        >
          <Square className="h-4 w-4" />
          Stop
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-5 lg:col-span-2">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--text)]">
            <Terminal className="h-4 w-4 text-[var(--accent)]" />
            Event log
          </div>
          <div className="h-[420px] overflow-auto rounded-xl bg-black/40 p-4 font-mono text-[11px] leading-relaxed text-teal-100/90 ring-1 ring-white/10">
            {logs.length === 0 && (
              <span className="text-[var(--muted)]">No events yet. Press start stream.</span>
            )}
            {logs.map((line, i) => (
              <div key={`${i}-${line}`}>{line}</div>
            ))}
            <div ref={bottomRef} />
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-5">
          <h2 className="text-sm font-semibold text-[var(--text)]">Latest frame</h2>
          {!last && (
            <p className="text-sm text-[var(--muted)]">Waiting for the first SSE payload…</p>
          )}
          {last && (
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                  Stage
                </p>
                <p className="font-mono text-sm text-[var(--accent)]">{last.stage}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                  Status
                </p>
                <p className="text-sm text-[var(--text)]">{last.status}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                  Progress
                </p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={cn(
                      "h-full rounded-full bg-[var(--accent)] transition-all",
                      last.status === "complete" && "shadow-[0_0_12px_rgba(45,212,191,0.6)]"
                    )}
                    style={{ width: `${last.progress}%` }}
                  />
                </div>
                <p className="mt-1 text-right text-xs text-[var(--muted)]">{last.progress}%</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
