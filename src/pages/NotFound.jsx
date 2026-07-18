import React from 'react'
import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import './NotFound.css'

export default function NotFound() {
  return (
    <section className="not-found">
      <Compass size={40} />
      <h1>You've wandered off the map</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </section>
  )
}
