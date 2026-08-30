import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

import Container from '@/components/ui/Container'
import { CloseIcon, MenuIcon } from '@/components/ui/Icon'
import cn from '@/lib/cn'

/**
 * A floating WHITE CARD, sharp-cornered, sitting over the page rather than
 * spanning it. Logo left, links centre, the lime primary right. It never turns
 * translucent and never blurs — over a photographic hero it stays a solid white
 * block.
 */

const NAV_ITEMS = [
  { to: '/', label: 'Home', end: true },
  { to: '/features', label: 'Features', end: false },
  { to: '/use-cases', label: 'Use Cases', end: false },
  { to: '/contact', label: 'Contact', end: false },
]

function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      {/* Sharp black glyph with the tail notch cut out of it — the motif,
          shrunk to logo scale. */}
      <span
        aria-hidden="true"
        className="relative inline-flex h-7 w-7 items-center justify-center bg-ink"
      >
        <span
          className="absolute left-0 top-full h-2.5 w-2.5 bg-ink"
          style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
        />
        <span className="h-2 w-2 bg-lime" />
      </span>
      <span className="text-[1.3125rem] font-bold tracking-tight text-ink">Manaber</span>
    </span>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Close the drawer whenever the route changes. Derived during render rather
  // than in an effect, so the drawer never paints once on the new route first.
  const [lastPathname, setLastPathname] = useState(pathname)

  if (lastPathname !== pathname) {
    setLastPathname(pathname)
    if (open) setOpen(false)
  }

  // Escape closes the drawer; lock body scroll while it is open.
  useEffect(() => {
    if (!open) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      toggleRef.current?.focus()
    }

    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [open])

  return (
    <header
      data-testid="site-header"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-4 sm:pt-6"
    >
      <Container className="pointer-events-auto">
        <div className="bg-white shadow-lift ring-1 ring-ink/10">
          <nav
            aria-label="Primary"
            className="flex h-[4.25rem] items-center justify-between gap-6 px-5 sm:px-6"
          >
            <Link
              to="/"
              data-testid="header-brand"
              aria-label="Manaber — home"
              className="shrink-0"
            >
              <Wordmark />
            </Link>

            <ul className="hidden items-center gap-8 lg:flex">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    data-testid={`header-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    className={({ isActive }) =>
                      cn(
                        'inline-flex items-center whitespace-nowrap pb-1 text-[1.0625rem] leading-none transition-colors duration-200',
                        isActive
                          ? 'border-b-2 border-lime font-semibold text-ink'
                          : 'border-b-2 border-transparent text-ink/70 hover:text-ink',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="flex shrink-0 items-center gap-3">
              <Link
                to="/contact"
                className="hidden h-11 items-center justify-center border border-lime bg-lime px-5 text-label font-medium uppercase tracking-eyebrow text-ink transition-colors duration-200 hover:border-lime-deep hover:bg-lime-deep sm:inline-flex"
              >
                Get in touch
              </Link>

              <button
                ref={toggleRef}
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="inline-flex h-11 w-11 items-center justify-center border border-ink text-ink transition-colors hover:bg-ink hover:text-white lg:hidden"
              >
                {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
              </button>
            </div>
          </nav>

          {open ? (
            <div
              id="mobile-nav"
              className="animate-drawer-in border-t border-ink/10 px-5 pb-6 pt-4 sm:px-6 lg:hidden"
            >
              <ul className="flex flex-col">
                {NAV_ITEMS.map((item) => (
                  <li key={item.to} className="border-b border-ink/10 last:border-b-0">
                    <NavLink
                      to={item.to}
                      end={item.end}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center py-4 text-xl transition-colors',
                          isActive ? 'font-semibold text-ink' : 'text-ink/70 hover:text-ink',
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-3">
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-12 w-full items-center justify-center border border-lime bg-lime text-label font-medium uppercase tracking-eyebrow text-ink"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </header>
  )
}
