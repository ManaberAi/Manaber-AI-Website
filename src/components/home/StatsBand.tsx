import Container from '@/components/ui/Container'
import { StarIcon } from '@/components/ui/Icon'
import StoreButtons from '@/components/ui/StoreButtons'

/**
 * The white band that sits where the reference puts its logo wall. Manaber has
 * no client logos to show, so the space carries the three VERIFIED numbers
 * instead — nothing here is invented — with the store links as counterweight
 * and a hairline closing the band.
 */

const STATS = [
  { value: '5.0', suffix: '', star: true, label: 'App Store rating' },
  { value: '1,000', suffix: '+', star: false, label: 'Ratings' },
  { value: '+70', suffix: '%', star: false, label: 'Audience engagement' },
]

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
          <dl className="reveal col-span-12 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-x-8 lg:col-span-7">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dd className="flex items-baseline gap-1.5 font-display text-display-md font-normal text-ink">
                  {stat.value}
                  {stat.star ? (
                    <StarIcon
                      aria-hidden="true"
                      className="h-7 w-7 shrink-0 text-indigo lg:h-8 lg:w-8"
                    />
                  ) : (
                    <span className="text-indigo">{stat.suffix}</span>
                  )}
                </dd>
                <dt className="mt-3 text-label uppercase tracking-eyebrow text-ink/55">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>

          <div className="reveal reveal-delay-1 col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="text-lg font-bold leading-snug text-indigo">
              Free on iOS and Android. No account, no upload, nothing collected.
            </p>
            <StoreButtons tone="black" className="mt-6" />
          </div>
        </div>

        <div aria-hidden="true" className="mt-16 h-px w-full bg-ink/15" />
      </Container>
    </section>
  )
}
