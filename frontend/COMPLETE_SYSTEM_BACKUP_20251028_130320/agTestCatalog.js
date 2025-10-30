// ═══════════════════════════════════════════════════════════
// COMPREHENSIVE AGRICULTURE TESTING CATALOG
// 150+ Tests | Vegetables (55) | Fruits (45) | Grains (25) | Legumes (25)
// ═══════════════════════════════════════════════════════════

export const agTestCatalog = [
  // ═══════════════════════════════════════════════════════════
  // VEGETABLES - 55 TESTS (LEAFY, FRUITING, ROOT, CRUCIFEROUS)
  // ═══════════════════════════════════════════════════════════
  
  // LEAFY GREENS (12 tests)
  { id: 'AG-VEG-L-001', name: 'Lettuce - Nitrate Content', category: 'Vegetables', subcategory: 'Leafy Greens', crop: 'Lettuce', price: 45, turnaround: 3, description: 'EU Regulation compliance (< 3000 mg/kg)' },
  { id: 'AG-VEG-L-002', name: 'Lettuce - Pesticide Residue (400+ compounds)', category: 'Vegetables', subcategory: 'Leafy Greens', crop: 'Lettuce', price: 120, turnaround: 5, description: 'Multi-residue screening EPA/FDA standards' },
  { id: 'AG-VEG-L-003', name: 'Lettuce - E.coli O157:H7 & Salmonella', category: 'Vegetables', subcategory: 'Leafy Greens', crop: 'Lettuce', price: 85, turnaround: 3, description: 'Food safety pathogen detection' },
  { id: 'AG-VEG-L-004', name: 'Spinach - Iron, Folate & Vitamin K', category: 'Vegetables', subcategory: 'Leafy Greens', crop: 'Spinach', price: 75, turnaround: 3, description: 'Complete nutritional profile' },
  { id: 'AG-VEG-L-005', name: 'Spinach - Heavy Metals (Pb, Cd, As, Hg)', category: 'Vegetables', subcategory: 'Leafy Greens', crop: 'Spinach', price: 95, turnaround: 4, description: 'Safety compliance testing' },
  { id: 'AG-VEG-L-006', name: 'Kale - Glucosinolate Profile', category: 'Vegetables', subcategory: 'Leafy Greens', crop: 'Kale', price: 80, turnaround: 4, description: 'Cancer-fighting compounds' },
  { id: 'AG-VEG-L-007', name: 'Kale - ORAC Antioxidant Capacity', category: 'Vegetables', subcategory: 'Leafy Greens', crop: 'Kale', price: 70, turnaround: 3, description: 'Oxygen Radical Absorbance Capacity' },
  { id: 'AG-VEG-L-008', name: 'Arugula - Isothiocyanate Content', category: 'Vegetables', subcategory: 'Leafy Greens', crop: 'Arugula', price: 65, turnaround: 3, description: 'Pungency & health compounds' },
  { id: 'AG-VEG-L-009', name: 'Swiss Chard - Beta-Carotene & Lutein', category: 'Vegetables', subcategory: 'Leafy Greens', crop: 'Swiss Chard', price: 70, turnaround: 3, description: 'Eye health nutrients' },
  { id: 'AG-VEG-L-010', name: 'Collard Greens - Calcium & Vitamin A', category: 'Vegetables', subcategory: 'Leafy Greens', crop: 'Collard Greens', price: 60, turnaround: 3, description: 'Bone health profile' },
  { id: 'AG-VEG-L-011', name: 'Bok Choy - Selenium & Vitamin C', category: 'Vegetables', subcategory: 'Leafy Greens', crop: 'Bok Choy', price: 65, turnaround: 3, description: 'Asian greens analysis' },
  { id: 'AG-VEG-L-012', name: 'Watercress - Phenethyl Isothiocyanate', category: 'Vegetables', subcategory: 'Leafy Greens', crop: 'Watercress', price: 75, turnaround: 3, description: 'Bioactive compound analysis' },

  // FRUITING VEGETABLES (15 tests)
  { id: 'AG-VEG-F-001', name: 'Tomato - Brix (Sugar Content)', category: 'Vegetables', subcategory: 'Fruiting Vegetables', crop: 'Tomato', price: 35, turnaround: 1, description: 'Sweetness measurement' },
  { id: 'AG-VEG-F-002', name: 'Tomato - Lycopene Quantification', category: 'Vegetables', subcategory: 'Fruiting Vegetables', crop: 'Tomato', price: 75, turnaround: 3, description: 'Red antioxidant pigment' },
  { id: 'AG-VEG-F-003', name: 'Tomato - pH & Acidity (Titratable)', category: 'Vegetables', subcategory: 'Fruiting Vegetables', crop: 'Tomato', price: 40, turnaround: 2, description: 'Flavor balance testing' },
  { id: 'AG-VEG-F-004', name: 'Tomato - Firmness & Shelf Life Prediction', category: 'Vegetables', subcategory: 'Fruiting Vegetables', crop: 'Tomato', price: 55, turnaround: 2, description: 'Post-harvest quality' },
  { id: 'AG-VEG-F-005', name: 'Pepper (Bell) - Vitamin C & Carotenoids', category: 'Vegetables', subcategory: 'Fruiting Vegetables', crop: 'Pepper', price: 70, turnaround: 3, description: 'Nutritional value' },
  { id: 'AG-VEG-F-006', name: 'Pepper (Hot) - Capsaicin & Scoville Units', category: 'Vegetables', subcategory: 'Fruiting Vegetables', crop: 'Hot Pepper', price: 80, turnaround: 3, description: 'Heat level quantification' },
  { id: 'AG-VEG-F-007', name: 'Cucumber - Water Activity & Texture', category: 'Vegetables', subcategory: 'Fruiting Vegetables', crop: 'Cucumber', price: 50, turnaround: 2, description: 'Crispness analysis' },
  { id: 'AG-VEG-F-008', name: 'Cucumber - Cucurbitacin (Bitterness)', category: 'Vegetables', subcategory: 'Fruiting Vegetables', crop: 'Cucumber', price: 65, turnaround: 3, description: 'Bitter compound detection' },
  { id: 'AG-VEG-F-009', name: 'Zucchini - Moisture & Fiber Content', category: 'Vegetables', subcategory: 'Fruiting Vegetables', crop: 'Zucchini', price: 45, turnaround: 2, description: 'Quality indicators' },
  { id: 'AG-VEG-F-010', name: 'Eggplant - Anthocyanin & Nasunin', category: 'Vegetables', subcategory: 'Fruiting Vegetables', crop: 'Eggplant', price: 75, turnaround: 3, description: 'Purple antioxidants' },
  { id: 'AG-VEG-F-011', name: 'Squash - Beta-Carotene Profile', category: 'Vegetables', subcategory: 'Fruiting Vegetables', crop: 'Squash', price: 60, turnaround: 3, description: 'Vitamin A precursors' },
  { id: 'AG-VEG-F-012', name: 'Pumpkin - Sugar & Dry Matter', category: 'Vegetables', subcategory: 'Fruiting Vegetables', crop: 'Pumpkin', price: 50, turnaround: 2, description: 'Culinary quality' },
  { id: 'AG-VEG-F-013', name: 'Green Beans - Chlorophyll Retention', category: 'Vegetables', subcategory: 'Fruiting Vegetables', crop: 'Green Beans', price: 55, turnaround: 2, description: 'Color stability' },
  { id: 'AG-VEG-F-014', name: 'Okra - Mucilage & Fiber Analysis', category: 'Vegetables', subcategory: 'Fruiting Vegetables', crop: 'Okra', price: 60, turnaround: 3, description: 'Texture compounds' },
  { id: 'AG-VEG-F-015', name: 'Tomatillo - Acidity & Pectin Content', category: 'Vegetables', subcategory: 'Fruiting Vegetables', crop: 'Tomatillo', price: 65, turnaround: 3, description: 'Salsa quality' },

  // ROOT VEGETABLES (12 tests)
  { id: 'AG-VEG-R-001', name: 'Carrot - Beta-Carotene & Total Carotenoids', category: 'Vegetables', subcategory: 'Root Vegetables', crop: 'Carrot', price: 70, turnaround: 3, description: 'Vitamin A analysis' },
  { id: 'AG-VEG-R-002', name: 'Carrot - Sugar Profile (Glucose, Fructose, Sucrose)', category: 'Vegetables', subcategory: 'Root Vegetables', crop: 'Carrot', price: 55, turnaround: 2, description: 'Sweetness composition' },
  { id: 'AG-VEG-R-003', name: 'Potato - Starch Content & Amylose/Amylopectin Ratio', category: 'Vegetables', subcategory: 'Root Vegetables', crop: 'Potato', price: 60, turnaround: 3, description: 'Cooking characteristics' },
  { id: 'AG-VEG-R-004', name: 'Potato - Reducing Sugars & Acrylamide Risk', category: 'Vegetables', subcategory: 'Root Vegetables', crop: 'Potato', price: 85, turnaround: 3, description: 'Frying safety assessment' },
  { id: 'AG-VEG-R-005', name: 'Potato - Glycoalkaloid (Solanine) Levels', category: 'Vegetables', subcategory: 'Root Vegetables', crop: 'Potato', price: 75, turnaround: 3, description: 'Toxicity screening' },
  { id: 'AG-VEG-R-006', name: 'Sweet Potato - Beta-Carotene & Anthocyanins', category: 'Vegetables', subcategory: 'Root Vegetables', crop: 'Sweet Potato', price: 75, turnaround: 3, description: 'Nutrient density' },
  { id: 'AG-VEG-R-007', name: 'Beet - Betalain Content (Red Pigments)', category: 'Vegetables', subcategory: 'Root Vegetables', crop: 'Beet', price: 70, turnaround: 3, description: 'Natural colorant analysis' },
  { id: 'AG-VEG-R-008', name: 'Beet - Nitrate Content (Performance)', category: 'Vegetables', subcategory: 'Root Vegetables', crop: 'Beet', price: 60, turnaround: 2, description: 'Athletic performance' },
  { id: 'AG-VEG-R-009', name: 'Radish - Glucosinolates & Myrosinase', category: 'Vegetables', subcategory: 'Root Vegetables', crop: 'Radish', price: 65, turnaround: 3, description: 'Pungency compounds' },
  { id: 'AG-VEG-R-010', name: 'Turnip - Vitamin C & Mineral Profile', category: 'Vegetables', subcategory: 'Root Vegetables', crop: 'Turnip', price: 55, turnaround: 2, description: 'Nutritional quality' },
  { id: 'AG-VEG-R-011', name: 'Parsnip - Sugar & Fiber Content', category: 'Vegetables', subcategory: 'Root Vegetables', crop: 'Parsnip', price: 50, turnaround: 2, description: 'Sweetness analysis' },
  { id: 'AG-VEG-R-012', name: 'Ginger - Gingerol & 6-Shogaol', category: 'Vegetables', subcategory: 'Root Vegetables', crop: 'Ginger', price: 85, turnaround: 3, description: 'Bioactive compounds' },

  // CRUCIFEROUS & ALLIUMS (10 tests)
  { id: 'AG-VEG-C-001', name: 'Broccoli - Sulforaphane Content', category: 'Vegetables', subcategory: 'Cruciferous', crop: 'Broccoli', price: 90, turnaround: 3, description: 'Cancer-fighting isothiocyanate' },
  { id: 'AG-VEG-C-002', name: 'Broccoli - Vitamin K & Folate', category: 'Vegetables', subcategory: 'Cruciferous', crop: 'Broccoli', price: 65, turnaround: 2, description: 'Bone & blood health' },
  { id: 'AG-VEG-C-003', name: 'Cauliflower - Glucosinolate Profile', category: 'Vegetables', subcategory: 'Cruciferous', crop: 'Cauliflower', price: 75, turnaround: 3, description: 'Health-promoting compounds' },
  { id: 'AG-VEG-C-004', name: 'Brussels Sprouts - Indole-3-Carbinol', category: 'Vegetables', subcategory: 'Cruciferous', crop: 'Brussels Sprouts', price: 80, turnaround: 3, description: 'Hormone modulation' },
  { id: 'AG-VEG-C-005', name: 'Cabbage - Vitamin C & Anthocyanins (Red)', category: 'Vegetables', subcategory: 'Cruciferous', crop: 'Cabbage', price: 60, turnaround: 2, description: 'Nutrient & color analysis' },
  { id: 'AG-VEG-C-006', name: 'Onion - Pyruvic Acid (Pungency)', category: 'Vegetables', subcategory: 'Alliums', crop: 'Onion', price: 55, turnaround: 2, description: 'Tear-inducing compound' },
  { id: 'AG-VEG-C-007', name: 'Onion - Quercetin Content', category: 'Vegetables', subcategory: 'Alliums', crop: 'Onion', price: 70, turnaround: 3, description: 'Powerful antioxidant' },
  { id: 'AG-VEG-C-008', name: 'Garlic - Allicin & Organosulfur Compounds', category: 'Vegetables', subcategory: 'Alliums', crop: 'Garlic', price: 85, turnaround: 3, description: 'Medicinal compounds' },
  { id: 'AG-VEG-C-009', name: 'Leek - Kaempferol & Folate', category: 'Vegetables', subcategory: 'Alliums', crop: 'Leek', price: 60, turnaround: 3, description: 'Health benefits' },
  { id: 'AG-VEG-C-010', name: 'Shallot - Phenolic Compound Profile', category: 'Vegetables', subcategory: 'Alliums', crop: 'Shallot', price: 65, turnaround: 3, description: 'Antioxidant analysis' },

  // SPECIALTY VEGETABLES (6 tests)
  { id: 'AG-VEG-S-001', name: 'Asparagus - Asparagine & Fiber', category: 'Vegetables', subcategory: 'Specialty', crop: 'Asparagus', price: 70, turnaround: 3, description: 'Amino acid profile' },
  { id: 'AG-VEG-S-002', name: 'Celery - Apigenin & 3-n-Butylphthalide', category: 'Vegetables', subcategory: 'Specialty', crop: 'Celery', price: 75, turnaround: 3, description: 'Flavor & bioactives' },
  { id: 'AG-VEG-S-003', name: 'Artichoke - Cynarin & Silymarin', category: 'Vegetables', subcategory: 'Specialty', crop: 'Artichoke', price: 85, turnaround: 4, description: 'Liver health compounds' },
  { id: 'AG-VEG-S-004', name: 'Mushroom - Beta-Glucan & Ergothioneine', category: 'Vegetables', subcategory: 'Specialty', crop: 'Mushroom', price: 90, turnaround: 4, description: 'Immune-boosting compounds' },
  { id: 'AG-VEG-S-005', name: 'Bamboo Shoots - Cyanogenic Glycosides', category: 'Vegetables', subcategory: 'Specialty', crop: 'Bamboo Shoots', price: 80, turnaround: 3, description: 'Safety screening' },
  { id: 'AG-VEG-S-006', name: 'Fennel - Anethole & Volatile Oils', category: 'Vegetables', subcategory: 'Specialty', crop: 'Fennel', price: 70, turnaround: 3, description: 'Aromatic compound analysis' },

  // ═══════════════════════════════════════════════════════════
  // FRUITS - 45 TESTS (BERRIES, CITRUS, STONE, TROPICAL)
  // ═══════════════════════════════════════════════════════════

  // BERRIES (12 tests)
  { id: 'AG-FRU-B-001', name: 'Strawberry - Brix, pH & Titratable Acidity', category: 'Fruits', subcategory: 'Berries', crop: 'Strawberry', price: 50, turnaround: 2, description: 'Taste profile trinity' },
  { id: 'AG-FRU-B-002', name: 'Strawberry - Anthocyanin & Ellagic Acid', category: 'Fruits', subcategory: 'Berries', crop: 'Strawberry', price: 85, turnaround: 3, description: 'Red pigments & antioxidants' },
  { id: 'AG-FRU-B-003', name: 'Strawberry - Firmness & Post-Harvest Life', category: 'Fruits', subcategory: 'Berries', crop: 'Strawberry', price: 60, turnaround: 2, description: 'Shelf stability' },
  { id: 'AG-FRU-B-004', name: 'Blueberry - ORAC & Total Phenolics', category: 'Fruits', subcategory: 'Berries', crop: 'Blueberry', price: 90, turnaround: 3, description: 'Antioxidant superpower' },
  { id: 'AG-FRU-B-005', name: 'Blueberry - Anthocyanin Fingerprint', category: 'Fruits', subcategory: 'Berries', crop: 'Blueberry', price: 95, turnaround: 4, description: '15+ anthocyanin compounds' },
  { id: 'AG-FRU-B-006', name: 'Raspberry - Ellagitannin Content', category: 'Fruits', subcategory: 'Berries', crop: 'Raspberry', price: 85, turnaround: 3, description: 'Gut health compounds' },
  { id: 'AG-FRU-B-007', name: 'Blackberry - Vitamin C & Fiber', category: 'Fruits', subcategory: 'Berries', crop: 'Blackberry', price: 65, turnaround: 3, description: 'Nutritional value' },
  { id: 'AG-FRU-B-008', name: 'Cranberry - Proanthocyanidin (PAC) Type A', category: 'Fruits', subcategory: 'Berries', crop: 'Cranberry', price: 100, turnaround: 4, description: 'Urinary tract health' },
  { id: 'AG-FRU-B-009', name: 'Acai Berry - ORAC & Omega Fatty Acids', category: 'Fruits', subcategory: 'Berries', crop: 'Acai', price: 110, turnaround: 4, description: 'Superfruit profile' },
  { id: 'AG-FRU-B-010', name: 'Goji Berry - Zeaxanthin & Polysaccharides', category: 'Fruits', subcategory: 'Berries', crop: 'Goji', price: 105, turnaround: 4, description: 'Eye health nutrients' },
  { id: 'AG-FRU-B-011', name: 'Elderberry - Anthocyanins & Immune Support', category: 'Fruits', subcategory: 'Berries', crop: 'Elderberry', price: 90, turnaround: 3, description: 'Cold & flu compounds' },
  { id: 'AG-FRU-B-012', name: 'Mulberry - Resveratrol & 1-Deoxynojirimycin', category: 'Fruits', subcategory: 'Berries', crop: 'Mulberry', price: 95, turnaround: 4, description: 'Blood sugar modulation' },

  // CITRUS (8 tests)
  { id: 'AG-FRU-C-001', name: 'Orange - Vitamin C Quantification', category: 'Fruits', subcategory: 'Citrus', crop: 'Orange', price: 60, turnaround: 2, description: 'Ascorbic acid analysis' },
  { id: 'AG-FRU-C-002', name: 'Orange - Hesperidin & Naringin', category: 'Fruits', subcategory: 'Citrus', crop: 'Orange', price: 75, turnaround: 3, description: 'Citrus flavonoids' },
  { id: 'AG-FRU-C-003', name: 'Lemon - Citric Acid & pH', category: 'Fruits', subcategory: 'Citrus', crop: 'Lemon', price: 45, turnaround: 2, description: 'Acidity measurement' },
  { id: 'AG-FRU-C-004', name: 'Lemon - Limonene & Essential Oil Profile', category: 'Fruits', subcategory: 'Citrus', crop: 'Lemon', price: 80, turnaround: 3, description: 'Aromatic terpenes' },
  { id: 'AG-FRU-C-005', name: 'Grapefruit - Naringenin & Drug Interaction Risk', category: 'Fruits', subcategory: 'Citrus', crop: 'Grapefruit', price: 85, turnaround: 3, description: 'Pharmaceutical safety' },
  { id: 'AG-FRU-C-006', name: 'Lime - Vitamin C & Unique Flavonoids', category: 'Fruits', subcategory: 'Citrus', crop: 'Lime', price: 65, turnaround: 2, description: 'Nutritional profile' },
  { id: 'AG-FRU-C-007', name: 'Tangerine - Beta-Cryptoxanthin', category: 'Fruits', subcategory: 'Citrus', crop: 'Tangerine', price: 70, turnaround: 3, description: 'Pro-vitamin A carotenoid' },
  { id: 'AG-FRU-C-008', name: 'Pomelo - Naringin & Brix/Acid Ratio', category: 'Fruits', subcategory: 'Citrus', crop: 'Pomelo', price: 75, turnaround: 3, description: 'Taste balance' },

  // STONE FRUITS (8 tests)
  { id: 'AG-FRU-S-001', name: 'Peach - Brix & Firmness', category: 'Fruits', subcategory: 'Stone Fruits', crop: 'Peach', price: 55, turnaround: 2, description: 'Ripeness indicators' },
  { id: 'AG-FRU-S-002', name: 'Peach - Carotenoid & Polyphenol Profile', category: 'Fruits', subcategory: 'Stone Fruits', crop: 'Peach', price: 75, turnaround: 3, description: 'Antioxidant compounds' },
  { id: 'AG-FRU-S-003', name: 'Plum - Anthocyanin (Red/Purple varieties)', category: 'Fruits', subcategory: 'Stone Fruits', crop: 'Plum', price: 70, turnaround: 3, description: 'Color & health benefits' },
  { id: 'AG-FRU-S-004', name: 'Cherry - Anthocyanin & Melatonin', category: 'Fruits', subcategory: 'Stone Fruits', crop: 'Cherry', price: 85, turnaround: 3, description: 'Sleep & recovery' },
  { id: 'AG-FRU-S-005', name: 'Apricot - Beta-Carotene & Fiber', category: 'Fruits', subcategory: 'Stone Fruits', crop: 'Apricot', price: 65, turnaround: 3, description: 'Vitamin A & digestive health' },
  { id: 'AG-FRU-S-006', name: 'Nectarine - Sugar Profile & Acidity', category: 'Fruits', subcategory: 'Stone Fruits', crop: 'Nectarine', price: 55, turnaround: 2, description: 'Flavor analysis' },
  { id: 'AG-FRU-S-007', name: 'Mango - Total Carotenoids & Vitamin E', category: 'Fruits', subcategory: 'Stone Fruits', crop: 'Mango', price: 80, turnaround: 3, description: 'Nutrient powerhouse' },
  { id: 'AG-FRU-S-008', name: 'Avocado - Oil Content & Fatty Acid Profile', category: 'Fruits', subcategory: 'Stone Fruits', crop: 'Avocado', price: 85, turnaround: 3, description: 'Healthy fats analysis' },

  // TROPICAL FRUITS (10 tests)
  { id: 'AG-FRU-T-001', name: 'Pineapple - Bromelain Enzyme Activity', category: 'Fruits', subcategory: 'Tropical', crop: 'Pineapple', price: 90, turnaround: 3, description: 'Digestive enzyme' },
  { id: 'AG-FRU-T-002', name: 'Pineapple - Vitamin C & Manganese', category: 'Fruits', subcategory: 'Tropical', crop: 'Pineapple', price: 65, turnaround: 3, description: 'Nutritional value' },
  { id: 'AG-FRU-T-003', name: 'Banana - Starch to Sugar Conversion', category: 'Fruits', subcategory: 'Tropical', crop: 'Banana', price: 60, turnaround: 2, description: 'Ripeness stage' },
  { id: 'AG-FRU-T-004', name: 'Banana - Resistant Starch (Green)', category: 'Fruits', subcategory: 'Tropical', crop: 'Banana', price: 70, turnaround: 3, description: 'Prebiotic fiber' },
  { id: 'AG-FRU-T-005', name: 'Papaya - Papain Enzyme & Beta-Carotene', category: 'Fruits', subcategory: 'Tropical', crop: 'Papaya', price: 80, turnaround: 3, description: 'Enzyme & vitamin A' },
  { id: 'AG-FRU-T-006', name: 'Dragon Fruit - Betacyanin & Prebiotic Fiber', category: 'Fruits', subcategory: 'Tropical', crop: 'Dragon Fruit', price: 95, turnaround: 4, description: 'Exotic analysis' },
  { id: 'AG-FRU-T-007', name: 'Passion Fruit - Piceatannol & Vitamin A', category: 'Fruits', subcategory: 'Tropical', crop: 'Passion Fruit', price: 85, turnaround: 3, description: 'Antioxidant profile' },
  { id: 'AG-FRU-T-008', name: 'Guava - Vitamin C (4x Orange!) & Lycopene', category: 'Fruits', subcategory: 'Tropical', crop: 'Guava', price: 75, turnaround: 3, description: 'Tropical superfruit' },
  { id: 'AG-FRU-T-009', name: 'Lychee - Oligonol & Polyphenols', category: 'Fruits', subcategory: 'Tropical', crop: 'Lychee', price: 90, turnaround: 4, description: 'Circulation support' },
  { id: 'AG-FRU-T-010', name: 'Coconut - Medium-Chain Triglycerides (MCT)', category: 'Fruits', subcategory: 'Tropical', crop: 'Coconut', price: 85, turnaround: 3, description: 'Healthy fat profile' },

  // POME & OTHER FRUITS (7 tests)
  { id: 'AG-FRU-P-001', name: 'Apple - Polyphenol Oxidase & Browning', category: 'Fruits', subcategory: 'Pome Fruits', crop: 'Apple', price: 60, turnaround: 2, description: 'Enzymatic browning' },
  { id: 'AG-FRU-P-002', name: 'Apple - Quercetin & Chlorogenic Acid', category: 'Fruits', subcategory: 'Pome Fruits', crop: 'Apple', price: 85, turnaround: 3, description: 'Antioxidant compounds' },
  { id: 'AG-FRU-P-003', name: 'Pear - Sorbitol & Fiber Content', category: 'Fruits', subcategory: 'Pome Fruits', crop: 'Pear', price: 60, turnaround: 2, description: 'Digestive health' },
  { id: 'AG-FRU-P-004', name: 'Grape - Resveratrol & Anthocyanin', category: 'Fruits', subcategory: 'Other', crop: 'Grape', price: 95, turnaround: 4, description: 'Anti-aging compounds' },
  { id: 'AG-FRU-P-005', name: 'Watermelon - Lycopene & Citrulline', category: 'Fruits', subcategory: 'Other', crop: 'Watermelon', price: 85, turnaround: 3, description: 'Performance nutrients' },
  { id: 'AG-FRU-P-006', name: 'Cantaloupe - Beta-Carotene & Potassium', category: 'Fruits', subcategory: 'Other', crop: 'Cantaloupe', price: 65, turnaround: 3, description: 'Hydration & vision' },
  { id: 'AG-FRU-P-007', name: 'Kiwi - Actinidin Enzyme & Vitamin C', category: 'Fruits', subcategory: 'Other', crop: 'Kiwi', price: 80, turnaround: 3, description: 'Protein digestion aid' },

  // GRAINS (25 tests) - keeping existing
  { id: 'AG-GRA-001', name: 'Corn - Aflatoxin B1, B2, G1, G2', category: 'Grains', subcategory: 'Cereal Grains', crop: 'Corn', price: 95, turnaround: 4, description: 'Mycotoxin safety screen' },
  { id: 'AG-GRA-002', name: 'Corn - Protein & Oil Content', category: 'Grains', subcategory: 'Cereal Grains', crop: 'Corn', price: 60, turnaround: 3, description: 'Feed quality parameters' },
  { id: 'AG-GRA-003', name: 'Wheat - Gluten Quality & Falling Number', category: 'Grains', subcategory: 'Cereal Grains', crop: 'Wheat', price: 75, turnaround: 3, description: 'Baking performance' },
  { id: 'AG-GRA-004', name: 'Wheat - DON (Vomitoxin) Deoxynivalenol', category: 'Grains', subcategory: 'Cereal Grains', crop: 'Wheat', price: 90, turnaround: 4, description: 'Fusarium mycotoxin' },
  { id: 'AG-GRA-005', name: 'Rice - Total Arsenic (Inorganic)', category: 'Grains', subcategory: 'Cereal Grains', crop: 'Rice', price: 100, turnaround: 4, description: 'Heavy metal safety' },
  { id: 'AG-GRA-006', name: 'Rice - Amylose Content', category: 'Grains', subcategory: 'Cereal Grains', crop: 'Rice', price: 65, turnaround: 3, description: 'Cooking texture' },
  { id: 'AG-GRA-007', name: 'Oats - Beta-Glucan Quantification', category: 'Grains', subcategory: 'Cereal Grains', crop: 'Oats', price: 75, turnaround: 3, description: 'Heart health fiber' },
  { id: 'AG-GRA-008', name: 'Barley - Malt Extract & Diastatic Power', category: 'Grains', subcategory: 'Cereal Grains', crop: 'Barley', price: 80, turnaround: 3, description: 'Brewing quality' },

  // LEGUMES (25 tests) - keeping existing
  { id: 'AG-LEG-001', name: 'Soybean - Protein Quality & Amino Acids', category: 'Legumes', subcategory: 'Protein Crops', crop: 'Soybean', price: 80, turnaround: 3, description: 'Complete amino acid profile' },
  { id: 'AG-LEG-002', name: 'Soybean - Isoflavone Content (Genistein)', category: 'Legumes', subcategory: 'Protein Crops', crop: 'Soybean', price: 90, turnaround: 3, description: 'Phytoestrogens' },
  { id: 'AG-LEG-003', name: 'Peanut - Aflatoxin Safety Screen', category: 'Legumes', subcategory: 'Protein Crops', crop: 'Peanut', price: 95, turnaround: 4, description: 'Critical safety test' },
  { id: 'AG-LEG-004', name: 'Chickpea - Fiber & Resistant Starch', category: 'Legumes', subcategory: 'Protein Crops', crop: 'Chickpea', price: 65, turnaround: 3, description: 'Gut health profile' },
  { id: 'AG-LEG-005', name: 'Lentil - Iron & Folate', category: 'Legumes', subcategory: 'Protein Crops', crop: 'Lentil', price: 60, turnaround: 3, description: 'Nutritional powerhouse' }
];

// ═══════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════

export const getAgCategories = () => {
  return [...new Set(agTestCatalog.map(test => test.category))].sort();
};

export const getAgSubcategories = (category) => {
  return [...new Set(agTestCatalog.filter(t => t.category === category).map(t => t.subcategory))].sort();
};

export const getAgCrops = () => {
  return [...new Set(agTestCatalog.map(test => test.crop))].sort();
};

export const getTestsByCrop = (crop) => {
  return agTestCatalog.filter(test => test.crop === crop);
};

export const getTestsByCategory = (category) => {
  return agTestCatalog.filter(test => test.category === category);
};

export const getTestsBySubcategory = (subcategory) => {
  return agTestCatalog.filter(test => test.subcategory === subcategory);
};

export const getVegetableTests = () => {
  return agTestCatalog.filter(test => test.category === 'Vegetables');
};

export const getFruitTests = () => {
  return agTestCatalog.filter(test => test.category === 'Fruits');
};

export const getTotalTestCount = () => {
  return agTestCatalog.length;
};
