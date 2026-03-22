// lib/seo.ts
// Complete SEO system: unique metadata, Yoast-style scoring, all JSON-LD schemas
import type { Solicitor } from './types';

// ── Constants ──────────────────────────────────────────────────────────────
export const DOMAIN = 'https://employmentsolicitorsnearme.co.uk';
export const SITE_NAME = 'Employment Solicitors Near Me';
export const SITE_LOCALE = 'en_GB';
export const PRIMARY_KW = 'employment solicitors';
export const TWITTER_HANDLE = '@ESolicitorsUK';

// ── Title templates (unique per page type) ─────────────────────────────────
// Max 60 chars for Google display, 70 absolute max
const TITLE_TEMPLATES = {
  home:      'Employment Solicitors Near Me | Free UK Directory 2026',
  directory: 'Find Employment Solicitors UK | 330+ Verified Law Firms',
  cityDir:   (city: string, n: number) => `${n} Employment Solicitors in ${city} | Verified & Rated`,
  listing:   (name: string, city: string, rating: number | null) =>
               rating
                 ? `${name} | ${city} Employment Solicitor | ${rating}★`
                 : `${name} | Employment Solicitors ${city}`,
  search:    'Search Employment Solicitors UK | Find Local Lawyers',
  about:     'About Us | Employment Solicitors Near Me Directory',
  contact:   'Contact Us | Employment Solicitors Near Me',
  privacy:   'Privacy Policy | Employment Solicitors Near Me',
  terms:     'Terms of Use | Employment Solicitors Near Me',
};

// ── Description templates (unique per page type, 150-160 chars target) ────
const DESC_TEMPLATES = {
  home: 'Find expert employment solicitors near you. Compare 330+ UK employment law firms by rating, location and specialism. Free to use — no registration required.',
  directory: 'Browse our directory of 330+ verified UK employment solicitors. Filter by city, sort by Google rating, and find expert employment lawyers near you today.',
  cityDir: (city: string, n: number) =>
    `Find the best employment solicitors in ${city}. Compare ${n} local employment law firms — verified ratings, contact details and specialisms. Free to search.`,
  listing: (name: string, city: string, services: string) =>
    `${name} — employment solicitors in ${city} specialising in ${services}. View verified ratings, contact details, opening hours and services. Free directory listing.`,
  search:  'Search our UK employment solicitor directory by firm name, city or service. Find local employment lawyers for unfair dismissal, redundancy and tribunal claims.',
  about:   'Learn about Employment Solicitors Near Me — the UK\'s free, independent directory of 330+ verified employment law firms. How we source, verify and display listings.',
  contact: 'Contact the Employment Solicitors Near Me team. Report an incorrect listing, suggest a firm to add, or make a general enquiry about our UK employment law directory.',
  privacy: 'Privacy Policy for Employment Solicitors Near Me. How we collect, use and protect your data in compliance with UK GDPR and the Data Protection Act 2018.',
  terms:   'Terms of Use for Employment Solicitors Near Me. Conditions governing use of our free UK employment solicitor directory.',
};

// ── Metadata generators ────────────────────────────────────────────────────

export function homeMetadata() {
  return buildMeta({
    title:       TITLE_TEMPLATES.home,
    description: DESC_TEMPLATES.home,
    canonical:   DOMAIN,
    keywords:    ['employment solicitors near me','employment lawyers UK','unfair dismissal solicitors',
                  'employment tribunal representation','redundancy solicitors','workplace discrimination lawyers',
                  'employment law firms UK','find employment solicitor'],
    ogType:      'website',
  });
}

export function directoryMetadata() {
  return buildMeta({
    title:       TITLE_TEMPLATES.directory,
    description: DESC_TEMPLATES.directory,
    canonical:   `${DOMAIN}/solicitors`,
    keywords:    ['employment solicitors directory UK','browse employment lawyers','employment law firms',
                  'compare employment solicitors','employment solicitor ratings'],
    ogType:      'website',
  });
}

