import { ArrowRight, MessageSquareText, Search, ShieldCheck, Users } from 'lucide-react'
import './HowItWorks.css'

const steps = [
  { num: '01', icon: Search, title: 'Post a Job', desc: 'Tell us what you need done. It only takes a minute and is completely free.' },
  { num: '02', icon: Users, title: 'Choose a Freelancer', desc: 'Browse profiles, reviews, and portfolios to find the perfect match.' },
  { num: '03', icon: MessageSquareText, title: 'Collaborate', desc: 'Chat, share files, and track progress all in one place.' },
  { num: '04', icon: ShieldCheck, title: 'Pay Safely', desc: 'Only release payment when you are 100% satisfied with the work.' },
]

export default function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="container">
        <h2 className="section-title">How It Works</h2>
        <p className="section-sub">Get your project done in 4 simple steps</p>
        <div className="steps-grid">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.num} className="step-card">
                <div className="step-num">{step.num}</div>
                <div className="step-icon"><Icon size={22} /></div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                {i < steps.length - 1 && <div className="step-arrow"><ArrowRight size={16} /></div>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
