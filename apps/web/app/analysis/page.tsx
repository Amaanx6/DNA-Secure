'use client';

export default function AnalysisPage() {
  const metrics = [
    { label: 'PEAK SNR (PSNR)', value: '42.84', unit: 'dB' },
    { label: 'STRUCTURAL SIM. (SSIM)', value: '0.9992' },
    { label: 'PIXEL CHANGE RATE (NPCR)', value: '99.64', unit: '%' },
    { label: 'AVG. INTENSITY (UACI)', value: '33.48', unit: '%' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="font-headline text-5xl text-on-surface mb-3">Clinical Integrity Analysis</h1>
        <p className="text-on-surface-variant font-body max-w-2xl">
          Verification report for Archive ID: DNA-8829-X. Statistical validation of cryptographic diffusion and confusion properties within the nucleotide encoding layer.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-12">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white p-6 warm-shadow">
            <p className="text-xs font-mono text-on-surface-variant uppercase mb-3">{m.label}</p>
            <div className="flex items-baseline gap-1">
              <p className="font-headline text-3xl text-on-surface">{m.value}</p>
              {m.unit && <span className="text-on-surface-variant text-sm">{m.unit}</span>}
            </div>
            <div className="flex gap-1 mt-4">
              {[85, 72, 90, 88, 76].map((v, j) => (
                <div key={j} className="flex-1 h-6 bg-primary rounded-sm" style={{ opacity: v / 100 }}></div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-12">
        <h2 className="font-headline text-2xl text-on-surface mb-6">Pixel Intensity Distribution</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8">
            <p className="text-xs font-mono text-on-surface-variant mb-2">Original Source</p>
            <p className="text-xs text-on-surface-variant mb-6">Entropy: 7.216 bits/px</p>
            <div className="h-48 flex items-end gap-0.5">
              {Array(32).fill(0).map((_, i) => (
                <div key={i} className="flex-1 bg-blue-400" style={{ height: `${30 + Math.sin(i) * 40 + Math.random() * 30}%` }}></div>
              ))}
            </div>
          </div>
          <div className="bg-white p-8">
            <p className="text-xs font-mono text-on-surface-variant mb-2">Encrypted Payload</p>
            <p className="text-xs text-on-surface-variant mb-6">Entropy: 7.998 bits/px</p>
            <div className="h-48 flex items-end gap-0.5">
              {Array(32).fill(0).map((_, i) => (
                <div key={i} className="flex-1 bg-amber-600" style={{ height: `${50 + Math.random() * 50}%` }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-headline text-2xl text-on-surface mb-6">Local Entropy Mapping</h2>
        <p className="text-on-surface-variant font-body text-sm mb-8 max-w-2xl">
          This spatial visualization identifies regions of potential vulnerability. A perfectly encrypted DNA sequence exhibits uniform high entropy across the entire spatial domain.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8">
            <div className="flex justify-between mb-3 text-xs font-mono text-on-surface-variant">
              <span>INTENSITY SCALE</span>
              <span>BITS PER PIXEL</span>
            </div>
            <div className="h-8 bg-gradient-to-r from-amber-100 to-amber-900 mb-2"></div>
            <div className="flex justify-between text-xs font-mono text-on-surface-variant">
              <span>0.0 (LOW)</span>
              <span>4.0</span>
              <span>8.0 (MAX)</span>
            </div>
          </div>
          <div className="bg-black rounded flex items-center justify-center h-64 overflow-hidden">
            <svg viewBox="0 0 256 256" className="w-48 h-48">
              <defs>
                <radialGradient id="entropy">
                  <stop offset="0%" stopColor="#00FF00" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#001100" stopOpacity="1" />
                </radialGradient>
              </defs>
              <circle cx="128" cy="128" r="100" fill="url(#entropy)" />
              {Array(20).fill(0).map((_, i) => (
                <circle key={i} cx="128" cy="128" r={20 + i * 4} fill="none" stroke="#00FF00" strokeWidth="1" opacity="0.2" />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}