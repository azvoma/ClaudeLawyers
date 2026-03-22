// app/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllSolicitors, getTopCities } from '@/lib/solicitors';
import { SolicitorCard } from '@/components/directory/SolicitorCard';
import { homeMetadata, faqSchema, websiteSchema, yoastScore, DOMAIN } from '@/lib/seo';
import { YoastBadge } from '@/components/seo/YoastBadge';

// ── Metadata ───────────────────────────────────────────────────────────────
export async function generateMetadata(): Promise<Metadata> {
  const m = homeMetadata();
  return {
    title:       m.title,
    description: m.description,
    keywords:    m.keywords,
    robots:      m.robots,
    alternates:  m.alternates,
    openGraph:   m.openGraph,
    twitter:     m.twitter,
  };
}

const SERVICES = [
  { icon: '⚖️', title: 'Unfair Dismissal',       desc: 'Challenge wrongful termination and claim compensation.', href: '/solicitors?service=unfair-dismissal' },
  { icon: '🏛️', title: 'Employment Tribunals',   desc: 'Professional representation for your workplace rights.', href: '/solicitors?service=tribunal' },
  { icon: '💼', title: 'Redundancy Claims',        desc: 'Ensure fair process and correct statutory pay.',          href: '/solicitors?service=redundancy' },
  { icon: '🤝', title: 'Settlement Agreements',   desc: 'Expert negotiation and independent legal advice.',         href: '/solicitors?service=settlement' },
  { icon: '🛡️', title: 'Discrimination Claims',  desc: 'Protect your rights against all forms of discrimination.', href: '/solicitors?service=discrimination' },
  { icon: '📢', title: 'Whistleblowing',           desc: 'Defend whistleblower rights against employer retaliation.', href: '/solicitors?service=whistleblowing' },
];

const FAQ = [
  { q: 'How do I find an employment solicitor near me?', a: 'Use our free directory to search by city or postcode. Every listing includes verified contact details, Google ratings and specialisms so you can compare and contact the right solicitor quickly.' },
  { q: 'What does an employment solicitor do?', a: 'Employment solicitors advise on workplace legal matters including unfair dismissal, redundancy, settlement agreements, discrimination claims, employment tribunal representation and TUPE transfers.' },
  { q: 'How much does an employment solicitor cost in the UK?', a: 'Costs vary by firm and case complexity. Many employment solicitors offer a free initial consultation. Some work on a no-win no-fee basis for tribunal claims. Always check fee arrangements first.' },
  { q: 'Do I need a solicitor for an employment tribunal?', a: 'You are not legally required to have a solicitor, but professional representation significantly improves your chances. Many solicitors offer tribunal representation on a fixed-fee or no-win no-fee basis.' },
];

