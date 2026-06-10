export const rooms = [
  {
    id: 'ocean-suite',
    roomName: 'Ocean Suite',
    roomType: 'Suite',
    price: 220,
    description: 'A spacious ocean-facing suite with a private balcony and golden sunset views.',
    facilities: ['King Bed', 'Ocean View', 'Mini Bar', 'Wi-Fi'],
    maxGuests: 3,
    available: true,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'coral-deluxe',
    roomName: 'Coral Deluxe',
    roomType: 'Deluxe',
    price: 180,
    description: 'Elegant and bright with luxury details inspired by the sea and sand.',
    facilities: ['Queen Bed', 'Air Conditioning', 'Workspace', 'Ocean Breeze'],
    maxGuests: 2,
    available: true,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'pearl-family',
    roomName: 'Pearl Family Room',
    roomType: 'Family',
    price: 260,
    description: 'Designed for relaxed family stays with extra space and calming coastal colors.',
    facilities: ['2 Beds', 'Sofa Lounge', 'Kids Friendly', 'Breakfast'],
    maxGuests: 5,
    available: true,
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'harbor-premier',
    roomName: 'Harbor Premier',
    roomType: 'Premier',
    price: 300,
    description: 'A premium retreat with panoramic beach views and a refined luxury feel.',
    facilities: ['King Bed', 'Jacuzzi', 'Room Service', 'Balcony'],
    maxGuests: 4,
    available: false,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80'
  }
];

export const facilities = [
  {
    id: 1,
    title: 'Infinity Pool',
    description: 'Relax beside a serene ocean-view pool framed by tropical landscaping.',
    icon: 'pool'
  },
  {
    id: 2,
    title: 'Fine Dining',
    description: 'Enjoy coastal cuisine and signature seafood prepared by expert chefs.',
    icon: 'dining'
  },
  {
    id: 3,
    title: 'Spa Retreat',
    description: 'Unwind with restorative treatments inspired by the calm of the sea.',
    icon: 'spa'
  },
  {
    id: 4,
    title: 'Beach Access',
    description: 'Step out directly to a private stretch of golden sand and clear water.',
    icon: 'beach'
  }
];

export const galleryImages = [
  { id: 1, title: 'Sunrise Lobby', category: 'Interior', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80' },
  { id: 2, title: 'Ocean Dining', category: 'Dining', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80' },
  { id: 3, title: 'Beach Lounge', category: 'Exterior', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80' },
  { id: 4, title: 'Luxury Suite', category: 'Rooms', image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80' },
  { id: 5, title: 'Spa Serenity', category: 'Wellness', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80' },
  { id: 6, title: 'Pool Sunset', category: 'Leisure', image: 'https://images.unsplash.com/photo-1501117716987-c8e1ecb210f8?auto=format&fit=crop&w=900&q=80' }
];

export const reviews = [
  {
    id: 1,
    name: 'Maya R.',
    text: 'The ocean view was exceptional and the booking experience was seamless from start to finish.'
  },
  {
    id: 2,
    name: 'Daniel P.',
    text: 'Ocean Pearl Hotel feels polished, warm, and truly luxurious. Perfect for a beach escape.'
  },
  {
    id: 3,
    name: 'Sara L.',
    text: 'The rooms, facilities, and service all reflect a high-end coastal resort experience.'
  }
];