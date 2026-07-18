import React from 'react'
import { BedDouble, UtensilsCrossed, Bus, Camera, ShoppingBag } from 'lucide-react'
import { formatCurrency } from '../utils/formatters.js'
import './BudgetBreakdown.css'

const ICONS = { BedDouble, UtensilsCrossed, Bus, Camera, ShoppingBag }

export default function BudgetBreakdown({ breakdown, currency, spentByCategory = {} }) {
  return (
    <div className="budget-breakdown">
      {breakdown.map((cat) => {
        const Icon = ICONS[cat.icon] || Camera
        const spent = spentByCategory[cat.label] || 0
        const pctSpent = cat.amount > 0 ? Math.min((spent / cat.amount) * 100, 100) : 0
        const isOver = spent > cat.amount

        return (
          <div key={cat.key} className="budget-row">
            <div className="budget-row-icon" style={{ background: `${cat.color}1a`, color: cat.color }}>
              <Icon size={18} />
            </div>
            <div className="budget-row-body">
              <div className="budget-row-top">
                <span className="budget-row-label">{cat.label}</span>
                <span className="budget-row-percent">{cat.percent}%</span>
              </div>
              <div className="budget-row-bar-track">
                <div
                  className="budget-row-bar-fill"
                  style={{ width: `${pctSpent}%`, background: isOver ? 'var(--danger)' : cat.color }}
                />
              </div>
              <div className="budget-row-amounts">
                <span className={isOver ? 'is-over' : ''}>
                  {formatCurrency(spent, currency)} spent
                </span>
                <span>of {formatCurrency(cat.amount, currency)} estimated</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