export function cityMetadata(city: string, count: number) {
  const slug = city.toLowerCase().replace(/\s+/g, '-');
  return buildMeta({
    title:       TITLE_TEMPLATES.cityDir(city, count),
    description: DESC_TEMPLATES.cityDir(city, count),
    canonical:   `${DOMAIN}/solicitors?city=${encodeURIComponent(city)}`,
    keywords:    [`employment solicitors ${city}`,`employment lawyers ${city}`,
                  `unfair dismissal solicitors ${city}`,`employment tribunal ${city}`,
                  `redundancy solicitors ${city}`,`workplace lawyers ${city}`],
    ogType:      'website',
  });
}

export function listingMetadata(s: Solicitor) {
  const city     = s.city || 'UK';
  const services = buildServiceString(s);
  const title    = TITLE_TEMPLATES.listing(s.name, city, s.rating).slice(0, 70);
  const desc     = DESC_TEMPLATES.listing(s.name, city, services).slice(0, 160);
  return buildMeta({
    title,
    description: desc,
    canonical:   `${DOMAIN}/solicitors/${s.slug}`,
    keywords:    [`${s.name} employment solicitor`,`employment solicitors ${city}`,
                  `employment lawyers ${city}`,`${s.name} reviews`,
                  ...(s.postal_code ? [`employment solicitor ${s.postal_code}`] : [])],
    ogType:      'website',
    // Structured OG extras
    ogExtras: {
      'og:locality':    city,
      'og:country-name':'United Kingdom',
    },
  });
}

export function searchMetadata() {
  return buildMeta({ title: TITLE_TEMPLATES.search, description: DESC_TEMPLATES.search, canonical: `${DOMAIN}/search`, keywords: [], ogType: 'website', noIndex: false });
}
export function aboutMetadata() {
  return buildMeta({ title: TITLE_TEMPLATES.about, description: DESC_TEMPLATES.about, canonical: `${DOMAIN}/about`, keywords: [], ogType: 'website' });
}
export function contactMetadata() {
  return buildMeta({ title: TITLE_TEMPLATES.contact, description: DESC_TEMPLATES.contact, canonical: `${DOMAIN}/contact`, keywords: [], ogType: 'website' });
}
export function privacyMetadata() {
  return buildMeta({ title: TITLE_TEMPLATES.privacy, description: DESC_TEMPLATES.privacy, canonical: `${DOMAIN}/privacy`, keywords: [], ogType: 'website', noIndex: true });
}
export function termsMetadata() {
  return buildMeta({ title: TITLE_TEMPLATES.terms, description: DESC_TEMPLATES.terms, canonical: `${DOMAIN}/terms`, keywords: [], ogType: 'website', noIndex: true });
}

// ── Internal builder ───────────────────────────────────────────────────────
interface MetaParams {
  title: string;
  description: string;
  canonical: string;
  keywords: string[];
  ogType: string;
  noIndex?: boolean;
  ogExtras?: Record<string, string>;
}

