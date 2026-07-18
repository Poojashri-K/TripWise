const TRIPS_KEY = 'tripwise_trips'

export function getSavedTrips() {
  try {
    const raw = localStorage.getItem(TRIPS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveTrip(trip) {
  const trips = getSavedTrips()
  const exists = trips.some((t) => t.id === trip.id)
  const updated = exists
    ? trips.map((t) => (t.id === trip.id ? trip : t))
    : [trip, ...trips]
  localStorage.setItem(TRIPS_KEY, JSON.stringify(updated))
  return updated
}

export function deleteTrip(tripId) {
  const trips = getSavedTrips().filter((t) => t.id !== tripId)
  localStorage.setItem(TRIPS_KEY, JSON.stringify(trips))
  return trips
}

export function getTripById(tripId) {
  return getSavedTrips().find((t) => t.id === tripId) || null
}
