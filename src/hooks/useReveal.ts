import { useEffect } from 'react'

/**
 * ONE shared IntersectionObserver for the whole document.
 *
 * Any element carrying the `.reveal` class (optionally with
 * `.reveal-delay-1` … `.reveal-delay-6` for staggering) fades and lifts into
 * place the first time it enters the viewport. Elements are unobserved once
 * revealed so nothing re-animates on scroll-back.
 *
 * IMPORTANT: this is for BELOW-the-fold content only. Above-the-fold markup
 * must render at final opacity/position on first paint — use the CSS
 * keyframe animations (`animate-rise-in`, `animate-fade-in`) there instead.
 */

const REVEALED = 'is-revealed'

let observer: IntersectionObserver | null = null
let subscribers = 0

function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === 'undefined') return null

  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add(REVEALED)
          observer?.unobserve(entry.target)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
  }

  return observer
}

function scan() {
  const io = getObserver()
  const nodes = document.querySelectorAll<HTMLElement>(`.reveal:not(.${REVEALED})`)

  if (!io) {
    // No IntersectionObserver support — show everything immediately.
    nodes.forEach((node) => node.classList.add(REVEALED))
    return
  }

  nodes.forEach((node) => {
    // Anything already in view on mount reveals on the observer's first
    // synchronous callback, so there is no flash of empty space.
    io.observe(node)
  })
}

export default function useReveal(): void {
  useEffect(() => {
    subscribers += 1

    // Run after paint so freshly-mounted children are in the DOM.
    const raf = requestAnimationFrame(scan)

    // Catch late-mounting content (route transitions, images settling).
    const settle = window.setTimeout(scan, 400)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(settle)
      subscribers -= 1

      if (subscribers <= 0) {
        observer?.disconnect()
        observer = null
        subscribers = 0
      }
    }
  }, [])
}
