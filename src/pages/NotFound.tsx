import { Link } from 'react-router-dom'

import BubbleCard from '@/components/ui/BubbleCard'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Section from '@/components/ui/Section'

/* ---------------------------------------------------------------------------
 * 404
 *
 * Composed rather than apologetic: the numeral is treated as a display object
 * on a black bubble card, and the page hands the reader somewhere to go rather
 * than dwelling on the mistake. White slab into the black footer.
 * ------------------------------------------------------------------------ */

const DESTINATIONS = [
  { to: '/features', label: 'Features', note: 'What the app does, on the device' },
  { to: '/use-cases', label: 'Use Cases', note: 'Mosques, conferences, classrooms' },
  { to: '/privacy', label: 'Privacy Policy', note: 'Why nothing leaves your phone' },
  { to: '/contact', label: 'Contact', note: 'Write to us directly' },
]

export default function NotFound() {
  return (
    <Section
      tone="white"
      spacing="none"
      className="pb-24 pt-36 sm:pb-32 sm:pt-44"
      aria-labelledby="not-found-title"
      data-testid="not-found-page"
    >
      <Container>
        <div className="grid grid-cols-12 gap-y-16">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow tone="muted">Error 404</Eyebrow>

            <h1
              id="not-found-title"
              className="mt-8 max-w-[15ch] text-balance font-display text-display-xl font-normal text-ink"
            >
              This page is not where you left it.
            </h1>

            <p className="mt-10 max-w-[36ch] text-xl font-bold leading-snug text-indigo">
              The address does not match anything on the site — it may have moved,
              or it may never have existed.
            </p>

            <p className="mt-8 max-w-prose text-lg leading-relaxed text-ink/70">
              Nothing is lost. Everything Manaber publishes is a short walk away.
            </p>

            <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button as="link" to="/" variant="lime" size="lg">
                Back to home
              </Button>
              <Button as="link" to="/contact" variant="outline-dark" size="lg">
                Contact us
              </Button>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <BubbleCard tone="black" tail="top-left" className="p-8 sm:p-9">
              <p
                aria-hidden="true"
                className="font-display text-display-xl font-normal leading-none text-lime"
              >
                404
              </p>

              <h2 className="mt-10 font-display text-display-xs font-normal text-white">
                Try one of these
              </h2>

              <ul className="mt-6">
                {DESTINATIONS.map((destination) => (
                  <li key={destination.to} className="border-t border-white/20 first:border-t-0">
                    <Link
                      to={destination.to}
                      className="group block py-5"
                    >
                      <span className="block text-lg font-semibold text-white transition-colors duration-200 ease-out-expo group-hover:text-lime">
                        {destination.label}
                      </span>
                      <span className="mt-1.5 block text-lg leading-relaxed text-lavender">
                        {destination.note}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </BubbleCard>
          </div>
        </div>
      </Container>
    </Section>
  )
}
