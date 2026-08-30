import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import NotFound from '@/pages/NotFound'
import BubbleCard from '@/components/ui/BubbleCard'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import { ChipIcon, ShieldIcon } from '@/components/ui/Icon'
import Section from '@/components/ui/Section'
import useReveal from '@/hooks/useReveal'
import { getSolution } from '@/lib/solutions'
import { SITE } from '@/lib/site'

/* ---------------------------------------------------------------------------
 * ONE page component for all six /solutions/:slug routes.
 *
 * Nothing about the structure varies between the six — the differentiation is
 * the copy, the photograph and one accent fill, all of which live in
 * `src/lib/solutions.ts`. An unknown slug renders the site's own 404 rather
 * than an empty shell.
 *
 * Slab alternation (design_planning.md §5.1):
 *   white hero → LAVENDER checklist → white steps → BLACK cards
 *   → INDIGO privacy → white CTA → black footer
 *
 * The hero carries no `.reveal`: it is above the fold and must render at final
 * opacity and position on first paint (§6). Everything below it reveals
 * through the single shared observer in `useReveal`.
 * ------------------------------------------------------------------------ */

/* Shared on the indigo slab across all six pages. These are product facts, not
 * per-room claims, so they are written once here rather than six times in the
 * data file. */
const PRIVACY_POINTS = [
  {
    title: 'No data collection',
    body: 'Nothing about you is gathered, stored or profiled.',
  },
  {
    title: 'No audio transmitted',
    body: 'The microphone feed is processed and discarded locally.',
  },
  {
    title: 'Works without an account',
    body: 'No sign-up, no email, no identity attached.',
  },
]

