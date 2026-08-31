import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import BubbleCard from '@/components/ui/BubbleCard'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import {
  ArrowRightIcon,
  BookIcon,
  BriefcaseIcon,
  ChipIcon,
  GlobeIcon,
  MegaphoneIcon,
  MinbarIcon,
  PodiumIcon,
  ShieldIcon,
  UsersIcon,
  WaveformIcon,
} from '@/components/ui/Icon'
import Section from '@/components/ui/Section'
import useReveal from '@/hooks/useReveal'
import cn from '@/lib/cn'

/* -------------------------------------------------------------------------
 * Local composition helpers. These live in this file on purpose — the shared
 * primitives in src/components/ui are owned elsewhere and must not change.
 * ---------------------------------------------------------------------- */

/* Listed in the order the page reads, so the numbering a visitor sees runs
 * 01 … 06 straight down. */
const CONTENTS = [
  { id: 'friday-sermons', label: 'Friday Sermons' },
  { id: 'conferences', label: 'Conferences & Seminars' },
  { id: 'business-meetings', label: 'Business Meetings' },
  { id: 'educational-sessions', label: 'Educational Sessions' },
  { id: 'mosque-announcements', label: 'Mosque Announcements' },
  { id: 'team-meetings', label: 'Team Meetings' },
]

/**
 * Every id above is also a route: /use-cases#friday-sermons and
 * /solutions/friday-sermons are the same subject at two depths. The anchors on
 * this page stay exactly as they were — the detail link is added alongside them.
 */
function ReadMoreLink({ slug, label }: { slug: string; label: string }) {
  return (
    <Link
      to={`/solutions/${slug}`}
      className={cn(
        'group mt-8 inline-flex items-center gap-2.5 text-lg font-semibold text-indigo',
        'underline-offset-4 transition-colors duration-200 ease-out-expo hover:underline',
      )}
    >
      Read more about {label}
      <ArrowRightIcon
        aria-hidden="true"
        className="h-5 w-5 shrink-0 transition-transform duration-200 ease-out-expo group-hover:translate-x-1"
      />
    </Link>
  )
}

/**
 * Flat capability markers. The fill carries the contrast, so each one is set
 * against the ground it sits on rather than tinted — §1.1.
 */
type TagTone = 'white' | 'lavender' | 'lime'

const TAG_TONES: Record<TagTone, string> = {
  white: 'bg-white text-ink',
  lavender: 'bg-lavender text-ink',
  lime: 'bg-lime text-ink',
}

type TagProps = { children: ReactNode; tone?: TagTone }

/** Small capability marker sitting under a use-case heading. */
function Tag({ children, tone = 'lavender' }: TagProps) {
  return (
    <li>
      <span
        className={cn(
          'inline-flex items-center px-3.5 py-2 text-label font-medium uppercase tracking-eyebrow',
          TAG_TONES[tone],
        )}
      >
        {children}
      </span>
    </li>
  )
}

/**
 * The ground a block is sitting on. It decides the secondary-copy colour, the
 * capability-marker fill and the flat accent block behind the photograph —
 * every one of them a pairing from §1.1, never a tint.
 */
type BlockGround = 'periwinkle' | 'white' | 'lavender'

const BLOCK_GROUNDS: Record<BlockGround, { body: string; tag: TagTone; accent: string }> = {
  periwinkle: { body: 'text-ink', tag: 'white', accent: 'bg-lime' },
  white: { body: 'text-ink/70', tag: 'lavender', accent: 'bg-periwinkle' },
  lavender: { body: 'text-ink', tag: 'white', accent: 'bg-indigo' },
}

type BlockProps = {
  id: string
  index: string
  icon: ReactNode
  title: string
  /** The bold indigo lead line. Every slab carries one — §2.3. */
  lead: ReactNode
  children: ReactNode
  tags: string[]
  media: ReactNode
  ground: BlockGround
  /** Places the image on the left at lg and above. */
  reverse?: boolean
  /**
   * Above the fold: render at final opacity on first paint instead of waiting
   * for the shared IntersectionObserver.
   */
  eager?: boolean
}

