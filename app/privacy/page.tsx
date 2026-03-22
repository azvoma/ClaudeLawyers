// app/privacy/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { privacyMetadata, breadcrumbSchema, DOMAIN } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const m = privacyMetadata();
  return { title: m.title, description: m.description, robots: m.robots, alternates: m.alternates, openGraph: m.openGraph, twitter: m.twitter };
}

const SECTIONS = [
  { title: '1. Who We Are', content: 'Employment Solicitors Near Me ("we", "us", "our") operates the website employmentsolicitorsnearme.co.uk. We are a directory service providing information about UK employment law solicitors. We are not a law firm and do not provide legal advice. For privacy-related enquiries, contact us at hello@employmentsolicitorsnearme.co.uk.' },
  { title: '2. Data We Collect', content: 'We collect: (a) contact form submissions including name, email address, and message content; (b) anonymised analytics data including pages visited, browser type, and approximate location at country/region level; (c) publicly available solicitor listing data including firm names, addresses, phone numbers and websites. We do not collect sensitive personal data from visitors.' },
  { title: '3. Legal Basis for Processing', content: 'Under UK GDPR, we process your data on the following bases: legitimate interests (to operate and improve our directory and respond to enquiries); consent (for optional analytics cookies); and legal obligation (where we are required to retain records by law).' },
  { title: '4. How We Use Your Data', content: 'We use data to respond to contact form enquiries, understand how visitors use our site, and detect and prevent misuse. We do not sell, rent, or share your personal data with third parties for marketing purposes. We never pass your details to solicitors listed in our directory without your explicit consent.' },
  { title: '5. Data Retention', content: 'Contact form messages are retained for up to 24 months or until the enquiry is fully resolved, whichever comes first, after which they are securely deleted. Anonymised analytics data may be retained indefinitely as it cannot be used to identify individuals.' },
  { title: '6. Cookies', content: 'We use strictly necessary cookies (required for the website to function, no consent required) and optional analytics cookies (anonymised usage tracking, require your consent). We do not use advertising or tracking cookies. You can disable all cookies in your browser settings.' },
  { title: '7. Your Rights', content: 'Under UK GDPR you have the following rights: access, rectification, erasure, restriction of processing, data portability, and the right to object. To exercise any of these rights, contact us at hello@employmentsolicitorsnearme.co.uk. We will respond within 30 days. You also have the right to lodge a complaint with the Information Commissioner\'s Office (ICO) at ico.org.uk.' },
  { title: '8. Third-Party Services', content: 'Our website links to external solicitor websites. We are not responsible for the privacy practices of those sites. Solicitor listing data may have been originally sourced from Google Maps / Google Business Profiles, subject to Google\'s Privacy Policy.' },
  { title: '9. Security', content: 'We implement appropriate technical and organisational measures to protect data against unauthorised access, alteration, or destruction. Our website is served over HTTPS. We conduct regular security reviews of our systems.' },
  { title: '10. Changes to This Policy', content: 'We may update this Privacy Policy from time to time. The date at the bottom of this page reflects when it was last updated. Continued use of the site after any changes constitutes your acceptance of the revised policy.' },
];

export default function PrivacyPage() {
  const bcSchema = breadcrumbSchema([
    { name: 'Home',           url: DOMAIN },
    { name: 'Privacy Policy', url: `${DOMAIN}/privacy` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcSchema) }} />

      <div className="min-h-screen bg-gray-50">
        <div className="text-white py-12" style={{ background: '#0d1a33' }}>
          <div className="max-w-4xl mx-auto px-4">
            <nav className="text-xs text-gray-500 mb-4 flex gap-2">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span><span className="text-gray-300">Privacy Policy</span>
            </nav>
            <h1 className="text-3xl font-serif font-bold mb-2">Privacy Policy</h1>
            <p className="text-gray-400 text-sm">Last updated: 1 January 2026 · Applies to employmentsolicitorsnearme.co.uk</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="mb-8 p-4 rounded-lg text-sm text-blue-800" style={{ background: '#eef2ff', border: '1px solid #c7d2fe' }}>
              This policy explains how we collect, use, and protect your personal data when you use employmentsolicitorsnearme.co.uk. We are committed to complying with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
            </div>

            <div className="space-y-8">
              {SECTIONS.map(({ title, content }) => (
                <section key={title}>
                  <h2 className="text-base font-serif font-bold mb-3" style={{ color: '#0d1a33' }}>{title}</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">{content}</p>
                </section>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-gray-200">
              <p className="text-xs text-gray-400">
                Questions about this Privacy Policy? <Link href="/contact" className="underline" style={{ color: '#1a3a6b' }}>Contact us</Link>. View our <Link href="/terms" className="underline" style={{ color: '#1a3a6b' }}>Terms of Use</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
