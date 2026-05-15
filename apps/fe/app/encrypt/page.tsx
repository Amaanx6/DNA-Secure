"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Link from "next/link";
import { toast } from "sonner";
import { Download, ImageIcon, Loader2, ShieldCheck, Sliders } from "lucide-react";
import type { EncryptConfig, EncryptResult, SecurityMetrics } from "@packages/types";
import {
  base64ToBlob,
  downloadBlob,
  uploadAndEncrypt,
} from "@/lib/api";
import { cn } from "@/lib/cn";

const rules = [1, 2, 3, 4, 5, 6, 7, 8] as const;

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted)]">
        {label}
      </p>
      <p className="mt-1 font-mono text-lg text-[var(--text)]">{value}</p>
    </div>
  );
}

function formatMetrics(m: SecurityMetrics) {
  return [
    { label: "PSNR (dB)", value: m.psnr.toFixed(2) },
    { label: "SSIM", value: m.ssim.toFixed(4) },
    { label: "NPCR", value: m.npcr.toFixed(4) },
    { label: "UACI", value: m.uaci.toFixed(4) },
  ];
}

export default function EncryptPage() {
  const [file, setFile] = useState<File | null>(null);
  const [rule, setRule] = useState<(typeof rules)[number]>(1);
  const [roi, setRoi] = useState(5);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<EncryptResult | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const onDrop = useCallback((accepted: File[]) => {
    const f = accepted[0];
    if (f) {
      setFile(f);
      setResult(null);
      toast.success(`Selected ${f.name}`);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp", ".tif", ".tiff"] },
    multiple: false,
  });

  const run = async () => {
    if (!file) {
      toast.error("Choose an image first");
      return;
    }
    const config: EncryptConfig = {
      rule,
      chaosMap: "arnold",
      roiSensitivity: roi,
      key: "",
    };
    setBusy(true);
    setResult(null);
    try {
      const res = await uploadAndEncrypt(file, config);
      setResult(res);
      toast.success("Encryption complete");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Encryption failed");
    } finally {
      setBusy(false);
    }
  };

  const saveEncrypted = () => {
    if (!result) return;
    downloadBlob(
      base64ToBlob(result.encryptedImageBase64, "image/png"),
      `encrypted-${file?.name ?? "image"}.png`
    );
  };

  const saveKey = () => {
    if (!result) return;
    downloadBlob(new Blob([result.keyJson], { type: "application/json" }), "dnasecure-key.json");
  };

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          POST /api/encrypt
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--text)] sm:text-4xl">
          Encrypt a study
        </h1>
        <p className="max-w-2xl text-[var(--muted)]">
          The ciphertext is the whole image: Arnold scrambling (pixel positions) plus a keyed XOR
          stream (pixel values). The colored heatmap is a separate ROI hint for operators; it does
          not pick which pixels get encrypted.
        </p>
      </header>

      <aside className="rounded-xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-sm leading-relaxed text-[#fcd9a8]">
        <strong className="text-amber-100">Why decrypted matches the original:</strong> that is
        correct behavior for reversible encryption. The encrypted PNG should look noisy or scrambled
        compared to the preview; without your key file, an attacker cannot run the inverse steps.
      </aside>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="space-y-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text)]">
            <ImageIcon className="h-4 w-4 text-[var(--accent)]" />
            Source image
          </div>
          <div
            {...getRootProps()}
            className={cn(
              "flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/20 bg-[var(--elevated)]/50 p-6 text-center transition hover:border-[var(--accent)]/50",
              isDragActive && "border-[var(--accent)] bg-[var(--accent)]/5"
            )}
          >
            <input {...getInputProps()} />
            <p className="text-sm text-[var(--muted)]">
              Drag & drop or click to select PNG / JPEG / TIFF
            </p>
            {file && (
              <p className="mt-3 text-xs font-medium text-[var(--accent)]">{file.name}</p>
            )}
          </div>
          {previewUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-56 w-full rounded-lg object-contain ring-1 ring-white/10"
            />
          )}

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text)]">
              <Sliders className="h-4 w-4 text-[var(--accent)]" />
              Parameters
            </div>
            <label className="block text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
              DNA rule
              <select
                value={rule}
                onChange={(e) => setRule(Number(e.target.value) as (typeof rules)[number])}
                className="mt-2 w-full rounded-lg border border-white/10 bg-[var(--elevated)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
              >
                {rules.map((r) => (
                  <option key={r} value={r}>
                    Rule {r}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
              ROI sensitivity ({roi})
              <input
                type="range"
                min={1}
                max={10}
                value={roi}
                onChange={(e) => setRoi(Number(e.target.value))}
                className="mt-3 w-full accent-[var(--accent)]"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={run}
            disabled={busy || !file}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-[var(--bg)] transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
            Run encryption
          </button>
        </section>

        <section className="space-y-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-6">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-[var(--text)]">Cipher output</h2>
            {result && (
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={saveEncrypted}
                  className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-[var(--text)] hover:border-[var(--accent)]/50"
                >
                  <Download className="h-3.5 w-3.5" />
                  Encrypted PNG
                </button>
                <button
                  type="button"
                  onClick={saveKey}
                  className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-[var(--text)] hover:border-[var(--accent)]/50"
                >
                  <Download className="h-3.5 w-3.5" />
                  Key JSON
                </button>
              </div>
            )}
          </div>

          {!result && (
            <div className="flex min-h-[320px] items-center justify-center rounded-xl border border-dashed border-white/10 bg-[var(--elevated)]/30 p-6 text-center text-sm text-[var(--muted)]">
              Encrypted preview, ROI heatmap, and security metrics will render here.
            </div>
          )}

          {result && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                    Encrypted
                  </p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`data:image/png;base64,${result.encryptedImageBase64}`}
                    alt="Encrypted"
                    className="w-full rounded-lg ring-1 ring-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                    ROI heatmap
                  </p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`data:image/png;base64,${result.roiHeatmapBase64}`}
                    alt="ROI heatmap"
                    className="w-full rounded-lg ring-1 ring-white/10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {formatMetrics(result.metrics).map((m) => (
                  <Metric key={m.label} label={m.label} value={m.value} />
                ))}
              </div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                  Key preview
                </p>
                <pre className="mt-2 max-h-40 overflow-auto text-[11px] leading-relaxed text-[var(--accent)]">
                  {result.keyJson}
                </pre>
              </div>
              <Link
                href="/decrypt"
                className="inline-flex text-sm font-medium text-[var(--accent)] hover:underline"
              >
                Continue to decrypt workflow →
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
