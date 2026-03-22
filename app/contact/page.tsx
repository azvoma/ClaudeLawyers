// app/contact/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { contactMetadata, breadcrumbSchema, DOMAIN } from '@/lib/seo';
import { EmailIcon, MapPinIcon, ScalesIcon } from '@/components/ui/Icons';

export async function generateMetadata(): Promise<Metadata> {
  const m = contactMetadata();
  return { title: m.title, description: m.description, keywords: m.keywords, robots: m.robots, alternates: m.alternates, openGraph: m.openGraph, twitter: m.twitter };
}

const CONTACT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${DOMAIN}/contact#page`,
  name: 'Contact Employment Solicitors Near Me',
  url: `${DOMAIN}/contact`,
  description: 'Contact the Employment Solicitors Near Me team to report an incorrect listing, suggest an addition, or make a general enquiry.',
  mainEntity: {
    '@type': 'Organization',
    name: 'Employment Solicitors Near Me',
    url: DOMAIN,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'hello@employmentsolicitorsnearme.co.uk',
      availableLanguage: 'English',
      areaServed: 'GB',
    },
  },
};

const CONTACT_REASONS = ['Report an incorrect listing','Suggest a solicitor to add','Request a listing removal','General enquiry','Partnership / advertising','Press & media'];

export default function ContactPage() {
  const bcSchema = breadcrumbSchema([
    { name: 'Home',       url: DOMAIN },
    { name: 'Contact Us', url: `${DOMAIN}/contact` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(CONTACT_SCHEMA) }} />

      <div className="min-h-screen bg-gray-50">
        <div className="text-white py-14" style={{ background: 'linear-gradient(135deg,#0d1a33 0%,#1a3a6b 100%)' }}>
          <div className="max-w-5xl mx-auto px-4">
            <nav className="text-xs text-gray-500 mb-4 flex gap-2">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span><span className="text-gray-300">Contact Us</span>
            </nav>
            <h1 className="text-4xl font-serif font-bold mb-4">Contact Us</h1>
            <p className="text-gray-300 text-base max-w-xl">Have a question about a listing, want to suggest an addition, or need to report an error? We&apos;d love to hear from you.</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Form */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h2 className="text-xl font-serif font-bold mb-6" style={{ color: '#0d1a33' }}>Send a Message</h2>
                <form action="/api/contact" method="POST" className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">First Name <span className="text-red-500">*</span></label>
                      <input type="text" name="firstName" required className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Jane" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Last Name <span className="text-red-500">*</span></label>
                      <input type="text" name="lastName" required className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Smith" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Email Address <span className="text-red-500">*</span></label>
                    <input type="email" name="email" required className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="jane@example.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Reason for Contact <span className="text-red-500">*</span></label>
                    <select name="reason" required className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700">
                      <option value="">Select a reason...</option>
                      {CONTACT_REASONS.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Message <span className="text-red-500">*</span></label>
                    <textarea name="message" required rows={5} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y" placeholder="Please describe your enquiry..." />
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" name="consent" id="consent" required className="mt-1" />
                    <label htmlFor="consent" className="text-xs text-gray-500 leading-relaxed">
                      I consent to Employment Solicitors Near Me storing my contact details to respond to this enquiry. See our <Link href="/privacy" className="underline" style={{ color: '#1a3a6b' }}>Privacy Policy</Link>.
                    </label>
                  </div>
                  <button type="submit" className="w-full text-white font-semibold py-3 rounded-lg text-sm" style={{ background: '#1a3a6b' }}>Send Message</button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-serif font-bold text-base mb-4" style={{ color: '#0d1a33' }}>Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <EmailIcon size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#1a3a6b' }} />
                    <div>
                      <div className="font-medium text-gray-800 text-xs mb-0.5">Email</div>
                      <a href="mailto:hello@employmentsolicitorsnearme.co.uk" className="hover:underline text-xs" style={{ color: '#1a3a6b' }}>
                        hello@employmentsolicitorsnearme.co.uk
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <MapPinIcon size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#1a3a6b' }} />
                    <div>
                      <div className="font-medium text-gray-800 text-xs mb-0.5">Registered in</div>
                      <div className="text-xs">England &amp; Wales</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-serif font-bold text-sm mb-3" style={{ color: '#0d1a33' }}>Response Times</h3>
                <div className="text-xs text-gray-500 space-y-2">
                  <div className="flex justify-between"><span>General enquiries</span><span className="font-medium text-gray-700">2–3 days</span></div>
                  <div className="flex justify-between"><span>Listing corrections</span><span className="font-medium text-gray-700">1–2 days</span></div>
                  <div className="flex justify-between"><span>Removal requests</span><span className="font-medium text-gray-700">3–5 days</span></div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <h3 className="font-serif font-bold text-sm mb-2 text-amber-900">Not a Law Firm</h3>
                <p className="text-xs text-amber-800 leading-relaxed">
                  We are a directory service and cannot provide legal advice. If you need legal help urgently, <Link href="/solicitors" className="underline">browse our directory</Link> to find a qualified employment solicitor.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <ScalesIcon size={16} style={{ color: '#1a3a6b' }} />
                  <h3 className="font-serif font-bold text-sm" style={{ color: '#0d1a33' }}>Are you a solicitor?</h3>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  If your firm isn&apos;t listed or you&apos;d like to update your details, contact us and we&apos;ll review your listing request.
                </p>
                <Link href="/solicitors" className="block text-center text-xs font-semibold text-white py-2 rounded-lg" style={{ background: '#1a3a6b' }}>
                  Browse the Directory
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
