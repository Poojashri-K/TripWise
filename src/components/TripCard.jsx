import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Calendar, Users, Wallet, Trash2, ArrowRight } from 'lucide-react'
import { formatDateShort } from '../utils/dateUtils.js'
import { formatCurrency } from '../utils/formatters.js'
import './TripCard.css'

export default function TripCard({ trip, onDelete, onView }) {
  const navigate = useNavigate()

  return (
    <article className="trip-card tw-card tw-card--hover">
      <div className="trip-card-header">
        <span className="tw-eyebrow">{trip.numDays} day trip</span>
        <h3>{trip.destination}</h3>
      </div>

      <ul className="trip-card-meta">
        <li><MapPin size={15} /> From {trip.origin}</li>
        <li><Calendar size={15} /> {formatDateShort(trip.startDate)} – {formatDateShort(trip.endDate)}</li>
        <li><Users size={15} /> {trip.travelers} traveler{trip.travelers > 1 ? 's' : ''}</li>
        <li><Wallet size={15} /> {formatCurrency(trip.budget, trip.currency)} budget</li>
      </ul>

      <div className="trip-card-actions">
        <button
          className="btn btn-outline btn-sm"
          onClick={() => (onView ? onView(trip.id) : navigate(`/trip/${trip.id}`))}
        >
          View plan <ArrowRight size={16} />
        </button>
        <button className="btn-danger" onClick={() => onDelete(trip.id)} aria-label={`Delete trip to ${trip.destination}`}>
          <Trash2 size={15} />
        </button>
      </div>
    </article>
  )
}
