import type { EncryptConfig, EncryptResult, HistoryEntry } from '@packages/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function uploadAndEncrypt(
  file: File,
  config: EncryptConfig
): Promise<EncryptResult> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('config', JSON.stringify(config));

  const response = await fetch(`${API_BASE}/api/encrypt`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Encryption failed: ${response.statusText}`);
  }

  return response.json();
}

export async function streamEncryptionProgress(
  onProgress: (data: {
    stage: string;
    status: string;
    progress: number;
    log: string;
  }) => void,
  onComplete: () => void,
  onError: (error: Error) => void
): Promise<void> {
  try {
    const response = await fetch(`${API_BASE}/api/encrypt/stream`);

    if (!response.ok) {
      throw new Error(`Stream failed: ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No stream reader available');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        onComplete();
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');

      for (let i = 0; i < lines.length - 1; i++) {
        const line = lines[i];
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            onProgress(data);
          } catch {
            // Ignore parse errors
          }
        }
      }

      buffer = lines[lines.length - 1];
    }
  } catch (error) {
    onError(error instanceof Error ? error : new Error(String(error)));
  }
}

export async function decryptFile(
  encryptedFile: File,
  keyFile: File
): Promise<EncryptResult> {
  const formData = new FormData();
  formData.append('encrypted_file', encryptedFile);
  formData.append('key_file', keyFile);

  const response = await fetch(`${API_BASE}/api/decrypt`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Decryption failed: ${response.statusText}`);
  }

  return response.json();
}

export async function validateDecryptionKey(keyData: string): Promise<boolean> {
  const response = await fetch(`${API_BASE}/api/decrypt/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key_data: keyData }),
  });

  if (!response.ok) {
    return false;
  }

  const data = await response.json();
  return data.valid === true;
}

export async function fetchHistory(): Promise<HistoryEntry[]> {
  const response = await fetch(`${API_BASE}/api/history`);

  if (!response.ok) {
    throw new Error(`Failed to fetch history: ${response.statusText}`);
  }

  return response.json();
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function base64ToBlob(base64: string, mimeType: string): Blob {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}
