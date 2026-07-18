import React from 'react'
import { Compass } from 'lucide-react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="tw-container footer-inner">
        <div className="footer-brand">
          <Compass size={20} />
          <span>TripWise</span>
        </div>
        <p className="footer-tag">Plan smarter trips — itineraries, budgets & packing, all in one place.</p>
        <p className="footer-note">Built as a student portfolio project. Weather &amp; pricing data shown are simulated for demo purposes.</p>
        <p className="footer-copy">© {new Date().getFullYear()} TripWise. All routes lead somewhere new.</p>
      </div>
    </footer>
  )
}
