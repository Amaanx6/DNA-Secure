"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Activity, BookOpen, Loader2, Server } from "lucide-react";
import { API_BASE } from "@/lib/env";
import { fetchApiRoot, fetchHealth, type ApiRoot } from "@/lib/api";

export default function SystemPage() {
  const [health, setHealth] = useState<{ status: string } | null>(null);
  const [root, setRoot] = useState<ApiRoot | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const [h, r] = await Promise.all([fetchHealth(), fetchApiRoot()]);
        if (!cancelled) {
          setHealth(h);
          setRoot(r);
        }
      } catch (e) {
        if (!cancelled) {
          toast.error(e instanceof Error ? e.message : "Probe failed");
          setHealth(null);
          setRoot(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const docsUrl = `${API_BASE}/docs`;

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          GET /health · GET /
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--text)] sm:text-4xl">
          API status & metadata
        </h1>
        <p className="max-w-2xl text-[var(--muted)]">
          Lightweight probes used by operators and deployment pipelines. Open the interactive OpenAPI
          console for full schema coverage.
        </p>
      </header>

      {loading && (
        <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
          <Loader2 className="h-4 w-4 animate-spin text-[var(--accent)]" />
          Contacting {API_BASE} …
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-6">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[var(--text)]">
            <Activity className="h-4 w-4 text-[var(--accent)]" />
            Health
          </div>
          {health ? (
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
              </span>
              <p className="text-lg font-medium capitalize text-[var(--text)]">{health.status}</p>
            </div>
          ) : (
            !loading && <p className="text-sm text-red-400">Unreachable</p>
          )}
          <p className="mt-4 font-mono text-xs text-[var(--muted)]">GET /health</p>
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-6">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[var(--text)]">
            <Server className="h-4 w-4 text-[var(--accent)]" />
            Service root
          </div>
          {root ? (
            <ul className="space-y-2 text-sm text-[var(--text)]">
              <li>
                <span className="text-[var(--muted)]">Message:</span> {root.message}
              </li>
              <li>
                <span className="text-[var(--muted)]">Version:</span> {root.version}
              </li>
              <li>
                <span className="text-[var(--muted)]">Docs path:</span>{" "}
                <code className="text-[var(--accent)]">{root.docs}</code>
              </li>
            </ul>
          ) : (
            !loading && <p className="text-sm text-red-400">No metadata</p>
          )}
          <p className="mt-4 font-mono text-xs text-[var(--muted)]">GET /</p>
        </section>
      </div>

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-6">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--text)]">
          <BookOpen className="h-4 w-4 text-[var(--accent)]" />
          Raw JSON
        </div>
        <pre className="max-h-64 overflow-auto rounded-xl bg-black/40 p-4 font-mono text-xs leading-relaxed text-teal-100/90 ring-1 ring-white/10">
          {JSON.stringify({ health, root, apiBase: API_BASE }, null, 2)}
        </pre>
        <a
          href={docsUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-[var(--accent)] hover:border-[var(--accent)]/50"
        >
          Open Swagger UI →
        </a>
      </section>
    </div>
  );
}
