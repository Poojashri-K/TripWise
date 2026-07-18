import React from 'react'
import { Compass } from 'lucide-react'
import './Loader.css'

export default function Loader({ label = 'Plotting your route…' }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader-spin">
        <Compass size={34} />
      </span>
      <p>{label}</p>
    </div>
  )
}
