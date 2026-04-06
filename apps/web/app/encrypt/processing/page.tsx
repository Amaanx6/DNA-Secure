'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProcessingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setTimeout(() => router.push('/encrypt/result'), 1500);
          return 100;
        }
        return p + Math.random() * 25;
      });
      setStep((s) => (s < 3 ? s + 1 : 3));
    }, 800);
    return () => clearInterval(interval);
  }, [router]);

  const stages = [
    { num: 1, name: 'DNA Encoding', status: step >= 0 },
    { num: 2, name: 'Chaos Permutation', status: step >= 1 },
    { num: 3, name: 'AES Encryption', status: step >= 2 },
    { num: 4, name: 'Signature Generation', status: step >= 3 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 py-20 h-screen flex flex-col items-center justify-center">
      <div className="text-center mb-16">
        <h1 className="font-headline text-5xl text-on-surface mb-2">Archival DNA Encoding</h1>
        <p className="text-on-surface-variant font-body">Initialize the molecular sequence generation process.</p>
      </div>

      <div className="w-full max-w-md mb-16">
        <div className="relative h-2 bg-surface-container-high overflow-hidden mb-4">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
        <p className="text-center text-sm text-on-surface-variant font-body">
          Processing... {Math.min(Math.round(progress), 100)}%
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-16 w-full">
        {stages.map((s, i) => (
          <div key={i} className="text-center">
            <div className={`h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${s.status ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface-variant'
              }`}>
              {s.status ? '✓' : s.num}
            </div>
            <p className="text-xs font-mono text-on-surface-variant uppercase">{s.name}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface-container-lowest p-6 max-w-md font-mono text-xs text-on-surface-variant overflow-auto h-32">
        <div className="text-secondary mb-2">[DNA_ENCODER] Initializing sequence...</div>
        <div className="text-success">[DNA_ENCODER] Standard Huffman active</div>
        <div className="text-primary">[ENTROPY] Chaos map engaged</div>
        <div className="opacity-50">[AES_ENC] 256-bit key generated</div>
        <div className="opacity-30">[SIGNATURE] Computing hash...</div>
      </div>
    </div>
  );
}