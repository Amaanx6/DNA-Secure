"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  History,
  Home,
  Lock,
  Unlock,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { API_BASE } from "@/lib/env";

const links = [
  { href: "/", label: "Overview", icon: Home },
  { href: "/encrypt", label: "Encrypt", icon: Lock },
  { href: "/pipeline", label: "Pipeline stream", icon: Workflow },
  { href: "/decrypt", label: "Decrypt", icon: Unlock },
  { href: "/history", label: "History", icon: History },
  { href: "/system", label: "API status", icon: Activity },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0c1216]/95 text-[#e8f4f0] backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent)] to-teal-600 text-sm font-bold text-[var(--surface)] shadow-lg shadow-teal-500/20">
            DS
          </span>
          <div className="leading-tight">
            <span className="font-[family-name:var(--font-display)] text-lg tracking-tight text-[var(--text)]">
              DNA Secure
            </span>
            <p className="hidden text-[10px] uppercase tracking-widest text-[var(--muted)] sm:block">
              Clinical imaging
            </p>
          </div>
        </Link>

        <nav className="flex flex-1 items-center justify-end gap-0.5 overflow-x-auto sm:justify-center sm:gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/"
                ? pathname === "/"
                : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors sm:px-3 sm:text-sm",
                  active
                    ? "bg-white/10 text-[var(--text)]"
                    : "text-[var(--muted)] hover:bg-white/5 hover:text-[var(--text)]"
                )}
              >
                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </nav>

        <a
          href={`${API_BASE}/docs`}
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-[var(--muted)] transition-colors hover:border-[var(--accent)]/40 hover:text-[var(--accent)] md:inline-block"
        >
          OpenAPI
        </a>
      </div>
    </header>
  );
}
