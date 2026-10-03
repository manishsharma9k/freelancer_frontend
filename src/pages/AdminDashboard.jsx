import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminDashboard.css'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('freelancer_token')

    if (!token) {
      navigate('/login')
      return
    }

    const loadDashboard = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Failed to load dashboard')
        }

        setDashboard(data.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [navigate])

  if (loading) return <div className="admin-loading">Loading dashboard...</div>
  if (error) return <div className="admin-error">{error}</div>
  if (!dashboard) return null

  return (
    <div className="admin-page">
      <div className="admin-container">
        <header className="admin-header">
          <div>
            <p className="eyebrow">Admin panel</p>
            <h1>Dashboard Overview</h1>
          </div>
          <button
            className="btn-primary admin-logout"
            onClick={() => {
              localStorage.removeItem('freelancer_token')
              localStorage.removeItem('freelancer_user')
              navigate('/login')
            }}
          >
            Logout
          </button>
        </header>

        <section className="summary-grid">
          {dashboard.summary.map((item) => (
            <div className="summary-card" key={item.label}>
              <p>{item.label}</p>
              <h3>{item.value}</h3>
              <span>{item.change}</span>
            </div>
          ))}
        </section>

        <section className="admin-grid">
          <div className="panel large-panel">
            <div className="panel-head">
              <h2>Recent Projects</h2>
            </div>
            <div className="project-list">
              {dashboard.recentProjects.map((project) => (
                <div className="project-row" key={project.name}>
                  <div>
                    <strong>{project.name}</strong>
                    <small>{project.client}</small>
                  </div>
                  <div className="project-meta">
                    <span className="status-pill">{project.status}</span>
                    <span>{project.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">
              <h2>Quick Stats</h2>
            </div>
            <div className="stats-stack">
              {dashboard.quickStats.map((stat) => (
                <div className="stat-row" key={stat.label}>
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="admin-grid lower-grid">
          <div className="panel">
            <div className="panel-head">
              <h2>Recent Activity</h2>
            </div>
            <ul className="activity-list">
              {dashboard.activity.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                  <small>{item.time}</small>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel">
            <div className="panel-head">
              <h2>Tasks</h2>
            </div>
            <div className="task-list">
              {dashboard.tasks.map((item) => (
                <div className="task-row" key={item.task}>
                  <div>
                    <strong>{item.task}</strong>
                    <small>{item.owner}</small>
                  </div>
                  <span className={`priority ${item.priority.toLowerCase()}`}>{item.priority}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
