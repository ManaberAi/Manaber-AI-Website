import type { ReactNode } from 'react'

import Card from '@/components/ui/Card'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import {
  BookIcon,
  CheckIcon,
  ChipIcon,
  CompassIcon,
  DownloadCloudIcon,
  GlobeIcon,
  MapPinIcon,
  MegaphoneIcon,
  PodiumIcon,
  ShieldIcon,
  UsersIcon,
  WaveformIcon,
} from '@/components/ui/Icon'
import Section from '@/components/ui/Section'
import StoreButtons from '@/components/ui/StoreButtons'
import useReveal from '@/hooks/useReveal'
import cn from '@/lib/cn'
import { LANGUAGES } from '@/lib/site'

/* ---------------------------------------------------------------------------
 * Local specimen panels.
 *
 * Every capability row is paired with a small composed illustration. These are
 * built from divs and hand-written inline SVG in the site's established style —
 * no new <img data-ai-id="auto-1b521bw"> tags, no icon dependency. Anything that carries no information
 * beyond the prose beside it is hidden from assistive technology.
 * ------------------------------------------------------------------------ */

function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-5 -z-10 rounded-[2rem] bg-gradient-to-br from-emerald-300/30 via-emerald-100/25 to-transparent blur-2xl"
      />
      <div
        className={cn(
          'rounded-panel bg-white p-6 shadow-frame ring-1 ring-neutral-900/5 sm:p-8',
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}

function PanelLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'text-xs font-semibold uppercase tracking-eyebrow text-neutral-500',
        className,
      )}
    >
      {children}
    </p>
  )
}

const WAVEFORM = [
  22, 40, 62, 44, 78, 96, 70, 52, 88, 40, 64, 30, 50, 74, 34, 58, 26, 46, 68, 36,
]

/** 01 — translation keeping pace with a live speaker. */
function PacePanel() {
  return (
    <Panel>
      <div className="flex items-center justify-between gap-4">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-eyebrow text-emerald-700">
          <span aria-hidden="true" className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
          </span>
          Speaking now
        </span>
        <PanelLabel>On device</PanelLabel>
      </div>

      <div aria-hidden="true" className="mt-7 flex h-24 items-end gap-1.5">
        {WAVEFORM.map((height, index) => (
          <span
            key={index}
            style={{ height: `${height}%` }}
            className={cn(
              'flex-1 rounded-full',
              index > 13 ? 'bg-emerald-600/70' : 'bg-emerald-500/25',
            )}
          />
        ))}
      </div>

      <div aria-hidden="true" className="mt-8 space-y-4">
        <div className="flex items-center gap-4">
          <span className="w-20 shrink-0 text-xs font-semibold uppercase tracking-eyebrow text-neutral-500">
            Heard
          </span>
          <span className="h-2 flex-1 rounded-full bg-neutral-200" />
        </div>
        <div className="flex items-center gap-4">
          <span className="w-20 shrink-0 text-xs font-semibold uppercase tracking-eyebrow text-emerald-700">
            Rendered
          </span>
          <span className="flex flex-1 items-center gap-2">
            <span className="h-2 w-[84%] rounded-full bg-emerald-600/70" />
            <span className="h-4 w-0.5 animate-pulse bg-emerald-600" />
          </span>
        </div>
      </div>
    </Panel>
  )
}

/** 02 — the language list, drawn from the site's real language data. */
function LanguagesPanel() {
  return (
    <Panel>
      <PanelLabel>Each listener picks their own</PanelLabel>
      <ul className="mt-6 flex flex-wrap gap-2.5">
        {LANGUAGES.map((language) => (
          <li key={language}>
            <span className="inline-flex items-center rounded-full bg-neutral-50 px-4 py-2 text-base text-neutral-700 ring-1 ring-neutral-200">
              {language}
            </span>
          </li>
        ))}
        <li>
          <span className="inline-flex items-center rounded-full bg-emerald-700 px-4 py-2 text-base font-medium text-white">
            and more
          </span>
        </li>
      </ul>
    </Panel>
  )
}

const STEPS = ['Open the app', 'Choose a language', 'Read along']

