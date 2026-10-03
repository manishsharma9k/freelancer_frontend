import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, Clock3, Mail, MapPin, Phone, Send } from 'lucide-react'
import './Footer.css'

const fallbackFooterData = {
  quickLinks: [
    { label: 'Home', to: '/' },
    { label: 'Find Freelancers', to: '/gigs' },
    { label: 'Find Jobs', to: '/projects' },
    { label: 'About Us', to: '/about' },
    { label: 'Blog', to: '/services' },
    { label: 'Contact Us', to: '/contact' },
  ],
  services: [
    { id: 'web', label: 'Web Development' },
    { id: 'design', label: 'UI/UX Design' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'seo', label: 'SEO & Marketing' },
    { id: 'brand', label: 'Brand Identity' },
    { id: 'support', label: 'Maintenance' },
  ],
}

const footerIcons = [
  { Icon: FbIcon, label: 'Facebook' },
  { Icon: XIcon, label: 'X' },
  { Icon: InIcon, label: 'LinkedIn' },
  { Icon: IgIcon, label: 'Instagram' },
  { Icon: YtIcon, label: 'YouTube' },
]

function FbIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props} fill="currentColor" aria-hidden="true">
      <path d="M13.5 22v-8h2.7l.4-3h-3.1V7.4c0-.9.3-1.5 1.6-1.5H16V2.9c-.2 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V11H7v3h2.6v8h3.9Z" />
    </svg>
  )
}

function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props} aria-hidden="true">
      <path d="M18.9 2h3.4l-7.4 8.5L22.8 22h-6.7l-5.2-7.4L4.7 22H1.3l7.9-9.1L1.2 2h6.8l4.7 6.7L18.9 2Zm-1.2 18h1.9L7.2 3.9H5.2L17.7 20Z" fill="currentColor" />
    </svg>
  )
}

function InIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props} aria-hidden="true">
      <path d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.4a1.56 1.56 0 0 1 0 3.1ZM5.5 9.8h2.8v9.7H5.5V9.8Zm4.7 0h2.7v1.3h.1c.4-.7 1.3-1.5 2.9-1.5 3 0 3.6 2 3.6 4.7v5.2h-2.8v-4.9c0-1.2 0-2.7-1.6-2.7s-1.9 1.3-1.9 2.7v4.9H10.2V9.8Z" fill="currentColor" />
    </svg>
  )
}

function IgIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props} aria-hidden="true">
      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm9.6 1.7a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 6.8A5.2 5.2 0 1 1 6.8 12 5.2 5.2 0 0 1 12 6.8Zm0 2A3.2 3.2 0 1 0 15.2 12 3.2 3.2 0 0 0 12 8.8Z" fill="currentColor" />
    </svg>
  )
}

function YtIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props} aria-hidden="true">
      <path d="M21.8 7.5c-.3-1.2-1.2-2.1-2.4-2.4C17.7 4.6 12 4.6 12 4.6s-5.7 0-7.4.5C3.4 5.4 2.5 6.3 2.2 7.5 1.7 9.2 1.7 12 1.7 12s0 2.8.5 4.5c.3 1.2 1.2 2.1 2.4 2.4 1.7.5 7.4.5 7.4.5s5.7 0 7.4-.5c1.2-.3 2.1-1.2 2.4-2.4.5-1.7.5-4.5.5-4.5s0-2.8-.5-4.5ZM10 15.4v-6.8l6 3.4-6 3.4Z" fill="currentColor" />
    </svg>
  )
}

export default function Footer() {
  const [footerData, setFooterData] = useState(fallbackFooterData)

  useEffect(() => {
    fetch('http://localhost:5000/api/footer')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setFooterData(data.data)
        }
      })
      .catch(() => setFooterData(fallbackFooterData))
  }, [])

  const quickLinks = footerData.quickLinks || fallbackFooterData.quickLinks
  const services = footerData.services || fallbackFooterData.services

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand-block">
          <div className="brand-wrap">
            <div className="brand-mark" aria-hidden="true">
              <span className="brand-mark-bar" />
              <span className="brand-mark-bar brand-mark-bar-short" />
            </div>
            <div className="brand-text">
              Freelance<span>Hub</span>
            </div>
          </div>

          <p className="tagline">Find the right talent. Build your dreams.</p>
          <p className="brand-description">
            FreelanceHub connects talented freelancers with businesses and individuals around the world.
            Get your work done, hire skilled professionals, and grow together.
          </p>

          <div className="footer-socials">
            {footerIcons.map(({ Icon, label }) => (
              <a key={label} href="#" className="social-pill" aria-label={label}>
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to}>
                  <span>{link.label}</span>
                  <ChevronRight size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3>Popular Services</h3>
          <ul className="service-list">
            {services.map((service) => {
              const iconMap = {
                web: '< />',
                design: '◌',
                mobile: '▣',
                seo: '◍',
                brand: '✎',
                support: '⚙',
              }
              const icon = iconMap[service.id] || '•'

              return (
                <li key={service.id}>
                  <Link to={`/services?service=${service.id}`} className="service-link">
                    <span className="service-icon">{icon}</span>
                    <span>{service.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="footer-col contact-col">
          <h3>Get In Touch</h3>
          <ul className="contact-list">
            <li>
              <span className="contact-icon"><Mail size={16} /></span>
              <span>support@freelancehub.com</span>
            </li>
            <li>
              <span className="contact-icon"><Phone size={16} /></span>
              <span>+91 98765 43210</span>
            </li>
            <li>
              <span className="contact-icon"><MapPin size={16} /></span>
              <span>New Delhi, India</span>
            </li>
            <li>
              <span className="contact-icon"><Clock3 size={16} /></span>
              <span>Mon - Fri, 9:00 AM - 6:00 PM</span>
            </li>
          </ul>

          <Link to="/contact" className="project-button">
            <span className="project-button-icon"><Send size={16} /></span>
            <span>Start a Project</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© 2025 FreelanceHub. All rights reserved.</p>
          <div className="footer-meta">
            <span>Work</span>
            <span>•</span>
            <span>Grow</span>
            <span>•</span>
            <span>Success</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
