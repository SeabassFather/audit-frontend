// Natural Gas Testing Catalog - 30 Tests
export const gasTestCatalog = [
  // Composition Analysis (10)
  { id: 'G001', name: 'Methane Content', price: 65, turnaround: 4, category: 'Composition', description: 'CH4 percentage' },
  { id: 'G002', name: 'Ethane Content', price: 65, turnaround: 4, category: 'Composition', description: 'C2H6 percentage' },
  { id: 'G003', name: 'Propane Content', price: 65, turnaround: 4, category: 'Composition', description: 'C3H8 percentage' },
  { id: 'G004', name: 'Butanes Content', price: 65, turnaround: 4, category: 'Composition', description: 'C4 hydrocarbons' },
  { id: 'G005', name: 'Nitrogen Content', price: 60, turnaround: 4, category: 'Composition', description: 'N2 dilution' },
  { id: 'G006', name: 'Carbon Dioxide', price: 60, turnaround: 4, category: 'Composition', description: 'CO2 levels' },
  { id: 'G007', name: 'Hydrogen Sulfide', price: 75, turnaround: 4, category: 'Composition', description: 'H2S corrosive gas' },
  { id: 'G008', name: 'Oxygen Content', price: 55, turnaround: 4, category: 'Composition', description: 'O2 contamination' },
  { id: 'G009', name: 'Helium Content', price: 85, turnaround: 5, category: 'Composition', description: 'He measurement' },
  { id: 'G010', name: 'Complete Compositional', price: 395, turnaround: 5, category: 'Composition', description: 'Full C1-C6+ analysis' },

  // Physical Properties (10)
  { id: 'G011', name: 'Heating Value (BTU)', price: 70, turnaround: 4, category: 'Physical Properties', description: 'Energy content' },
  { id: 'G012', name: 'Wobbe Index', price: 65, turnaround: 4, category: 'Physical Properties', description: 'Combustion characteristic' },
  { id: 'G013', name: 'Specific Gravity', price: 50, turnaround: 3, category: 'Physical Properties', description: 'Relative density' },
  { id: 'G014', name: 'Dew Point (Hydrocarbon)', price: 85, turnaround: 5, category: 'Physical Properties', description: 'Liquid dropout temp' },
  { id: 'G015', name: 'Dew Point (Water)', price: 75, turnaround: 4, category: 'Physical Properties', description: 'Moisture content' },
  { id: 'G016', name: 'Compressibility Factor', price: 60, turnaround: 4, category: 'Physical Properties', description: 'Z-factor' },
  { id: 'G017', name: 'Viscosity', price: 55, turnaround: 4, category: 'Physical Properties', description: 'Flow resistance' },
  { id: 'G018', name: 'Thermal Conductivity', price: 70, turnaround: 5, category: 'Physical Properties', description: 'Heat transfer' },
  { id: 'G019', name: 'Critical Properties', price: 95, turnaround: 5, category: 'Physical Properties', description: 'Tc, Pc calculation' },
  { id: 'G020', name: 'Complete Physical Panel', price: 475, turnaround: 5, category: 'Physical Properties', description: 'All properties' },

  // Contaminants (10)
  { id: 'G021', name: 'Total Sulfur', price: 75, turnaround: 4, category: 'Contaminants', description: 'Sulfur compounds' },
  { id: 'G022', name: 'Mercaptans', price: 85, turnaround: 5, category: 'Contaminants', description: 'RSH odor compounds' },
  { id: 'G023', name: 'Carbonyl Sulfide', price: 80, turnaround: 5, category: 'Contaminants', description: 'COS analysis' },
  { id: 'G024', name: 'Mercury', price: 125, turnaround: 5, category: 'Contaminants', description: 'Hg contamination' },
  { id: 'G025', name: 'Benzene', price: 90, turnaround: 5, category: 'Contaminants', description: 'BTEX aromatic' },
  { id: 'G026', name: 'Toluene', price: 85, turnaround: 5, category: 'Contaminants', description: 'BTEX aromatic' },
  { id: 'G027', name: 'Ethylbenzene + Xylenes', price: 90, turnaround: 5, category: 'Contaminants', description: 'BTEX aromatics' },
  { id: 'G028', name: 'Siloxanes', price: 150, turnaround: 7, category: 'Contaminants', description: 'Biogas contaminant' },
  { id: 'G029', name: 'Chlorides', price: 95, turnaround: 5, category: 'Contaminants', description: 'Corrosive compounds' },
  { id: 'G030', name: 'Complete Contaminants Panel', price: 695, turnaround: 7, category: 'Contaminants', description: 'Full contamination screen' }
];

export const getGasTestById = (id) => gasTestCatalog.find(test => test.id === id);
export const getGasTestsByCategory = (category) => gasTestCatalog.filter(test => test.category === category);
export const getGasCategories = () => [...new Set(gasTestCatalog.map(test => test.category))];