/** 03 — how little the listener has to do. */
function StepsPanel() {
  return (
    <Panel>
      <PanelLabel>Everything the listener does</PanelLabel>
      <ol className="mt-6 space-y-5">
        {STEPS.map((step, index) => (
          <li key={step} className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100"
            >
              {index + 1}
            </span>
            <span className="text-base text-neutral-700">{step}</span>
          </li>
        ))}
      </ol>
      <div className="mt-7 flex flex-wrap gap-2.5 border-t border-neutral-200 pt-6">
        {['No account', 'No pairing', 'No hardware'].map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-3.5 py-1.5 text-base text-neutral-600 ring-1 ring-neutral-200"
          >
            <CheckIcon aria-hidden="true" className="h-4 w-4 text-emerald-600" />
            {item}
          </span>
        ))}
      </div>
    </Panel>
  )
}

function DotField({ count, columns }: { count: number; columns: string }) {
  return (
    <div aria-hidden="true" className={cn('grid gap-1.5', columns)}>
      {Array.from({ length: count }).map((_, index) => (
        <span
          key={index}
          className={cn(
            'aspect-square rounded-full',
            index % 3 === 0 ? 'bg-emerald-600/60' : 'bg-emerald-500/25',
          )}
        />
      ))}
    </div>
  )
}

/** 04 — the same app in a small room and a full hall. */
function ScalePanel() {
  return (
    <Panel>
      <PanelLabel>The same app, either way</PanelLabel>
      <div className="mt-6 grid grid-cols-2 items-end gap-6 sm:gap-8">
        <div>
          <DotField count={9} columns="grid-cols-3" />
          <p className="mt-4 text-base text-neutral-600">A study circle</p>
        </div>
        <div>
          <DotField count={80} columns="grid-cols-10" />
          <p className="mt-4 text-base text-neutral-600">A full hall</p>
        </div>
      </div>
      <p className="mt-7 border-t border-neutral-200 pt-6 text-base leading-relaxed text-neutral-500">
        Every phone does its own work, so adding listeners adds nothing to carry.
      </p>
    </Panel>
  )
}

/** 05 — rows of a congregation, drawn as arcs around the speaker. */
function CongregationPanel() {
  const radii = [46, 78, 110, 142, 174]

  return (
    <Panel>
      <PanelLabel>Built around the rows</PanelLabel>
      <svg
        viewBox="0 0 380 210"
        role="img"
        aria-label="Concentric arcs spreading outward from a single speaker, like rows in a prayer hall"
        className="mt-6 w-full"
      >
        {radii.map((radius, index) => (
          <path
            key={radius}
            d={`M ${190 - radius} 26 A ${radius} ${radius} 0 0 0 ${190 + radius} 26`}
            fill="none"
            stroke="#059669"
            strokeWidth={index === 0 ? 2.2 : 1.4}
            strokeLinecap="round"
            opacity={0.85 - index * 0.14}
          />
        ))}
        <circle cx="190" cy="26" r="6" fill="#047857" />
        <path
          d="M178 14h24"
          stroke="#047857"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    </Panel>
  )
}

/** 06 — register shifting with the setting. */
function RegisterPanel() {
  return (
    <Panel>
      <PanelLabel>Register follows the room</PanelLabel>
      <div className="mt-6 space-y-4">
        <div className="rounded-card bg-neutral-50 p-5 ring-1 ring-neutral-200/70">
          <p className="text-xs font-semibold uppercase tracking-eyebrow text-emerald-700">
            A sermon
          </p>
          <p className="mt-3 font-display text-2xl italic leading-snug text-neutral-900">
            Measured, formal, unhurried.
          </p>
        </div>
        <div className="rounded-card bg-neutral-50 p-5 ring-1 ring-neutral-200/70">
          <p className="text-xs font-semibold uppercase tracking-eyebrow text-neutral-500">
            A team briefing
          </p>
          <p className="mt-3 text-2xl font-semibold leading-snug tracking-tight text-neutral-900">
            Direct, plain, brisk.
          </p>
        </div>
      </div>
    </Panel>
  )
}

