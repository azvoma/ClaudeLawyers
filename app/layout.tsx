// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { websiteSchema, organizationSchema, DOMAIN, SITE_NAME, TWITTER_HANDLE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN),
  title: {
    default:  'Employment Solicitors Near Me | Free UK Directory 2026',
    template: '%s | Employment Solicitors Near Me',
  },
  description: 'Find expert employment solicitors near you. Compare 330+ UK employment law firms by rating, location and specialism. Free to use — no registration required.',
  keywords:    ['employment solicitors near me','employment lawyers UK','find employment solicitor','unfair dismissal solicitor','employment tribunal lawyer','redundancy solicitor UK'],
  authors:     [{ name: SITE_NAME, url: DOMAIN }],
  creator:     SITE_NAME,
  publisher:   SITE_NAME,
  formatDetection: { telephone: true, email: true, address: true },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
  },
  openGraph: {
    type:      'website',
    locale:    'en_GB',
    url:       DOMAIN,
    siteName:  SITE_NAME,
    title:     'Employment Solicitors Near Me | Free UK Directory 2026',
    description: 'Find expert employment solicitors near you. Compare 330+ UK employment law firms by rating, location and specialism.',
    images: [{ url: `${DOMAIN}/og-image.png`, width: 1200, height: 630, alt: 'Employment Solicitors Near Me — UK Directory' }],
  },
  twitter: {
    card:        'summary_large_image',
    site:        TWITTER_HANDLE,
    title:       'Employment Solicitors Near Me | Free UK Directory 2026',
    description: 'Find expert employment solicitors near you. Compare 330+ UK employment law firms.',
    images:      [`${DOMAIN}/og-image.png`],
  },
  alternates: { canonical: DOMAIN },
  verification: {
    google:  'REPLACE_WITH_GOOGLE_VERIFICATION_CODE',
    // bing:  'REPLACE_WITH_BING_VERIFICATION_CODE',
  },
  category: 'legal directory',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schemas = [websiteSchema(), organizationSchema()];
  return (
    <html lang="en-GB">
      <head>
        {/* Global JSON-LD: WebSite (enables sitelinks searchbox) + Organization */}
        {schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
