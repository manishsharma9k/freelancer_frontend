import { useEffect, useRef, useState } from 'react'
import { ExternalLink, GitBranch, Diamond } from 'lucide-react'
import './Projects.css'

const fallbackProjectsData = {
  projects: [
    { id: 1, title: 'NovaTech SaaS Platform', category: 'Web App', tags: ['React', 'Node.js', 'MongoDB'], desc: 'A full-featured SaaS dashboard with real-time analytics, team management, and billing integration.', color: '#7c3aed', year: '2025' },
    { id: 2, title: 'Bloom E-Commerce', category: 'E-Commerce', tags: ['Next.js', 'Stripe', 'PostgreSQL'], desc: 'Modern e-commerce store with AI-powered recommendations and seamless checkout experience.', color: '#06b6d4', year: '2024' },
    { id: 3, title: 'FitTrack Mobile App', category: 'Mobile', tags: ['React Native', 'Firebase'], desc: 'Cross-platform fitness tracking app with workout plans, progress charts, and social features.', color: '#f59e0b', year: '2024' },
    { id: 4, title: 'Arcadia Brand Identity', category: 'Design', tags: ['Figma', 'Branding'], desc: 'Complete brand identity for a luxury real estate company — logo, guidelines, and marketing materials.', color: '#ec4899', year: '2024' },
    { id: 5, title: 'DataViz Dashboard', category: 'Web App', tags: ['React', 'D3.js', 'Python'], desc: 'Interactive data visualization platform for business intelligence with custom chart components.', color: '#10b981', year: '2023' },
    { id: 6, title: 'Launchpad Landing Page', category: 'Design', tags: ['Figma', 'React', 'GSAP'], desc: 'High-converting landing page with micro-animations that increased sign-ups by 340%.', color: '#8b5cf6', year: '2023' },
    { id: 7, title: 'MediConnect App', category: 'Mobile', tags: ['React Native', 'Node.js'], desc: 'Telemedicine app connecting patients with doctors for virtual consultations and prescriptions.', color: '#ef4444', year: '2023' },
    { id: 8, title: 'CryptoWatch Platform', category: 'Web App', tags: ['React', 'WebSocket', 'Redis'], desc: 'Real-time cryptocurrency tracking platform with portfolio management and price alerts.', color: '#f97316', year: '2022' },
  ],
  filters: ['All', 'Web App', 'E-Commerce', 'Mobile', 'Design'],
  stats: [
    ['150+', 'Projects Completed'],
    ['80+', 'Happy Clients'],
    ['6+', 'Years Experience'],
    ['100%', 'Satisfaction Rate'],
  ],
}

const projectColorMap = {
  'Web App': '#7c3aed',
  'E-Commerce': '#06b6d4',
  'Mobile': '#f59e0b',
  Design: '#ec4899',
}

const normalizeProjectsData = data => ({
  ...fallbackProjectsData,
  ...data,
  projects: (data?.projects || fallbackProjectsData.projects).map((item, index) => ({
    ...fallbackProjectsData.projects[index],
    ...item,
    color: item.color || projectColorMap[item.category] || fallbackProjectsData.projects[index].color || '#7c3aed',
  })),
  filters: data?.filters || fallbackProjectsData.filters,
  stats: data?.stats || fallbackProjectsData.stats,
})

export default function Projects() {
  const pageRef = useRef(null)
  const [projectsData, setProjectsData] = useState(() => normalizeProjectsData(fallbackProjectsData))
  const [active, setActive] = useState('All')

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) setProjectsData(normalizeProjectsData(data.data))
      })
      .catch(() => setProjectsData(normalizeProjectsData(fallbackProjectsData)))
  }, [])

  const projects = projectsData.projects
  const filters = projectsData.filters
  const statsData = projectsData.stats
  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    pageRef.current?.querySelectorAll('[data-animate]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="projects-page" ref={pageRef}>

      {/* ── Hero ── */}
      <section className="projects-hero">
        <div className="container">
          <span className="section-tag animate-fadeInUp">✦ Portfolio</span>
          <h1 className="animate-fadeInUp delay-1">
            Work That <span className="gradient-text">Speaks</span> for Itself
          </h1>
          <p className="animate-fadeInUp delay-2">
            A selection of projects I've built for clients across industries.
            Each one crafted with purpose and precision.
          </p>
        </div>
      </section>

      {/* ── Filter + Grid ── */}
      <section className="projects-main">
        <div className="container">
          <div className="filter-bar" data-animate>
            {filters.map(f => (
              <button
                key={f}
                className={`filter-pill ${active === f ? 'active' : ''}`}
                onClick={() => setActive(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {filtered.map((p, i) => (
              <div
                key={p.id}
                className="project-card"
                data-animate
                style={{ '--delay': `${i * 0.08}s`, '--color': p.color }}
              >
                <div className="project-preview">
                  <div className="project-preview-bg" />
                  <div className="project-preview-content">
                    <Diamond size={32} color={p.color} className="project-icon" />
                    <span className="project-year">{p.year}</span>
                  </div>
                  <div className="project-overlay">
                    <a href="#" className="overlay-btn"><ExternalLink size={14} /> View Live</a>
                    <a href="#" className="overlay-btn"><GitBranch size={14} /> GitHub</a>
                  </div>
                </div>
                <div className="project-body">
                  <div className="project-meta">
                    <span className="project-category">{p.category}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="project-tags">
                    {p.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Banner ── */}
      <section className="projects-stats">
        <div className="container">
          <div className="projects-stats-inner" data-animate>
            {statsData.map(([val, label]) => (
              <div key={label} className="p-stat">
                <span className="p-stat-val">{val}</span>
                <span className="p-stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
