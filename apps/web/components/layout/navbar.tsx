'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/encrypt/upload', label: 'Encrypt' },
    { href: '/decrypt/upload', label: 'Decrypt' },
    { href: '/analysis', label: 'Analysis' },
    { href: '/history', label: 'History' },
    { href: '/settings', label: 'Settings' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 navbar-glass">
      <div className="max-w-[1120px] mx-auto px-8 py-4 flex justify-between items-center">
        <div className="text-2xl font-headline italic text-on-surface">
          DNASecure
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-headline text-lg tracking-tight transition-colors ${
                isActive(link.href)
                  ? 'text-primary border-b border-primary pb-1'
                  : 'text-on-surface/70 hover:text-on-surface'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary text-2xl">
            fiber_manual_record
          </span>
          <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPZZlb1WvQKhS0PgjBy79ka5xfT7LAuTSpED-eVyb96I3UsezVCrZJ9sFwHhiEx71M6_Z0BWpCOp4KU-977cdTR4iWas71-Vh3E_i3W1GwQVmkGRY7p1X08-WQtJjrI80to16bhg4nEyg7DwvFNYODhk4-1nZYcc3T6ghNonn44p5DIMUxl2eHYVf1QqsH2JKICvLc_3MiEu6qZKAZtRwQx13tG4WYRQYPuIQycoTe7CGgVsSSnidYO28b6W62m91JhRkDCL7qZ9B9"
              alt="User profile"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
