'use client';

import MetricCard from '@/components/shared/metric-card';

const sampleMetrics = {
  psnr: 42.84,
  ssim: 0.9992,
  npcr: 99.64,
  uaci: 33.48,
};

export default function AnalysisPage() {
  return (
    <div className="max-w-[1120px] mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="font-headline text-5xl text-on-surface mb-2">
          Analysis Dashboard
        </h1>
        <p className="text-on-surface-variant">
          Detailed security metrics and visual analysis of your encrypted image
        </p>
      </div>

      {/* Metrics Section */}
      <div className="mb-12">
        <h2 className="font-headline text-2xl text-on-surface mb-6">
          Security Metrics
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="PSNR"
            value={sampleMetrics.psnr.toFixed(2)}
            unit="dB"
            sparkBars={[
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
            ]}
          />
          <MetricCard
            label="SSIM"
            value={sampleMetrics.ssim.toFixed(4)}
            sparkBars={[
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
            ]}
          />
          <MetricCard
            label="NPCR"
            value={sampleMetrics.npcr.toFixed(2)}
            unit="%"
            sparkBars={[
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
            ]}
          />
          <MetricCard
            label="UACI"
            value={sampleMetrics.uaci.toFixed(2)}
            unit="%"
            sparkBars={[
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
            ]}
          />
        </div>
      </div>

      {/* Histogram Section */}
      <div className="mb-12 bg-surface-container-lowest p-8 border border-outline-variant/10">
        <h2 className="font-headline text-xl text-on-surface mb-4">
          Pixel Intensity Distribution
        </h2>
        <div className="h-32 flex items-end gap-1">
          {Array.from({ length: 32 }).map((_, idx) => (
            <div
              key={idx}
              className={`flex-1 ${
                idx < 16 ? 'bg-secondary' : 'bg-primary'
              }`}
              style={{
                height: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        <div className="mt-4 flex justify-between text-xs text-on-surface-variant font-mono">
          <span>Original (Blue)</span>
          <span>Encrypted (Amber)</span>
        </div>
      </div>

      {/* Heatmap Section */}
      <div className="bg-surface-container-lowest p-8 border border-outline-variant/10">
        <h2 className="font-headline text-xl text-on-surface mb-4">
          Entropy Heatmap
        </h2>
        <div className="space-y-4">
          <div className="h-32 w-full bg-gradient-to-r from-[#F7F5F2] via-[#d8c3b5] to-[#C17B3F]"></div>
          <div className="flex justify-between text-xs text-on-surface-variant font-mono">
            <span>Low Entropy</span>
            <span>High Entropy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
