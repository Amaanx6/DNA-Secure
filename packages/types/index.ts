export type DNARule = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type ChaosMap = 'logistic' | 'arnold';

export interface EncryptConfig {
  rule: DNARule;
  chaosMap: ChaosMap;
  roiSensitivity: number;
  key: string;
}

export interface SecurityMetrics {
  psnr: number;
  ssim: number;
  npcr: number;
  uaci: number;
}

export interface EncryptResult {
  encryptedImageBase64: string;
  roiHeatmapBase64: string;
  keyJson: string;
  metrics: SecurityMetrics;
}

export interface HistoryEntry {
  id: string;
  filename: string;
  type: 'encrypt' | 'decrypt';
  date: string;
  status: 'complete' | 'processing' | 'failed';
  keyId: string;
  thumbnailBase64: string;
}
