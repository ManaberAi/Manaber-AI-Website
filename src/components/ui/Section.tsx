import type { ReactNode } from 'react'

import cn from '@/lib/cn'

/**
 * A full-bleed colour slab. Sections are separated by FLAT GROUND COLOUR and
 * whitespace — never by rules, shadows or gradients.
 *
 * Home alternates: white → dark → white → indigo → black → white → lavender
 * → black. Interior pages inherit that rhythm from the tones below.
 */

type Tone =
  | 'white'
  | 'black'
  | 'indigo'
  | 'lavender'
  | 'periwinkle'
  | 'lime'
  /* Legacy names kept so pages restyled in a later phase keep compiling. */
  | 'tint'
  | 'emerald'
  | 'dark'

type SectionProps = {
  children: ReactNode
  tone?: Tone
  id?: string
  className?: string
  /** Vertical rhythm on an 8pt grid. */
  spacing?: 'none' | 'tight' | 'default' | 'loose'
  'aria-labelledby'?: string
  'data-testid'?: string
}

const TONES: Record<Tone, string> = {
  white: 'bg-white text-ink',
  black: 'bg-ink text-white on-dark',
  indigo: 'bg-indigo text-white on-dark',
  lavender: 'bg-lavender text-ink',
  periwinkle: 'bg-periwinkle text-ink',
  lime: 'bg-lime text-ink',
  /* Legacy aliases. */
  tint: 'bg-lavender text-ink',
  emerald: 'bg-periwinkle text-ink',
  dark: 'bg-ink text-white on-dark',
}

const SPACING = {
  none: '',
  tight: 'py-16 sm:py-20',
  default: 'py-20 sm:py-24 lg:py-28',
  loose: 'py-24 sm:py-32 lg:py-36',
}

export default function Section({
  children,
  tone = 'white',
  id,
  className,
  spacing = 'default',
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={rest['aria-labelledby']}
      data-testid={rest['data-testid']}
      className={cn('relative w-full', TONES[tone], SPACING[spacing], className)}
    >
      {children}
    </section>
  )
}
