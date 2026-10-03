import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Globe, Palette, Smartphone, TrendingUp, Shield, Settings,
  MessageCircle, FileText, Layers, Rocket,
  Zap, Clock, Target, Lock, Infinity, Handshake,
  ChevronDown, ArrowRight, CalendarCheck, Sparkles,
} from 'lucide-react'
import './Services.css'

const fallbackServicesData = {
  services: [
    {
      id: 'web', Icon: Globe, title: 'Web Development', color: '#7c3aed', lightColor: '#f3f0ff',
      tagline: 'Fast. Scalable. Beautiful.',
      desc: 'Full-stack web applications built with modern technologies. From landing pages to complex SaaS platforms that scale.',
      features: ['React / Next.js Frontend', 'Node.js & Express Backend', 'REST & GraphQL APIs', 'Database Design & Optimization', 'Cloud Deployment (AWS/Vercel)', 'Performance & SEO Optimization'],
      price: 500, unit: 'project', deliverable: '7–21 days',
    },
    {
      id: 'design', Icon: Palette, title: 'UI/UX Design', color: '#06b6d4', lightColor: '#ecfeff',
      tagline: 'Design that converts.',
      desc: 'User-centered design that turns visitors into customers. Beautiful, research-backed interfaces built in Figma.',
      features: ['User Research & Personas', 'Wireframing & Prototyping', 'High-Fidelity Figma Designs', 'Design System Creation', 'Responsive & Mobile-First', 'Handoff-Ready Assets'],
      price: 300, unit: 'project', deliverable: '5–14 days',
    },
    {
      id: 'mobile', Icon: Smartphone, title: 'Mobile Apps', color: '#f59e0b', lightColor: '#fffbeb',
      tagline: 'iOS & Android. One codebase.',
      desc: 'Cross-platform mobile applications using React Native. Ship to both app stores with a single, maintainable codebase.',
      features: ['React Native Development', 'iOS & Android Support', 'Push Notifications', 'Offline-First Architecture', 'App Store Submission', 'Analytics Integration'],
      price: 800, unit: 'project', deliverable: '14–30 days',
    },
    {
      id: 'seo', Icon: TrendingUp, title: 'SEO & Marketing', color: '#10b981', lightColor: '#ecfdf5',
      tagline: 'Grow your organic traffic.',
      desc: 'Data-driven digital marketing strategies to grow your online presence, drive qualified traffic, and boost conversions.',
      features: ['Technical SEO Audit', 'Keyword Research & Strategy', 'On-Page Optimization', 'Google Ads Management', 'Analytics & Reporting', 'Conversion Rate Optimization'],
      price: 200, unit: 'month', deliverable: 'Ongoing',
    },
    {
      id: 'brand', Icon: Shield, title: 'Brand Identity', color: '#ec4899', lightColor: '#fdf2f8',
      tagline: 'Make your brand unforgettable.',
      desc: 'Complete brand identity packages that make your business memorable, professional, and consistent across all touchpoints.',
      features: ['Logo Design (3 Concepts)', 'Color Palette & Typography', 'Brand Guidelines PDF', 'Business Card Design', 'Social Media Kit', 'Brand Voice & Messaging'],
      price: 400, unit: 'project', deliverable: '7–14 days',
    },
    {
      id: 'support', Icon: Settings, title: 'Maintenance', color: '#8b5cf6', lightColor: '#f5f3ff',
      tagline: 'Always on. Always updated.',
      desc: 'Ongoing technical support, updates, and maintenance to keep your digital products running smoothly and securely.',
      features: ['Monthly Bug Fixes', 'Performance Monitoring', 'Security Updates', 'Feature Additions', 'Uptime Monitoring', 'Priority Support'],
      price: 150, unit: 'month', deliverable: 'Ongoing',
    },
  ],
  process: [
    { step: '01', Icon: MessageCircle, title: 'Discovery Call', desc: 'Free 30-min call to understand your goals, timeline, and budget.' },
    { step: '02', Icon: FileText, title: 'Proposal', desc: 'Detailed scope, timeline, and fixed-price quote sent within 24 hours.' },
    { step: '03', Icon: Layers, title: 'Design & Build', desc: "Regular updates and previews so you're always in the loop." },
    { step: '04', Icon: Rocket, title: 'Launch & Support', desc: 'Smooth deployment with 30 days of free post-launch support.' },
  ],
  whyMe: [
    { Icon: Zap, title: 'Fast Turnaround', desc: 'Most projects delivered ahead of schedule without cutting corners.' },
    { Icon: MessageCircle, title: 'Clear Communication', desc: 'Daily updates, no ghosting, always reachable during business hours.' },
    { Icon: Target, title: 'Results-Focused', desc: 'I measure success by your business outcomes, not just deliverables.' },
    { Icon: Lock, title: 'Fixed Pricing', desc: 'No surprise invoices. You know the full cost before we start.' },
    { Icon: Infinity, title: 'Unlimited Revisions', desc: "We iterate until you're 100% happy. No revision limits." },
    { Icon: Handshake, title: 'Long-Term Support', desc: "30 days free support after every project. I'm here after launch too." },
  ],
  faqs: [
    { q: 'How long does a typical project take?', a: 'Most web projects take 2–4 weeks. Design projects are 1–2 weeks. Mobile apps typically take 4–8 weeks depending on complexity.' },
    { q: 'Do you offer revisions?', a: "Yes! Every project includes unlimited revisions until you're 100% satisfied. I don't stop until it's perfect." },
    { q: "What's your payment structure?", a: '50% upfront to start, 50% on delivery. For monthly retainers, billing is at the start of each month.' },
    { q: 'Can you work with my existing team?', a: "Absolutely. I'm experienced working alongside in-house teams, other freelancers, and agencies." },
    { q: 'Do you sign NDAs?', a: "Yes, I'm happy to sign an NDA before any project discussion. Your ideas are safe with me." },
  ],
}

