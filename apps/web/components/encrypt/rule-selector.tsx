'use client';

import type { DNARule } from '@packages/types';

const DNAPROTOCOLS = [
  {
    rule: 1 as DNARule,
    name: 'Standard Huffman',
    mapping: { '00': 'A', '01': 'C', '10': 'G', '11': 'T' },
  },
  {
    rule: 2 as DNARule,
    name: 'Gray Coding',
    mapping: { '00': 'G', '01': 'T', '10': 'C', '11': 'A' },
  },
  {
    rule: 3 as DNARule,
    name: 'Rotation-3',
    mapping: { '00': 'T', '01': 'A', '10': 'C', '11': 'G' },
  },
  {
    rule: 4 as DNARule,
    name: 'Inverted Parity',
    mapping: { '00': 'C', '01': 'G', '10': 'T', '11': 'A' },
  },
  {
    rule: 5 as DNARule,
    name: 'L-System Bio',
    mapping: { '00': 'A', '01': 'T', '10': 'C', '11': 'G' },
  },
  {
    rule: 6 as DNARule,
    name: 'Recursive Map',
    mapping: { '00': 'G', '01': 'C', '10': 'A', '11': 'T' },
  },
  {
    rule: 7 as DNARule,
    name: 'Chaotic Delta',
    mapping: { '00': 'T', '01': 'G', '10': 'C', '11': 'A' },
  },
  {
    rule: 8 as DNARule,
    name: 'Entropy Pivot',
    mapping: { '00': 'C', '01': 'A', '10': 'G', '11': 'T' },
  },
];

interface RuleSelectorProps {
  selectedRule: DNARule;
  onRuleSelect: (rule: DNARule) => void;
}

export default function RuleSelector({
  selectedRule,
  onRuleSelect,
}: RuleSelectorProps) {
  return (
    <div className="space-y-4">
      {DNAPROTOCOLS.map((protocol) => (
        <div
          key={protocol.rule}
          onClick={() => onRuleSelect(protocol.rule)}
          className={`p-6 bg-surface-container-lowest border transition-all cursor-pointer group ${
            selectedRule === protocol.rule
              ? 'border-primary/40 ring-1 ring-primary/20'
              : 'border-outline-variant/10 hover:border-primary/20'
          }`}
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="font-mono text-[10px] text-primary mb-1 block">
                PROTOCOL {String(protocol.rule).padStart(2, '0')}
              </span>
              <h3 className="font-semibold text-on-surface">
                {protocol.name}
              </h3>
            </div>
            {selectedRule === protocol.rule && (
              <span
                className="material-symbols-outlined text-primary text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            {Object.entries(protocol.mapping).map(([bits, base]) => (
              <div
                key={bits}
                className={`p-2 text-center rounded transition-colors ${
                  selectedRule === protocol.rule
                    ? 'bg-surface-container'
                    : 'bg-surface-container-low group-hover:bg-surface-container'
                }`}
              >
                <div className="text-[10px] text-on-surface-variant mb-1 font-mono">
                  {bits}
                </div>
                <div className="font-bold text-on-surface">{base}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