function Bar({ width, tone = 'neutral' }: { width: number; tone?: 'neutral' | 'emerald' }) {
  return (
    <span
      style={{ width: `${width}px` }}
      className={cn(
        'h-3 rounded-full',
        tone === 'emerald' ? 'bg-emerald-600/70' : 'bg-neutral-200',
      )}
    />
  )
}

/** 07 — a phrase held together rather than translated word by word. */
function ContextPanel() {
  return (
    <Panel>
      <PanelLabel>One sentence, read whole</PanelLabel>
      <div aria-hidden="true" className="mt-7 flex flex-wrap items-center gap-2">
        <Bar width={54} />
        <Bar width={32} />
        <span className="inline-flex items-center gap-2 rounded-md bg-emerald-50 px-2.5 py-2 ring-1 ring-emerald-200">
          <Bar width={38} tone="emerald" />
          <Bar width={26} tone="emerald" />
          <Bar width={48} tone="emerald" />
        </span>
        <Bar width={28} />
        <Bar width={60} />
        <Bar width={24} />
        <Bar width={44} />
      </div>
      <p className="mt-7 border-t border-neutral-200 pt-6 text-base leading-relaxed text-neutral-500">
        The marked phrase is carried across as one unit, in the light of the words
        around it — not substituted term by term.
      </p>
    </Panel>
  )
}

/* ---------------------------------------------------------------------------
 * The seven core capabilities.
 * ------------------------------------------------------------------------ */

const CAPABILITIES = [
  {
    id: 'real-time-accuracy',
    icon: WaveformIcon,
    title: 'Real-Time Accuracy',
    body: 'Speech is captioned and translated while the speaker is still talking. Listeners follow an argument as it is being made rather than catching up with it afterwards, so nobody at the front has to slow down for the translation to keep up.',
    panel: PacePanel,
  },
  {
    id: 'languages',
    icon: GlobeIcon,
    title: 'Multi-Language Support',
    body: 'More than 25 languages, selected individually on each phone. A single gathering can hold a dozen mother tongues, and every person present reads the same words in the language they think in.',
    panel: LanguagesPanel,
  },
  {
    id: 'seamless-communication',
    icon: MegaphoneIcon,
    title: 'Seamless Communication',
    body: 'There is nothing for the listener to set up. Open the app, choose a language, read. No account to create, no device to borrow at the door, no arrangement to make with anyone before the speaker begins.',
    panel: StepsPanel,
  },
  {
    id: 'scalable-and-reliable',
    icon: ChipIcon,
    title: 'Scalable & Reliable',
    body: 'The same app serves a study circle of ten and a hall of several thousand, because each phone does its own work. Nothing is shared between devices, so there is no central system to queue behind and none to fail on a busy Friday.',
    panel: ScalePanel,
  },
  {
    id: 'community-centered',
    icon: UsersIcon,
    title: 'Community-Centered',
    body: 'Manaber was built for congregations first, not for enterprises. The people it is designed around are the ones sitting in the rows — worshippers, imams and the volunteers who keep a mosque running week after week.',
    panel: CongregationPanel,
  },
  {
    id: 'adaptive-translation-style',
    icon: PodiumIcon,
    title: 'Adaptive Translation Style',
    body: 'A sermon does not read like a staff briefing. The translation follows the register of what is actually being spoken, so a khutbah keeps its weight and a lecture keeps its clarity instead of both arriving flattened into the same voice.',
    panel: RegisterPanel,
  },
  {
    id: 'contextual-understanding',
    icon: BookIcon,
    title: 'Contextual Understanding',
    body: 'Meaning rarely survives word-by-word substitution. Manaber reads a phrase as a phrase, holding the sentence around it in view, so idiom, emphasis and intent arrive intact rather than merely literal.',
    panel: ContextPanel,
  },
]

const COMPANIONS = [
  {
    icon: DownloadCloudIcon,
    title: 'Offline Access',
    body: 'Downloaded sermons and their transcripts stay on the phone and open without a connection — useful in a basement hall, and useful again on the journey home.',
  },
  {
    icon: MapPinIcon,
    title: 'Mosque Locator',
    body: 'Find mosques near you using publicly available information. The feature answers where, never who: your visits are not recorded, counted or shared.',
  },
  {
    icon: CompassIcon,
    title: 'Prayer Times & Qibla',
    body: 'Prayer times and Qibla direction calculated from your own device settings, kept alongside the translation you came for.',
  },
]

