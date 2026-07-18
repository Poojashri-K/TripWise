import React from 'react'
import { Sunrise, Sun, Moon } from 'lucide-react'
import { formatDate } from '../utils/dateUtils.js'
import './ItineraryDayCard.css'

const SLOT_ICON = { Morning: Sunrise, Afternoon: Sun, Evening: Moon }

export default function ItineraryDayCard({ day }) {
  return (
    <div className="itinerary-row">
      <div className="itinerary-node">
        <span className="itinerary-node-dot">{day.day}</span>
      </div>

      <div className="tw-card itinerary-card">
        <div className="itinerary-card-head">
          <h4>{day.title}</h4>
          {day.date && <span className="itinerary-date">{formatDate(day.date)}</span>}
        </div>
        <ul className="itinerary-activities">
          {day.activities.map((activity, i) => {
            const Icon = SLOT_ICON[activity.slot] || Sun
            return (
              <li key={i}>
                <Icon size={16} />
                <div>
                  <span className="itinerary-slot">{activity.slot}</span>
                  <p>{activity.title}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
