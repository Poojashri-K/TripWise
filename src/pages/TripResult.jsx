import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  CalendarRange, Wallet, CloudSun, Receipt, Luggage, MapPin, Navigation,
  Users, BookmarkPlus, BookmarkCheck, CalendarDays,
} from 'lucide-react'
import { useTrip } from '../context/TripContext.jsx'
import ItineraryDayCard from '../components/ItineraryDayCard.jsx'
import WeatherCard from '../components/WeatherCard.jsx'
import BudgetBreakdown from '../components/BudgetBreakdown.jsx'
import ExpenseTracker from '../components/ExpenseTracker.jsx'
import PackingChecklist from '../components/PackingChecklist.jsx'
import Tabs from '../components/Tabs.jsx'
import { formatDateShort } from '../utils/dateUtils.js'
import { formatCurrency } from '../utils/formatters.js'
import { spentByCategory } from '../utils/budgetCalculator.js'
import './TripResult.css'

const TABS = [
  { id: 'itinerary', label: 'Itinerary', icon: <CalendarRange size={16} /> },
  { id: 'budget', label: 'Budget', icon: <Wallet size={16} /> },
  { id: 'weather', label: 'Weather', icon: <CloudSun size={16} /> },
  { id: 'expenses', label: 'Expenses', icon: <Receipt size={16} /> },
  { id: 'packing', label: 'Packing List', icon: <Luggage size={16} /> },
]

export default function TripResult() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentTrip, loadTrip, saveCurrentTrip, isTripSaved, updateCurrentTrip } = useTrip()
  const [activeTab, setActiveTab] = useState('itinerary')

  useEffect(() => {
    if (id && id !== 'current') {
      loadTrip(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const trip = currentTrip

  if (!trip) {
    return (
      <div className="tw-section trip-empty-state">
        <div className="tw-container">
          <h2>No trip plan loaded yet</h2>
          <p>Generate a new trip or open one from My Trips.</p>
          <div className="trip-empty-actions">
            <Link to="/plan" className="btn btn-primary">Plan a Trip</Link>
            <Link to="/my-trips" className="btn btn-outline">My Trips</Link>
          </div>
        </div>
      </div>
    )
  }

  const saved = isTripSaved(trip.id)
  const spentMap = spentByCategory(trip.expenses)

  function handleSave() {
    saveCurrentTrip(trip)
  }

  function handleAddExpense(expense) {
    updateCurrentTrip((prev) => ({ ...prev, expenses: [expense, ...prev.expenses] }))
  }

  function handleDeleteExpense(expenseId) {
    updateCurrentTrip((prev) => ({ ...prev, expenses: prev.expenses.filter((e) => e.id !== expenseId) }))
  }

  function handleTogglePacking(itemId) {
    updateCurrentTrip((prev) => ({
      ...prev,
      packingList: prev.packingList.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      ),
    }))
  }

  function handleAddPackingItem({ category, item }) {
    updateCurrentTrip((prev) => ({
      ...prev,
      packingList: [
        ...prev.packingList,
        { id: `pack-custom-${Date.now()}`, category, item, checked: false },
      ],
    }))
  }

  return (
    <div className="trip-result">
      <section className="trip-hero">
        <div className="tw-container">
          <span className="tw-eyebrow">{trip.numDays}-day trip plan</span>
          <div className="trip-hero-head">
            <h1>{trip.destination}</h1>
            <button
              className={`btn ${saved ? 'btn-ghost' : 'btn-primary'} trip-save-btn`}
              onClick={handleSave}
              disabled={saved}
            >
              {saved ? <BookmarkCheck size={17} /> : <BookmarkPlus size={17} />}
              {saved ? 'Saved to My Trips' : 'Save This Trip'}
            </button>
          </div>

          <ul className="trip-hero-meta">
            <li><Navigation size={15} /> From {trip.origin}</li>
            <li><MapPin size={15} /> To {trip.destination}</li>
            <li><CalendarDays size={15} /> {formatDateShort(trip.startDate)} – {formatDateShort(trip.endDate)}</li>
            <li><Users size={15} /> {trip.travelers} traveler{trip.travelers > 1 ? 's' : ''}</li>
            <li><Wallet size={15} /> {formatCurrency(trip.budget, trip.currency)}</li>
          </ul>
        </div>
      </section>

      <section className="tw-section trip-body">
        <div className="tw-container">
          <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

          {activeTab === 'itinerary' && (
            <div className="tw-rise">
              <h2 className="trip-panel-title">Day-by-day itinerary</h2>
              <div className="itinerary-timeline">
                {trip.itinerary.map((day) => (
                  <ItineraryDayCard key={day.day} day={day} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'budget' && (
            <div className="tw-rise trip-panel-narrow">
              <h2 className="trip-panel-title">Where your budget goes</h2>
              <p className="trip-panel-sub">
                Estimated split of your {formatCurrency(trip.budget, trip.currency)} budget across {trip.numDays} days.
              </p>
              <BudgetBreakdown breakdown={trip.budgetBreakdown} currency={trip.currency} spentByCategory={spentMap} />
            </div>
          )}

          {activeTab === 'weather' && (
            <div className="tw-rise">
              <h2 className="trip-panel-title">Weather outlook</h2>
              <p className="trip-panel-sub">Simulated forecast for {trip.destination} — indoor picks are suggested on rainy or snowy days.</p>
              <div className="weather-scroll">
                {trip.weather.map((forecast) => (
                  <WeatherCard key={forecast.day} forecast={forecast} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'expenses' && (
            <div className="tw-rise trip-panel-narrow">
              <h2 className="trip-panel-title">Expense tracker</h2>
              <p className="trip-panel-sub">Log spending as you go and see how it compares to your budget.</p>
              <ExpenseTracker
                expenses={trip.expenses}
                budget={trip.budget}
                currency={trip.currency}
                onAdd={handleAddExpense}
                onDelete={handleDeleteExpense}
              />
            </div>
          )}

          {activeTab === 'packing' && (
            <div className="tw-rise trip-panel-narrow">
              <h2 className="trip-panel-title">Packing checklist</h2>
              <p className="trip-panel-sub">Tailored to {trip.destination}'s climate — check items off as you pack.</p>
              <PackingChecklist
                items={trip.packingList}
                onToggle={handleTogglePacking}
                onAddItem={handleAddPackingItem}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
