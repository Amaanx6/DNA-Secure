"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, RefreshCw } from "lucide-react";
import type { HistoryEntry } from "@packages/types";
import { fetchHistory } from "@/lib/api";

export default function HistoryPage() {
  const [rows, setRows] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (opts?: { silent?: boolean }) => {
    setLoading(true);
    try {
      const data = await fetchHistory();
      setRows(data);
      if (!opts?.silent) {
        toast.success(`Loaded ${data.length} record(s)`);
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load history");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load({ silent: true });
  }, [load]);

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            GET /api/history
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--text)] sm:text-4xl">
            Server history
          </h1>
          <p className="max-w-2xl text-[var(--muted)]">
            The API keeps an in-memory ledger of decrypt completions (demo). Refresh after successful
            decrypts to see new rows.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 self-start rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent)]/50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          Refresh
        </button>
      </header>

      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/10 bg-white/5 text-xs uppercase tracking-wide text-[var(--muted)]">
            <tr>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Filename</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {!loading && rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-[var(--muted)]">
                  No entries yet. Complete a decrypt to populate this list.
                </td>
              </tr>
            )}
            {rows.map((r) => (
              <tr key={`${r.id}-${r.date}`} className="hover:bg-white/[0.02]">
                <td className="px-4 py-3 font-mono text-xs text-[var(--accent)]">{r.id}</td>
                <td className="px-4 py-3 text-[var(--text)]">{r.filename}</td>
                <td className="px-4 py-3 text-[var(--muted)]">{r.type}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-300">
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-[var(--muted)]">{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
