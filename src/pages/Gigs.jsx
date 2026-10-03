import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import './Gigs.css'

const fallbackGigsData = {
  allGigs: [
    { id: 1, title: 'I will design a modern professional logo', seller: 'Ahmed K.', rating: 4.9, reviews: 312, price: 25, category: 'Design', delivery: '2 days' },
    { id: 2, title: 'I will build a full stack React web application', seller: 'Sara M.', rating: 4.8, reviews: 198, price: 80, category: 'Tech', delivery: '7 days' },
    { id: 3, title: 'I will write SEO optimized blog articles', seller: 'John D.', rating: 4.7, reviews: 445, price: 15, category: 'Writing', delivery: '3 days' },
    { id: 4, title: 'I will create a stunning social media video ad', seller: 'Priya S.', rating: 5.0, reviews: 87, price: 50, category: 'Video', delivery: '5 days' },
    { id: 5, title: 'I will setup and manage your Google Ads campaign', seller: 'Omar F.', rating: 4.9, reviews: 231, price: 60, category: 'Marketing', delivery: '1 day' },
    { id: 6, title: 'I will develop a mobile app for iOS and Android', seller: 'Lena R.', rating: 4.8, reviews: 156, price: 120, category: 'Tech', delivery: '14 days' },
    { id: 7, title: 'I will create a WordPress website for your business', seller: 'Raj P.', rating: 4.6, reviews: 289, price: 45, category: 'Tech', delivery: '5 days' },
    { id: 8, title: 'I will design a professional business card', seller: 'Mia L.', rating: 4.8, reviews: 521, price: 10, category: 'Design', delivery: '1 day' },
    { id: 9, title: 'I will do professional photo editing and retouching', seller: 'Tom W.', rating: 4.7, reviews: 178, price: 20, category: 'Photography', delivery: '2 days' },
  ],
  categories: ['All', 'Design', 'Tech', 'Writing', 'Video', 'Marketing', 'Photography'],
}

export default function Gigs() {
  const [searchParams] = useSearchParams()
  const [gigsData, setGigsData] = useState(fallbackGigsData)
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortBy, setSortBy] = useState('relevance')
  const query = searchParams.get('q') || ''

  useEffect(() => {
    fetch('http://localhost:5000/api/gigs')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) setGigsData({ allGigs: data.data, categories: data.categories || fallbackGigsData.categories })
      })
      .catch(() => setGigsData(fallbackGigsData))
  }, [])

  const allGigs = gigsData.allGigs
  const categories = gigsData.categories

  const filtered = allGigs.filter(g => {
    const matchCat = activeCategory === 'All' || g.category === activeCategory
    const matchQuery = !query || g.title.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQuery
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    if (sortBy === 'rating') return b.rating - a.rating
    return 0
  })

  return (
    <div className="gigs-page">
      <div className="gigs-header">
        <div className="container">
          <h1>{query ? `Results for "${query}"` : 'Browse All Services'}</h1>
          <p>{filtered.length} services available</p>
        </div>
      </div>
      <div className="container gigs-layout">
        <aside className="gigs-sidebar">
          <div className="filter-section">
            <h3>Category</h3>
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="filter-section">
            <h3>Budget</h3>
            <div className="budget-inputs">
              <input type="number" placeholder="Min $" />
              <span>—</span>
              <input type="number" placeholder="Max $" />
            </div>
          </div>
        </aside>
        <main className="gigs-main">
          <div className="gigs-toolbar">
            <span>{filtered.length} results</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="relevance">Best Match</option>
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
          <div className="gigs-list">
            {filtered.map(gig => (
              <Link to={`/gig/${gig.id}`} key={gig.id} className="gig-list-card">
                <div className="gig-list-img">
                  <span>{gig.category}</span>
                </div>
                <div className="gig-list-body">
                  <div className="seller-row">
                    <div className="seller-avatar">{gig.seller[0]}</div>
                    <span>{gig.seller}</span>
                  </div>
                  <h3>{gig.title}</h3>
                  <div className="gig-tags">
                    <span>⏱ {gig.delivery} delivery</span>
                    <span>⭐ {gig.rating} ({gig.reviews})</span>
                  </div>
                </div>
                <div className="gig-list-price">
                  <span>Starting at</span>
                  <strong>${gig.price}</strong>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
