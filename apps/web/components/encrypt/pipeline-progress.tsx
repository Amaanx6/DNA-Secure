'use client';

import { motion } from 'framer-motion';

type StageName = 'roi_analysis' | 'dna_encoding' | 'xor_operations' | 'chaos_scramble';

interface Stage {
  name: StageName;
  label: string;
  status: 'pending' | 'active' | 'complete';
}

interface PipelineProgressProps {
  stages: Stage[];
}

export default function PipelineProgress({
  stages,
}: PipelineProgressProps) {
  const filledWidth = stages.filter((s) => s.status === 'complete').length / stages.length * 100;

  return (
    <div className="space-y-8">
      {/* Animated Pipeline */}
      <div className="relative py-12">
        <div className="flex items-center justify-between mb-4">
          {stages.map((stage, idx) => (
            <div key={stage.name} className="flex flex-col items-center flex-1">
              {/* Stage Node */}
              <motion.div
                className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${
                  stage.status === 'complete'
                    ? 'bg-tertiary border-tertiary'
                    : stage.status === 'active'
                      ? 'bg-primary border-primary'
                      : 'bg-surface-container border-outline-variant/20'
                }`}
                animate={
                  stage.status === 'active'
                    ? { scale: [1, 1.1, 1] }
                    : {}
                }
                transition={{ duration: 2, repeat: Infinity }}
              >
                {stage.status === 'complete' ? (
                  <span className="material-symbols-outlined text-on-tertiary">
                    check
                  </span>
                ) : stage.status === 'active' ? (
                  <motion.span
                    className="material-symbols-outlined text-on-primary"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, linear: true }}
                  >
                    autorenew
                  </motion.span>
                ) : (
                  <span className="text-sm font-mono text-on-surface-variant">
                    {idx + 1}
                  </span>
                )}
              </motion.div>

              {/* Stage Label */}
              <p className="text-xs text-on-surface-variant mt-2 text-center max-w-[80px]">
                {stage.label}
              </p>
            </div>
          ))}
        </div>

        {/* Connecting Lines */}
        <div className="absolute top-7 left-0 right-0 h-1 bg-outline-variant/20">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${filledWidth}%` }}
            transition={{ duration: 0.5 }}
          ></motion.div>
        </div>
      </div>
    </div>
  );
}
