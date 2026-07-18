import React from 'react'
import { Link } from 'react-router-dom'
import { Compass, Code2, Sparkles, ShieldCheck } from 'lucide-react'
import './About.css'

const POINTS = [
  {
    icon: Sparkles,
    title: 'What it does',
    text: 'TripWise takes a destination, budget, dates and traveler count, then generates a full itinerary, budget split, weather outlook and packing checklist — instantly.',
  },
  {
    icon: Code2,
    title: 'How it\'s built',
    text: 'A React + Vite single-page app. All planning logic runs in the browser using structured mock data, so there\'s no backend or API key required.',
  },
  {
    icon: ShieldCheck,
    title: 'Your data',
    text: 'Saved trips and expenses live in your browser\'s localStorage only — nothing is sent to a server, and nothing leaves your device.',
  },
]

export default function About() {
  return (
    <section className="tw-section about-page">
      <div className="tw-container about-container">
        <span className="tw-eyebrow">About TripWise</span>
        <h1>A trip planner that does the busywork for you</h1>
        <p className="about-lead">
          TripWise was built to remove the blank-page problem of trip planning. Instead of juggling
          spreadsheets, weather apps and packing lists separately, you get one place that generates
          a starting plan in seconds — which you can then adjust to make it your own.
        </p>

        <div className="about-points">
          {POINTS.map((p) => (
            <div className="about-point" key={p.title}>
              <div className="about-point-icon"><p.icon size={20} /></div>
              <div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="about-cta">
          <Compass size={26} />
          <p>Built as a portfolio project — feel free to explore the code and adapt it.</p>
          <Link to="/plan" className="btn btn-primary">Try the Planner</Link>
        </div>
      </div>
    </section>
  )
}
