// ====================================
// ALCOHOL QUALITY TEST CATALOG
// Purity & Safety Analysis
// Author: SeabassFather (SG)
// Date: 2025-10-27 22:25:34 UTC
// ====================================

export const alcoholTestCatalog = [
  // PURITY TESTING
  { id: 'alc-ethanol-purity', name: 'Ethanol Purity (GC)', category: 'Purity', price: 95, popular: true, description: 'Gas chromatography purity measurement (ASTM D5501)', parameters: ['Ethanol %', 'Purity'], tags: ['ethanol', 'purity', 'ASTM', 'GC'] },
  { id: 'alc-methanol-content', name: 'Methanol Content', category: 'Purity', price: 125, popular: true, description: 'Toxic methanol detection (ASTM E346)', parameters: ['Methanol', 'ppm'], tags: ['methanol', 'toxic', 'safety', 'ASTM'] },
  { id: 'alc-isopropanol', name: 'Isopropanol (IPA) Purity', category: 'Purity', price: 95, description: 'Isopropyl alcohol concentration', parameters: ['IPA %'], tags: ['isopropanol', 'purity'] },
  { id: 'alc-water-content', name: 'Water Content (Karl Fischer)', category: 'Purity', price: 85, popular: true, description: 'Moisture determination (ASTM E203)', parameters: ['Water %'], tags: ['water', 'moisture', 'ASTM'] },
  { id: 'alc-specific-gravity', name: 'Specific Gravity', category: 'Purity', price: 45, description: 'Density at 20Â°C (ASTM D891)', parameters: ['Specific Gravity'], tags: ['density', 'ASTM'] },
  { id: 'alc-proof', name: 'Alcohol Proof', category: 'Purity', price: 55, description: 'Beverage alcohol strength (% ABV Ã— 2)', parameters: ['Proof', 'ABV %'], tags: ['proof', 'beverage', 'spirits'] },
  
  // IMPURITIES & CONTAMINANTS
  { id: 'alc-aldehydes', name: 'Aldehydes (Acetaldehyde)', category: 'Impurities', price: 115, description: 'Oxidation byproducts (ASTM D4815)', parameters: ['Acetaldehyde', 'ppm'], tags: ['aldehydes', 'impurities', 'oxidation'] },
  { id: 'alc-esters', name: 'Esters (Ethyl Acetate)', category: 'Impurities', price: 105, description: 'Fermentation impurities', parameters: ['Esters', 'ppm'], tags: ['esters', 'fermentation'] },
  { id: 'alc-fusel-oils', name: 'Fusel Oils (Higher Alcohols)', category: 'Impurities', price: 125, description: 'Propanol, butanol, amyl alcohols', parameters: ['Fusel Oils', 'ppm'], tags: ['fusel', 'impurities', 'spirits'] },
  { id: 'alc-acidity', name: 'Acidity (as Acetic Acid)', category: 'Impurities', price: 75, description: 'Total acid content (ASTM D1613)', parameters: ['Acidity', 'mg/L'], tags: ['acidity', 'ASTM'] },
  { id: 'alc-alkalinity', name: 'Alkalinity (as NH3)', category: 'Impurities', price: 75, description: 'Base impurities', parameters: ['Alkalinity', 'mg/L'], tags: ['alkalinity', 'bases'] },
  { id: 'alc-residue', name: 'Non-Volatile Residue', category: 'Impurities', price: 85, description: 'Solid contaminants (ASTM D1353)', parameters: ['Residue', 'mg/100mL'], tags: ['residue', 'solids', 'ASTM'] },
  
  // DENATURANTS & ADDITIVES
  { id: 'alc-denatonium', name: 'Denatonium Benzoate', category: 'Denaturants', price: 95, description: 'Bitter agent detection (SDA formulas)', parameters: ['Denatonium', 'ppm'], tags: ['denaturant', 'bitter', 'SDA'] },
  { id: 'alc-gasoline-denaturant', name: 'Gasoline Denaturant', category: 'Denaturants', price: 105, description: 'Hydrocarbon denaturant detection', parameters: ['Gasoline', '%'], tags: ['denaturant', 'gasoline'] },
  { id: 'alc-tert-butanol', name: 'Tert-Butyl Alcohol (TBA)', category: 'Denaturants', price: 95, description: 'Common denaturant agent', parameters: ['TBA', '%'], tags: ['denaturant', 'TBA'] },
  
  // SAFETY & TOXICITY
  { id: 'alc-methanol-toxicity', name: 'Methanol Toxicity Screen', category: 'Safety', price: 145, popular: true, description: 'FDA/EPA safety limits (< 0.1% methanol)', parameters: ['Methanol', 'Safety Level'], tags: ['methanol', 'toxic', 'safety', 'FDA'] },
  { id: 'alc-benzene', name: 'Benzene Content', category: 'Safety', price: 135, description: 'Carcinogenic contamination (ASTM D3606)', parameters: ['Benzene', 'ppm'], tags: ['benzene', 'carcinogen', 'toxic', 'ASTM'] },
  { id: 'alc-heavy-metals', name: 'Heavy Metals (Pb, Cu, Fe)', category: 'Safety', price: 125, description: 'Toxic metal screening', parameters: ['Lead', 'Copper', 'Iron'], tags: ['heavy metals', 'toxic'] },
  { id: 'alc-uv-absorbance', name: 'UV Absorbance (254nm)', category: 'Safety', price: 85, description: 'Aromatic contaminants (ASTM E70)', parameters: ['UV Abs'], tags: ['UV', 'aromatics', 'ASTM'] },
  
  // INDUSTRIAL SPECIFICATIONS
  { id: 'alc-color-apha', name: 'Color (APHA/Pt-Co)', category: 'Industrial', price: 65, description: 'Visual quality (ASTM D1209)', parameters: ['Color', 'APHA'], tags: ['color', 'quality', 'ASTM'] },
  { id: 'alc-odor', name: 'Odor Assessment', category: 'Industrial', price: 55, description: 'Sensory evaluation', parameters: ['Odor', 'Acceptable/Unacceptable'], tags: ['odor', 'sensory'] },
  { id: 'alc-permanganate-time', name: 'Permanganate Time', category: 'Industrial', price: 95, description: 'Oxidizable impurities (ASTM D1363)', parameters: ['Time', 'minutes'], tags: ['oxidation', 'impurities', 'ASTM'] },
  { id: 'alc-conductivity', name: 'Electrical Conductivity', category: 'Industrial', price: 55, description: 'Ionic impurity level', parameters: ['Conductivity', 'ÂµS/cm'], tags: ['conductivity', 'ionic'] },
  
  // BEVERAGE SPECIFIC
  { id: 'alc-congeners', name: 'Congener Analysis', category: 'Beverage', price: 175, description: 'Flavor compounds in spirits (GC-MS)', parameters: ['Congeners Profile'], tags: ['beverage', 'spirits', 'flavor', 'GC-MS'] },
  { id: 'alc-heads-tails', name: 'Heads & Tails (Distillation Cuts)', category: 'Beverage', price: 145, description: 'Distillation fractions quality', parameters: ['Heads %', 'Hearts %', 'Tails %'], tags: ['distillation', 'spirits', 'beverage'] },
  { id: 'alc-sugar-content', name: 'Residual Sugar', category: 'Beverage', price: 75, description: 'Fermentation completion', parameters: ['Sugar', 'g/L'], tags: ['sugar', 'fermentation', 'beverage'] },
  
  // COMPREHENSIVE PACKAGES
  { id: 'alc-pkg-ethanol-fuel', name: 'Fuel-Grade Ethanol Package', category: 'Packages', price: 285, popular: true, description: 'Purity, methanol, water, denaturants, ASTM compliance', parameters: ['Fuel Ethanol Tests'], tags: ['package', 'fuel', 'ethanol', 'ASTM'] },
  { id: 'alc-pkg-industrial', name: 'Industrial Alcohol Package', category: 'Packages', price: 325, popular: true, description: 'Purity, impurities, safety screen, specs (SG Standard)', parameters: ['Industrial Tests'], tags: ['package', 'industrial', 'SG'] },
  { id: 'alc-pkg-beverage', name: 'Beverage Alcohol Package', category: 'Packages', price: 395, popular: true, description: 'Proof, methanol safety, congeners, heads/tails, flavor profile', parameters: ['Beverage Tests'], tags: ['package', 'beverage', 'spirits'] },
  { id: 'alc-pkg-safety-complete', name: 'Complete Safety Analysis', category: 'Packages', price: 425, popular: true, description: 'Methanol toxicity, benzene, heavy metals, UV abs, FDA/EPA compliance (SG Safety)', parameters: ['Safety Tests'], tags: ['package', 'safety', 'complete', 'SG'] }
];