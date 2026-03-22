/**
 * ============================================================
 * REUSABLE DIRECTORY TEMPLATE
 * ============================================================
 * This file is the single configuration layer that makes this
 * directory cloneable for any niche industry.
 *
 * TO CLONE FOR A NEW NICHE:
 *   1. Update DIRECTORY_CONFIG below
 *   2. Replace data/solicitors.json with your new dataset
 *   3. Update tailwind.config.ts colours if desired
 *   4. Run: next build
 *
 * Examples of niches this pattern supports:
 *   - Accountants Near Me
 *   - Dentists Near Me
 *   - Financial Advisors Near Me
 *   - Estate Agents Near Me
 *   - Plumbers Near Me
 * ============================================================
 */

export interface DirectoryConfig {
  // Brand
  siteName: string;
  domain: string;
  tagline: string;
  description: string;

  // SEO keywords
  primaryKeyword: string;
  secondaryKeywords: string[];

  // Content
  professionalTitle: string; // "Employment Solicitor" / "Accountant" / "Dentist"
  professionalTitlePlural: string;
  serviceCategory: string; // "employment law" / "accounting" / "dental care"

  // Schema.org type
  schemaType: string[]; // ["LegalService", "LocalBusiness"] / ["MedicalBusiness"] etc.

  // Services offered (shown on homepage + listing)
  services: Array<{
    icon: string;
    title: string;
    description: string;
  }>;

  // Filter keywords for data cleansing
  relevanceKeywords: string[];

  // Featured cities for nav / footer
  featuredCities: string[];

  // Contact/trust messaging
  trustPoints: Array<{ title: string; desc: string }>;

  // Disclaimer text
  disclaimer: string;
}

// ============================================================
// EMPLOYMENT SOLICITORS CONFIGURATION
// ============================================================
export const DIRECTORY_CONFIG: DirectoryConfig = {
  siteName: 'Employment Solicitors Near Me',
  domain: 'https://employmentsolicitorsnearme.co.uk',
  tagline: 'Find Expert Employment Solicitors Near You',
  description:
    'Find expert employment solicitors near you. Compare ratings, services, and contact details for the best employment lawyers across the UK.',

  primaryKeyword: 'Employment Solicitors',
  secondaryKeywords: [
    'employment lawyers UK',
    'unfair dismissal solicitors',
    'employment tribunal lawyers',
    'redundancy solicitors',
    'workplace discrimination lawyers',
  ],

  professionalTitle: 'Employment Solicitor',
  professionalTitlePlural: 'Employment Solicitors',
  serviceCategory: 'employment law',

  schemaType: ['LegalService', 'LocalBusiness'],

  services: [
    {
      icon: '⚖️',
      title: 'Unfair Dismissal',
      description: 'Challenge wrongful termination and claim compensation with expert legal representation.',
    },
    {
      icon: '📋',
      title: 'Employment Tribunals',
      description: 'Professional tribunal representation to fight for your workplace rights.',
    },
    {
      icon: '💼',
      title: 'Redundancy Claims',
      description: 'Ensure fair redundancy process and correct statutory or enhanced pay.',
    },
    {
      icon: '🤝',
      title: 'Settlement Agreements',
      description: 'Expert negotiation of settlement terms and independent legal advice.',
    },
    {
      icon: '🛡️',
      title: 'Discrimination Claims',
      description: 'Protect your rights against workplace discrimination of all protected characteristics.',
    },
    {
      icon: '📢',
      title: 'Whistleblowing',
      description: 'Defend whistleblower rights and challenge retaliation from employers.',
    },
  ],

  relevanceKeywords: [
    'employment',
    'labor',
    'labour',
    'workplace',
    'tribunal',
    'redundancy',
    'unfair dismissal',
  ],

  featuredCities: [
    'London',
    'Manchester',
    'Birmingham',
    'Leeds',
    'Bristol',
    'Edinburgh',
    'Sheffield',
    'Nottingham',
  ],

  trustPoints: [
    {
      title: 'Verified Listings',
      desc: 'All solicitors are verified UK-registered law firms sourced from public records.',
    },
    {
      title: 'Real Client Reviews',
      desc: 'Ratings and reviews sourced from Google to help you make an informed choice.',
    },
    {
      title: 'Employment Law Specialists',
      desc: 'Every listing is filtered to only include firms specialising in employment law.',
    },
    {
      title: 'Free to Use',
      desc: 'Our directory is completely free for job seekers and employees seeking legal help.',
    },
  ],

  disclaimer:
    'Listing data is sourced from public records. Always verify details directly with the firm. This directory does not constitute legal advice.',
};

// ============================================================
// EXAMPLE: ACCOUNTANTS NEAR ME CONFIG
// (uncomment and swap DIRECTORY_CONFIG above to clone)
// ============================================================
/*
export const ACCOUNTANTS_CONFIG: DirectoryConfig = {
  siteName: 'Accountants Near Me',
  domain: 'https://accountantsnearme.co.uk',
  tagline: 'Find Expert Accountants Near You',
  description: 'Compare local accountants and chartered accountants across the UK.',
  primaryKeyword: 'Accountants',
  secondaryKeywords: ['chartered accountants UK', 'tax advisors', 'bookkeepers near me'],
  professionalTitle: 'Accountant',
  professionalTitlePlural: 'Accountants',
  serviceCategory: 'accounting',
  schemaType: ['AccountingService', 'LocalBusiness'],
  services: [
    { icon: '📊', title: 'Tax Returns', description: 'Personal and corporate tax return preparation.' },
    { icon: '💰', title: 'Bookkeeping', description: 'Accurate bookkeeping for businesses of all sizes.' },
    { icon: '🏢', title: 'Company Accounts', description: 'Year-end accounts and Companies House filing.' },
    { icon: '📈', title: 'VAT Returns', description: 'VAT registration, returns, and compliance advice.' },
    { icon: '💼', title: 'Payroll Services', description: 'Full payroll management including PAYE and NI.' },
    { icon: '🎯', title: 'Business Planning', description: 'Financial forecasting and business planning support.' },
  ],
  relevanceKeywords: ['accountant', 'accounting', 'chartered', 'tax', 'bookkeeping', 'payroll'],
  featuredCities: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Bristol', 'Edinburgh'],
  trustPoints: [
    { title: 'Qualified Professionals', desc: 'All listed accountants hold recognised UK qualifications.' },
    { title: 'Client Reviews', desc: 'Verified ratings to help you choose confidently.' },
    { title: 'All Practice Sizes', desc: 'From sole traders to large practices.' },
    { title: 'Free to Search', desc: 'No registration required to browse our directory.' },
  ],
  disclaimer: 'Listing data is for informational purposes only. Always verify credentials before engaging any accountant.',
};
*/
