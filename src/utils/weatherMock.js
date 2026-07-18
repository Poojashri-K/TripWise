import { CLIMATES } from '../data/destinations.js'

// Simple deterministic pseudo-random number generator so the same
// destination + date always produces the same "forecast" (no backend needed).
function seededRandom(seed) {
  let x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function hashString(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function randInRange([min, max], rnd) {
  return Math.round(min + rnd * (max - min))
}

const CONDITIONS = {
  sunny: { label: 'Sunny', icon: 'Sun', outdoor: true },
  clear: { label: 'Clear Skies', icon: 'Sun', outdoor: true },
  partlyCloudy: { label: 'Partly Cloudy', icon: 'CloudSun', outdoor: true },
  cloudy: { label: 'Cloudy', icon: 'Cloud', outdoor: true },
  rainy: { label: 'Rainy', icon: 'CloudRain', outdoor: false },
  drizzle: { label: 'Light Drizzle', icon: 'CloudDrizzle', outdoor: false },
  snowy: { label: 'Snowy', icon: 'CloudSnow', outdoor: false },
}

function pickCondition(climateKey, rnd, rainChance) {
  if (climateKey === 'cold' && rnd < 0.3) return CONDITIONS.snowy
  if (rnd < rainChance) return rnd < rainChance / 2 ? CONDITIONS.rainy : CONDITIONS.drizzle
  if (rnd < rainChance + 0.25) return CONDITIONS.cloudy
  if (rnd < rainChance + 0.55) return CONDITIONS.partlyCloudy
  return climateKey === 'desert' ? CONDITIONS.clear : CONDITIONS.sunny
}

function suggestionFor(condition, climateLabel) {
  if (!condition.outdoor) {
    return `${condition.label.toLowerCase()} expected — great day for museums, indoor markets, cafés, or spa time.`
  }
  if (condition.label === 'Sunny' || condition.label === 'Clear Skies') {
    return `Perfect ${climateLabel.toLowerCase()} weather — ideal for sightseeing, beaches, or outdoor tours.`
  }
  return `Mild conditions — good for a mix of walking tours and relaxed outdoor exploring.`
}

/**
 * Generate a mock weather forecast for each day of the trip.
 * @param {string} destinationName
 * @param {string} climateKey - key into CLIMATES
 * @param {Date[]} dateObjects - array of Date objects, one per trip day
 */
export function generateWeather(destinationName, climateKey, dateObjects) {
  const climate = CLIMATES[climateKey] || CLIMATES.temperate
  const baseSeed = hashString(destinationName || 'destination')

  return dateObjects.map((date, index) => {
    const seed = baseSeed + index * 97 + date.getDate()
    const rnd = seededRandom(seed)
    const condition = pickCondition(climateKey, rnd, climate.rainChance)
    const tempHigh = randInRange(climate.tempHigh, seededRandom(seed + 1))
    const tempLow = randInRange(climate.tempLow, seededRandom(seed + 2))

    return {
      day: index + 1,
      date: date.toISOString().split('T')[0],
      condition: condition.label,
      icon: condition.icon,
      isOutdoorFriendly: condition.outdoor,
      tempHigh,
      tempLow,
      suggestion: suggestionFor(condition, climate.label),
    }
  })
}
