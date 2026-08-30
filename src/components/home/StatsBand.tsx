import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'

/**
 * The white band that sits where the reference puts its logo wall. Manaber has
 * no client logos to show, so the space carries its VERIFIED figure instead —
 * nothing here is invented — with the contact CTA as counterweight and a
 * hairline closing the band.
 *
 * The storefront rating and ratings count went with the store links:
 * the app has no public listing, so neither figure can be stood behind. Rather
 * than leave one number stranded in a three-column grid, the survivor is set
 * larger and given the left half of the band outright, with a supporting line
 * underneath it — the band now reads as a statement, not a row with two gaps.
 */

export default function StatsBand() {
  return (
    <section
      data-testid="home-stats"
      aria-labelledby="stats-heading"
      className="bg-white pb-16 pt-20 sm:pb-20 sm:pt-24"
    >
      <Container>
        <h2 id="stats-heading" className="sr-only">
          Manaber in numbers
        </h2>

        <div className="grid grid-cols-12 gap-y-12">
          <div className="reveal col-span-12 lg:col-span-5">
            <dl>
              <dd className="flex items-baseline gap-1.5 font-display text-display-lg font-normal leading-none text-ink">
                +70<span className="text-indigo">%</span>
              </dd>
              <dt className="mt-5 text-label uppercase tracking-eyebrow text-ink/55">
                Audience engagement
              </dt>
            </dl>

            <p className="mt-6 max-w-[32ch] text-lg leading-relaxed text-ink/70">
              More of the room following the speaker, in the language each person
              reads — rather than taking away the tone of a talk instead of its
              argument.
            </p>
          </div>

          <div className="reveal reveal-delay-1 col-span-12 lg:col-span-6 lg:col-start-7">
            <p className="text-lg font-bold leading-snug text-indigo">
              Live translation that runs on the device itself. No account, no
              upload, nothing collected.
            </p>
            <Button as="link" to="/contact" variant="black" size="lg" className="mt-6">
              Get in touch
            </Button>
          </div>
        </div>

        <div aria-hidden="true" className="mt-16 h-px w-full bg-ink/15" />
      </Container>
    </section>
  )
}
