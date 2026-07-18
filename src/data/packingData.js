// Base packing checklist, grouped by category. The itinerary generator adds
// a few climate-specific items on top of this list (see utils/itineraryGenerator.js).

export const BASE_PACKING_LIST = {
  Clothes: [
    'Everyday outfits (1 per day)', 'Comfortable walking shoes', 'Sleepwear',
    'Undergarments & socks', 'Light jacket or layering piece',
  ],
  'Travel Essentials': [
    'Backpack or day bag', 'Reusable water bottle', 'Travel pillow',
    'Padlocks for luggage', 'Ziplock bags for organizing',
  ],
  Electronics: [
    'Phone & charger', 'Power bank', 'Universal travel adapter',
    'Camera (optional)', 'Headphones',
  ],
  Toiletries: [
    'Toothbrush & toothpaste', 'Shampoo & soap (travel size)', 'Skincare essentials',
    'Hand sanitizer', 'Basic first-aid kit',
  ],
  Documents: [
    'Passport / government ID', 'Travel tickets & bookings confirmation',
    'Travel insurance copy', 'Emergency contact list', 'Cash & cards',
  ],
}

// Extra items appended automatically based on destination climate.
export const CLIMATE_PACKING_ADDONS = {
  tropical: { Clothes: ['Light breathable clothing', 'Swimwear'], Toiletries: ['Sunscreen (SPF 50+)', 'Mosquito repellent'] },
  coastal: { Clothes: ['Swimwear', 'Sandals'], Toiletries: ['Sunscreen (SPF 50+)', 'After-sun lotion'] },
  desert: { Clothes: ['Light, loose clothing', 'Sunglasses & hat'], Toiletries: ['Sunscreen (SPF 50+)', 'Lip balm'] },
  cold: { Clothes: ['Heavy winter jacket', 'Thermal wear', 'Gloves & beanie', 'Warm boots'], Toiletries: ['Moisturizer for dry skin'] },
  temperate: { Clothes: ['Light rain jacket', 'Versatile layers'], 'Travel Essentials': ['Compact umbrella'] },
}
