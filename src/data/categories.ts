import { Category } from '../game/types';

export const CATEGORIES: Category[] = [
  {
    id: 'animals',
    name: 'Wild Animals',
    description: 'Explore vibrant wilderness scenes featuring lions, birds, safari vistas, and playful creatures.',
    icon: 'PawPrint',
    themeColor: 'from-amber-500 to-emerald-600',
    levelsCount: 3,
    badge: 'Popular'
  },
  {
    id: 'fantasy',
    name: 'Mythic Fantasy',
    description: 'Enchanted castles, glowing mystical groves, ancient wizard towers, and magical artifacts.',
    icon: 'Sparkles',
    themeColor: 'from-purple-500 to-indigo-600',
    levelsCount: 2,
    badge: 'Magical'
  },
  {
    id: 'underwater',
    name: 'Deep Underwater',
    description: 'Discover colorful coral reefs, submarines, sunken treasures, and exotic deep-sea wildlife.',
    icon: 'Fish',
    themeColor: 'from-cyan-500 to-blue-600',
    levelsCount: 2,
    badge: 'Chilling'
  },
  {
    id: 'kitchen',
    name: 'Cozy Kitchen',
    description: 'Warm bakeries, chef prep counters, delicious treats, and delightfully cluttered rustic kitchens.',
    icon: 'UtensilsCrossed',
    themeColor: 'from-orange-500 to-rose-600',
    levelsCount: 2,
    badge: 'Delicious'
  },
  {
    id: 'space',
    name: 'Cosmic Space',
    description: 'Astronaut adventures, planetary orbits, star-cruisers, alien outposts, and glowing nebulas.',
    icon: 'Rocket',
    themeColor: 'from-violet-600 to-fuchsia-600',
    levelsCount: 2,
    badge: 'Sci-Fi'
  }
];

