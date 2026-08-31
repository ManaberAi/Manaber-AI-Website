import type { ReactNode } from 'react'

import BubbleCard from '@/components/ui/BubbleCard'
import Button from '@/components/ui/Button'
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
import useReveal from '@/hooks/useReveal'
import cn from '@/lib/cn'
import { LANGUAGES } from '@/lib/site'

/* ---------------------------------------------------------------------------
 * Local specimen panels.
 *
 * Every capability row is paired with a small composed illustration. These are
 * built from divs and hand-written inline SVG in the site's established style —
 * no image tags, no icon dependency. Anything that carries no information
 * beyond the prose beside it is hidden from assistive technology.
 *
 * The panels are WHITE on every band. The ground under them changes
 * (periwinkle → white → lavender) but the specimen treatment does not, so the
 * seven rows still read as one continuous sequence across the slab split. The
 * hairline is what defines the box on the white band; flat, zero radius, no
 * shadow and no gradient anywhere (design_planning.md §1, §3).
 * ------------------------------------------------------------------------ */

function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('border border-ink/15 bg-white p-6 sm:p-8', className)}>{children}</div>
  )
}

function PanelLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn('text-label font-medium uppercase tracking-eyebrow text-ink/55', className)}
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
        <span className="inline-flex items-center gap-2 text-label font-medium uppercase tracking-eyebrow text-indigo">
          <span aria-hidden="true" className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping bg-periwinkle opacity-60" />
            <span className="relative inline-flex h-2 w-2 bg-indigo" />
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
            className={cn('flex-1', index > 13 ? 'bg-indigo' : 'bg-periwinkle')}
          />
        ))}
      </div>

      <div aria-hidden="true" className="mt-8 space-y-4">
        <div className="flex items-center gap-4">
          <span className="w-20 shrink-0 text-label font-medium uppercase tracking-eyebrow text-ink/55">
            Heard
          </span>
          <span className="h-2 flex-1 bg-ink/15" />
        </div>
        <div className="flex items-center gap-4">
          <span className="w-20 shrink-0 text-label font-medium uppercase tracking-eyebrow text-indigo">
            Rendered
          </span>
          <span className="flex flex-1 items-center gap-2">
            <span className="h-2 w-[84%] bg-indigo" />
            <span className="h-4 w-0.5 animate-pulse bg-indigo" />
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
            <span className="inline-flex items-center bg-lavender px-4 py-2 text-lg text-ink">
              {language}
            </span>
          </li>
        ))}
        <li>
          <span className="inline-flex items-center bg-indigo px-4 py-2 text-lg font-medium text-white">
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
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center bg-periwinkle text-label font-medium text-ink"
            >
              {index + 1}
            </span>
            <span className="text-lg text-ink/70">{step}</span>
          </li>
        ))}
      </ol>
      <div className="mt-7 flex flex-wrap gap-2.5 border-t border-ink/15 pt-6">
        {['No account', 'No pairing', 'No hardware'].map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-2 bg-lavender px-3.5 py-1.5 text-lg text-ink"
          >
            <CheckIcon aria-hidden="true" className="h-4 w-4 text-indigo" />
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
          className={cn('aspect-square', index % 3 === 0 ? 'bg-indigo' : 'bg-periwinkle')}
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
          <p className="mt-4 text-lg text-ink">A study circle</p>
        </div>
        <div>
          <DotField count={80} columns="grid-cols-10" />
          <p className="mt-4 text-lg text-ink">A full hall</p>
        </div>
      </div>
      <p className="mt-7 border-t border-ink/15 pt-6 text-lg leading-relaxed text-ink/70">
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
            stroke="#2E0A78"
            strokeWidth={index === 0 ? 2.2 : 1.4}
            strokeLinecap="round"
            opacity={0.85 - index * 0.14}
          />
        ))}
        <circle cx="190" cy="26" r="6" fill="#2E0A78" />
        <path
          d="M178 14h24"
          stroke="#2E0A78"
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
        <div className="bg-lavender p-5">
          <p className="text-label font-medium uppercase tracking-eyebrow text-indigo">
            A sermon
          </p>
          <p className="mt-3 font-display text-display-sm font-normal leading-snug text-ink">
            Measured, formal, unhurried.
          </p>
        </div>
        <div className="bg-periwinkle p-5">
          <p className="text-label font-medium uppercase tracking-eyebrow text-indigo">
            A team briefing
          </p>
          <p className="mt-3 font-display text-display-sm font-normal leading-snug text-ink">
            Direct, plain, brisk.
          </p>
        </div>
      </div>
    </Panel>
  )
}

