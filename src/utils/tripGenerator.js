import { findDestination, genericDestination } from '../data/destinations.js'
import { generateItinerary } from './itineraryGenerator.js'
import { generateWeather } from './weatherMock.js'
import { calculateBudgetBreakdown } from './budgetCalculator.js'
import { generatePackingList } from './packingGenerator.js'
import { daysBetween, addDays } from './dateUtils.js'

export function generateTrip(form) {
  const destination = findDestination(form.destination) || genericDestination(form.destination.trim())
  const numDays = daysBetween(form.startDate, form.endDate)
  const dateObjects = Array.from({ length: numDays }, (_, i) => addDays(form.startDate, i))

  const itinerary = generateItinerary(destination, numDays, dateObjects)
  const weather = generateWeather(destination.name, destination.climate, dateObjects)
  const budgetBreakdown = calculateBudgetBreakdown(form.budget)
  const packingList = generatePackingList(destination.climate)

  return {
    id: `trip-${Date.now()}`,
    createdAt: new Date().toISOString(),
    destination: destination.name,
    destinationClimate: destination.climate,
    currency: destination.currency || 'INR',
    origin: form.origin.trim(),
    startDate: form.startDate,
    endDate: form.endDate,
    numDays,
    budget: Number(form.budget),
    travelers: Number(form.travelers),
    itinerary,
    weather,
    budgetBreakdown,
    packingList,
    expenses: [],
  }
}
