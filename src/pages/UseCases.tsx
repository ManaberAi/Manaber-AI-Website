import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
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
      className="group mt-8 inline-flex items-center gap-2.5 text-lg font-semibold text-emerald-700 underline-offset-4 transition-colors duration-200 ease-out-expo hover:text-emerald-800 hover:underline"
    >
      Read more about {label}
      <ArrowRightIcon
        aria-hidden="true"
        className="h-5 w-5 shrink-0 transition-transform duration-200 ease-out-expo group-hover:translate-x-1"
      />
    </Link>
  )
}

type TagProps = { children: ReactNode }

/** Small capability marker sitting under a use-case heading. */
function Tag({ children }: TagProps) {
  return (
    <li>
      <span className="inline-flex items-center rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-eyebrow text-neutral-600 ring-1 ring-neutral-200">
        {children}
      </span>
    </li>
  )
}

type BlockProps = {
  id: string
  index: string
  icon: ReactNode
  title: string
  children: ReactNode
  tags: string[]
  media: ReactNode
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
  children,
  tags,
  media,
  reverse = false,
  eager = false,
}: BlockProps) {
  const headingId = id + '-heading'
  const revealMedia = eager ? '' : 'reveal '
  const revealText = eager ? '' : 'reveal reveal-delay-1 '

  return (
    <article id={id} aria-labelledby={headingId} className="scroll-mt-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div
          className={
            revealMedia + (reverse ? 'order-2 lg:order-1' : 'order-2 lg:order-2')
          }
        >
          <div className="relative">
            <div
              aria-hidden="true"
              className={
                'absolute -inset-5 -z-10 rounded-[2rem] blur-2xl ' +
                (reverse
                  ? 'bg-gradient-to-br from-emerald-300/35 to-transparent'
                  : 'bg-gradient-to-tr from-emerald-300/35 to-transparent')
              }
            />
            {media}
          </div>
        </div>

        <div
          className={
            revealText + (reverse ? 'order-1 lg:order-2' : 'order-1 lg:order-1')
          }
        >
          <div className="flex items-center gap-4">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
              {icon}
            </span>
            <span
              aria-hidden="true"
              className="text-xs font-semibold uppercase tracking-eyebrow text-neutral-500"
            >
              {index}
            </span>
          </div>

          <h2
            id={headingId}
            className="mt-6 text-balance text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl"
          >
            {title}
          </h2>

          <div className="mt-5 max-w-prose space-y-4 text-lg leading-relaxed text-neutral-600">
            {children}
          </div>

          <ul className="mt-7 flex flex-wrap gap-2.5">
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
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
      <section
        className="relative overflow-hidden bg-white pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pt-44"
        aria-labelledby="use-cases-title"
        data-testid="use-cases-page"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-40 -top-44 h-[36rem] w-[36rem] rounded-full bg-gradient-to-br from-emerald-200/50 via-emerald-100/30 to-transparent blur-3xl" />
          <div className="absolute -left-52 top-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-emerald-50 via-emerald-100/40 to-transparent blur-3xl" />
        </div>

        <Container>
          {/* Editorial masthead: headline left, standfirst set against it on the
              right so the upper half of the page is composed rather than empty.
              The same split is used on every interior page. */}
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <Eyebrow>Use Cases</Eyebrow>

              <h1
                id="use-cases-title"
                className="mt-6 text-balance text-5xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-6xl xl:text-7xl"
              >
                One room, many{' '}
                <span className="font-display font-normal italic text-emerald-700">
                  mother tongues
                </span>
                .
              </h1>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <p className="max-w-prose text-lg leading-relaxed text-neutral-600">
                Manaber solves a single problem, and it recurs in a great many rooms:
                people who are present, attentive and willing, and who cannot follow
                the language being spoken. Live translation and captioning run on each
                person&rsquo;s own phone, in more than 25 languages, with every step of
                the processing done on the device itself.
              </p>
            </div>
          </div>

          <nav aria-label="Use cases on this page" className="mt-10">
            <ul className="flex flex-wrap gap-2.5">
              {CONTENTS.map((item) => (
                <li key={item.id}>
                  <a
                    href={'#' + item.id}
                    className="inline-flex items-center rounded-full bg-white px-4 py-2 text-base text-neutral-700 ring-1 ring-neutral-200 transition duration-200 ease-out-expo hover:bg-neutral-50 hover:text-emerald-700 hover:ring-neutral-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="mt-12 grid gap-x-8 gap-y-6 border-t border-neutral-200 pt-8 sm:grid-cols-3">
            <li className="flex items-start gap-3">
              <WaveformIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <span className="text-base leading-relaxed text-neutral-600">
                Captioned and translated as it is spoken.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GlobeIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <span className="text-base leading-relaxed text-neutral-600">
                More than 25 languages, chosen per listener.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <span className="text-base leading-relaxed text-neutral-600">
                Processed on the device. Nothing is uploaded.
              </span>
            </li>
          </ul>
        </Container>
      </section>

      {/* ------------------------------------------------------------------
        b. FRIDAY SERMONS — the primary case.
      ------------------------------------------------------------------ */}
      <Section tone="tint">
        <Container>
          <UseCaseBlock
            id="friday-sermons"
            eager
            index="01 — The primary case"
            icon={<MinbarIcon className="h-6 w-6" />}
            title="Friday Sermons"
            tags={['Live translation', '25+ languages', 'On-device']}
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
                  className="aspect-[4/3] w-full rounded-panel object-cover shadow-frame ring-1 ring-neutral-900/5"
                />
              </picture>
            }
          >
            <p>
              In a great many congregations the khutbah is delivered in one language
              while the people listening hold a dozen between them. They attend every
              week, and every week they take away the tone of the sermon rather than
              its argument.
            </p>
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
            icon={<PodiumIcon className="h-6 w-6" />}
            title="Conferences & Seminars"
            tags={['Live captions', 'Offline access', 'No interpreter booth']}
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
                  className="aspect-[4/3] w-full rounded-panel object-cover shadow-frame ring-1 ring-neutral-900/5"
                />
              </picture>
            }
          >
            <p>
              An international audience is usually asked to choose between following
              the speaker and following the translation. One of the two always loses,
              and it is normally the part of the room that travelled furthest.
            </p>
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
      <Section tone="tint">
        <Container>
          <UseCaseBlock
            id="business-meetings"
            index="03 — Working sessions"
            icon={<BriefcaseIcon className="h-6 w-6" />}
            title="Business Meetings"
            tags={['On-device', 'Nothing uploaded', 'Live translation']}
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
                  className="aspect-[4/3] w-full rounded-panel object-cover shadow-frame ring-1 ring-neutral-900/5"
                />
              </picture>
            }
          >
            <p>
              Cross-language discussion normally means slowing the room down for an
              interpreter, or accepting that part of the table is quietly guessing at
              the detail.
            </p>
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
            icon={<BookIcon className="h-6 w-6" />}
            title="Educational Sessions"
            tags={['Live captions', 'Offline review', '25+ languages']}
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
                  className="aspect-[4/3] w-full rounded-panel object-cover shadow-frame ring-1 ring-neutral-900/5"
                />
              </picture>
            }
          >
            <p>
              In a class where students&rsquo; first languages differ, comprehension
              gaps compound quietly. A student spends the hour decoding vocabulary
              instead of following the argument, and the shortfall only shows up much
              later.
            </p>
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
      <Section tone="tint" aria-labelledby="shorter-gatherings-heading">
        <Container>
          <div className="reveal max-w-2xl">
            <Eyebrow>Shorter Gatherings</Eyebrow>
            <h2
              id="shorter-gatherings-heading"
              className="mt-5 text-balance text-4xl font-bold tracking-tight text-neutral-900 lg:text-5xl"
            >
              The same problem, in smaller rooms.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              Not every gathering is an hour long. Brief, fast-moving sessions are often
              where a person is most likely to lose the thread — and least likely to ask
              anyone to repeat it.
            </p>
          </div>

          <ul className="mt-14 grid gap-6 lg:grid-cols-2">
            <li id="mosque-announcements" className="scroll-mt-28">
              <Card interactive className="reveal reveal-delay-1 h-full p-8 sm:p-10">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 text-emerald-300">
                  <MegaphoneIcon className="h-6 w-6" />
                </span>
                <p
                  aria-hidden="true"
                  className="mt-6 text-xs font-semibold uppercase tracking-eyebrow text-neutral-500"
                >
                  05 — Community notices
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">
                  Mosque Announcements
                </h3>
                <div className="mt-4 max-w-prose space-y-4 text-lg leading-relaxed text-neutral-600">
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
                <ul className="mt-7 flex flex-wrap gap-2.5">
                  <Tag>Live captions</Tag>
                  <Tag>25+ languages</Tag>
                </ul>

                <ReadMoreLink slug="mosque-announcements" label="Mosque Announcements" />
              </Card>
            </li>

            <li id="team-meetings" className="scroll-mt-28">
              <Card interactive className="reveal reveal-delay-2 h-full p-8 sm:p-10">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 text-emerald-300">
                  <UsersIcon className="h-6 w-6" />
                </span>
                <p
                  aria-hidden="true"
                  className="mt-6 text-xs font-semibold uppercase tracking-eyebrow text-neutral-500"
                >
                  06 — Internal teams
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">
                  Team Meetings
                </h3>
                <div className="mt-4 max-w-prose space-y-4 text-lg leading-relaxed text-neutral-600">
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
                <ul className="mt-7 flex flex-wrap gap-2.5">
                  <Tag>Live translation</Tag>
                  <Tag>On-device</Tag>
                </ul>

                <ReadMoreLink slug="team-meetings" label="Team Meetings" />
              </Card>
            </li>
          </ul>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
        g. THE COMMON GROUND
      ------------------------------------------------------------------ */}
      <Section tone="white" spacing="tight" aria-labelledby="common-ground-heading">
        <Container>
          <div className="reveal max-w-2xl">
            <Eyebrow>What Every Case Shares</Eyebrow>
            <h2
              id="common-ground-heading"
              className="mt-5 text-balance text-4xl font-bold tracking-tight text-neutral-900 lg:text-5xl"
            >
              Six rooms, one architecture.
            </h2>
          </div>

          <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            <li className="reveal reveal-delay-1 border-t border-neutral-200 pt-7">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                <WaveformIcon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-neutral-900">
                Live, not afterwards
              </h3>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">
                Speech is captioned and translated while it is being spoken, so people
                follow the meaning in the moment.
              </p>
            </li>
            <li className="reveal reveal-delay-2 border-t border-neutral-200 pt-7">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                <GlobeIcon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-neutral-900">
                More than 25 languages
              </h3>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">
                Each listener chooses their own, so one speaker can be followed by a
                room that shares no single tongue.
              </p>
            </li>
            <li className="reveal reveal-delay-3 border-t border-neutral-200 pt-7">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                <ChipIcon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-neutral-900">
                Processed on the phone
              </h3>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">
                Listening, transcription and translation all happen locally. Nothing is
                uploaded, so nothing can be retained.
              </p>
            </li>
            <li className="reveal reveal-delay-4 border-t border-neutral-200 pt-7">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                <ShieldIcon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-neutral-900">
                Available offline
              </h3>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">
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
      <Section
        tone="dark"
        spacing="tight"
        className="overflow-hidden"
        aria-labelledby="use-cases-cta-heading"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0">
          <div className="absolute -right-32 -top-32 h-[30rem] w-[30rem] rounded-full bg-emerald-700/25 blur-3xl" />
          <div className="absolute -bottom-40 -left-24 h-[26rem] w-[26rem] rounded-full bg-emerald-900/40 blur-3xl" />
        </div>

        <Container className="relative">
          <div className="reveal mx-auto max-w-3xl py-8 text-center sm:py-12">
            <Eyebrow tone="light" className="justify-center">
              Talk to us
            </Eyebrow>
            <h2
              id="use-cases-cta-heading"
              className="mt-6 text-balance text-4xl font-bold tracking-tight text-white lg:text-5xl"
            >
              Whichever room you are in, everyone follows.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-neutral-400">
              Every word is translated on the device in the room. No account, no
              upload, nothing collected.
            </p>
            <Button as="link" to="/contact" variant="white" size="lg" className="mt-9">
              Get in touch
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
