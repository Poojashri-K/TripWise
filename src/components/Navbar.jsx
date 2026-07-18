import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Compass, Menu, X } from 'lucide-react'
import './Navbar.css'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/plan', label: 'Plan Trip' },
  { to: '/my-trips', label: 'My Trips' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="tw-container navbar-inner">
        <NavLink to="/" className="navbar-brand" onClick={() => setOpen(false)}>
          <Compass size={22} strokeWidth={2.4} />
          <span>TripWise</span>
        </NavLink>

        <nav className={`navbar-links ${open ? 'is-open' : ''}`}>
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `navbar-link ${isActive ? 'is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/plan" className="btn btn-primary btn-sm navbar-cta" onClick={() => setOpen(false)}>
            Plan Your Trip
          </NavLink>
        </nav>

        <button
          className="navbar-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  )
}
