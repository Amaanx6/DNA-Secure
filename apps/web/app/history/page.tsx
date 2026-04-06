'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import type { HistoryEntry } from '@packages/types';

export default function HistoryPage() {
  const { history } = useStore();
  const [entries, setEntries] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setEntries(history.slice(0, 5));
  }, [history]);

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="font-headline text-5xl text-on-surface mb-2">Session Ledger</h1>
        <p className="text-on-surface-variant font-body">
          A comprehensive audit of DNA archival operations. Every molecular sequence transformation is logged with cryptographic precision.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-12">
        {[
          { label: 'TOTAL ARCHIVES', value: '1,284', italic: true },
          { label: 'DATA PROCESSED', value: '42.8 TB' },
          { label: 'ACTIVE ENCRYPTIONS', value: '12' },
          { label: 'SYSTEM INTEGRITY', value: '99.9%' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 warm-shadow">
            <p className="text-xs text-on-surface-variant font-mono uppercase mb-2">{stat.label}</p>
            <p className={`font-headline text-3xl text-on-surface ${stat.italic ? 'italic' : ''}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between mb-6">
        <button className="flex items-center gap-2 px-4 py-2 text-sm border border-outline-variant">
          ⚙ Filter
        </button>
        <button className="px-4 py-2 text-sm bg-primary text-white hover:opacity-90">
          ⬇ Export CSV
        </button>
      </div>

      <div className="bg-white overflow-hidden mb-12">
        <table className="w-full text-sm font-body">
          <thead className="border-b border-outline-variant/30 bg-surface-container-lowest">
            <tr className="text-xs font-mono text-on-surface-variant uppercase">
              <th className="px-6 py-4 text-left">Filename</th>
              <th className="px-6 py-4 text-left">Type</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Key ID</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-on-surface-variant">No history yet</td>
              </tr>
            ) : (
              entries.map((e) => (
                <tr key={e.id} className="border-b border-outline-variant/10 hover:bg-surface-container-low h-12">
                  <td className="px-6 py-4 text-on-surface font-medium">{e.filename}</td>
                  <td className="px-6 py-4 text-on-surface capitalize">{e.type}</td>
                  <td className="px-6 py-4 text-on-surface-variant">Oct 24, 2024</td>
                  <td className="px-6 py-4">
                    <span className="w-2 h-2 rounded-full bg-success inline-block mr-2"></span>
                    Complete
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-on-surface-variant">ARC-99-XF-22</td>
                  <td className="px-6 py-4">
                    <button className="text-on-surface-variant hover:text-primary">⋯</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mb-12 text-sm font-body">
        <span className="text-on-surface-variant">Showing 1-5 of 1,284 entries</span>
        <div className="flex gap-2">
          <button className="px-3 py-2 text-on-surface-variant">PREVIOUS</button>
          <button className="px-3 py-2 bg-primary text-white">1</button>
          <button className="px-3 py-2 text-on-surface-variant">2</button>
          <button className="px-3 py-2 text-on-surface-variant">3</button>
          <button className="px-3 py-2 text-on-surface-variant">NEXT</button>
        </div>
      </div>

      <div className="bg-surface-container-low p-6">
        <div className="flex gap-4">
          <div className="text-2xl">📊</div>
          <div className="flex-1">
            <h3 className="font-headline text-sm text-on-surface mb-1">Integrity Report</h3>
            <p className="text-xs text-on-surface-variant font-body mb-4">
              All sessions validated against central DNA repository. Keys cycled every 24 hours.
            </p>
            <div className="flex gap-8 text-xs font-mono">
              <div>
                <div className="text-on-surface-variant">LAST AUDIT</div>
                <div className="text-on-surface font-bold">2024-10-26 09:12:00</div>
              </div>
              <div>
                <div className="text-on-surface-variant">ARCHIVIST MODE</div>
                <div className="text-on-surface font-bold">NODE-PRIME-01</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}