import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface-container-high py-16">
      <div className="max-w-[1120px] mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-8">
          <div className="text-2xl font-headline italic text-on-surface">
            DNASecure
          </div>

          <div className="flex flex-wrap gap-8">
            <Link
              href="/"
              className="font-headline uppercase tracking-wider text-on-surface/70 hover:text-on-surface transition-colors text-sm"
            >
              Home
            </Link>
            <Link
              href="/encrypt/upload"
              className="font-headline uppercase tracking-wider text-on-surface/70 hover:text-on-surface transition-colors text-sm"
            >
              Encrypt
            </Link>
            <Link
              href="/decrypt/upload"
              className="font-headline uppercase tracking-wider text-on-surface/70 hover:text-on-surface transition-colors text-sm"
            >
              Decrypt
            </Link>
            <Link
              href="/analysis"
              className="font-headline uppercase tracking-wider text-on-surface/70 hover:text-on-surface transition-colors text-sm"
            >
              Analysis
            </Link>
            <Link
              href="/history"
              className="font-headline uppercase tracking-wider text-on-surface/70 hover:text-on-surface transition-colors text-sm"
            >
              History
            </Link>
            <Link
              href="/settings"
              className="font-headline uppercase tracking-wider text-on-surface/70 hover:text-on-surface transition-colors text-sm"
            >
              Settings
            </Link>
          </div>
        </div>

        <div className="border-t border-outline-variant/20 pt-8">
          <p className="font-body text-xs text-on-surface/50">
            © 2024 DNASecure. All rights reserved. Clinical-grade encryption
            for medical imaging.
          </p>
        </div>
      </div>
    </footer>
  );
}
