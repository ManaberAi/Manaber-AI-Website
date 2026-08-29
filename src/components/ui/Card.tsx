import type { ReactNode } from 'react'

import cn from '@/lib/cn'

/**
 * A flat, sharp-cornered colour block. No radius, no shadow, no gradient.
 *
 * For anything carrying the speech-bubble tail, use `BubbleCard` instead —
 * this is the plain surface for content that sits inside a slab.
 */

type Tone =
  | 'white'
  | 'lavender'
  | 'periwinkle'
  | 'lime'
  | 'indigo'
  | 'slate'
  | 'black'
  | 'outline'
  /* Legacy names kept so pages restyled in a later phase keep compiling. */
  | 'raised'
  | 'plain'
  | 'dark'

type CardProps = {
  children: ReactNode
  className?: string
  /** A flat colour shift on hover — never a lift, never a shadow. */
  interactive?: boolean
  tone?: Tone
  as?: 'div' | 'li' | 'article'
}

const TONES: Record<Tone, string> = {
  white: 'bg-white text-ink',
  lavender: 'bg-lavender text-ink',
  periwinkle: 'bg-periwinkle text-ink',
  lime: 'bg-lime text-ink',
  indigo: 'bg-indigo text-white on-dark',
  slate: 'bg-slate text-white on-dark',
  black: 'bg-ink text-white on-dark',
  outline: 'bg-transparent text-ink border border-ink/15',
  /* Legacy aliases. */
  raised: 'bg-white text-ink border border-ink/12',
  plain: 'bg-lavender text-ink',
  dark: 'bg-ink text-white on-dark',
}

const INTERACTIVE: Partial<Record<Tone, string>> = {
  white: 'hover:bg-lavender',
  lavender: 'hover:bg-periwinkle',
  periwinkle: 'hover:bg-lime',
  lime: 'hover:bg-periwinkle',
  indigo: 'hover:bg-indigo-deep',
  slate: 'hover:bg-slate-deep',
  black: 'hover:bg-indigo',
  outline: 'hover:border-ink/40',
  raised: 'hover:bg-lavender',
  plain: 'hover:bg-periwinkle',
  dark: 'hover:bg-indigo',
}

export default function Card({
  children,
  className,
  interactive = false,
  tone = 'white',
  as = 'div',
}: CardProps) {
  const Tag = as

  return (
    <Tag
      className={cn(
        'relative rounded-none',
        TONES[tone],
        interactive && cn('transition-colors duration-200 ease-out-expo', INTERACTIVE[tone]),
        className,
      )}
    >
      {children}
    </Tag>
  )
}
