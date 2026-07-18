// Default percentage split of a trip's total budget.
// These add up to 100 and are used by utils/budgetCalculator.js.

export const BUDGET_CATEGORIES = [
  { key: 'accommodation', label: 'Accommodation', percent: 35, color: '#1f6f78', icon: 'BedDouble' },
  { key: 'food', label: 'Food & Dining', percent: 20, color: '#e76f51', icon: 'UtensilsCrossed' },
  { key: 'transportation', label: 'Transportation', percent: 15, color: '#b5852e', icon: 'Bus' },
  { key: 'sightseeing', label: 'Sightseeing & Activities', percent: 20, color: '#3a7d44', icon: 'Camera' },
  { key: 'shopping', label: 'Shopping & Misc.', percent: 10, color: '#8a5cb0', icon: 'ShoppingBag' },
]

export const EXPENSE_CATEGORIES = BUDGET_CATEGORIES.map((c) => c.label)