export default function HomePage() {
  const solicitors = getAllSolicitors();
  const topCities  = getTopCities(12);
  const featured   = solicitors.filter(s => s.rating && s.rating >= 4.8 && s.reviews && s.reviews >= 20).slice(0, 6);
  const rated      = solicitors.filter(s => s.rating);
  const avgRating  = (rated.reduce((s, r) => s + (r.rating || 0), 0) / rated.length).toFixed(1);

  // ── Yoast SEO score for this page ─────────────────────────────────────
  const seoScore = yoastScore({
    title:         'Employment Solicitors Near Me | Free UK Directory 2026',
    description:   'Find expert employment solicitors near you. Compare 330+ UK employment law firms by rating, location and specialism. Free to use — no registration required.',
    slug:          '',
    focusKw:       'employment solicitors',
    h1:            'Find Expert Employment Solicitors Near You',
    content:       `Employment Solicitors Near Me is the UK's leading online directory for finding specialist employment lawyers. Whether facing unfair dismissal, needing advice on a settlement agreement, or requiring representation at an employment tribunal, our directory helps you find the right employment solicitors quickly. Browse ${solicitors.length} employment solicitors across ${topCities.length} UK cities.`,
    internalLinks: 8,
    imageAlts:     ['Employment Solicitors Near Me directory', 'Find employment solicitors UK'],
  });

  const schemas = [faqSchema()];

  return (
    <>
      {/* Page-level JSON-LD schemas */}
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* HERO */}
      <section
        className="relative text-white overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#0d1a33 0%,#1a3a6b 60%,#162f58 100%)' }}
      >
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
              <span className="text-gray-200">{solicitors.length} Employment Solicitors Listed Across the UK</span>
            </div>
            {/* H1 — contains focus keyword */}
            <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-6">
              Find Expert{' '}
              <span style={{ color: '#f0c040' }}>Employment Solicitors</span>{' '}
              Near You
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl">
              Compare local employment solicitors across the UK. Read verified reviews and get free initial consultations for unfair dismissal, redundancy, and tribunal representation.
            </p>
            <form action="/search" method="get" className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="flex-1 relative">
                <input type="text" name="q" placeholder="Search by firm name or service..." className="w-full pl-4 pr-4 py-4 rounded-lg text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white" />
              </div>
              <input type="text" name="city" placeholder="City or postcode..." className="sm:w-52 px-4 py-4 rounded-lg text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white" />
              <button type="submit" className="font-bold py-4 px-8 rounded-lg transition-colors" style={{ background: '#e8a900', color: '#0d1a33' }}>Search</button>
            </form>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
              <span>Popular:</span>
              {['London','Manchester','Bristol','Leeds','Edinburgh'].map(city => (
                <Link key={city} href={`/solicitors?city=${city}`} style={{ color: '#f0c040' }} className="hover:underline">{city}</Link>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none"><path d="M0 60L1440 60L1440 30C1200 0 960 60 720 30C480 0 240 60 0 30L0 60Z" fill="#f7fafc" /></svg>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { v: `${solicitors.length}+`, l: 'Listed Solicitors' },
              { v: `${topCities.length}+`,  l: 'Cities Covered' },
              { v: `${avgRating}★`,         l: 'Average Rating' },
              { v: `${rated.length}`,        l: 'Verified Reviews' },
            ].map(s => (
              <div key={s.l}>
                <div className="text-3xl font-serif font-bold" style={{ color: '#1a3a6b' }}>{s.v}</div>
                <div className="text-sm text-gray-500 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES — H2 contains keyword variation */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-3" style={{ color: '#0d1a33' }}>
              Employment Law Services
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Our directory connects you with specialist employment solicitors across all areas of UK employment law.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(({ icon, title, desc, href }) => (
              <Link key={title} href={href} className="group p-6 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all bg-white">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-serif font-bold text-lg mb-2" style={{ color: '#0d1a33' }}>{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                <span className="mt-3 inline-block text-xs font-semibold" style={{ color: '#1a3a6b' }}>Find solicitors →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED LISTINGS — H2 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-serif font-bold" style={{ color: '#0d1a33' }}>Top Rated Employment Solicitors</h2>
              <p className="text-gray-500 mt-1">Highest-rated employment law firms based on verified client reviews</p>
            </div>
            <Link href="/solicitors" className="hidden md:block text-sm font-semibold hover:underline" style={{ color: '#1a3a6b' }}>
              View all {solicitors.length} listings →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {featured.map((s, i) => <SolicitorCard key={s.slug} solicitor={s} featured={i === 0} />)}
          </div>
          <div className="text-center mt-8">
            <Link href="/solicitors" className="inline-flex items-center gap-2 text-white px-8 py-3 rounded-lg font-semibold" style={{ background: '#1a3a6b' }}>
              Browse Full Directory →
            </Link>
          </div>
        </div>
      </section>

      {/* CITIES — H2 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold mb-3" style={{ color: '#0d1a33' }}>
              Find Employment Solicitors by City
            </h2>
            <p className="text-gray-500">Browse employment law firms in your area across the United Kingdom</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {topCities.map(({ city, count }) => (
              <Link key={city} href={`/solicitors?city=${encodeURIComponent(city)}`}
                className="group flex items-center justify-between p-4 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg transition-all">
                <div>
                  <div className="font-semibold text-sm text-gray-800">{city}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{count} solicitors</div>
                </div>
                <span className="text-gray-300 group-hover:text-blue-500">›</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — H2, structured with schema */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-8 text-center" style={{ color: '#0d1a33' }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-serif font-bold text-base mb-2" style={{ color: '#0d1a33' }}>{q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO CONTENT — keyword-rich paragraph, H2/H3 hierarchy */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-serif font-bold mb-6" style={{ color: '#0d1a33' }}>
            About Employment Solicitors Near Me
          </h2>
          <div className="text-gray-600 text-sm leading-relaxed space-y-4">
            <p>
              <strong className="text-gray-800">Employment Solicitors Near Me</strong> is the UK&apos;s leading free online directory for finding specialist employment lawyers. Whether you are facing unfair dismissal, need advice on a settlement agreement, or require representation at an employment tribunal, our directory of <strong>{solicitors.length}+ employment solicitors</strong> helps you find the right legal expert quickly.
            </p>
            <h3 className="text-base font-serif font-bold pt-2" style={{ color: '#0d1a33' }}>Why You May Need an Employment Solicitor</h3>
            <p>
              Employment law in the UK is complex and constantly evolving. From <strong>unfair dismissal claims</strong> governed by the Employment Rights Act 1996, to <strong>discrimination claims</strong> under the Equality Act 2010, and <strong>redundancy disputes</strong> involving statutory pay calculations — having a qualified employment solicitor significantly improves your chances of a successful outcome.
            </p>
            <h3 className="text-base font-serif font-bold pt-2" style={{ color: '#0d1a33' }}>Finding Employment Solicitors Across the UK</h3>
            <p>
              Our directory covers all major UK cities including London, Manchester, Birmingham, Leeds, Bristol, Edinburgh, Sheffield, Nottingham, Cambridge, and hundreds more. Every employment solicitor listing includes verified contact details, Google ratings, opening hours, and links to the firm&apos;s website — making it easy to compare and contact the right employment lawyer for your situation.
            </p>
          </div>

          {/* Yoast SEO Score — visible in development/admin */}
          <div className="mt-8">
            <YoastBadge score={seoScore} />
          </div>
        </div>
      </section>
    </>
  );
}