function buildMeta(p: MetaParams) {
  return {
    title:       p.title,
    description: p.description,
    canonical:   p.canonical,
    keywords:    p.keywords,
    robots: {
      index:     !p.noIndex,
      follow:    true,
      googleBot: { index: !p.noIndex, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
    },
    alternates: { canonical: p.canonical },
    openGraph: {
      title:       p.title,
      description: p.description,
      url:         p.canonical,
      siteName:    SITE_NAME,
      locale:      SITE_LOCALE,
      type:        p.ogType as 'website',
      ...(p.ogExtras || {}),
    },
    twitter: {
      card:        'summary_large_image' as const,
      title:       p.title,
      description: p.description,
      site:        TWITTER_HANDLE,
    },
  };
}

// ── Service string builder ─────────────────────────────────────────────────
export function buildServiceString(s: Solicitor): string {
  const defaults = 'unfair dismissal, redundancy, and employment tribunal representation';
  if (!s.subtypes) return defaults;
  const parts = s.subtypes.split(',').map(t => t.trim()).filter(Boolean).slice(0, 3);
  return parts.length ? parts.join(', ').toLowerCase() : defaults;
}

// ── JSON-LD Schema generators ──────────────────────────────────────────────

/** LegalService + LocalBusiness schema for individual solicitor pages */
export function localBusinessSchema(s: Solicitor) {
  const schema: Record<string, unknown> = {
    '@context':   'https://schema.org',
    '@type':      ['LegalService', 'LocalBusiness'],
    '@id':        `${DOMAIN}/solicitors/${s.slug}#business`,
    name:         s.name,
    url:          s.website || `${DOMAIN}/solicitors/${s.slug}`,
    description:  s.description || `${s.name} provides specialist employment law services including unfair dismissal, redundancy advice, settlement agreements and employment tribunal representation${s.city ? ' in ' + s.city : ''}.`,
    telephone:    s.phone   || undefined,
    email:        s.email_1 || undefined,
    priceRange:   '££',
    currenciesAccepted: 'GBP',
    paymentAccepted:    'Cash, Credit Card, Bank Transfer',
    address: {
      '@type':           'PostalAddress',
      streetAddress:     s.street       || undefined,
      addressLocality:   s.city         || undefined,
      addressRegion:     s.county       || undefined,
      postalCode:        s.postal_code  || undefined,
      addressCountry:    'GB',
    },
    geo: (s.latitude && s.longitude) ? {
      '@type':    'GeoCoordinates',
      latitude:   s.latitude,
      longitude:  s.longitude,
    } : undefined,
    aggregateRating: (s.rating && s.reviews) ? {
      '@type':       'AggregateRating',
      ratingValue:   s.rating,
      reviewCount:   s.reviews,
      bestRating:    5,
      worstRating:   1,
    } : undefined,
    openingHoursSpecification: parseHoursToSchema(s.working_hours_csv_compatible),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name:    'Employment Law Services',
      itemListElement: [
        'Unfair Dismissal Claims',
        'Employment Tribunal Representation',
        'Redundancy Advice & Claims',
        'Settlement Agreement Advice',
        'Discrimination Claims',
        'Whistleblowing Protection',
        'TUPE Transfer Advice',
        'Workplace Grievance Handling',
      ].map(name => ({
        '@type':        'Offer',
        itemOffered: { '@type': 'Service', name },
      })),
    },
    areaServed: s.city ? { '@type': 'City', name: s.city } : { '@type': 'Country', name: 'United Kingdom' },
    sameAs: [s.facebook, s.twitter, s.linkedin, s.website].filter(Boolean),
    image: s.logo || undefined,
  };
  return stripUndefined(schema);
}

/** BreadcrumbList schema */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type':    'ListItem',
      position:   i + 1,
      name:       item.name,
      item:       item.url,
    })),
  };
}

/** WebSite schema for root layout (enables sitelinks searchbox) */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type':    'WebSite',
    '@id':      `${DOMAIN}/#website`,
    name:       SITE_NAME,
    url:        DOMAIN,
    description: 'The UK\'s leading free directory of employment law solicitors. Find, compare and contact verified employment lawyers across the UK.',
    inLanguage:  'en-GB',
    potentialAction: {
      '@type':  'SearchAction',
      target: {
        '@type':      'EntryPoint',
        urlTemplate:  `${DOMAIN}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/** Organization schema for root layout */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type':    'Organization',
    '@id':      `${DOMAIN}/#organization`,
    name:       SITE_NAME,
    url:        DOMAIN,
    logo: {
      '@type': 'ImageObject',
      url:     `${DOMAIN}/logo.png`,
      width:   180,
      height:  60,
    },
    sameAs: [],
    contactPoint: {
      '@type':            'ContactPoint',
      contactType:        'customer service',
      email:              'hello@employmentsolicitorsnearme.co.uk',
      availableLanguage:  'English',
    },
  };
}

/** ItemList schema for directory/city listing pages */
export function itemListSchema(solicitors: Solicitor[], listName: string, listUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type':    'ItemList',
    name:       listName,
    url:        listUrl,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: solicitors.length,
    itemListElement: solicitors.slice(0, 20).map((s, i) => ({
      '@type':    'ListItem',
      position:   i + 1,
      name:       s.name,
      url:        `${DOMAIN}/solicitors/${s.slug}`,
      description: s.description || `${s.name} — employment solicitors${s.city ? ' in ' + s.city : ''}.`,
    })),
  };
}

