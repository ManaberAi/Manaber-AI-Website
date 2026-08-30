import { Link } from 'react-router-dom'

import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import { SITE } from '@/lib/site'

/** Black ground, four link columns, hairline rule, then the wordmark row. */

const PRODUCT_LINKS = [
  { to: '/features', label: 'Features' },
  { to: '/use-cases', label: 'Use Cases' },
  { to: '/features#languages', label: 'Languages' },
]

const COMPANY_LINKS = [
  { to: '/contact', label: 'Contact' },
  { to: '/privacy', label: 'Privacy Policy' },
]

function ColumnHeading({ children }: { children: string }) {
  return (
    <h2 className="text-label font-semibold uppercase tracking-eyebrow text-white">
      {children}
    </h2>
  )
}

const LINK_CLASS =
  'text-[1.0625rem] text-white/65 transition-colors hover:text-lime focus-visible:text-lime'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      data-testid="site-footer"
      className="on-dark bg-ink text-white/65"
    >
      <Container className="py-20 sm:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <ColumnHeading>Product</ColumnHeading>
            <ul className="mt-6 space-y-4">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className={LINK_CLASS}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <ColumnHeading>Company</ColumnHeading>
            <ul className="mt-6 space-y-4">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className={LINK_CLASS}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <ColumnHeading>Contact</ColumnHeading>
            <ul className="mt-6 space-y-4">
              <li>
                <a href={`mailto:${SITE.email}`} className={LINK_CLASS}>
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phoneHref}`} className={LINK_CLASS}>
                  {SITE.phone}
                </a>
              </li>
              <li className="text-[1.0625rem] text-white/65">{SITE.location}</li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <ColumnHeading>Get in touch</ColumnHeading>
            <p className="mt-6 max-w-sm text-[1.0625rem] leading-relaxed text-white/65">
              {SITE.tagline}
            </p>
            <Button
              as="link"
              to="/contact"
              variant="outline-light"
              size="lg"
              className="mt-6"
            >
              Get in touch
            </Button>
          </div>
        </div>

        <div className="mt-16 h-px w-full bg-white/15" />

        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" aria-label="Manaber — home" className="inline-flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="relative inline-flex h-7 w-7 items-center justify-center bg-white"
            >
              <span
                className="absolute left-0 top-full h-2.5 w-2.5 bg-white"
                style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
              />
              <span className="h-2 w-2 bg-indigo" />
            </span>
            <span className="text-[1.3125rem] font-bold tracking-tight text-white">
              Manaber
            </span>
          </Link>

          <div className="flex flex-col gap-1 text-[1.0625rem] text-white/50 sm:flex-row sm:gap-6">
            <p>© {year} Manaber. All rights reserved.</p>
            <p>Built in Dubai · Processed on your device</p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
