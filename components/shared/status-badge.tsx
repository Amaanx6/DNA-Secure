'use client';

type StatusType = 'complete' | 'processing' | 'failed';

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
}

const statusColors: Record<StatusType, { dot: string; bg: string; text: string }> = {
  complete: {
    dot: 'bg-tertiary',
    bg: 'bg-tertiary/10',
    text: 'text-tertiary',
  },
  processing: {
    dot: 'bg-primary',
    bg: 'bg-primary/10',
    text: 'text-primary',
  },
  failed: {
    dot: 'bg-error',
    bg: 'bg-error/10',
    text: 'text-error',
  },
};

export default function StatusBadge({
  status,
  label,
}: StatusBadgeProps) {
  const colors = statusColors[status];
  const statusLabel = label || status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${colors.bg}`}
    >
      <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
      <span className={`text-xs font-medium ${colors.text}`}>
        {statusLabel}
      </span>
    </div>
  );
}