/** FAQ schema — used on homepage for common employment law questions */
export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type':    'FAQPage',
    mainEntity: [
      {
        '@type':          'Question',
        name:             'How do I find an employment solicitor near me?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:    'Use our free directory to search by city or postcode. Every listing includes verified contact details, Google ratings, and specialisms so you can compare and contact the right solicitor quickly.',
        },
      },
      {
        '@type':          'Question',
        name:             'What does an employment solicitor do?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:    'Employment solicitors advise employees and employers on workplace legal matters including unfair dismissal, redundancy, settlement agreements, discrimination claims, employment tribunal representation, and TUPE transfers.',
        },
      },
      {
        '@type':          'Question',
        name:             'How much does an employment solicitor cost in the UK?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:    'Costs vary by firm and case complexity. Many employment solicitors offer a free initial consultation. Some work on a no-win no-fee basis for tribunal claims. Always check fee arrangements before engaging a solicitor.',
        },
      },
      {
        '@type':          'Question',
        name:             'Do I need a solicitor for an employment tribunal?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:    'You are not legally required to have a solicitor at an employment tribunal, but professional legal representation significantly improves your chances of a successful outcome. Many solicitors offer tribunal representation on a fixed-fee or no-win no-fee basis.',
        },
      },
    ],
  };
}

// ── Yoast-style SEO Scorer ─────────────────────────────────────────────────

export interface YoastCheck {
  id:       string;
  label:    string;
  status:   'good' | 'improve' | 'bad';
  message:  string;
}

export interface YoastScore {
  score:    number;        // 0-100
  rating:   'excellent' | 'good' | 'needs-improvement' | 'poor';
  checks:   YoastCheck[];
  color:    string;
}

