import { useEffect, useRef, useState } from 'react'
import { Mail, Phone, MapPin, Clock, X, Share2, GitBranch, Play, Send, CheckCircle, ArrowRight } from 'lucide-react'
import './Contact.css'

const contactInfo = [
  { Icon: Mail,    label: 'Email',        value: 'hello@freelance.dev',    link: 'mailto:hello@freelance.dev' },
  { Icon: Phone,   label: 'Phone',        value: '+1 (555) 000-0000',      link: 'tel:+15550000000' },
  { Icon: MapPin,  label: 'Location',     value: 'San Francisco, CA',      link: '#' },
  { Icon: Clock,   label: 'Availability', value: 'Mon–Fri, 9am–6pm PST',  link: '#' },
]

const socials = [
  { Icon: X,         label: 'Twitter'  },
  { Icon: Share2,    label: 'LinkedIn' },
  { Icon: GitBranch, label: 'GitHub'   },
  { Icon: Play,      label: 'YouTube'  },
]

const services = ['Web Development', 'UI/UX Design', 'Mobile App', 'SEO & Marketing', 'Brand Identity', 'Other']

export default function Contact() {
  const pageRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', service: '', budget: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    pageRef.current?.querySelectorAll('[data-animate]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          page: 'contact',
          source: 'website-contact-form',
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to send message')
      }

      setSent(true)
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="contact-page" ref={pageRef}>

      {/* ── Hero ── */}
      <section className="contact-hero">
        <div className="contact-hero-blob" />
        <div className="container">
          <span className="section-tag animate-fadeInUp">✦ Get In Touch</span>
          <h1 className="animate-fadeInUp delay-1">
            Let's Build Something <span className="gradient-text">Together</span>
          </h1>
          <p className="animate-fadeInUp delay-2">
            Have a project in mind? I'd love to hear about it.
            Fill out the form and I'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* ── Main ── */}
      <section className="contact-main">
        <div className="container contact-layout">

          {/* Info */}
          <div className="contact-info">
            <div data-animate>
              <h2>Contact Information</h2>
              <p>Reach out through any of these channels or fill out the form.</p>
            </div>
            <div className="info-cards">
              {contactInfo.map((c, i) => (
                <a key={c.label} href={c.link} className="info-card" data-animate style={{ '--delay': `${i * 0.1}s` }}>
                  <c.Icon size={20} className="info-icon" />
                  <div>
                    <span className="info-label">{c.label}</span>
                    <span className="info-value">{c.value}</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="contact-socials" data-animate style={{ '--delay': '0.4s' }}>
              <p>Follow me on</p>
              <div className="social-row">
                {socials.map(({ Icon, label }) => (
                  <a key={label} href="#" className="social-pill">
                    <Icon size={15} /> {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap" data-animate style={{ '--delay': '0.2s' }}>
            {sent ? (
              <div className="success-state">
                <CheckCircle size={52} className="success-icon" />
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. I'll get back to you within 24 hours.</p>
                <button className="btn-primary" onClick={() => setSent(false)}><span>Send Another</span></button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h2>Send a Message</h2>
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input type="text" placeholder="John Doe" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                  </div>
                </div>
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Service Needed</label>
                    <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                      <option value="">Select a service</option>
                      {services.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Budget Range</label>
                    <select value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}>
                      <option value="">Select budget</option>
                      <option>Under $500</option>
                      <option>$500 – $1,000</option>
                      <option>$1,000 – $5,000</option>
                      <option>$5,000+</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Project Details *</label>
                  <textarea placeholder="Tell me about your project, goals, and timeline..." rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
                </div>
                <button type="submit" className={`btn-primary submit-btn ${loading ? 'loading' : ''}`} disabled={loading}>
                  {loading ? (
                    <><div className="btn-spinner" /><span>Sending...</span></>
                  ) : (
                    <><span>Send Message</span><Send size={15} /></>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  )
}
