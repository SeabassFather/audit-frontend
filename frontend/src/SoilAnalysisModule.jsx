import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { useCart } from './CartContext';
import audioSystem from './audioSystem';

const SoilAnalysisModule = () => {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedParameters, setSelectedParameters] = useState([]);

  // MASSIVE SOIL CATALOG - 200+ ANALYZABLE PARAMETERS
  const soilParameters = [
    // MACRONUTRIENTS (15 parameters)
    { id: 'SOIL-MAC-001', name: 'Nitrogen (N) - Total', category: 'Macronutrients', compliance: ['USDA', 'FAO'], riskLevel: 'High', unit: '%' },
    { id: 'SOIL-MAC-002', name: 'Nitrogen (N) - Nitrate (NO3)', category: 'Macronutrients', compliance: ['USDA', 'EPA'], riskLevel: 'High', unit: 'ppm' },
    { id: 'SOIL-MAC-003', name: 'Nitrogen (N) - Ammonium (NH4)', category: 'Macronutrients', compliance: ['USDA'], riskLevel: 'Medium', unit: 'ppm' },
    { id: 'SOIL-MAC-004', name: 'Phosphorus (P) - Total', category: 'Macronutrients', compliance: ['USDA', 'FAO'], riskLevel: 'High', unit: 'ppm' },
    { id: 'SOIL-MAC-005', name: 'Phosphorus (P) - Available (Bray P1)', category: 'Macronutrients', compliance: ['USDA'], riskLevel: 'High', unit: 'ppm' },
    { id: 'SOIL-MAC-006', name: 'Phosphorus (P) - Olsen', category: 'Macronutrients', compliance: ['USDA'], riskLevel: 'High', unit: 'ppm' },
    { id: 'SOIL-MAC-007', name: 'Potassium (K) - Total', category: 'Macronutrients', compliance: ['USDA', 'FAO'], riskLevel: 'High', unit: 'ppm' },
    { id: 'SOIL-MAC-008', name: 'Potassium (K) - Exchangeable', category: 'Macronutrients', compliance: ['USDA'], riskLevel: 'High', unit: 'ppm' },
    { id: 'SOIL-MAC-009', name: 'Calcium (Ca)', category: 'Macronutrients', compliance: ['USDA', 'FAO'], riskLevel: 'Medium', unit: 'ppm' },
    { id: 'SOIL-MAC-010', name: 'Magnesium (Mg)', category: 'Macronutrients', compliance: ['USDA', 'FAO'], riskLevel: 'Medium', unit: 'ppm' },
    { id: 'SOIL-MAC-011', name: 'Sulfur (S) - Total', category: 'Macronutrients', compliance: ['USDA'], riskLevel: 'Medium', unit: 'ppm' },
    { id: 'SOIL-MAC-012', name: 'Sulfur (S) - Sulfate (SO4)', category: 'Macronutrients', compliance: ['USDA'], riskLevel: 'Medium', unit: 'ppm' },
    { id: 'SOIL-MAC-013', name: 'NPK Ratio Analysis', category: 'Macronutrients', compliance: ['USDA'], riskLevel: 'High', unit: 'ratio' },
    { id: 'SOIL-MAC-014', name: 'Ca:Mg Ratio', category: 'Macronutrients', compliance: ['USDA'], riskLevel: 'Medium', unit: 'ratio' },
    { id: 'SOIL-MAC-015', name: 'K:Mg Ratio', category: 'Macronutrients', compliance: ['USDA'], riskLevel: 'Medium', unit: 'ratio' },

    // MICRONUTRIENTS (20 parameters)
    { id: 'SOIL-MIC-001', name: 'Iron (Fe)', category: 'Micronutrients', compliance: ['USDA', 'FAO'], riskLevel: 'Medium', unit: 'ppm' },
    { id: 'SOIL-MIC-002', name: 'Manganese (Mn)', category: 'Micronutrients', compliance: ['USDA', 'FAO'], riskLevel: 'Medium', unit: 'ppm' },
    { id: 'SOIL-MIC-003', name: 'Zinc (Zn)', category: 'Micronutrients', compliance: ['USDA', 'FAO'], riskLevel: 'Medium', unit: 'ppm' },
    { id: 'SOIL-MIC-004', name: 'Copper (Cu)', category: 'Micronutrients', compliance: ['USDA', 'FAO'], riskLevel: 'Medium', unit: 'ppm' },
    { id: 'SOIL-MIC-005', name: 'Boron (B)', category: 'Micronutrients', compliance: ['USDA', 'FAO'], riskLevel: 'High', unit: 'ppm' },
    { id: 'SOIL-MIC-006', name: 'Molybdenum (Mo)', category: 'Micronutrients', compliance: ['USDA'], riskLevel: 'Low', unit: 'ppm' },
    { id: 'SOIL-MIC-007', name: 'Chloride (Cl)', category: 'Micronutrients', compliance: ['USDA'], riskLevel: 'Medium', unit: 'ppm' },
    { id: 'SOIL-MIC-008', name: 'Cobalt (Co)', category: 'Micronutrients', compliance: ['FAO'], riskLevel: 'Low', unit: 'ppm' },
    { id: 'SOIL-MIC-009', name: 'Nickel (Ni)', category: 'Micronutrients', compliance: ['EPA', 'EU'], riskLevel: 'Medium', unit: 'ppm' },
    { id: 'SOIL-MIC-010', name: 'Sodium (Na)', category: 'Micronutrients', compliance: ['USDA'], riskLevel: 'Medium', unit: 'ppm' },
    { id: 'SOIL-MIC-011', name: 'Silicon (Si)', category: 'Micronutrients', compliance: ['Research'], riskLevel: 'Low', unit: 'ppm' },
    { id: 'SOIL-MIC-012', name: 'Aluminum (Al)', category: 'Micronutrients', compliance: ['USDA'], riskLevel: 'High', unit: 'ppm' },
    { id: 'SOIL-MIC-013', name: 'DTPA-Extractable Iron', category: 'Micronutrients', compliance: ['USDA'], riskLevel: 'Medium', unit: 'ppm' },
    { id: 'SOIL-MIC-014', name: 'DTPA-Extractable Zinc', category: 'Micronutrients', compliance: ['USDA'], riskLevel: 'Medium', unit: 'ppm' },
    { id: 'SOIL-MIC-015', name: 'DTPA-Extractable Manganese', category: 'Micronutrients', compliance: ['USDA'], riskLevel: 'Medium', unit: 'ppm' },
    { id: 'SOIL-MIC-016', name: 'DTPA-Extractable Copper', category: 'Micronutrients', compliance: ['USDA'], riskLevel: 'Medium', unit: 'ppm' },
    { id: 'SOIL-MIC-017', name: 'Hot Water Extractable Boron', category: 'Micronutrients', compliance: ['USDA'], riskLevel: 'Medium', unit: 'ppm' },
    { id: 'SOIL-MIC-018', name: 'Selenium (Se)', category: 'Micronutrients', compliance: ['EPA'], riskLevel: 'Medium', unit: 'ppm' },
    { id: 'SOIL-MIC-019', name: 'Vanadium (V)', category: 'Micronutrients', compliance: ['Research'], riskLevel: 'Low', unit: 'ppm' },
    { id: 'SOIL-MIC-020', name: 'Chromium (Cr)', category: 'Micronutrients', compliance: ['EPA'], riskLevel: 'High', unit: 'ppm' },

    // PHYSICAL PROPERTIES (25 parameters)
    { id: 'SOIL-PHY-001', name: 'pH', category: 'Physical Properties', compliance: ['USDA', 'FAO', 'ISO'], riskLevel: 'High', unit: 'pH' },
    { id: 'SOIL-PHY-002', name: 'pH (H2O)', category: 'Physical Properties', compliance: ['USDA'], riskLevel: 'High', unit: 'pH' },
    { id: 'SOIL-PHY-003', name: 'pH (CaCl2)', category: 'Physical Properties', compliance: ['ISO'], riskLevel: 'High', unit: 'pH' },
    { id: 'SOIL-PHY-004', name: 'Electrical Conductivity (EC)', category: 'Physical Properties', compliance: ['USDA', 'FAO'], riskLevel: 'High', unit: 'dS/m' },
    { id: 'SOIL-PHY-005', name: 'Total Dissolved Solids (TDS)', category: 'Physical Properties', compliance: ['USDA'], riskLevel: 'Medium', unit: 'ppm' },
    { id: 'SOIL-PHY-006', name: 'Bulk Density', category: 'Physical Properties', compliance: ['USDA'], riskLevel: 'Medium', unit: 'g/cm' },
    { id: 'SOIL-PHY-007', name: 'Particle Density', category: 'Physical Properties', compliance: ['USDA'], riskLevel: 'Low', unit: 'g/cm' },
    { id: 'SOIL-PHY-008', name: 'Porosity', category: 'Physical Properties', compliance: ['USDA'], riskLevel: 'Medium', unit: '%' },
    { id: 'SOIL-PHY-009', name: 'Water Holding Capacity', category: 'Physical Properties', compliance: ['USDA'], riskLevel: 'High', unit: '%' },
    { id: 'SOIL-PHY-010', name: 'Field Capacity', category: 'Physical Properties', compliance: ['USDA'], riskLevel: 'High', unit: '%' },
    { id: 'SOIL-PHY-011', name: 'Permanent Wilting Point', category: 'Physical Properties', compliance: ['USDA'], riskLevel: 'High', unit: '%' },
    { id: 'SOIL-PHY-012', name: 'Available Water Capacity', category: 'Physical Properties', compliance: ['USDA'], riskLevel: 'High', unit: '%' },
    { id: 'SOIL-PHY-013', name: 'Saturated Hydraulic Conductivity', category: 'Physical Properties', compliance: ['USDA'], riskLevel: 'Medium', unit: 'cm/hr' },
    { id: 'SOIL-PHY-014', name: 'Infiltration Rate', category: 'Physical Properties', compliance: ['USDA'], riskLevel: 'Medium', unit: 'cm/hr' },
    { id: 'SOIL-PHY-015', name: 'Penetration Resistance', category: 'Physical Properties', compliance: ['USDA'], riskLevel: 'Medium', unit: 'MPa' },
    { id: 'SOIL-PHY-016', name: 'Aggregate Stability', category: 'Physical Properties', compliance: ['USDA'], riskLevel: 'Medium', unit: '%' },
    { id: 'SOIL-PHY-017', name: 'Moisture Content', category: 'Physical Properties', compliance: ['USDA'], riskLevel: 'Medium', unit: '%' },
    { id: 'SOIL-PHY-018', name: 'Color (Munsell)', category: 'Physical Properties', compliance: ['USDA'], riskLevel: 'Low', unit: 'visual' },
    { id: 'SOIL-PHY-019', name: 'Temperature', category: 'Physical Properties', compliance: ['USDA'], riskLevel: 'Low', unit: 'C' },
    { id: 'SOIL-PHY-020', name: 'Redox Potential (Eh)', category: 'Physical Properties', compliance: ['Research'], riskLevel: 'Medium', unit: 'mV' },
    { id: 'SOIL-PHY-021', name: 'Soil Respiration Rate', category: 'Physical Properties', compliance: ['Research'], riskLevel: 'Medium', unit: 'mg CO2/g' },
    { id: 'SOIL-PHY-022', name: 'Compaction Level', category: 'Physical Properties', compliance: ['USDA'], riskLevel: 'Medium', unit: 'scale' },
    { id: 'SOIL-PHY-023', name: 'Crusting Index', category: 'Physical Properties', compliance: ['Research'], riskLevel: 'Low', unit: 'index' },
    { id: 'SOIL-PHY-024', name: 'Plasticity Index', category: 'Physical Properties', compliance: ['Engineering'], riskLevel: 'Low', unit: 'index' },
    { id: 'SOIL-PHY-025', name: 'Liquid Limit', category: 'Physical Properties', compliance: ['Engineering'], riskLevel: 'Low', unit: '%' },

    // SOIL TEXTURE (10 parameters)
    { id: 'SOIL-TEX-001', name: 'Sand Content', category: 'Soil Texture', compliance: ['USDA'], riskLevel: 'High', unit: '%' },
    { id: 'SOIL-TEX-002', name: 'Silt Content', category: 'Soil Texture', compliance: ['USDA'], riskLevel: 'High', unit: '%' },
    { id: 'SOIL-TEX-003', name: 'Clay Content', category: 'Soil Texture', compliance: ['USDA'], riskLevel: 'High', unit: '%' },
    { id: 'SOIL-TEX-004', name: 'Textural Class', category: 'Soil Texture', compliance: ['USDA'], riskLevel: 'High', unit: 'class' },
    { id: 'SOIL-TEX-005', name: 'Coarse Sand (2.0-0.5mm)', category: 'Soil Texture', compliance: ['USDA'], riskLevel: 'Low', unit: '%' },
    { id: 'SOIL-TEX-006', name: 'Fine Sand (0.5-0.05mm)', category: 'Soil Texture', compliance: ['USDA'], riskLevel: 'Low', unit: '%' },
    { id: 'SOIL-TEX-007', name: 'Very Fine Sand', category: 'Soil Texture', compliance: ['USDA'], riskLevel: 'Low', unit: '%' },
    { id: 'SOIL-TEX-008', name: 'Coarse Silt', category: 'Soil Texture', compliance: ['USDA'], riskLevel: 'Low', unit: '%' },
    { id: 'SOIL-TEX-009', name: 'Fine Silt', category: 'Soil Texture', compliance: ['USDA'], riskLevel: 'Low', unit: '%' },
    { id: 'SOIL-TEX-010', name: 'Clay Mineralogy', category: 'Soil Texture', compliance: ['Research'], riskLevel: 'Low', unit: 'type' },

    // ORGANIC MATTER & CARBON (20 parameters)
    { id: 'SOIL-OM-001', name: 'Organic Matter (OM) - Total', category: 'Organic Matter', compliance: ['USDA', 'FAO'], riskLevel: 'High', unit: '%' },
    { id: 'SOIL-OM-002', name: 'Organic Carbon (OC)', category: 'Organic Matter', compliance: ['USDA', 'FAO'], riskLevel: 'High', unit: '%' },
    { id: 'SOIL-OM-003', name: 'Total Carbon (TC)', category: 'Organic Matter', compliance: ['USDA'], riskLevel: 'Medium', unit: '%' },
    { id: 'SOIL-OM-004', name: 'Inorganic Carbon (IC)', category: 'Organic Matter', compliance: ['USDA'], riskLevel: 'Low', unit: '%' },
    { id: 'SOIL-OM-005', name: 'Active Carbon', category: 'Organic Matter', compliance: ['Research'], riskLevel: 'Medium', unit: 'ppm' },
    { id: 'SOIL-OM-006', name: 'Particulate Organic Matter (POM)', category: 'Organic Matter', compliance: ['Research'], riskLevel: 'Medium', unit: '%' },
    { id: 'SOIL-OM-007', name: 'Dissolved Organic Carbon (DOC)', category: 'Organic Matter', compliance: ['Research'], riskLevel: 'Medium', unit: 'mg/L' },
    { id: 'SOIL-OM-008', name: 'Humic Acid', category: 'Organic Matter', compliance: ['Research'], riskLevel: 'Medium', unit: '%' },
    { id: 'SOIL-OM-009', name: 'Fulvic Acid', category: 'Organic Matter', compliance: ['Research'], riskLevel: 'Medium', unit: '%' },
    { id: 'SOIL-OM-010', name: 'Humin', category: 'Organic Matter', compliance: ['Research'], riskLevel: 'Low', unit: '%' },
    { id: 'SOIL-OM-011', name: 'C:N Ratio', category: 'Organic Matter', compliance: ['USDA', 'FAO'], riskLevel: 'High', unit: 'ratio' },
    { id: 'SOIL-OM-012', name: 'Labile Carbon', category: 'Organic Matter', compliance: ['Research'], riskLevel: 'Medium', unit: '%' },
    { id: 'SOIL-OM-013', name: 'Recalcitrant Carbon', category: 'Organic Matter', compliance: ['Research'], riskLevel: 'Low', unit: '%' },
    { id: 'SOIL-OM-014', name: 'Microbial Biomass Carbon', category: 'Organic Matter', compliance: ['Research'], riskLevel: 'Medium', unit: 'µg/g' },
    { id: 'SOIL-OM-015', name: 'Hot Water Extractable Carbon', category: 'Organic Matter', compliance: ['Research'], riskLevel: 'Medium', unit: 'mg/kg' },
    { id: 'SOIL-OM-016', name: 'Permanganate Oxidizable Carbon', category: 'Organic Matter', compliance: ['Research'], riskLevel: 'Medium', unit: 'mg/kg' },
    { id: 'SOIL-OM-017', name: 'Soil Organic Carbon Stock', category: 'Organic Matter', compliance: ['FAO', 'Climate'], riskLevel: 'High', unit: 'Mg/ha' },
    { id: 'SOIL-OM-018', name: 'Carbon Sequestration Rate', category: 'Organic Matter', compliance: ['Climate'], riskLevel: 'Medium', unit: 'Mg/ha/yr' },
    { id: 'SOIL-OM-019', name: 'Lignin Content', category: 'Organic Matter', compliance: ['Research'], riskLevel: 'Low', unit: '%' },
    { id: 'SOIL-OM-020', name: 'Cellulose Content', category: 'Organic Matter', compliance: ['Research'], riskLevel: 'Low', unit: '%' },

    // HEAVY METALS & CONTAMINANTS (30 parameters)
    { id: 'SOIL-HM-001', name: 'Lead (Pb)', category: 'Heavy Metals', compliance: ['EPA', 'EU'], riskLevel: 'Critical', unit: 'ppm' },
    { id: 'SOIL-HM-002', name: 'Arsenic (As)', category: 'Heavy Metals', compliance: ['EPA', 'EU'], riskLevel: 'Critical', unit: 'ppm' },
    { id: 'SOIL-HM-003', name: 'Cadmium (Cd)', category: 'Heavy Metals', compliance: ['EPA', 'EU'], riskLevel: 'Critical', unit: 'ppm' },
    { id: 'SOIL-HM-004', name: 'Mercury (Hg)', category: 'Heavy Metals', compliance: ['EPA', 'EU'], riskLevel: 'Critical', unit: 'ppm' },
    { id: 'SOIL-HM-005', name: 'Chromium (Cr) - Total', category: 'Heavy Metals', compliance: ['EPA', 'EU'], riskLevel: 'High', unit: 'ppm' },
    { id: 'SOIL-HM-006', name: 'Chromium VI (Cr6+)', category: 'Heavy Metals', compliance: ['EPA'], riskLevel: 'Critical', unit: 'ppm' },
    { id: 'SOIL-HM-007', name: 'Nickel (Ni)', category: 'Heavy Metals', compliance: ['EPA', 'EU'], riskLevel: 'High', unit: 'ppm' },
    { id: 'SOIL-HM-008', name: 'Copper (Cu)', category: 'Heavy Metals', compliance: ['EPA', 'EU'], riskLevel: 'Medium', unit: 'ppm' },
    { id: 'SOIL-HM-009', name: 'Zinc (Zn)', category: 'Heavy Metals', compliance: ['EPA', 'EU'], riskLevel: 'Medium', unit: 'ppm' },
    { id: 'SOIL-HM-010', name: 'Cobalt (Co)', category: 'Heavy Metals', compliance: ['EU'], riskLevel: 'Medium', unit: 'ppm' },
    { id: 'SOIL-HM-011', name: 'Antimony (Sb)', category: 'Heavy Metals', compliance: ['EPA'], riskLevel: 'High', unit: 'ppm' },
    { id: 'SOIL-HM-012', name: 'Barium (Ba)', category: 'Heavy Metals', compliance: ['EPA'], riskLevel: 'Medium', unit: 'ppm' },
    { id: 'SOIL-HM-013', name: 'Beryllium (Be)', category: 'Heavy Metals', compliance: ['EPA'], riskLevel: 'High', unit: 'ppm' },
    { id: 'SOIL-HM-014', name: 'Thallium (Tl)', category: 'Heavy Metals', compliance: ['EPA'], riskLevel: 'High', unit: 'ppm' },
    { id: 'SOIL-HM-015', name: 'Silver (Ag)', category: 'Heavy Metals', compliance: ['EPA'], riskLevel: 'Low', unit: 'ppm' },
    { id: 'SOIL-HM-016', name: 'Selenium (Se)', category: 'Heavy Metals', compliance: ['EPA'], riskLevel: 'Medium', unit: 'ppm' },
    { id: 'SOIL-HM-017', name: 'Tin (Sn)', category: 'Heavy Metals', compliance: ['EU'], riskLevel: 'Low', unit: 'ppm' },
    { id: 'SOIL-HM-018', name: 'Uranium (U)', category: 'Heavy Metals', compliance: ['EPA'], riskLevel: 'High', unit: 'ppm' },
    { id: 'SOIL-HM-019', name: 'Titanium (Ti)', category: 'Heavy Metals', compliance: ['Research'], riskLevel: 'Low', unit: 'ppm' },
    { id: 'SOIL-HM-020', name: 'Total Petroleum Hydrocarbons (TPH)', category: 'Contaminants', compliance: ['EPA'], riskLevel: 'Critical', unit: 'mg/kg' },
    { id: 'SOIL-HM-021', name: 'PAHs (Polycyclic Aromatic Hydrocarbons)', category: 'Contaminants', compliance: ['EPA', 'EU'], riskLevel: 'Critical', unit: 'mg/kg' },
    { id: 'SOIL-HM-022', name: 'PCBs (Polychlorinated Biphenyls)', category: 'Contaminants', compliance: ['EPA', 'EU'], riskLevel: 'Critical', unit: 'mg/kg' },
    { id: 'SOIL-HM-023', name: 'Dioxins & Furans', category: 'Contaminants', compliance: ['EPA', 'EU'], riskLevel: 'Critical', unit: 'ng/kg' },
    { id: 'SOIL-HM-024', name: 'BTEX (Benzene, Toluene, Ethylbenzene, Xylene)', category: 'Contaminants', compliance: ['EPA'], riskLevel: 'Critical', unit: 'mg/kg' },
    { id: 'SOIL-HM-025', name: 'Volatile Organic Compounds (VOCs)', category: 'Contaminants', compliance: ['EPA'], riskLevel: 'High', unit: 'µg/kg' },
    { id: 'SOIL-HM-026', name: 'Semi-Volatile Organic Compounds (SVOCs)', category: 'Contaminants', compliance: ['EPA'], riskLevel: 'High', unit: 'mg/kg' },
    { id: 'SOIL-HM-027', name: 'Pesticide Residues - Total', category: 'Contaminants', compliance: ['EPA', 'EU'], riskLevel: 'Critical', unit: 'mg/kg' },
    { id: 'SOIL-HM-028', name: 'Herbicide Residues', category: 'Contaminants', compliance: ['EPA'], riskLevel: 'High', unit: 'mg/kg' },
    { id: 'SOIL-HM-029', name: 'Fungicide Residues', category: 'Contaminants', compliance: ['EPA'], riskLevel: 'High', unit: 'mg/kg' },
    { id: 'SOIL-HM-030', name: 'PFAS (Per- and Polyfluoroalkyl Substances)', category: 'Contaminants', compliance: ['EPA'], riskLevel: 'Critical', unit: 'ng/kg' },

    // BIOLOGICAL PROPERTIES (20 parameters)
    { id: 'SOIL-BIO-001', name: 'Microbial Biomass', category: 'Biological', compliance: ['Research'], riskLevel: 'Medium', unit: 'µg/g' },
    { id: 'SOIL-BIO-002', name: 'Total Bacteria Count', category: 'Biological', compliance: ['Research'], riskLevel: 'Medium', unit: 'CFU/g' },
    { id: 'SOIL-BIO-003', name: 'Total Fungi Count', category: 'Biological', compliance: ['Research'], riskLevel: 'Medium', unit: 'CFU/g' },
    { id: 'SOIL-BIO-004', name: 'Actinomycetes Count', category: 'Biological', compliance: ['Research'], riskLevel: 'Low', unit: 'CFU/g' },
    { id: 'SOIL-BIO-005', name: 'Nematode Population', category: 'Biological', compliance: ['USDA'], riskLevel: 'Medium', unit: 'count/g' },
    { id: 'SOIL-BIO-006', name: 'Protozoa Count', category: 'Biological', compliance: ['Research'], riskLevel: 'Low', unit: 'count/g' },
    { id: 'SOIL-BIO-007', name: 'Earthworm Population', category: 'Biological', compliance: ['USDA'], riskLevel: 'Medium', unit: 'count/m' },
    { id: 'SOIL-BIO-008', name: 'Enzyme Activity - Dehydrogenase', category: 'Biological', compliance: ['Research'], riskLevel: 'Medium', unit: 'µg TPF/g/h' },
    { id: 'SOIL-BIO-009', name: 'Enzyme Activity - Phosphatase', category: 'Biological', compliance: ['Research'], riskLevel: 'Medium', unit: 'µg PNP/g/h' },
    { id: 'SOIL-BIO-010', name: 'Enzyme Activity - Urease', category: 'Biological', compliance: ['Research'], riskLevel: 'Medium', unit: 'µg NH4/g/h' },
    { id: 'SOIL-BIO-011', name: 'Enzyme Activity - β-Glucosidase', category: 'Biological', compliance: ['Research'], riskLevel: 'Medium', unit: 'µg PNP/g/h' },
    { id: 'SOIL-BIO-012', name: 'Nitrification Potential', category: 'Biological', compliance: ['Research'], riskLevel: 'Medium', unit: 'mg N/kg/day' },
    { id: 'SOIL-BIO-013', name: 'Denitrification Potential', category: 'Biological', compliance: ['Research'], riskLevel: 'Medium', unit: 'mg N/kg/day' },
    { id: 'SOIL-BIO-014', name: 'Nitrogen Fixation Rate', category: 'Biological', compliance: ['Research'], riskLevel: 'Medium', unit: 'kg N/ha/yr' },
    { id: 'SOIL-BIO-015', name: 'Mycorrhizal Colonization', category: 'Biological', compliance: ['Research'], riskLevel: 'Medium', unit: '%' },
    { id: 'SOIL-BIO-016', name: 'Bacterial Diversity (Shannon Index)', category: 'Biological', compliance: ['Research'], riskLevel: 'Low', unit: 'index' },
    { id: 'SOIL-BIO-017', name: 'Fungal:Bacterial Ratio', category: 'Biological', compliance: ['Research'], riskLevel: 'Medium', unit: 'ratio' },
    { id: 'SOIL-BIO-018', name: 'Soil Health Score', category: 'Biological', compliance: ['USDA'], riskLevel: 'High', unit: 'score' },
    { id: 'SOIL-BIO-019', name: 'Pathogen Presence (E.coli, Salmonella)', category: 'Biological', compliance: ['EPA', 'USDA'], riskLevel: 'Critical', unit: 'presence' },
    { id: 'SOIL-BIO-020', name: 'Beneficial Microbe Count', category: 'Biological', compliance: ['Research'], riskLevel: 'Medium', unit: 'CFU/g' },

    // CEC & SATURATION (15 parameters)
    { id: 'SOIL-CEC-001', name: 'Cation Exchange Capacity (CEC)', category: 'CEC & Saturation', compliance: ['USDA', 'FAO'], riskLevel: 'High', unit: 'meq/100g' },
    { id: 'SOIL-CEC-002', name: 'Base Saturation', category: 'CEC & Saturation', compliance: ['USDA'], riskLevel: 'High', unit: '%' },
    { id: 'SOIL-CEC-003', name: 'Calcium Saturation', category: 'CEC & Saturation', compliance: ['USDA'], riskLevel: 'High', unit: '%' },
    { id: 'SOIL-CEC-004', name: 'Magnesium Saturation', category: 'CEC & Saturation', compliance: ['USDA'], riskLevel: 'Medium', unit: '%' },
    { id: 'SOIL-CEC-005', name: 'Potassium Saturation', category: 'CEC & Saturation', compliance: ['USDA'], riskLevel: 'Medium', unit: '%' },
    { id: 'SOIL-CEC-006', name: 'Sodium Saturation', category: 'CEC & Saturation', compliance: ['USDA'], riskLevel: 'High', unit: '%' },
    { id: 'SOIL-CEC-007', name: 'Hydrogen Saturation', category: 'CEC & Saturation', compliance: ['USDA'], riskLevel: 'Medium', unit: '%' },
    { id: 'SOIL-CEC-008', name: 'Exchangeable Acidity', category: 'CEC & Saturation', compliance: ['USDA'], riskLevel: 'High', unit: 'meq/100g' },
    { id: 'SOIL-CEC-009', name: 'Exchangeable Aluminum', category: 'CEC & Saturation', compliance: ['USDA'], riskLevel: 'High', unit: 'meq/100g' },
    { id: 'SOIL-CEC-010', name: 'Buffer pH', category: 'CEC & Saturation', compliance: ['USDA'], riskLevel: 'Medium', unit: 'pH' },
    { id: 'SOIL-CEC-011', name: 'Lime Requirement', category: 'CEC & Saturation', compliance: ['USDA'], riskLevel: 'High', unit: 'tons/acre' },
    { id: 'SOIL-CEC-012', name: 'Gypsum Requirement', category: 'CEC & Saturation', compliance: ['USDA'], riskLevel: 'Medium', unit: 'tons/acre' },
    { id: 'SOIL-CEC-013', name: 'Sodium Adsorption Ratio (SAR)', category: 'CEC & Saturation', compliance: ['USDA', 'FAO'], riskLevel: 'High', unit: 'ratio' },
    { id: 'SOIL-CEC-014', name: 'Exchangeable Sodium Percentage (ESP)', category: 'CEC & Saturation', compliance: ['USDA'], riskLevel: 'High', unit: '%' },
    { id: 'SOIL-CEC-015', name: 'Potassium:Magnesium Ratio', category: 'CEC & Saturation', compliance: ['USDA'], riskLevel: 'Medium', unit: 'ratio' },

    // SALINITY & SODICITY (10 parameters)
    { id: 'SOIL-SAL-001', name: 'Soluble Salts', category: 'Salinity', compliance: ['USDA', 'FAO'], riskLevel: 'High', unit: 'mmhos/cm' },
    { id: 'SOIL-SAL-002', name: 'Total Dissolved Salts (TDS)', category: 'Salinity', compliance: ['USDA'], riskLevel: 'High', unit: 'ppm' },
    { id: 'SOIL-SAL-003', name: 'Chloride Ion (Cl)', category: 'Salinity', compliance: ['USDA'], riskLevel: 'Medium', unit: 'meq/L' },
    { id: 'SOIL-SAL-004', name: 'Sulfate Ion (SO4)', category: 'Salinity', compliance: ['USDA'], riskLevel: 'Medium', unit: 'meq/L' },
    { id: 'SOIL-SAL-005', name: 'Bicarbonate Ion (HCO3)', category: 'Salinity', compliance: ['USDA'], riskLevel: 'Low', unit: 'meq/L' },
    { id: 'SOIL-SAL-006', name: 'Carbonate Ion (CO3)', category: 'Salinity', compliance: ['USDA'], riskLevel: 'Low', unit: 'meq/L' },
    { id: 'SOIL-SAL-007', name: 'Residual Sodium Carbonate (RSC)', category: 'Salinity', compliance: ['FAO'], riskLevel: 'High', unit: 'meq/L' },
    { id: 'SOIL-SAL-008', name: 'Boron (B) - Saturation Extract', category: 'Salinity', compliance: ['USDA'], riskLevel: 'High', unit: 'ppm' },
    { id: 'SOIL-SAL-009', name: 'Salinity Hazard Classification', category: 'Salinity', compliance: ['USDA'], riskLevel: 'High', unit: 'class' },
    { id: 'SOIL-SAL-010', name: 'Sodicity Hazard Classification', category: 'Salinity', compliance: ['USDA'], riskLevel: 'High', unit: 'class' },

    // FERTILITY INDICES (15 parameters)
    { id: 'SOIL-FER-001', name: 'Fertility Index - Overall', category: 'Fertility Indices', compliance: ['USDA'], riskLevel: 'High', unit: 'index' },
    { id: 'SOIL-FER-002', name: 'Nitrogen Index', category: 'Fertility Indices', compliance: ['USDA'], riskLevel: 'High', unit: 'index' },
    { id: 'SOIL-FER-003', name: 'Phosphorus Index', category: 'Fertility Indices', compliance: ['USDA'], riskLevel: 'High', unit: 'index' },
    { id: 'SOIL-FER-004', name: 'Potassium Index', category: 'Fertility Indices', compliance: ['USDA'], riskLevel: 'High', unit: 'index' },
    { id: 'SOIL-FER-005', name: 'Sufficiency Level of Available Nutrients (SLAN)', category: 'Fertility Indices', compliance: ['Research'], riskLevel: 'Medium', unit: 'index' },
    { id: 'SOIL-FER-006', name: 'Nutrient Balance Index', category: 'Fertility Indices', compliance: ['Research'], riskLevel: 'Medium', unit: 'index' },
    { id: 'SOIL-FER-007', name: 'Soil Quality Index', category: 'Fertility Indices', compliance: ['USDA'], riskLevel: 'High', unit: 'index' },
    { id: 'SOIL-FER-008', name: 'Productivity Index', category: 'Fertility Indices', compliance: ['USDA'], riskLevel: 'High', unit: 'index' },
    { id: 'SOIL-FER-009', name: 'Crop Suitability Rating', category: 'Fertility Indices', compliance: ['USDA'], riskLevel: 'High', unit: 'rating' },
    { id: 'SOIL-FER-010', name: 'Nutrient Availability Index', category: 'Fertility Indices', compliance: ['Research'], riskLevel: 'Medium', unit: 'index' },
    { id: 'SOIL-FER-011', name: 'Soil Test Correlation Index', category: 'Fertility Indices', compliance: ['USDA'], riskLevel: 'Medium', unit: 'index' },
    { id: 'SOIL-FER-012', name: 'Critical Nutrient Concentration', category: 'Fertility Indices', compliance: ['USDA'], riskLevel: 'High', unit: 'ppm' },
    { id: 'SOIL-FER-013', name: 'Nutrient Sufficiency Ratio', category: 'Fertility Indices', compliance: ['Research'], riskLevel: 'Medium', unit: 'ratio' },
    { id: 'SOIL-FER-014', name: 'Cation Ratio Analysis', category: 'Fertility Indices', compliance: ['Albrecht'], riskLevel: 'Medium', unit: 'analysis' },
    { id: 'SOIL-FER-015', name: 'Base Cation Saturation Ratio (BCSR)', category: 'Fertility Indices', compliance: ['Albrecht'], riskLevel: 'High', unit: 'ratio' }
  ];

  const categories = [...new Set(soilParameters.map(p => p.category))];
  const filteredParams = soilParameters.filter(p => 
    !searchQuery || 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      audioSystem.playSuccess();
    }
  };

  const handleProceedToAnalysis = () => {
    if (!uploadedFile) {
      alert(language === 'es' ? 'Por favor sube tus resultados de laboratorio' : 'Please upload your lab results');
      return;
    }

    const analysisService = {
      id: 'SOIL-ANALYSIS-FULL',
      name: language === 'es' ? 'Análisis Completo de Datos de Suelo con IA' : 'Complete Soil Data Analysis with AI',
      price: 199.00,
      analysisPrice: 199.00,
      description: language === 'es' 
        ? `Análisis con IA de ${selectedParameters.length > 0 ? selectedParameters.length : '200+'} parámetros + Recomendaciones de fertilización + Informe detallado`
        : `AI Analysis of ${selectedParameters.length > 0 ? selectedParameters.length : '200+'} parameters + Fertilization recommendations + Detailed report`,
      uploadedFile: uploadedFile.name,
      parameters: selectedParameters.length > 0 ? selectedParameters : 'All soil parameters',
      turnaround: '24-48 hours'
    };

    addToCart(analysisService);
    audioSystem.playSuccess();
    navigate('/cart');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        <h1 style={{ fontSize: '3rem', textAlign: 'center', color: '#10b981', marginBottom: '1rem', textShadow: '0 0 30px rgba(16, 185, 129, 0.6)' }}>
           {language === 'es' ? 'Servicios de Análisis de Datos de Suelo' : 'Soil Data Analysis Services'}
        </h1>
        <p style={{ textAlign: 'center', color: '#b0bec5', marginBottom: '1rem', fontSize: '1.2rem', maxWidth: '900px', margin: '0 auto 2rem', lineHeight: '1.8' }}>
          {language === 'es' 
            ? 'Ya tienes resultados de análisis de suelo? Súbelos aquí. Nuestro IA analizará 200+ parámetros para fertilidad, contaminantes, salud del suelo y cumplimiento normativo.'
            : 'Already have soil test results? Upload them here. Our AI will analyze 200+ parameters for fertility, contaminants, soil health, and regulatory compliance.'}
        </p>

        <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '2px solid #10b981', borderRadius: '20px', padding: '2rem', marginBottom: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', color: '#10b981', marginBottom: '1.5rem' }}>
            {language === 'es' ? ' Qué Analizamos' : ' What We Analyze'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {categories.map(cat => {
              const count = soilParameters.filter(p => p.category === cat).length;
              return (
                <div key={cat} style={{ background: 'rgba(45, 55, 72, 0.8)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  <div style={{ fontSize: '1.5rem', color: '#10b981', fontWeight: 'bold', marginBottom: '0.3rem' }}>{count}</div>
                  <div style={{ fontSize: '0.85rem', color: '#fff' }}>{cat}</div>
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: '2.5rem', color: '#10b981', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            200+ {language === 'es' ? 'Parámetros Analizables' : 'Analyzable Parameters'}
          </div>
          <p style={{ color: '#b0bec5', fontSize: '1.1rem' }}>
            {language === 'es' ? 'Incluyendo cumplimiento de USDA, EPA, FAO, EU, ISO' : 'Including USDA, EPA, FAO, EU, ISO compliance'}
          </p>
        </div>

        {/* UPLOAD SECTION */}
        <div style={{ background: 'rgba(45, 55, 72, 0.9)', padding: '3rem', borderRadius: '25px', marginBottom: '3rem', border: '2px solid rgba(16, 185, 129, 0.3)' }}>
          <h2 style={{ fontSize: '2rem', color: '#10b981', marginBottom: '2rem', textAlign: 'center' }}>
             {language === 'es' ? 'Subir Tus Resultados de Laboratorio' : 'Upload Your Lab Results'}
          </h2>
          
          <input type="file" id="fileUpload" onChange={handleFileUpload} accept=".pdf,.xlsx,.xls,.csv,image/*" style={{ display: 'none' }} />
          
          <button
            onClick={() => document.getElementById('fileUpload').click()}
            style={{ 
              width: '100%', 
              padding: '2rem', 
              background: uploadedFile ? 'rgba(16, 185, 129, 0.3)' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
              border: uploadedFile ? '3px solid #10b981' : 'none',
              borderRadius: '15px', 
              color: '#fff', 
              fontWeight: 'bold', 
              cursor: 'pointer', 
              fontSize: '1.3rem', 
              marginBottom: '1.5rem',
              transition: 'all 0.3s ease'
            }}
          >
            {uploadedFile ? ` ${uploadedFile.name}` : ` ${language === 'es' ? 'Seleccionar Archivo' : 'Select File'}`}
          </button>
          
          <p style={{ fontSize: '1rem', color: '#94a3b8', textAlign: 'center', marginBottom: '2rem' }}>
            {language === 'es' 
              ? 'Formatos aceptados: PDF, Excel (.xlsx, .xls), CSV, Imágenes (JPG, PNG)'
              : 'Accepted formats: PDF, Excel (.xlsx, .xls), CSV, Images (JPG, PNG)'}
          </p>

          {uploadedFile && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.3rem', color: '#10b981', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                 {language === 'es' ? 'Archivo listo para análisis' : 'File ready for analysis'}
              </div>
              <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '2rem', borderRadius: '15px', border: '2px solid #10b981', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', color: '#10b981', marginBottom: '1rem' }}>
                  {language === 'es' ? ' Tu Análisis Incluirá:' : ' Your Analysis Will Include:'}
                </h3>
                <ul style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto', lineHeight: '2', fontSize: '1.05rem' }}>
                  <li> {language === 'es' ? 'Evaluación de fertilidad completa (N, P, K, micronutrientes)' : 'Complete fertility assessment (N, P, K, micronutrients)'}</li>
                  <li> {language === 'es' ? 'Detección de contaminantes (metales pesados, pesticidas)' : 'Contaminant detection (heavy metals, pesticides)'}</li>
                  <li> {language === 'es' ? 'Recomendaciones de enmiendas (cal, yeso, fertilizantes)' : 'Amendment recommendations (lime, gypsum, fertilizers)'}</li>
                  <li> {language === 'es' ? 'Evaluación de salud del suelo y biología' : 'Soil health and biology assessment'}</li>
                  <li> {language === 'es' ? 'Análisis de salinidad y sodicidad' : 'Salinity and sodicity analysis'}</li>
                  <li> {language === 'es' ? 'Informe profesional descargable (PDF)' : 'Professional downloadable report (PDF)'}</li>
                </ul>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
                <div>
                  <div style={{ fontSize: '2.5rem', color: '#10b981', fontWeight: 'bold' }}>$199</div>
                  <div style={{ fontSize: '1rem', color: '#b0bec5' }}>{language === 'es' ? 'Análisis completo' : 'Complete analysis'}</div>
                </div>
                <div style={{ fontSize: '2rem', color: '#64748b' }}>|</div>
                <div>
                  <div style={{ fontSize: '2rem', color: '#10b981', fontWeight: 'bold' }}>24-48h</div>
                  <div style={{ fontSize: '1rem', color: '#b0bec5' }}>{language === 'es' ? 'Tiempo de entrega' : 'Turnaround time'}</div>
                </div>
              </div>

              <button
                onClick={handleProceedToAnalysis}
                style={{ 
                  padding: '1.5rem 3rem', 
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', 
                  border: 'none', 
                  borderRadius: '15px', 
                  color: '#fff', 
                  fontWeight: 'bold', 
                  cursor: 'pointer', 
                  fontSize: '1.5rem', 
                  boxShadow: '0 10px 40px rgba(245, 158, 11, 0.5)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 15px 60px rgba(245, 158, 11, 0.7)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(245, 158, 11, 0.5)';
                }}
              >
                 {language === 'es' ? 'Proceder al Pago' : 'Proceed to Payment'}
              </button>
            </div>
          )}
        </div>

        {/* PARAMETER CATALOG */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', color: '#10b981', marginBottom: '1.5rem', textAlign: 'center' }}>
            {language === 'es' ? ' Catálogo Completo de Parámetros Analizables' : ' Complete Analyzable Parameters Catalog'}
          </h2>
          
          <input
            type="text"
            placeholder={language === 'es' ? 'Buscar parámetro (ej. nitrógeno, pH, plomo)...' : 'Search parameter (e.g. nitrogen, pH, lead)...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '1rem', background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #334155', borderRadius: '12px', color: '#fff', fontSize: '1rem', marginBottom: '2rem' }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {filteredParams.map(param => {
              const isSelected = selectedParameters.includes(param.id);
              const riskColors = {
                'Critical': '#ef4444',
                'High': '#f59e0b',
                'Medium': '#eab308',
                'Low': '#10b981'
              };
              
              return (
                <div 
                  key={param.id}
                  onClick={() => {
                    if (isSelected) {
                      setSelectedParameters(selectedParameters.filter(id => id !== param.id));
                    } else {
                      setSelectedParameters([...selectedParameters, param.id]);
                    }
                    audioSystem.playClick();
                  }}
                  style={{ 
                    background: isSelected ? 'rgba(16, 185, 129, 0.2)' : 'rgba(30, 41, 59, 0.6)', 
                    border: isSelected ? '2px solid #10b981' : '1px solid rgba(16, 185, 129, 0.2)', 
                    borderRadius: '12px', 
                    padding: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 5px 20px rgba(16, 185, 129, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{param.id}</div>
                    {isSelected && <div style={{ fontSize: '1.2rem' }}></div>}
                  </div>
                  <h3 style={{ fontSize: '1rem', color: '#fff', marginBottom: '0.8rem', fontWeight: 'bold' }}>{param.name}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '8px', color: '#10b981' }}>
                      {param.category}
                    </span>
                    <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: `${riskColors[param.riskLevel]}20`, borderRadius: '8px', color: riskColors[param.riskLevel] }}>
                      {param.riskLevel}
                    </span>
                    <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'rgba(100, 116, 139, 0.2)', borderRadius: '8px', color: '#94a3b8' }}>
                      {param.unit}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    {language === 'es' ? 'Cumplimiento:' : 'Compliance:'} {param.compliance.join(', ')}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredParams.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
              {language === 'es' ? 'No se encontraron parámetros. Intenta otra búsqueda.' : 'No parameters found. Try another search.'}
            </div>
          )}
        </div>

        <button onClick={() => navigate('/')} style={{ padding: '1rem 2rem', background: 'rgba(100, 116, 139, 0.3)', border: '2px solid #64748b', borderRadius: '12px', color: '#fff', cursor: 'pointer' }}>
           {language === 'es' ? 'Volver al Inicio' : 'Back to Home'}
        </button>

      </div>
    </div>
  );
};

export default SoilAnalysisModule;

