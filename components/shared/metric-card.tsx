'use client';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  sparkBars?: number[];
}

export default function MetricCard({
  label,
  value,
  unit,
  sparkBars,
}: MetricCardProps) {
  const maxValue = sparkBars ? Math.max(...sparkBars) : 100;

  return (
    <div className="bg-surface-container-lowest p-8 border border-outline-variant/10">
      <div className="text-xs uppercase tracking-widest text-on-surface-variant font-mono mb-4">
        {label}
      </div>
      <div className="w-12 h-[1px] bg-primary mb-4"></div>
      <div className="text-4xl font-headline font-light text-on-surface mb-4">
        {value}
        {unit && <span className="text-lg">{unit}</span>}
      </div>

      {sparkBars && sparkBars.length > 0 && (
        <div className="flex items-end gap-1">
          {sparkBars.map((bar, idx) => (
            <div
              key={idx}
              className={`flex-1 transition-all ${
                idx < sparkBars.length / 2
                  ? 'bg-primary'
                  : 'bg-primary/20'
              }`}
              style={{
                height: `${(bar / maxValue) * 20}px`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
