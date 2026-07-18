import React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Wallet, CloudSun, ListChecks, CalendarRange, Compass,
} from 'lucide-react'
import './Home.css'

const FEATURES = [
  {
    icon: CalendarRange,
    title: 'Day-by-day itineraries',
    text: 'Tell us your dates and destination — get a full plan of attractions and activities, organized morning to night.',
  },
  {
    icon: Wallet,
    title: 'Smart budget split',
    text: 'Your total budget is broken into accommodation, food, transport, sightseeing and shopping automatically.',
  },
  {
    icon: CloudSun,
    title: 'Weather-aware suggestions',
    text: 'See the forecast for every day of your trip, with activity ideas suited to sun, rain, or snow.',
  },
  {
    icon: ListChecks,
    title: 'Expense & packing tools',
    text: 'Track spend against budget in real time, and check off a packing list built for your destination\'s climate.',
  },
]

const STEPS = [
  { n: '01', title: 'Enter your trip details', text: 'Destination, dates, budget and traveler count.' },
  { n: '02', title: 'Get your personalized plan', text: 'Itinerary, budget split, weather & packing list — generated instantly.' },
  { n: '03', title: 'Save & track as you go', text: 'Keep trips in My Trips and log expenses along the way.' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="hero-route" aria-hidden="true">
          <svg viewBox="0 0 400 120" preserveAspectRatio="none">
            <path d="M0,90 C80,10 160,110 240,40 C300,-10 360,60 400,20" />
          </svg>
        </div>
        <div className="tw-container hero-inner">
          <span className="tw-eyebrow hero-eyebrow">Smart travel planning, zero guesswork</span>
          <h1 className="hero-title">
            Plan your next trip <em>like you've already been there.</em>
          </h1>
          <p className="hero-sub">
            TripWise turns a destination, a budget, and a few dates into a complete travel
            plan — itinerary, budget split, weather outlook, and packing list included.
          </p>
          <div className="hero-actions">
            <Link to="/plan" className="btn btn-primary">
              Plan Your Trip <ArrowRight size={18} />
            </Link>
            <Link to="/my-trips" className="btn btn-secondary">
              View My Trips
            </Link>
          </div>
          <div className="hero-stats">
            <div><strong>10+</strong><span>destinations ready</span></div>
            <div><strong>5</strong><span>budget categories</span></div>
            <div><strong>100%</strong><span>free, no signup</span></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="tw-section">
        <div className="tw-container">
          <span className="tw-eyebrow">What you get</span>
          <h2 className="section-title">Everything a trip plan needs, in one place</h2>
          <div className="feature-grid">
            {FEATURES.map((f) => (
              <div className="feature-card tw-card tw-card--hover" key={f.title}>
                <div className="feature-icon"><f.icon size={22} /></div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="tw-section how-section">
        <div className="tw-container">
          <span className="tw-eyebrow">The route</span>
          <h2 className="section-title">Three stops to a finished plan</h2>
          <div className="how-grid">
            {STEPS.map((s) => (
              <div className="how-card" key={s.n}>
                <span className="how-number">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="tw-section cta-section">
        <div className="tw-container cta-inner">
          <Compass size={34} />
          <h2>Ready to map out your next trip?</h2>
          <p>It takes less than a minute to generate a full plan.</p>
          <Link to="/plan" className="btn btn-primary">
            Start Planning <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
