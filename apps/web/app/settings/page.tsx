'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import type { DNARule, ChaosMap } from '@packages/types';

export default function SettingsPage() {
  const { config, setConfig } = useStore();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-[1120px] mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="font-headline text-5xl text-on-surface mb-2">
          Settings
        </h1>
        <p className="text-on-surface-variant">
          Configure your encryption preferences
        </p>
      </div>

      <div className="space-y-8">
        {/* Default Configuration */}
        <div className="bg-surface-container-lowest p-8 border border-outline-variant/10">
          <h2 className="font-headline text-2xl text-on-surface mb-6">
            Default Configuration
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-on-surface mb-2">
                Default DNA Encoding Rule
              </label>
              <select
                value={config.rule}
                onChange={(e) =>
                  setConfig({ rule: Number(e.target.value) as DNARule })
                }
                className="w-full px-4 py-2 bg-surface-container-lowest border border-outline-variant/10 text-on-surface focus:outline-none focus:border-primary"
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Protocol {String(i + 1).padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-on-surface mb-2">
                Chaos Map Algorithm
              </label>
              <select
                value={config.chaosMap}
                onChange={(e) =>
                  setConfig({ chaosMap: e.target.value as ChaosMap })
                }
                className="w-full px-4 py-2 bg-surface-container-lowest border border-outline-variant/10 text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="logistic">Logistic</option>
                <option value="arnold">Arnold Cat Map</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-on-surface mb-2">
                Default ROI Sensitivity
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={config.roiSensitivity}
                onChange={(e) =>
                  setConfig({ roiSensitivity: Number(e.target.value) })
                }
                className="w-full"
              />
              <div className="text-xs text-on-surface-variant mt-2">
                Current: {config.roiSensitivity}/10
              </div>
            </div>
          </div>
        </div>

        {/* Security Preferences */}
        <div className="bg-surface-container-lowest p-8 border border-outline-variant/10">
          <h2 className="font-headline text-2xl text-on-surface mb-6">
            Security Preferences
          </h2>

          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked={true}
                className="w-4 h-4"
              />
              <span className="text-sm text-on-surface">
                Auto-clear session after 30 minutes
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked={true}
                className="w-4 h-4"
              />
              <span className="text-sm text-on-surface">
                Enable audit logging
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked={false}
                className="w-4 h-4"
              />
              <span className="text-sm text-on-surface">
                Require confirmation before encryption
              </span>
            </label>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-surface-container-lowest p-8 border border-outline-variant/10">
          <h2 className="font-headline text-2xl text-on-surface mb-6">
            Appearance
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-on-surface mb-2">
                Theme
              </label>
              <select className="w-full px-4 py-2 bg-surface-container-lowest border border-outline-variant/10 text-on-surface focus:outline-none focus:border-primary">
                <option>Light</option>
                <option>Dark</option>
                <option>Auto</option>
              </select>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-error/10 p-8 border border-error/20">
          <h2 className="font-headline text-2xl text-error mb-6">
            Danger Zone
          </h2>

          <div className="space-y-4">
            <button className="w-full px-4 py-3 bg-error text-on-error font-medium text-sm tracking-wide hover:opacity-90 transition-all">
              Clear All History
            </button>

            <button className="w-full px-4 py-3 bg-transparent border border-error/20 text-error font-medium text-sm tracking-wide hover:bg-error/5 transition-all">
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface-container border-t border-outline-variant/20 px-8 py-4">
        <div className="max-w-[1120px] mx-auto flex justify-between items-center">
          <p
            className={`text-sm transition-opacity ${
              saved
                ? 'text-tertiary opacity-100'
                : 'text-on-surface-variant opacity-0'
            }`}
          >
            Settings saved successfully
          </p>
          <button
            onClick={handleSave}
            className="bg-primary text-on-primary px-6 py-2 font-medium text-sm tracking-wide hover:bg-primary-container transition-all"
          >
            Save Settings
          </button>
        </div>
      </div>

      {/* Spacer for fixed button */}
      <div className="h-20"></div>
    </div>
  );
}
