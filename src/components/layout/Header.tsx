import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

import SolutionsMenu from '@/components/layout/SolutionsMenu'
import Container from '@/components/ui/Container'
import { ChevronDownIcon, CloseIcon, MenuIcon } from '@/components/ui/Icon'
import cn from '@/lib/cn'
import { SOLUTIONS } from '@/lib/solutions'

/**
 * A floating WHITE CARD, sharp-cornered, sitting over the page rather than
 * spanning it. Logo left, links centre, the lime primary right. It never turns
 * translucent and never blurs — over a photographic hero it stays a solid white
 * block.
 *
 * The nav reads Home · Features · SOLUTIONS · Use Cases · Contact. Solutions is
 * a dropdown, so the flat items are split either side of it and the middle slot
 * is filled by `SolutionsMenu` (desktop) or the collapsible group in the drawer
 * (mobile). The card itself is `relative` because the desktop mega-menu panel
 * anchors to it rather than to its own list item.
 */

/* Left of the Solutions dropdown. */
const NAV_LEADING = [
  { to: '/', label: 'Home', end: true },
  { to: '/features', label: 'Features', end: false },
]

/* Right of the Solutions dropdown. */
const NAV_TRAILING = [
  { to: '/use-cases', label: 'Use Cases', end: false },
  { to: '/contact', label: 'Contact', end: false },
]

function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      {/* The real Manaber minaret mark, isolated from the supplied lockup.
          The lockup's own stacked wordmark is unreadable below ~190px tall, so
          the header pairs the mark with the site's typographic "Manaber"
          instead. `/manaber-logo.png` holds the full lockup for large use. */}
      <img
        src="/manaber-mark.png"
        alt=""
        aria-hidden="true"
        width={435}
        height={574}
        className="h-9 w-auto"
      />
      <span className="text-[1.3125rem] font-bold tracking-tight text-ink">Manaber</span>
    </span>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const { pathname } = useLocation()
  const toggleRef = useRef<HTMLButtonElement>(null)

  const onSolutionRoute = pathname.startsWith('/solutions')

  // Close the drawer whenever the route changes. Derived during render rather
  // than in an effect, so the drawer never paints once on the new route first.
  const [lastPathname, setLastPathname] = useState(pathname)

  if (lastPathname !== pathname) {
    setLastPathname(pathname)
    if (open) setOpen(false)
    if (solutionsOpen) setSolutionsOpen(false)
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
        {/* `relative`: the desktop Solutions panel is positioned against this
            card so it drops full-width beneath it. */}
        <div className="relative bg-white shadow-lift ring-1 ring-ink/10">
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
              {NAV_LEADING.map((item) => (
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

              <SolutionsMenu />

              {NAV_TRAILING.map((item) => (
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
                {NAV_LEADING.map((item) => (
                  <li key={item.to} className="border-b border-ink/10">
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

                {/* Collapsible Solutions group. Each link still closes the
                    drawer on click, so the drawer is gone before the new route
                    paints — do not remove that handler. */}
                <li className="border-b border-ink/10">
                  <button
                    type="button"
                    onClick={() => setSolutionsOpen((value) => !value)}
                    aria-expanded={solutionsOpen}
                    aria-controls="mobile-solutions"
                    className={cn(
                      'flex w-full items-center justify-between gap-4 py-4 text-xl transition-colors',
                      onSolutionRoute ? 'font-semibold text-ink' : 'text-ink/70 hover:text-ink',
                    )}
                  >
                    Solutions
                    <ChevronDownIcon
                      aria-hidden="true"
                      className={cn(
                        'h-5 w-5 shrink-0 transition-transform duration-200 ease-out-expo',
                        solutionsOpen && 'rotate-180',
                      )}
                    />
                  </button>

                  {solutionsOpen ? (
                    <ul id="mobile-solutions" className="pb-4 pl-5">
                      {SOLUTIONS.map((solution) => (
                        <li key={solution.slug}>
                          <NavLink
                            to={`/solutions/${solution.slug}`}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                              cn(
                                'flex items-center border-l-2 py-3 pl-4 text-lg transition-colors',
                                isActive
                                  ? 'border-lime font-semibold text-ink'
                                  : 'border-ink/10 text-ink/70 hover:border-ink/40 hover:text-ink',
                              )
                            }
                          >
                            {solution.navLabel}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>

                {NAV_TRAILING.map((item) => (
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
