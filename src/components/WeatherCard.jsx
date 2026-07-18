import React from 'react'
import { Sun, CloudSun, Cloud, CloudRain, CloudDrizzle, CloudSnow } from 'lucide-react'
import { formatDate } from '../utils/dateUtils.js'
import './WeatherCard.css'

const ICONS = { Sun, CloudSun, Cloud, CloudRain, CloudDrizzle, CloudSnow }

export default function WeatherCard({ forecast }) {
  const Icon = ICONS[forecast.icon] || Sun

  return (
    <div className={`weather-card ${forecast.isOutdoorFriendly ? 'is-outdoor' : 'is-indoor'}`}>
      <div className="weather-card-top">
        <span className="weather-day">Day {forecast.day}</span>
        <span className="weather-date">{formatDate(forecast.date)}</span>
      </div>
      <Icon size={38} className="weather-icon" />
      <p className="weather-condition">{forecast.condition}</p>
      <p className="weather-temp">
        <strong>{forecast.tempHigh}°</strong> / {forecast.tempLow}°C
      </p>
      <p className="weather-suggestion">{forecast.suggestion}</p>
    </div>
  )
}
