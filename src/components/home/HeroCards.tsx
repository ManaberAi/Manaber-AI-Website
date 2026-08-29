import { Link } from 'react-router-dom'

import BubbleCard from '@/components/ui/BubbleCard'
import Container from '@/components/ui/Container'

/**
 * Three bubble cards straddling the hero's bottom edge — the first sighting of
 * the tail motif, and the moment the palette announces itself.
 *
 * The band has NO background of its own: it is pulled up over the hero with a
 * negative margin and the page's white ground shows through below. Above the
 * fold at desktop widths, so no `.reveal` here either.
 */

function LearnMore({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="eyebrow mt-1.5 shrink-0 text-ink underline-offset-4 transition-opacity hover:underline hover:opacity-70"
    >
      Learn more
      <span className="sr-only"> about {label}</span>
    </Link>
  )
}

export default function HeroCards() {
  return (
    <div className="relative z-10 -mt-14 sm:-mt-16 md:-mt-20 lg:-mt-[13rem]">
      <Container>
        {/* Stacked until lg. Three 315px columns is the narrowest the serif
            title + "Learn more" row reads at; below that they get their own
            full width rather than being squeezed. */}
        <ul className="grid grid-cols-1 items-stretch gap-y-14 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-0">
          {/* 1 — periwinkle */}
          <BubbleCard
            as="li"
            tone="periwinkle"
            tail="top-left"
            className="flex h-full flex-col p-6 sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="max-w-[11ch] font-display text-display-xs font-normal text-ink">
                On-Device Privacy
              </h2>
              <LearnMore to="/privacy" label="on-device privacy" />
            </div>

            <p className="mt-6 text-lg font-bold leading-snug text-indigo">
              Translation runs on the phone itself. No audio, no transcripts and
              nothing you say ever leaves the device.
            </p>

            <div className="mt-auto pt-8">
              <picture data-ai-status="ready">
                <img
                  data-ai-id="privacy-visual"
                  src="https://app-5999.demo4.hubdesk.ai/api/studio/i/cover/1500x1026/i/enterprise/images-library/img_CAsoB4uI2QYEDfjS.webp/img_CAsoB4uI2QYEDfjS-1500x1026.webp"
                  alt="A smartphone resting on slate under soft directional light"
                  width={1216}
                  height={832}
                  loading="eager"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
              </picture>
            </div>
          </BubbleCard>

          {/* 2 — lime */}
          <BubbleCard
            as="li"
            tone="lime"
            tail="top-left"
            className="flex h-full flex-col p-6 sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="max-w-[11ch] font-display text-display-xs font-normal text-ink">
                Real-Time Live Translation
              </h2>
              <LearnMore to="/features" label="real-time live translation" />
            </div>

            <p className="mt-6 text-lg font-bold leading-snug text-ink">
              Speech is captioned and translated as it is spoken, so listeners
              follow the meaning while the sentence is still in the air.
            </p>

            {/* Flat caption-stream mark — the app's core act, drawn not photographed. */}
            <div className="mt-auto pt-8">
              <div
                aria-hidden="true"
                className="on-dark flex aspect-[4/3] w-full flex-col justify-end gap-2.5 bg-ink p-5"
              >
                <span className="block h-2 w-[72%] bg-white/35" />
                <span className="block h-2 w-[54%] bg-white/35" />
                <span className="mt-3 block h-2.5 w-[86%] bg-lime" />
                <span className="block h-2.5 w-[62%] bg-lime" />
                <span className="block h-2.5 w-[40%] bg-lime/60" />
              </div>
            </div>
          </BubbleCard>

          {/* 3 — lavender */}
          <BubbleCard
            as="li"
            tone="lavender"
            tail="top-left"
            className="flex h-full flex-col p-6 sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="max-w-[11ch] font-display text-display-xs font-normal text-ink">
                25+ Languages
              </h2>
              <LearnMore to="/features#languages" label="supported languages" />
            </div>

            <p className="mt-6 text-lg font-bold leading-snug text-indigo">
              One congregation, many mother tongues. Each person reads along in
              the language they think in.
            </p>

            <div className="mt-auto pt-8">
              <picture data-ai-status="ready">
                <img
                  data-ai-id="languages-visual"
                  src="https://app-5999.demo4.hubdesk.ai/api/studio/i/cover/1500x1026/i/enterprise/images-library/img_7ic7uKmMjUR7oIbq.webp/img_7ic7uKmMjUR7oIbq-1500x1026.webp"
                  alt="An abstract mesh suggesting many connected voices"
                  width={1216}
                  height={832}
                  loading="eager"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
              </picture>
            </div>
          </BubbleCard>
        </ul>
      </Container>
    </div>
  )
}