function Bar({ width, tone = 'muted' }: { width: number; tone?: 'muted' | 'accent' }) {
  return (
    <span
      style={{ width: `${width}px` }}
      className={cn('h-3', tone === 'accent' ? 'bg-indigo' : 'bg-ink/15')}
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
        <span className="inline-flex items-center gap-2 bg-lavender px-2.5 py-2">
          <Bar width={38} tone="accent" />
          <Bar width={26} tone="accent" />
          <Bar width={48} tone="accent" />
        </span>
        <Bar width={28} />
        <Bar width={60} />
        <Bar width={24} />
        <Bar width={44} />
      </div>
      <p className="mt-7 border-t border-ink/15 pt-6 text-lg leading-relaxed text-ink/70">
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

/* ---------------------------------------------------------------------------
 * ONE capability row, used by all three capability slabs.
 *
 * The seven rows are split across periwinkle → white → lavender grounds, but
 * the row itself is rendered from a single component and keyed on its GLOBAL
 * index, so the left/right alternation carries straight through the slab
 * boundaries. The ground colour changes; the rhythm of the rows does not
 * restart (design_planning.md §5.1).
 *
 * Body copy colour is the one thing that has to follow the ground: §1.1 only
 * approves `text-ink` on periwinkle and lavender, and `text-ink/70` on white.
 * ------------------------------------------------------------------------ */

type CapabilityGround = 'periwinkle' | 'white' | 'lavender'

const GROUND_BODY: Record<CapabilityGround, string> = {
  periwinkle: 'text-ink',
  white: 'text-ink/70',
  lavender: 'text-ink',
}

function CapabilityRow({
  capability,
  index,
  ground,
}: {
  capability: (typeof CAPABILITIES)[number]
  index: number
  ground: CapabilityGround
}) {
  const CapabilityIcon = capability.icon
  const CapabilityPanel = capability.panel
  const flipped = index % 2 === 1

  return (
    <li
      id={capability.id}
      className={cn(
        'grid scroll-mt-28 grid-cols-12 items-center gap-y-10',
        // The first row is inside the first viewport — it must paint at final
        // opacity rather than wait for the observer.
        index > 0 && 'reveal',
      )}
    >
      <div
        className={cn(
          'col-span-12 lg:col-span-6',
          flipped ? 'lg:order-2 lg:col-start-7' : 'lg:order-1 lg:col-start-1',
        )}
      >
        <div className="flex items-center gap-4">
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center bg-indigo text-white">
            <CapabilityIcon className="h-6 w-6" />
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-ink/15" />
          <span className="text-label font-medium uppercase tracking-eyebrow text-indigo">
            {String(index + 1).padStart(2, '0')} / 07
          </span>
        </div>

        <h3 className="mt-7 text-balance font-display text-display-md font-normal text-ink">
          {capability.title}
        </h3>
        <p className={cn('mt-5 max-w-prose text-lg leading-relaxed', GROUND_BODY[ground])}>
          {capability.body}
        </p>
      </div>

      <div
        className={cn(
          'col-span-12 lg:col-span-5',
          flipped ? 'lg:order-1 lg:col-start-1' : 'lg:order-2 lg:col-start-8',
        )}
      >
        <CapabilityPanel />
      </div>
    </li>
  )
}

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

/* Three flat fills, so the companion row carries colour across the white
 * ground. All three take black text (§1.1). */
const COMPANION_TONES = ['periwinkle', 'lavender', 'lime'] as const

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
        a. PAGE HEADER — white. Above the fold, so it carries no `.reveal`
           and paints at final opacity and position on first paint (§6).
      ------------------------------------------------------------------ */}
      <Section
        tone="white"
        spacing="none"
        data-testid="features-page"
        aria-labelledby="features-heading"
        className="pb-16 pt-36 sm:pb-20 sm:pt-44 lg:pb-24"
      >
        <Container>
          {/* Editorial masthead: headline left, standfirst set against it on the
              right so the upper half of the page is composed rather than empty.
              The same split is used on every interior page. */}
          <div className="grid grid-cols-12 gap-y-10 lg:items-end">
            <div className="col-span-12 lg:col-span-7">
              <Eyebrow tone="indigo">Features</Eyebrow>

              <h1
                id="features-heading"
                className="mt-8 text-balance font-display text-display-xl font-normal text-ink"
              >
                Live captions and translation,{' '}
                <span className="text-indigo">as the words are spoken</span>.
              </h1>
            </div>

            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <p className="max-w-prose text-lg leading-relaxed text-ink/70">
                Manaber listens, transcribes and translates entirely on the phone in
                your hand. What follows is what the app does in a live room — and the
                single architectural decision, on-device processing, that shapes every
                one of these capabilities.
              </p>

              {/* The bold indigo lead line — the signature of the language (§2.3). */}
              <p className="mt-8 flex items-start gap-3 text-lg font-bold leading-snug text-indigo">
                <ShieldIcon aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0" />
                <span>
                  Processed on the device itself. Nothing is ever uploaded.
                </span>
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
        b. CORE CAPABILITIES, BAND 1 of 3 — PERIWINKLE.
           The intro plus capabilities 01–03. The seven rows are banded across
           three grounds so the sequence is not one undifferentiated slab; the
           left/right alternation runs straight through the splits.
      ------------------------------------------------------------------ */}
      <Section tone="periwinkle" aria-labelledby="capabilities-heading">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow tone="indigo">Core Capabilities</Eyebrow>
            <h2
              id="capabilities-heading"
              className="mt-5 text-balance font-display text-display-lg font-normal text-ink"
            >
              Seven capabilities, one design decision.
            </h2>
            <p className="mt-8 max-w-[46ch] text-lg font-bold leading-snug text-indigo">
              Each of these follows from the same choice: the work happens on the
              device rather than in a datacentre somewhere else.
            </p>
          </div>

          <ul className="mt-16 space-y-20 lg:mt-20 lg:space-y-28">
            {CAPABILITIES.slice(0, 3).map((capability, index) => (
              <CapabilityRow
                key={capability.id}
                capability={capability}
                index={index}
                ground="periwinkle"
              />
            ))}
          </ul>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
        b2. CORE CAPABILITIES, BAND 2 of 3 — WHITE.
            Capabilities 04–05. The heading is visually hidden: the sequence
            does not restart here, but the section still needs its own
            accessible name to keep `aria-labelledby` honest.
      ------------------------------------------------------------------ */}
      <Section tone="white" aria-labelledby="capabilities-continued-heading">
        <Container>
          <h2 id="capabilities-continued-heading" className="sr-only">
            Core capabilities, four and five
          </h2>

          <ul className="space-y-20 lg:space-y-28">
            {CAPABILITIES.slice(3, 5).map((capability, index) => (
              <CapabilityRow
                key={capability.id}
                capability={capability}
                index={index + 3}
                ground="white"
              />
            ))}
          </ul>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
        b3. CORE CAPABILITIES, BAND 3 of 3 — LAVENDER.
            Capabilities 06–07, closing the sequence.
      ------------------------------------------------------------------ */}
      <Section tone="lavender" aria-labelledby="capabilities-close-heading">
        <Container>
          <h2 id="capabilities-close-heading" className="sr-only">
            Core capabilities, six and seven
          </h2>

          <ul className="space-y-20 lg:space-y-28">
            {CAPABILITIES.slice(5).map((capability, index) => (
              <CapabilityRow
                key={capability.id}
                capability={capability}
                index={index + 5}
                ground="lavender"
              />
            ))}
          </ul>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
        c. PRIVACY PANEL — the decision behind all seven.
      ------------------------------------------------------------------ */}
      <Section tone="black" aria-labelledby="privacy-heading">
        <Container>
          <div className="grid grid-cols-12 gap-y-14">
            <div className="reveal col-span-12 lg:col-span-5">
              <Eyebrow tone="lime">Privacy by Architecture</Eyebrow>
              <h2
                id="privacy-heading"
                className="mt-8 text-balance font-display text-display-lg font-normal text-white"
              >
                Nothing collected. Nothing transmitted. No account.
              </h2>
              <p className="mt-8 max-w-prose text-lg leading-relaxed text-lavender">
                A sermon is not data to be shipped to a datacentre, and neither is a
                board meeting. Because every capability on this page runs on the
                device, there is no upload to intercept, no transcript held on a
                server and no record of who was listening.
              </p>

              {/* The signature motif. No `overflow-hidden` and no `relative`
                  anywhere near it — the tail lives outside the box (§4.3). */}
              <BubbleCard tone="lime" tail="top-left" className="mt-14 p-6 sm:p-7">
                <p className="flex items-start gap-3 text-lg font-bold leading-snug text-ink">
                  <ShieldIcon aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0" />
                  <span>Processed on your phone, start to finish.</span>
                </p>
              </BubbleCard>
            </div>

            <ul className="reveal reveal-delay-1 col-span-12 space-y-4 lg:col-span-6 lg:col-start-7">
              {PRIVACY_POINTS.map((point) => (
                <Card key={point.title} as="li" tone="slate" className="p-6 sm:p-7">
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center bg-lime text-ink">
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="font-display text-display-xs font-normal text-white">
                        {point.title}
                      </h3>
                      <p className="mt-2.5 text-lg leading-relaxed text-white/80">
                        {point.body}
                      </p>
                    </div>
                  </div>
                </Card>
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
            <Eyebrow tone="indigo">Beyond Translation</Eyebrow>
            <h2
              id="companions-heading"
              className="mt-5 text-balance font-display text-display-lg font-normal text-ink"
            >
              What sits around the sermon.
            </h2>
            <p className="mt-8 max-w-[46ch] text-xl font-bold leading-snug text-indigo">
              Three smaller capabilities that belong to the same week as the
              translation, held to the same rule about your data.
            </p>
          </div>

          {/* Card grids are the one place a gap is used (§5), and the three
              fills carry the colour across the white ground. */}
          <ul className="mt-14 grid gap-4 md:grid-cols-3 lg:gap-5">
            {COMPANIONS.map((companion, index) => {
              const CompanionIcon = companion.icon

              return (
                <Card
                  key={companion.title}
                  as="li"
                  interactive
                  tone={COMPANION_TONES[index]}
                  className={`reveal reveal-delay-${index + 1} p-8`}
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center bg-ink text-lime">
                    <CompanionIcon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 font-display text-display-xs font-normal text-ink">
                    {companion.title}
                  </h3>
                  <p className="mt-3 text-lg leading-relaxed text-ink">{companion.body}</p>
                </Card>
              )
            })}
          </ul>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
        e. CLOSING CTA — INDIGO.
           Every page ends on the black footer, so the last slab before it must
           not itself be black (§5.1). This one used to be, which put two
           identical grounds back to back.
      ------------------------------------------------------------------ */}
      <Section tone="indigo" spacing="tight" aria-labelledby="features-cta-heading">
        <Container>
          <div className="reveal mx-auto max-w-3xl py-8 text-center sm:py-12">
            <Eyebrow tone="lime" className="justify-center">
              Talk to us
            </Eyebrow>
            <h2
              id="features-cta-heading"
              className="mt-8 text-balance font-display text-display-lg font-normal text-white"
            >
              Bring it to your next gathering.
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-lavender">
              Every word is translated on the device in the room. No account, no
              upload, nothing collected.
            </p>
            <Button as="link" to="/contact" variant="lime" size="lg" className="mt-10">
              Get in touch
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
