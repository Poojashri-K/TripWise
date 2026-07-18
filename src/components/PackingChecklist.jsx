import React, { useState, useMemo } from 'react'
import { Plus, Check } from 'lucide-react'
import './PackingChecklist.css'

const CATEGORY_ORDER = ['Clothes', 'Travel Essentials', 'Electronics', 'Toiletries', 'Documents']

export default function PackingChecklist({ items, onToggle, onAddItem }) {
  const [newItem, setNewItem] = useState('')
  const [newCategory, setNewCategory] = useState('Travel Essentials')

  const grouped = useMemo(() => {
    const groups = {}
    items.forEach((item) => {
      groups[item.category] = groups[item.category] || []
      groups[item.category].push(item)
    })
    return groups
  }, [items])

  const totalChecked = items.filter((i) => i.checked).length
  const progress = items.length > 0 ? Math.round((totalChecked / items.length) * 100) : 0

  function handleAdd(e) {
    e.preventDefault()
    if (!newItem.trim()) return
    onAddItem({ category: newCategory, item: newItem.trim() })
    setNewItem('')
  }

  const categories = [...new Set([...CATEGORY_ORDER, ...Object.keys(grouped)])].filter(
    (cat) => grouped[cat]?.length
  )

  return (
    <div className="packing-checklist">
      <div className="packing-progress">
        <div className="packing-progress-top">
          <span>Packed {totalChecked} of {items.length} items</span>
          <span>{progress}%</span>
        </div>
        <div className="packing-progress-track">
          <div className="packing-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <form className="packing-add-form" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Add a custom item…"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
          {CATEGORY_ORDER.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit" className="btn btn-ghost btn-sm">
          <Plus size={16} /> Add
        </button>
      </form>

      <div className="packing-categories">
        {categories.map((category) => (
          <div key={category} className="packing-category">
            <h4>{category}</h4>
            <ul>
              {grouped[category].map((item) => (
                <li key={item.id}>
                  <label className={`packing-check ${item.checked ? 'is-checked' : ''}`}>
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => onToggle(item.id)}
                    />
                    <span className="packing-check-box">{item.checked && <Check size={13} />}</span>
                    <span className="packing-check-label">{item.item}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
