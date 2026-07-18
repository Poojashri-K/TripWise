import { BUDGET_CATEGORIES } from '../data/budgetCategories.js'

// Splits the total trip budget into category estimates based on the
// percentages defined in data/budgetCategories.js.
export function calculateBudgetBreakdown(totalBudget) {
  const budget = Number(totalBudget) || 0
  return BUDGET_CATEGORIES.map((category) => ({
    ...category,
    amount: Math.round((budget * category.percent) / 100),
  }))
}

// Remaining budget after tracked expenses are subtracted from the total.
export function calculateRemaining(totalBudget, expenses = []) {
  const spent = expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0)
  return {
    spent,
    remaining: (Number(totalBudget) || 0) - spent,
  }
}

// Amount already spent per category, used to show progress against estimate.
export function spentByCategory(expenses = []) {
  const totals = {}
  expenses.forEach((e) => {
    totals[e.category] = (totals[e.category] || 0) + (Number(e.amount) || 0)
  })
  return totals
}
