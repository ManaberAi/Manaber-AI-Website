import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

import BubbleCard from '@/components/ui/BubbleCard'
import Card from '@/components/ui/Card'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import {
  CheckIcon,
  ChipIcon,
  CompassIcon,
  DownloadCloudIcon,
  MailIcon,
  MapPinIcon,
  ShieldIcon,
} from '@/components/ui/Icon'
import Section from '@/components/ui/Section'
import cn from '@/lib/cn'
import useReveal from '@/hooks/useReveal'
import { SITE } from '@/lib/site'

/* ---------------------------------------------------------------------------
 * Privacy
 *
 * On-device processing IS the product, so this page is written as a designed
 * document rather than a legal dump: a masthead carrying the thesis, an indigo
 * plain-English summary, then the policy itself on a white article surface set
 * at a 68ch measure with a sticky contents list beside it.
 *
 * Slabs: WHITE masthead → INDIGO summary → LAVENDER document → black footer.
 * The policy claims no compliance framework and no certification, because none
 * has been established. Nothing on this page is invented.
 * ------------------------------------------------------------------------ */

const LAST_UPDATED = 'August 2026'

/* --------------------------------------------------------------------------
 * Reading primitives — one measure, one rhythm, used by every section below.
 * ----------------------------------------------------------------------- */

function P({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-[68ch] text-lg leading-8 text-ink/70">{children}</p>
  )
}

function Points({ items }: { items: readonly string[] }) {
  return (
    <ul className="max-w-[68ch] space-y-4">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-4">
          <CheckIcon
            aria-hidden="true"
            className="mt-1.5 h-5 w-5 shrink-0 text-indigo"
            strokeWidth={2}
          />
          <span className="text-lg leading-8 text-ink/70">{item}</span>
        </li>
      ))}
    </ul>
  )
}

/* --------------------------------------------------------------------------
 * The policy itself. One array drives both the document and its contents
 * list, so the two can never drift apart.
 * ----------------------------------------------------------------------- */

type PolicySection = {
  id: string
  title: string
  body: ReactNode
}

const SECTIONS: readonly PolicySection[] = [
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    body: (
      <>
        <P>
          None. Manaber is designed not to collect, store or process any personal
          data from the people who use it. There is no profile behind the app and
          nothing about you is assembled while you use it.
        </P>
        <Points
          items={[
            'No account is required. Manaber does not ask you to sign up, and it does not ask for a name, an email address or a phone number.',
            'Sermon audio, translations and anything you type are never sent to an external server.',
            'Nothing you do in the app is gathered into a profile or a usage history.',
          ]}
        />
        <P>
          Because there is no collection step, there is also nothing for us to
          sell, share or hand on. The plainest version of this policy is that the
          data simply never arrives.
        </P>
      </>
    ),
  },
  {
    id: 'on-device-processing',
    title: 'On-Device Processing',
    body: (
      <>
        <P>
          Manaber listens, transcribes and translates on the phone itself. Speech
          processing happens on your device, which is what allows the app to work
          the way it does: what is said in the room stays in the room.
        </P>
        <P>
          Sermon audio, the translations produced from it, and any input you give
          the app are never transmitted to external servers. The microphone feed is
          used to produce the caption in front of you and is not uploaded anywhere.
        </P>
      </>
    ),
  },
  {
    id: 'local-storage',
    title: 'Local Storage & Offline Content',
    body: (
      <>
        <P>
          Sermons and transcripts you download are stored locally, on your own
          device, so they remain available offline — in prayer halls and venues
          where reception is unreliable, and afterwards when you want to revisit
          what was said.
        </P>
        <P>
          That content stays under your control. Because it lives in your phone’s
          local storage rather than on a server, removing it in the app or
          uninstalling Manaber removes it.
        </P>
      </>
    ),
  },
  {
    id: 'mosque-locator',
    title: 'Location and the Mosque Locator',
    body: (
      <>
        <P>
          The mosque locator draws on publicly available information about mosques
          to show you what is nearby. It does not track which mosques you visit,
          and it does not build a record of where you have been.
        </P>
        <P>
          Finding a place to pray should not cost you a movement history. The
          locator is a map feature, not a monitoring feature.
        </P>
      </>
    ),
  },
  {
    id: 'prayer-times-qibla',
    title: 'Prayer Times & Qibla',
    body: (
      <P>
        Prayer times and Qibla direction are calculated from your device’s own
        settings. These features are there to sit alongside the translation you
        came for, and they work without reporting anything about you.
      </P>
    ),
  },
  {
    id: 'third-party-services',
    title: 'Third-Party Services',
    body: (
      <>
        <P>
          Manaber does not send your audio, your transcripts or your inputs to any
          third-party service. Translation is not outsourced to a remote API — it
          happens on the device.
        </P>
        <P>
          Manaber is distributed through the Apple App Store and Google Play. Those
          stores handle the download itself under their own policies, which are set
          by Apple and Google rather than by us.
        </P>
      </>
    ),
  },
  {
    id: 'childrens-privacy',
    title: 'Children’s Privacy',
    body: (
      <P>
        Manaber does not collect personal data from anyone, and that includes
        children. There is no account to create and no information for a young
        user to hand over, so there is nothing for us to hold.
      </P>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    body: (
      <P>
        If the way the app handles data changes, this page will be updated and the
        date at the top of it will change with it. We would rather keep one honest
        page current than publish a longer one that stops being true.
      </P>
    ),
  },
  {
    id: 'contact',
    title: 'Contact Us',
    body: (
      <>
        <P>
          If you have a question about privacy, or about anything described on this
          page, write to us and a person will answer.
        </P>
        <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-10">
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex items-center gap-3 text-lg font-semibold text-ink underline decoration-ink/30 underline-offset-4 transition-colors duration-200 ease-out-expo hover:text-indigo hover:decoration-indigo"
          >
            <MailIcon aria-hidden="true" className="h-6 w-6 shrink-0" />
            {SITE.email}
          </a>
          <span className="inline-flex items-center gap-3 text-lg text-ink/70">
            <MapPinIcon aria-hidden="true" className="h-6 w-6 shrink-0 text-ink/40" />
            {SITE.name}, {SITE.location}
          </span>
        </div>
      </>
    ),
  },
]

