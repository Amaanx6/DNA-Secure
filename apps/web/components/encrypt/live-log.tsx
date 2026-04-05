'use client';

import { useEffect, useRef } from 'react';

interface LiveLogProps {
  logs: string[];
}

export default function LiveLog({ logs }: LiveLogProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div
      ref={scrollRef}
      className="bg-[#1e1b18] p-6 rounded-sm font-mono text-[11px] text-[#C8B99A] overflow-auto h-64 scanline-effect"
    >
      <div className="space-y-1">
        {logs.length === 0 ? (
          <div className="text-[#C8B99A]/50">Awaiting encryption stream...</div>
        ) : (
          logs.map((log, idx) => (
            <div key={idx} className="whitespace-pre-wrap break-words">
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
