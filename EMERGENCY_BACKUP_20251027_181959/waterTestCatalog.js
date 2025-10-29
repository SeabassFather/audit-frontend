export const waterTestCatalog = [
  // BASIC WATER QUALITY
  { id: 'water-basic-ph', name: 'pH Level Test', category: 'Basic Quality', price: 15, popular: true, description: 'Measures acidity/alkalinity of water', parameters: ['pH'], tags: ['basic', 'quick', 'essential'] },
  { id: 'water-basic-tds', name: 'Total Dissolved Solids (TDS)', category: 'Basic Quality', price: 20, popular: true, description: 'Measures dissolved minerals and salts', parameters: ['TDS'], tags: ['basic', 'salinity'] },
  { id: 'water-basic-turbidity', name: 'Turbidity Test', category: 'Basic Quality', price: 18, description: 'Measures water clarity and suspended particles', parameters: ['Turbidity', 'NTU'], tags: ['clarity', 'visual'] },
  { id: 'water-basic-temp', name: 'Temperature', category: 'Basic Quality', price: 10, description: 'Water temperature measurement', parameters: ['Temperature'], tags: ['basic', 'thermal'] },
  { id: 'water-basic-conductivity', name: 'Electrical Conductivity (EC)', category: 'Basic Quality', price: 25, description: 'Measures water\'s ability to conduct electricity', parameters: ['EC', 'Conductivity'], tags: ['salinity', 'minerals'] },
  
  // SAFETY & DRINKING WATER
  { id: 'water-safe-ecoli', name: 'E. coli Test', category: 'Safety', price: 55, popular: true, description: 'Tests for dangerous E. coli bacteria', parameters: ['E. coli', 'Bacteria'], tags: ['bacteria', 'safety', 'drinking'] },
  { id: 'water-safe-coliform', name: 'Total Coliform', category: 'Safety', price: 45, popular: true, description: 'Tests for coliform bacteria presence', parameters: ['Coliform', 'Bacteria'], tags: ['bacteria', 'safety'] },
  { id: 'water-safe-lead', name: 'Lead Content', category: 'Safety', price: 60, description: 'Detects lead contamination', parameters: ['Lead', 'Pb'], tags: ['heavy metal', 'toxic', 'safety'] },
  { id: 'water-safe-arsenic', name: 'Arsenic Test', category: 'Safety', price: 65, description: 'Tests for arsenic contamination', parameters: ['Arsenic', 'As'], tags: ['heavy metal', 'toxic', 'carcinogen'] },
  { id: 'water-safe-mercury', name: 'Mercury Test', category: 'Safety', price: 70, description: 'Detects mercury contamination', parameters: ['Mercury', 'Hg'], tags: ['heavy metal', 'toxic'] },
  { id: 'water-safe-chlorine', name: 'Chlorine Residual', category: 'Safety', price: 22, description: 'Measures chlorine disinfectant levels', parameters: ['Chlorine', 'Free Chlorine'], tags: ['disinfection', 'drinking'] },
  { id: 'water-safe-fluoride', name: 'Fluoride Level', category: 'Safety', price: 28, description: 'Tests fluoride concentration', parameters: ['Fluoride', 'F'], tags: ['dental', 'drinking'] },
  { id: 'water-safe-cryptosporidium', name: 'Cryptosporidium Test', category: 'Safety', price: 95, description: 'Tests for waterborne parasite', parameters: ['Cryptosporidium', 'Parasites'], tags: ['parasite', 'drinking'] },
  { id: 'water-safe-giardia', name: 'Giardia Test', category: 'Safety', price: 90, description: 'Detects Giardia parasites', parameters: ['Giardia', 'Parasites'], tags: ['parasite', 'drinking'] },
  
  // NUTRIENTS (AGRICULTURE)
  { id: 'water-nutr-nitrate', name: 'Nitrate (NO3)', category: 'Nutrients', price: 30, popular: true, description: 'Essential nitrogen form for plants', parameters: ['Nitrate', 'NO3', 'Nitrogen'], tags: ['agriculture', 'fertilizer', 'irrigation'] },
  { id: 'water-nutr-nitrite', name: 'Nitrite (NO2)', category: 'Nutrients', price: 28, description: 'Intermediate nitrogen form', parameters: ['Nitrite', 'NO2'], tags: ['agriculture', 'nitrogen'] },
  { id: 'water-nutr-ammonia', name: 'Ammonia/Ammonium', category: 'Nutrients', price: 32, description: 'Tests ammonia nitrogen levels', parameters: ['Ammonia', 'NH3', 'NH4'], tags: ['agriculture', 'nitrogen', 'toxic'] },
  { id: 'water-nutr-phosphate', name: 'Phosphate (PO4)', category: 'Nutrients', price: 35, description: 'Essential phosphorus for plants', parameters: ['Phosphate', 'PO4', 'Phosphorus'], tags: ['agriculture', 'fertilizer'] },
  { id: 'water-nutr-potassium', name: 'Potassium (K)', category: 'Nutrients', price: 30, description: 'Tests potassium levels', parameters: ['Potassium', 'K'], tags: ['agriculture', 'fertilizer'] },
  { id: 'water-nutr-calcium', name: 'Calcium (Ca)', category: 'Nutrients', price: 28, description: 'Measures calcium content', parameters: ['Calcium', 'Ca'], tags: ['hardness', 'agriculture'] },
  { id: 'water-nutr-magnesium', name: 'Magnesium (Mg)', category: 'Nutrients', price: 28, description: 'Tests magnesium levels', parameters: ['Magnesium', 'Mg'], tags: ['hardness', 'agriculture'] },
  { id: 'water-nutr-sulfate', name: 'Sulfate (SO4)', category: 'Nutrients', price: 30, description: 'Sulfur nutrient measurement', parameters: ['Sulfate', 'SO4', 'Sulfur'], tags: ['agriculture', 'mineral'] },
  { id: 'water-nutr-boron', name: 'Boron (B)', category: 'Nutrients', price: 35, description: 'Micronutrient boron test', parameters: ['Boron', 'B'], tags: ['micronutrient', 'agriculture'] },
  { id: 'water-nutr-iron', name: 'Iron (Fe)', category: 'Nutrients', price: 30, description: 'Tests iron content', parameters: ['Iron', 'Fe'], tags: ['micronutrient', 'staining'] },
  { id: 'water-nutr-manganese', name: 'Manganese (Mn)', category: 'Nutrients', price: 32, description: 'Manganese micronutrient', parameters: ['Manganese', 'Mn'], tags: ['micronutrient', 'staining'] },
  { id: 'water-nutr-zinc', name: 'Zinc (Zn)', category: 'Nutrients', price: 33, description: 'Essential zinc micronutrient', parameters: ['Zinc', 'Zn'], tags: ['micronutrient', 'agriculture'] },
  { id: 'water-nutr-copper', name: 'Copper (Cu)', category: 'Nutrients', price: 33, description: 'Copper micronutrient test', parameters: ['Copper', 'Cu'], tags: ['micronutrient', 'agriculture'] },
  
  // SALINITY & IRRIGATION
  { id: 'water-salt-sar', name: 'Sodium Adsorption Ratio (SAR)', category: 'Salinity', price: 45, popular: true, description: 'Measures sodium hazard for soil', parameters: ['SAR', 'Sodium', 'Calcium', 'Magnesium'], tags: ['irrigation', 'salinity', 'soil health'] },
  { id: 'water-salt-sodium', name: 'Sodium (Na)', category: 'Salinity', price: 25, description: 'Sodium content measurement', parameters: ['Sodium', 'Na'], tags: ['salinity', 'irrigation'] },
  { id: 'water-salt-chloride', name: 'Chloride (Cl)', category: 'Salinity', price: 28, description: 'Chloride ion test', parameters: ['Chloride', 'Cl'], tags: ['salinity', 'corrosion'] },
  { id: 'water-salt-bicarbonate', name: 'Bicarbonate (HCO3)', category: 'Salinity', price: 30, description: 'Bicarbonate alkalinity', parameters: ['Bicarbonate', 'HCO3'], tags: ['alkalinity', 'pH'] },
  { id: 'water-salt-carbonate', name: 'Carbonate (CO3)', category: 'Salinity', price: 30, description: 'Carbonate alkalinity test', parameters: ['Carbonate', 'CO3'], tags: ['alkalinity', 'pH'] },
  { id: 'water-salt-hardness', name: 'Total Hardness', category: 'Salinity', price: 35, description: 'Calcium and magnesium hardness', parameters: ['Hardness', 'CaCO3'], tags: ['hardness', 'scale'] },
  
  // CONTAMINANTS
  { id: 'water-cont-pesticides', name: 'Pesticide Screening', category: 'Contaminants', price: 150, description: 'Tests for common pesticides', parameters: ['Pesticides', 'Herbicides', 'Insecticides'], tags: ['agriculture', 'toxic', 'organic'] },
  { id: 'water-cont-herbicides', name: 'Herbicide Panel', category: 'Contaminants', price: 135, description: 'Detects herbicide residues', parameters: ['Glyphosate', 'Atrazine', 'Herbicides'], tags: ['agriculture', 'toxic'] },
  { id: 'water-cont-vocs', name: 'Volatile Organic Compounds (VOCs)', category: 'Contaminants', price: 180, description: 'Tests for organic chemical contaminants', parameters: ['VOCs', 'Benzene', 'Toluene'], tags: ['industrial', 'toxic', 'petroleum'] },
  { id: 'water-cont-pfas', name: 'PFAS (Forever Chemicals)', category: 'Contaminants', price: 250, description: 'Tests for PFAS contamination', parameters: ['PFAS', 'PFOA', 'PFOS'], tags: ['toxic', 'industrial', 'emerging'] },
  { id: 'water-cont-petroleum', name: 'Petroleum Hydrocarbons', category: 'Contaminants', price: 145, description: 'Detects oil and fuel contamination', parameters: ['TPH', 'Hydrocarbons', 'Oil'], tags: ['petroleum', 'spill'] },
  { id: 'water-cont-chromium', name: 'Chromium (Cr)', category: 'Contaminants', price: 55, description: 'Total chromium test', parameters: ['Chromium', 'Cr'], tags: ['heavy metal', 'industrial'] },
  { id: 'water-cont-cadmium', name: 'Cadmium (Cd)', category: 'Contaminants', price: 58, description: 'Cadmium heavy metal', parameters: ['Cadmium', 'Cd'], tags: ['heavy metal', 'toxic'] },
  { id: 'water-cont-nickel', name: 'Nickel (Ni)', category: 'Contaminants', price: 52, description: 'Nickel contamination test', parameters: ['Nickel', 'Ni'], tags: ['heavy metal', 'industrial'] },
  { id: 'water-cont-selenium', name: 'Selenium (Se)', category: 'Contaminants', price: 60, description: 'Selenium level test', parameters: ['Selenium', 'Se'], tags: ['heavy metal', 'agriculture'] },
  
  // SPECIALIZED TESTS
  { id: 'water-spec-radon', name: 'Radon in Water', category: 'Specialized', price: 120, description: 'Radioactive radon gas test', parameters: ['Radon', 'Radioactivity'], tags: ['radioactive', 'safety'] },
  { id: 'water-spec-uranium', name: 'Uranium Test', category: 'Specialized', price: 85, description: 'Radioactive uranium test', parameters: ['Uranium', 'U', 'Radioactivity'], tags: ['radioactive', 'heavy metal'] },
  { id: 'water-spec-radium', name: 'Radium 226/228', category: 'Specialized', price: 150, description: 'Radioactive radium test', parameters: ['Radium', 'Ra-226', 'Ra-228'], tags: ['radioactive', 'safety'] },
  { id: 'water-spec-legionella', name: 'Legionella Test', category: 'Specialized', price: 165, description: 'Tests for Legionnaires\' disease bacteria', parameters: ['Legionella', 'Bacteria'], tags: ['bacteria', 'hvac', 'safety'] },
  { id: 'water-spec-algae', name: 'Algae Identification', category: 'Specialized', price: 95, description: 'Identifies algae species', parameters: ['Algae', 'Phytoplankton'], tags: ['biology', 'pond', 'lake'] },
  { id: 'water-spec-tannins', name: 'Tannin/Color Test', category: 'Specialized', price: 40, description: 'Measures water color from organics', parameters: ['Tannins', 'Color', 'Organics'], tags: ['aesthetic', 'well water'] },
  { id: 'water-spec-hydrogen-sulfide', name: 'Hydrogen Sulfide', category: 'Specialized', price: 45, description: 'Tests for rotten egg smell compound', parameters: ['H2S', 'Hydrogen Sulfide', 'Sulfur'], tags: ['odor', 'well water'] },
  { id: 'water-spec-alkalinity', name: 'Total Alkalinity', category: 'Specialized', price: 30, description: 'Buffering capacity measurement', parameters: ['Alkalinity', 'CaCO3'], tags: ['pH', 'buffering'] },
  { id: 'water-spec-silica', name: 'Silica (SiO2)', category: 'Specialized', price: 38, description: 'Silicon dioxide test', parameters: ['Silica', 'SiO2'], tags: ['scaling', 'industrial'] },
  { id: 'water-spec-aluminum', name: 'Aluminum (Al)', category: 'Specialized', price: 42, description: 'Aluminum content test', parameters: ['Aluminum', 'Al'], tags: ['metal', 'industrial'] },
  
  // COMPREHENSIVE PACKAGES
  { id: 'water-pkg-basic', name: 'Basic Water Panel', category: 'Packages', price: 75, popular: true, description: 'Essential water quality tests', parameters: ['pH', 'TDS', 'Turbidity', 'Conductivity'], tags: ['package', 'basic', 'quick'] },
  { id: 'water-pkg-drinking', name: 'Complete Drinking Water Panel', category: 'Packages', price: 295, popular: true, description: 'EPA-compliant drinking water testing', parameters: ['pH', 'TDS', 'Bacteria', 'Lead', 'Nitrate', 'Chlorine', 'Fluoride', 'Hardness'], tags: ['package', 'drinking', 'safety', 'comprehensive'] },
  { id: 'water-pkg-irrigation', name: 'Irrigation Water Analysis', category: 'Packages', price: 185, popular: true, description: 'Complete agricultural water testing', parameters: ['pH', 'EC', 'SAR', 'Nitrate', 'Phosphate', 'Potassium', 'Calcium', 'Magnesium', 'Sodium', 'Chloride', 'Boron'], tags: ['package', 'agriculture', 'irrigation'] },
  { id: 'water-pkg-well', name: 'Well Water Complete', category: 'Packages', price: 225, description: 'Comprehensive well water testing', parameters: ['pH', 'TDS', 'Bacteria', 'Nitrate', 'Lead', 'Iron', 'Manganese', 'Hardness', 'Sulfur'], tags: ['package', 'well', 'comprehensive'] },
  { id: 'water-pkg-heavy-metals', name: 'Heavy Metals Panel', category: 'Packages', price: 320, description: 'Complete heavy metal screening', parameters: ['Lead', 'Arsenic', 'Mercury', 'Cadmium', 'Chromium', 'Nickel', 'Copper', 'Zinc'], tags: ['package', 'heavy metals', 'toxic'] },
  { id: 'water-pkg-nutrients', name: 'Complete Nutrient Panel', category: 'Packages', price: 165, description: 'All essential and micronutrients', parameters: ['Nitrate', 'Phosphate', 'Potassium', 'Calcium', 'Magnesium', 'Sulfate', 'Iron', 'Manganese', 'Zinc', 'Copper', 'Boron'], tags: ['package', 'nutrients', 'agriculture'] },
  { id: 'water-pkg-pool', name: 'Pool/Spa Water Test', category: 'Packages', price: 65, description: 'Pool water chemistry analysis', parameters: ['pH', 'Chlorine', 'Alkalinity', 'Hardness', 'Cyanuric Acid'], tags: ['package', 'pool', 'spa'] },
  { id: 'water-pkg-aquarium', name: 'Aquarium Water Panel', category: 'Packages', price: 85, description: 'Aquarium water quality testing', parameters: ['pH', 'Ammonia', 'Nitrite', 'Nitrate', 'Hardness', 'Phosphate'], tags: ['package', 'aquarium', 'fish'] },
  { id: 'water-pkg-pond', name: 'Pond Water Analysis', category: 'Packages', price: 110, description: 'Complete pond water testing', parameters: ['pH', 'Dissolved Oxygen', 'Ammonia', 'Nitrate', 'Phosphate', 'Algae', 'Turbidity'], tags: ['package', 'pond', 'lake'] },
  { id: 'water-pkg-brewery', name: 'Brewing Water Profile', category: 'Packages', price: 145, description: 'Water chemistry for brewing', parameters: ['pH', 'Calcium', 'Magnesium', 'Sodium', 'Chloride', 'Sulfate', 'Alkalinity', 'Hardness'], tags: ['package', 'brewing', 'industrial'] }
];