export function yoastScore(params: {
  title:       string;
  description: string;
  slug:        string;
  content:     string;  // First 300 words of page content
  focusKw:     string;
  h1:          string;
  internalLinks: number;
  imageAlts:   string[];
}): YoastScore {
  const { title, description, slug, content, focusKw, h1, internalLinks, imageAlts } = params;
  const kw = focusKw.toLowerCase();
  const checks: YoastCheck[] = [];
  let points = 0;

  // 1. Focus keyword in title (0-15 pts)
  if (title.toLowerCase().includes(kw)) {
    checks.push({ id: 'kw-title', label: 'Keyword in SEO title', status: 'good', message: `"${focusKw}" found in page title.` });
    points += 15;
  } else {
    checks.push({ id: 'kw-title', label: 'Keyword in SEO title', status: 'bad', message: `Add "${focusKw}" to the page title.` });
  }

  // 2. Title length (0-10 pts)
  if (title.length >= 50 && title.length <= 60) {
    checks.push({ id: 'title-len', label: 'Title length', status: 'good', message: `Title is ${title.length} chars — ideal (50–60).` });
    points += 10;
  } else if (title.length > 60 && title.length <= 70) {
    checks.push({ id: 'title-len', label: 'Title length', status: 'improve', message: `Title is ${title.length} chars — slightly long (aim for 50–60).` });
    points += 6;
  } else {
    checks.push({ id: 'title-len', label: 'Title length', status: 'bad', message: `Title is ${title.length} chars — ${title.length < 50 ? 'too short' : 'too long'} (aim 50–60).` });
    points += 2;
  }

  // 3. Keyword in meta description (0-10 pts)
  if (description.toLowerCase().includes(kw)) {
    checks.push({ id: 'kw-desc', label: 'Keyword in meta description', status: 'good', message: `"${focusKw}" found in meta description.` });
    points += 10;
  } else {
    checks.push({ id: 'kw-desc', label: 'Keyword in meta description', status: 'bad', message: `Add "${focusKw}" to the meta description.` });
  }

  // 4. Meta description length (0-10 pts)
  if (description.length >= 140 && description.length <= 160) {
    checks.push({ id: 'desc-len', label: 'Meta description length', status: 'good', message: `Description is ${description.length} chars — ideal (140–160).` });
    points += 10;
  } else if (description.length > 160) {
    checks.push({ id: 'desc-len', label: 'Meta description length', status: 'improve', message: `Description is ${description.length} chars — too long, Google will truncate.` });
    points += 5;
  } else {
    checks.push({ id: 'desc-len', label: 'Meta description length', status: 'bad', message: `Description is ${description.length} chars — too short (aim 140–160).` });
    points += 2;
  }

  // 5. Keyword in slug (0-10 pts)
  const slugKw = kw.replace(/\s+/g, '-');
  if (slug.includes(slugKw) || slug.includes(kw.replace(/\s+/g, '-'))) {
    checks.push({ id: 'kw-slug', label: 'Keyword in URL slug', status: 'good', message: `"${focusKw}" found in the URL slug.` });
    points += 10;
  } else if (slug.split('-').some(w => kw.split(' ').includes(w))) {
    checks.push({ id: 'kw-slug', label: 'Keyword in URL slug', status: 'improve', message: 'Partial keyword match in slug. Consider including full keyphrase.' });
    points += 5;
  } else {
    checks.push({ id: 'kw-slug', label: 'Keyword in URL slug', status: 'bad', message: `Add "${focusKw.replace(/\s+/g, '-')}" to the URL slug.` });
  }

  // 6. Keyword in H1 (0-10 pts)
  if (h1.toLowerCase().includes(kw)) {
    checks.push({ id: 'kw-h1', label: 'Keyword in H1 heading', status: 'good', message: `"${focusKw}" found in the H1 heading.` });
    points += 10;
  } else {
    checks.push({ id: 'kw-h1', label: 'Keyword in H1 heading', status: 'bad', message: `Add "${focusKw}" to the H1 heading.` });
  }

  // 7. Keyword density in content (0-10 pts)
  const words    = content.toLowerCase().split(/\s+/).filter(Boolean);
  const kwWords  = kw.split(' ');
  let kwMatches  = 0;
  for (let i = 0; i <= words.length - kwWords.length; i++) {
    if (kwWords.every((w, j) => words[i + j] === w)) kwMatches++;
  }
  const density  = words.length > 0 ? (kwMatches / words.length) * 100 : 0;
  if (density >= 0.5 && density <= 2.5) {
    checks.push({ id: 'kw-density', label: 'Keyword density', status: 'good', message: `Density is ${density.toFixed(1)}% — ideal (0.5–2.5%).` });
    points += 10;
  } else if (density > 2.5) {
    checks.push({ id: 'kw-density', label: 'Keyword density', status: 'improve', message: `Density is ${density.toFixed(1)}% — too high, risks keyword stuffing.` });
    points += 4;
  } else {
    checks.push({ id: 'kw-density', label: 'Keyword density', status: density > 0 ? 'improve' : 'bad', message: `Density is ${density.toFixed(1)}% — use "${focusKw}" more naturally in content.` });
    points += density > 0 ? 4 : 0;
  }

  // 8. Keyword in first 100 words (0-5 pts)
  const first100 = words.slice(0, 100).join(' ');
  if (first100.includes(kw)) {
    checks.push({ id: 'kw-first', label: 'Keyword in opening paragraph', status: 'good', message: `"${focusKw}" appears in the first 100 words.` });
    points += 5;
  } else {
    checks.push({ id: 'kw-first', label: 'Keyword in opening paragraph', status: 'improve', message: `Include "${focusKw}" in the first 100 words of content.` });
  }

  // 9. Internal links (0-5 pts)
  if (internalLinks >= 3) {
    checks.push({ id: 'internal-links', label: 'Internal links', status: 'good', message: `${internalLinks} internal links found — good for crawlability.` });
    points += 5;
  } else if (internalLinks >= 1) {
    checks.push({ id: 'internal-links', label: 'Internal links', status: 'improve', message: `Only ${internalLinks} internal link(s). Aim for at least 3.` });
    points += 2;
  } else {
    checks.push({ id: 'internal-links', label: 'Internal links', status: 'bad', message: 'No internal links found. Add links to related pages.' });
  }

  // 10. Image alt text (0-5 pts)
  const altsWithKw = imageAlts.filter(alt => alt.toLowerCase().includes(kw)).length;
  if (imageAlts.length === 0) {
    checks.push({ id: 'img-alt', label: 'Image alt text', status: 'improve', message: 'No images found. Add images with descriptive alt text.' });
    points += 2;
  } else if (altsWithKw > 0) {
    checks.push({ id: 'img-alt', label: 'Image alt text', status: 'good', message: `${altsWithKw}/${imageAlts.length} images have keyword in alt text.` });
    points += 5;
  } else {
    checks.push({ id: 'img-alt', label: 'Image alt text', status: 'improve', message: `${imageAlts.length} image(s) found but none include the focus keyword in alt text.` });
    points += 2;
  }

  const rating = points >= 85 ? 'excellent' : points >= 65 ? 'good' : points >= 40 ? 'needs-improvement' : 'poor';
  const color  = rating === 'excellent' ? '#22c55e' : rating === 'good' ? '#84cc16' : rating === 'needs-improvement' ? '#f59e0b' : '#ef4444';

  return { score: points, rating, checks, color };
}