/** One image + text use case. Alternates side by side at lg. */
function UseCaseBlock({
  id,
  index,
  icon,
  title,
  lead,
  children,
  tags,
  media,
  ground,
  reverse = false,
  eager = false,
}: BlockProps) {
  const headingId = id + '-heading'
  const revealMedia = eager ? '' : 'reveal '
  const revealText = eager ? '' : 'reveal reveal-delay-1 '
  const tone = BLOCK_GROUNDS[ground]

  return (
    <article id={id} aria-labelledby={headingId} className="scroll-mt-28">
      {/* A one-column gutter between the pair carries the spacing, so the grid
          takes no gap-x — §5. */}
      <div className="grid grid-cols-12 items-center gap-y-12">
        <div
          className={cn(
            revealMedia,
            'col-span-12 lg:col-span-6 lg:row-start-1',
            reverse ? 'order-2 lg:order-1 lg:col-start-1' : 'order-2 lg:order-2 lg:col-start-7',
          )}
        >
          {/* Flat colour block breaking out from behind the photograph. No
              glow, no blur — the block is the depth. */}
          <div className="relative">
            <span
              aria-hidden="true"
              className={cn(
                'absolute h-24 w-24 sm:h-32 sm:w-32',
                tone.accent,
                reverse ? '-bottom-5 -left-5' : '-bottom-5 -right-5',
              )}
            />
            <div className="relative">{media}</div>
          </div>
        </div>

        <div
          className={cn(
            revealText,
            'col-span-12 lg:col-span-5 lg:row-start-1',
            reverse ? 'order-1 lg:order-2 lg:col-start-8' : 'order-1 lg:order-1 lg:col-start-1',
          )}
        >
          <div className="flex items-center gap-4">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center bg-indigo text-lime">
              {icon}
            </span>
            <span
              aria-hidden="true"
              className="text-label font-medium uppercase tracking-eyebrow text-indigo"
            >
              {index}
            </span>
          </div>

          <h2
            id={headingId}
            className="mt-8 text-balance font-display text-display-lg font-normal text-ink"
          >
            {title}
          </h2>

          <p className="mt-8 max-w-[42ch] text-xl font-bold leading-snug text-indigo">{lead}</p>

          <div className={cn('mt-6 max-w-prose space-y-4 text-lg leading-relaxed', tone.body)}>
            {children}
          </div>

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {tags.map((tag) => (
              <Tag key={tag} tone={tone.tag}>
                {tag}
              </Tag>
            ))}
          </ul>

          <ReadMoreLink slug={id} label={title} />
        </div>
      </div>
    </article>
  )
}

