import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

import cn from '@/lib/cn'

/**
 * Sharp-cornered, uppercase, letter-spaced. No radius, no shadow, no gradient.
 * Lime is the primary CTA fill and always carries BLACK text.
 */

type Variant =
  | 'lime'
  | 'black'
  | 'white'
  | 'outline-dark'
  | 'outline-light'
  | 'outline-lime'
  /* Legacy names kept so pages restyled in a later phase keep compiling. */
  | 'primary'
  | 'secondary'
  | 'ghost'

type Size = 'md' | 'lg'

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-none border font-medium uppercase ' +
  'tracking-eyebrow transition duration-200 ease-out-expo focus-visible:outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-offset-2 ' +
  'disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap'

const VARIANTS: Record<Variant, string> = {
  lime: 'border-lime bg-lime text-ink hover:border-lime-deep hover:bg-lime-deep',
  black: 'border-ink bg-ink text-white hover:border-indigo hover:bg-indigo',
  white: 'border-white bg-white text-ink hover:border-lime hover:bg-lime',
  'outline-dark': 'border-ink bg-transparent text-ink hover:bg-ink hover:text-white',
  'outline-light':
    'border-white bg-transparent text-white hover:border-lime hover:bg-lime hover:text-ink',
  'outline-lime': 'border-lime bg-white text-ink hover:bg-lime',
  /* Legacy aliases. */
  primary: 'border-lime bg-lime text-ink hover:border-lime-deep hover:bg-lime-deep',
  secondary: 'border-ink bg-transparent text-ink hover:bg-ink hover:text-white',
  ghost: 'border-transparent bg-transparent text-ink hover:border-ink',
}

const SIZES: Record<Size, string> = {
  md: 'h-11 px-6 text-label',
  lg: 'h-14 px-8 text-label-lg',
}

type CommonProps = {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button'; to?: never; href?: never }

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string; to?: never }

type ButtonAsRoute = CommonProps & { as: 'link'; to: string; href?: never }

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsRoute

export default function Button(props: ButtonProps) {
  const { children, variant = 'lime', size = 'md', className } = props
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className)

  if (props.as === 'link') {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>
    )
  }

  if (props.as === 'a') {
    const { as: _as, children: _children, variant: _v, size: _s, className: _c, ...rest } = props
    void _as
    void _children
    void _v
    void _s
    void _c

    return (
      <a className={classes} {...rest}>
        {children}
      </a>
    )
  }

  const { as: _as, children: _children, variant: _v, size: _s, className: _c, ...rest } = props
  void _as
  void _children
  void _v
  void _s
  void _c

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
