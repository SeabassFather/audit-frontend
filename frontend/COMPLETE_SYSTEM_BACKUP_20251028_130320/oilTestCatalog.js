// Oil Testing Catalog - 35 Tests
export const oilTestCatalog = [
  // Crude Oil (10)
  { id: 'O001', name: 'API Gravity', price: 55, turnaround: 3, category: 'Crude Oil', description: 'Density measurement' },
  { id: 'O002', name: 'Sulfur Content', price: 75, turnaround: 4, category: 'Crude Oil', description: 'Sweet vs sour crude' },
  { id: 'O003', name: 'Pour Point', price: 50, turnaround: 3, category: 'Crude Oil', description: 'Low temp flow' },
  { id: 'O004', name: 'Flash Point', price: 45, turnaround: 3, category: 'Crude Oil', description: 'Safety temperature' },
  { id: 'O005', name: 'Asphaltene Content', price: 85, turnaround: 5, category: 'Crude Oil', description: 'Heavy fraction' },
  { id: 'O006', name: 'Wax Content', price: 70, turnaround: 4, category: 'Crude Oil', description: 'Paraffin measurement' },
  { id: 'O007', name: 'Salt Content', price: 60, turnaround: 4, category: 'Crude Oil', description: 'Desalter efficiency' },
  { id: 'O008', name: 'Metals Analysis', price: 125, turnaround: 5, category: 'Crude Oil', description: 'V, Ni, Fe content' },
  { id: 'O009', name: 'Distillation Profile', price: 150, turnaround: 5, category: 'Crude Oil', description: 'Boiling range' },
  { id: 'O010', name: 'Acidity (TAN)', price: 65, turnaround: 4, category: 'Crude Oil', description: 'Corrosivity test' },

  // Lubricating Oil (15)
  { id: 'O011', name: 'Viscosity @ 40°C', price: 45, turnaround: 3, category: 'Lubricating Oil', description: 'Flow measurement' },
  { id: 'O012', name: 'Viscosity @ 100°C', price: 45, turnaround: 3, category: 'Lubricating Oil', description: 'High temp flow' },
  { id: 'O013', name: 'Viscosity Index', price: 35, turnaround: 3, category: 'Lubricating Oil', description: 'Temp stability' },
  { id: 'O014', name: 'Pour Point', price: 45, turnaround: 3, category: 'Lubricating Oil', description: 'Cold flow' },
  { id: 'O015', name: 'Flash Point', price: 40, turnaround: 3, category: 'Lubricating Oil', description: 'Fire safety' },
  { id: 'O016', name: 'TBN (Total Base Number)', price: 55, turnaround: 4, category: 'Lubricating Oil', description: 'Additive reserve' },
  { id: 'O017', name: 'TAN (Total Acid Number)', price: 55, turnaround: 4, category: 'Lubricating Oil', description: 'Oxidation level' },
  { id: 'O018', name: 'Water Content', price: 50, turnaround: 3, category: 'Lubricating Oil', description: 'Contamination' },
  { id: 'O019', name: 'Insolubles', price: 60, turnaround: 4, category: 'Lubricating Oil', description: 'Sludge content' },
  { id: 'O020', name: 'Oxidation', price: 65, turnaround: 4, category: 'Lubricating Oil', description: 'FTIR analysis' },
  { id: 'O021', name: 'Nitration', price: 65, turnaround: 4, category: 'Lubricating Oil', description: 'FTIR analysis' },
  { id: 'O022', name: 'Fuel Dilution', price: 55, turnaround: 3, category: 'Lubricating Oil', description: 'Fuel contamination' },
  { id: 'O023', name: 'Soot Loading', price: 60, turnaround: 4, category: 'Lubricating Oil', description: 'Diesel engines' },
  { id: 'O024', name: 'Antifreeze (Glycol)', price: 60, turnaround: 4, category: 'Lubricating Oil', description: 'Coolant leak' },
  { id: 'O025', name: 'Additive Package', price: 95, turnaround: 5, category: 'Lubricating Oil', description: 'Additive depletion' },

  // Hydraulic Oil (10)
  { id: 'O026', name: 'Viscosity Grade', price: 45, turnaround: 3, category: 'Hydraulic Oil', description: 'ISO grade check' },
  { id: 'O027', name: 'Cleanliness (ISO 4406)', price: 75, turnaround: 4, category: 'Hydraulic Oil', description: 'Particle count' },
  { id: 'O028', name: 'Water Content (KF)', price: 55, turnaround: 3, category: 'Hydraulic Oil', description: 'Karl Fischer' },
  { id: 'O029', name: 'Acid Number', price: 50, turnaround: 4, category: 'Hydraulic Oil', description: 'Oxidation test' },
  { id: 'O030', name: 'Demulsibility', price: 70, turnaround: 4, category: 'Hydraulic Oil', description: 'Water separation' },
  { id: 'O031', name: 'Foam Characteristics', price: 85, turnaround: 5, category: 'Hydraulic Oil', description: 'Anti-foam test' },
  { id: 'O032', name: 'Air Release', price: 75, turnaround: 4, category: 'Hydraulic Oil', description: 'Aeration test' },
  { id: 'O033', name: 'Rust Prevention', price: 65, turnaround: 4, category: 'Hydraulic Oil', description: 'Corrosion protection' },
  { id: 'O034', name: 'Filterability', price: 80, turnaround: 5, category: 'Hydraulic Oil', description: 'Filter plugging' },
  { id: 'O035', name: 'Complete Hydraulic Panel', price: 425, turnaround: 5, category: 'Hydraulic Oil', description: 'Full analysis' }
];

export const getOilTestById = (id) => oilTestCatalog.find(test => test.id === id);
export const getOilTestsByCategory = (category) => oilTestCatalog.filter(test => test.category === category);
export const getOilCategories = () => [...new Set(oilTestCatalog.map(test => test.category))];