// ── Sitemap entry builder ──────────────────────────────────────────────────
export interface SitemapEntry {
  url:             string;
  lastmod:         string;
  changefreq:      'always'|'hourly'|'daily'|'weekly'|'monthly'|'yearly'|'never';
  priority:        number;
}

export function buildSitemapEntries(solicitors: Solicitor[]): SitemapEntry[] {
  const today = new Date().toISOString().split('T')[0];

  const staticPages: SitemapEntry[] = [
    { url: DOMAIN,                    lastmod: today, changefreq: 'weekly',  priority: 1.0 },
    { url: `${DOMAIN}/solicitors`,    lastmod: today, changefreq: 'daily',   priority: 0.9 },
    { url: `${DOMAIN}/search`,        lastmod: today, changefreq: 'weekly',  priority: 0.7 },
    { url: `${DOMAIN}/about`,         lastmod: today, changefreq: 'monthly', priority: 0.5 },
    { url: `${DOMAIN}/contact`,       lastmod: today, changefreq: 'monthly', priority: 0.5 },
    { url: `${DOMAIN}/privacy`,       lastmod: today, changefreq: 'yearly',  priority: 0.3 },
    { url: `${DOMAIN}/terms`,         lastmod: today, changefreq: 'yearly',  priority: 0.3 },
  ];

  // Unique city pages — high priority for local SEO
  const cities = [...new Set(solicitors.map(s => s.city).filter(Boolean) as string[])];
  const cityPages: SitemapEntry[] = cities.map(city => ({
    url:        `${DOMAIN}/solicitors?city=${encodeURIComponent(city)}`,
    lastmod:    today,
    changefreq: 'weekly' as const,
    priority:   0.85,
  }));

  // Individual listing pages — moderate priority, unique content
  const listingPages: SitemapEntry[] = solicitors.map(s => ({
    url:        `${DOMAIN}/solicitors/${s.slug}`,
    lastmod:    today,
    changefreq: 'monthly' as const,
    priority:   s.rating && s.rating >= 4.5 ? 0.8 : 0.7,
  }));

  return [...staticPages, ...cityPages, ...listingPages];
}

/** Generate the full XML sitemap string */
export function generateSitemapXml(entries: SitemapEntry[]): string {
  const urls = entries.map(e => `  <url>
    <loc>${e.url}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority.toFixed(1)}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls}
</urlset>`;
}

// ── Helpers ────────────────────────────────────────────────────────────────
function stripUndefined(obj: Record<string, unknown>): Record<string, unknown> {
  return JSON.parse(JSON.stringify(obj));
}

function parseHoursToSchema(csv: string | null): unknown[] | undefined {
  if (!csv) return undefined;
  const days: Record<string, string> = {
    Monday: 'Mo', Tuesday: 'Tu', Wednesday: 'We',
    Thursday: 'Th', Friday: 'Fr', Saturday: 'Sa', Sunday: 'Su',
  };
  return csv.split('|').map(entry => {
    const parts = entry.split(',');
    if (parts.length < 3) return null;
    const [day, open, close] = parts;
    const dayCode = days[day] || day.slice(0, 2);
    return {
      '@type':     'OpeningHoursSpecification',
      dayOfWeek:   `https://schema.org/${day}`,
      opens:       open,
      closes:      close,
    };
  }).filter(Boolean);
}