const SUMMARY = [
  {
    icon: ShieldIcon,
    text: 'No personal data is collected. Manaber works without an account, so there is nothing to sign up for and no profile behind the app.',
  },
  {
    icon: ChipIcon,
    text: 'Speech is processed on your phone. Sermon audio, translations and anything you type are never sent to an external server.',
  },
  {
    icon: DownloadCloudIcon,
    text: 'Sermons and transcripts you download stay in local storage on your own device, available offline and under your control.',
  },
  {
    icon: CompassIcon,
    text: 'The mosque locator uses public information and never records which mosques you visit. Prayer times and Qibla come from your device’s own settings.',
  },
]

/* --------------------------------------------------------------------------
 * Page
 * ----------------------------------------------------------------------- */

export default function Privacy() {
  useReveal()

  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id)

  // Lightweight scroll-spy so the contents list tracks the reader.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const headings = SECTIONS.map((section) =>
      document.getElementById(section.id),
    ).filter((element): element is HTMLElement => element !== null)

    if (headings.length === 0) return

    // A callback only reports the sections whose intersection *changed*, so it
    // cannot be read as "what is on screen now". Track that separately, across
    // invocations, otherwise an exiting section leaves the marker stranded on
    // the heading the reader has already passed.
    const intersecting = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target.id)
          else intersecting.delete(entry.target.id)
        }

        // Topmost still-intersecting section, in document order.
        const active = headings.find((heading) => intersecting.has(heading.id))

        if (active) setActiveId(active.id)
      },
      { rootMargin: '-140px 0px -55% 0px', threshold: 0 },
    )

    headings.forEach((heading) => observer.observe(heading))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* ------------------------------------------------------------------
        a. MASTHEAD — white. Above the fold: nothing here carries `.reveal`,
        and the floating nav card needs `pt-36 sm:pt-44` of clearance.
      ------------------------------------------------------------------ */}
      <Section
        tone="white"
        spacing="none"
        className="pb-20 pt-36 sm:pb-24 sm:pt-44"
        aria-labelledby="privacy-title"
        data-testid="privacy-page"
      >
        <Container>
          <div className="grid grid-cols-12 gap-y-12">
            <div className="col-span-12 lg:col-span-7">
              <Eyebrow tone="indigo">Legal</Eyebrow>

              <h1
                id="privacy-title"
                className="mt-8 max-w-[12ch] text-balance font-display text-display-xl font-normal text-ink"
              >
                Privacy Policy
              </h1>

              <p className="mt-10 max-w-[38ch] text-xl font-bold leading-snug text-indigo">
                Privacy is not a section of this product. It is the reason it was
                built this way.
              </p>

              <p className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-label font-medium uppercase tracking-eyebrow text-ink/55">
                <span>Last updated {LAST_UPDATED}</span>
                <span aria-hidden="true" className="h-2 w-2 bg-ink/25" />
                <span>
                  {SITE.name}, {SITE.location}
                </span>
              </p>
            </div>

            {/* The page's thesis, carrying the signature tail. */}
            <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:self-end">
              <BubbleCard tone="periwinkle" tail="top-left" className="p-8 sm:p-9">
                <p className="font-display text-display-sm font-normal text-ink">
                  Nothing leaves the device. Not the audio, not a word of it.
                </p>
                <p className="mt-6 text-lg leading-relaxed text-ink">
                  Manaber processes everything on your phone, so there is very
                  little for a policy like this to describe — and that is the
                  point of it.
                </p>
              </BubbleCard>
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
        b. THE SHORT VERSION — indigo. The plain-English summary, and the part
        most people actually read.
      ------------------------------------------------------------------ */}
      <Section
        id="summary"
        tone="indigo"
        spacing="default"
        className="scroll-mt-28"
        aria-labelledby="privacy-summary-heading"
      >
        <Container>
          <div className="grid grid-cols-12 gap-y-14">
            <div className="reveal col-span-12 lg:col-span-4">
              <Eyebrow tone="lime">In plain English</Eyebrow>
              <h2
                id="privacy-summary-heading"
                className="mt-8 max-w-[12ch] text-balance font-display text-display-lg font-normal text-white"
              >
                The short version
              </h2>
              <p className="mt-8 max-w-[30ch] text-lg font-bold leading-snug text-lavender">
                Everything in the policy below is this, in more careful words.
              </p>
            </div>

            <ul className="reveal reveal-delay-1 col-span-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
              {SUMMARY.map(({ icon: Icon, text }) => (
                <li key={text}>
                  <span
                    aria-hidden="true"
                    className="inline-flex h-12 w-12 items-center justify-center bg-lime text-ink"
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <p className="mt-6 text-lg leading-relaxed text-lavender">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
        c. DOCUMENT — lavender ground, sticky contents list, white article
        surface at a 68ch measure. Closes with the tail motif at section scale
        handing off into the black footer.
      ------------------------------------------------------------------ */}
      <Section
        tone="lavender"
        spacing="none"
        className="pb-28 pt-20 sm:pb-32 sm:pt-24"
        aria-labelledby="privacy-document-heading"
      >
        <Container>
          <h2 id="privacy-document-heading" className="sr-only">
            The full privacy policy
          </h2>

          <div className="grid grid-cols-12 gap-y-12">
            {/* Contents — desktop only, follows the reader down the page. */}
            <aside className="col-span-12 hidden lg:col-span-4 lg:block">
              <nav aria-label="On this page" className="sticky top-32">
                <p className="eyebrow text-ink/55">On this page</p>
                <ul className="mt-6 border-l border-ink/20">
                  <li>
                    <a
                      href="#summary"
                      className="-ml-px block border-l-2 border-transparent py-2.5 pl-6 text-lg text-ink/70 transition-colors duration-200 ease-out-expo hover:border-ink/40 hover:text-ink"
                    >
                      The short version
                    </a>
                  </li>
                  {SECTIONS.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        aria-current={activeId === section.id ? 'true' : undefined}
                        className={cn(
                          '-ml-px block border-l-2 py-2.5 pl-6 text-lg transition-colors duration-200 ease-out-expo',
                          activeId === section.id
                            ? 'border-indigo font-bold text-indigo'
                            : 'border-transparent text-ink/70 hover:border-ink/40 hover:text-ink',
                        )}
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              <Card tone="white" as="article" className="p-6 sm:p-10 lg:p-12">
                {SECTIONS.map((section, index) => (
                  <section
                    key={section.id}
                    aria-labelledby={section.id}
                    className={cn(
                      // Section 1 is nearest the fold and paints immediately;
                      // the rest of the document reveals as it is reached.
                      index > 0 && 'reveal mt-16 border-t border-ink/15 pt-16',
                    )}
                  >
                    <h3
                      id={section.id}
                      className="scroll-mt-32 font-display text-display-sm font-normal text-ink"
                    >
                      {section.title}
                    </h3>
                    <div className="mt-8 space-y-8">{section.body}</div>
                  </section>
                ))}

                {/* Closing note. */}
                <div className="mt-16 bg-lavender p-6 sm:p-8">
                  <p className="max-w-[68ch] text-lg leading-8 text-ink">
                    This page describes how the Manaber app handles data. If
                    anything here is unclear, or you have a question we have not
                    answered, contact us at{' '}
                    <a
                      href={`mailto:${SITE.email}`}
                      className="font-bold text-indigo underline decoration-indigo/40 underline-offset-4 transition-colors duration-200 ease-out-expo hover:decoration-indigo"
                    >
                      {SITE.email}
                    </a>{' '}
                    and we will explain it properly.
                  </p>
                </div>
              </Card>

              <p className="mt-8">
                <a
                  href="#privacy-title"
                  className="inline-flex items-center gap-3 text-label font-medium uppercase tracking-eyebrow text-ink/70 transition-colors duration-200 ease-out-expo hover:text-indigo"
                >
                  <span aria-hidden="true">↑</span>
                  Back to top
                </a>
              </p>
            </div>
          </div>
        </Container>

        {/* The tail motif at section scale — a black wedge dropping out of the
            lavender into the black footer, aligned to the content shell's
            right edge rather than the viewport's. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0">
          <Container className="relative">
            <span className="section-notch absolute bottom-0 right-0 h-10 w-[7.5rem] bg-ink" />
          </Container>
        </div>
      </Section>
    </>
  )
}
