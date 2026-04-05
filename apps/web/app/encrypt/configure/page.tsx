'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import StepProgress from '@/components/shared/step-progress';
import RuleSelector from '@/components/encrypt/rule-selector';
import { useStore } from '@/lib/store';
import type { DNARule } from '@packages/types';

export default function ConfigurePage() {
  const router = useRouter();
  const { config, setConfig } = useStore();
  const [roiSensitivity, setRoiSensitivity] = useState(config.roiSensitivity);

  const handleRuleSelect = (rule: DNARule) => {
    setConfig({ rule });
  };

  const handleNext = async () => {
    setConfig({ roiSensitivity });
    router.push('/encrypt/processing');
  };

  return (
    <div className="max-w-[1120px] mx-auto px-8 py-12">
      <StepProgress
        currentStep={2}
        totalSteps={3}
        title="Configure Encryption"
        subtitle="Select encoding protocol and adjust parameters"
      />

      <div className="flex flex-col lg:flex-row gap-12 mt-12">
        {/* Left Panel - Protocol Selection */}
        <div className="lg:w-[60%] space-y-8">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
            <h2 className="font-headline text-2xl text-on-surface">
              Encoding Protocols
            </h2>
            <span className="text-xs font-mono text-on-surface-variant">
              8 AVAILABLE METHODS
            </span>
          </div>

          <RuleSelector
            selectedRule={config.rule}
            onRuleSelect={handleRuleSelect}
          />
        </div>

        {/* Right Panel - Configuration Summary (Sticky) */}
        <div className="lg:w-[40%]">
          <div className="sticky top-32 glass-panel p-8 space-y-10">
            {/* Title */}
            <div className="space-y-2">
              <h2 className="font-headline text-2xl text-on-surface">
                Configuration Summary
              </h2>
              <div className="h-px bg-primary/20 w-12"></div>
            </div>

            {/* Selected Rule Info */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">Selected Rule</span>
                <span className="font-semibold text-primary">
                  Protocol {String(config.rule).padStart(2, '0')}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">Compression Ratio</span>
                <span className="font-mono text-secondary">2.4:1</span>
              </div>
            </div>

            {/* Key Preview */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono tracking-widest text-on-surface-variant uppercase">
                Key Preview
              </span>
              <div className="bg-surface-container-highest p-4 font-mono text-xs break-all leading-relaxed text-on-surface/80 border-l-2 border-primary">
                DNA_SEC_{String(config.rule).padStart(2, '0')}_KEYHASH_...
              </div>
            </div>

            {/* ROI Sensitivity Slider */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-sm font-medium text-on-surface">
                  ROI Sensitivity
                </span>
                <span className="text-xs font-mono text-primary">
                  {roiSensitivity <= 3
                    ? 'LOW'
                    : roiSensitivity <= 7
                      ? 'MEDIUM'
                      : 'HIGH'}
                </span>
              </div>

              <div className="relative py-2">
                <div className="h-1 bg-surface-container-highest rounded-full w-full">
                  <div
                    className="absolute top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full transition-all"
                    style={{ width: `${(roiSensitivity / 10) * 100}%` }}
                  ></div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={roiSensitivity}
                    onChange={(e) => setRoiSensitivity(Number(e.target.value))}
                    className="absolute top-1/2 -translate-y-1/2 w-full h-1 opacity-0 cursor-pointer"
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary border-4 border-white shadow-sm rounded-full pointer-events-none transition-all"
                    style={{
                      left: `calc(${(roiSensitivity / 10) * 100}% - 8px)`,
                    }}
                  ></div>
                </div>

                <div className="flex justify-between mt-3 text-[10px] text-on-surface-variant font-mono">
                  <span>LOW</span>
                  <span>MED</span>
                  <span>HIGH</span>
                </div>
              </div>
            </div>

            {/* DNA Visualization */}
            <div className="relative h-24 overflow-hidden bg-on-surface group rounded-sm">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDic_ZVQtyODeFpeX4RixOi5NQGQWoZCq0EwGe8YfYD_JOx5cuJ3nBeRiAncBYAVU6kZKGLjfcKzOeyryFc4gyGBtAzMStiUFmyyMDXwGpekufuLqieUZ7_9gTZYBchIEufWz2f-Hd_51BZSFvnOvS1MOzB-yXMfBRkPdpc-_XMSe9WREWB7LvxVBa1GNVPel9fe0qpbihm-nE-QKyyYdeFtH2xn3tXlSncbyXqP8753xTy5nD3gvoO43"
                alt="DNA visualization"
                fill
                className="object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Action Button */}
            <button
              onClick={handleNext}
              className="w-full bg-primary text-on-primary py-3 font-medium text-sm tracking-wide hover:bg-primary-container transition-all"
            >
              Run Encryption
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