const PRIVACY_POINTS = [
  {
    title: 'Nothing is collected',
    body: 'No profile, no analytics on what you listened to, no history assembled about you.',
  },
  {
    title: 'Nothing is transmitted',
    body: 'Audio and transcripts are processed on the phone and stay there. There is no upload to intercept.',
  },
  {
    title: 'No account is required',
    body: 'No sign-up, no email address, no identity attached to anything the app does.',
  },
]

export default function Features() {
  useReveal()

  return (
    <>
      {/* ------------------------------------------------------------------
        a. PAGE HEADER — final opacity and position on first paint.
      ------------------------------------------------------------------ */}
      <section
        data-testid="features-page"
        aria-labelledby="features-heading"
        className="relative overflow-hidden bg-white pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-44"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-gradient-to-br from-emerald-200/50 via-emerald-100/30 to-transparent blur-3xl" />
          <div className="absolute -left-52 top-44 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-emerald-50 via-emerald-100/40 to-transparent blur-3xl" />
        </div>

        <Container>
          {/* Editorial masthead: headline left, standfirst set against it on the
              right so the upper half of the page is composed rather than empty.
              The same split is used on every interior page. */}
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <Eyebrow>Features</Eyebrow>

              <h1
                id="features-heading"
                className="mt-6 text-balance text-5xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-6xl xl:text-7xl"
              >
                Live captions and translation,{' '}
                <span className="font-display font-normal italic text-emerald-700">
                  as the words are spoken
                </span>
                .
              </h1>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <p className="max-w-prose text-lg leading-relaxed text-neutral-600">
                Manaber listens, transcribes and translates entirely on the phone in
                your hand. What follows is what the app does in a live room — and the
                single architectural decision, on-device processing, that shapes every
                one of these capabilities.
              </p>

              <p className="mt-7 flex items-start gap-2.5 text-base text-neutral-500">
                <ShieldIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                <span>Free on iOS and Android. Nothing is ever uploaded.</span>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------
        b. THE SEVEN CORE CAPABILITIES — alternating two-column rows.
      ------------------------------------------------------------------ */}
      <Section tone="tint" aria-labelledby="capabilities-heading">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Core Capabilities</Eyebrow>
            <h2
              id="capabilities-heading"
              className="mt-5 text-balance text-4xl font-bold tracking-tight text-neutral-900 lg:text-5xl"
            >
              Seven capabilities, one design decision.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              Each of these follows from the same choice: the work happens on the
              device rather than in a datacentre somewhere else.
            </p>
          </div>

          <ul className="mt-16 space-y-20 lg:mt-20 lg:space-y-28">
            {CAPABILITIES.map((capability, index) => {
              const CapabilityIcon = capability.icon
              const CapabilityPanel = capability.panel
              const flipped = index % 2 === 1

              return (
                <li
                  key={capability.id}
                  id={capability.id}
                  className={cn(
                    'grid items-center gap-10 scroll-mt-28 lg:grid-cols-12 lg:gap-16',
                    // The first row is inside the first viewport — it must paint
                    // at final opacity rather than wait for the observer.
                    index > 0 && 'reveal',
                  )}
                >
                  <div
                    className={cn(
                      'lg:col-span-6',
                      flipped ? 'lg:order-2 lg:col-start-7' : 'lg:order-1',
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                        <CapabilityIcon className="h-6 w-6" />
                      </span>
                      <span aria-hidden="true" className="h-px flex-1 bg-neutral-200" />
                      <span className="text-xs font-semibold uppercase tracking-eyebrow text-neutral-500">
                        {String(index + 1).padStart(2, '0')} / 07
                      </span>
                    </div>

                    <h3 className="mt-7 text-balance text-3xl font-bold tracking-tight text-neutral-900 lg:text-4xl">
                      {capability.title}
                    </h3>
                    <p className="mt-5 max-w-prose text-lg leading-relaxed text-neutral-600">
                      {capability.body}
                    </p>
                  </div>

                  <div className={cn('lg:col-span-6', flipped ? 'lg:order-1' : 'lg:order-2')}>
                    <CapabilityPanel />
                  </div>
                </li>
              )
            })}
          </ul>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
        c. PRIVACY PANEL — the decision behind all seven.
      ------------------------------------------------------------------ */}
      <Section tone="dark" className="overflow-hidden" aria-labelledby="privacy-heading">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-40 h-[32rem] w-[32rem] rounded-full bg-emerald-700/25 blur-3xl" />
          <div className="absolute -bottom-44 -left-32 h-[28rem] w-[28rem] rounded-full bg-emerald-800/40 blur-3xl" />
        </div>

        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="reveal lg:col-span-6">
              <Eyebrow tone="light">Privacy by Architecture</Eyebrow>
              <h2
                id="privacy-heading"
                className="mt-6 text-balance text-4xl font-bold tracking-tight text-white lg:text-5xl"
              >
                Nothing collected. Nothing transmitted. No account.
              </h2>
              <p className="mt-6 max-w-prose text-lg leading-relaxed text-emerald-100/80">
                A sermon is not data to be shipped to a datacentre, and neither is a
                board meeting. Because every capability on this page runs on the
                device, there is no upload to intercept, no transcript held on a
                server and no record of who was listening.
              </p>

              <p className="mt-8 inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 text-base text-emerald-50 ring-1 ring-white/15">
                <ShieldIcon className="h-5 w-5 shrink-0 text-emerald-300" />
                Processed on your phone, start to finish.
              </p>
            </div>

            <ul className="reveal reveal-delay-1 space-y-4 lg:col-span-6 lg:col-start-7">
              {PRIVACY_POINTS.map((point) => (
                <li
                  key={point.title}
                  className="rounded-panel bg-white/5 p-6 ring-1 ring-white/10 sm:p-7"
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30">
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-white">
                        {point.title}
                      </h3>
                      <p className="mt-2 text-base leading-relaxed text-emerald-100/70">
                        {point.body}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
        d. BEYOND TRANSLATION — the companion capabilities.
      ------------------------------------------------------------------ */}
      <Section tone="white" aria-labelledby="companions-heading">
        <Container>
          <div className="reveal max-w-2xl">
            <Eyebrow>Beyond Translation</Eyebrow>
            <h2
              id="companions-heading"
              className="mt-5 text-balance text-4xl font-bold tracking-tight text-neutral-900 lg:text-5xl"
            >
              What sits around the sermon.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              Three smaller capabilities that belong to the same week as the
              translation, held to the same rule about your data.
            </p>
          </div>

          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {COMPANIONS.map((companion, index) => {
              const CompanionIcon = companion.icon

              return (
                <Card
                  key={companion.title}
                  as="li"
                  interactive
                  className={`reveal reveal-delay-${index + 1} p-8`}
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 text-emerald-300">
                    <CompanionIcon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight text-neutral-900">
                    {companion.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-neutral-600">
                    {companion.body}
                  </p>
                </Card>
              )
            })}
          </ul>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
        e. CLOSING CTA
      ------------------------------------------------------------------ */}
      <Section
        tone="dark"
        spacing="tight"
        className="overflow-hidden"
        aria-labelledby="features-cta-heading"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0">
          <div className="absolute -right-32 -top-32 h-[30rem] w-[30rem] rounded-full bg-emerald-700/25 blur-3xl" />
          <div className="absolute -bottom-40 -left-24 h-[26rem] w-[26rem] rounded-full bg-emerald-900/40 blur-3xl" />
        </div>

        <Container className="relative">
          <div className="reveal mx-auto max-w-3xl py-8 text-center sm:py-12">
            <Eyebrow tone="light" className="justify-center">
              Download Manaber
            </Eyebrow>
            <h2
              id="features-cta-heading"
              className="mt-6 text-balance text-4xl font-bold tracking-tight text-white lg:text-5xl"
            >
              Bring it to your next gathering.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-neutral-400">
              Free to download on iOS and Android. No account, no upload, nothing
              collected.
            </p>
            <StoreButtons
              tone="light"
              className="mt-9 items-center justify-center sm:flex-row"
            />
          </div>
        </Container>
      </Section>
    </>
  )
}
