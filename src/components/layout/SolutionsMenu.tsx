import type { FocusEvent as ReactFocusEvent, KeyboardEvent as ReactKeyboardEvent } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { ChevronDownIcon } from '@/components/ui/Icon'
import cn from '@/lib/cn'
import { SOLUTIONS } from '@/lib/solutions'

/* ---------------------------------------------------------------------------
 * The Solutions mega-menu (desktop only — the drawer in `Header` carries the
 * mobile equivalent).
 *
 * Renders as a single <li> inside the primary nav list. The panel itself is
 * absolutely positioned against the nav CARD, not against this <li>: the <li>
 * is deliberately left `static` so `inset-x-0 top-full` resolves to the card's
 * own box and the panel drops full-width beneath it.
 *
 * KEYBOARD CONTRACT — all of this is required, none of it optional:
 *   - trigger carries aria-expanded / aria-controls / aria-haspopup
 *   - ArrowDown / ArrowUp / Enter / Space on the trigger open the panel and
 *     move focus into it
 *   - ArrowDown / ArrowUp / Home / End move between panel items
 *   - Tab and Shift+Tab are trapped inside the panel while it is open
 *   - Escape closes and returns focus to the trigger
 *   - an outside click, a focus leaving the region, or a route change closes it
 *
 * The route-change close is derived during render rather than run in an
 * effect, so the panel can never paint once over the page it just navigated to.
 * ------------------------------------------------------------------------ */

/* The right-hand rail. Deliberately NOT a promo card: no discount, no trial,
 * nothing the site cannot honour. Just the two index pages. */
const RAIL_LINKS = [
  {
    to: '/features',
    label: 'All features',
    note: 'Everything the app does, and where it does it',
  },
  {
    to: '/use-cases',
    label: 'All use cases',
    note: 'The six rooms, side by side on one page',
  },
]

const ITEM_SELECTOR = 'a[data-menu-item]'

