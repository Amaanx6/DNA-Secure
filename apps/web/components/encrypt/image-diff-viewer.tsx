'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageDiffViewerProps {
  originalBase64: string;
  encryptedBase64: string;
  heatmapBase64?: string;
}

export default function ImageDiffViewer({
  originalBase64,
  encryptedBase64,
  heatmapBase64,
}: ImageDiffViewerProps) {
  const [showHeatmap, setShowHeatmap] = useState(false);

  const originalDataUrl = `data:image/png;base64,${originalBase64}`;
  const encryptedDataUrl = `data:image/png;base64,${encryptedBase64}`;
  const heatmapDataUrl = heatmapBase64
    ? `data:image/png;base64,${heatmapBase64}`
    : null;

  return (
    <div className="space-y-4">
      {/* Header with Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="font-headline text-lg text-on-surface">Results</h3>
        {heatmapDataUrl && (
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className="px-4 py-2 text-xs font-medium tracking-wide border border-primary text-primary hover:bg-primary/10 transition-all"
          >
            {showHeatmap ? 'Hide' : 'Show'} Heatmap
          </button>
        )}
      </div>

      {/* Two-Panel Viewer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Original */}
        <div className="relative">
          <div className="text-xs uppercase tracking-widest text-on-surface-variant font-mono mb-2">
            Original Image
          </div>
          <div className="relative aspect-square bg-surface-container-low border border-outline-variant/10 overflow-hidden rounded-sm">
            <img
              src={originalDataUrl}
              alt="Original image"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Encrypted or Heatmap */}
        <div className="relative">
          <div className="text-xs uppercase tracking-widest text-on-surface-variant font-mono mb-2">
            {showHeatmap ? 'Heatmap' : 'Encrypted Image'}
          </div>
          <div className="relative aspect-square bg-surface-container-low border border-outline-variant/10 overflow-hidden rounded-sm">
            <img
              src={showHeatmap && heatmapDataUrl ? heatmapDataUrl : encryptedDataUrl}
              alt={showHeatmap ? 'Heatmap' : 'Encrypted image'}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
