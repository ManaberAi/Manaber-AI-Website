import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/** `decodeURIComponent` throws on malformed escapes — fall back to the raw id. */
function decodeId(raw: string) {
  try {
    return decodeURIComponent(raw)
  } catch {
    return raw
  }
}

/**
 * Resets scroll position on route change. Without this, navigating away from a
 * long page lands the next page mid-scroll.
 *
 * Hash links routed through `<Link>` (`/features#languages`) are handled here
 * too: React Router does no hash scrolling on client-side navigation, so we
 * resolve the target ourselves once the new page has painted. This covers the
 * link clicked from another page AND from the target page itself.
 *
 * Plain `<a href="#x">` anchors (Privacy TOC, Use Cases jump-nav) never reach
 * the router — clicking one does not fire popstate, so `useLocation` does not
 * update and this effect stays out of the browser's way.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const previousPathname = useRef<string | null>(null)
  const previousHash = useRef<string>('')

  useEffect(() => {
    const pathnameChanged = previousPathname.current !== pathname
    const hashChanged = previousHash.current !== hash

    previousPathname.current = pathname
    previousHash.current = hash

    // Nothing actually moved — a re-render, not a navigation.
    if (!pathnameChanged && !hashChanged) return

    if (hash) {
      // The target may belong to a page that has not been committed to the DOM
      // yet. Wait one frame, then scroll to it if it exists. No behaviour arg,
      // so it inherits `scroll-behavior` — which index.css already switches to
      // `auto` under `prefers-reduced-motion`.
      const frame = requestAnimationFrame(() => {
        document.getElementById(decodeId(hash.slice(1)))?.scrollIntoView()
      })
      return () => cancelAnimationFrame(frame)
    }

    // Reset to top only on a real route change, never when a hash is cleared
    // from the page the reader is already on.
    if (pathnameChanged) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, hash])

  return null
}
