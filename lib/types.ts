// lib/types.ts
export interface Solicitor {
  name: string;
  slug: string;
  phone: string | null;
  website: string | null;
  address: string | null;
  street: string | null;
  city: string | null;
  county: string | null;
  postal_code: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  rating: number | null;
  reviews: number | null;
  subtypes: string | null;
  description: string | null;
  working_hours_csv_compatible: string | null;
  email_1: string | null;
  logo: string | null;
  photo: string | null;
  facebook: string | null;
  twitter: string | null;
  linkedin: string | null;
}

export interface WorkingHours {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}
