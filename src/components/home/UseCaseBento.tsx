import BubbleCard from '@/components/ui/BubbleCard'
import Container from '@/components/ui/Container'
import { MegaphoneIcon, UsersIcon } from '@/components/ui/Icon'
import Section from '@/components/ui/Section'

/**
 * Black bento. Six real use cases in a mixed grid — four photographic cards
 * carrying an overlaid bubble, two flat colour cards carrying a line icon.
 *
 * Every card in a ROW shares one height class so rows align top and bottom.
 * The grid fills completely: 7+5 · 4+4+4 · 12.
 *
 * Text never sits directly on a photograph. It always rides an opaque bubble,
 * so contrast is a property of the fill, not of the frame behind it.
 */

const OVERLAY = 'absolute left-5 top-5 max-w-[85%] p-5 sm:left-6 sm:top-6 sm:p-6'

export default function UseCaseBento() {
  return (
    <Section tone="black" spacing="default" aria-labelledby="use-cases-heading">
      <Container>
        <div className="reveal mx-auto max-w-3xl text-center">
          <h2
            id="use-cases-heading"
            className="text-balance font-display text-display-lg font-normal text-white"
          >
            Wherever one language is spoken and many are understood.
          </h2>
          <p className="mt-6 text-xl font-bold leading-snug text-lavender">
            No interpreter booth. No equipment. No connection required.
          </p>
        </div>

        <ul className="mt-16 grid grid-cols-12 gap-4 lg:gap-5">
          {/* ── Row A · 7 + 5 ─────────────────────────────────────────── */}
          <li className="reveal col-span-12 h-[360px] overflow-hidden lg:col-span-7 lg:h-[420px]">
            <div className="relative h-full w-full">
              <picture data-ai-status="ready">
                <img
                  data-ai-id="usecase-friday-sermon"
                  src="https://app-5999.demo4.hubdesk.ai/api/studio/i/cover/1500x1125/i/enterprise/images-library/img_uzJElq0g-ojd4YY6.webp/img_uzJElq0g-ojd4YY6-1500x1125.webp"
                  alt="A mosque prayer hall lit by soft natural light"
                  width={1024}
                  height={768}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </picture>
              <BubbleCard tone="periwinkle" tail="bottom-left" className={OVERLAY}>
                <h3 className="font-display text-display-xs font-normal text-ink">
                  Friday Sermons
                </h3>
                <p className="mt-3 text-lg font-bold leading-snug text-indigo">
                  Worshippers who do not speak the khutbah language follow it line
                  by line, on their own phone, without disturbing the row beside
                  them.
                </p>
              </BubbleCard>
            </div>
          </li>

          <li className="reveal reveal-delay-1 col-span-12 h-[360px] overflow-hidden lg:col-span-5 lg:h-[420px]">
            <div className="relative h-full w-full">
              <picture data-ai-status="ready">
                <img
                  data-ai-id="usecase-conference"
                  src="https://app-5999.demo4.hubdesk.ai/api/studio/i/cover/1500x1125/i/enterprise/images-library/img_wrzRazbyt1sfh4-N.webp/img_wrzRazbyt1sfh4-N-1500x1125.webp"
                  alt="An audience seated in a modern conference auditorium"
                  width={1024}
                  height={768}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </picture>
              <BubbleCard tone="lavender" tail="bottom-left" className={OVERLAY}>
                <h3 className="font-display text-display-xs font-normal text-ink">
                  Conferences &amp; Seminars
                </h3>
                <p className="mt-3 text-lg font-bold leading-snug text-indigo">
                  Attendees read live captions in their own language while the
                  speaker keeps their natural pace.
                </p>
              </BubbleCard>
            </div>
          </li>

          {/* ── Row B · 4 + 4 + 4 ─────────────────────────────────────── */}
          <li className="reveal col-span-12 flex h-[320px] flex-col justify-between bg-slate p-6 sm:col-span-6 lg:col-span-4 lg:h-[340px]">
            <MegaphoneIcon aria-hidden="true" className="h-9 w-9 text-lavender" />
            <div>
              <h3 className="font-display text-display-xs font-normal text-white">
                Mosque Announcements
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-white/80">
                Community notices, appeals and event details reach every part of a
                congregation — not only the part that shares the speaker&rsquo;s
                language.
              </p>
            </div>
          </li>

          <li className="reveal reveal-delay-1 col-span-12 h-[320px] overflow-hidden sm:col-span-6 lg:col-span-4 lg:h-[340px]">
            <div className="relative h-full w-full">
              <picture data-ai-status="ready">
                <img
                  data-ai-id="usecase-business-meeting"
                  src="https://app-5999.demo4.hubdesk.ai/api/studio/i/cover/1500x1125/i/enterprise/images-library/img_9ighliM4Ji9At_o5.webp/img_9ighliM4Ji9At_o5-1500x1125.webp"
                  alt="A small diverse team meeting around a table in daylight"
                  width={1024}
                  height={768}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </picture>
              <BubbleCard tone="lime" tail="bottom-left" className={OVERLAY}>
                <h3 className="font-display text-display-xs font-normal text-ink">
                  Business Meetings
                </h3>
                <p className="mt-3 text-lg font-bold leading-snug text-ink">
                  Commercially sensitive work stays in the room, and on the phone.
                </p>
              </BubbleCard>
            </div>
          </li>

          <li className="reveal reveal-delay-2 col-span-12 flex h-[320px] flex-col justify-between bg-lavender p-6 sm:col-span-12 lg:col-span-4 lg:h-[340px]">
            <UsersIcon aria-hidden="true" className="h-9 w-9 text-indigo" />
            <div>
              <h3 className="font-display text-display-xs font-normal text-ink">
                Team Meetings
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-indigo">
                Smaller internal sessions — stand-ups, briefings, training — stay
                understandable to everyone at the table.
              </p>
            </div>
          </li>

          {/* ── Row C · 12 ────────────────────────────────────────────── */}
          <li className="reveal col-span-12 h-[320px] overflow-hidden lg:h-[340px]">
            <div className="relative h-full w-full">
              <picture data-ai-status="ready">
                <img
                  data-ai-id="usecase-education"
                  src="https://app-5999.demo4.hubdesk.ai/api/studio/i/cover/1500x1125/i/enterprise/images-library/img_avlprNCPNKu92iII.webp/img_avlprNCPNKu92iII-1500x1125.webp"
                  alt="Students seated in a calm university lecture room"
                  width={1024}
                  height={768}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-center"
                />
              </picture>
              <BubbleCard
                tone="periwinkle"
                tail="bottom-left"
                className="absolute left-5 top-5 max-w-[85%] p-5 sm:left-6 sm:top-6 sm:max-w-[26rem] sm:p-6"
              >
                <h3 className="font-display text-display-xs font-normal text-ink">
                  Educational Sessions
                </h3>
                <p className="mt-3 text-lg font-bold leading-snug text-indigo">
                  Students following a lecture in a second language keep up with the
                  argument instead of falling behind on vocabulary.
                </p>
              </BubbleCard>
            </div>
          </li>
        </ul>
      </Container>
    </Section>
  )
}
