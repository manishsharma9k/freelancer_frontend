import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageLoader from './components/PageLoader'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import './index.css'

function AppInner() {
  const { pathname } = useLocation()
  const [loading, setLoading] = useState(true)
  const [currentPath, setCurrentPath] = useState(pathname)

  useEffect(() => {
    setLoading(true)

    const trackVisit = async () => {
      try {
        await fetch('http://localhost:5000/api/visit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page: pathname,
            source: 'website-visit',
          }),
        })
      } catch (error) {
        console.error('Visit tracking failed:', error)
      }
    }

    trackVisit()
  }, [pathname])

  const handleLoaderDone = useCallback(() => {
    setLoading(false)
    setCurrentPath(pathname)
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      {loading && <PageLoader onDone={handleLoaderDone} />}
      <div style={{ visibility: loading ? 'hidden' : 'visible' }}>
        <Navbar />
        <main className="site-shell">
          <Routes>
            <Route path="/"         element={<Home />} />
            <Route path="/about"    element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills"   element={<About />} />
            <Route path="/contact"  element={<Contact />} />
            <Route path="/login"    element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin"    element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
