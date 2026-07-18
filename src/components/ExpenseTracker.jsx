import React, { useState } from 'react'
import { Plus, Trash2, Wallet } from 'lucide-react'
import { EXPENSE_CATEGORIES } from '../data/budgetCategories.js'
import { validateExpense } from '../utils/validation.js'
import { calculateRemaining } from '../utils/budgetCalculator.js'
import { formatCurrency } from '../utils/formatters.js'
import './ExpenseTracker.css'

const EMPTY_FORM = { name: '', category: EXPENSE_CATEGORIES[0], amount: '' }

export default function ExpenseTracker({ expenses, budget, currency, onAdd, onDelete }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  const { spent, remaining } = calculateRemaining(budget, expenses)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validateExpense(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    onAdd({
      id: `exp-${Date.now()}`,
      name: form.name.trim(),
      category: form.category,
      amount: Number(form.amount),
    })
    setForm(EMPTY_FORM)
  }

  return (
    <div className="expense-tracker">
      <div className="expense-summary">
        <div className="expense-summary-item">
          <span className="tw-eyebrow">Total Spent</span>
          <strong>{formatCurrency(spent, currency)}</strong>
        </div>
        <div className="expense-summary-item">
          <span className="tw-eyebrow">Remaining Budget</span>
          <strong className={remaining < 0 ? 'is-negative' : ''}>{formatCurrency(remaining, currency)}</strong>
        </div>
      </div>

      <form className="expense-form" onSubmit={handleSubmit} noValidate>
        <div className="tw-field expense-form-name">
          <label htmlFor="expense-name">Expense name</label>
          <input
            id="expense-name"
            name="name"
            type="text"
            placeholder="e.g. Taxi from airport"
            value={form.name}
            onChange={handleChange}
            className={errors.name ? 'has-error' : ''}
          />
          {errors.name && <p className="tw-error">{errors.name}</p>}
        </div>

        <div className="tw-field expense-form-category">
          <label htmlFor="expense-category">Category</label>
          <select id="expense-category" name="category" value={form.category} onChange={handleChange}>
            {EXPENSE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="tw-field expense-form-amount">
          <label htmlFor="expense-amount">Amount</label>
          <input
            id="expense-amount"
            name="amount"
            type="number"
            min="0"
            step="1"
            placeholder="0"
            value={form.amount}
            onChange={handleChange}
            className={errors.amount ? 'has-error' : ''}
          />
          {errors.amount && <p className="tw-error">{errors.amount}</p>}
        </div>

        <button type="submit" className="btn btn-primary expense-form-submit">
          <Plus size={17} /> Add
        </button>
      </form>

      {expenses.length === 0 ? (
        <div className="expense-empty">
          <Wallet size={26} />
          <p>No expenses logged yet. Add your first one above to start tracking spend.</p>
        </div>
      ) : (
        <ul className="expense-list">
          {expenses.map((exp) => (
            <li key={exp.id} className="expense-item">
              <div>
                <span className="expense-item-name">{exp.name}</span>
                <span className="expense-item-category">{exp.category}</span>
              </div>
              <div className="expense-item-right">
                <span className="expense-item-amount">{formatCurrency(exp.amount, currency)}</span>
                <button
                  className="btn-danger"
                  onClick={() => onDelete(exp.id)}
                  aria-label={`Delete ${exp.name}`}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
