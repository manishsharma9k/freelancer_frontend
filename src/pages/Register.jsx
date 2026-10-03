import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'client' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Registration failed')
      }

      navigate('/login')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-logo">
          <span>Free</span><span>Lance</span><span className="dot">.</span>
        </Link>
        <h1>Create your account</h1>
        <p className="auth-sub">Join thousands of freelancers and clients</p>
        {error && <p className="auth-error">{error}</p>}
        <div className="role-toggle">
          <button className={form.role === 'client' ? 'active' : ''} onClick={() => setForm({...form, role:'client'})}>I'm a Client</button>
          <button className={form.role === 'seller' ? 'active' : ''} onClick={() => setForm({...form, role:'seller'})}>I'm a Freelancer</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Min 8 characters" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
          </div>
          <button type="submit" className="btn-primary auth-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
          <p className="terms-text">By joining, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></p>
        </form>
        <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
      </div>
    </div>
  )
}
