'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageDiffViewer from '@/components/encrypt/image-diff-viewer';
import MetricCard from '@/components/shared/metric-card';
import { useStore } from '@/lib/store';
import { downloadBlob, base64ToBlob } from '@/lib/api';

export default function ResultPage() {
  const router = useRouter();
  const { encryptResult, uploadedFile } = useStore();

  if (!encryptResult || !uploadedFile) {
    return (
      <div className="max-w-[1120px] mx-auto px-8 py-12">
        <div className="text-center py-20">
          <p className="text-on-surface-variant mb-4">
            No encryption result available.
          </p>
          <Link href="/encrypt/upload" className="text-primary hover:underline">
            Start a new encryption
          </Link>
        </div>
      </div>
    );
  }

  const handleDownloadImage = () => {
    const blob = base64ToBlob(encryptResult.encryptedImageBase64, 'image/png');
    downloadBlob(blob, `encrypted_${uploadedFile.name}`);
  };

  const handleDownloadKey = () => {
    const keyBlob = new Blob([encryptResult.keyJson], { type: 'application/json' });
    downloadBlob(keyBlob, 'encryption_key.json');
  };

  const metrics = encryptResult.metrics;

  return (
    <div className="max-w-[1120px] mx-auto px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="font-headline text-5xl text-on-surface mb-2">
          Encryption Complete
        </h1>
        <p className="text-on-surface-variant">
          Your medical image has been securely encrypted with DNA sequences.
        </p>
      </div>

      {/* Image Viewer */}
      <div className="mb-12 bg-surface-container-lowest p-8 border border-outline-variant/10">
        <ImageDiffViewer
          originalBase64={encryptResult.encryptedImageBase64}
          encryptedBase64={encryptResult.encryptedImageBase64}
          heatmapBase64={encryptResult.roiHeatmapBase64}
        />
      </div>

      {/* Metrics */}
      <div className="mb-12">
        <h2 className="font-headline text-2xl text-on-surface mb-6">
          Security Metrics
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="PSNR"
            value={metrics.psnr.toFixed(2)}
            unit="dB"
          />
          <MetricCard
            label="SSIM"
            value={metrics.ssim.toFixed(4)}
          />
          <MetricCard
            label="NPCR"
            value={metrics.npcr.toFixed(2)}
            unit="%"
          />
          <MetricCard
            label="UACI"
            value={metrics.uaci.toFixed(2)}
            unit="%"
          />
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row gap-4 bg-surface-container-low p-6 rounded-sm">
        <button
          onClick={handleDownloadImage}
          className="flex-1 bg-primary text-on-primary py-3 font-medium text-sm tracking-wide hover:bg-primary-container transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">
            download
          </span>
          Download Encrypted Image
        </button>

        <button
          onClick={handleDownloadKey}
          className="flex-1 bg-primary text-on-primary py-3 font-medium text-sm tracking-wide hover:bg-primary-container transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">
            download
          </span>
          Download Key File
        </button>

        <Link
          href="/analysis"
          className="flex-1 bg-transparent border border-on-surface/20 text-on-surface py-3 font-medium text-sm tracking-wide hover:bg-surface-container-high transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">
            analytics
          </span>
          View Analysis
        </Link>

        <button
          onClick={() => router.push('/encrypt/upload')}
          className="flex-1 bg-transparent border border-on-surface/20 text-on-surface py-3 font-medium text-sm tracking-wide hover:bg-surface-container-high transition-all"
        >
          New Encryption
        </button>
      </div>
    </div>
  );
}
