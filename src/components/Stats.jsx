import './Stats.css'

const stats = [
  { value: '50K+', label: 'Freelancers' },
  { value: '120K+', label: 'Projects Completed' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '180+', label: 'Countries Served' },
]

export default function Stats() {
  return (
    <section className="stats">
      <div className="container stats-grid">
        {stats.map(s => (
          <div key={s.label} className="stat-item">
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
