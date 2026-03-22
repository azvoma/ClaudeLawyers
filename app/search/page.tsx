// app/search/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { searchSolicitors, getTopCities } from '@/lib/solicitors';
import { SolicitorCard } from '@/components/directory/SolicitorCard';
import { searchMetadata, breadcrumbSchema, DOMAIN } from '@/lib/seo';

interface PageProps { searchParams: { q?: string; city?: string } }

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { q, city } = searchParams;
  const m = searchMetadata();
  if (q || city) {
    const term = q || city || '';
    return {
      ...m,
      title: `"${term}" — Employment Solicitor Search Results`,
      description: `Search results for "${term}" in our UK employment solicitor directory. Find local employment lawyers by name, city or specialism.`,
      robots: { index: false, follow: true }, // noindex search result pages
    };
  }
  return { title: m.title, description: m.description, robots: m.robots, alternates: m.alternates, openGraph: m.openGraph, twitter: m.twitter };
}

export default function SearchPage({ searchParams }: PageProps) {
  const { q = '', city = '' } = searchParams;
  const results  = q || city ? searchSolicitors(q, city) : [];
  const topCities = getTopCities(8);

  const bcSchema = breadcrumbSchema([
    { name: 'Home',   url: DOMAIN },
    { name: 'Search', url: `${DOMAIN}/search` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcSchema) }} />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="text-white py-10" style={{ background: 'linear-gradient(135deg,#0f2044,#1a3a6b)' }}>
          <div className="max-w-4xl mx-auto px-4">
            <nav className="text-xs text-gray-500 mb-4 flex gap-2">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span><span className="text-gray-300">Search</span>
            </nav>
            <h1 className="text-3xl font-serif font-bold mb-6">Search Employment Solicitors</h1>
            <form method="get" action="/search" className="flex flex-col sm:flex-row gap-3">
              <input type="text" name="q" defaultValue={q} placeholder="Firm name or service..."
                className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
              <input type="text" name="city" defaultValue={city} placeholder="City..."
                className="sm:w-48 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
              <button type="submit" className="font-bold px-6 py-3 rounded-lg" style={{ background: '#e8a900', color: '#0d1a33' }}>Search</button>
            </form>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {(q || city) ? (
            <>
              <p className="text-sm text-gray-500 mb-6">
                <strong className="text-gray-800">{results.length} results</strong>
                {q && <> for &ldquo;{q}&rdquo;</>}
                {city && <> in {city}</>}
                {' · '}<Link href="/search" className="hover:underline" style={{ color: '#1a3a6b' }}>Clear search</Link>
              </p>
              {results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {results.slice(0, 30).map(s => <SolicitorCard key={s.slug} solicitor={s} />)}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                  <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full" style={{ background: '#f3f4f6' }}>
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                  </div>
                  <h2 className="font-serif font-bold text-gray-700 text-xl mb-2">No results found</h2>
                  <p className="text-gray-400 text-sm mb-4">Try a different city or firm name.</p>
                  <Link href="/solicitors" className="text-sm font-semibold hover:underline" style={{ color: '#1a3a6b' }}>Browse all solicitors</Link>
                </div>
              )}
            </>
          ) : (
            <div>
              <h2 className="text-xl font-serif font-bold mb-5" style={{ color: '#0d1a33' }}>Browse by City</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                {topCities.map(({ city: c, count }) => (
                  <Link key={c} href={`/search?city=${encodeURIComponent(c)}`}
                    className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group">
                    <div>
                      <div className="font-medium text-gray-700 group-hover:text-blue-800 text-sm">{c}</div>
                      <div className="text-xs text-gray-400">{count} solicitors</div>
                    </div>
                    <span className="text-gray-300 group-hover:text-blue-400">›</span>
                  </Link>
                ))}
              </div>
              <h2 className="text-xl font-serif font-bold mb-5" style={{ color: '#0d1a33' }}>Popular Searches</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  ['Unfair dismissal solicitors London',      'London'],
                  ['Employment tribunal Manchester',           'Manchester'],
                  ['Redundancy solicitors Bristol',            'Bristol'],
                  ['Settlement agreement solicitors Edinburgh','Edinburgh'],
                  ['Discrimination lawyers Leeds',             'Leeds'],
                  ['Whistleblowing solicitors Birmingham',     'Birmingham'],
                ].map(([label, city]) => (
                  <Link key={label} href={`/search?city=${encodeURIComponent(city)}`}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-blue-300 hover:text-blue-700 transition-colors">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
