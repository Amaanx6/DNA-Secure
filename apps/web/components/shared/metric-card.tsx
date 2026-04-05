interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  sparkBars?: number[];
}

export default function MetricCard({ label, value, unit, sparkBars }: MetricCardProps) {
  return (
    <div className="bg-surface-container-lowest p-6 border border-outline-variant/10 warm-shadow">
      <p className="text-xs font-mono text-on-surface-variant uppercase tracking-widest mb-3">
        {label}
      </p>
      <p className="font-headline text-3xl italic text-on-surface mb-4">
        {value}
        {unit && (
          <span className="text-lg text-on-surface-variant ml-1">{unit}</span>
        )}
      </p>

      {sparkBars && sparkBars.length > 0 && (
        <div className="flex items-end gap-0.5 h-8">
          {sparkBars.map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-primary/30 rounded-sm"
              style={{ height: `${Math.max(8, h)}%` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
