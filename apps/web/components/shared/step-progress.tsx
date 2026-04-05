'use client';

interface StepProgressProps {
  currentStep: number;
  totalSteps?: number;
  title?: string;
  subtitle?: string;
}

export default function StepProgress({
  currentStep,
  totalSteps = 3,
  title,
  subtitle,
}: StepProgressProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-baseline gap-4">
          <span className="font-headline text-6xl text-primary opacity-20">
            {String(currentStep).padStart(2, '0')}
          </span>
          {title && (
            <div>
              <h1 className="font-headline text-5xl text-on-surface">{title}</h1>
              {subtitle && (
                <p className="font-body text-on-surface-variant mt-2">
                  {subtitle}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Progress indicator */}
      <div className="flex gap-2">
        {Array.from({ length: totalSteps }).map((_, idx) => (
          <div
            key={idx}
            className={`h-1 flex-1 rounded-full transition-colors ${
              idx < currentStep
                ? 'bg-primary'
                : idx === currentStep
                  ? 'bg-primary/50'
                  : 'bg-outline-variant/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
