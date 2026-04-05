'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  EncryptConfig,
  EncryptResult,
  HistoryEntry,
  DNARule,
  ChaosMap,
} from '@packages/types';

interface AppStore {
  uploadedFile: File | null;
  config: EncryptConfig;
  encryptResult: EncryptResult | null;
  history: HistoryEntry[];
  setUploadedFile: (file: File | null) => void;
  setConfig: (config: Partial<EncryptConfig>) => void;
  setEncryptResult: (result: EncryptResult | null) => void;
  setHistory: (history: HistoryEntry[]) => void;
  addHistoryEntry: (entry: HistoryEntry) => void;
}

const defaultConfig: EncryptConfig = {
  rule: 1,
  chaosMap: 'arnold',
  roiSensitivity: 5,
  key: '',
};

export const useStore = create<AppStore>()(
  persist(
    (set) => ({
      uploadedFile: null,
      config: defaultConfig,
      encryptResult: null,
      history: [],
      setUploadedFile: (file) => set({ uploadedFile: file }),
      setConfig: (newConfig) =>
        set((state) => ({
          config: { ...state.config, ...newConfig },
        })),
      setEncryptResult: (result) => set({ encryptResult: result }),
      setHistory: (history) => set({ history }),
      addHistoryEntry: (entry) =>
        set((state) => ({
          history: [entry, ...state.history],
        })),
    }),
    {
      name: 'dnasecure-store',
      partialize: (state) => ({
        config: state.config,
        history: state.history,
      }),
    }
  )
);
