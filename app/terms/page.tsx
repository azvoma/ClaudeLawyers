// app/terms/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { termsMetadata, breadcrumbSchema, DOMAIN } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const m = termsMetadata();
  return { title: m.title, description: m.description, robots: m.robots, alternates: m.alternates, openGraph: m.openGraph, twitter: m.twitter };
}

const SECTIONS = [
  { title: '1. Acceptance of Terms', content: 'By accessing and using employmentsolicitorsnearme.co.uk ("the Site"), you accept and agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree to these terms, please do not use the Site.' },
  { title: '2. Nature of the Service', content: 'Employment Solicitors Near Me is an independent online directory service. We are not a law firm, do not provide legal advice, do not act as a referral agency, and are not regulated by the Solicitors Regulation Authority (SRA) or any other legal regulatory body. Nothing on this Site constitutes legal advice. Always seek advice from a qualified solicitor regarding your specific circumstances.' },
  { title: '3. Accuracy of Information', content: 'While we take reasonable steps to ensure listing data is accurate and up to date, we make no warranties or representations about the accuracy, completeness, or fitness for purpose of any information on the Site. Solicitor contact details, ratings, opening hours, and service descriptions may change. Always verify information directly with the solicitor before engaging their services.' },
  { title: '4. No Endorsement', content: 'The inclusion of a solicitor firm in our directory does not constitute an endorsement, recommendation, or quality guarantee. We do not vet, validate, or certify the quality of any solicitor listed. Users are responsible for conducting their own due diligence, including verifying SRA registration at sra.org.uk.' },
  { title: '5. Limitation of Liability', content: 'To the maximum extent permitted by law, Employment Solicitors Near Me shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from: your use of, or inability to use, the Site; any reliance on information contained in solicitor listings; any errors or omissions in listing data; or the quality, conduct, or advice of any solicitor found through our directory.' },
  { title: '6. Intellectual Property', content: 'All content on this Site — including text, design, logos, and code — is the property of Employment Solicitors Near Me or its licensors and is protected by UK copyright law. You may not reproduce, distribute, or create derivative works from Site content without our prior written consent. You may link to individual solicitor listings for non-commercial purposes.' },
  { title: '7. User Conduct', content: 'You agree not to: use the Site for any unlawful purpose; scrape, crawl, or systematically download directory data without permission; submit false or misleading information via our contact form; attempt to interfere with or disrupt Site functionality; or use the Site to send unsolicited communications to listed solicitors.' },
  { title: '8. Third-Party Links', content: 'Our solicitor listings link to external websites. We have no control over the content, privacy practices, or availability of these sites and accept no responsibility for them. Links do not imply endorsement.' },
  { title: '9. Solicitors: Listing Corrections & Removals', content: 'If you are a solicitor or representative of a listed firm and wish to correct or remove your listing, contact us at hello@employmentsolicitorsnearme.co.uk. We will action verified requests within 5 business days. Please include evidence of your authority to act on behalf of the firm.' },
  { title: '10. Governing Law', content: 'These Terms of Use are governed by the laws of England and Wales. Any disputes arising from use of the Site shall be subject to the exclusive jurisdiction of the courts of England and Wales.' },
  { title: '11. Changes to Terms', content: 'We reserve the right to update these Terms at any time. Updated terms will be posted on this page with a revised date. Your continued use of the Site after any update constitutes your acceptance of the revised terms.' },
];

export default function TermsPage() {
  const bcSchema = breadcrumbSchema([
    { name: 'Home',         url: DOMAIN },
    { name: 'Terms of Use', url: `${DOMAIN}/terms` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcSchema) }} />

      <div className="min-h-screen bg-gray-50">
        <div className="text-white py-12" style={{ background: '#0d1a33' }}>
          <div className="max-w-4xl mx-auto px-4">
            <nav className="text-xs text-gray-500 mb-4 flex gap-2">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span><span className="text-gray-300">Terms of Use</span>
            </nav>
            <h1 className="text-3xl font-serif font-bold mb-2">Terms of Use</h1>
            <p className="text-gray-400 text-sm">Last updated: 1 January 2026 · Applies to employmentsolicitorsnearme.co.uk</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="mb-8 p-4 rounded-lg text-sm" style={{ background: '#eef2ff', border: '1px solid #c7d2fe', color: '#1e3a8a' }}>
              Please read these Terms of Use carefully before using our site. By using Employment Solicitors Near Me, you agree to these terms in full.
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
                Questions about these Terms? <Link href="/contact" className="underline" style={{ color: '#1a3a6b' }}>Contact us</Link> or view our <Link href="/privacy" className="underline" style={{ color: '#1a3a6b' }}>Privacy Policy</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
