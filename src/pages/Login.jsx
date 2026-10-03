import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Login failed')
      }

      localStorage.setItem('freelancer_token', data.token)
      localStorage.setItem('freelancer_user', JSON.stringify(data.user))

      if (data.user?.role === 'admin') {
        navigate('/admin')
        return
      }

      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <aside className="auth-brand-panel">
          <div className="auth-brand-wrap">
            <div className="auth-badge">
              <svg width="32" height="32" viewBox="0 0 160 120" fill="none" aria-hidden="true">
                <defs>
                  <linearGradient id="loginBrand" x1="18" y1="18" x2="132" y2="104" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#20c8ff" />
                    <stop offset="100%" stopColor="#0b78ff" />
                  </linearGradient>
                </defs>
                <path d="M18 84V28L48 62L78 26L108 84" stroke="#ffffff" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 82C37 28 72 14 102 42C117 58 130 69 144 72" stroke="url(#loginBrand)" strokeWidth="9" strokeLinecap="round" />
                <path d="M36 52C52 30 81 24 103 41C114 50 126 62 137 72" stroke="url(#loginBrand)" strokeWidth="9" strokeLinecap="round" opacity="0.9" />
              </svg>
              Freelancer Studio
            </div>
            <h1>Smart projects.<br />Clear communication.</h1>
            <p>
              Access your workspace, track projects, and manage clients from a single, professional dashboard.
            </p>
            <div className="auth-feature-grid">
              <div>
                <strong>120+</strong>
                <span>Projects shipped</span>
              </div>
              <div>
                <strong>4.9/5</strong>
                <span>Average rating</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>Client insights</span>
              </div>
            </div>
          </div>
        </aside>

        <div className="auth-card">
          <Link to="/" className="auth-logo">
            <svg width="58" height="58" viewBox="0 0 160 120" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="authLogo" x1="18" y1="18" x2="132" y2="104" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#20c8ff" />
                  <stop offset="100%" stopColor="#0b78ff" />
                </linearGradient>
              </defs>
              <path d="M18 84V28L48 62L78 26L108 84" stroke="#0f172a" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 82C37 28 72 14 102 42C117 58 130 69 144 72" stroke="url(#authLogo)" strokeWidth="9" strokeLinecap="round" />
              <path d="M36 52C52 30 81 24 103 41C114 50 126 62 137 72" stroke="url(#authLogo)" strokeWidth="9" strokeLinecap="round" opacity="0.9" />
            </svg>
          </Link>
          <h2>Welcome back</h2>
          <p className="auth-sub">Sign in to your account</p>
          {error && <p className="auth-error">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
            </div>
            <div className="form-row">
              <label className="checkbox-label">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>
            <button type="submit" className="btn-primary auth-btn" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-divider"><span>or continue with</span></div>
          <div className="social-auth">
            <button className="social-auth-btn">🌐 Google</button>
            <button className="social-auth-btn">🐙 GitHub</button>
          </div>
          <p className="auth-switch">Don't have an account? <Link to="/register">Sign up free</Link></p>
        </div>
      </div>
    </div>
  )
}
