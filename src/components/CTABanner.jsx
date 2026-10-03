import { Link } from 'react-router-dom'
import './CTABanner.css'

export default function CTABanner() {
  return (
    <section className="cta-banner">
      <div className="container cta-inner">
        <div>
          <h2>Ready to get started?</h2>
          <p>Join over 50,000 freelancers and clients already on our platform.</p>
        </div>
        <div className="cta-actions">
          <Link to="/register" className="btn-primary">Hire a Freelancer</Link>
          <Link to="/become-seller" className="btn-white">Start Selling</Link>
        </div>
      </div>
    </section>
  )
}
