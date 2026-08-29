import { Link } from 'react-router-dom'

import Container from '@/components/ui/Container'
import { SITE } from '@/lib/site'

/**
 * Dark full-bleed photographic hero.
 *
 * ABOVE THE FOLD — nothing here carries `.reveal`. The headline, subhead and
 * buttons render at final opacity and position on first paint.
 *
 * The bottom padding is deliberately deep: `HeroCards` is pulled up over this
 * slab with a negative margin, and needs room to overlap without colliding
 * with the buttons.
 */
export default function Hero() {
  return (
    <section
      data-testid="home-hero"
      className="on-dark relative isolate overflow-hidden bg-ink"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <picture data-ai-status="ready">
          <img
            data-ai-id="hero-visual"
            src="https://app-5999.demo4.hubdesk.ai/api/studio/i/cover/1500x1000/i/enterprise/images-library/img_gqDKCh2pwIIV9nSf.webp/img_gqDKCh2pwIIV9nSf-1500x1000.webp"
            alt=""
            width={1536}
            height={1024}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
        </picture>
        {/* Flat scrim, not a gradient. Keeps white type at >7:1 over any frame. */}
        <div className="absolute inset-0 bg-ink/75" />
      </div>

      <Container className="relative">
        <div className="grid grid-cols-12 pb-20 pt-36 sm:pt-44 md:pb-32 lg:pb-[15rem] lg:pt-52">
          <div className="col-span-12 lg:col-span-10 xl:col-span-9">
            <h1 className="max-w-[17ch] text-balance font-display text-display-xl font-normal text-white">
              AI-powered live translation for mosques, conferences and beyond
            </h1>

            <p className="mt-8 max-w-[52ch] text-xl font-bold leading-snug text-white">
              Helping communities communicate smarter, faster with AI-powered
              translations — processed entirely on the device in your hand.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={SITE.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center justify-center border border-lime bg-lime px-8 text-label-lg font-medium uppercase tracking-eyebrow text-ink transition-colors duration-200 hover:border-lime-deep hover:bg-lime-deep"
              >
                Get the app
              </a>
              <Link
                to="/features"
                className="inline-flex h-14 items-center justify-center border border-white bg-transparent px-8 text-label-lg font-medium uppercase tracking-eyebrow text-white transition-colors duration-200 hover:border-lime hover:bg-lime hover:text-ink"
              >
                See how it works
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
