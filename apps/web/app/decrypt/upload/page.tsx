'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StepProgress from '@/components/shared/step-progress';
import DropZone from '@/components/encrypt/drop-zone';

export default function DecryptUploadPage() {
  const router = useRouter();
  const [encryptedFile, setEncryptedFile] = useState<File | null>(null);
  const [keyFile, setKeyFile] = useState<File | null>(null);
  const [useKeyString, setUseKeyString] = useState(false);
  const [keyString, setKeyString] = useState('');

  const handleNext = () => {
    if (encryptedFile && (keyFile || keyString)) {
      router.push('/decrypt/result');
    }
  };

  return (
    <div className="max-w-[1120px] mx-auto px-8 py-12">
      <StepProgress
        currentStep={1}
        totalSteps={2}
        title="Upload for Decryption"
        subtitle="Select encrypted image and decryption key"
      />

      <div className="grid md:grid-cols-2 gap-12 mt-12">
        {/* Encrypted File Upload */}
        <div className="space-y-4">
          <h3 className="font-headline text-lg text-on-surface">
            Encrypted Image
          </h3>
          <DropZone onFileSelected={setEncryptedFile} />

          {encryptedFile && (
            <div className="bg-surface-container-lowest p-4 border border-outline-variant/10">
              <p className="text-xs font-mono text-on-surface-variant uppercase mb-1">
                Selected File
              </p>
              <p className="text-sm text-on-surface truncate">
                {encryptedFile.name}
              </p>
            </div>
          )}
        </div>

        {/* Key Upload/Paste */}
        <div className="space-y-4">
          <h3 className="font-headline text-lg text-on-surface">
            Decryption Key
          </h3>

          {/* Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setUseKeyString(false)}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                !useKeyString
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container text-on-surface'
              }`}
            >
              Upload File
            </button>
            <button
              onClick={() => setUseKeyString(true)}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                useKeyString
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container text-on-surface'
              }`}
            >
              Paste Key
            </button>
          </div>

          {/* Content */}
          {!useKeyString ? (
            <>
              <DropZone onFileSelected={setKeyFile} />
              {keyFile && (
                <div className="bg-surface-container-lowest p-4 border border-outline-variant/10">
                  <p className="text-xs font-mono text-on-surface-variant uppercase mb-1">
                    Key File
                  </p>
                  <p className="text-sm text-on-surface truncate">
                    {keyFile.name}
                  </p>
                </div>
              )}
            </>
          ) : (
            <textarea
              value={keyString}
              onChange={(e) => setKeyString(e.target.value)}
              placeholder="Paste your decryption key JSON here..."
              className="w-full h-32 p-4 bg-surface-container-lowest border border-outline-variant/10 font-mono text-xs text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-primary"
            />
          )}

          {/* Status */}
          {(keyFile || keyString) && (
            <div className="bg-tertiary/10 p-4 border border-tertiary/20 flex items-center gap-3">
              <span className="material-symbols-outlined text-tertiary">
                check_circle
              </span>
              <div className="text-sm text-tertiary">Key loaded successfully</div>
            </div>
          )}
        </div>
      </div>

      {/* Action */}
      <div className="mt-12 flex justify-end">
        <button
          onClick={handleNext}
          disabled={!encryptedFile || (!keyFile && !keyString)}
          className="bg-primary text-on-primary px-8 py-3 font-medium text-sm tracking-wide hover:bg-primary-container transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Decrypt Image
        </button>
      </div>
    </div>
  );
}
