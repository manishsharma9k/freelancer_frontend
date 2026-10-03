import { useEffect, useState } from 'react'
import Logo from './Logo'
import './PageLoader.css'

export default function PageLoader({ onDone }) {
  const [phase, setPhase] = useState('enter')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('text'), 200)
    const t2 = setTimeout(() => setPhase('exit'), 1800)
    const t3 = setTimeout(() => onDone(), 2200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onDone])

  return (
    <div className={`page-loader ${phase}`}>
      {/* Grid lines */}
      <div className="loader-grid">
        {[...Array(6)].map((_, i) => <div key={i} className="grid-line" style={{ '--i': i }} />)}
      </div>

      {/* Corner brackets */}
      <div className="corner tl" /><div className="corner tr" />
      <div className="corner bl" /><div className="corner br" />

      {/* Center content */}
      <div className="loader-center">
        <div className="loader-logo-wrap">
          <div className="loader-ring" />
          <div className="loader-ring loader-ring-2" />
          <div className="loader-logo-inner">
            <Logo size={44} />
          </div>
        </div>

        <div className="loader-name">
          <span className="loader-first">Manish</span>
          <span className="loader-dot"> · </span>
          <span className="loader-last">Freelancer</span>
        </div>

        <div className="loader-tagline">Crafting Digital Experiences</div>

        <div className="loader-bar-wrap">
          <div className="loader-bar" />
        </div>
      </div>

      {/* Particles */}
      <div className="loader-particles">
        {[...Array(12)].map((_, i) => (
          <span key={i} className="l-particle" style={{ '--i': i }} />
        ))}
      </div>
    </div>
  )
}
