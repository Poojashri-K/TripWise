export function toDate(value) {
  return value instanceof Date ? value : new Date(value + 'T00:00:00')
}

// Inclusive day count between two ISO date strings, minimum 1.
export function daysBetween(startISO, endISO) {
  const start = toDate(startISO)
  const end = toDate(endISO)
  const diff = Math.round((end - start) / (1000 * 60 * 60 * 24))
  return Math.max(diff + 1, 1)
}

export function addDays(startISO, offset) {
  const d = toDate(startISO)
  d.setDate(d.getDate() + offset)
  return d
}

export function formatDate(date) {
  const d = date instanceof Date ? date : toDate(date)
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

export function formatDateShort(date) {
  const d = date instanceof Date ? date : toDate(date)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function todayISO() {
  return new Date().toISOString().split('T')[0]
}
