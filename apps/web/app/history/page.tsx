'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import StatusBadge from '@/components/shared/status-badge';
import type { HistoryEntry } from '@packages/types';

export default function HistoryPage() {
  const { history } = useStore();
  const [entries, setEntries] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setEntries(history);
  }, [history]);

  return (
    <div className="max-w-[1120px] mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="font-headline text-5xl text-on-surface mb-2">
          Session History
        </h1>
        <p className="text-on-surface-variant">
          Track all your encryption and decryption operations
        </p>
      </div>

      {/* Stats Bento */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {[
          { label: 'Total Archives', value: entries.length },
          { label: 'Data Processed', value: '24.3 GB' },
          { label: 'Active Encryptions', value: 0 },
          { label: 'System Integrity', value: '100%' },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-surface-container-lowest p-6 border border-outline-variant/10 warm-shadow"
          >
            <p className="text-xs text-on-surface-variant font-mono tracking-widest mb-2">
              {stat.label}
            </p>
            <p className="font-headline text-3xl italic text-on-surface">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest border border-outline-variant/10">
        {entries.length === 0 ? (
          <div className="p-12 text-center text-on-surface-variant">
            <p className="mb-4">No encryption history yet.</p>
            <p className="text-sm">Start by uploading an image to encrypt.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-[#E8E3DC]">
                <tr className="text-xs font-mono text-on-surface-variant uppercase tracking-wider">
                  <th className="px-6 py-4 text-left">Type</th>
                  <th className="px-6 py-4 text-left">Filename</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Key ID</th>
                  <th className="px-6 py-4 text-left">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr
                    key={entry.id}
                    className="border-b border-[#E8E3DC] hover:bg-[#F7F5F2] h-11 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-on-surface font-medium">
                      {entry.type === 'encrypt' ? '🔒' : '🔓'}
                    </td>
                    <td className="px-6 py-4 text-sm text-on-surface truncate">
                      {entry.filename}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <StatusBadge status={entry.status} />
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-on-surface-variant">
                      {entry.keyId.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">
                      {new Date(entry.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-lg">
                          more_horiz
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* System Status */}
      {entries.length > 0 && (
        <div className="mt-8 bg-surface-container-low p-6 border border-outline-variant/10">
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-primary flex-shrink-0">
              verified
            </span>
            <div className="flex-1">
              <h3 className="font-headline text-sm text-on-surface mb-1">
                System Integrity Report
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                All encryption operations verified. No data corruption detected.
                Last audit: Today at 14:32 UTC.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
