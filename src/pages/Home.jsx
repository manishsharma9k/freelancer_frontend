import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Rocket, Smile, Star, Trophy,
  Globe, Palette, Smartphone, TrendingUp,
  ArrowRight, MessageCircle, Zap, CheckCircle,
  X, Share2, GitBranch, Play,
  Atom, ArrowUpRight, Server, Type, Database, Wind, Cloud, Boxes, Sparkles, PenTool,
} from 'lucide-react'
import './Home.css'

const fallbackHomeData = {
  roles: ['Full Stack Developer', 'UI/UX Designer', 'Mobile App Developer', 'Freelance Expert'],
  stats: [
    { value: '150+', label: 'Projects Done', Icon: Rocket },
    { value: '80+', label: 'Happy Clients', Icon: Smile },
    { value: '5.0★', label: 'Avg Rating', Icon: Star },
    { value: '6+', label: 'Years Exp', Icon: Trophy },
  ],
  services: [
    { Icon: Globe, title: 'Web Development', desc: 'Full-stack apps with React, Node.js & modern tech stacks.', color: '#7c3aed' },
    { Icon: Palette, title: 'UI/UX Design', desc: 'Beautiful, intuitive interfaces that users love.', color: '#06b6d4' },
    { Icon: Smartphone, title: 'Mobile Apps', desc: 'Cross-platform iOS & Android apps with React Native.', color: '#f59e0b' },
    { Icon: TrendingUp, title: 'SEO & Growth', desc: 'Data-driven strategies to grow your online presence.', color: '#10b981' },
  ],
  projects: [
    { title: 'NovaTech SaaS', cat: 'Web App', color: '#7c3aed', year: '2025', tags: ['React', 'Node.js'] },
    { title: 'Bloom E-Commerce', cat: 'E-Commerce', color: '#06b6d4', year: '2024', tags: ['Next.js', 'Stripe'] },
    { title: 'FitTrack Mobile', cat: 'Mobile', color: '#f59e0b', year: '2024', tags: ['React Native'] },
    { title: 'DataViz Dashboard', cat: 'Web App', color: '#10b981', year: '2023', tags: ['React', 'D3.js'] },
  ],
  tools: [
    { name: 'React', icon: Atom }, { name: 'Next.js', icon: ArrowUpRight }, { name: 'Node.js', icon: Server },
    { name: 'TypeScript', icon: Type }, { name: 'Figma', icon: PenTool }, { name: 'MongoDB', icon: Database },
    { name: 'PostgreSQL', icon: Database }, { name: 'React Native', icon: Smartphone }, { name: 'Tailwind', icon: Wind },
    { name: 'AWS', icon: Cloud }, { name: 'Docker', icon: Boxes }, { name: 'Git', icon: GitBranch },
  ],
  skills: [
    { name: 'Frontend Development', pct: 95, color: '#7c3aed' },
    { name: 'Backend Development', pct: 88, color: '#06b6d4' },
    { name: 'UI/UX Design', pct: 85, color: '#f59e0b' },
    { name: 'Mobile Development', pct: 78, color: '#10b981' },
  ],
  testimonials: [
    { name: 'Sarah Chen', role: 'CEO, NovaTech', text: 'Manish delivered an absolutely stunning SaaS platform. His attention to detail and communication throughout the project was exceptional. 10/10 would hire again!', avatar: 'S', rating: 5 },
    { name: 'Marcus R.', role: 'Founder, Launchpad', text: "Best freelancer I've ever worked with. He understood our vision immediately and turned it into a beautiful, functional product ahead of schedule.", avatar: 'M', rating: 5 },
    { name: 'Priya K.', role: 'Marketing Director', text: 'Our website conversions went up 340% after Manish redesigned it. Creative, professional, and always available for questions.', avatar: 'P', rating: 5 },
    { name: 'James L.', role: 'CTO, FinEdge', text: 'Manish built our entire fintech dashboard from scratch. Clean code, great architecture, and delivered on time. Highly recommended!', avatar: 'J', rating: 5 },
  ],
  socials: [
    { Icon: X, href: '#', label: 'X' },
    { Icon: Share2, href: '#', label: 'Share' },
    { Icon: GitBranch, href: '#', label: 'Git' },
    { Icon: Play, href: '#', label: 'Play' },
  ],
}

const statIconMap = {
  'Projects Done': Rocket,
  'Happy Clients': Smile,
  'Avg Rating': Star,
  'Years Exp': Trophy,
}

const serviceIconMap = {
  'Web Development': Globe,
  'UI/UX Design': Palette,
  'Mobile Apps': Smartphone,
  'SEO & Growth': TrendingUp,
}

