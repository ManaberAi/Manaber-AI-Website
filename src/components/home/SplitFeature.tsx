import { Link } from 'react-router-dom'

import Container from '@/components/ui/Container'
import {
  CaptionsIcon,
  ChipIcon,
  CompassIcon,
  DownloadCloudIcon,
  MapPinIcon,
} from '@/components/ui/Icon'
import Section from '@/components/ui/Section'

/**
 * Split feature. Left: the big serif claim, a bold periwinkle sub-line and the
 * lime CTA. Right: what the app actually does, as an icon list.
 */

const CAPABILITIES = [
  {
    icon: ChipIcon,
    title: 'On-Device Processing',
    body: 'Listening, transcription and translation all run locally. There is no upload to intercept and no transcript to retain.',
  },
  {
    icon: DownloadCloudIcon,
    title: 'Offline Sermons & Transcripts',
    body: 'Download a sermon once and revisit it later, with no connection required in the hall.',
  },
  {
    icon: MapPinIcon,
    title: 'Mosque Locator',
    body: 'Find mosques nearby using publicly available information. Your visits are never recorded.',
  },
  {
    icon: CompassIcon,
    title: 'Prayer Times & Qibla',
    body: 'Prayer times and Qibla direction for where you are, kept alongside the translation you came for.',
  },
  {
    icon: CaptionsIcon,
    title: '25+ Languages',
    body: 'Urdu, English, Arabic, Hindi, Bengali, Chinese, French, Pashto, Russian, Persian and more — chosen per listener, not per room.',
  },
]

export default function SplitFeature() {
  return (
    <Section tone="white" spacing="default" aria-labelledby="capabilities-heading">
      <Container>
        <div className="grid grid-cols-12 gap-y-14">
          <div className="reveal col-span-12 lg:col-span-5">
            <h2
              id="capabilities-heading"
              className="max-w-[13ch] text-balance font-display text-display-lg font-normal text-ink"
            >
              Everything the app does, it does on your device.
            </h2>

            {/* Lead sub-line. Indigo, not periwinkle: #8587FF on white is only
                3.05:1, which fails the 4.5:1 floor. Same hue family, 14.7:1. */}
            <p className="mt-8 max-w-[34ch] text-xl font-bold leading-snug text-indigo">
              Manaber is a live translation app built for congregations, not for
              datacentres.
            </p>

            <Link
              to="/features"
              className="mt-10 inline-flex h-14 items-center justify-center border border-lime bg-lime px-8 text-label-lg font-medium uppercase tracking-eyebrow text-ink transition-colors duration-200 hover:border-lime-deep hover:bg-lime-deep"
            >
              Explore features
            </Link>
          </div>

          <ul className="col-span-12 lg:col-span-6 lg:col-start-7">
            {CAPABILITIES.map((capability, index) => {
              const CapabilityIcon = capability.icon

              return (
                <li
                  key={capability.title}
                  className={`reveal reveal-delay-${index + 1} flex gap-5 py-7 first:pt-0`}
                >
                  <CapabilityIcon
                    aria-hidden="true"
                    className="mt-1 h-7 w-7 shrink-0 text-ink"
                  />
                  <div>
                    <h3 className="font-display text-display-xs font-normal text-ink">
                      {capability.title}
                    </h3>
                    <p className="mt-2.5 max-w-prose text-lg leading-relaxed text-ink/70">
                      {capability.body}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </Section>
  )
}
