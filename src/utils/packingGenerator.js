import { BASE_PACKING_LIST, CLIMATE_PACKING_ADDONS } from '../data/packingData.js'

let idCounter = 0
function nextId() {
  idCounter += 1
  return `pack-${Date.now()}-${idCounter}`
}

export function generatePackingList(climateKey) {
  const merged = {}
  Object.entries(BASE_PACKING_LIST).forEach(([category, items]) => {
    merged[category] = [...items]
  })

  const addons = CLIMATE_PACKING_ADDONS[climateKey]
  if (addons) {
    Object.entries(addons).forEach(([category, items]) => {
      merged[category] = merged[category] ? [...merged[category], ...items] : [...items]
    })
  }

  const list = []
  Object.entries(merged).forEach(([category, items]) => {
    items.forEach((item) => {
      list.push({ id: nextId(), category, item, checked: false })
    })
  })
  return list
}
