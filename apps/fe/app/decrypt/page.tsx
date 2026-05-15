"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { CheckCircle2, Download, FileKey2, Loader2, ShieldAlert, XCircle } from "lucide-react";
import {
  base64ToBlob,
  decryptFile,
  downloadBlob,
  validateDecryptionKey,
} from "@/lib/api";
import { cn } from "@/lib/cn";

export default function DecryptPage() {
  const [keyText, setKeyText] = useState("");
  const [valid, setValid] = useState<boolean | null>(null);
  const [reason, setReason] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  const [encFile, setEncFile] = useState<File | null>(null);
  const [keyFile, setKeyFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [imageB64, setImageB64] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<{ psnr: number; ssim: number } | null>(null);

  const onDropEnc = useCallback((files: File[]) => {
    const f = files[0];
    if (f) {
      setEncFile(f);
      setImageB64(null);
      toast.success(`Encrypted file: ${f.name}`);
    }
  }, []);
  const onDropKey = useCallback((files: File[]) => {
    const f = files[0];
    if (f) {
      setKeyFile(f);
      setImageB64(null);
      toast.success(`Key file: ${f.name}`);
    }
  }, []);

  const encDrop = useDropzone({
    onDrop: onDropEnc,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    multiple: false,
  });
  const keyDrop = useDropzone({
    onDrop: onDropKey,
    accept: { "application/json": [".json"], "text/plain": [".txt", ".json"] },
    multiple: false,
  });

  const runValidate = async () => {
    setChecking(true);
    setValid(null);
    setReason(null);
    try {
      const res = await validateDecryptionKey(keyText);
      setValid(res.valid);
      setReason(res.reason ?? null);
      if (res.valid) toast.success("Key JSON is well-formed");
      else toast.error(res.reason ?? "Invalid key");
    } catch {
      setValid(false);
      setReason("Request failed");
      toast.error("Validation request failed");
    } finally {
      setChecking(false);
    }
  };

  const runDecrypt = async () => {
    if (!encFile || !keyFile) {
      toast.error("Provide encrypted image and key file");
      return;
    }
    setBusy(true);
    setImageB64(null);
    setMetrics(null);
    try {
      const res = await decryptFile(encFile, keyFile);
      setImageB64(res.decryptedImageBase64);
      setMetrics(res.metrics);
      toast.success("Decryption complete");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Decryption failed");
    } finally {
      setBusy(false);
    }
  };

  const saveImage = () => {
    if (!imageB64 || !encFile) return;
    downloadBlob(base64ToBlob(imageB64, "image/png"), `decrypted-${encFile.name}`);
  };

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          POST /api/decrypt/validate · POST /api/decrypt
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--text)] sm:text-4xl">
          Decrypt & validate keys
        </h1>
        <p className="max-w-2xl text-[var(--muted)]">
          Validate key material independently, then pair the encrypted PNG with the JSON key emitted
          from the encrypt flow to recover pixels.
        </p>
      </header>

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-6">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[var(--text)]">
          <FileKey2 className="h-4 w-4 text-[var(--accent)]" />
          Key validation
        </div>
        <textarea
          value={keyText}
          onChange={(e) => {
            setKeyText(e.target.value);
            setValid(null);
          }}
          rows={6}
          placeholder='Paste key JSON, e.g. {"id":"...","rule":1,...}'
          className="w-full rounded-xl border border-white/10 bg-[var(--elevated)] px-4 py-3 font-mono text-xs text-[var(--text)] outline-none ring-0 focus:border-[var(--accent)]/50"
        />
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={runValidate}
            disabled={checking || !keyText.trim()}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:bg-white/15 disabled:opacity-40"
          >
            {checking ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Validate JSON
          </button>
          {valid === true && (
            <span className="inline-flex items-center gap-1 text-sm text-emerald-400">
              <CheckCircle2 className="h-4 w-4" /> Valid
            </span>
          )}
          {valid === false && (
            <span className="inline-flex items-center gap-1 text-sm text-red-400">
              <XCircle className="h-4 w-4" /> {reason ?? "Invalid"}
            </span>
          )}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text)]">
            <ShieldAlert className="h-4 w-4 text-[var(--accent)]" />
            Encrypted image
          </div>
          <div
            {...encDrop.getRootProps()}
            className={cn(
              "flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-[var(--elevated)]/40 p-4 text-center text-sm text-[var(--muted)] transition hover:border-[var(--accent)]/40",
              encDrop.isDragActive && "border-[var(--accent)]"
            )}
          >
            <input {...encDrop.getInputProps()} />
            {encFile ? encFile.name : "Drop encrypted PNG"}
          </div>
        </div>
        <div className="space-y-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text)]">
            <FileKey2 className="h-4 w-4 text-[var(--accent)]" />
            Key file (.json)
          </div>
          <div
            {...keyDrop.getRootProps()}
            className={cn(
              "flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-[var(--elevated)]/40 p-4 text-center text-sm text-[var(--muted)] transition hover:border-[var(--accent)]/40",
              keyDrop.isDragActive && "border-[var(--accent)]"
            )}
          >
            <input {...keyDrop.getInputProps()} />
            {keyFile ? keyFile.name : "Drop dnasecure-key.json"}
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={runDecrypt}
          disabled={busy || !encFile || !keyFile}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-[var(--bg)] transition enabled:hover:brightness-110 disabled:opacity-40"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Run decryption
        </button>
        {imageB64 && (
          <button
            type="button"
            onClick={saveImage}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-[var(--text)] hover:border-[var(--accent)]/50"
          >
            <Download className="h-4 w-4" />
            Download PNG
          </button>
        )}
      </div>

      {imageB64 && (
        <section className="grid gap-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-6 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              Recovered image
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`data:image/png;base64,${imageB64}`}
              alt="Decrypted"
              className="mt-3 w-full rounded-xl ring-1 ring-white/10"
            />
          </div>
          {metrics && (
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                Recovery metrics
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] uppercase text-[var(--muted)]">PSNR</p>
                  <p className="mt-1 font-mono text-2xl text-[var(--text)]">
                    {metrics.psnr.toFixed(2)} dB
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] uppercase text-[var(--muted)]">SSIM</p>
                  <p className="mt-1 font-mono text-2xl text-[var(--text)]">
                    {metrics.ssim.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
