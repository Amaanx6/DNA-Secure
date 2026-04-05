interface StatusBadgeProps {
  status: 'complete' | 'processing' | 'failed';
}

const statusConfig = {
  complete: {
    label: 'Complete',
    className: 'bg-tertiary/10 text-tertiary border border-tertiary/20',
    icon: 'check_circle',
  },
  processing: {
    label: 'Processing',
    className: 'bg-secondary/10 text-secondary border border-secondary/20',
    icon: 'progress_activity',
  },
  failed: {
    label: 'Failed',
    className: 'bg-error/10 text-error border border-error/20',
    icon: 'error',
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] ?? statusConfig.failed;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono rounded-sm ${config.className}`}
    >
      <span className="material-symbols-outlined text-xs" style={{ fontSize: '12px' }}>
        {config.icon}
      </span>
      {config.label}
    </span>
  );
}
