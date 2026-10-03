import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Zap, Gem, Handshake, RefreshCw, ArrowRight, Download, Sparkles } from 'lucide-react'
import './About.css'

const fallbackAboutData = {
  skills: [
    { name: 'React / Next.js', level: 95 },
    { name: 'Node.js / Express', level: 88 },
    { name: 'UI/UX Design', level: 85 },
    { name: 'TypeScript', level: 82 },
    { name: 'MongoDB / PostgreSQL', level: 80 },
    { name: 'React Native', level: 75 },
  ],
  timeline: [
    { year: '2019', title: 'Started With Web Fundamentals', desc: 'Built my foundation in HTML, CSS, JavaScript, and problem-solving while learning how modern web apps work.' },
    { year: '2020', title: 'First MERN Project', desc: 'Created my first full-stack app with MongoDB, Express, React, and Node.js for a client needing a custom dashboard.' },
    { year: '2021', title: 'Freelance Full-Stack Growth', desc: 'Started delivering end-to-end solutions for startups and businesses, combining frontend polish with backend reliability.' },
    { year: '2022', title: 'E-commerce & SaaS Builds', desc: 'Developed product catalog systems, admin panels, payment flows, and scalable dashboards for growing brands.' },
    { year: '2023', title: 'API & Performance Focus', desc: 'Deepened my expertise in REST APIs, authentication, MongoDB schema design, and optimized frontend performance.' },
    { year: '2025', title: 'Building Scalable Products Today', desc: 'Now I help founders and teams create fast, secure, and user-friendly web products using the modern MERN stack.' },
  ],
  values: [
    { Icon: Zap, title: 'Speed', desc: 'Fast delivery without compromising quality.' },
    { Icon: Gem, title: 'Quality', desc: 'Every pixel and line of code is crafted with care.' },
    { Icon: Handshake, title: 'Transparency', desc: 'Clear communication at every step of the project.' },
    { Icon: RefreshCw, title: 'Iteration', desc: "Continuous improvement until you're 100% satisfied." },
  ],
}

const normalizeAboutData = (data) => ({
  ...fallbackAboutData,
  ...data,
  skills: data?.skills || fallbackAboutData.skills,
  timeline: data?.timeline || fallbackAboutData.timeline,
  values: (data?.values || fallbackAboutData.values).map((item, index) => ({
    ...fallbackAboutData.values[index],
    ...item,
    Icon: typeof item.Icon === 'function' ? item.Icon : fallbackAboutData.values[index].Icon || Zap,
  })),
})

export default function About() {
  const pageRef = useRef(null)
  const [aboutData, setAboutData] = useState(() => normalizeAboutData(fallbackAboutData))

  useEffect(() => {
    fetch('http://localhost:5000/api/about')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setAboutData(normalizeAboutData(data.data))
        }
      })
      .catch(() => setAboutData(normalizeAboutData(fallbackAboutData)))
  }, [])

  const { skills, timeline, values } = aboutData

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    pageRef.current?.querySelectorAll('[data-animate]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="about-page" ref={pageRef}>

      {/* ── Hero ── */}
      <section className="about-hero">
        <div className="about-blob" />
        <div className="container about-hero-inner">
          <div className="about-hero-text">
            <span className="section-tag animate-fadeInUp"><Sparkles size={12} /> About Me</span>
            <h1 className="animate-fadeInUp delay-1">
              I build <span className="gradient-text">digital products</span><br />
              that feel premium and perform fast.
            </h1>
            <p className="animate-fadeInUp delay-2">
              I’m a freelance full-stack developer and UI/UX designer with 6+ years of experience helping startups,
              founders, and growing businesses turn ideas into polished, conversion-focused experiences.
            </p>
            <div className="about-hero-stats animate-fadeInUp delay-3">
              <div className="mini-stat"><strong>150+</strong><span>Projects</span></div>
              <div className="mini-stat"><strong>80+</strong><span>Clients</span></div>
              <div className="mini-stat"><strong>5.0★</strong><span>Rating</span></div>
            </div>
            <div className="about-hero-actions animate-fadeInUp delay-3">
              <Link to="/contact" className="btn-primary"><span>Work With Me</span><ArrowRight size={16} /></Link>
              <a href="#" className="btn-outline"><Download size={15} />Download CV</a>
            </div>
          </div>
          <div className="about-hero-visual animate-fadeInRight delay-2">
            <div className="avatar-card">
              <div className="avatar-ring" />
              <div className="avatar-inner"><span>FL</span></div>
              <div className="avatar-badge"><Zap size={13} /> Open to Work</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="about-values">
        <div className="container">
          <div className="section-header" data-animate>
            <span className="section-tag"><Sparkles size={12} /> My Values</span>
            <h2 className="section-title">How I <span>Work</span></h2>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div key={v.title} className="value-card" data-animate style={{ '--delay': `${i * 0.1}s` }}>
                <v.Icon size={28} className="value-icon-svg" />
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="about-skills">
        <div className="container">
          <div className="section-header" data-animate>
            <span className="section-tag"><Sparkles size={12} /> Expertise</span>
            <h2 className="section-title">My <span>Skills</span></h2>
            <p className="section-sub">Technologies I work with daily</p>
          </div>
          <div className="skills-grid">
            {skills.map((skill, i) => (
              <div key={skill.name} className="skill-item" data-animate style={{ '--delay': `${i * 0.1}s` }}>
                <div className="skill-header">
                  <span>{skill.name}</span>
                  <span className="skill-pct">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div className="skill-fill" style={{ '--width': `${skill.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Journey ── */}
      <section className="about-timeline">
        <div className="container">
          <div className="section-header" data-animate>
            <span className="section-tag"><Sparkles size={12} /> My Story</span>
            <h2 className="section-title">The path behind <span>my work</span></h2>
            <p className="section-sub">A journey built on learning, growth, and long-term client relationships.</p>
          </div>

          <div className="story-intro-box" data-animate>
            <span className="story-label">MERN Stack Developer</span>
            <p>
              I build modern web applications using MongoDB, Express, React, and Node.js, turning business ideas into scalable,
              responsive, and user-focused digital products that are easy to manage and fast to grow with.
            </p>
          </div>

          <div className="story-highlights" data-animate>
            <div className="story-highlight-card">
              <strong>Full-stack thinking</strong>
              <span>From UI flow to backend architecture, I design products that work smoothly end-to-end.</span>
            </div>
            <div className="story-highlight-card">
              <strong>Business-first development</strong>
              <span>I focus on performance, clarity, and conversions so your product looks premium and drives results.</span>
            </div>
            <div className="story-highlight-card">
              <strong>Clean code & scalability</strong>
              <span>Every build is structured for maintainability, growth, and easier future updates.</span>
            </div>
          </div>

          <div className="timeline-wrap">
            <div className="timeline-line" />
            <div className="timeline-list">
              {timeline.map((item, i) => (
                <div key={item.year} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`} data-animate style={{ '--delay': `${i * 0.12}s` }}>
                  <div className="timeline-dot" />
                  <div className="timeline-card">
                    <span className="timeline-year">{item.year}</span>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
