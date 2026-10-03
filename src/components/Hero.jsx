import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Hero.css'

const suggestions = ['Web Design', 'Logo Design', 'SEO', 'Video Editing', 'React Developer']

export default function Hero() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) navigate(`/gigs?q=${encodeURIComponent(query)}`)
  }

  return (
    <section className="hero">
      <div className="hero-overlay" />
      <div className="container hero-content">
        <h1>Find the perfect <span>freelance</span> services for your business</h1>
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for any service..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button type="submit" className="btn-primary">Search</button>
        </form>
        <div className="popular-tags">
          <span>Popular:</span>
          {suggestions.map(s => (
            <button key={s} onClick={() => { setQuery(s); navigate(`/gigs?q=${s}`) }}>
              {s}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
