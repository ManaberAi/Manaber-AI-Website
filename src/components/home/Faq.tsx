import { useId, useState } from 'react'

import Container from '@/components/ui/Container'
import { PlusIcon } from '@/components/ui/Icon'
import cn from '@/lib/cn'

/**
 * FAQ on a full lavender ground: white sharp-cornered rows, serif questions,
 * a `+` that rotates 45° into a cross when the row opens.
 *
 * The section closes with a black wedge dropping out of its bottom edge — the
 * tail motif at section scale, handing off into the black footer.
 */

type FaqItem = {
  question: string
  answer: string
}

const ITEMS: FaqItem[] = [
  {
    question: 'Does any audio or text leave my phone?',
    answer:
      'No. Manaber runs its translation and captioning entirely on your device. Audio is never transmitted, transcripts are never uploaded, and no usage data is collected. What is said in the room stays in the room.',
  },
  {
    question: 'Which languages does Manaber support?',
    answer:
      'More than 25 languages, including Urdu, English, Arabic, Hindi, Bengali, Chinese, French, Pashto, Russian, Persian, German, Spanish, Malay, Korean and Japanese.',
  },
  {
    question: 'Do I need an account to use Manaber?',
    answer:
      'No. Manaber works without an account and is free to download on both iOS and Android. There is no sign-up step between you and the first translated sentence.',
  },
  {
    question: 'Can I use Manaber without a connection?',
    answer:
      'Yes. Because processing happens on the device, sermons you have downloaded remain available offline — useful in prayer halls and venues where reception is unreliable.',
  },
  {
    question: 'How does the mosque locator work?',
    answer:
      'The locator draws on publicly available information about mosques. It does not record, report or track which mosque you visit.',
  },
]

function FaqRow({ item, index, baseId }: { item: FaqItem; index: number; baseId: string }) {
  const [open, setOpen] = useState(false)
  const buttonId = `${baseId}-q-${index}`
  const panelId = `${baseId}-a-${index}`

  return (
    <li className="bg-white">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-start justify-between gap-6 px-6 py-6 text-left sm:px-8"
        >
          <span className="font-display text-display-xs font-normal text-ink">
            {item.question}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              'mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center',
              'text-indigo transition-transform duration-300 ease-out-expo',
              open && 'rotate-45',
            )}
          >
            <PlusIcon className="h-6 w-6" />
          </span>
        </button>
      </h3>

      <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open}>
        <p className="max-w-prose px-6 pb-7 text-lg leading-relaxed text-ink/70 sm:px-8">
          {item.answer}
        </p>
      </div>
    </li>
  )
}

export default function Faq() {
  const baseId = useId()

  return (
    <section
      data-testid="home-faq"
      aria-labelledby="faq-heading"
      className="relative bg-lavender pb-28 pt-20 sm:pb-32 sm:pt-24"
    >
      <Container>
        <div className="grid grid-cols-12 gap-y-12">
          <div className="reveal col-span-12 lg:col-span-4">
            <h2
              id="faq-heading"
              className="font-display text-display-lg font-normal text-ink"
            >
              FAQs
            </h2>
            <p className="mt-6 max-w-[30ch] text-lg font-bold leading-snug text-indigo">
              The questions congregations and organisers ask us first.
            </p>
          </div>

          <ul className="reveal reveal-delay-1 col-span-12 space-y-3 lg:col-span-7 lg:col-start-6">
            {ITEMS.map((item, index) => (
              <FaqRow key={item.question} item={item} index={index} baseId={baseId} />
            ))}
          </ul>
        </div>
      </Container>

      {/* Tail motif at section scale — drops out of the lavender into the
          black footer directly beneath. Aligned to the content shell's right
          edge rather than the viewport, so it reads as part of the layout. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0"
      >
        <Container className="relative">
          <span className="section-notch absolute bottom-0 right-0 h-10 w-[7.5rem] bg-ink" />
        </Container>
      </div>
    </section>
  )
}
