'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DropZone from '@/components/encrypt/drop-zone';
import { useStore } from '@/lib/store';

export default function UploadPage() {
  const router = useRouter();
  const { setUploadedFile } = useStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setUploadedFile(file);
  };

  const handleNext = () => {
    if (selectedFile) router.push('/encrypt/configure');
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="mb-12">
        <div className="flex gap-8 mb-8">
          {[
            { num: '01', label: 'UPLOAD IMAGE', active: true },
            { num: '02', label: 'CONFIGURATION', active: false },
            { num: '03', label: 'ENCRYPTION', active: false },
          ].map((step, i) => (
            <div key={i} className="text-center">
              <div className={`text-3xl font-headline font-bold mb-2 ${step.active ? 'text-primary' : 'text-on-surface-variant opacity-40'}`}>
                {step.num}
              </div>
              <p className={`text-xs font-mono uppercase ${step.active ? 'text-primary font-bold' : 'text-on-surface-variant opacity-40'}`}>
                {step.label}
              </p>
            </div>
          ))}
        </div>
        <h1 className="font-headline text-5xl text-on-surface mb-2">Archival DNA Encoding</h1>
        <p className="text-on-surface-variant font-body text-sm">Initialize the molecular sequence generation process.</p>
      </div>

      <div className="grid md:grid-cols-[2fr_1fr] gap-12">
        <div className="border-2 border-dashed border-on-surface-variant/20 rounded p-12 bg-white flex flex-col items-center justify-center min-h-80">
          {selectedFile ? (
            <div className="text-center">
              <div className="text-5xl mb-3">✓</div>
              <p className="font-headline text-lg text-on-surface mb-1">{selectedFile.name}</p>
              <p className="text-sm text-on-surface-variant font-body mb-4">{(selectedFile.size / 1024 / 1024).toFixed(1)} MB</p>
              <button onClick={() => setSelectedFile(null)} className="text-primary text-sm font-medium hover:underline">
                Choose different file
              </button>
            </div>
          ) : (
            <DropZone onFileSelected={handleFileSelect} />
          )}
        </div>

        <div>
          <div className="bg-white p-6 warm-shadow mb-6">
            <h3 className="font-headline text-lg text-on-surface mb-6">Current Selection</h3>
            {selectedFile ? (
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-mono text-on-surface-variant uppercase">Filename</span>
                  <p className="text-sm text-on-surface font-medium mt-1">{selectedFile.name}</p>
                </div>
                <div>
                  <span className="text-xs font-mono text-on-surface-variant uppercase">File Size</span>
                  <p className="text-sm text-on-surface font-medium mt-1">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <div>
                  <span className="text-xs font-mono text-on-surface-variant uppercase">Format</span>
                  <p className="text-sm text-on-surface font-medium mt-1">DICOM Standard v3.0 ✓</p>
                </div>
                <div className="pt-4 border-t border-outline-variant/20">
                  <button
                    onClick={handleNext}
                    className="w-full bg-primary text-white py-3 font-medium text-sm hover:opacity-90"
                  >
                    Continue to Configure →
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-on-surface-variant text-center py-8 font-body">No file selected</p>
            )}
          </div>

          <div className="bg-surface-container-high p-6">
            <div className="flex gap-3">
              <div className="text-2xl">🔒</div>
              <div>
                <h4 className="font-headline text-sm text-on-surface mb-1">Security Verification</h4>
                <p className="text-xs text-on-surface-variant font-body">
                  Images processed locally using 256-bit AES before DNA synthesis. All metadata stripped for clinical anonymity.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <a href="#" className="text-primary text-xs font-medium flex items-center gap-2 hover:underline">
              Advanced DNA Parameters →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}