const serviceTypeIconMap = {
  'Web Development': Globe,
  'UI/UX Design': Palette,
  'Mobile Apps': Smartphone,
  'SEO & Marketing': TrendingUp,
  'Brand Identity': Shield,
  Maintenance: Settings,
}

const serviceTypeColorMap = {
  'Web Development': '#7c3aed',
  'UI/UX Design': '#06b6d4',
  'Mobile Apps': '#f59e0b',
  'SEO & Marketing': '#10b981',
  'Brand Identity': '#ec4899',
  Maintenance: '#8b5cf6',
}

const serviceTypeLightMap = {
  'Web Development': '#f3f0ff',
  'UI/UX Design': '#ecfeff',
  'Mobile Apps': '#fffbeb',
  'SEO & Marketing': '#ecfdf5',
  'Brand Identity': '#fdf2f8',
  Maintenance: '#f5f3ff',
}

const normalizeServicesData = data => ({
  ...fallbackServicesData,
  ...data,
  services: (data?.services || fallbackServicesData.services).map((item, index) => ({
    ...fallbackServicesData.services[index],
    ...item,
    Icon: typeof item.Icon === 'function' ? item.Icon : serviceTypeIconMap[item.title] || fallbackServicesData.services[index].Icon || Globe,
    color: item.color || serviceTypeColorMap[item.title] || fallbackServicesData.services[index].color || '#7c3aed',
    lightColor: item.lightColor || serviceTypeLightMap[item.title] || fallbackServicesData.services[index].lightColor || '#f3f0ff',
  })),
  process: data?.process || fallbackServicesData.process,
  whyMe: data?.whyMe || fallbackServicesData.whyMe,
  faqs: data?.faqs || fallbackServicesData.faqs,
})

