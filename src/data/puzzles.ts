import { Level } from '../game/types';

export const PUZZLES: Level[] = [
  {
    id: 'animals-001',
    categoryId: 'animals',
    levelNumber: 1,
    title: 'Sunny Savannah Crossing',
    difficulty: 'Easy',
    originalImage: '/puzzles/animals/level-001/original.webp',
    modifiedImage: '/puzzles/animals/level-001/modified.webp',
    timeLimitSeconds: 90,
    differences: [
      { id: 'diff-1', x: 22.5, y: 31.0, radius: 5.5, description: 'Sunspot and bird flock' },
      { id: 'diff-2', x: 74.0, y: 46.5, radius: 6.0, description: 'Giraffe pattern accent' },
      { id: 'diff-3', x: 38.0, y: 68.0, radius: 5.0, description: 'Cheetah tail spot' },
      { id: 'diff-4', x: 86.5, y: 78.0, radius: 5.5, description: 'Wildflower bouquet in grass' },
      { id: 'diff-5', x: 54.0, y: 22.0, radius: 5.0, description: 'Acacia tree branch fruit' }
    ]
  },
  {
    id: 'animals-002',
    categoryId: 'animals',
    levelNumber: 2,
    title: 'Rainforest Canopy',
    difficulty: 'Medium',
    originalImage: '/puzzles/animals/level-002/original.webp',
    modifiedImage: '/puzzles/animals/level-002/modified.webp',
    timeLimitSeconds: 100,
    differences: [
      { id: 'diff-1', x: 18.0, y: 25.0, radius: 5.0, description: 'Toucan beak color' },
      { id: 'diff-2', x: 62.0, y: 38.0, radius: 5.5, description: 'Tree frog eye glow' },
      { id: 'diff-3', x: 82.0, y: 70.0, radius: 6.0, description: 'Orchid petal missing' },
      { id: 'diff-4', x: 30.0, y: 82.0, radius: 5.0, description: 'Vibrant blue butterfly' },
      { id: 'diff-5', x: 48.0, y: 55.0, radius: 5.5, description: 'Liana vine leaf cluster' }
    ]
  },
  {
    id: 'fantasy-001',
    categoryId: 'fantasy',
    levelNumber: 1,
    title: 'Crystal Castle Grove',
    difficulty: 'Easy',
    originalImage: '/puzzles/fantasy/level-001/original.webp',
    modifiedImage: '/puzzles/fantasy/level-001/modified.webp',
    timeLimitSeconds: 90,
    differences: [
      { id: 'diff-1', x: 28.0, y: 20.0, radius: 5.5, description: 'Tower top glowing orb' },
      { id: 'diff-2', x: 72.0, y: 34.0, radius: 5.0, description: 'Dragon silhouette in moon' },
      { id: 'diff-3', x: 45.0, y: 62.0, radius: 6.0, description: 'Magic fountain crystal' },
      { id: 'diff-4', x: 15.0, y: 76.0, radius: 5.5, description: 'Luminescent mushroom cluster' },
      { id: 'diff-5', x: 85.0, y: 84.0, radius: 5.0, description: 'Ancient spellbook rune' }
    ]
  },
  {
    id: 'underwater-001',
    categoryId: 'underwater',
    levelNumber: 1,
    title: 'Neon Coral Reef',
    difficulty: 'Medium',
    originalImage: '/puzzles/underwater/level-001/original.webp',
    modifiedImage: '/puzzles/underwater/level-001/modified.webp',
    timeLimitSeconds: 100,
    differences: [
      { id: 'diff-1', x: 20.0, y: 42.0, radius: 5.5, description: 'Striped clownfish fin' },
      { id: 'diff-2', x: 68.0, y: 22.0, radius: 5.0, description: 'Sea turtle shell pattern' },
      { id: 'diff-3', x: 80.0, y: 64.0, radius: 5.5, description: 'Treasure chest golden goblet' },
      { id: 'diff-4', x: 35.0, y: 80.0, radius: 5.0, description: 'Pink sea anemone tendril' },
      { id: 'diff-5', x: 52.0, y: 48.0, radius: 6.0, description: 'Pearl inside open clam' }
    ]
  },
  {
    id: 'kitchen-001',
    categoryId: 'kitchen',
    levelNumber: 1,
    title: "Master Chef's Pantry",
    difficulty: 'Easy',
    originalImage: '/puzzles/kitchen/level-001/original.webp',
    modifiedImage: '/puzzles/kitchen/level-001/modified.webp',
    timeLimitSeconds: 90,
    differences: [
      { id: 'diff-1', x: 25.0, y: 35.0, radius: 5.0, description: 'Spice jar label color' },
      { id: 'diff-2', x: 70.0, y: 28.0, radius: 5.5, description: 'Copper pan handle' },
      { id: 'diff-3', x: 50.0, y: 65.0, radius: 5.0, description: 'Fresh strawberry on cake' },
      { id: 'diff-4', x: 18.0, y: 78.0, radius: 5.5, description: 'Rolling pin flour mark' },
      { id: 'diff-5', x: 82.0, y: 72.0, radius: 6.0, description: 'French baguette basket cut' }
    ]
  },
  {
    id: 'space-001',
    categoryId: 'space',
    levelNumber: 1,
    title: 'Orbital Station Alpha',
    difficulty: 'Hard',
    originalImage: '/puzzles/space/level-001/original.webp',
    modifiedImage: '/puzzles/space/level-001/modified.webp',
    timeLimitSeconds: 110,
    differences: [
      { id: 'diff-1', x: 32.0, y: 24.0, radius: 5.0, description: 'Satellite antenna dish' },
      { id: 'diff-2', x: 80.0, y: 30.0, radius: 5.5, description: 'Ringed planet storm spot' },
      { id: 'diff-3', x: 18.0, y: 60.0, radius: 5.0, description: 'Spacewalker helmet visor light' },
      { id: 'diff-4', x: 62.0, y: 72.0, radius: 5.5, description: 'Solar array panel reflection' },
      { id: 'diff-5', x: 42.0, y: 85.0, radius: 5.0, description: 'Docking module thruster glow' }
    ]
  }
];

export const getPuzzleById = (id: string): Level | undefined => {
  return PUZZLES.find(p => p.id === id);
};

export const getPuzzlesByCategory = (categoryId: string): Level[] => {
  return PUZZLES.filter(p => p.categoryId === categoryId);
};

