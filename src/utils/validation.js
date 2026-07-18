export function validateTripForm(form) {
  const errors = {}

  if (!form.destination || form.destination.trim().length < 2) {
    errors.destination = 'Please enter a destination.'
  }

  if (!form.origin || form.origin.trim().length < 2) {
    errors.origin = 'Please enter your starting location.'
  }

  if (!form.startDate) {
    errors.startDate = 'Please choose a start date.'
  }

  if (!form.endDate) {
    errors.endDate = 'Please choose an end date.'
  }

  if (form.startDate && form.endDate) {
    const start = new Date(form.startDate)
    const end = new Date(form.endDate)
    if (end < start) {
      errors.endDate = 'End date cannot be before the start date.'
    }
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (start < today) {
      errors.startDate = 'Start date cannot be in the past.'
    }
  }

  const budgetNum = Number(form.budget)
  if (!form.budget || Number.isNaN(budgetNum) || budgetNum <= 0) {
    errors.budget = 'Please enter a valid budget greater than 0.'
  }

  const travelersNum = Number(form.travelers)
  if (!form.travelers || Number.isNaN(travelersNum) || travelersNum <= 0) {
    errors.travelers = 'Please enter at least 1 traveler.'
  } else if (travelersNum > 30) {
    errors.travelers = 'For groups over 30, please contact a travel agent.'
  }

  return errors
}

export function validateExpense(expense) {
  const errors = {}
  if (!expense.name || expense.name.trim().length < 2) {
    errors.name = 'Enter an expense name.'
  }
  if (!expense.category) {
    errors.category = 'Select a category.'
  }
  const amount = Number(expense.amount)
  if (!expense.amount || Number.isNaN(amount) || amount <= 0) {
    errors.amount = 'Enter a valid amount greater than 0.'
  }
  return errors
}
