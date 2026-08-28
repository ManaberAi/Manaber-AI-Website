import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <nav data-testid="main-nav">
        <NavLink to="/" data-testid="nav-home">Home</NavLink>
        <NavLink to="/about" data-testid="nav-about">About</NavLink>
        <NavLink to="/contact" data-testid="nav-contact">Contact</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
