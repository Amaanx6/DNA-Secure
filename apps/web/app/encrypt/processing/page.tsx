'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StepProgress from '@/components/shared/step-progress';
import PipelineProgress from '@/components/encrypt/pipeline-progress';
import LiveLog from '@/components/encrypt/live-log';
import { useStore } from '@/lib/store';
import { streamEncryptionProgress, uploadAndEncrypt } from '@/lib/api';

type StageName = 'roi_analysis' | 'dna_encoding' | 'xor_operations' | 'chaos_scramble';

interface Stage {
  name: StageName;
  label: string;
  status: 'pending' | 'active' | 'complete';
}

export default function ProcessingPage() {
  const router = useRouter();
  const { uploadedFile, config, setEncryptResult } = useStore();
  const [stages, setStages] = useState<Stage[]>([
    { name: 'roi_analysis', label: 'Region Analysis', status: 'active' },
    { name: 'dna_encoding', label: 'DNA Encoding', status: 'pending' },
    { name: 'xor_operations', label: 'XOR Operations', status: 'pending' },
    { name: 'chaos_scramble', label: 'Chaos Scramble', status: 'pending' },
  ]);
  const [logs, setLogs] = useState<string[]>([]);
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    if (!uploadedFile) {
      router.push('/encrypt/upload');
      return;
    }

    let cancelled = false;

    const performEncryption = async () => {
      try {
        // Add initial log
        setLogs((prev) => [
          ...prev,
          '[INIT] Starting encryption pipeline...',
          `[FILE] Processing: ${uploadedFile.name}`,
          `[CONFIG] Rule: ${config.rule}, ROI: ${config.roiSensitivity}`,
          '',
        ]);

        // Start actual encryption
        const result = await uploadAndEncrypt(uploadedFile, config);

        if (!cancelled) {
          // Add completion logs
          setLogs((prev) => [
            ...prev,
            '[ENCODE] DNA encoding complete',
            '[XOR] XOR operations complete',
            '[CHAOS] Chaos scrambling complete',
            '',
            '[SUCCESS] Encryption pipeline finished',
          ]);

          // Mark all stages as complete
          setStages((prev) =>
            prev.map((s) => ({ ...s, status: 'complete' as const }))
          );

          // Store result and redirect
          setEncryptResult(result);
          setTimeout(() => {
            router.push('/encrypt/result');
          }, 1000);
        }
      } catch (error) {
        if (!cancelled) {
          const errorMsg =
            error instanceof Error ? error.message : 'Unknown error';
          setLogs((prev) => [
            ...prev,
            `[ERROR] ${errorMsg}`,
            '[ABORT] Encryption failed',
          ]);
        }
      }
    };

    performEncryption();

    return () => {
      cancelled = true;
    };
  }, [uploadedFile, config, router, setEncryptResult]);

  const handleCancel = () => {
    setIsCancelled(true);
    router.push('/encrypt/upload');
  };

  return (
    <div className="max-w-[1120px] mx-auto px-8 py-12">
      <StepProgress
        currentStep={3}
        totalSteps={3}
        title="Processing"
        subtitle="Your image is being encrypted with DNA sequences"
      />

      <div className="mt-12 space-y-8">
        {/* Pipeline Visualization */}
        <div className="bg-surface-container-lowest p-8 border border-outline-variant/10">
          <PipelineProgress stages={stages} />
        </div>

        {/* Live Log Terminal */}
        <div>
          <h3 className="font-headline text-lg text-on-surface mb-4">
            Live Processing Log
          </h3>
          <LiveLog logs={logs} />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center">
          <button
            onClick={handleCancel}
            disabled={isCancelled}
            className="px-8 py-3 text-sm font-medium tracking-wide border border-on-surface/20 text-on-surface hover:bg-surface-container-high transition-all disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
