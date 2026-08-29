import type { ReactNode } from 'react'

import cn from '@/lib/cn'

/**
 * Uppercase, letter-spaced label. Same face as the buttons — 13px, 0.1em
 * tracking, medium weight. No dot, no rule, no decoration by default.
 */

type Tone =
  | 'ink'
  | 'indigo'
  | 'lime'
  | 'lavender'
  | 'periwinkle'
  | 'muted'
  /* Legacy names kept so pages restyled in a later phase keep compiling. */
  | 'emerald'
  | 'neutral'
  | 'light'

type EyebrowProps = {
  children: ReactNode
  className?: string
  tone?: Tone
  /** Prefixes a small square mark in the current colour. Off by default. */
  withMark?: boolean
}

const TONES: Record<Tone, string> = {
  ink: 'text-ink',
  indigo: 'text-indigo',
  lime: 'text-lime',
  lavender: 'text-lavender',
  periwinkle: 'text-periwinkle',
  muted: 'text-ink/55',
  /* Legacy aliases. */
  emerald: 'text-indigo',
  neutral: 'text-ink/55',
  light: 'text-lime',
}

export default function Eyebrow({
  children,
  className,
  tone = 'indigo',
  withMark = false,
}: EyebrowProps) {
  return (
    <p className={cn('eyebrow', TONES[tone], className)}>
      {withMark ? (
        <span aria-hidden="true" className="inline-block h-2 w-2 bg-current" />
      ) : null}
      {children}
    </p>
  )
}
