import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MapPinned, Plus } from 'lucide-react'
import { useTrip } from '../context/TripContext.jsx'
import TripCard from '../components/TripCard.jsx'
import './MyTrips.css'

export default function MyTrips() {
  const { savedTrips, deleteSavedTrip, loadTrip } = useTrip()
  const navigate = useNavigate()

  function handleView(tripId) {
    loadTrip(tripId)
    navigate(`/trip/${tripId}`)
  }

  function handleDelete(tripId) {
    const confirmed = window.confirm('Delete this saved trip? This cannot be undone.')
    if (confirmed) deleteSavedTrip(tripId)
  }

  return (
    <section className="tw-section my-trips-page">
      <div className="tw-container">
        <div className="my-trips-head">
          <div>
            <span className="tw-eyebrow">Saved plans</span>
            <h1>My Trips</h1>
            <p>Trips you've saved are stored right in this browser, so they're here whenever you come back.</p>
          </div>
          <Link to="/plan" className="btn btn-primary">
            <Plus size={18} /> Plan a New Trip
          </Link>
        </div>

        {savedTrips.length === 0 ? (
          <div className="my-trips-empty tw-card">
            <MapPinned size={40} />
            <h3>No saved trips yet</h3>
            <p>Generate a plan and hit "Save This Trip" to see it here.</p>
            <Link to="/plan" className="btn btn-primary">Plan Your First Trip</Link>
          </div>
        ) : (
          <div className="my-trips-grid">
            {savedTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} onDelete={handleDelete} onView={handleView} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
