import { Link } from 'react-router-dom'
import { DollarSign, Globe2, ShieldCheck, TrendingUp } from 'lucide-react'
import './BecomeSeller.css'

const perks = [
  { icon: DollarSign, title: 'Earn on Your Terms', desc: 'Set your own prices and work on projects you love.' },
  { icon: Globe2, title: 'Global Clients', desc: 'Access clients from 180+ countries around the world.' },
  { icon: ShieldCheck, title: 'Secure Payments', desc: 'Get paid safely and on time, every time.' },
  { icon: TrendingUp, title: 'Grow Your Business', desc: 'Build your reputation and grow your freelance career.' },
]

export default function BecomeSeller() {
  return (
    <div className="become-seller">
      <section className="seller-hero">
        <div className="container">
          <h1>Turn your skills into income</h1>
          <p>Join 50,000+ freelancers already earning on FreeLance</p>
          <Link to="/register" className="btn-primary" style={{fontSize:'17px', padding:'14px 40px'}}>Get Started — It's Free</Link>
        </div>
      </section>

      <section className="seller-perks">
        <div className="container">
          <h2 className="section-title">Why sell on FreeLance?</h2>
          <p className="section-sub">Everything you need to succeed as a freelancer</p>
          <div className="perks-grid">
            {perks.map(p => {
              const Icon = p.icon
              return (
                <div key={p.title} className="perk-card">
                  <span className="perk-icon"><Icon size={22} /></span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="seller-steps">
        <div className="container">
          <h2 className="section-title">How to get started</h2>
          <div className="seller-steps-list">
            {['Create your profile', 'Create your first gig', 'Get orders & deliver', 'Get paid'].map((step, i) => (
              <div key={step} className="seller-step">
                <div className="step-circle">{i + 1}</div>
                <span>{step}</span>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center', marginTop:'48px'}}>
            <Link to="/register" className="btn-primary" style={{fontSize:'16px', padding:'14px 40px'}}>Start Selling Today</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
