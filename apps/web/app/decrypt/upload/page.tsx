'use client';

import { useState } from 'react';
import DropZone from '@/components/encrypt/drop-zone';

export default function DecryptUploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [decryptionKey, setDecryptionKey] = useState('');

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="font-headline text-5xl text-on-surface mb-2">Decrypt Medical Archive</h1>
        <p className="text-on-surface-variant font-body">Upload your encrypted file and provide the decryption key to restore the original image.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="border-2 border-dashed border-on-surface-variant/20 rounded p-12 bg-white flex flex-col items-center justify-center min-h-80">
          {selectedFile ? (
            <div className="text-center">
              <div className="text-5xl mb-3">✓</div>
              <p className="font-headline text-lg text-on-surface mb-1">{selectedFile.name}</p>
              <button onClick={() => setSelectedFile(null)} className="text-primary text-sm mt-4">
                Choose different file
              </button>
            </div>
          ) : (
            <DropZone onFileSelected={setSelectedFile} />
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 warm-shadow">
            <h3 className="font-headline text-lg text-on-surface mb-4">Decryption Key</h3>
            <textarea
              value={decryptionKey}
              onChange={(e) => setDecryptionKey(e.target.value)}
              placeholder="Paste your encryption key here..."
              className="w-full h-32 p-3 border border-outline-variant/30 font-mono text-xs"
            ></textarea>
            <button className="w-full bg-primary text-white py-3 mt-4 hover:opacity-90">
              Decrypt File
            </button>
          </div>

          <div className="bg-surface-container-high p-6">
            <div className="flex gap-3">
              <div className="text-2xl">🔓</div>
              <div>
                <h4 className="font-headline text-sm text-on-surface mb-1">Security Note</h4>
                <p className="text-xs text-on-surface-variant font-body">
                  Decryption happens locally. Your key is never transmitted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}