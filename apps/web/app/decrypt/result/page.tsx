'use client';

import Link from 'next/link';
import ImageDiffViewer from '@/components/encrypt/image-diff-viewer';
import MetricCard from '@/components/shared/metric-card';
import { downloadBlob, base64ToBlob } from '@/lib/api';

// Sample decrypted result
const sampleResult = {
  decryptedImageBase64: '',
  metrics: {
    psnr: 48.92,
    ssim: 0.9998,
  },
};

export default function DecryptResultPage() {
  const handleDownloadImage = () => {
    if (sampleResult.decryptedImageBase64) {
      const blob = base64ToBlob(
        sampleResult.decryptedImageBase64,
        'image/png'
      );
      downloadBlob(blob, 'decrypted_image.png');
    }
  };

  return (
    <div className="max-w-[1120px] mx-auto px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="font-headline text-5xl text-on-surface mb-2">
          Decryption Complete
        </h1>
        <p className="text-on-surface-variant">
          Your image has been successfully recovered from encryption.
        </p>
      </div>

      {/* Recovery Metrics */}
      <div className="mb-12">
        <h2 className="font-headline text-2xl text-on-surface mb-6">
          Recovery Quality
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <MetricCard
            label="PSNR"
            value={sampleResult.metrics.psnr.toFixed(2)}
            unit="dB"
          />
          <MetricCard
            label="SSIM"
            value={sampleResult.metrics.ssim.toFixed(4)}
          />
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={handleDownloadImage}
          className="flex-1 bg-primary text-on-primary py-3 font-medium text-sm tracking-wide hover:bg-primary-container transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">
            download
          </span>
          Download Recovered Image
        </button>

        <Link
          href="/decrypt/upload"
          className="flex-1 bg-transparent border border-on-surface/20 text-on-surface py-3 font-medium text-sm tracking-wide hover:bg-surface-container-high transition-all text-center"
        >
          Decrypt Another
        </Link>

        <Link
          href="/"
          className="flex-1 bg-transparent border border-on-surface/20 text-on-surface py-3 font-medium text-sm tracking-wide hover:bg-surface-container-high transition-all text-center"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
}
