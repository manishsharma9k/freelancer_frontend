import { Link } from 'react-router-dom'
import './FeaturedGigs.css'

const gigs = [
  { id: 1, title: 'I will design a modern professional logo', seller: 'Ahmed K.', rating: 4.9, reviews: 312, price: 25, badge: 'Top Rated', category: 'Design' },
  { id: 2, title: 'I will build a full stack React web application', seller: 'Sara M.', rating: 4.8, reviews: 198, price: 80, badge: 'Pro', category: 'Tech' },
  { id: 3, title: 'I will write SEO optimized blog articles', seller: 'John D.', rating: 4.7, reviews: 445, price: 15, badge: null, category: 'Writing' },
  { id: 4, title: 'I will create a stunning social media video ad', seller: 'Priya S.', rating: 5.0, reviews: 87, price: 50, badge: 'Rising Talent', category: 'Video' },
  { id: 5, title: 'I will setup and manage your Google Ads campaign', seller: 'Omar F.', rating: 4.9, reviews: 231, price: 60, badge: 'Top Rated', category: 'Marketing' },
  { id: 6, title: 'I will develop a mobile app for iOS and Android', seller: 'Lena R.', rating: 4.8, reviews: 156, price: 120, badge: 'Pro', category: 'Tech' },
]

function StarRating({ rating }) {
  return (
    <span className="stars">
      {'★'.repeat(Math.floor(rating))}<span className="rating-num">{rating}</span>
    </span>
  )
}

export default function FeaturedGigs() {
  return (
    <section className="featured-gigs">
      <div className="container">
        <h2 className="section-title">Featured Services</h2>
        <p className="section-sub">Hand-picked top services from our best sellers</p>
        <div className="gigs-grid">
          {gigs.map(gig => (
            <Link to={`/gig/${gig.id}`} key={gig.id} className="gig-card">
              <div className="gig-img">
                <div className="gig-img-placeholder">
                  <span>{gig.category}</span>
                </div>
                {gig.badge && <span className="gig-badge">{gig.badge}</span>}
              </div>
              <div className="gig-body">
                <div className="seller-info">
                  <div className="seller-avatar">{gig.seller[0]}</div>
                  <span>{gig.seller}</span>
                </div>
                <h3>{gig.title}</h3>
                <div className="gig-meta">
                  <StarRating rating={gig.rating} />
                  <span className="review-count">({gig.reviews})</span>
                </div>
              </div>
              <div className="gig-footer">
                <span className="from">Starting at</span>
                <span className="price">${gig.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
