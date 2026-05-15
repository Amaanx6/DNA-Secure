import Link from "next/link";
import {
  ArrowRight,
  Lock,
  Unlock,
  Workflow,
  History,
  Activity,
} from "lucide-react";

const cards = [
  {
    title: "Encrypt imaging",
    body: "Upload a study, tune DNA rule and ROI sensitivity, then retrieve ciphertext, heatmap, and a portable key.",
    href: "/encrypt",
    icon: Lock,
  },
  {
    title: "Live pipeline stream",
    body: "Subscribe to the SSE endpoint used for progress overlays — ideal for audits and operator training.",
    href: "/pipeline",
    icon: Workflow,
  },
  {
    title: "Decrypt & validate",
    body: "Validate key JSON, then restore pixels from encrypted PNGs with paired key material.",
    href: "/decrypt",
    icon: Unlock,
  },
  {
    title: "Session history",
    body: "Inspect server-side decrypt events recorded by the API (in-memory demo store).",
    href: "/history",
    icon: History,
  },
  {
    title: "API status",
    body: "Health probe plus service metadata from the root endpoint — wiring checks for deployments.",
    href: "/system",
    icon: Activity,
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]/60 p-8 shadow-2xl shadow-black/40 sm:p-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--accent)]/10 blur-3xl" />
        <div className="relative max-w-2xl space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            DNASecure frontend
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl leading-tight text-[var(--text)] sm:text-5xl">
            Sleek control plane for DNA-inspired medical image protection.
          </h1>
          <p className="text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            This app exercises every FastAPI route: encrypt, decrypt, validation, SSE stream, history,
            health, and root metadata — with a guided workflow for operators and engineers.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/encrypt"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--bg)] transition hover:brightness-110"
            >
              Start encrypting
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/system"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent)]/50 hover:text-[var(--accent)]"
            >
              Check API status
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ title, body, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--elevated)]/80 p-6 transition hover:border-[var(--accent)]/30 hover:shadow-lg hover:shadow-teal-500/5"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-[var(--accent)] ring-1 ring-white/10 transition group-hover:bg-[var(--accent)]/10">
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-[var(--text)]">{title}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">{body}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)]">
              Open
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
