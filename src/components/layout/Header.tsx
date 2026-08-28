import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/', label: 'Home', end: true },
  { to: '/product', label: 'Product', end: false },
  { to: '/pricing', label: 'Pricing', end: false },
  { to: '/contact', label: 'Contact', end: false },
]

/**
 * TODO(design): Structural stub only. The Design Agent owns this surface and
 * is expected to rebuild the markup, wordmark treatment and nav styling.
 */
export default function Header() {
  return (
    <header data-testid="site-header">
      <nav aria-label="Primary" className="flex items-center gap-6 p-4">
        <NavLink to="/" data-testid="header-brand">
          Manaber
        </NavLink>
        <ul className="flex items-center gap-4">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                data-testid={`header-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
