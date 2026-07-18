import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { generateTrip } from '../utils/tripGenerator.js'
import { getSavedTrips, saveTrip as persistTrip, deleteTrip as removeTrip } from '../utils/storage.js'

const TripContext = createContext(null)

export function TripProvider({ children }) {
  const [currentTrip, setCurrentTrip] = useState(null)
  const [savedTrips, setSavedTrips] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    setSavedTrips(getSavedTrips())
  }, [])

  // Simulates a short "planning" delay so the loading state has something to show.
  const createTrip = useCallback((formData) => {
    setIsGenerating(true)
    return new Promise((resolve) => {
      setTimeout(() => {
        const trip = generateTrip(formData)
        setCurrentTrip(trip)
        setIsGenerating(false)
        resolve(trip)
      }, 900)
    })
  }, [])

  const isTripSaved = useCallback(
    (tripId) => savedTrips.some((t) => t.id === tripId),
    [savedTrips]
  )

  const saveCurrentTrip = useCallback((trip) => {
    const updated = persistTrip(trip)
    setSavedTrips(updated)
  }, [])

  const deleteSavedTrip = useCallback((tripId) => {
    const updated = removeTrip(tripId)
    setSavedTrips(updated)
  }, [])

  const loadTrip = useCallback(
    (tripId) => {
      const trip = savedTrips.find((t) => t.id === tripId) || null
      setCurrentTrip(trip)
      return trip
    },
    [savedTrips]
  )

  // Updates the trip in memory, and if it was already saved, keeps localStorage in sync.
  const updateCurrentTrip = useCallback(
    (updater) => {
      setCurrentTrip((prev) => {
        if (!prev) return prev
        const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater }
        setSavedTrips((prevSaved) => {
          const exists = prevSaved.some((t) => t.id === next.id)
          if (!exists) return prevSaved
          const updatedList = persistTrip(next)
          return updatedList
        })
        return next
      })
    },
    []
  )

  const value = {
    currentTrip,
    savedTrips,
    isGenerating,
    createTrip,
    saveCurrentTrip,
    deleteSavedTrip,
    loadTrip,
    updateCurrentTrip,
    isTripSaved,
    setCurrentTrip,
  }

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>
}

export function useTrip() {
  const ctx = useContext(TripContext)
  if (!ctx) throw new Error('useTrip must be used within a TripProvider')
  return ctx
}
