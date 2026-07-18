// Mock destination database.
// Each destination has a climate profile (used to generate realistic mock
// weather) and a list of attractions/activities (used to build itineraries).
// If a user types a destination that isn't in this list, the app falls back
// to a generic "explorer" template so the app never breaks — see
// utils/itineraryGenerator.js and utils/weatherMock.js.

export const CLIMATES = {
  tropical: { label: 'Tropical', tempHigh: [28, 34], tempLow: [22, 26], rainChance: 0.4 },
  temperate: { label: 'Temperate', tempHigh: [18, 26], tempLow: [9, 15], rainChance: 0.3 },
  desert: { label: 'Desert', tempHigh: [30, 41], tempLow: [18, 24], rainChance: 0.05 },
  cold: { label: 'Cold', tempHigh: [2, 10], tempLow: [-6, 1], rainChance: 0.25 },
  coastal: { label: 'Coastal', tempHigh: [22, 29], tempLow: [16, 21], rainChance: 0.3 },
}

export const DESTINATIONS = [
  {
    name: 'Goa, India',
    aliases: ['goa'],
    climate: 'coastal',
    currency: 'INR',
    attractions: [
      'Relax at Baga Beach', 'Explore Fort Aguada', 'Wander Old Goa churches',
      'Sunset cruise on the Mandovi River', 'Spice plantation tour',
      'Anjuna flea market', 'Snorkeling at Grande Island', 'Dudhsagar Waterfalls day trip',
      'Nightlife at Tito\'s Lane', 'Kayaking in the backwaters',
    ],
  },
  {
    name: 'Manali, India',
    aliases: ['manali'],
    climate: 'cold',
    currency: 'INR',
    attractions: [
      'Hike to Solang Valley', 'Rohtang Pass excursion', 'Visit Hadimba Temple',
      'Old Manali café hopping', 'River rafting on the Beas', 'Paragliding over the valley',
      'Explore Jogini Waterfall trail', 'Local Himachali cuisine tasting',
      'Nature walk in Van Vihar', 'Visit Vashisht hot springs',
    ],
  },
  {
    name: 'Paris, France',
    aliases: ['paris'],
    climate: 'temperate',
    currency: 'EUR',
    attractions: [
      'Climb the Eiffel Tower', 'Explore the Louvre Museum', 'Stroll Montmartre & Sacré-Cœur',
      'Seine River cruise', 'Notre-Dame Cathedral area walk', 'Champs-Élysées shopping',
      'Musée d\'Orsay art tour', 'Day trip to Palace of Versailles',
      'Latin Quarter café culture', 'Le Marais neighborhood exploration',
    ],
  },
  {
    name: 'Tokyo, Japan',
    aliases: ['tokyo'],
    climate: 'temperate',
    currency: 'JPY',
    attractions: [
      'Explore Senso-ji Temple in Asakusa', 'Shibuya Crossing & shopping', 'Tokyo Skytree views',
      'Tsukiji Outer Market food tour', 'Akihabara electronics & anime district',
      'Meiji Shrine forest walk', 'Day trip to Mt. Fuji', 'Shinjuku Gyoen gardens',
      'Ginza shopping district', 'teamLab digital art museum',
    ],
  },
  {
    name: 'Bali, Indonesia',
    aliases: ['bali'],
    climate: 'tropical',
    currency: 'IDR',
    attractions: [
      'Sunrise trek up Mt. Batur', 'Ubud rice terraces walk', 'Visit Tanah Lot temple',
      'Snorkeling at Nusa Penida', 'Uluwatu Temple sunset', 'Balinese cooking class',
      'Tegallalang Rice Terraces photo stop', 'Waterbom water park',
      'Traditional Balinese spa day', 'Seminyak beach clubs',
    ],
  },
  {
    name: 'Dubai, UAE',
    aliases: ['dubai'],
    climate: 'desert',
    currency: 'AED',
    attractions: [
      'Burj Khalifa observation deck', 'Desert safari & dune bashing', 'Dubai Mall & Fountain show',
      'Old Dubai souks & abra ride', 'Palm Jumeirah views', 'Dubai Marina walk',
      'Museum of the Future', 'Ski Dubai indoor snow park',
      'Global Village (seasonal)', 'Dhow dinner cruise',
    ],
  },
  {
    name: 'New York, USA',
    aliases: ['new york', 'nyc'],
    climate: 'temperate',
    currency: 'USD',
    attractions: [
      'Central Park stroll', 'Statue of Liberty & Ellis Island', 'Times Square lights',
      'Metropolitan Museum of Art', 'Brooklyn Bridge walk', 'Top of the Rock views',
      'High Line elevated park', 'Broadway show', 'SoHo & Greenwich Village shopping',
      'One World Observatory',
    ],
  },
  {
    name: 'London, UK',
    aliases: ['london'],
    climate: 'temperate',
    currency: 'GBP',
    attractions: [
      'Tower of London tour', 'London Eye ride', 'British Museum visit',
      'Buckingham Palace & changing of the guard', 'Camden Market browsing',
      'Westminster Abbey', 'Thames river cruise', 'Notting Hill neighborhood walk',
      'West End show', 'Borough Market food tasting',
    ],
  },
  {
    name: 'Kerala, India',
    aliases: ['kerala', 'alleppey', 'munnar'],
    climate: 'tropical',
    currency: 'INR',
    attractions: [
      'Houseboat cruise on the backwaters', 'Munnar tea plantation tour', 'Periyar wildlife safari',
      'Kathakali dance performance', 'Ayurvedic spa treatment', 'Fort Kochi heritage walk',
      'Spice garden tour', 'Varkala cliff beach', 'Vembanad Lake sunset',
      'Traditional Kerala sadya meal',
    ],
  },
  {
    name: 'Bangkok, Thailand',
    aliases: ['bangkok'],
    climate: 'tropical',
    currency: 'THB',
    attractions: [
      'Grand Palace & Wat Phra Kaew', 'Chatuchak weekend market', 'Chao Phraya river cruise',
      'Wat Arun temple visit', 'Floating market day trip', 'Khao San Road nightlife',
      'Thai cooking class', 'Rooftop bar sunset', 'Chinatown food crawl',
      'Muay Thai match',
    ],
  },
]

export function findDestination(query) {
  if (!query) return null
  const q = query.trim().toLowerCase()
  return (
    DESTINATIONS.find(
      (d) => d.name.toLowerCase() === q || d.aliases.some((a) => q.includes(a))
    ) || null
  )
}

// Generic fallback so any typed destination still produces a full itinerary.
export function genericDestination(name) {
  return {
    name,
    climate: 'temperate',
    currency: 'USD',
    attractions: [
      `Walking tour of ${name}'s old town`,
      `Visit the main museum in ${name}`,
      `Explore the central market of ${name}`,
      `Scenic viewpoint over ${name}`,
      `Local food tasting crawl in ${name}`,
      `Historic landmark visit in ${name}`,
      `Relax at a park or waterfront in ${name}`,
      `Day trip to the outskirts of ${name}`,
      `Shopping district stroll in ${name}`,
      `Sunset spot in ${name}`,
    ],
  }
}
