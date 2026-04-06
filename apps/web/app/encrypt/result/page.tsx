'use client';

import { useRouter } from 'next/navigation';

export default function ResultPage() {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="font-headline text-5xl text-on-surface mb-2">Encryption Complete</h1>
        <p className="text-on-surface-variant font-body">Your medical image has been securely encrypted with DNA-based encoding.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <div className="bg-white p-8">
          <p className="text-xs font-mono text-on-surface-variant uppercase mb-4">Original Image</p>
          <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-400 rounded mb-4"></div>
          <p className="text-sm text-on-surface-variant font-body">CR_SCAN_A092_BRAIN.dcm</p>
        </div>

        <div className="bg-white p-8">
          <p className="text-xs font-mono text-on-surface-variant uppercase mb-4">Encrypted Output</p>
          <div className="h-64 bg-gradient-to-br from-amber-900 to-amber-600 rounded mb-4"></div>
          <p className="text-sm text-on-surface-variant font-body">CR_SCAN_A092_BRAIN_ENC.bin</p>
        </div>
      </div>

      <div className="bg-surface-container-low p-6 mb-12">
        <h3 className="font-headline text-lg text-on-surface mb-4">Encryption Metrics</h3>
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-xs font-mono text-on-surface-variant">PSNR</span>
            <p className="font-headline text-2xl">42.84 dB</p>
          </div>
          <div>
            <span className="text-xs font-mono text-on-surface-variant">SSIM</span>
            <p className="font-headline text-2xl">0.9992</p>
          </div>
          <div>
            <span className="text-xs font-mono text-on-surface-variant">NPCR</span>
            <p className="font-headline text-2xl">99.64%</p>
          </div>
          <div>
            <span className="text-xs font-mono text-on-surface-variant">UACI</span>
            <p className="font-headline text-2xl">33.48%</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 mb-12">
        <p className="text-xs font-mono text-on-surface-variant uppercase mb-3">Encryption Key (Save Securely)</p>
        <div className="bg-surface-container-lowest p-4 font-mono text-xs overflow-auto mb-4">
          DNA_ENC_KEY_01_HUFFMAN_DNA_0842_...ARC-99-XF-22
        </div>
        <button className="w-full bg-primary text-white py-2 text-sm hover:opacity-90">Copy Key</button>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => router.push('/history')}
          className="flex-1 bg-primary text-white py-3 font-medium hover:opacity-90"
        >
          View History
        </button>
        <button
          onClick={() => router.push('/encrypt/upload')}
          className="flex-1 bg-white border border-outline-variant text-on-surface py-3 font-medium hover:bg-surface-container-low"
        >
          Encrypt Another
        </button>
      </div>
    </div>
  );
}