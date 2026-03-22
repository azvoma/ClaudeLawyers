// app/solicitors/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllSolicitors, getTopCities, searchSolicitors } from '@/lib/solicitors';
import { SolicitorCard } from '@/components/directory/SolicitorCard';
import { directoryMetadata, cityMetadata, itemListSchema, breadcrumbSchema, DOMAIN } from '@/lib/seo';

const PAGE_SIZE = 18;

interface PageProps {
  searchParams: { city?: string; q?: string; page?: string; sort?: string };
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { city, q, page } = searchParams;
  const pageNum = parseInt(page || '1');

  let m;
  if (city) {
    const count = searchSolicitors('', city).length;
    m = cityMetadata(city, count);
  } else {
    m = directoryMetadata();
  }

  // Append page number to title/description for paginated pages
  const title = pageNum > 1 ? `${m.title} — Page ${pageNum}` : m.title;

  return {
    title,
    description: m.description,
    keywords:    m.keywords,
    robots:      pageNum > 1
      ? { index: false, follow: true }  // noindex paginated pages
      : m.robots,
    alternates:  m.alternates,
    openGraph:   { ...m.openGraph, title },
    twitter:     { ...m.twitter,   title },
  };
}

export default function SolicitorsPage({ searchParams }: PageProps) {
  const { city, q, page: pageParam, sort } = searchParams;
  const currentPage = Math.max(1, parseInt(pageParam || '1'));

  const allSolicitors = getAllSolicitors();
  const topCities     = getTopCities(20);

  // Filter
  let results = q || city ? searchSolicitors(q || '', city) : allSolicitors;

  // Sort
  if (sort === 'reviews') {
    results = [...results].sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
  } else if (sort === 'name') {
    results = [...results].sort((a, b) => a.name.localeCompare(b.name));
  } else {
    results = [...results].sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  const totalResults = results.length;
  const totalPages   = Math.ceil(totalResults / PAGE_SIZE);
  const paginated    = results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // JSON-LD schemas
  const listName = city ? `Employment Solicitors in ${city}` : 'UK Employment Solicitors Directory';
  const listUrl  = city ? `${DOMAIN}/solicitors?city=${encodeURIComponent(city)}` : `${DOMAIN}/solicitors`;
  const ilSchema = itemListSchema(results, listName, listUrl);
  const bcSchema = breadcrumbSchema([
    { name: 'Home',                  url: DOMAIN },
    { name: 'Employment Solicitors', url: `${DOMAIN}/solicitors` },
    ...(city ? [{ name: `Solicitors in ${city}`, url: `${DOMAIN}/solicitors?city=${encodeURIComponent(city)}` }] : []),
  ]);

  const buildUrl = (params: Record<string, string | undefined>) => {
    const merged = { city, q, sort, ...params };
    const qs = Object.entries(merged).filter(([, v]) => v).map(([k, v]) => `${k}=${encodeURIComponent(v!)}`).join('&');
    return `/solicitors${qs ? `?${qs}` : ''}`;
  };

  return (
    <>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ilSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcSchema) }} />

      <div className="min-h-screen bg-gray-50">
        {/* H1 header */}
        <div className="text-white py-10" style={{ background: 'linear-gradient(135deg,#0f2044,#1a3a6b)' }}>
          <div className="max-w-7xl mx-auto px-4">
            <nav className="text-xs text-gray-500 mb-3 flex items-center gap-2 flex-wrap">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>›</span>
              {city ? (
                <>
                  <Link href="/solicitors" className="hover:text-white transition-colors">Employment Solicitors</Link>
                  <span>›</span>
                  <span className="text-gray-300">{city}</span>
                </>
              ) : (
                <span className="text-gray-200">Employment Solicitors</span>
              )}
            </nav>
            <h1 className="text-3xl font-serif font-bold mb-2">
              {city ? `Employment Solicitors in ${city}` : q ? `Results for "${q}"` : 'Find Employment Solicitors Near You'}
            </h1>
            <p className="text-gray-300 text-sm">
              {totalResults} employment {totalResults === 1 ? 'solicitor' : 'solicitors'} found
              {city ? ` in ${city}` : ' across the UK'}
              {currentPage > 1 ? ` — Page ${currentPage}` : ''}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Sidebar */}
            <aside className="lg:w-72 flex-shrink-0" aria-label="Filter solicitors">
              {/* Search */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 mb-5">
                <h2 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">Search</h2>
                <form action="/solicitors" method="get" className="space-y-3">
                  <input type="text" name="q" defaultValue={q} placeholder="Firm name, service..."
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="text" name="city" defaultValue={city} placeholder="City..."
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <button type="submit" className="w-full text-white py-2.5 rounded-lg text-sm font-semibold" style={{ background: '#1a3a6b' }}>Search</button>
                  {(q || city) && <Link href="/solicitors" className="block text-center text-xs text-gray-400 hover:text-blue-700">Clear filters</Link>}
                </form>
              </div>

              {/* Sort */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 mb-5">
                <h2 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">Sort By</h2>
                <div className="space-y-1">
                  {[['rating','Highest Rated'],['reviews','Most Reviewed'],['name','A–Z Name']].map(([val, label]) => (
                    <Link key={val} href={buildUrl({ sort: val, page: '1' })}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${(sort || 'rating') === val ? 'font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                      style={(sort || 'rating') === val ? { background: '#eef2ff', color: '#1a3a6b' } : {}}>
                      <span className="w-2 h-2 rounded-full" style={{ background: (sort || 'rating') === val ? '#1a3a6b' : '#d1d5db' }} />
                      {label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Cities */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h2 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">Browse by City</h2>
                <div className="space-y-0.5 max-h-72 overflow-y-auto">
                  <Link href="/solicitors"
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${!city ? 'font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    style={!city ? { background: '#eef2ff', color: '#1a3a6b' } : {}}>
                    <span>All Cities</span><span className="text-xs text-gray-400">{allSolicitors.length}</span>
                  </Link>
                  {topCities.map(({ city: c, count }) => (
                    <Link key={c} href={buildUrl({ city: c, page: '1' })}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${city === c ? 'font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                      style={city === c ? { background: '#eef2ff', color: '#1a3a6b' } : {}}>
                      <span>{c}</span><span className="text-xs text-gray-400">{count}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

            {/* Results */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-gray-500">
                  Showing <strong className="text-gray-800">{(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, totalResults)}</strong> of <strong className="text-gray-800">{totalResults}</strong> results
                </p>
                {city && <Link href="/solicitors" className="text-xs font-medium hover:underline" style={{ color: '#1a3a6b' }}>✕ Clear city filter</Link>}
              </div>

              {paginated.length > 0 ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {paginated.map((s, i) => <SolicitorCard key={s.slug} solicitor={s} featured={currentPage === 1 && i === 0} />)}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                  <div className="text-4xl mb-3">🔍</div>
                  <h3 className="font-serif font-bold text-gray-700 text-xl mb-2">No results found</h3>
                  <p className="text-gray-400 text-sm mb-4">Try a different city or search term.</p>
                  <Link href="/solicitors" className="text-sm font-semibold hover:underline" style={{ color: '#1a3a6b' }}>Browse all solicitors</Link>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-2">
                  {currentPage > 1 && (
                    <Link href={buildUrl({ page: String(currentPage - 1) })} className="px-4 py-2 text-sm border border-gray-200 rounded-lg bg-white hover:bg-gray-50 text-gray-600">← Previous</Link>
                  )}
                  {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                    const pageNum = totalPages <= 7 ? i + 1 : currentPage <= 4 ? i + 1 : currentPage >= totalPages - 3 ? totalPages - 6 + i : currentPage - 3 + i;
                    return (
                      <Link key={pageNum} href={buildUrl({ page: String(pageNum) })}
                        aria-current={pageNum === currentPage ? 'page' : undefined}
                        className="w-9 h-9 flex items-center justify-center text-sm rounded-lg transition-colors"
                        style={pageNum === currentPage
                          ? { background: '#1a3a6b', color: 'white', fontWeight: 700 }
                          : { border: '1px solid #e5e7eb', background: 'white', color: '#374151' }}>
                        {pageNum}
                      </Link>
                    );
                  })}
                  {currentPage < totalPages && (
                    <Link href={buildUrl({ page: String(currentPage + 1) })} className="px-4 py-2 text-sm border border-gray-200 rounded-lg bg-white hover:bg-gray-50 text-gray-600">Next →</Link>
                  )}
                </nav>
              )}

              {/* SEO content for city pages — H2 keyword block */}
              {city && (
                <div className="mt-10 bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-xl font-serif font-bold mb-3" style={{ color: '#0d1a33' }}>
                    Employment Solicitors in {city}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Our directory lists {totalResults} verified employment solicitors in {city} and the surrounding area. Whether you need representation at an employment tribunal, advice on unfair dismissal, or help negotiating a settlement agreement, our {city} employment solicitors are ready to help. Every listing includes verified contact details, Google ratings, and a full list of services.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