export default function SolutionDetail() {
  const { slug } = useParams()
  const solution = getSolution(slug)

  useReveal()

  useEffect(() => {
    if (!solution) return

    const previous = document.title
    document.title = solution.title

    return () => {
      document.title = previous
    }
  }, [solution])

  // Unknown slug — render the real 404 page, chrome and all.
  if (!solution) return <NotFound />

  const { image, checklist, steps, cards, closing } = solution

  return (
    <>
      {/* ------------------------------------------------------------------
        a. SPLIT HERO — above the fold, final opacity on first paint.
      ------------------------------------------------------------------ */}
      <Section
        tone="white"
        spacing="none"
        className="pb-20 pt-36 sm:pb-24 sm:pt-44"
        aria-labelledby="solution-title"
        data-testid="solution-detail-page"
      >
        <Container>
          <div className="grid grid-cols-12 gap-y-14 lg:items-center">
            <div className="col-span-12 lg:col-span-5">
              <Eyebrow tone="indigo">{solution.navLabel}</Eyebrow>

              <h1
                id="solution-title"
                className="mt-8 max-w-[16ch] text-balance font-display text-display-xl font-normal text-ink"
              >
                {solution.heroHeadline}
              </h1>

              <p className="mt-10 max-w-[38ch] text-xl font-bold leading-snug text-indigo">
                {solution.heroStandfirst}
              </p>

              <p className="mt-8 max-w-prose text-lg leading-relaxed text-ink/70">
                {solution.heroIntro}
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button as="link" to="/contact" variant="lime" size="lg">
                  Get in touch
                </Button>
                <Button as="link" to="/use-cases" variant="outline-dark" size="lg">
                  All use cases
                </Button>
              </div>
            </div>

            {/* The photo wrapper carries `overflow-hidden`, never the bubble —
                the tail lives outside the card and would be clipped away. */}
            <div className="col-span-12 lg:col-span-6 lg:col-start-7">
              <div className="relative overflow-hidden">
                <picture data-ai-status="ready">
                  <img
                    data-ai-id={image.id}
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    loading="eager"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </picture>

                <BubbleCard
                  tone={solution.accent}
                  tail="bottom-left"
                  className="absolute left-5 top-5 max-w-[85%] p-5 sm:left-6 sm:top-6 sm:max-w-[24rem] sm:p-6"
                >
                  <p className="text-lg font-bold leading-snug text-indigo">
                    {solution.heroBubble}
                  </p>
                </BubbleCard>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
        b. CAPABILITY CHECKLIST — lavender ground, icon rows.
      ------------------------------------------------------------------ */}
      <Section tone="lavender" aria-labelledby="solution-checklist-heading">
        <Container>
          <div className="grid grid-cols-12 gap-y-14">
            <div className="reveal col-span-12 lg:col-span-5">
              <Eyebrow tone="indigo">What it takes</Eyebrow>
              <h2
                id="solution-checklist-heading"
                className="mt-6 max-w-[14ch] text-balance font-display text-display-lg font-normal text-ink"
              >
                {checklist.headline}
              </h2>
              <p className="mt-8 max-w-[34ch] text-xl font-bold leading-snug text-indigo">
                {checklist.lead}
              </p>
            </div>

            <ul className="col-span-12 lg:col-span-6 lg:col-start-7">
              {checklist.items.map((item, index) => {
                const ItemIcon = item.icon

                return (
                  <li
                    key={item.title}
                    className={`reveal reveal-delay-${index + 1} flex gap-5 py-7 first:pt-0`}
                  >
                    <ItemIcon aria-hidden="true" className="mt-1 h-7 w-7 shrink-0 text-indigo" />
                    <div>
                      <h3 className="font-display text-display-xs font-normal text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 max-w-prose text-lg leading-relaxed text-ink">
                        {item.body}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
        c. HOW IT WORKS — three numbered steps on white.
      ------------------------------------------------------------------ */}
      <Section tone="white" aria-labelledby="solution-steps-heading">
        <Container>
          <div className="reveal max-w-[36ch]">
            <Eyebrow tone="indigo">How it works</Eyebrow>
            <h2
              id="solution-steps-heading"
              className="mt-6 text-balance font-display text-display-lg font-normal text-ink"
            >
              {steps.headline}
            </h2>
            <p className="mt-8 text-xl font-bold leading-snug text-indigo">{steps.lead}</p>
          </div>

          {/* Three equally-weighted steps: same width, same treatment. Order is
              the hierarchy here, not size. */}
          <ol className="mt-16 grid grid-cols-12 gap-y-12 lg:gap-x-5">
            {steps.items.map((step, index) => (
              <li
                key={step.title}
                className={`reveal reveal-delay-${index + 1} col-span-12 border-t border-ink/15 pt-7 lg:col-span-4`}
              >
                <p
                  aria-hidden="true"
                  className="font-display text-display-md font-normal leading-none text-indigo"
                >
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-6 font-display text-display-xs font-normal text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-prose text-lg leading-relaxed text-ink/70">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
        d. CAPABILITY BENTO — black ground, four equal cards.
      ------------------------------------------------------------------ */}
      <Section tone="black" aria-labelledby="solution-cards-heading">
        <Container>
          <div className="reveal mx-auto max-w-3xl text-center">
            <h2
              id="solution-cards-heading"
              className="text-balance font-display text-display-lg font-normal text-white"
            >
              {cards.headline}
            </h2>
            <p className="mt-6 text-xl font-bold leading-snug text-lavender">{cards.lead}</p>
          </div>

          {/* Four capabilities of equal standing — equal width, equal fill, and
              rows that align top and bottom. No featured item. */}
          <ul className="mt-16 grid grid-cols-12 gap-4 lg:gap-5">
            {cards.items.map((card, index) => (
              <Card
                key={card.title}
                as="li"
                tone="slate"
                className={`reveal reveal-delay-${index + 1} col-span-12 flex flex-col p-8 sm:col-span-6 sm:p-9`}
              >
                <span aria-hidden="true" className="block h-1 w-12 shrink-0 bg-lime" />
                <h3 className="mt-7 font-display text-display-xs font-normal text-white">
                  {card.title}
                </h3>
                <p className="mt-3.5 text-lg leading-relaxed text-white/80">{card.body}</p>
              </Card>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
        e. ON-DEVICE PRIVACY SLAB — the differentiator, on every page.
      ------------------------------------------------------------------ */}
      <Section tone="indigo" aria-labelledby="solution-privacy-heading">
        <Container>
          <div className="grid grid-cols-12 gap-y-16">
            <div className="reveal col-span-12 lg:col-span-7">
              <BubbleCard tone="lavender" tail="top-left" className="p-8 sm:p-10">
                <Eyebrow tone="indigo">Privacy by architecture</Eyebrow>
                <p
                  id="solution-privacy-heading"
                  className="mt-6 text-balance font-display text-display-md font-normal text-indigo"
                >
                  Nothing leaves the device. Not the audio, not a word of it.
                </p>
                <p className="mt-6 max-w-prose text-lg font-bold leading-snug text-indigo">
                  {solution.privacyLine}
                </p>

                <p className="mt-8 flex items-start gap-3 text-lg leading-relaxed text-indigo">
                  <ChipIcon aria-hidden="true" className="mt-1 h-6 w-6 shrink-0" />
                  Listening, transcription and translation all run on the phone. There is
                  no upload to intercept and no transcript to retain.
                </p>
              </BubbleCard>
            </div>

            <ul className="reveal reveal-delay-1 col-span-12 lg:col-span-4 lg:col-start-9">
              {PRIVACY_POINTS.map((point) => (
                <li key={point.title} className="pb-7 pt-7 first:pt-0">
                  <span aria-hidden="true" className="block h-1 w-12 bg-lime" />
                  <h3 className="mt-5 font-display text-display-xs font-normal text-white">
                    {point.title}
                  </h3>
                  <p className="mt-2.5 text-lg leading-relaxed text-lavender">{point.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
        f. CLOSING CTA — white, so the black footer lands on a change.
      ------------------------------------------------------------------ */}
      <Section tone="white" aria-labelledby="solution-cta-heading">
        <Container>
          <div className="grid grid-cols-12 items-center gap-y-12">
            <div className="reveal col-span-12 lg:col-span-5">
              <h2
                id="solution-cta-heading"
                className="max-w-[14ch] text-balance font-display text-display-lg font-normal text-ink"
              >
                {closing.headline}
              </h2>
              <p className="mt-8 max-w-[40ch] text-xl leading-relaxed text-ink/70">
                {closing.body}
              </p>

              <p className="mt-8 flex items-start gap-3 text-lg leading-relaxed text-ink/70">
                <ShieldIcon aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-indigo" />
                Processed on the device itself. Nothing is ever uploaded.
              </p>
            </div>

            <div className="reveal reveal-delay-1 col-span-12 lg:col-span-6 lg:col-start-7">
              <div className="bg-lime p-8 sm:p-10">
                <h3 className="font-display text-display-md font-normal text-ink">
                  {closing.panelTitle}
                </h3>
                <p className="mt-5 max-w-prose text-lg font-bold leading-snug text-ink">
                  {closing.panelBody}
                </p>

                <Button as="link" to="/contact" variant="black" size="lg" className="mt-8">
                  Get in touch
                </Button>

                <div aria-hidden="true" className="mt-8 h-px w-full bg-ink/20" />

                <dl className="mt-6 space-y-3">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <dt className="text-label uppercase tracking-eyebrow text-ink/60">Email</dt>
                    <dd>
                      <a
                        href={`mailto:${SITE.email}`}
                        className="text-lg font-semibold text-ink underline-offset-4 hover:underline"
                      >
                        {SITE.email}
                      </a>
                    </dd>
                  </div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <dt className="text-label uppercase tracking-eyebrow text-ink/60">Phone</dt>
                    <dd>
                      <a
                        href={`tel:${SITE.phoneHref}`}
                        className="text-lg font-semibold text-ink underline-offset-4 hover:underline"
                      >
                        {SITE.phone}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
