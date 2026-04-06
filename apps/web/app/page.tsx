import Link from 'next/link';

export const metadata = {
  title: 'DNASecure - Secure Medical Image Encryption',
  description: 'Protect sensitive patient diagnostics using DNA-powered encryption',
};

export default function Home() {
  return (
    <main className="bg-surface">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-24 lg:py-40 grid md:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col items-start gap-8">
          <h1 className="font-headline text-6xl lg:text-7xl leading-tight text-on-surface">
            Secure medical images with DNA-powered encryption
          </h1>
          <p className="text-base text-on-surface-variant leading-relaxed font-body max-w-lg">
            Protect sensitive patient diagnostics using clinical-grade biometric sequences. Advanced protection for MRI, CT, and X-Ray archives with cryptographically immutable signatures.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/encrypt/upload"
              className="bg-primary text-white px-8 py-3 font-medium text-sm hover:opacity-90 transition"
            >
              Start Encrypting
            </Link>
            <button className="bg-white border border-outline-variant text-on-surface px-8 py-3 font-medium text-sm hover:bg-surface-container-low transition">
              How It Works
            </button>
          </div>
        </div>

        <div className="relative w-full h-96 bg-black rounded overflow-hidden flex items-center justify-center">
          <svg viewBox="0 0 400 400" className="w-64 h-64">
            <defs>
              <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0088FF" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="200" cy="200" r="80" fill="url(#glow)" />
            <circle cx="200" cy="200" r="70" fill="none" stroke="#00FFFF" strokeWidth="2" opacity="0.5" />
            <circle cx="200" cy="200" r="50" fill="none" stroke="#00FFFF" strokeWidth="1" opacity="0.3" />
          </svg>
          <div className="absolute top-8 right-8 bg-white/90 px-4 py-1 text-xs font-mono text-primary">
            SAFE
          </div>
          <div className="absolute bottom-8 left-8 bg-white/90 px-4 py-1 text-xs font-headline">
            Verification Pending
          </div>
        </div>
      </section>

      {/* Pipeline Steps */}
      <section className="bg-surface-container-high py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <span className="font-headline text-6xl text-primary opacity-30">01.</span>
              <h3 className="font-headline text-2xl text-on-surface mt-4 mb-3">Upload Image</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed font-body">
                Securely ingest high-resolution DICOM or medical image files into our sandboxed clinical environment.
              </p>
            </div>
            <div>
              <span className="font-headline text-6xl text-primary opacity-30">02.</span>
              <h3 className="font-headline text-2xl text-on-surface mt-4 mb-3">Configure &amp; Encrypt</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed font-body">
                Map specific patient DNA sequences as the primary cryptographic key for an unbreakable layer of security.
              </p>
            </div>
            <div>
              <span className="font-headline text-6xl text-primary opacity-30">03.</span>
              <h3 className="font-headline text-2xl text-on-surface mt-4 mb-3">Download Secured File</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed font-body">
                Export your archived image with its embedded clinical signature, ready for long-term storage or peer review.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-8 py-32">
        <div className="text-center mb-20">
          <h2 className="font-headline text-4xl text-on-surface mb-6">Built for the Rigor of Clinical Research</h2>
          <div className="w-12 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="bg-white p-8 warm-shadow">
            <div className="text-4xl mb-4">🧬</div>
            <h4 className="font-headline text-lg text-on-surface mb-3">DNA Salting</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed font-body">
              We utilize unique biological markers to salt encryption keys, ensuring localized data remains distinct.
            </p>
          </div>

          <div className="bg-white p-8 warm-shadow">
            <div className="text-4xl mb-4">📋</div>
            <h4 className="font-headline text-lg text-on-surface mb-3">DICOM Compliant</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed font-body">
              Full support for medical imaging standards, preserving all metadata while securing the pixel payload.
            </p>
          </div>

          <div className="bg-white p-8 warm-shadow">
            <div className="text-4xl mb-4">🔐</div>
            <h4 className="font-headline text-lg text-on-surface mb-3">Zero-Trust Vault</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed font-body">
              No patient data is ever stored on our servers. Your encryption happens entirely in-memory at the edge.
            </p>
          </div>

          <div className="bg-white p-8 warm-shadow">
            <div className="text-4xl mb-4">📜</div>
            <h4 className="font-headline text-lg text-on-surface mb-3">Immutable Audit</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed font-body">
              Every encryption event is logged in a tamper-proof historical ledger for full institutional transparency.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Log */}
      <section className="max-w-7xl mx-auto px-8 pb-32">
        <div className="bg-surface-container flex flex-col md:flex-row gap-12 p-12">
          <div className="md:w-1/2">
            <h3 className="font-headline text-3xl text-on-surface mb-6">Real-time Sequence Mapping</h3>
            <p className="text-on-surface-variant mb-8 font-body text-sm">
              Our proprietary algorithm visualizes the intersection of genomic strings and digital pixel matrices in real-time.
            </p>
            <a href="#" className="text-primary font-medium text-sm flex items-center gap-2 hover:underline">
              Explore the Whitepaper →
            </a>
          </div>

          <div className="md:w-1/2 bg-surface-container-highest p-6 font-mono text-xs text-on-surface-variant">
            <div className="flex gap-4 border-b border-outline-variant/20 pb-3 mb-3">
              <span className="text-primary font-bold">LOG_0842</span>
              <span className="text-secondary">READY</span>
              <span className="ml-auto text-on-surface-variant">14:02:33:01</span>
            </div>
            <div className="space-y-1 text-on-surface-variant">
              <div>SEQUENCE_MATCH_FOUND :: PATIENT_ID_4492</div>
              <div>ATGC...TTAG...GGCA...TACC...GGTA</div>
              <div>ENC_LAYER_1: AES-256-GCM [ACTIVE]</div>
              <div className="opacity-40">PROCESSING MATRIX... 92% COMPLETE</div>
              <div className="text-primary">SIGNATURE: 0x8C4F16BD...DA33</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
