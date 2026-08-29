import type { ElementType, ReactNode } from 'react'

import cn from '@/lib/cn'

/**
 * THE SIGNATURE COMPONENT.
 *
 * A sharp-cornered flat colour block with a triangular speech-bubble tail
 * projecting off one corner, filled with the card's own colour. This motif is
 * what makes the visual language recognisable — every screen should carry at
 * least one.
 *
 * Geometry lives in `src/index.css` under `.bubble` (34 × 30px,
 * `clip-path: polygon(0 0, 100% 0, 0 100%)`, `background: inherit`). Because
 * the tail inherits the background it works with any fill without being told
 * which one — but it sits OUTSIDE the box, so a tailed card must never carry
 * `overflow-hidden`.
 */

export type BubbleTone =
  | 'periwinkle'
  | 'lavender'
  | 'lime'
  | 'indigo'
  | 'slate'
  | 'white'
  | 'black'

export type BubbleTail = 'top-left' | 'bottom-left' | 'none'

/** Fill + the text colour that clears 4.5:1 against it. */
const TONES: Record<BubbleTone, string> = {
  periwinkle: 'bg-periwinkle text-ink',
  lavender: 'bg-lavender text-ink',
  lime: 'bg-lime text-ink',
  indigo: 'bg-indigo text-white on-dark',
  slate: 'bg-slate text-white on-dark',
  white: 'bg-white text-ink',
  black: 'bg-ink text-white on-dark',
}

type BubbleCardProps = {
  children: ReactNode
  tone?: BubbleTone
  tail?: BubbleTail
  className?: string
  as?: ElementType
}

export default function BubbleCard({
  children,
  tone = 'periwinkle',
  tail = 'top-left',
  className,
  as,
}: BubbleCardProps) {
  const Tag = as ?? 'div'

  return (
    <Tag
      /*
       * No `relative` here on purpose. `.bubble` already sets
       * `position: relative` from the components layer, which a caller's
       * `absolute` utility can override — whereas a `relative` class listed
       * here would WIN over it (Tailwind emits `.relative` after `.absolute`,
       * and `cn` does not resolve conflicts), silently dropping every overlay
       * bubble back into flow.
       */
      className={cn('bubble rounded-none', TONES[tone], className)}
      data-tail={tail === 'none' ? undefined : tail}
    >
      {children}
    </Tag>
  )
}
