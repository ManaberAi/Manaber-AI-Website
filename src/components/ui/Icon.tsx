import type { SVGProps } from 'react'

/**
 * Hand-written inline SVG icons. lucide-react is not installed and brand
 * glyphs were removed upstream, so everything the site needs lives here.
 * All icons are 24×24, stroke-based, and inherit `currentColor`.
 */

type IconProps = SVGProps<SVGSVGElement>

function Svg({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  )
}

export function ShieldIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3 5 6v5.5c0 4.2 2.9 8 7 9.5 4.1-1.5 7-5.3 7-9.5V6l-7-3Z" />
      <path d="m9.2 12 2 2 3.6-3.8" />
    </Svg>
  )
}

export function WaveformIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 10v4M8 6.5v11M12 3.5v17M16 6.5v11M20 10v4" />
    </Svg>
  )
}

export function GlobeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.2 9.5h17.6M3.2 14.5h17.6" />
      <path d="M12 3c-2.4 2.5-3.6 5.5-3.6 9s1.2 6.5 3.6 9c2.4-2.5 3.6-5.5 3.6-9s-1.2-6.5-3.6-9Z" />
    </Svg>
  )
}

export function ChipIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M10 3v3M14 3v3M10 18v3M14 18v3M3 10h3M3 14h3M18 10h3M18 14h3" />
    </Svg>
  )
}

export function DownloadCloudIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7.5 17.5A4.5 4.5 0 0 1 7 8.6a5.5 5.5 0 0 1 10.6 1.5 3.9 3.9 0 0 1-.6 7.4" />
      <path d="M12 11v7.5M9.2 15.8 12 18.6l2.8-2.8" />
    </Svg>
  )
}

export function MapPinIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </Svg>
  )
}

export function CompassIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.4 8.6-1.9 4.9-4.9 1.9 1.9-4.9 4.9-1.9Z" />
    </Svg>
  )
}

export function MinbarIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3.5c2.2 1.4 3.4 3.3 3.4 5.6 0 1.6-.7 3-1.9 4.1h-3c-1.2-1.1-1.9-2.5-1.9-4.1 0-2.3 1.2-4.2 3.4-5.6Z" />
      <path d="M7 20.5h10M8.6 17h6.8M12 13.2v7.3" />
    </Svg>
  )
}

export function MegaphoneIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 10.5v3a1.5 1.5 0 0 0 1.5 1.5H8l8 4V6.5l-8 4H5.5A1.5 1.5 0 0 0 4 12" />
      <path d="M8 15v4.5M19 10v4" />
    </Svg>
  )
}

export function PodiumIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 4h12l-1.2 5.5H7.2L6 4Z" />
      <path d="M12 9.5V20M8 20h8" />
      <path d="M4.5 12.5h4M15.5 12.5h4" />
    </Svg>
  )
}

export function BriefcaseIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="7.5" width="18" height="12" rx="2.2" />
      <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3 12.5h18" />
    </Svg>
  )
}

export function BookIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11a2 2 0 0 1 2 2v13a1.6 1.6 0 0 0-1.6-1.6H4V5.5Z" />
      <path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v15a1.6 1.6 0 0 1 1.6-1.6H20V5.5Z" />
    </Svg>
  )
}

export function UsersIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="9.5" cy="8.5" r="3.2" />
      <path d="M3.8 19.5a5.9 5.9 0 0 1 11.4 0" />
      <path d="M16.2 6.1a3 3 0 0 1 .6 5.8M17.4 14.6a5.6 5.6 0 0 1 3 4.9" />
    </Svg>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </Svg>
  )
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="m12 3.2 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.7l6.1-.9L12 3.2Z" />
    </svg>
  )
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Svg strokeWidth={1.8} {...props}>
      <path d="m6 9.5 6 6 6-6" />
    </Svg>
  )
}

export function MenuIcon(props: IconProps) {
  return (
    <Svg strokeWidth={1.8} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Svg>
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <Svg strokeWidth={1.8} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Svg>
  )
}

export function MailIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.2" />
      <path d="m3.8 7.2 7.2 5.3a1.7 1.7 0 0 0 2 0l7.2-5.3" />
    </Svg>
  )
}

export function PhoneIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6.2 3.8h3l1.4 3.6-2 1.4a11.5 11.5 0 0 0 5.6 5.6l1.4-2 3.6 1.4v3a1.8 1.8 0 0 1-2 1.8A15.6 15.6 0 0 1 4.4 5.8a1.8 1.8 0 0 1 1.8-2Z" />
    </Svg>
  )
}

/** FAQ toggle. Rotates 45° to become a close cross when the row opens. */
export function PlusIcon(props: IconProps) {
  return (
    <Svg strokeWidth={1.8} {...props}>
      <path d="M12 5v14M5 12h14" />
    </Svg>
  )
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Svg strokeWidth={1.8} {...props}>
      <path d="M4 12h15m-6-6 6 6-6 6" />
    </Svg>
  )
}

/** Live caption stream — the app's core act, drawn as stacked speech lines. */
export function CaptionsIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="2.5" y="4.5" width="19" height="14" />
      <path d="M6 10h5M6 13.5h9M14.5 10h3.5" />
    </Svg>
  )
}
