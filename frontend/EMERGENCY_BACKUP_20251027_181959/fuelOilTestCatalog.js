// ====================================
// FUEL/OIL QUALITY TEST CATALOG
// ASTM-Compliant Testing
// Author: SeabassFather (SG)
// Date: 2025-10-27 22:25:34 UTC
// ====================================

export const fuelOilTestCatalog = [
  // FUEL QUALITY - DIESEL
  { id: 'fuel-cetane', name: 'Cetane Number', category: 'Diesel Fuel', price: 125, popular: true, description: 'Ignition quality of diesel (min 40 ASTM D613)', parameters: ['Cetane Number'], tags: ['diesel', 'ASTM', 'ignition'] },
  { id: 'fuel-cloud-point', name: 'Cloud Point', category: 'Diesel Fuel', price: 65, description: 'Temperature diesel starts to gel (ASTM D2500)', parameters: ['Cloud Point', 'Â°C'], tags: ['diesel', 'cold weather', 'ASTM'] },
  { id: 'fuel-pour-point', name: 'Pour Point', category: 'Diesel Fuel', price: 65, description: 'Lowest flow temperature (ASTM D97)', parameters: ['Pour Point', 'Â°C'], tags: ['diesel', 'cold weather'] },
  { id: 'fuel-sulfur-diesel', name: 'Sulfur Content (Diesel)', category: 'Diesel Fuel', price: 95, popular: true, description: 'Ultra-low sulfur verification < 15 ppm (ASTM D5453)', parameters: ['Sulfur', 'ppm'], tags: ['diesel', 'ULSD', 'emissions', 'ASTM'] },
  { id: 'fuel-lubricity-diesel', name: 'Lubricity (HFRR)', category: 'Diesel Fuel', price: 135, description: 'Fuel injection pump protection (ASTM D6079)', parameters: ['Wear Scar', 'Âµm'], tags: ['diesel', 'lubricity', 'ASTM'] },
  { id: 'fuel-water-diesel', name: 'Water Content (Diesel)', category: 'Diesel Fuel', price: 75, popular: true, description: 'Free/emulsified water detection (ASTM D6304)', parameters: ['Water', 'ppm'], tags: ['diesel', 'contamination', 'water'] },
  { id: 'fuel-biodiesel-blend', name: 'Biodiesel Blend Level (FAME)', category: 'Diesel Fuel', price: 115, description: 'B5, B10, B20 verification (ASTM D7371)', parameters: ['FAME %', 'Biodiesel'], tags: ['biodiesel', 'blend', 'ASTM'] },
  
  // FUEL QUALITY - GASOLINE
  { id: 'fuel-octane', name: 'Octane Rating (RON)', category: 'Gasoline', price: 125, popular: true, description: 'Knock resistance (ASTM D2699)', parameters: ['RON', 'Octane'], tags: ['gasoline', 'octane', 'ASTM'] },
  { id: 'fuel-reid-vapor', name: 'Reid Vapor Pressure (RVP)', category: 'Gasoline', price: 85, description: 'Volatility measurement (ASTM D323)', parameters: ['RVP', 'psi'], tags: ['gasoline', 'volatility', 'ASTM'] },
  { id: 'fuel-ethanol-content', name: 'Ethanol Content', category: 'Gasoline', price: 75, popular: true, description: 'E10, E15, E85 verification', parameters: ['Ethanol %'], tags: ['gasoline', 'ethanol', 'blend'] },
  { id: 'fuel-gum-content', name: 'Gum Content (Existent)', category: 'Gasoline', price: 95, description: 'Deposit-forming residues (ASTM D381)', parameters: ['Gum', 'mg/100mL'], tags: ['gasoline', 'deposits', 'ASTM'] },
  { id: 'fuel-sulfur-gasoline', name: 'Sulfur Content (Gasoline)', category: 'Gasoline', price: 95, description: 'Emission control (< 10 ppm tier 3)', parameters: ['Sulfur', 'ppm'], tags: ['gasoline', 'emissions', 'ASTM'] },
  
  // FUEL CONTAMINATION
  { id: 'fuel-particulates', name: 'Particulate Contamination', category: 'Contamination', price: 85, popular: true, description: 'Dirt, rust, sediment count (ISO 4406)', parameters: ['Particle Count', 'ISO Code'], tags: ['contamination', 'particles', 'ISO'] },
  { id: 'fuel-microbial', name: 'Microbial Growth (Diesel Bug)', category: 'Contamination', price: 125, popular: true, description: 'Bacteria/fungi in fuel tanks', parameters: ['Bacteria', 'Fungi', 'CFU/mL'], tags: ['contamination', 'microbial', 'diesel bug'] },
  { id: 'fuel-water-free', name: 'Free Water Test', category: 'Contamination', price: 55, description: 'Separate water phase detection', parameters: ['Free Water', 'mL'], tags: ['water', 'contamination'] },
  { id: 'fuel-water-dissolved', name: 'Dissolved Water (Karl Fischer)', category: 'Contamination', price: 95, description: 'Total water content (ASTM D6304)', parameters: ['Water', 'ppm'], tags: ['water', 'contamination', 'ASTM'] },
  { id: 'fuel-sediment', name: 'Bottom Sediment & Water (BS&W)', category: 'Contamination', price: 75, description: 'Total contaminants (ASTM D96)', parameters: ['BS&W', 'vol%'], tags: ['contamination', 'sediment', 'ASTM'] },
  
  // OIL QUALITY - ENGINE/HYDRAULIC
  { id: 'oil-viscosity-40c', name: 'Viscosity @ 40Â°C', category: 'Oil Properties', price: 65, popular: true, description: 'Oil thickness at operating temp (ASTM D445)', parameters: ['Viscosity', 'cSt'], tags: ['oil', 'viscosity', 'ASTM'] },
  { id: 'oil-viscosity-100c', name: 'Viscosity @ 100Â°C', category: 'Oil Properties', price: 65, description: 'High-temp viscosity (ASTM D445)', parameters: ['Viscosity', 'cSt'], tags: ['oil', 'viscosity'] },
  { id: 'oil-viscosity-index', name: 'Viscosity Index (VI)', category: 'Oil Properties', price: 55, description: 'Temperature stability rating (ASTM D2270)', parameters: ['VI'], tags: ['oil', 'viscosity', 'stability'] },
  { id: 'oil-flash-point', name: 'Flash Point', category: 'Oil Properties', price: 75, description: 'Fire safety temperature (ASTM D92)', parameters: ['Flash Point', 'Â°C'], tags: ['oil', 'safety', 'ASTM'] },
  { id: 'oil-pour-point', name: 'Pour Point (Oil)', category: 'Oil Properties', price: 65, description: 'Low-temp flow limit (ASTM D97)', parameters: ['Pour Point', 'Â°C'], tags: ['oil', 'cold flow'] },
  
  // OIL CONDITION MONITORING
  { id: 'oil-tbn-test', name: 'Total Base Number (TBN)', category: 'Oil Condition', price: 75, popular: true, description: 'Alkalinity reserve (ASTM D2896)', parameters: ['TBN', 'mg KOH/g'], tags: ['oil', 'acidity', 'ASTM'] },
  { id: 'oil-tan-test', name: 'Total Acid Number (TAN)', category: 'Oil Condition', price: 75, popular: true, description: 'Oxidation level (ASTM D974)', parameters: ['TAN', 'mg KOH/g'], tags: ['oil', 'oxidation', 'ASTM'] },
  { id: 'oil-oxidation', name: 'Oxidation (FTIR)', category: 'Oil Condition', price: 125, description: 'Oil degradation by infrared', parameters: ['Oxidation', 'Abs/cm'], tags: ['oil', 'oxidation', 'FTIR'] },
  { id: 'oil-nitration', name: 'Nitration (FTIR)', category: 'Oil Condition', price: 125, description: 'Combustion byproduct contamination', parameters: ['Nitration', 'Abs/cm'], tags: ['oil', 'nitration', 'combustion'] },
  { id: 'oil-sulfation', name: 'Sulfation (FTIR)', category: 'Oil Condition', price: 125, description: 'Sulfur oxidation products', parameters: ['Sulfation', 'Abs/cm'], tags: ['oil', 'sulfation'] },
  { id: 'oil-soot', name: 'Soot Content (FTIR)', category: 'Oil Condition', price: 115, description: 'Diesel soot loading', parameters: ['Soot', '%'], tags: ['oil', 'soot', 'diesel'] },
  
  // WEAR METALS (OIL)
  { id: 'oil-wear-metals', name: 'Wear Metals Analysis (ICP)', category: 'Wear Metals', price: 145, popular: true, description: 'Fe, Cu, Pb, Al, Cr, etc. (ASTM D5185)', parameters: ['Fe', 'Cu', 'Pb', 'Al', 'Cr', 'Sn'], tags: ['oil', 'wear metals', 'ICP', 'ASTM'] },
  { id: 'oil-iron', name: 'Iron (Fe) - Wear', category: 'Wear Metals', price: 45, description: 'Ferrous component wear', parameters: ['Fe', 'ppm'], tags: ['wear', 'iron'] },
  { id: 'oil-copper', name: 'Copper (Cu) - Wear', category: 'Wear Metals', price: 45, description: 'Bearing/bushing wear', parameters: ['Cu', 'ppm'], tags: ['wear', 'copper', 'bearings'] },
  { id: 'oil-lead', name: 'Lead (Pb) - Wear', category: 'Wear Metals', price: 45, description: 'Bearing overlay wear', parameters: ['Pb', 'ppm'], tags: ['wear', 'lead', 'bearings'] },
  { id: 'oil-aluminum', name: 'Aluminum (Al) - Wear', category: 'Wear Metals', price: 45, description: 'Piston/thrust bearing wear', parameters: ['Al', 'ppm'], tags: ['wear', 'aluminum', 'piston'] },
  { id: 'oil-chromium', name: 'Chromium (Cr) - Wear', category: 'Wear Metals', price: 45, description: 'Ring/cylinder liner wear', parameters: ['Cr', 'ppm'], tags: ['wear', 'chromium', 'rings'] },
  
  // OIL CONTAMINATION
  { id: 'oil-fuel-dilution', name: 'Fuel Dilution', category: 'Oil Contamination', price: 95, popular: true, description: 'Fuel leaking into oil (ASTM E1968)', parameters: ['Fuel %'], tags: ['oil', 'contamination', 'fuel'] },
  { id: 'oil-coolant-contamination', name: 'Coolant in Oil (Glycol)', category: 'Oil Contamination', price: 105, popular: true, description: 'Head gasket leak detection', parameters: ['Glycol', 'ppm'], tags: ['oil', 'contamination', 'coolant', 'leak'] },
  { id: 'oil-water-contamination', name: 'Water in Oil', category: 'Oil Contamination', price: 85, description: 'Moisture contamination (ASTM D6304)', parameters: ['Water', 'ppm'], tags: ['oil', 'water', 'contamination'] },
  { id: 'oil-particle-count', name: 'Particle Contamination (ISO)', category: 'Oil Contamination', price: 95, description: 'Dirt/wear debris count (ISO 4406)', parameters: ['ISO Code', 'Cleanliness'], tags: ['oil', 'particles', 'contamination', 'ISO'] },
  
  // SPECIALIZED TESTS
  { id: 'fuel-stability', name: 'Fuel Stability (Oxidation)', category: 'Specialized', price: 145, description: 'Long-term storage stability (ASTM D2274)', parameters: ['Oxidation Stability'], tags: ['fuel', 'stability', 'storage', 'ASTM'] },
  { id: 'fuel-cold-filter', name: 'Cold Filter Plugging Point (CFPP)', category: 'Specialized', price: 115, description: 'Operability in cold (ASTM D6371)', parameters: ['CFPP', 'Â°C'], tags: ['fuel', 'cold weather', 'ASTM'] },
  { id: 'fuel-density', name: 'Fuel Density', category: 'Specialized', price: 55, description: 'Specific gravity @ 15Â°C (ASTM D4052)', parameters: ['Density', 'kg/mÂ³'], tags: ['fuel', 'density', 'ASTM'] },
  { id: 'oil-demulsibility', name: 'Water Separability (Demulsibility)', category: 'Specialized', price: 125, description: 'Oil/water separation (ASTM D1401)', parameters: ['Separation Time', 'min'], tags: ['oil', 'water', 'separation', 'ASTM'] },
  { id: 'oil-foam-test', name: 'Foaming Characteristics', category: 'Specialized', price: 135, description: 'Foam tendency/stability (ASTM D892)', parameters: ['Foam Tendency', 'Stability'], tags: ['oil', 'foam', 'ASTM'] },
  { id: 'oil-rust-test', name: 'Rust Prevention', category: 'Specialized', price: 95, description: 'Corrosion protection (ASTM D665)', parameters: ['Rust', 'Pass/Fail'], tags: ['oil', 'rust', 'corrosion', 'ASTM'] },
  
  // COMPREHENSIVE PACKAGES
  { id: 'fuel-pkg-diesel-complete', name: 'Complete Diesel Fuel Analysis', category: 'Packages', price: 495, popular: true, description: 'Cetane, sulfur, lubricity, water, particulates, microbial, cloud/pour points (ASTM Standard)', parameters: ['All Diesel Tests'], tags: ['package', 'diesel', 'ASTM', 'complete'] },
  { id: 'fuel-pkg-gasoline-complete', name: 'Complete Gasoline Analysis', category: 'Packages', price: 425, popular: true, description: 'Octane, RVP, ethanol, sulfur, gum, water (ASTM Standard)', parameters: ['All Gasoline Tests'], tags: ['package', 'gasoline', 'ASTM', 'complete'] },
  { id: 'oil-pkg-engine-complete', name: 'Complete Engine Oil Analysis', category: 'Packages', price: 395, popular: true, description: 'Viscosity, TBN, TAN, wear metals, contamination, oxidation (SG Complete)', parameters: ['All Engine Oil Tests'], tags: ['package', 'engine oil', 'complete', 'SG'] },
  { id: 'oil-pkg-hydraulic', name: 'Hydraulic Oil Analysis', category: 'Packages', price: 325, description: 'Viscosity, particle count, water, metals, ISO cleanliness', parameters: ['Hydraulic Tests'], tags: ['package', 'hydraulic', 'ISO'] },
  { id: 'fuel-pkg-contamination', name: 'Fuel Contamination Package', category: 'Packages', price: 295, popular: true, description: 'Water (free + dissolved), particulates, microbial, sediment (SG Standard)', parameters: ['Contamination Tests'], tags: ['package', 'contamination', 'SG'] }
];