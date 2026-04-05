import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-20 lg:py-32 grid md:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col items-start gap-8">
          <h1 className="font-headline text-5xl lg:text-6xl leading-tight text-on-surface">
            Secure medical images with DNA-powered encryption
          </h1>
          <p className="text-base text-on-surface-variant max-w-lg leading-relaxed font-body">
            Protect sensitive patient diagnostics using clinical-grade biometric sequences. Advanced protection for MRI, CT, and X-Ray archives with cryptographically immutable signatures.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/encrypt/upload"
              className="bg-primary text-white px-8 py-3 text-sm font-medium hover:opacity-90 transition"
            >
              Start Encrypting
            </Link>
            <button className="bg-white border border-outline-variant text-on-surface px-8 py-3 text-sm font-medium hover:bg-surface-container-low transition">
              How It Works
            </button>
          </div>
        </div>

        <div className="relative w-full h-96 bg-black rounded">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-xs font-mono text-secondary mb-2">SAFE</div>
              <div className="text-xl font-headline mb-8">Verification Pending</div>
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full opacity-20 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Pipeline Section */}
      <section className="bg-surface-container-high py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-12 pt-12">
            <div className="flex flex-col gap-4">
              <span className="font-headline text-6xl text-primary opacity-30">01.</span>
              <h3 className="font-headline text-2xl text-on-surface">Upload Image</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed font-body">
                Securely ingest high-resolution DICOM or medical image files into our sandboxed clinical environment.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-headline text-6xl text-primary opacity-30">02.</span>
              <h3 className="font-headline text-2xl text-on-surface">Configure &amp; Encrypt</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed font-body">
                Map specific patient DNA sequences as the primary cryptographic key for an unbreakable layer of security.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-headline text-6xl text-primary opacity-30">03.</span>
              <h3 className="font-headline text-2xl text-on-surface">Download Secured File</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed font-body">
                Export your archived image with its embedded clinical signature, ready for long-term storage or peer review.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-8 py-32">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <h2 className="font-headline text-4xl mb-6">Built for the Rigor of Clinical Research</h2>
          <div className="w-12 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: '🧬', title: 'DNA Salting', desc: 'We utilize unique biological markers to salt encryption keys, ensuring localized data remains distinct.' },
            { icon: '📋', title: 'DICOM Compliant', desc: 'Full support for medical imaging standards, preserving all metadata while securing the pixel payload.' },
            { icon: '🔐', title: 'Zero-Trust Vault', desc: 'No patient data is ever stored on our servers. Your encryption happens entirely in-memory at the edge.' },
            { icon: '📜', title: 'Immutable Audit', desc: 'Every encryption event is logged in a tamper-proof historical ledger for full institutional transparency.' },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-8 editorial-shadow">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h4 className="font-headline text-xl mb-3">{feature.title}</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed font-body">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Log Section */}
      <section className="max-w-7xl mx-auto px-8 pb-32">
        <div className="bg-surface-container flex flex-col md:flex-row items-center gap-12 p-8 lg:p-16">
          <div className="w-full md:w-1/2">
            <h3 className="font-headline text-3xl mb-6">Real-time Sequence Mapping</h3>
            <p className="text-on-surface-variant mb-8 font-body">
              Our proprietary algorithm visualizes the intersection of genomic strings and digital pixel matrices in real-time.
            </p>
            <a href="#" className="text-primary font-medium text-sm flex items-center gap-2 hover:underline">
              Explore the Whitepaper →
            </a>
          </div>

          <div className="w-full md:w-1/2 bg-surface-container-highest p-6 font-mono text-xs text-on-surface-variant overflow-hidden">
            <div className="flex gap-4 border-b border-outline-variant/20 pb-2 mb-4">
              <span className="text-primary font-bold">LOG_0842</span>
              <span className="text-secondary">READY</span>
              <span className="ml-auto opacity-50">14:02:33:01</span>
            </div>
            <div className="space-y-1">
              <div className="text-secondary">SEQUENCE_MATCH_FOUND :: PATIENT_ID_4492</div>
              <div>ATGC...TTAG...GGCA...TACC...GGTA</div>
              <div>ENC_LAYER_1: AES-256-GCM [ACTIVE]</div>
              <div className="opacity-40">PROCESSING MATRIX... 92% COMPLETE</div>
              <div className="text-primary font-medium">SIGNATURE: 0x8C4F16BD...DA33</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
