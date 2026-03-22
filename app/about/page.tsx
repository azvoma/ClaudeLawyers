// app/about/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllSolicitors, getTopCities } from '@/lib/solicitors';
import { aboutMetadata, breadcrumbSchema, organizationSchema, DOMAIN } from '@/lib/seo';
import { ScalesIcon, GavelIcon, ShieldIcon, CheckIcon, ArrowRightIcon } from '@/components/ui/Icons';

export async function generateMetadata(): Promise<Metadata> {
  const m = aboutMetadata();
  return { title: m.title, description: m.description, keywords: m.keywords, robots: m.robots, alternates: m.alternates, openGraph: m.openGraph, twitter: m.twitter };
}

export default function AboutPage() {
  const solicitors = getAllSolicitors();
  const cities     = getTopCities(6);

  const bcSchema  = breadcrumbSchema([
    { name: 'Home',     url: DOMAIN },
    { name: 'About Us', url: `${DOMAIN}/about` },
  ]);
  const orgSchema = organizationSchema();

  const VALUES = [
    { Icon: ScalesIcon, title: 'Impartiality',  desc: 'We never accept payment to rank solicitors higher. Every listing is ordered by genuine verified client ratings.' },
    { Icon: ShieldIcon, title: 'Accuracy',      desc: 'All data sourced from verified UK public business records and regularly audited for accuracy and completeness.' },
    { Icon: GavelIcon,  title: 'Expertise',     desc: 'We focus exclusively on employment law — no generic legal directories, no filler listings from unrelated practice areas.' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="text-white py-14" style={{ background: 'linear-gradient(135deg,#0d1a33 0%,#1a3a6b 100%)' }}>
          <div className="max-w-4xl mx-auto px-4">
            <nav className="text-xs text-gray-500 mb-4 flex gap-2">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span>
              <span className="text-gray-300">About Us</span>
            </nav>
            <h1 className="text-4xl font-serif font-bold mb-4">About Employment Solicitors Near Me</h1>
            <p className="text-gray-300 text-base leading-relaxed max-w-2xl">
              We are the UK&apos;s free, independent directory dedicated to helping employees and workers find specialist employment law solicitors quickly and confidently.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Mission */}
          <section className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: '#0d1a33' }}>Our Mission</h2>
            <div className="text-gray-600 text-sm leading-relaxed space-y-4">
              <p>
                Employment Solicitors Near Me was built with a single purpose: to give every UK worker — regardless of background or income — the ability to find a qualified, specialist employment solicitor when they need one most.
              </p>
              <p>
                Facing an employment dispute, unfair dismissal, or workplace discrimination is stressful enough without having to navigate a complex legal landscape. Our directory removes that barrier by providing a free, transparent, and regularly updated listing of employment law firms across all major UK cities.
              </p>
              <p>
                We list <strong className="text-gray-800">{solicitors.length}+ verified employment solicitors</strong> across the UK, all filtered to ensure they genuinely specialise in employment law — not general practice firms handling it as an afterthought.
              </p>
            </div>
          </section>

          {/* Values */}
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-bold mb-6" style={{ color: '#0d1a33' }}>Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {VALUES.map(({ Icon, title, desc }) => (
                <div key={title} className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: '#eef2ff' }}>
                    <Icon size={20} style={{ color: '#1a3a6b' }} />
                  </div>
                  <h3 className="font-serif font-bold text-base mb-2" style={{ color: '#0d1a33' }}>{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Stats */}
          <section className="rounded-xl p-8 mb-8 text-white" style={{ background: 'linear-gradient(135deg,#0d1a33 0%,#1a3a6b 100%)' }}>
            <h2 className="text-2xl font-serif font-bold mb-6">Directory by the Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { v: `${solicitors.length}+`, l: 'Solicitors listed' },
                { v: `${cities.length}+`,     l: 'Cities covered' },
                { v: '100%',                  l: 'Free to use' },
                { v: 'UK only',               l: 'Jurisdiction' },
              ].map(s => (
                <div key={s.l}>
                  <div className="text-3xl font-serif font-bold" style={{ color: '#f0c040' }}>{s.v}</div>
                  <div className="text-sm text-gray-300 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </section>

          {/* How it works */}
          <section className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-serif font-bold mb-6" style={{ color: '#0d1a33' }}>How the Directory Works</h2>
            <div className="space-y-5">
              {[
                { n: '01', t: 'Data collection',       d: 'We source employment solicitor listings from verified UK public business records, including Google Business profiles, the SRA register, and Companies House.' },
                { n: '02', t: 'Employment law filter',  d: 'Every listing is screened against employment law keywords. We remove general practice firms that do not specialise in employment law to keep results relevant.' },
                { n: '03', t: 'Ratings and reviews',    d: 'We display genuine Google ratings and review counts alongside every listing. We never inflate or manipulate these scores.' },
                { n: '04', t: 'Regular updates',        d: 'Our dataset is refreshed regularly to reflect new firms, updated contact details, and changes in ratings and services.' },
              ].map(({ n, t, d }) => (
                <div key={n} className="flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: '#eef2ff', color: '#1a3a6b' }}>{n}</div>
                  <div>
                    <div className="font-semibold text-sm mb-1" style={{ color: '#0d1a33' }}>{t}</div>
                    <div className="text-sm text-gray-500 leading-relaxed">{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Disclaimer */}
          <section className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
            <h2 className="text-base font-serif font-bold mb-2 text-amber-900">Important Disclaimer</h2>
            <p className="text-sm text-amber-800 leading-relaxed">
              Employment Solicitors Near Me is an independent directory service. We are not a law firm and do not provide legal advice. We are not affiliated with the Solicitors Regulation Authority (SRA), the Law Society, or any individual firm listed in our directory. Always verify a solicitor&apos;s credentials independently before engaging their services. Listings are provided for informational purposes only.
            </p>
          </section>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-serif font-bold mb-3" style={{ color: '#0d1a33' }}>Ready to Find a Solicitor?</h2>
            <p className="text-gray-500 mb-6 text-sm">Browse our full directory of UK employment solicitors — free, no registration required.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/solicitors" className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-lg" style={{ background: '#1a3a6b' }}>
                Browse Directory <ArrowRightIcon size={14} className="text-white" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors" style={{ color: '#1a3a6b' }}>
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
