// app/solicitors/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getAllSolicitors, getSolicitorBySlug,
  getSolicitorsByCity, parseWorkingHours, getSolicitorServices,
} from '@/lib/solicitors';
import {
  listingMetadata, localBusinessSchema, breadcrumbSchema,
  itemListSchema, yoastScore, buildServiceString, DOMAIN,
} from '@/lib/seo';
import { YoastBadge } from '@/components/seo/YoastBadge';

interface PageProps { params: { slug: string } }

// Build all 330 static pages at build time
export async function generateStaticParams() {
  return getAllSolicitors().map(s => ({ slug: s.slug }));
}

// Unique metadata per listing
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const s = getSolicitorBySlug(params.slug);
  if (!s) return { title: 'Not Found' };
  const m = listingMetadata(s);
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

export default function SolicitorProfilePage({ params }: PageProps) {
  const s = getSolicitorBySlug(params.slug);
  if (!s) notFound();

  const services = getSolicitorServices(s);
  const hours    = parseWorkingHours(s.working_hours_csv_compatible);
  const nearby   = s.city ? getSolicitorsByCity(s.city).filter(x => x.slug !== s.slug).slice(0, 3) : [];

  // ── JSON-LD Schemas ─────────────────────────────────────────────────────
  const lbSchema = localBusinessSchema(s);
  const bcSchema = breadcrumbSchema([
    { name: 'Home',                  url: DOMAIN },
    { name: 'Employment Solicitors', url: `${DOMAIN}/solicitors` },
    ...(s.city ? [{ name: `Solicitors in ${s.city}`, url: `${DOMAIN}/solicitors?city=${encodeURIComponent(s.city)}` }] : []),
    { name: s.name,                  url: `${DOMAIN}/solicitors/${s.slug}` },
  ]);

  // ── Yoast score for this listing ────────────────────────────────────────
  const city       = s.city || 'UK';
  const serviceStr = buildServiceString(s);
  const seoCheck   = yoastScore({
    title:         `${s.name} | ${city} Employment Solicitor${s.rating ? ` | ${s.rating}★` : ''}`,
    description:   `${s.name} — employment solicitors in ${city} specialising in ${serviceStr}. View verified ratings, contact details, opening hours and services.`,
    slug:          s.slug,
    focusKw:       `employment solicitors ${city}`.toLowerCase(),
    h1:            s.name,
    content:       `${s.name} is a specialist employment law firm ${s.city ? 'based in ' + s.city : 'in the UK'}. ${s.description || ''} They provide employment solicitor services including ${serviceStr}.`,
    internalLinks: nearby.length + 2,
    imageAlts:     s.logo ? [`${s.name} employment solicitors logo`] : [],
  });

  const initials = s.name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
  const ratingInt = s.rating ? Math.round(s.rating) : 0;

  return (
    <>
      {/* JSON-LD schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(lbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcSchema) }} />

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <nav aria-label="Breadcrumb" className="text-xs text-gray-400 flex items-center gap-2 flex-wrap">
              <Link href="/" className="hover:text-blue-800 transition-colors">Home</Link>
              <span>›</span>
              <Link href="/solicitors" className="hover:text-blue-800 transition-colors">Employment Solicitors</Link>
              {s.city && (<><span>›</span><Link href={`/solicitors?city=${s.city}`} className="hover:text-blue-800 transition-colors">{s.city}</Link></>)}
              <span>›</span>
              <span className="text-gray-600">{s.name}</span>
            </nav>
          </div>
        </div>

        {/* Profile header */}
        <div className="text-white py-10" style={{ background: 'linear-gradient(135deg,#0d1a33 0%,#1a3a6b 100%)' }}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div
                className="w-20 h-20 rounded-xl flex-shrink-0 flex items-center justify-center text-white font-serif font-bold text-2xl border-2 border-white/20"
                style={{ background: 'rgba(255,255,255,0.1)' }}
                aria-label={`${s.name} logo`}
              >
                {s.logo
                  ? <img src={s.logo} alt={`${s.name} employment solicitors logo`} className="w-full h-full object-contain rounded-xl" />
                  : initials}
              </div>
              <div className="flex-1">
                {/* H1 — firm name */}
                <h1 className="text-3xl md:text-4xl font-serif font-bold leading-tight mb-2" itemProp="name">{s.name}</h1>
                {s.rating && (
                  <div className="flex items-center gap-2 mb-3" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
                    <div className="flex text-yellow-400 text-lg" aria-label={`${s.rating} stars`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} style={{ opacity: i < ratingInt ? 1 : 0.3 }}>★</span>
                      ))}
                    </div>
                    <span className="font-bold text-lg" itemProp="ratingValue">{s.rating.toFixed(1)}</span>
                    {s.reviews && <span className="text-gray-300 text-sm">(<span itemProp="reviewCount">{s.reviews}</span> reviews)</span>}
                    <meta itemProp="bestRating" content="5" />
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                  {s.address && (
                    <span className="flex items-center gap-1.5" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
                      <span itemProp="addressLocality">{s.city}</span>{s.postal_code && <span>, <span itemProp="postalCode">{s.postal_code}</span></span>}
                    </span>
                  )}
                  {s.phone && (
                    <a href={`tel:${s.phone}`} className="flex items-center gap-1.5 hover:text-white" itemProp="telephone">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 512 512"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>
                      {s.phone}
                    </a>
                  )}
                  {s.website && (
                    <a href={s.website} target="_blank" rel="noopener noreferrer nofollow" className="flex items-center gap-1.5 hover:text-white" itemProp="url">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 512 512"><path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64z"/></svg>
                      Visit Website ↗
                    </a>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                {s.phone && (
                  <a href={`tel:${s.phone}`} className="flex items-center gap-2 font-bold py-3 px-6 rounded-lg transition-colors text-center" style={{ background: '#e8a900', color: '#0d1a33' }}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 512 512"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>
                    Call Now
                  </a>
                )}
                {s.website && (
                  <a href={s.website} target="_blank" rel="noopener noreferrer nofollow" className="border border-white/30 hover:bg-white/10 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center text-sm">
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main column */}
            <div className="lg:col-span-2 space-y-6">
              {/* About — H2 */}
              <section className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-serif font-bold mb-4" style={{ color: '#0d1a33' }}>About {s.name}</h2>
                <p className="text-gray-600 leading-relaxed text-sm" itemProp="description">
                  {s.description ||
                    `${s.name} is a specialist employment law firm ${s.city ? `based in ${s.city}` : 'in the UK'}, providing expert legal advice and representation on all aspects of UK employment law. Services include unfair dismissal claims, employment tribunal representation, redundancy advice, settlement agreements, and discrimination claims under the Equality Act 2010.`}
                </p>
              </section>

              {/* Services — H2 */}
              <section className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-serif font-bold mb-4" style={{ color: '#0d1a33' }}>Employment Law Services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services.map(service => (
                    <div key={service} className="flex items-center gap-3 p-3 rounded-lg border" style={{ background: '#eef2ff', borderColor: '#c7d2fe' }}>
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#1a3a6b' }}>
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
                      </div>
                      <span className="text-sm font-medium" style={{ color: '#1a3a6b' }}>{service}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Nearby — H2, internal links */}
              {nearby.length > 0 && (
                <section className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-xl font-serif font-bold mb-4" style={{ color: '#0d1a33' }}>
                    Other Employment Solicitors in {s.city}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {nearby.map(n => (
                      <Link key={n.slug} href={`/solicitors/${n.slug}`} className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
                        <div className="font-serif font-bold text-xs mb-1" style={{ color: '#0d1a33' }}>{n.name}</div>
                        {n.rating && <div className="text-xs text-gray-500">★ {n.rating.toFixed(1)}{n.reviews ? ` · ${n.reviews} reviews` : ''}</div>}
                      </Link>
                    ))}
                  </div>
                  <Link href={`/solicitors?city=${s.city}`} className="mt-3 inline-block text-xs font-semibold hover:underline" style={{ color: '#1a3a6b' }}>
                    View all employment solicitors in {s.city} →
                  </Link>
                </section>
              )}

              {/* Yoast SEO Analysis */}
              <YoastBadge score={seoCheck} title={`SEO Analysis — ${s.name}`} />
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Contact card */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-serif font-bold text-base mb-4" style={{ color: '#0d1a33' }}>Contact Details</h3>
                <div className="space-y-3">
                  {s.phone && (<><div className="text-xs text-gray-400 uppercase tracking-wide">Phone</div><a href={`tel:${s.phone}`} className="block text-sm font-semibold hover:underline" style={{ color: '#1a3a6b' }}>{s.phone}</a></>)}
                  {s.email_1 && (<><div className="text-xs text-gray-400 uppercase tracking-wide mt-2">Email</div><a href={`mailto:${s.email_1}`} className="block text-xs hover:underline break-all" style={{ color: '#1a3a6b' }}>{s.email_1}</a></>)}
                  {s.address && (<><div className="text-xs text-gray-400 uppercase tracking-wide mt-2">Address</div><address className="text-xs text-gray-600 not-italic leading-relaxed">{s.address}</address></>)}
                  {s.website && (<><div className="text-xs text-gray-400 uppercase tracking-wide mt-2">Website</div><a href={s.website} target="_blank" rel="noopener noreferrer nofollow" className="text-xs hover:underline break-all" style={{ color: '#1a3a6b' }}>{s.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}</a></>)}
                </div>
                {s.phone && (
                  <a href={`tel:${s.phone}`} className="mt-5 flex items-center justify-center gap-2 w-full text-white font-semibold py-3 rounded-lg transition-colors text-sm" style={{ background: '#1a3a6b' }}>
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 512 512"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>
                    Call {s.name.split(' ')[0]}
                  </a>
                )}
              </div>

              {/* Opening hours */}
              {hours.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="font-serif font-bold text-base mb-3" style={{ color: '#0d1a33' }}>Opening Hours</h3>
                  <div className="space-y-1.5">
                    {hours.map(h => (
                      <div key={h.day} className="flex justify-between text-xs">
                        <span className="text-gray-500 font-medium">{h.day}</span>
                        <span className={h.closed ? 'text-red-500' : 'text-gray-700'}>{h.closed ? 'Closed' : `${h.open} – ${h.close}`}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800 leading-relaxed">
                <strong className="block mb-1">Information Notice</strong>
                Listing data is sourced from public records. Always verify details directly with the firm. This directory does not constitute legal advice.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
