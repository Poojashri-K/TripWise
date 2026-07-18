import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Navigation, CalendarDays, Wallet, Users, Sparkles } from 'lucide-react'
import { useTrip } from '../context/TripContext.jsx'
import { validateTripForm } from '../utils/validation.js'
import { todayISO } from '../utils/dateUtils.js'
import Loader from '../components/Loader.jsx'
import './PlanTrip.css'

const EMPTY_FORM = {
  destination: '',
  origin: '',
  startDate: '',
  endDate: '',
  budget: '',
  travelers: '2',
}

const POPULAR = ['Goa, India', 'Manali, India', 'Paris, France', 'Tokyo, Japan', 'Bali, Indonesia', 'Dubai, UAE']

export default function PlanTrip() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const { createTrip, isGenerating } = useTrip()
  const navigate = useNavigate()

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validateTripForm(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    await createTrip(form)
    navigate('/trip/current')
  }

  if (isGenerating) {
    return <Loader label={`Building your ${form.destination || 'trip'} plan…`} />
  }

  return (
    <section className="tw-section plan-page">
      <div className="tw-container plan-container">
        <div className="plan-intro">
          <span className="tw-eyebrow">Trip planner</span>
          <h1>Tell us about your trip</h1>
          <p>Fill in the details below and TripWise will generate a full itinerary, budget split, weather outlook and packing list for you.</p>

          <div className="plan-popular">
            <span>Popular right now:</span>
            <div className="plan-popular-chips">
              {POPULAR.map((place) => (
                <button
                  type="button"
                  key={place}
                  className="plan-chip"
                  onClick={() => setForm((f) => ({ ...f, destination: place }))}
                >
                  {place}
                </button>
              ))}
            </div>
          </div>
        </div>

        <form className="plan-form tw-card" onSubmit={handleSubmit} noValidate>
          <div className="plan-form-grid">
            <div className="tw-field">
              <label htmlFor="destination"><MapPin size={15} /> Destination</label>
              <input
                id="destination"
                name="destination"
                type="text"
                placeholder="e.g. Goa, India"
                value={form.destination}
                onChange={handleChange}
                className={errors.destination ? 'has-error' : ''}
              />
              {errors.destination && <p className="tw-error">{errors.destination}</p>}
            </div>

            <div className="tw-field">
              <label htmlFor="origin"><Navigation size={15} /> Starting location</label>
              <input
                id="origin"
                name="origin"
                type="text"
                placeholder="e.g. Mumbai, India"
                value={form.origin}
                onChange={handleChange}
                className={errors.origin ? 'has-error' : ''}
              />
              {errors.origin && <p className="tw-error">{errors.origin}</p>}
            </div>

            <div className="tw-field">
              <label htmlFor="startDate"><CalendarDays size={15} /> Start date</label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                min={todayISO()}
                value={form.startDate}
                onChange={handleChange}
                className={errors.startDate ? 'has-error' : ''}
              />
              {errors.startDate && <p className="tw-error">{errors.startDate}</p>}
            </div>

            <div className="tw-field">
              <label htmlFor="endDate"><CalendarDays size={15} /> End date</label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                min={form.startDate || todayISO()}
                value={form.endDate}
                onChange={handleChange}
                className={errors.endDate ? 'has-error' : ''}
              />
              {errors.endDate && <p className="tw-error">{errors.endDate}</p>}
            </div>

            <div className="tw-field">
              <label htmlFor="budget"><Wallet size={15} /> Total budget (₹)</label>
              <input
                id="budget"
                name="budget"
                type="number"
                min="1"
                placeholder="e.g. 50000"
                value={form.budget}
                onChange={handleChange}
                className={errors.budget ? 'has-error' : ''}
              />
              {errors.budget && <p className="tw-error">{errors.budget}</p>}
            </div>

            <div className="tw-field">
              <label htmlFor="travelers"><Users size={15} /> Number of travelers</label>
              <input
                id="travelers"
                name="travelers"
                type="number"
                min="1"
                max="30"
                value={form.travelers}
                onChange={handleChange}
                className={errors.travelers ? 'has-error' : ''}
              />
              {errors.travelers && <p className="tw-error">{errors.travelers}</p>}
            </div>
          </div>

          <button type="submit" className="btn btn-primary plan-submit">
            <Sparkles size={18} /> Generate My Trip Plan
          </button>
        </form>
      </div>
    </section>
  )
}
