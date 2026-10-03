import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import './Navbar.css'

const navLinks = [
  { to: '/',         label: 'Home' },
  { to: '/about',    label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills',   label: 'Skills' },
  { to: '/contact',  label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('freelancer_user')
    return storedUser ? JSON.parse(storedUser) : null
  })
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  useEffect(() => {
    const storedUser = localStorage.getItem('freelancer_user')
    setUser(storedUser ? JSON.parse(storedUser) : null)
  }, [location.pathname])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">

        <Link to="/" className="brand">
          <span className="brand-mark"><Logo size={66} /></span>
          <span className="brand-text">
            <span className="brand-name">Manish</span>
            <span className="brand-role">Freelancer</span>
          </span>
        </Link>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`nav-link ${location.pathname === to ? 'active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          {user?.role === 'admin' ? (
            <Link to="/admin" className="btn-primary">
              <span>Dashboard</span>
            </Link>
          ) : (
            <Link to="/contact" className="btn-primary">
              <span>Hire Me</span>
            </Link>
          )}
        </div>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
