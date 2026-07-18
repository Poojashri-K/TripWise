# TripWise – Smart Travel Planner

A modern, responsive travel planning web app built with React, JavaScript, and Vite.
Enter a destination, dates, budget, and traveler count — TripWise generates a full
day-by-day itinerary, budget breakdown, weather outlook, and packing checklist,
all running client-side with mock data (no backend or API key required).

## Features

- **Home page** — travel-themed landing page with hero CTA
- **Trip Planner** — form with validation for destination, origin, dates, budget, travelers
- **Personalized Itinerary** — day-by-day plan with morning/afternoon/evening activities, shown as a route-line timeline
- **Budget Estimation** — total budget split into Accommodation, Food, Transportation, Sightseeing, and Shopping
- **Weather-Based Recommendations** — mock forecast per day with indoor/outdoor activity suggestions
- **Expense Tracker** — add/delete expenses, see total spent and remaining budget
- **Packing Checklist** — climate-aware checklist grouped by category, with custom items
- **My Trips** — save trips to `localStorage`, view or delete them later

## Tech Stack

- React 18 (JavaScript, no TypeScript)
- React Router v6
- Vite
- Plain CSS (CSS variables / design tokens, no CSS framework)
- [lucide-react](https://lucide.dev/) for icons

## Project Structure

```
tripwise/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── public/
│   └── compass.svg
└── src/
    ├── main.jsx              # App entry point
    ├── App.jsx                # Routes + layout
    ├── index.css              # Design tokens, reset, shared utility classes
    ├── components/            # Reusable UI components (+ co-located CSS)
    │   ├── Navbar.jsx / .css
    │   ├── Footer.jsx / .css
    │   ├── TripCard.jsx / .css
    │   ├── ItineraryDayCard.jsx / .css
    │   ├── WeatherCard.jsx / .css
    │   ├── BudgetBreakdown.jsx / .css
    │   ├── ExpenseTracker.jsx / .css
    │   ├── PackingChecklist.jsx / .css
    │   ├── Tabs.jsx / .css
    │   └── Loader.jsx / .css
    ├── pages/                 # Route-level pages (+ co-located CSS)
    │   ├── Home.jsx / .css
    │   ├── PlanTrip.jsx / .css
    │   ├── TripResult.jsx / .css
    │   ├── MyTrips.jsx / .css
    │   ├── About.jsx / .css
    │   └── NotFound.jsx / .css
    ├── context/
    │   └── TripContext.jsx    # Global trip state (current trip + saved trips)
    ├── data/                  # Mock data
    │   ├── destinations.js    # Attractions + climate profile per destination
    │   ├── packingData.js     # Base packing list + climate add-ons
    │   └── budgetCategories.js
    └── utils/                 # Pure helper functions
        ├── tripGenerator.js   # Orchestrates itinerary + weather + budget + packing
        ├── itineraryGenerator.js
        ├── weatherMock.js
        ├── budgetCalculator.js
        ├── packingGenerator.js
        ├── storage.js         # localStorage helpers
        ├── validation.js
        ├── dateUtils.js
        └── formatters.js
```

## Getting Started

```bash
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`) in your browser.

### Build for production

```bash
npm run build
npm run preview
```

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. Import the repository in [Vercel](https://vercel.com/new).
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy — `vercel.json` is already included to handle client-side routing (React Router).

## Notes on Mock Data

- **Destinations**: 10 popular destinations (Goa, Manali, Paris, Tokyo, Bali, Dubai, New York,
  London, Kerala, Bangkok) have curated attraction lists and climate profiles. Any other
  destination typed in still generates a full itinerary using a generic template.
- **Weather**: Forecasts are deterministically generated per destination/date (no external API),
  so the app works immediately without configuration. Swap `src/utils/weatherMock.js` for a real
  weather API call if you want live data later.
- **Persistence**: Saved trips, expenses, and packing progress are stored in the browser's
  `localStorage` under the key `tripwise_trips` — no database needed.

## Customizing

- Colors, fonts, spacing: `src/index.css` (`:root` CSS variables)
- Add more destinations: `src/data/destinations.js`
- Adjust budget category percentages: `src/data/budgetCategories.js`
- Adjust packing list items: `src/data/packingData.js`
