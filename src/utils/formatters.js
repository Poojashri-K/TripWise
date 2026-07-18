export function formatCurrency(amount, currency = 'INR') {
  const value = Number.isFinite(amount) ? amount : 0
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(value)
  } catch {
    return `${currency} ${value.toLocaleString()}`
  }
}

export function formatNumber(value) {
  return new Intl.NumberFormat('en-IN').format(value || 0)
}
