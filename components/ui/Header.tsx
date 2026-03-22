// components/ui/Header.tsx
import Link from 'next/link';
import { ScalesIcon, SearchIcon } from './Icons';

const NAV_LINKS = [
  { href: '/solicitors', label: 'Find Solicitors' },
  { href: '/search', label: 'Search' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const QUICK_CITIES = ['London', 'Manchester', 'Birmingham', 'Leeds', 'Bristol', 'Edinburgh'];

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      {/* Top bar */}
      <div style={{ background: '#0d1a33' }} className="text-white text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <span className="text-gray-400">UK Employment Law Directory — Expert Solicitors Nationwide</span>
          <div className="flex items-center gap-4 text-gray-400">
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <span className="text-gray-600">|</span>
            <span>Free Initial Consultations Available</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#1a3a6b' }}>
              <ScalesIcon size={18} className="text-white" />
            </div>
            <div>
              <span className="font-serif font-bold text-lg leading-none block" style={{ color: '#0d1a33' }}>
                Employment Solicitors
              </span>
              <span className="text-xs text-gray-400 tracking-widest uppercase">Near Me</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-gray-600 hover:text-blue-800 px-3 py-2 rounded hover:bg-gray-50 transition-colors"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/search"
              className="ml-2 flex items-center gap-2 text-sm font-semibold text-white px-4 py-2 rounded-lg transition-colors"
              style={{ background: '#1a3a6b' }}
            >
              <SearchIcon size={13} className="text-white" />
              Browse Directory
            </Link>
          </nav>
        </div>

        {/* Secondary nav — city quick links */}
        <nav className="hidden md:flex items-center gap-6 py-2 border-t border-gray-100 text-xs text-gray-500">
          <span className="font-medium text-gray-400 uppercase tracking-wide text-xs">Browse by:</span>
          {QUICK_CITIES.map((city) => (
            <Link
              key={city}
              href={`/solicitors?city=${city}`}
              className="hover:text-blue-800 hover:underline transition-colors"
            >
              {city}
            </Link>
          ))}
          <Link
            href="/solicitors"
            className="font-medium hover:underline ml-2"
            style={{ color: '#c9920a' }}
          >
            All Cities →
          </Link>
        </nav>
      </div>
    </header>
  );
}
