import type { ReactNode } from 'react'

import { AppleGlyph, PlayGlyph } from '@/components/ui/Icon'
import cn from '@/lib/cn'
import { SITE } from '@/lib/site'

/** Sharp-cornered store buttons pointing at Manaber's real listings. */

type Tone =
  | 'black'
  | 'lime'
  | 'white'
  | 'outline-light'
  | 'outline-dark'
  /* Legacy names kept so pages restyled in a later phase keep compiling. */
  | 'dark'
  | 'light'
  | 'outline'

const TONES: Record<Tone, string> = {
  black: 'border-ink bg-ink text-white hover:border-indigo hover:bg-indigo',
  lime: 'border-lime bg-lime text-ink hover:border-lime-deep hover:bg-lime-deep',
  white: 'border-white bg-white text-ink hover:border-lime hover:bg-lime',
  'outline-light':
    'border-white/40 bg-transparent text-white hover:border-lime hover:text-lime',
  'outline-dark': 'border-ink/25 bg-transparent text-ink hover:border-ink',
  /* Legacy aliases. */
  dark: 'border-ink bg-ink text-white hover:border-indigo hover:bg-indigo',
  light: 'border-white bg-white text-ink hover:border-lime hover:bg-lime',
  outline: 'border-white/40 bg-transparent text-white hover:border-lime hover:text-lime',
}

type StoreButtonProps = {
  href: string
  label: string
  sub: string
  tone: Tone
  children: ReactNode
  className?: string
}

function StoreButton({ href, label, sub, tone, children, className }: StoreButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} — ${sub}`}
      className={cn(
        'group inline-flex h-14 items-center gap-3 rounded-none border px-5',
        'transition-colors duration-200 ease-out-expo',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        TONES[tone],
        className,
      )}
    >
      <span className="shrink-0">{children}</span>
      <span className="flex flex-col items-start leading-none">
        <span className="text-label uppercase opacity-70">{sub}</span>
        <span className="mt-1.5 text-[1.0625rem] font-semibold tracking-tight">
          {label}
        </span>
      </span>
    </a>
  )
}

export default function StoreButtons({
  tone = 'black',
  className,
}: {
  tone?: Tone
  className?: string
}) {
  /* The pair always reads as one unit: identical fill, never one of each. */
  return (
    <div className={cn('flex flex-col gap-3 sm:flex-row sm:flex-wrap', className)}>
      <StoreButton
        href={SITE.appStoreUrl}
        label="App Store"
        sub="Download on the"
        tone={tone}
      >
        <AppleGlyph className="h-6 w-6" />
      </StoreButton>
      <StoreButton
        href={SITE.googlePlayUrl}
        label="Google Play"
        sub="Get it on"
        tone={tone}
      >
        <PlayGlyph className="h-6 w-6" />
      </StoreButton>
    </div>
  )
}
