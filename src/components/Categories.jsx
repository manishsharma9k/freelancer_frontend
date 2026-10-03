import { useNavigate } from 'react-router-dom'
import { Palette, Code2, PenTool, Megaphone, Clapperboard, Music2, Briefcase, Camera } from 'lucide-react'
import './Categories.css'

const categories = [
  { icon: Palette, title: 'Graphics & Design', count: '1,200+ services' },
  { icon: Code2, title: 'Programming & Tech', count: '980+ services' },
  { icon: PenTool, title: 'Writing & Translation', count: '750+ services' },
  { icon: Megaphone, title: 'Digital Marketing', count: '620+ services' },
  { icon: Clapperboard, title: 'Video & Animation', count: '540+ services' },
  { icon: Music2, title: 'Music & Audio', count: '430+ services' },
  { icon: Briefcase, title: 'Business', count: '380+ services' },
  { icon: Camera, title: 'Photography', count: '290+ services' },
]

export default function Categories() {
  const navigate = useNavigate()
  return (
    <section className="categories">
      <div className="container">
        <h2 className="section-title">Explore Categories</h2>
        <p className="section-sub">Find the service you need from our top categories</p>
        <div className="cat-grid">
          {categories.map(cat => {
            const Icon = cat.icon
            return (
              <div key={cat.title} className="cat-card" onClick={() => navigate(`/gigs?cat=${encodeURIComponent(cat.title)}`)}>
                <span className="cat-icon"><Icon size={22} /></span>
                <h3>{cat.title}</h3>
                <p>{cat.count}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
