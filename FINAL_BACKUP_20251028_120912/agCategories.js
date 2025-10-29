// agCategories.js - Category definitions for AG Science
export const agCategories = [
  {
    id: 'vegetables',
    name: 'Vegetables',
    icon: '',
    color: '#10b981',
    description: 'Leafy Greens, Cruciferous, Fruiting, Roots, Alliums',
    testCount: 55,
    subcategories: ['Leafy Greens', 'Cruciferous', 'Fruiting Vegetables', 'Root Vegetables', 'Alliums']
  },
  {
    id: 'fruits',
    name: 'Fruits',
    icon: '',
    color: '#ec4899',
    description: 'Berries, Citrus, Tropical, Stone Fruits',
    testCount: 45,
    subcategories: ['Berries', 'Citrus', 'Tropical Fruits', 'Stone Fruits']
  },
  {
    id: 'animal-protein',
    name: 'Animal Protein',
    icon: '',
    color: '#f97316',
    description: 'Beef, Pork, Poultry, Lamb & Goat, Eggs, Dairy',
    testCount: 60,
    subcategories: ['Beef', 'Pork', 'Poultry', 'Lamb & Goat', 'Eggs', 'Dairy']
  },
  {
    id: 'seafood',
    name: 'Seafood',
    icon: '',
    color: '#06b6d4',
    description: 'Finfish, Crustaceans, Mollusks, Roe & Caviar',
    testCount: 60,
    subcategories: ['Finfish', 'Crustaceans', 'Mollusks', 'Roe & Caviar']
  }
];

export const getTotalTestCount = () => {
  return agCategories.reduce((total, cat) => total + cat.testCount, 0);
};