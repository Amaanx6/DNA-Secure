'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';

export default function ConfigurePage() {
  const router = useRouter();
  const { setConfig } = useStore();
  const [selectedProtocol, setSelectedProtocol] = useState(1);

  const protocols = [
    { id: 1, name: 'Standard Huffman', codes: ['A', 'C', 'G', 'T'] },
    { id: 2, name: 'Gray Coding', codes: ['G', 'T', 'A', 'C'] },
    { id: 3, name: 'Rotation-3', codes: ['T', 'A', 'C', 'G'] },
    { id: 4, name: 'Inverted Parity', codes: ['C', 'G', 'T', 'A'] },
    { id: 5, name: 'L-System Bio', codes: ['A', 'T', 'C', 'G'] },
    { id: 6, name: 'Recursive Map', codes: ['G', 'C', 'A', 'T'] },
    { id: 7, name: 'Chaotic Delta', codes: ['T', 'G', 'C', 'A'] },
    { id: 8, name: 'Entropy Pivot', codes: ['C', 'A', 'G', 'T'] },
  ];

  const handleNext = () => {
    setConfig({ rule: selectedProtocol });
    router.push('/encrypt/processing');
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="mb-12">
        <span className="text-xs font-mono text-on-surface-variant uppercase">Configuration Module</span>
        <h1 className="font-headline text-5xl text-on-surface mb-2">Encryption Parameters</h1>
        <p className="text-on-surface-variant font-body">
          Define the biological encoding synthesis rules. Select a structural mapping protocol to translate binary data into genomic sequences.
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_1.2fr] gap-12">
        <div>
          <h2 className="font-headline text-2xl text-on-surface mb-4">Encoding Protocols</h2>
          <span className="text-xs font-mono text-on-surface-variant">8 AVAILABLE METHODS</span>

          <div className="grid grid-cols-2 gap-4 mt-6">
            {protocols.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProtocol(p.id)}
                className={`border p-4 text-left transition ${selectedProtocol === p.id ? 'border-primary bg-surface-container-low' : 'border-outline-variant/30'
                  }`}
              >
                <div className="text-xs font-mono text-primary mb-2">PROTOCOL 0{p.id}</div>
                <h4 className="font-headline text-sm text-on-surface mb-3">{p.name}</h4>
                <div className="grid grid-cols-4 gap-1 text-xs">
                  <div className="border border-outline-variant/30 p-1 text-center">00</div>
                  <div className="border border-outline-variant/30 p-1 text-center">01</div>
                  <div className="border border-outline-variant/30 p-1 text-center">10</div>
                  <div className="border border-outline-variant/30 p-1 text-center">11</div>
                  {p.codes.map((c, i) => (
                    <div key={i} className="border border-primary/50 p-1 text-center font-bold text-primary">
                      {c}
                    </div>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-headline text-2xl text-on-surface mb-6">Configuration Summary</h2>
          <div className="bg-white p-6 space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-3">
                <span className="text-on-surface-variant font-mono uppercase text-xs">Selected Rule</span>
                <span className="font-headline text-primary">Huffman v1.0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant font-mono uppercase text-xs">Compression Ratio</span>
                <span className="font-mono text-secondary">2.4:1</span>
              </div>
            </div>

            <div className="border-t border-outline-variant/20 pt-6">
              <div className="text-xs font-mono text-on-surface-variant mb-2 uppercase">Key Preview</div>
              <div className="bg-surface-container-lowest p-2 font-mono text-xs overflow-auto max-h-16 text-on-surface-variant">
                DNA_SEC_01_A:00_C:01_G:10_T:11_SIG_483X_VAR92
              </div>
            </div>

            <div className="border-t border-outline-variant/20 pt-6">
              <div className="flex justify-between mb-3">
                <span className="text-xs font-mono text-on-surface-variant uppercase">ROI Sensitivity</span>
                <span className="text-primary font-headline text-sm">ADAPTIVE HIGH</span>
              </div>
              <input type="range" min="0" max="100" defaultValue="75" className="w-full accent-primary" />
              <div className="flex justify-between text-xs text-on-surface-variant mt-2 font-mono">
                <span>LOW</span>
                <span>MED</span>
                <span>HIGH</span>
              </div>
            </div>

            <div className="bg-black text-white p-4 flex items-center justify-center">
              <span className="text-sm font-headline">SEQUENCE VALIDATED</span>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-primary text-white py-3 font-headline hover:opacity-90 text-sm"
            >
              Run Encryption 🔒
            </button>

            <p className="text-xs text-on-surface-variant text-center font-body">
              By proceeding, you acknowledge that the synthesis process is irreversible without the specific decryption key.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}