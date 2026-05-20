import { API_BASE } from "@/lib/env";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0c1216]/80 py-8 text-center text-xs text-[#7a9390]">
      <p>
        API base:{" "}
        <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[11px] text-[#2dd4bf]">
          {API_BASE}
        </code>
        {" · "}
        Configure with{" "}
        <code className="rounded bg-white/5 px-1 py-0.5 font-mono text-[10px]">
          NEXT_PUBLIC_API_URL
        </code>
      </p>
    </footer>
  );
}
