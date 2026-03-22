// components/ui/Footer.tsx
import Link from 'next/link';
import { ScalesIcon, PhoneIcon, EmailIcon, MapPinIcon } from './Icons';

const SERVICES = [
  { label: 'Unfair Dismissal Claims', href: '/solicitors?service=unfair-dismissal' },
  { label: 'Employment Tribunal', href: '/solicitors?service=employment-tribunal' },
  { label: 'Redundancy Advice', href: '/solicitors?service=redundancy' },
  { label: 'Settlement Agreements', href: '/solicitors?service=settlement-agreements' },
  { label: 'Discrimination Claims', href: '/solicitors?service=discrimination' },
  { label: 'Whistleblowing', href: '/solicitors?service=whistleblowing' },
  { label: 'TUPE Transfers', href: '/solicitors?service=tupe' },
];

const TOP_CITIES = ['London', 'Manchester', 'Birmingham', 'Leeds', 'Bristol', 'Edinburgh', 'Sheffield', 'Nottingham'];

const INFO_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Use', href: '/terms' },
  { label: 'Browse Directory', href: '/solicitors' },
  { label: 'Search Solicitors', href: '/search' },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: '#0a1628' }} className="text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#c9920a' }}>
                <ScalesIcon size={18} style={{ color: '#0a1628' }} />
              </div>
              <span className="text-white font-serif font-bold text-sm leading-tight">
                Employment Solicitors<br />
                <span className="font-normal text-gray-400 text-xs tracking-widest uppercase">Near Me</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500 mb-4">
              The UK&apos;s leading directory of employment law solicitors. Find expert legal representation for workplace disputes, unfair dismissal, and more.
            </p>
            <div className="flex flex-col gap-2 text-xs text-gray-500">
              <span className="flex items-center gap-2">
                <MapPinIcon size={12} className="text-gray-600" />
                United Kingdom
              </span>
              <Link href="/contact" className="flex items-center gap-2 hover:text-gray-300 transition-colors">
                <EmailIcon size={12} className="text-gray-600" />
                Get in touch
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">Legal Services</h3>
            <ul className="space-y-2">
              {SERVICES.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-gray-500 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">Find by City</h3>
            <ul className="space-y-2">
              {TOP_CITIES.map((city) => (
                <li key={city}>
                  <Link href={`/solicitors?city=${city}`} className="text-sm text-gray-500 hover:text-white transition-colors">
                    Employment Solicitors {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info + disclaimer */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">Information</h3>
            <ul className="space-y-2 mb-6">
              {INFO_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-gray-500 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="p-3 rounded-lg text-xs text-gray-500 leading-relaxed" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <strong className="text-gray-400 block mb-1">Disclaimer</strong>
              This directory is for informational purposes only and does not constitute legal advice. Always seek professional legal counsel. Not affiliated with the Solicitors Regulation Authority (SRA).
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between text-xs text-gray-600">
          <span>© {year} employmentsolicitorsnearme.co.uk · All Rights Reserved</span>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link href="/privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-400 transition-colors">Terms of Use</Link>
            <Link href="/contact" className="hover:text-gray-400 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
