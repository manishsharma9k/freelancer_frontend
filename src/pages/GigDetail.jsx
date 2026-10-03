import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import './GigDetail.css'

const gigData = {
  1: { title: 'I will design a modern professional logo', seller: 'Ahmed K.', rating: 4.9, reviews: 312, price: 25, category: 'Design', delivery: '2 days', desc: 'I will create a unique, modern, and professional logo for your business. With 5+ years of experience in brand identity design, I deliver high-quality logos that make your brand stand out.', packages: [{name:'Basic', price:25, desc:'1 concept, 2 revisions, PNG/JPG'}, {name:'Standard', price:50, desc:'3 concepts, 5 revisions, all formats'}, {name:'Premium', price:100, desc:'5 concepts, unlimited revisions, brand guide'}] },
  2: { title: 'I will build a full stack React web application', seller: 'Sara M.', rating: 4.8, reviews: 198, price: 80, category: 'Tech', delivery: '7 days', desc: 'Professional full-stack web development using React, Node.js, and MongoDB. I build scalable, responsive, and modern web applications tailored to your business needs.', packages: [{name:'Basic', price:80, desc:'Landing page, responsive design'}, {name:'Standard', price:200, desc:'Full website, auth, database'}, {name:'Premium', price:400, desc:'Full app, API, deployment, support'}] },
}

export default function GigDetail() {
  const { id } = useParams()
  const gig = gigData[id] || gigData[1]
  const [selected, setSelected] = useState(0)

  return (
    <div className="gig-detail">
      <div className="container gig-detail-layout">
        <div className="gig-detail-main">
          <nav className="breadcrumb">
            <Link to="/">Home</Link> › <Link to="/gigs">Gigs</Link> › <span>{gig.category}</span>
          </nav>
          <h1>{gig.title}</h1>
          <div className="seller-profile">
            <div className="seller-avatar-lg">{gig.seller[0]}</div>
            <div>
              <strong>{gig.seller}</strong>
              <div className="seller-stats">
                <span>⭐ {gig.rating}</span>
                <span>({gig.reviews} reviews)</span>
                <span>⏱ {gig.delivery} delivery</span>
              </div>
            </div>
          </div>
          <div className="gig-preview">
            <span>{gig.category}</span>
          </div>
          <div className="gig-description">
            <h2>About This Gig</h2>
            <p>{gig.desc}</p>
          </div>
        </div>

        <aside className="gig-sidebar">
          <div className="package-tabs">
            {gig.packages.map((pkg, i) => (
              <button key={pkg.name} className={`pkg-tab ${selected === i ? 'active' : ''}`} onClick={() => setSelected(i)}>
                {pkg.name}
              </button>
            ))}
          </div>
          <div className="package-detail">
            <div className="pkg-price">${gig.packages[selected].price}</div>
            <p>{gig.packages[selected].desc}</p>
            <div className="pkg-meta">
              <span>⏱ {gig.delivery} delivery</span>
              <span>🔄 2 revisions</span>
            </div>
            <button className="btn-primary" style={{width:'100%', padding:'14px', fontSize:'16px', marginTop:'16px'}}>
              Continue (${gig.packages[selected].price})
            </button>
            <button className="btn-outline" style={{width:'100%', padding:'12px', fontSize:'15px', marginTop:'10px'}}>
              Contact Seller
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}