export default function SolutionsMenu() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const rootRef = useRef<HTMLLIElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  /* 'first' | 'last' | null — where focus should land once the panel paints.
   * A ref, not state: this is a one-shot instruction to the DOM, and putting it
   * in state would mean an extra render just to clear it again. */
  const pendingFocus = useRef<'first' | 'last' | null>(null)

  const onSolutionRoute = pathname.startsWith('/solutions')

  // Close on route change, derived during render — never a frame late.
  const [lastPathname, setLastPathname] = useState(pathname)

  if (lastPathname !== pathname) {
    setLastPathname(pathname)
    if (open) setOpen(false)
  }

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current === null) return
    clearTimeout(closeTimer.current)
    closeTimer.current = null
  }, [])

  const close = useCallback(
    (returnFocus: boolean) => {
      clearCloseTimer()
      setOpen(false)
      pendingFocus.current = null
      if (returnFocus) triggerRef.current?.focus()
    },
    [clearCloseTimer],
  )

  const items = useCallback(
    () => Array.from(panelRef.current?.querySelectorAll<HTMLAnchorElement>(ITEM_SELECTOR) ?? []),
    [],
  )

  const focusItem = useCallback(
    (offset: number, from?: HTMLElement) => {
      const list = items()
      if (list.length === 0) return

      const current = from ?? (document.activeElement as HTMLElement | null)
      const index = current ? list.indexOf(current as HTMLAnchorElement) : -1
      const next = (index + offset + list.length) % list.length
      list[next]?.focus()
    },
    [items],
  )

  // Move focus into the panel once it has actually rendered.
  useEffect(() => {
    const wanted = pendingFocus.current
    pendingFocus.current = null

    if (!open || !wanted) return

    const list = items()
    const target = wanted === 'first' ? list[0] : list[list.length - 1]
    target?.focus()
  }, [open, items])

  // An outside click dismisses the panel without stealing focus back.
  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null
      if (target && rootRef.current?.contains(target)) return
      close(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown)

    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
    }
  }, [open, close])

  useEffect(() => clearCloseTimer, [clearCloseTimer])

  const openMenu = (focus: 'first' | 'last' | null = null) => {
    clearCloseTimer()
    if (focus) pendingFocus.current = focus
    setOpen(true)
  }

  /* Pointer users get a small grace period so the cursor can cross the gap
   * between the trigger and the panel without the menu snapping shut. */
  const scheduleClose = () => {
    clearCloseTimer()
    closeTimer.current = setTimeout(() => {
      closeTimer.current = null
      setOpen(false)
    }, 140)
  }

  const onTriggerKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      openMenu('first')
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      openMenu('last')
      return
    }

    if (event.key === 'Escape' && open) {
      event.preventDefault()
      close(true)
    }
  }

  const onPanelKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'Escape':
        event.preventDefault()
        close(true)
        break
      case 'ArrowDown':
        event.preventDefault()
        focusItem(1)
        break
      case 'ArrowUp':
        event.preventDefault()
        focusItem(-1)
        break
      case 'Home': {
        event.preventDefault()
        items()[0]?.focus()
        break
      }
      case 'End': {
        event.preventDefault()
        const list = items()
        list[list.length - 1]?.focus()
        break
      }
      case 'Tab':
        // Focus is trapped: Tab cycles the panel rather than escaping it.
        event.preventDefault()
        focusItem(event.shiftKey ? -1 : 1)
        break
      default:
        break
    }
  }

  // Focus leaving the whole region (a click elsewhere, an assistive-tech jump)
  // closes the panel, but never steals focus back to the trigger.
  const onBlurCapture = (event: ReactFocusEvent<HTMLLIElement>) => {
    const next = event.relatedTarget as Node | null
    if (next && rootRef.current?.contains(next)) return
    if (!open) return
    clearCloseTimer()
    setOpen(false)
  }

  return (
    <li
      ref={rootRef}
      onMouseEnter={() => openMenu()}
      onMouseLeave={scheduleClose}
      onBlur={onBlurCapture}
    >
      <button
        ref={triggerRef}
        type="button"
        id="solutions-trigger"
        aria-expanded={open}
        aria-controls="solutions-menu"
        aria-haspopup="true"
        onClick={() => (open ? close(false) : openMenu())}
        onKeyDown={onTriggerKeyDown}
        data-testid="header-nav-solutions"
        className={cn(
          'inline-flex items-center gap-1.5 whitespace-nowrap border-b-2 pb-1',
          'text-[1.0625rem] leading-none transition-colors duration-200',
          onSolutionRoute || open
            ? 'border-lime font-semibold text-ink'
            : 'border-transparent text-ink/70 hover:text-ink',
        )}
      >
        Solutions
        <ChevronDownIcon
          aria-hidden="true"
          className={cn(
            'h-4 w-4 transition-transform duration-200 ease-out-expo',
            open && 'rotate-180',
          )}
        />
      </button>

      {open ? (
        <div
          ref={panelRef}
          id="solutions-menu"
          role="group"
          aria-labelledby="solutions-trigger"
          data-testid="solutions-menu"
          onKeyDown={onPanelKeyDown}
          onMouseEnter={clearCloseTimer}
          onMouseLeave={scheduleClose}
          /* Positioned against the nav CARD, not this <li>. The card is the
             nearest positioned ancestor, so this drops full-width below it. */
          className="absolute inset-x-0 top-full z-10 mt-3 hidden animate-drawer-in bg-white shadow-lift ring-1 ring-ink/10 lg:block"
        >
          <div className="grid grid-cols-12 gap-x-8 gap-y-8 p-6 xl:p-8">
            <div className="col-span-8">
              <p className="eyebrow text-ink/55">Solutions</p>

              <ul className="mt-5 grid grid-cols-2 gap-x-4">
                {SOLUTIONS.map((solution) => {
                  const SolutionIcon = solution.navIcon

                  return (
                    <li key={solution.slug}>
                      <NavLink
                        to={`/solutions/${solution.slug}`}
                        data-menu-item=""
                        onClick={() => close(false)}
                        className={({ isActive }) =>
                          cn(
                            'group flex gap-4 p-3 transition-colors duration-200 ease-out-expo',
                            isActive ? 'bg-lavender' : 'hover:bg-lavender',
                          )
                        }
                      >
                        <SolutionIcon
                          aria-hidden="true"
                          className="mt-0.5 h-6 w-6 shrink-0 text-indigo"
                        />
                        <span className="block">
                          <span className="block text-lg font-semibold leading-snug text-ink">
                            {solution.navLabel}
                          </span>
                          <span className="mt-1 block text-lg leading-snug text-ink/70">
                            {solution.navDescription}
                          </span>
                        </span>
                      </NavLink>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Right rail — the two index pages, nothing promotional. */}
            <div className="col-span-4 bg-lavender p-6">
              <p className="eyebrow text-indigo">Across the site</p>

              <ul className="mt-5">
                {RAIL_LINKS.map((link) => (
                  <li key={link.to} className="border-t border-indigo/20 first:border-t-0">
                    <NavLink
                      to={link.to}
                      data-menu-item=""
                      onClick={() => close(false)}
                      className="group block py-4 first:pt-0"
                    >
                      <span className="block text-lg font-semibold text-ink transition-colors duration-200 ease-out-expo group-hover:text-indigo">
                        {link.label}
                      </span>
                      <span className="mt-1 block text-lg leading-snug text-indigo">
                        {link.note}
                      </span>
                    </NavLink>
                  </li>
                ))}
              </ul>

              <p className="mt-6 border-t border-indigo/20 pt-5 text-lg leading-snug text-indigo">
                Every room, one architecture: processed on the device, nothing uploaded.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </li>
  )
}