export default function UseCases() {
  useReveal()

  return (
    <>
      {/* ------------------------------------------------------------------
        a. PAGE HEADER — above the fold, final opacity on first paint.
      ------------------------------------------------------------------ */}
      <Section
        tone="white"
        spacing="none"
        className="pb-16 pt-36 sm:pb-20 sm:pt-44"
        aria-labelledby="use-cases-title"
        data-testid="use-cases-page"
      >
        <Container>
          {/* Editorial masthead: headline left, standfirst set against it on the
              right so the upper half of the page is composed rather than empty.
              The same split is used on every interior page. */}
          <div className="grid grid-cols-12 gap-y-10 lg:items-end">
            <div className="col-span-12 lg:col-span-7">
              <Eyebrow tone="indigo">Use Cases</Eyebrow>

              <h1
                id="use-cases-title"
                className="mt-8 max-w-[18ch] text-balance font-display text-display-xl font-normal text-ink"
              >
                One room, many <span className="text-indigo">mother tongues</span>.
              </h1>
            </div>

            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <p className="max-w-prose text-lg leading-relaxed text-ink/70">
                Manaber solves a single problem, and it recurs in a great many rooms:
                people who are present, attentive and willing, and who cannot follow
                the language being spoken. Live translation and captioning run on each
                person&rsquo;s own phone, in more than 25 languages, with every step of
                the processing done on the device itself.
              </p>
            </div>
          </div>

          <nav aria-label="Use cases on this page" className="mt-12">
            <ul className="flex flex-wrap gap-2.5">
              {CONTENTS.map((item) => (
                <li key={item.id}>
                  <a
                    href={'#' + item.id}
                    className="inline-flex items-center bg-lavender px-4 py-2.5 text-lg text-ink transition-colors duration-200 ease-out-expo hover:bg-periwinkle"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="mt-12 grid gap-x-8 gap-y-6 border-t border-ink/15 pt-8 sm:grid-cols-3">
            <li className="flex items-start gap-3">
              <WaveformIcon aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-indigo" />
              <span className="text-lg leading-relaxed text-ink/70">
                Captioned and translated as it is spoken.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GlobeIcon aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-indigo" />
              <span className="text-lg leading-relaxed text-ink/70">
                More than 25 languages, chosen per listener.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldIcon aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-indigo" />
              <span className="text-lg leading-relaxed text-ink/70">
                Processed on the device. Nothing is uploaded.
              </span>
            </li>
          </ul>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
        b. FRIDAY SERMONS — the primary case.
      ------------------------------------------------------------------ */}
      <Section tone="periwinkle">
        <Container>
          <UseCaseBlock
            id="friday-sermons"
            eager
            ground="periwinkle"
            index="01 — The primary case"
            icon={<MinbarIcon className="h-6 w-6" />}
            title="Friday Sermons"
            tags={['Live translation', '25+ languages', 'On-device']}
            lead={
              <>
                In a great many congregations the khutbah is delivered in one language
                while the people listening hold a dozen between them. They attend every
                week, and every week they take away the tone of the sermon rather than
                its argument.
              </>
            }
            media={
              <picture data-ai-status="ready">
                <img
                  data-ai-id="usecase-friday-sermon"
                  src="https://app-5999.demo4.hubdesk.ai/api/studio/i/cover/1500x1125/i/enterprise/images-library/img_uzJElq0g-ojd4YY6.webp/img_uzJElq0g-ojd4YY6-1500x1125.webp"
                  alt="A spacious mosque prayer hall filled with soft natural daylight"
                  width={1024}
                  height={768}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
              </picture>
            }
          >
            <p>
              Manaber captions the khutbah as it is spoken and translates it live on
              each worshipper&rsquo;s own phone, in the language they read most easily.
              No receivers to hand out, no channel to tune, no second speaker talking
              over the first.
            </p>
            <p>
              Because the whole pipeline runs on the device, the words of the sermon
              are never sent anywhere, and a sermon that has been downloaded can be
              revisited later without a connection.
            </p>
          </UseCaseBlock>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
        c. CONFERENCES & SEMINARS
      ------------------------------------------------------------------ */}
      <Section tone="white">
        <Container>
          <UseCaseBlock
            id="conferences"
            index="02 — Public events"
            reverse
            ground="white"
            icon={<PodiumIcon className="h-6 w-6" />}
            title="Conferences & Seminars"
            tags={['Live captions', 'Offline access', 'No interpreter booth']}
            lead={
              <>
                An international audience is usually asked to choose between following
                the speaker and following the translation. One of the two always loses,
                and it is normally the part of the room that travelled furthest.
              </>
            }
            media={
              <picture data-ai-status="ready">
                <img
                  data-ai-id="usecase-conference"
                  src="https://app-5999.demo4.hubdesk.ai/api/studio/i/cover/1500x1125/i/enterprise/images-library/img_wrzRazbyt1sfh4-N.webp/img_wrzRazbyt1sfh4-N-1500x1125.webp"
                  alt="An attentive audience seated in a modern conference auditorium facing a lit stage"
                  width={1024}
                  height={768}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
              </picture>
            }
          >
            <p>
              With Manaber, each attendee reads live captions in their own language on
              the phone already in their hand, while the speaker keeps their natural
              pace and delivery. Nothing has to be booked, wired or staffed.
            </p>
            <p>
              Sessions downloaded in advance remain available afterwards, which matters
              in venues where the connection is the least reliable thing in the
              building.
            </p>
          </UseCaseBlock>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
        d. BUSINESS MEETINGS
      ------------------------------------------------------------------ */}
      <Section tone="lavender">
        <Container>
          <UseCaseBlock
            id="business-meetings"
            index="03 — Working sessions"
            ground="lavender"
            icon={<BriefcaseIcon className="h-6 w-6" />}
            title="Business Meetings"
            tags={['On-device', 'Nothing uploaded', 'Live translation']}
            lead={
              <>
                Cross-language discussion normally means slowing the room down for an
                interpreter, or accepting that part of the table is quietly guessing at
                the detail.
              </>
            }
            media={
              <picture data-ai-status="ready">
                <img
                  data-ai-id="usecase-business-meeting"
                  src="https://app-5999.demo4.hubdesk.ai/api/studio/i/cover/1500x1125/i/enterprise/images-library/img_9ighliM4Ji9At_o5.webp/img_9ighliM4Ji9At_o5-1500x1125.webp"
                  alt="A small diverse team seated around a light wood table in a bright meeting room"
                  width={1024}
                  height={768}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
              </picture>
            }
          >
            <p>
              Manaber puts live translation on each participant&rsquo;s phone, so the
              discussion keeps its own pace and everyone works from the same sentence
              rather than a summary of it.
            </p>
            <p>
              Because processing happens on the device and nothing is transmitted,
              commercially sensitive conversation stays in the room it was held in.
            </p>
          </UseCaseBlock>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
        e. EDUCATIONAL SESSIONS
      ------------------------------------------------------------------ */}
      <Section tone="white">
        <Container>
          <UseCaseBlock
            id="educational-sessions"
            index="04 — Teaching"
            reverse
            ground="white"
            icon={<BookIcon className="h-6 w-6" />}
            title="Educational Sessions"
            tags={['Live captions', 'Offline review', '25+ languages']}
            lead={
              <>
                In a class where students&rsquo; first languages differ, comprehension
                gaps compound quietly. A student spends the hour decoding vocabulary
                instead of following the argument, and the shortfall only shows up much
                later.
              </>
            }
            media={
              <picture data-ai-status="ready">
                <img
                  data-ai-id="usecase-education"
                  src="https://app-5999.demo4.hubdesk.ai/api/studio/i/cover/1500x1125/i/enterprise/images-library/img_avlprNCPNKu92iII.webp/img_avlprNCPNKu92iII-1500x1125.webp"
                  alt="Students seated in rows in a calm university lecture room lit by tall windows"
                  width={1024}
                  height={768}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
              </picture>
            }
          >
            <p>
              Live captioning and translation let each student read along in the
              language they think in, at the pace the lecturer is actually speaking.
            </p>
            <p>
              Sessions that have been downloaded can be revisited afterwards without a
              connection, which turns a single hearing into something a student can
              study.
            </p>
          </UseCaseBlock>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
        f. PAIRED CARDS — the two cases without imagery.
      ------------------------------------------------------------------ */}
      <Section tone="indigo" aria-labelledby="shorter-gatherings-heading">
        <Container>
          <div className="reveal max-w-[46ch]">
            <Eyebrow tone="lime">Shorter Gatherings</Eyebrow>
            <h2
              id="shorter-gatherings-heading"
              className="mt-6 text-balance font-display text-display-lg font-normal text-white"
            >
              The same problem, in smaller rooms.
            </h2>
            <p className="mt-8 text-xl font-bold leading-snug text-lavender">
              Not every gathering is an hour long. Brief, fast-moving sessions are often
              where a person is most likely to lose the thread — and least likely to ask
              anyone to repeat it.
            </p>
          </div>

          {/* Two cases of equal standing: equal width, equal fill, tops and
              bottoms aligned. The signature tail hangs off each one (§4.3). */}
          <ul className="mt-16 grid grid-cols-12 gap-y-10 lg:gap-x-5">
            <li id="mosque-announcements" className="col-span-12 scroll-mt-28 lg:col-span-6">
              <BubbleCard
                tone="lavender"
                tail="bottom-left"
                className="reveal reveal-delay-1 flex h-full flex-col p-8 transition-colors duration-200 ease-out-expo hover:bg-periwinkle sm:p-10"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center bg-indigo text-lime">
                  <MegaphoneIcon className="h-6 w-6" />
                </span>
                <p
                  aria-hidden="true"
                  className="mt-8 text-label font-medium uppercase tracking-eyebrow text-indigo"
                >
                  05 — Community notices
                </p>
                <h3 className="mt-4 font-display text-display-xs font-normal text-ink">
                  Mosque Announcements
                </h3>
                <div className="mt-5 max-w-prose space-y-4 text-lg leading-relaxed text-ink">
                  <p>
                    The notices given after prayer — a funeral, a new class, a change to
                    the timetable — are short, spoken once, and the most likely of all to
                    be missed by exactly the people they concern.
                  </p>
                  <p>
                    Live captioning carries them to everyone present in the language they
                    read, so a community announcement actually reaches the whole
                    community rather than the part of it that shares the speaker&rsquo;s
                    language.
                  </p>
                </div>
                <ul className="mt-8 flex flex-wrap gap-2.5">
                  <Tag tone="white">Live captions</Tag>
                  <Tag tone="white">25+ languages</Tag>
                </ul>

                <ReadMoreLink slug="mosque-announcements" label="Mosque Announcements" />
              </BubbleCard>
            </li>

            <li id="team-meetings" className="col-span-12 scroll-mt-28 lg:col-span-6">
              <BubbleCard
                tone="lavender"
                tail="bottom-left"
                className="reveal reveal-delay-2 flex h-full flex-col p-8 transition-colors duration-200 ease-out-expo hover:bg-periwinkle sm:p-10"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center bg-indigo text-lime">
                  <UsersIcon className="h-6 w-6" />
                </span>
                <p
                  aria-hidden="true"
                  className="mt-8 text-label font-medium uppercase tracking-eyebrow text-indigo"
                >
                  06 — Internal teams
                </p>
                <h3 className="mt-4 font-display text-display-xs font-normal text-ink">
                  Team Meetings
                </h3>
                <div className="mt-5 max-w-prose space-y-4 text-lg leading-relaxed text-ink">
                  <p>
                    Stand-ups, briefings and handovers are quick and full of assumed
                    context. On a multilingual team they are the easiest place for a
                    colleague to fall a step behind and stay there.
                  </p>
                  <p>
                    Manaber gives each person live translation on the phone already on
                    the table, and keeps the whole session on the device — which is what
                    makes it usable for internal work as well as public speaking.
                  </p>
                </div>
                <ul className="mt-8 flex flex-wrap gap-2.5">
                  <Tag tone="white">Live translation</Tag>
                  <Tag tone="white">On-device</Tag>
                </ul>

                <ReadMoreLink slug="team-meetings" label="Team Meetings" />
              </BubbleCard>
            </li>
          </ul>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
        g. THE COMMON GROUND
      ------------------------------------------------------------------ */}
      <Section tone="white" spacing="tight" aria-labelledby="common-ground-heading">
        <Container>
          <div className="reveal max-w-[40ch]">
            <Eyebrow tone="indigo">What Every Case Shares</Eyebrow>
            <h2
              id="common-ground-heading"
              className="mt-6 text-balance font-display text-display-lg font-normal text-ink"
            >
              Six rooms, one architecture.
            </h2>
          </div>

          {/* Four traits of equal standing — equal columns, aligned hairlines.
              The chip fill is what carries the colour across the row. */}
          <ul className="mt-16 grid grid-cols-12 gap-x-5 gap-y-12">
            <li className="reveal reveal-delay-1 col-span-12 border-t border-ink/15 pt-7 sm:col-span-6 lg:col-span-3">
              <span className="inline-flex h-12 w-12 items-center justify-center bg-periwinkle text-ink">
                <WaveformIcon aria-hidden="true" className="h-6 w-6" />
              </span>
              <h3 className="mt-6 font-display text-display-xs font-normal text-ink">
                Live, not afterwards
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-ink/70">
                Speech is captioned and translated while it is being spoken, so people
                follow the meaning in the moment.
              </p>
            </li>
            <li className="reveal reveal-delay-2 col-span-12 border-t border-ink/15 pt-7 sm:col-span-6 lg:col-span-3">
              <span className="inline-flex h-12 w-12 items-center justify-center bg-lavender text-ink">
                <GlobeIcon aria-hidden="true" className="h-6 w-6" />
              </span>
              <h3 className="mt-6 font-display text-display-xs font-normal text-ink">
                More than 25 languages
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-ink/70">
                Each listener chooses their own, so one speaker can be followed by a
                room that shares no single tongue.
              </p>
            </li>
            <li className="reveal reveal-delay-3 col-span-12 border-t border-ink/15 pt-7 sm:col-span-6 lg:col-span-3">
              <span className="inline-flex h-12 w-12 items-center justify-center bg-lime text-ink">
                <ChipIcon aria-hidden="true" className="h-6 w-6" />
              </span>
              <h3 className="mt-6 font-display text-display-xs font-normal text-ink">
                Processed on the phone
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-ink/70">
                Listening, transcription and translation all happen locally. Nothing is
                uploaded, so nothing can be retained.
              </p>
            </li>
            <li className="reveal reveal-delay-4 col-span-12 border-t border-ink/15 pt-7 sm:col-span-6 lg:col-span-3">
              <span className="inline-flex h-12 w-12 items-center justify-center bg-indigo text-lime">
                <ShieldIcon aria-hidden="true" className="h-6 w-6" />
              </span>
              <h3 className="mt-6 font-display text-display-xs font-normal text-ink">
                Available offline
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-ink/70">
                Downloaded content can be opened again later without a connection, in
                halls and venues where there is none.
              </p>
            </li>
          </ul>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
        h. CONTACT CTA
      ------------------------------------------------------------------ */}
      {/* Lime, not black: the page ends on the black footer, so the last slab
          before it must land on a change of ground — §5.1. Lime carries
          near-black text only. */}
      <Section tone="lime" spacing="tight" aria-labelledby="use-cases-cta-heading">
        <Container>
          <div className="reveal mx-auto max-w-3xl py-8 text-center sm:py-12">
            <Eyebrow tone="indigo" className="justify-center">
              Talk to us
            </Eyebrow>
            <h2
              id="use-cases-cta-heading"
              className="mt-6 text-balance font-display text-display-lg font-normal text-ink"
            >
              Whichever room you are in, everyone follows.
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-xl font-bold leading-snug text-indigo">
              Every word is translated on the device in the room. No account, no
              upload, nothing collected.
            </p>
            <Button as="link" to="/contact" variant="black" size="lg" className="mt-10">
              Get in touch
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
