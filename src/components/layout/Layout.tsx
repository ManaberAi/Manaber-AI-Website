import { Outlet } from 'react-router-dom'

import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'

/**
 * Shell that wraps every route. Structure only — the Design Agent owns
 * all spacing, colour and typography decisions on this surface.
 */
export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
