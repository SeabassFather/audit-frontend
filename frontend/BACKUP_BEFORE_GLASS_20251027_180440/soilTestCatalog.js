// ====================================
// SOIL ANALYSIS TEST CATALOG
// Based on AuditDNA_Soil_Microbial_Protocol
// Regional: Salinas, Santa Maria, Oxnard, Baja
// Author: SeabassFather (SG)
// Date: 2025-10-27 22:21:52 UTC
// ====================================

export const soilTestCatalog = [
  // BASIC FERTILITY
  { id: 'soil-ph', name: 'Soil pH Test', category: 'Basic Fertility', price: 15, popular: true, description: 'Measures soil acidity/alkalinity (ideal 5.5-6.8)', parameters: ['pH'], tags: ['basic', 'essential'] },
  { id: 'soil-ec', name: 'Electrical Conductivity (EC)', category: 'Basic Fertility', price: 20, popular: true, description: 'Salinity measurement (target < 2.5 mS/cm)', parameters: ['EC', 'Salinity'], tags: ['salinity', 'basic'] },
  { id: 'soil-organic-matter', name: 'Organic Matter %', category: 'Basic Fertility', price: 25, popular: true, description: 'Carbon content (target > 1.5%)', parameters: ['Organic Matter', 'LOI'], tags: ['carbon', 'fertility'] },
  { id: 'soil-cec', name: 'Cation Exchange Capacity (CEC)', category: 'Basic Fertility', price: 30, description: 'Nutrient holding capacity (10-18 meq/100g typical)', parameters: ['CEC'], tags: ['buffering', 'capacity'] },
  { id: 'soil-texture', name: 'Soil Texture Analysis', category: 'Basic Fertility', price: 35, description: 'Sand, silt, clay percentages', parameters: ['Sand', 'Silt', 'Clay'], tags: ['physical', 'structure'] },
  
  // MACRONUTRIENTS (NPK + Secondary)
  { id: 'soil-nitrogen', name: 'Total Nitrogen (N)', category: 'Macronutrients', price: 28, popular: true, description: 'Primary nutrient for growth', parameters: ['Total N', 'Nitrogen'], tags: ['NPK', 'primary'] },
  { id: 'soil-nitrate', name: 'Nitrate-Nitrogen (NO3-N)', category: 'Macronutrients', price: 25, description: 'Available nitrogen form', parameters: ['NO3-N', 'Nitrate'], tags: ['nitrogen', 'available'] },
  { id: 'soil-ammonium', name: 'Ammonium-Nitrogen (NH4-N)', category: 'Macronutrients', price: 25, description: 'Ammonium nitrogen form', parameters: ['NH4-N', 'Ammonium'], tags: ['nitrogen'] },
  { id: 'soil-phosphorus', name: 'Phosphorus (P) - Bicarbonate Extract', category: 'Macronutrients', price: 30, popular: true, description: 'Available P (target > 35-40 ppm for Salinas)', parameters: ['P', 'Phosphorus', 'Olsen P'], tags: ['NPK', 'primary', 'Salinas'] },
  { id: 'soil-potassium', name: 'Potassium (K) - Exchangeable', category: 'Macronutrients', price: 28, popular: true, description: 'Available K (target > 150 ppm)', parameters: ['K', 'Potassium'], tags: ['NPK', 'primary'] },
  { id: 'soil-calcium', name: 'Calcium (Ca)', category: 'Macronutrients', price: 25, description: 'Cell wall strength, pH buffer', parameters: ['Ca', 'Calcium'], tags: ['secondary', 'structure'] },
  { id: 'soil-magnesium', name: 'Magnesium (Mg)', category: 'Macronutrients', price: 25, description: 'Chlorophyll component', parameters: ['Mg', 'Magnesium'], tags: ['secondary', 'photosynthesis'] },
  { id: 'soil-sulfur', name: 'Sulfur (S)', category: 'Macronutrients', price: 28, description: 'Protein synthesis (target 10-20 ppm)', parameters: ['S', 'Sulfur', 'SO4'], tags: ['secondary'] },
  
  // MICRONUTRIENTS - CALIFORNIA REGIONAL STANDARDS
  { id: 'soil-boron', name: 'Boron (B)', category: 'Micronutrients', price: 32, popular: true, description: 'Cell wall formation (target 0.5-2.0 ppm, tissue 25-40 mg/kg)', parameters: ['B', 'Boron'], tags: ['micronutrient', 'Salinas', 'critical'] },
  { id: 'soil-zinc', name: 'Zinc (Zn) - DTPA', category: 'Micronutrients', price: 30, popular: true, description: 'Enzyme function (target > 1.5 ppm, tissue > 12 mg/kg)', parameters: ['Zn', 'Zinc'], tags: ['micronutrient', 'Oxnard', 'deficiency'] },
  { id: 'soil-iron', name: 'Iron (Fe) - DTPA', category: 'Micronutrients', price: 30, popular: true, description: 'Chlorophyll synthesis (target 4.5-10 ppm, tissue 50-300 mg/kg)', parameters: ['Fe', 'Iron'], tags: ['micronutrient', 'Baja', 'chelated'] },
  { id: 'soil-manganese', name: 'Manganese (Mn) - DTPA', category: 'Micronutrients', price: 30, popular: true, description: 'Photosynthesis (target 10-50 ppm, tissue 70-167 mg/kg)', parameters: ['Mn', 'Manganese'], tags: ['micronutrient', 'alkaline soils'] },
  { id: 'soil-copper', name: 'Copper (Cu) - DTPA', category: 'Micronutrients', price: 30, description: 'Protein synthesis (target 0.2-2.0 ppm, tissue > 4 mg/kg)', parameters: ['Cu', 'Copper'], tags: ['micronutrient'] },
  { id: 'soil-molybdenum', name: 'Molybdenum (Mo)', category: 'Micronutrients', price: 35, description: 'Nitrogen fixation (target 0.1-0.5 ppm, tissue 0.2-1 mg/kg)', parameters: ['Mo', 'Molybdenum'], tags: ['micronutrient', 'legumes'] },
  { id: 'soil-chloride', name: 'Chloride (Cl)', category: 'Micronutrients', price: 25, description: 'Osmotic regulation (tissue 0.2-2.0%)', parameters: ['Cl', 'Chloride'], tags: ['micronutrient', 'salinity'] },
  { id: 'soil-nickel', name: 'Nickel (Ni)', category: 'Micronutrients', price: 35, description: 'Urease enzyme (target 0.1-5 mg/kg)', parameters: ['Ni', 'Nickel'], tags: ['micronutrient', 'rare'] },
  
  // MICROBIAL ANALYSIS - PROFESSIONAL PROTOCOL
  { id: 'soil-bacteria-total', name: 'Total Bacterial Count', category: 'Microbial', price: 85, popular: true, description: 'Enumerate total bacteria (target 10⁸-10⁹ cells/g)', parameters: ['Total Bacteria', 'CFU'], tags: ['microbial', 'biology', 'SG protocol'] },
  { id: 'soil-fungi-total', name: 'Total Fungal Count', category: 'Microbial', price: 85, popular: true, description: 'Fungal biomass (target 10⁵-10⁶ propagules/g)', parameters: ['Total Fungi', 'Propagules'], tags: ['microbial', 'biology'] },
  { id: 'soil-protozoa', name: 'Protozoa Enumeration', category: 'Microbial', price: 95, description: 'Bacterial regulators (target 10⁴-10⁵/g)', parameters: ['Protozoa', 'Count'], tags: ['microbial', 'biology'] },
  { id: 'soil-beneficial-bacteria', name: 'Beneficial Bacteria (PGPR)', category: 'Microbial', price: 125, popular: true, description: 'Plant growth-promoting rhizobacteria (Azotobacter, Bacillus, Pseudomonas)', parameters: ['PGPR', 'Beneficial'], tags: ['microbial', 'beneficial', 'roots'] },
  { id: 'soil-pathogen-fusarium', name: 'Fusarium Pathogen Test', category: 'Microbial', price: 110, description: 'Root rot pathogen (target < 10³ cfu/g)', parameters: ['Fusarium'], tags: ['pathogen', 'disease', 'risk'] },
  { id: 'soil-pathogen-pythium', name: 'Pythium Pathogen Test', category: 'Microbial', price: 110, description: 'Water mold pathogen (target < 10³ cfu/g)', parameters: ['Pythium'], tags: ['pathogen', 'disease'] },
  { id: 'soil-pathogen-phytophthora', name: 'Phytophthora Test', category: 'Microbial', price: 115, description: 'Root/crown rot pathogen', parameters: ['Phytophthora'], tags: ['pathogen', 'disease', 'crown rot'] },
  { id: 'soil-pathogen-rhizoctonia', name: 'Rhizoctonia Test', category: 'Microbial', price: 110, description: 'Damping-off pathogen', parameters: ['Rhizoctonia'], tags: ['pathogen', 'seedling disease'] },
  { id: 'soil-nematode', name: 'Nematode Analysis', category: 'Microbial', price: 95, description: 'Beneficial vs. plant-parasitic (target < 100 parasitic/100cc)', parameters: ['Nematodes', 'RKN', 'Lesion'], tags: ['nematode', 'parasitic'] },
  { id: 'soil-respiration', name: 'Soil Respiration (CO2)', category: 'Microbial', price: 75, description: 'Biological activity (target > 1.5 mg CO₂-C/g/day)', parameters: ['Respiration', 'CO2'], tags: ['activity', 'biology'] },
  { id: 'soil-enzymes', name: 'Enzyme Activity Panel', category: 'Microbial', price: 135, description: 'β-glucosidase, phosphatase, urease', parameters: ['Enzymes', 'Activity'], tags: ['biochemical', 'activity'] },
  { id: 'soil-beneficial-ratio', name: 'Beneficial:Pathogenic Ratio', category: 'Microbial', price: 150, popular: true, description: 'Microbe balance assessment (target ≥ 10:1)', parameters: ['Ratio', 'Balance'], tags: ['microbial', 'health', 'SG protocol'] },
  
  // SALINITY & IRRIGATION QUALITY
  { id: 'soil-sar', name: 'Sodium Adsorption Ratio (SAR)', category: 'Salinity', price: 45, popular: true, description: 'Sodium hazard for soil (target < 3 = safe)', parameters: ['SAR', 'Sodium'], tags: ['salinity', 'irrigation', 'sodium'] },
  { id: 'soil-esp', name: 'Exchangeable Sodium % (ESP)', category: 'Salinity', price: 40, description: 'Sodium saturation of soil', parameters: ['ESP'], tags: ['salinity', 'sodium'] },
  { id: 'soil-paste-extract', name: 'Saturated Paste Extract', category: 'Salinity', price: 55, popular: true, description: 'Complete soluble salt analysis (ECe, ions)', parameters: ['ECe', 'Soluble Salts'], tags: ['paste saturation', 'SG protocol', 'Baja'] },
  { id: 'soil-chloride-salinity', name: 'Chloride (Salinity)', category: 'Salinity', price: 30, description: 'Chloride ion in soil solution', parameters: ['Cl', 'Chloride'], tags: ['salinity', 'toxic'] },
  
  // COCONUT COIR SPECIFIC TESTS
  { id: 'coir-pretreatment', name: 'Coir Pre-Treatment Analysis', category: 'Coir/Substrate', price: 85, description: 'Ca, Mg, Na, EC for coco coir (target: 100 ppm Ca, 60 ppm Mg)', parameters: ['Ca', 'Mg', 'Na', 'EC'], tags: ['coir', 'coconut hair', 'substrate', 'SG protocol'] },
  { id: 'coir-nutrient-solution', name: 'Coir Nutrient Solution Test', category: 'Coir/Substrate', price: 95, description: 'Complete micronutrient profile for coir media', parameters: ['Fe', 'Mn', 'Zn', 'Cu', 'B', 'Mo'], tags: ['coir', 'soilless', 'hydro'] },
  { id: 'coir-ec-monitoring', name: 'Coir EC Monitoring', category: 'Coir/Substrate', price: 35, description: 'Salt buildup check (target < 2.0 mS/cm)', parameters: ['EC'], tags: ['coir', 'salinity'] },
  { id: 'coir-ph-buffer', name: 'Coir pH & Buffering', category: 'Coir/Substrate', price: 40, description: 'pH stability in coir (target 5.5-6.5)', parameters: ['pH', 'Buffer'], tags: ['coir', 'pH'] },
  { id: 'coir-microbial-inoculation', name: 'Coir Microbial Inoculation Check', category: 'Coir/Substrate', price: 125, description: 'Beneficial microbe establishment in coir', parameters: ['Bacteria', 'Fungi', 'Colonization'], tags: ['coir', 'microbial', 'inoculation'] },
  
  // HEAVY METALS & CONTAMINANTS
  { id: 'soil-lead', name: 'Lead (Pb)', category: 'Heavy Metals', price: 55, description: 'Toxic metal screening', parameters: ['Pb', 'Lead'], tags: ['heavy metal', 'toxic', 'contamination'] },
  { id: 'soil-arsenic', name: 'Arsenic (As)', category: 'Heavy Metals', price: 60, description: 'Carcinogenic metal test', parameters: ['As', 'Arsenic'], tags: ['heavy metal', 'toxic'] },
  { id: 'soil-cadmium', name: 'Cadmium (Cd)', category: 'Heavy Metals', price: 58, description: 'Toxic heavy metal', parameters: ['Cd', 'Cadmium'], tags: ['heavy metal', 'toxic'] },
  { id: 'soil-chromium', name: 'Chromium (Cr)', category: 'Heavy Metals', price: 55, description: 'Industrial contaminant', parameters: ['Cr', 'Chromium'], tags: ['heavy metal', 'industrial'] },
  { id: 'soil-mercury', name: 'Mercury (Hg)', category: 'Heavy Metals', price: 70, description: 'Neurotoxic metal', parameters: ['Hg', 'Mercury'], tags: ['heavy metal', 'toxic'] },
  
  // COMPREHENSIVE PACKAGES - REGIONAL
  { id: 'soil-pkg-salinas', name: 'Salinas Valley Complete', category: 'Regional Packages', price: 295, popular: true, description: 'Full Salinas protocol: pH, EC, NPK, 9 micros, 3 pathogens (SG Standard)', parameters: ['pH', 'EC', 'N', 'P', 'K', 'Ca', 'Mg', 'S', 'B', 'Zn', 'Fe', 'Mn', 'Cu', 'Mo', 'Cl', 'Ni', 'Fusarium', 'Pythium', 'Nematodes'], tags: ['package', 'Salinas', 'complete', 'SG protocol'] },
  { id: 'soil-pkg-santa-maria', name: 'Santa Maria Fertility Panel', category: 'Regional Packages', price: 265, popular: true, description: 'Santa Maria sandy loam protocol: pH, organics, NPK, B, Fe, Mn (SG Standard)', parameters: ['pH', 'Organic Matter', 'N', 'P', 'K', 'B', 'Fe', 'Mn', 'CEC'], tags: ['package', 'Santa Maria', 'SG protocol'] },
  { id: 'soil-pkg-oxnard', name: 'Oxnard Coastal Analysis', category: 'Regional Packages', price: 285, popular: true, description: 'Oxnard protocol: pH, SAR, EC, Zn (critical), Mn, B, pathogens', parameters: ['pH', 'SAR', 'EC', 'Zn', 'Mn', 'B', 'Sodium', 'Pythium'], tags: ['package', 'Oxnard', 'coastal', 'SG protocol'] },
  { id: 'soil-pkg-baja', name: 'Baja Arid Soil Complete', category: 'Regional Packages', price: 315, popular: true, description: 'Baja protocol: Salinity, Fe-chelated, Zn, B, CaCO3, low OM management (SG Standard)', parameters: ['pH', 'EC', 'CaCO3', 'Organic Matter', 'Fe', 'Zn', 'B', 'SAR', 'Paste Extract'], tags: ['package', 'Baja', 'arid', 'Mexico', 'SG protocol'] },
  { id: 'soil-pkg-coir', name: 'Coconut Coir Complete Protocol', category: 'Regional Packages', price: 245, popular: true, description: 'Full coir analysis: Pre-treatment, pH, EC, Ca-Mg, all micros, microbial (SG Coir Protocol)', parameters: ['pH', 'EC', 'Ca', 'Mg', 'Na', 'Fe', 'Mn', 'Zn', 'Cu', 'B', 'Mo', 'Beneficial Bacteria', 'Fungi'], tags: ['package', 'coir', 'coconut hair', 'substrate', 'SG protocol'] },
  { id: 'soil-pkg-microbial', name: 'Complete Microbial Health Panel', category: 'Regional Packages', price: 425, popular: true, description: 'Total biology: Bacteria, fungi, protozoa, 4 pathogens, beneficial ratio, respiration, enzymes (SG Microbial Protocol)', parameters: ['Total Bacteria', 'Total Fungi', 'Protozoa', 'PGPR', 'Fusarium', 'Pythium', 'Phytophthora', 'Rhizoctonia', 'Nematodes', 'Respiration', 'Enzymes', 'Beneficial:Pathogenic'], tags: ['package', 'microbial', 'complete', 'biology', 'SG protocol'] },
  { id: 'soil-pkg-basic', name: 'Basic Soil Fertility', category: 'Regional Packages', price: 95, description: 'Starter package: pH, EC, NPK, organic matter', parameters: ['pH', 'EC', 'N', 'P', 'K', 'Organic Matter'], tags: ['package', 'basic', 'starter'] }
];