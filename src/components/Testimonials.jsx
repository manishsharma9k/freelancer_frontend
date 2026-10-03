import './Testimonials.css'

const testimonials = [
  { name: 'Michael T.', role: 'CEO, TechStart', text: 'FreeLance helped us find an amazing developer in just 2 days. The quality of work exceeded our expectations!', rating: 5 },
  { name: 'Aisha B.', role: 'Marketing Manager', text: 'I\'ve used many freelancing platforms but this one stands out. The talent pool is incredible and the process is seamless.', rating: 5 },
  { name: 'Carlos R.', role: 'Startup Founder', text: 'Got my logo, website, and marketing materials all done through FreeLance. Saved us thousands compared to agencies.', rating: 5 },
]

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="section-title">What Our Clients Say</h2>
        <p className="section-sub">Trusted by thousands of businesses worldwide</p>
        <div className="testimonials-grid">
          {testimonials.map(t => (
            <div key={t.name} className="testimonial-card">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-stars">{'★'.repeat(t.rating)}</div>
              <div className="testimonial-author">
                <div className="author-avatar">{t.name[0]}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
