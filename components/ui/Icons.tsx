// components/ui/Icons.tsx
// Flaticon Law & Justice icon set — inline SVG paths
// https://www.flaticon.com/packs/law-and-justice

interface IconProps {
  className?: string;
  size?: number;
}

// Scales of Justice
export function ScalesIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={size} height={size} className={className} fill="currentColor">
      <path d="M256 32c-8.8 0-16 7.2-16 16v16H136c-5.1 0-9.9 2.4-13 6.4L48 184c-2 2.6-3 5.7-3 9 0 35.3 28.7 64 64 64s64-28.7 64-64c0-3.2-1-6.4-3-9L107.5 96H240v352h-56c-8.8 0-16 7.2-16 16s7.2 16 16 16h144c8.8 0 16-7.2 16-16s-7.2-16-16-16h-56V96h132.5L361 184c-2 2.6-3 5.7-3 9 0 35.3 28.7 64 64 64s64-28.7 64-64c0-3.2-1-6.4-3-9L418 70.4c-3.1-4-7.9-6.4-13-6.4H272V48c0-8.8-7.2-16-16-16zM109 184l36-54 36 54H109zm258 0 36-54 36 54H367z"/>
    </svg>
  );
}

// Gavel
export function GavelIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={size} height={size} className={className} fill="currentColor">
      <path d="M318.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-120 120c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l4-4L325.4 293.4l-4 4c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l120-120c12.5-12.5 12.5-32.8 0-45.3l-16-16c-12.5-12.5-32.8-12.5-45.3 0l-4 4-101.4-101.4 4-4c12.5-12.5 12.5-32.8 0-45.3l-16-16zm-152 288c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l48 48c12.5 12.5 32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-48-48z"/>
    </svg>
  );
}

// Briefcase
export function BriefcaseIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={size} height={size} className={className} fill="currentColor">
      <path d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 48V56c0-30.9 25.1-56 56-56H328c30.9 0 56 25.1 56 56V96h40c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H88c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64h40z"/>
    </svg>
  );
}

// Shield
export function ShieldIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={size} height={size} className={className} fill="currentColor">
      <path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2-.5 99.2-41.3 280.7-213.7 363.2-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z"/>
    </svg>
  );
}

// Handshake
export function HandshakeIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width={size} height={size} className={className} fill="currentColor">
      <path d="M323.4 85.2l-96.8 78.4c-16.1 13-19.2 36.4-7 53.1 12.9 17.8 38 21.3 55.3 7.8l99.3-77.2c7-5.4 17-4.2 22.5 2.8s4.2 17-2.8 22.5l-20.9 16.2L512 316.8V128h-.7l-3.9-2.5L434.8 79c-15.3-9.8-33.2-15-51.4-15-23.5 0-46.2 8.7-63.9 24.2zm22.8 124.4l-51.7 40.2C263 274.4 217.3 268 193.7 240.8c-24.9-28.5-21.4-71.9 7.5-96.2l87.3-70.7c-5.8-.7-11.7-1.1-17.6-1.1-23.5 0-46.3 8.7-64 24.2L89.4 244.2c-34.6 27.8-43.7 77.1-21.6 116l22.5 38.8-75.7 56.8c-6.9 5.2-8.3 15-3.1 21.9s15 8.3 21.9 3.1l87.4-65.6c8.7 4.4 18.1 7.2 27.8 8.2l0 0c30.3 3.3 55.5-13.4 68.2-38.6l15.3-30.4c15.5-30.7 51.2-43.5 83.2-30.5l25.4 10.1c28.1 11.2 59.4 3.3 79-19.6l69.3-84.1-71.1-67.3zM460.3 512l75.6-56.7c6.9-5.2 8.3-15 3.1-21.9s-15-8.3-21.9-3.1l-87.5 65.6c-19.4-9.8-41-12.2-61.9-7.2l-25.5 6.4c-40.1 10-81.3-10.5-98.3-48.1l-8.7-19.5c-4.1-9.2-15-13.1-24.1-8.9s-13.1 15-8.9 24.1l8.7 19.5c23 51.5 79.1 80.6 134.2 70.3l25.5-6.4c14.1-3.5 28.8-2.2 42.1 3.9z"/>
    </svg>
  );
}

// Document / File
export function DocumentIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={size} height={size} className={className} fill="currentColor">
      <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z"/>
    </svg>
  );
}

// Megaphone / Whistleblower
export function MegaphoneIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={size} height={size} className={className} fill="currentColor">
      <path d="M480 32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9L381.7 53c-48 48-113.1 75-181.3 75H128C57.3 128 0 185.3 0 256c0 53.6 32.9 99.7 80 118.4V480c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V400h16c68.2 0 133.3 27 181.3 75l44.6 44.6c9.2 9.2 22.9 11.9 34.9 6.9S480 508.9 480 496V320c18.6-8.8 32-32.5 32-60s-13.4-51.2-32-60V32z"/>
    </svg>
  );
}

// Courthouse / Building
export function CourthouseIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={size} height={size} className={className} fill="currentColor">
      <path d="M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160h448c15.2 0 28.3-10.7 31.3-25.6s-4.7-29.8-18.7-35.8l-224-96c-8.1-3.4-17.2-3.4-25.2 0zM128 224H64v192H48c-8.8 0-16 7.2-16 16v48H480V432c0-8.8-7.2-16-16-16H448V224H384v192H320V224H256v192H192V224H128zm128-64a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/>
    </svg>
  );
}

// Person / User
export function PersonIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={size} height={size} className={className} fill="currentColor">
      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
    </svg>
  );
}

// Phone
export function PhoneIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={size} height={size} className={className} fill="currentColor">
      <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
    </svg>
  );
}

// Map Pin / Location
export function MapPinIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={size} height={size} className={className} fill="currentColor">
      <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
    </svg>
  );
}

// Globe / Website
export function GlobeIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={size} height={size} className={className} fill="currentColor">
      <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.5 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.5-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z"/>
    </svg>
  );
}

// Email / Envelope
export function EmailIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={size} height={size} className={className} fill="currentColor">
      <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
    </svg>
  );
}

// Star / Rating
export function StarIcon({ className = '', size = 24, filled = true }: IconProps & { filled?: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width={size} height={size} className={className} fill="currentColor">
      {filled ? (
        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
      ) : (
        <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0z"/>
      )}
    </svg>
  );
}

// Check circle
export function CheckIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={size} height={size} className={className} fill="currentColor">
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
    </svg>
  );
}

// Arrow right
export function ArrowRightIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={size} height={size} className={className} fill="currentColor">
      <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
    </svg>
  );
}

// Clock / Hours
export function ClockIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={size} height={size} className={className} fill="currentColor">
      <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.5 33.3-6.5s4.5-25.9-6.5-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
    </svg>
  );
}

// Search / magnifier
export function SearchIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={size} height={size} className={className} fill="currentColor">
      <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
    </svg>
  );
}

// LinkedIn
export function LinkedInIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={size} height={size} className={className} fill="currentColor">
      <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/>
    </svg>
  );
}

// Twitter/X
export function TwitterIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={size} height={size} className={className} fill="currentColor">
      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
    </svg>
  );
}

// Facebook
export function FacebookIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={size} height={size} className={className} fill="currentColor">
      <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/>
    </svg>
  );
}

// Warning / Info
export function InfoIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={size} height={size} className={className} fill="currentColor">
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
    </svg>
  );
}