const serviceColorMap = {
  'Web Development': '#7c3aed',
  'UI/UX Design': '#06b6d4',
  'Mobile Apps': '#f59e0b',
  'SEO & Growth': '#10b981',
}

const projectColorMap = {
  'Web App': '#7c3aed',
  'E-Commerce': '#06b6d4',
  'Mobile': '#f59e0b',
  'Design': '#ec4899',
}

const toolIconMap = {
  React: Atom,
  'Next.js': ArrowUpRight,
  'Node.js': Server,
  TypeScript: Type,
  Figma: PenTool,
  MongoDB: Database,
  PostgreSQL: Database,
  'React Native': Smartphone,
  Tailwind: Wind,
  AWS: Cloud,
  Docker: Boxes,
  Git: GitBranch,
}

const skillColorMap = {
  'Frontend Development': '#7c3aed',
  'Backend Development': '#06b6d4',
  'UI/UX Design': '#f59e0b',
  'Mobile Development': '#10b981',
}

const socialIconMap = {
  X: X,
  Share: Share2,
  Git: GitBranch,
  Play: Play,
}

const normalizeHomeData = data => ({
  ...fallbackHomeData,
  ...data,
  stats: (data?.stats || fallbackHomeData.stats).map((item, index) => ({
    ...fallbackHomeData.stats[index],
    ...item,
    Icon: typeof item.Icon === 'function' ? item.Icon : statIconMap[item.label] || fallbackHomeData.stats[index].Icon || Rocket,
  })),
  services: (data?.services || fallbackHomeData.services).map((item, index) => ({
    ...fallbackHomeData.services[index],
    ...item,
    Icon: typeof item.Icon === 'function' ? item.Icon : serviceIconMap[item.title] || fallbackHomeData.services[index].Icon || Globe,
    color: item.color || serviceColorMap[item.title] || fallbackHomeData.services[index].color || '#7c3aed',
  })),
  projects: (data?.projects || fallbackHomeData.projects).map((item, index) => ({
    ...fallbackHomeData.projects[index],
    ...item,
    cat: item.cat || item.category || fallbackHomeData.projects[index].cat || fallbackHomeData.projects[index].category || 'Web App',
    color: item.color || projectColorMap[item.cat || item.category] || fallbackHomeData.projects[index].color || '#7c3aed',
  })),
  tools: (data?.tools || fallbackHomeData.tools).map((item, index) => ({
    ...fallbackHomeData.tools[index],
    ...item,
    icon: typeof item.icon === 'function' ? item.icon : toolIconMap[item.name] || fallbackHomeData.tools[index].icon || Atom,
  })),
  skills: (data?.skills || fallbackHomeData.skills).map((item, index) => ({
    ...fallbackHomeData.skills[index],
    ...item,
    color: item.color || skillColorMap[item.name] || fallbackHomeData.skills[index].color || '#7c3aed',
  })),
  testimonials: (data?.testimonials || fallbackHomeData.testimonials).map((item, index) => ({
    ...fallbackHomeData.testimonials[index],
    ...item,
  })),
  socials: (data?.socials || fallbackHomeData.socials).map((item, index) => ({
    ...fallbackHomeData.socials[index],
    ...item,
    Icon: typeof item.Icon === 'function' ? item.Icon : socialIconMap[item.label] || fallbackHomeData.socials[index].Icon || X,
  })),
})

function useTypewriter(words, speed = 80, pause = 1800) {
  const [text, setText] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const current = words[wordIdx]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1))
        if (text.length + 1 === current.length) setTimeout(() => setDeleting(true), pause)
      } else {
        setText(current.slice(0, text.length - 1))
        if (text.length - 1 === 0) { setDeleting(false); setWordIdx(i => (i + 1) % words.length) }
      }
    }, deleting ? speed / 2 : speed)
    return () => clearTimeout(timeout)
  }, [text, deleting, wordIdx, words, speed, pause])
  return text
}

function useReveal(ref) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    ref.current?.querySelectorAll('[data-animate]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [ref])
}

