const TIME_SLOTS = ['Morning', 'Afternoon', 'Evening']

const FILLER_ACTIVITIES = [
  'Leisurely breakfast at a local café',
  'Free time to relax or explore on your own',
  'Try a highly-rated local restaurant for dinner',
  'Wander through a nearby neighborhood',
  'Rest and recharge at your accommodation',
  'Sample street food from a local vendor',
]

// Distributes a destination's attraction list across the number of trip days,
// filling in generic activities where the attraction list runs short so every
// day always has a full 3-slot plan.
export function generateItinerary(destination, numDays, dateObjects) {
  const attractions = [...destination.attractions]
  const days = []

  for (let dayIndex = 0; dayIndex < numDays; dayIndex++) {
    const activities = TIME_SLOTS.map((slot, slotIndex) => {
      let title
      if (attractions.length > 0) {
        title = attractions.shift()
      } else {
        title = FILLER_ACTIVITIES[(dayIndex * 3 + slotIndex) % FILLER_ACTIVITIES.length]
      }
      return { slot, title }
    })

    days.push({
      day: dayIndex + 1,
      date: dateObjects[dayIndex] ? dateObjects[dayIndex].toISOString().split('T')[0] : null,
      title:
        dayIndex === 0
          ? `Arrival in ${destination.name}`
          : dayIndex === numDays - 1
          ? `Farewell to ${destination.name}`
          : `Exploring ${destination.name} — Day ${dayIndex + 1}`,
      activities,
    })
  }

  return days
}
