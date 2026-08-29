import BubbleCard from '@/components/ui/BubbleCard'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Section from '@/components/ui/Section'

/**
 * Deep-indigo slab. The reference puts a customer testimonial here; Manaber
 * has none, so the bubble card carries the PRODUCT CLAIM instead — no quote,
 * no attributed person, no avatar, no logo. Nothing on this slab is invented.
 */

const PROOF = [
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

export default function PrivacySlab() {
  return (
    <Section tone="indigo" spacing="default" aria-labelledby="privacy-heading">
      <Container>
        <div className="grid grid-cols-12 gap-y-16">
          <div className="reveal col-span-12 lg:col-span-7">
            <BubbleCard tone="lavender" tail="top-left" className="p-8 sm:p-10">
              <Eyebrow tone="indigo">Privacy by architecture</Eyebrow>
              <p
                id="privacy-heading"
                className="mt-6 text-balance font-display text-display-md font-normal text-indigo"
              >
                Nothing leaves the device. Not the audio, not a word of it.
              </p>
              <p className="mt-6 max-w-prose text-lg font-bold leading-snug text-indigo">
                A sermon is not data to be shipped to a datacentre. Manaber
                processes speech where it is heard — on the phone in your hand.
              </p>
            </BubbleCard>
          </div>

          <ul className="reveal reveal-delay-1 col-span-12 lg:col-span-4 lg:col-start-9">
            {PROOF.map((point) => (
              <li key={point.title} className="pb-7 pt-7 first:pt-0">
                <span aria-hidden="true" className="block h-1 w-12 bg-lime" />
                <h3 className="mt-5 font-display text-display-xs font-normal text-white">
                  {point.title}
                </h3>
                <p className="mt-2.5 text-lg leading-relaxed text-lavender">
                  {point.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  )
}
