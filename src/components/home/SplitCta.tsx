import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import StoreButtons from '@/components/ui/StoreButtons'
import { SITE } from '@/lib/site'

/**
 * Split CTA. Left: the closing serif line. Right: a flat lime panel carrying
 * the real store links and the real contact address. No embedded form widget —
 * the contact page owns that.
 */
export default function SplitCta() {
  return (
    <Section tone="white" spacing="default" aria-labelledby="home-cta-heading">
      <Container>
        <div className="grid grid-cols-12 items-center gap-y-12">
          <div className="reveal col-span-12 lg:col-span-5">
            <h2
              id="home-cta-heading"
              className="max-w-[13ch] text-balance font-display text-display-lg font-normal text-ink"
            >
              Remove the language barrier from the room.
            </h2>
            <p className="mt-8 max-w-[38ch] text-xl leading-relaxed text-ink/70">
              Free to download on iOS and Android. Nothing to configure, nothing
              to connect, and nothing collected about the people listening.
            </p>
          </div>

          <div className="reveal reveal-delay-1 col-span-12 lg:col-span-6 lg:col-start-7">
            <div className="bg-lime p-8 sm:p-10">
              <h3 className="font-display text-display-md font-normal text-ink">
                Get Manaber
              </h3>
              <p className="mt-5 max-w-prose text-lg font-bold leading-snug text-ink">
                Download the app, or talk to us about bringing live translation to
                your mosque, venue or team.
              </p>

              <StoreButtons tone="black" className="mt-8" />

              <div className="mt-8 h-px w-full bg-ink/20" />

              <dl className="mt-6 space-y-3">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <dt className="text-label uppercase tracking-eyebrow text-ink/60">
                    Email
                  </dt>
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
                  <dt className="text-label uppercase tracking-eyebrow text-ink/60">
                    Phone
                  </dt>
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
  )
}