export default function Home() {
  const pageRef = useRef(null)
  const [homeData, setHomeData] = useState(() => normalizeHomeData(fallbackHomeData))

  useEffect(() => {
    fetch('http://localhost:5000/api/home')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) setHomeData(normalizeHomeData(data.data))
      })
      .catch(() => setHomeData(normalizeHomeData(fallbackHomeData)))
  }, [])

  const role = useTypewriter(homeData.roles)
  useReveal(pageRef)

  return (
    <div className="home-page" ref={pageRef}>

      {/* ════ HERO ════ */}
      <section className="home-hero">
        <div className="hero-particles">
          {[...Array(25)].map((_, i) => <span key={i} className="particle" style={{ '--i': i }} />)}
        </div>
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />

        <div className="container hero-layout">
          <div className="hero-left">
            <div className="hero-badge animate-fadeInUp">
              <span className="badge-dot" /> Available for new projects
            </div>
            <h1 className="hero-title animate-fadeInUp delay-1">
              Hi, I'm <span className="name-highlight">Manish</span>
            </h1>
            <div className="hero-role animate-fadeInUp delay-2">
              <span className="role-prefix">I'm a </span>
              <span className="role-typed">{role}<span className="cursor">|</span></span>
            </div>
            <p className="hero-sub animate-fadeInUp delay-3">
              I craft high-performance digital products — from sleek web apps to
              pixel-perfect mobile experiences. Turning your ideas into reality,
              one line of code at a time.
            </p>
            <div className="hero-cta animate-fadeInUp delay-4">
              <Link to="/projects" className="btn-primary">
                <Rocket size={16} /><span>View My Work</span>
              </Link>
              <Link to="/contact" className="btn-outline">
                <MessageCircle size={16} />Let's Talk
              </Link>
            </div>
            <div className="hero-social animate-fadeInUp delay-5">
              {homeData.socials.map(({ Icon, href, label }) => (
                <a key={label} href={href} className="hero-social-btn" aria-label={label}><Icon size={16} /></a>
              ))}
              <span className="hero-social-sep" />
              <span className="hero-social-text">Follow me</span>
            </div>
          </div>

          <div className="hero-right animate-fadeInRight delay-2">
            <div className="float-badge fb-1 animate-float">
              <Zap size={13} /> Fast Delivery
            </div>
            <div className="profile-card">
              <div className="profile-card-glow" />
              <div className="profile-avatar-wrap">
                <div className="profile-ring" />
                <div className="profile-avatar">M</div>
                <div className="profile-status"><span className="status-dot" />Online</div>
              </div>
              <div className="profile-info">
                <h3>Manish</h3>
                <p>Full Stack Developer & Designer</p>
                <div className="profile-tags">
                  <span>React</span><span>Node.js</span><span>Figma</span>
                </div>
              </div>
              <div className="profile-stats">
                <div className="p-stat"><strong>150+</strong><span>Projects</span></div>
                <div className="p-stat-div" />
                <div className="p-stat"><strong>80+</strong><span>Clients</span></div>
                <div className="p-stat-div" />
                <div className="p-stat"><strong>5.0★</strong><span>Rating</span></div>
              </div>
            </div>
            <div className="float-badge fb-2 animate-float" style={{ animationDelay: '1s' }}>
              <CheckCircle size={13} /> 100% Quality
            </div>
          </div>
        </div>

        <div className="hero-scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ════ STATS ════ */}
      <section className="home-stats">
        <div className="container stats-grid">
          {homeData.stats.map((s, i) => (
            <div key={s.label} className="stat-card" data-animate style={{ '--delay': `${i * 0.1}s` }}>
              <s.Icon size={28} className="stat-icon-svg" />
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ════ ABOUT SNIPPET ════ */}
      <section className="home-about">
        <div className="container about-layout">
          <div className="about-visual" data-animate>
            <div className="about-img-card">
              <div className="about-img-glow" />
              <div className="about-avatar-big">M</div>
              <div className="about-exp-badge">
                <strong>6+</strong>
                <span>Years of<br />Experience</span>
              </div>
            </div>
          </div>
          <div className="about-text">
            <div data-animate>
              <span className="section-tag"><Sparkles size={12} /> About Me</span>
              <h2 className="section-title">Passionate Developer<br />& <span>Creative Designer</span></h2>
            </div>
            <p data-animate style={{ '--delay': '0.1s' }}>
              I'm <strong>Manish</strong>, a freelance full-stack developer and UI/UX designer
              with 6+ years of experience building digital products for startups and
              established businesses worldwide.
            </p>
            <p data-animate style={{ '--delay': '0.2s' }}>
              My approach combines clean, scalable code with beautiful design — because
              great software should look as good as it works. I've helped 80+ clients
              launch products that users love.
            </p>
            <div className="about-skills" data-animate style={{ '--delay': '0.3s' }}>
              {homeData.skills.map(s => (
                <div key={s.name} className="skill-row">
                  <div className="skill-info">
                    <span>{s.name}</span>
                    <span style={{ color: s.color || '#7c3aed' }}>{s.pct}%</span>
                  </div>
                  <div className="skill-track">
                    <div className="skill-fill" style={{ '--w': `${s.pct}%`, '--c': s.color || '#7c3aed' }} />
                  </div>
                </div>
              ))}
            </div>
            <div data-animate style={{ '--delay': '0.4s' }}>
              <Link to="/about" className="btn-primary">
                <span>More About Me</span><ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════ SERVICES ════ */}
      <section className="home-services">
        <div className="container">
          <div className="section-header" data-animate>
            <span className="section-tag"><Sparkles size={12} /> What I Do</span>
            <h2 className="section-title">Services I <span>Offer</span></h2>
            <p className="section-sub">End-to-end digital solutions tailored to your goals and budget</p>
          </div>
          <div className="services-preview-grid">
            {homeData.services.map((s, i) => (
              <div key={s.title} className="service-preview-card" data-animate style={{ '--delay': `${i * 0.12}s`, '--c': s.color || '#7c3aed' }}>
                <div className="svc-glow" />
                <div className="service-icon-wrap"><s.Icon size={28} color={s.color || '#7c3aed'} /></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <Link to="/services" className="card-link" style={{ color: s.color || '#7c3aed' }}>
                  Learn more <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
          <div className="section-cta" data-animate>
            <Link to="/services" className="btn-outline">View All Services <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      {/* ════ PROJECTS PREVIEW ════ */}
      <section className="home-projects">
        <div className="container">
          <div className="section-header" data-animate>
            <span className="section-tag"><Sparkles size={12} /> My Work</span>
            <h2 className="section-title">Recent <span>Projects</span></h2>
            <p className="section-sub">A glimpse of what I've been building lately</p>
          </div>
          <div className="projects-preview-grid">
            {homeData.projects.map((p, i) => (
              <div key={p.title} className="proj-card" data-animate style={{ '--delay': `${i * 0.1}s`, '--c': p.color || '#7c3aed' }}>
                <div className="proj-preview">
                  <div className="proj-bg" />
                  <span className="proj-symbol">◈</span>
                  <span className="proj-year">{p.year}</span>
                  <div className="proj-hover-overlay">
                    <Link to="/projects" className="proj-view-btn">View Project <ArrowRight size={14} /></Link>
                  </div>
                </div>
                <div className="proj-body">
                  <span className="proj-cat">{p.cat}</span>
                  <h3>{p.title}</h3>
                  <div className="proj-tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="section-cta" data-animate>
            <Link to="/projects" className="btn-outline">View All Projects <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      {/* ════ TOOLS ════ */}
      <section className="home-tools">
        <div className="container">
          <div className="section-header" data-animate style={{ textAlign: 'center' }}>
            <span className="section-tag"><Sparkles size={12} /> Tech Stack</span>
            <h2 className="section-title">Tools I <span>Master</span></h2>
          </div>
          <div className="tools-marquee-wrap" data-animate>
            <div className="tools-marquee">
              {[...homeData.tools, ...homeData.tools].map((t, i) => {
                const Icon = typeof t.icon === 'function' ? t.icon : toolIconMap[t.name] || Atom
                return (
                  <div key={`${t.name}-${i}`} className="tool-chip">
                    <span><Icon size={16} /></span><span>{t.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════ TESTIMONIALS ════ */}
      <section className="home-testimonials">
        <div className="container">
          <div className="section-header" data-animate>
            <span className="section-tag"><Sparkles size={12} /> Client Love</span>
            <h2 className="section-title">What Clients <span>Say</span></h2>
            <p className="section-sub">Real feedback from real clients I've worked with</p>
          </div>
          <div className="testimonials-grid">
            {homeData.testimonials.map((t, i) => (
              <div key={t.name} className="testimonial-card" data-animate style={{ '--delay': `${i * 0.12}s` }}>
                <div className="t-stars">{'★'.repeat(t.rating || 5)}</div>
                <div className="quote-mark">"</div>
                <p>{t.text}</p>
                <div className="testimonial-author">
                  <div className="t-avatar">{t.avatar || t.name.charAt(0)}</div>
                  <div><strong>{t.name}</strong><span>{t.role}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ CTA ════ */}
      <section className="home-cta">
        <div className="container">
          <div className="cta-card" data-animate>
            <div className="cta-glow" />
            <div className="cta-badge"><Zap size={14} /> Limited Slots Available</div>
            <h2>Ready to build something <span>amazing?</span></h2>
            <p>Let's turn your idea into a reality. I'm currently accepting new projects for 2025.</p>
            <div className="cta-actions">
              <Link to="/contact" className="btn-primary"><Rocket size={16} /><span>Start a Project</span></Link>
              <Link to="/services" className="btn-outline">See Pricing <ArrowRight size={15} /></Link>
            </div>
            <div className="cta-trust">
              <span><CheckCircle size={14} /> Free Consultation</span>
              <span><Zap size={14} /> Fast Turnaround</span>
              <span><CheckCircle size={14} /> NDA Available</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