export default function Services() {
  const pageRef = useRef(null)
  const [searchParams] = useSearchParams()
  const [servicesData, setServicesData] = useState(() => normalizeServicesData(fallbackServicesData))
  const [activeService, setActiveService] = useState(0)
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    fetch('http://localhost:5000/api/services')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) setServicesData(normalizeServicesData(data.data))
      })
      .catch(() => setServicesData(normalizeServicesData(fallbackServicesData)))
  }, [])

  const services = servicesData.services
  const process = servicesData.process
  const whyMe = servicesData.whyMe
  const faqs = servicesData.faqs

  useEffect(() => {
    const selected = searchParams.get('service')
    if (!selected) return

    const index = services.findIndex(service => service.id === selected)
    if (index >= 0) setActiveService(index)
  }, [searchParams, services])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    pageRef.current?.querySelectorAll('[data-animate]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const active = services[activeService]

  return (
    <div className="services-page" ref={pageRef}>

      {/* ── Hero ── */}
      <section className="sv-hero">
        <div className="sv-hero-bg" />
        <div className="container sv-hero-inner">
          <div className="sv-hero-text">
            <span className="section-tag animate-fadeInUp"><Sparkles size={12} /> What I Offer</span>
            <h1 className="animate-fadeInUp delay-1">
              Services Built<br />for <span className="gradient-text">Real Results</span>
            </h1>
            <p className="animate-fadeInUp delay-2">
              End-to-end digital solutions — from pixel-perfect design to
              production-ready code. Everything your business needs to grow online.
            </p>
            <div className="sv-hero-pills animate-fadeInUp delay-3">
              {services.map((s, i) => (
                <button
                  key={s.id}
                  className={`sv-pill ${activeService === i ? 'active' : ''}`}
                  style={{ '--c': s.color }}
                  onClick={() => setActiveService(i)}
                >
                  <s.Icon size={14} /> {s.title}
                </button>
              ))}
            </div>
          </div>
          <div className="sv-hero-card animate-fadeInRight delay-2">
            <div className="sv-active-card" style={{ '--c': active.color, '--lc': active.lightColor }}>
              <div className="sv-card-top">
                <active.Icon size={28} color={active.color} className="sv-card-icon" />
                <div>
                  <h3>{active.title}</h3>
                  <p className="sv-card-tagline">{active.tagline}</p>
                </div>
              </div>
              <p className="sv-card-desc">{active.desc}</p>
              <ul className="sv-card-features">
                {active.features.map(f => (
                  <li key={f}><span className="sv-check">✓</span>{f}</li>
                ))}
              </ul>
              <div className="sv-card-footer">
                <div className="sv-price-wrap">
                  <span className="sv-from">Starting at</span>
                  <span className="sv-price">${active.price}<span>/{active.unit}</span></span>
                </div>
                <div className="sv-delivery"><Clock size={13} /> {active.deliverable}</div>
              </div>
              <Link to="/contact" className="btn-primary sv-cta-btn"><span>Get a Free Quote</span><ArrowRight size={15} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── All Services Strip ── */}
      <section className="sv-strip">
        <div className="container">
          <div className="sv-strip-grid">
            {services.map((s, i) => (
              <div
                key={s.id}
                className={`sv-strip-card ${activeService === i ? 'active' : ''}`}
                style={{ '--c': s.color, '--lc': s.lightColor, '--delay': `${i * 0.08}s` }}
                onClick={() => setActiveService(i)}
              >
                <div className="sv-strip-icon-wrap">
                  <s.Icon size={24} className="sv-strip-icon" color={s.color} />
                </div>
                <div className="sv-strip-body">
                  <h4>{s.title}</h4>
                  <span>${s.price}/{s.unit}</span>
                </div>
                <ArrowRight size={16} className="sv-strip-arrow" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="sv-process">
        <div className="container">
          <div className="sv-section-head" data-animate>
            <span className="section-tag"><Sparkles size={12} /> My Process</span>
            <h2 className="section-title">From Idea to <span>Launch</span></h2>
            <p className="section-sub">A simple, transparent process with no surprises</p>
          </div>
          <div className="sv-process-grid">
            {process.map((p, i) => (
              <div key={p.step} className="sv-process-card" data-animate style={{ '--delay': `${i * 0.1}s` }}>
                <div className="sv-process-num">{p.step}</div>
                <p.Icon size={28} className="sv-process-icon" />
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                {i < process.length - 1 && <div className="sv-process-connector" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Me ── */}
      <section className="sv-why">
        <div className="container sv-why-inner">
          <div className="sv-why-text" data-animate>
            <span className="section-tag"><Sparkles size={12} /> Why Choose Me</span>
            <h2 className="section-title">Not just a freelancer.<br />A <span>growth partner.</span></h2>
            <p>I don't just deliver files — I deliver outcomes. Every project is treated like it's my own business on the line.</p>
          </div>
          <div className="sv-why-grid">
            {whyMe.map((w, i) => (
              <div key={w.title} className="sv-why-card" data-animate style={{ '--delay': `${i * 0.08}s` }}>
                <w.Icon size={24} className="sv-why-icon" />
                <h4>{w.title}</h4>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="sv-faq">
        <div className="container sv-faq-inner">
          <div className="sv-section-head" data-animate>
            <span className="section-tag"><Sparkles size={12} /> FAQ</span>
            <h2 className="section-title">Common <span>Questions</span></h2>
          </div>
          <div className="sv-faq-list">
            {faqs.map((f, i) => (
              <div
                key={i}
                className={`sv-faq-item ${openFaq === i ? 'open' : ''}`}
                data-animate
                style={{ '--delay': `${i * 0.08}s` }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="sv-faq-q">
                  <span>{f.q}</span>
                  <ChevronDown size={18} className="sv-faq-icon" />
                </div>
                <div className="sv-faq-a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="sv-cta-section">
        <div className="container">
          <div className="sv-cta-card" data-animate>
            <div className="sv-cta-glow" />
            <span className="section-tag" style={{ background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}><Sparkles size={12} /> Let's Work Together</span>
            <h2>Ready to start your project?</h2>
            <p>Book a free 30-minute consultation. No commitment, no pressure — just a conversation about your goals.</p>
            <div className="sv-cta-actions">
              <Link to="/contact" className="btn-primary sv-cta-white"><CalendarCheck size={16} /><span>Book Free Call</span></Link>
              <Link to="/projects" className="sv-cta-ghost">View My Work <ArrowRight size={15} /></Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
