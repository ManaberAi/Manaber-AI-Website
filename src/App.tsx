import { Route, Routes } from 'react-router-dom'

import ScrollToTop from '@/components/ScrollToTop'
import Layout from '@/components/layout/Layout'
import Contact from '@/pages/Contact'
import Features from '@/pages/Features'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import Privacy from '@/pages/Privacy'
import SolutionDetail from '@/pages/SolutionDetail'
import UseCases from '@/pages/UseCases'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="features" element={<Features />} />
          <Route path="use-cases" element={<UseCases />} />
          {/* One component, six entries in src/lib/solutions.ts. An unknown
              slug renders the site's own NotFound page rather than a blank. */}
          <Route path="solutions/:slug" element={<SolutionDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}
