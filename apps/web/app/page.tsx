import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="max-w-[1120px] mx-auto px-8 py-20 lg:py-32 grid md:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
        <div className="flex flex-col items-start gap-8">
          <h1 className="font-headline text-5xl lg:text-7xl leading-[1.1] text-on-surface">
            Secure medical images with DNA-powered encryption
          </h1>
          <p className="font-body text-xl text-on-surface-variant max-w-lg leading-relaxed">
            Protect sensitive patient diagnostics using clinical-grade biometric
            sequences. Advanced protection for MRI, CT, and X-Ray archives with
            cryptographically immutable signatures.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/encrypt/upload"
              className="bg-primary text-on-primary px-8 py-4 text-sm font-medium tracking-wide hover:bg-primary-container transition-all active:opacity-80 active:scale-95"
            >
              Start Encrypting
            </Link>
            <button className="bg-transparent border border-on-surface/20 text-on-surface px-8 py-4 text-sm font-medium tracking-wide hover:bg-surface-container-high transition-all">
              How It Works
            </button>
          </div>
        </div>

        <div className="relative w-full aspect-square md:aspect-auto md:h-[600px] overflow-hidden rounded-sm border border-outline-variant/20">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuClPGKUwHTh8kes09pl865QUl_oNTcZvh_ZmfvEeHYbPbbF6fPLgD5uplSnxR_YolIln0xXPQgj5-YljHYAw1H3FCyUIT9vJ0y2Q7WlxXdLK4hiMX6vIt2-kJCa5NaMidrNNz_ynspSoozp7jzffpCMplDyYy6k-9vG5KNEc97E06iyynd-Z4Z9EfPmYjos-2SRJeEiww7HE-3YvtzrXHbxEuohrs37ozMqpp1vhRXOKX0v6gBQ-lsW_JgS7UiWSn3v0R7cu6Ebpcr9"
            alt="Medical MRI scan"
            fill
            className="object-cover"
          />
          <div className="absolute top-8 right-8 bg-surface-container-lowest/80 backdrop-blur-md p-4 editorial-shadow border border-outline-variant/10">
            <div className="font-mono text-[10px] text-primary uppercase tracking-widest mb-1">
              Status
            </div>
            <div className="font-headline text-sm italic">Verification Pending</div>
          </div>
        </div>
      </section>

      {/* Pipeline Section */}
      <section className="bg-surface-container-high py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-12 border-t border-outline-variant/20 pt-12">
            <div className="flex flex-col gap-4">
              <span className="font-headline text-6xl text-primary/20">01.</span>
              <h3 className="font-headline text-2xl text-on-surface">
                Upload Image
              </h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Securely ingest high-resolution DICOM or medical image files into
                our sandboxed clinical environment.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-headline text-6xl text-primary/20">02.</span>
              <h3 className="font-headline text-2xl text-on-surface">
                Configure &amp; Encrypt
              </h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Map specific patient DNA sequences as the primary cryptographic
                key for an unbreakable layer of security.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-headline text-6xl text-primary/20">03.</span>
              <h3 className="font-headline text-2xl text-on-surface">
                Download Secured File
              </h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Export your archived image with its embedded clinical signature,
                ready for long-term storage or peer review.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-[1120px] mx-auto px-8 py-32">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <h2 className="font-headline text-4xl mb-6">
            Built for the Rigor of Clinical Research
          </h2>
          <div className="w-12 h-[1px] bg-primary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: 'genetics',
              title: 'DNA Salting',
              desc: 'We utilize unique biological markers to salt encryption keys, ensuring localized data remains distinct.',
            },
            {
              icon: 'clinical_notes',
              title: 'DICOM Compliant',
              desc: 'Full support for medical imaging standards, preserving all metadata while securing the pixel payload.',
            },
            {
              icon: 'security',
              title: 'Zero-Trust Vault',
              desc: "No patient data is ever stored on our servers. Your encryption happens entirely in-memory at the edge.",
            },
            {
              icon: 'history_edu',
              title: 'Immutable Audit',
              desc: 'Every encryption event is logged in a tamper-proof historical ledger for full institutional transparency.',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-surface-container-lowest p-8 editorial-shadow transition-transform hover:-translate-y-1"
            >
              <span className="material-symbols-outlined text-primary text-3xl mb-6 block">
                {feature.icon}
              </span>
              <h4 className="font-headline text-2xl mb-4">{feature.title}</h4>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Log Section */}
      <section className="max-w-[1120px] mx-auto px-8 pb-32">
        <div className="bg-surface-container flex flex-col md:flex-row items-center gap-12 p-8 lg:p-16">
          <div className="w-full md:w-1/2">
            <h3 className="font-headline text-3xl mb-6">
              Real-time Sequence Mapping
            </h3>
            <p className="font-body text-on-surface-variant mb-8">
              Our proprietary algorithm visualizes the intersection of genomic
              strings and digital pixel matrices in real-time.
            </p>
            <a
              href="#"
              className="text-primary font-medium text-sm flex items-center gap-2 hover:underline"
            >
              Explore the Whitepaper
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </a>
          </div>

          <div className="w-full md:w-1/2 bg-surface-container-highest p-6 rounded-sm font-mono text-[11px] text-on-surface-variant overflow-hidden">
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
              <div className="text-primary font-medium">
                SIGNATURE: 0x8C4F16BD...DA33
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
