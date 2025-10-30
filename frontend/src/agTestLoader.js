// agTestLoader.js - Smart test loading system
export const agTestDatabase = {
  vegetables: {
    'Leafy Greens': [
      { id: 'AG-VEG-LG-001', name: 'Spinach - E.coli O157:H7', price: 85, turnaround: 3, category: 'Vegetables', subcategory: 'Leafy Greens' },
      { id: 'AG-VEG-LG-002', name: 'Lettuce - Salmonella', price: 85, turnaround: 3, category: 'Vegetables', subcategory: 'Leafy Greens' },
      { id: 'AG-VEG-LG-003', name: 'Kale - Pesticide Residue Multi-screen', price: 150, turnaround: 5, category: 'Vegetables', subcategory: 'Leafy Greens' },
      { id: 'AG-VEG-LG-004', name: 'Arugula - Nitrate Levels', price: 75, turnaround: 2, category: 'Vegetables', subcategory: 'Leafy Greens' },
      { id: 'AG-VEG-LG-005', name: 'Swiss Chard - Heavy Metals (Pb, Cd, As)', price: 120, turnaround: 4, category: 'Vegetables', subcategory: 'Leafy Greens' }
    ],
    Cruciferous: [
      { id: 'AG-VEG-CR-001', name: 'Broccoli - Glucosinolate Analysis', price: 95, turnaround: 4, category: 'Vegetables', subcategory: 'Cruciferous' },
      { id: 'AG-VEG-CR-002', name: 'Cauliflower - Pesticide Residue', price: 150, turnaround: 5, category: 'Vegetables', subcategory: 'Cruciferous' },
      { id: 'AG-VEG-CR-003', name: 'Brussels Sprouts - E.coli', price: 85, turnaround: 3, category: 'Vegetables', subcategory: 'Cruciferous' },
      { id: 'AG-VEG-CR-004', name: 'Cabbage - Nitrate Content', price: 75, turnaround: 2, category: 'Vegetables', subcategory: 'Cruciferous' }
    ],
    'Fruiting Vegetables': [
      { id: 'AG-VEG-FV-001', name: 'Tomato - Salmonella', price: 85, turnaround: 3, category: 'Vegetables', subcategory: 'Fruiting Vegetables' },
      { id: 'AG-VEG-FV-002', name: 'Bell Pepper - Pesticide Multi-screen', price: 150, turnaround: 5, category: 'Vegetables', subcategory: 'Fruiting Vegetables' },
      { id: 'AG-VEG-FV-003', name: 'Cucumber - E.coli', price: 85, turnaround: 3, category: 'Vegetables', subcategory: 'Fruiting Vegetables' },
      { id: 'AG-VEG-FV-004', name: 'Zucchini - Listeria', price: 90, turnaround: 3, category: 'Vegetables', subcategory: 'Fruiting Vegetables' }
    ],
    'Root Vegetables': [
      { id: 'AG-VEG-RV-001', name: 'Carrot - Pesticide Residue', price: 150, turnaround: 5, category: 'Vegetables', subcategory: 'Root Vegetables' },
      { id: 'AG-VEG-RV-002', name: 'Potato - Glycoalkaloids (Solanine)', price: 110, turnaround: 4, category: 'Vegetables', subcategory: 'Root Vegetables' },
      { id: 'AG-VEG-RV-003', name: 'Sweet Potato - Heavy Metals', price: 120, turnaround: 4, category: 'Vegetables', subcategory: 'Root Vegetables' },
      { id: 'AG-VEG-RV-004', name: 'Beet - Nitrate Content', price: 75, turnaround: 2, category: 'Vegetables', subcategory: 'Root Vegetables' }
    ],
    Alliums: [
      { id: 'AG-VEG-AL-001', name: 'Onion - Salmonella', price: 85, turnaround: 3, category: 'Vegetables', subcategory: 'Alliums' },
      { id: 'AG-VEG-AL-002', name: 'Garlic - E.coli', price: 85, turnaround: 3, category: 'Vegetables', subcategory: 'Alliums' },
      { id: 'AG-VEG-AL-003', name: 'Leek - Pesticide Residue', price: 150, turnaround: 5, category: 'Vegetables', subcategory: 'Alliums' }
    ]
  },
  
  fruits: {
    Berries: [
      { id: 'AG-FRT-BR-001', name: 'Strawberry - Pesticide Multi-screen', price: 150, turnaround: 5, category: 'Fruits', subcategory: 'Berries' },
      { id: 'AG-FRT-BR-002', name: 'Blueberry - Hepatitis A Virus', price: 125, turnaround: 4, category: 'Fruits', subcategory: 'Berries' },
      { id: 'AG-FRT-BR-003', name: 'Raspberry - Cyclospora', price: 110, turnaround: 4, category: 'Fruits', subcategory: 'Berries' },
      { id: 'AG-FRT-BR-004', name: 'Blackberry - Norovirus', price: 115, turnaround: 4, category: 'Fruits', subcategory: 'Berries' }
    ],
    Citrus: [
      { id: 'AG-FRT-CT-001', name: 'Orange - Pesticide Residue', price: 150, turnaround: 5, category: 'Fruits', subcategory: 'Citrus' },
      { id: 'AG-FRT-CT-002', name: 'Lemon - Mold/Mycotoxins', price: 95, turnaround: 3, category: 'Fruits', subcategory: 'Citrus' },
      { id: 'AG-FRT-CT-003', name: 'Grapefruit - Heavy Metals', price: 120, turnaround: 4, category: 'Fruits', subcategory: 'Citrus' }
    ],
    'Tropical Fruits': [
      { id: 'AG-FRT-TF-001', name: 'Mango - Pesticide Residue', price: 150, turnaround: 5, category: 'Fruits', subcategory: 'Tropical Fruits' },
      { id: 'AG-FRT-TF-002', name: 'Pineapple - Bromelain Activity', price: 85, turnaround: 3, category: 'Fruits', subcategory: 'Tropical Fruits' },
      { id: 'AG-FRT-TF-003', name: 'Papaya - GMO Detection', price: 130, turnaround: 5, category: 'Fruits', subcategory: 'Tropical Fruits' },
      { id: 'AG-FRT-TF-004', name: 'Banana - Ethylene Residue', price: 75, turnaround: 2, category: 'Fruits', subcategory: 'Tropical Fruits' }
    ],
    'Stone Fruits': [
      { id: 'AG-FRT-SF-001', name: 'Peach - Pesticide Multi-screen', price: 150, turnaround: 5, category: 'Fruits', subcategory: 'Stone Fruits' },
      { id: 'AG-FRT-SF-002', name: 'Cherry - Salmonella', price: 85, turnaround: 3, category: 'Fruits', subcategory: 'Stone Fruits' },
      { id: 'AG-FRT-SF-003', name: 'Plum - Heavy Metals', price: 120, turnaround: 4, category: 'Fruits', subcategory: 'Stone Fruits' }
    ]
  },  
  'animal-protein': {
    Beef: [
      { id: 'AG-PROT-B-001', name: 'Beef - E.coli O157:H7 CRITICAL', price: 95, turnaround: 2, category: 'Animal Protein', subcategory: 'Beef' },
      { id: 'AG-PROT-B-002', name: 'Beef - Salmonella', price: 85, turnaround: 3, category: 'Animal Protein', subcategory: 'Beef' },
      { id: 'AG-PROT-B-003', name: 'Beef - Antibiotic Residue Screen', price: 140, turnaround: 4, category: 'Animal Protein', subcategory: 'Beef' },
      { id: 'AG-PROT-B-004', name: 'Beef - Hormone Analysis Steroids', price: 160, turnaround: 5, category: 'Animal Protein', subcategory: 'Beef' },
      { id: 'AG-PROT-B-005', name: 'Beef - Species DNA Verification', price: 110, turnaround: 3, category: 'Animal Protein', subcategory: 'Beef' },
      { id: 'AG-PROT-B-006', name: 'Beef - Listeria monocytogenes', price: 90, turnaround: 3, category: 'Animal Protein', subcategory: 'Beef' },
      { id: 'AG-PROT-B-007', name: 'Beef - Campylobacter', price: 95, turnaround: 3, category: 'Animal Protein', subcategory: 'Beef' },
      { id: 'AG-PROT-B-008', name: 'Beef - Fat Content Analysis', price: 75, turnaround: 2, category: 'Animal Protein', subcategory: 'Beef' },
      { id: 'AG-PROT-B-009', name: 'Beef - Protein Content', price: 70, turnaround: 2, category: 'Animal Protein', subcategory: 'Beef' },
      { id: 'AG-PROT-B-010', name: 'Beef - Collagen Content', price: 85, turnaround: 3, category: 'Animal Protein', subcategory: 'Beef' }
    ],
    Pork: [
      { id: 'AG-PROT-P-001', name: 'Pork - Salmonella High Risk', price: 85, turnaround: 3, category: 'Animal Protein', subcategory: 'Pork' },
      { id: 'AG-PROT-P-002', name: 'Pork - Trichinella spiralis', price: 105, turnaround: 3, category: 'Animal Protein', subcategory: 'Pork' },
      { id: 'AG-PROT-P-003', name: 'Pork - Ractopamine Beta-agonist', price: 130, turnaround: 4, category: 'Animal Protein', subcategory: 'Pork' },
      { id: 'AG-PROT-P-004', name: 'Pork - Antibiotic Residue', price: 140, turnaround: 4, category: 'Animal Protein', subcategory: 'Pork' },
      { id: 'AG-PROT-P-005', name: 'Pork - Yersinia enterocolitica', price: 95, turnaround: 3, category: 'Animal Protein', subcategory: 'Pork' },
      { id: 'AG-PROT-P-006', name: 'Pork - Listeria', price: 90, turnaround: 3, category: 'Animal Protein', subcategory: 'Pork' },
      { id: 'AG-PROT-P-007', name: 'Pork - Fat Quality Analysis', price: 80, turnaround: 2, category: 'Animal Protein', subcategory: 'Pork' },
      { id: 'AG-PROT-P-008', name: 'Pork - Species Verification Adulteration', price: 110, turnaround: 3, category: 'Animal Protein', subcategory: 'Pork' },
      { id: 'AG-PROT-P-009', name: 'Pork - Toxoplasma gondii', price: 115, turnaround: 4, category: 'Animal Protein', subcategory: 'Pork' },
      { id: 'AG-PROT-P-010', name: 'Pork - Water Activity aw', price: 65, turnaround: 1, category: 'Animal Protein', subcategory: 'Pork' }
    ],
    Poultry: [
      { id: 'AG-PROT-PL-001', name: 'Chicken - Salmonella High Risk', price: 85, turnaround: 3, category: 'Animal Protein', subcategory: 'Poultry' },
      { id: 'AG-PROT-PL-002', name: 'Chicken - Campylobacter jejuni CRITICAL', price: 95, turnaround: 3, category: 'Animal Protein', subcategory: 'Poultry' },
      { id: 'AG-PROT-PL-003', name: 'Chicken - Antibiotic Residue Screen', price: 140, turnaround: 4, category: 'Animal Protein', subcategory: 'Poultry' },
      { id: 'AG-PROT-PL-004', name: 'Chicken - Arsenic Compounds', price: 120, turnaround: 4, category: 'Animal Protein', subcategory: 'Poultry' },
      { id: 'AG-PROT-PL-005', name: 'Chicken - Listeria', price: 90, turnaround: 3, category: 'Animal Protein', subcategory: 'Poultry' },
      { id: 'AG-PROT-PL-006', name: 'Turkey - Salmonella', price: 85, turnaround: 3, category: 'Animal Protein', subcategory: 'Poultry' },
      { id: 'AG-PROT-PL-007', name: 'Turkey - Campylobacter', price: 95, turnaround: 3, category: 'Animal Protein', subcategory: 'Poultry' },
      { id: 'AG-PROT-PL-008', name: 'Duck - Avian Influenza Screening', price: 150, turnaround: 5, category: 'Animal Protein', subcategory: 'Poultry' },
      { id: 'AG-PROT-PL-009', name: 'Poultry - Clostridium perfringens', price: 100, turnaround: 3, category: 'Animal Protein', subcategory: 'Poultry' },
      { id: 'AG-PROT-PL-010', name: 'Poultry - Water-Added Detection', price: 75, turnaround: 2, category: 'Animal Protein', subcategory: 'Poultry' }
    ],
    'Lamb & Goat': [
      { id: 'AG-PROT-LG-001', name: 'Lamb - E.coli O157:H7', price: 95, turnaround: 3, category: 'Animal Protein', subcategory: 'Lamb & Goat' },
      { id: 'AG-PROT-LG-002', name: 'Lamb - Salmonella', price: 85, turnaround: 3, category: 'Animal Protein', subcategory: 'Lamb & Goat' },
      { id: 'AG-PROT-LG-003', name: 'Lamb - CLA Conjugated Linoleic Acid', price: 110, turnaround: 4, category: 'Animal Protein', subcategory: 'Lamb & Goat' },
      { id: 'AG-PROT-LG-004', name: 'Lamb - Omega-3 Fatty Acids', price: 95, turnaround: 3, category: 'Animal Protein', subcategory: 'Lamb & Goat' },
      { id: 'AG-PROT-LG-005', name: 'Goat - Species DNA Verification', price: 110, turnaround: 3, category: 'Animal Protein', subcategory: 'Lamb & Goat' },
      { id: 'AG-PROT-LG-006', name: 'Goat - Brucella Brucellosis', price: 125, turnaround: 4, category: 'Animal Protein', subcategory: 'Lamb & Goat' },
      { id: 'AG-PROT-LG-007', name: 'Goat - Antibiotic Residue', price: 140, turnaround: 4, category: 'Animal Protein', subcategory: 'Lamb & Goat' },
      { id: 'AG-PROT-LG-008', name: 'Lamb - Listeria', price: 90, turnaround: 3, category: 'Animal Protein', subcategory: 'Lamb & Goat' },
      { id: 'AG-PROT-LG-009', name: 'Goat - Casein Content Milk', price: 80, turnaround: 3, category: 'Animal Protein', subcategory: 'Lamb & Goat' },
      { id: 'AG-PROT-LG-010', name: 'Lamb - Fat Analysis', price: 75, turnaround: 2, category: 'Animal Protein', subcategory: 'Lamb & Goat' }
    ],
    Eggs: [
      { id: 'AG-PROT-E-001', name: 'Eggs - Salmonella enteritidis CRITICAL', price: 95, turnaround: 3, category: 'Animal Protein', subcategory: 'Eggs' },
      { id: 'AG-PROT-E-002', name: 'Eggs - Antibiotic Residue', price: 140, turnaround: 4, category: 'Animal Protein', subcategory: 'Eggs' },
      { id: 'AG-PROT-E-003', name: 'Eggs - Omega-3 Enrichment Verification', price: 85, turnaround: 3, category: 'Animal Protein', subcategory: 'Eggs' },
      { id: 'AG-PROT-E-004', name: 'Eggs - Vitamin D Content', price: 90, turnaround: 3, category: 'Animal Protein', subcategory: 'Eggs' },
      { id: 'AG-PROT-E-005', name: 'Eggs - Cholesterol Analysis', price: 80, turnaround: 2, category: 'Animal Protein', subcategory: 'Eggs' },
      { id: 'AG-PROT-E-006', name: 'Eggs - Avian Influenza Screening', price: 150, turnaround: 5, category: 'Animal Protein', subcategory: 'Eggs' },
      { id: 'AG-PROT-E-007', name: 'Eggs - Listeria', price: 90, turnaround: 3, category: 'Animal Protein', subcategory: 'Eggs' },
      { id: 'AG-PROT-E-008', name: 'Eggs - Protein Quality', price: 75, turnaround: 2, category: 'Animal Protein', subcategory: 'Eggs' },
      { id: 'AG-PROT-E-009', name: 'Eggs - Campylobacter', price: 95, turnaround: 3, category: 'Animal Protein', subcategory: 'Eggs' },
      { id: 'AG-PROT-E-010', name: 'Eggs - Haugh Unit Freshness', price: 60, turnaround: 1, category: 'Animal Protein', subcategory: 'Eggs' }
    ],
    Dairy: [
      { id: 'AG-PROT-D-001', name: 'Milk - Antibiotic Residue Screen', price: 140, turnaround: 4, category: 'Animal Protein', subcategory: 'Dairy' },
      { id: 'AG-PROT-D-002', name: 'Milk - Aflatoxin M1 Mycotoxin', price: 125, turnaround: 4, category: 'Animal Protein', subcategory: 'Dairy' },
      { id: 'AG-PROT-D-003', name: 'Milk - Listeria monocytogenes', price: 90, turnaround: 3, category: 'Animal Protein', subcategory: 'Dairy' },
      { id: 'AG-PROT-D-004', name: 'Milk - Salmonella', price: 85, turnaround: 3, category: 'Animal Protein', subcategory: 'Dairy' },
      { id: 'AG-PROT-D-005', name: 'Milk - E.coli', price: 85, turnaround: 3, category: 'Animal Protein', subcategory: 'Dairy' },
      { id: 'AG-PROT-D-006', name: 'Milk - Somatic Cell Count Mastitis', price: 70, turnaround: 2, category: 'Animal Protein', subcategory: 'Dairy' },
      { id: 'AG-PROT-D-007', name: 'Cheese - Listeria High Risk', price: 90, turnaround: 3, category: 'Animal Protein', subcategory: 'Dairy' },
      { id: 'AG-PROT-D-008', name: 'Yogurt - Probiotic Viability Count', price: 95, turnaround: 3, category: 'Animal Protein', subcategory: 'Dairy' },
      { id: 'AG-PROT-D-009', name: 'Butter - Fat Content Analysis', price: 75, turnaround: 2, category: 'Animal Protein', subcategory: 'Dairy' },
      { id: 'AG-PROT-D-010', name: 'Dairy - Melamine Contamination', price: 130, turnaround: 4, category: 'Animal Protein', subcategory: 'Dairy' }
    ]
  },  
  seafood: {
    Finfish: [
      { id: 'AG-SEA-F-001', name: 'Salmon - Mercury Methylmercury', price: 110, turnaround: 4, category: 'Seafood', subcategory: 'Finfish' },
      { id: 'AG-SEA-F-002', name: 'Salmon - PCBs Polychlorinated Biphenyls', price: 145, turnaround: 5, category: 'Seafood', subcategory: 'Finfish' },
      { id: 'AG-SEA-F-003', name: 'Salmon - Omega-3 Fatty Acids', price: 95, turnaround: 3, category: 'Seafood', subcategory: 'Finfish' },
      { id: 'AG-SEA-F-004', name: 'Salmon - Antibiotic Residue Farmed', price: 140, turnaround: 4, category: 'Seafood', subcategory: 'Finfish' },
      { id: 'AG-SEA-F-005', name: 'Tuna - Mercury CRITICAL High Risk', price: 110, turnaround: 4, category: 'Seafood', subcategory: 'Finfish' },
      { id: 'AG-SEA-F-006', name: 'Tuna - Histamine Scombrotoxin', price: 105, turnaround: 3, category: 'Seafood', subcategory: 'Finfish' },
      { id: 'AG-SEA-F-007', name: 'Tuna - Species DNA Verification', price: 110, turnaround: 3, category: 'Seafood', subcategory: 'Finfish' },
      { id: 'AG-SEA-F-008', name: 'Tilapia - Antibiotic Residue', price: 140, turnaround: 4, category: 'Seafood', subcategory: 'Finfish' },
      { id: 'AG-SEA-F-009', name: 'Tilapia - Malachite Green Banned Dye', price: 135, turnaround: 4, category: 'Seafood', subcategory: 'Finfish' },
      { id: 'AG-SEA-F-010', name: 'Cod - Parasites Anisakis', price: 120, turnaround: 4, category: 'Seafood', subcategory: 'Finfish' },
      { id: 'AG-SEA-F-011', name: 'Mackerel - Histamine', price: 105, turnaround: 3, category: 'Seafood', subcategory: 'Finfish' },
      { id: 'AG-SEA-F-012', name: 'Halibut - Mercury', price: 110, turnaround: 4, category: 'Seafood', subcategory: 'Finfish' },
      { id: 'AG-SEA-F-013', name: 'Swordfish - Mercury VERY HIGH', price: 110, turnaround: 4, category: 'Seafood', subcategory: 'Finfish' },
      { id: 'AG-SEA-F-014', name: 'Mahi Mahi - Ciguatera Toxin', price: 155, turnaround: 5, category: 'Seafood', subcategory: 'Finfish' },
      { id: 'AG-SEA-F-015', name: 'Catfish - Antibiotics Imported', price: 140, turnaround: 4, category: 'Seafood', subcategory: 'Finfish' }
    ],
    Crustaceans: [
      { id: 'AG-SEA-C-001', name: 'Shrimp - Antibiotic Residue BANNED', price: 140, turnaround: 4, category: 'Seafood', subcategory: 'Crustaceans' },
      { id: 'AG-SEA-C-002', name: 'Shrimp - Sulfites Preservative', price: 95, turnaround: 3, category: 'Seafood', subcategory: 'Crustaceans' },
      { id: 'AG-SEA-C-003', name: 'Shrimp - Vibrio Pathogen', price: 100, turnaround: 3, category: 'Seafood', subcategory: 'Crustaceans' },
      { id: 'AG-SEA-C-004', name: 'Shrimp - Species Verification', price: 110, turnaround: 3, category: 'Seafood', subcategory: 'Crustaceans' },
      { id: 'AG-SEA-C-005', name: 'Shrimp - Salmonella', price: 85, turnaround: 3, category: 'Seafood', subcategory: 'Crustaceans' },
      { id: 'AG-SEA-C-006', name: 'Crab - Domoic Acid Amnesic Shellfish Poisoning', price: 145, turnaround: 5, category: 'Seafood', subcategory: 'Crustaceans' },
      { id: 'AG-SEA-C-007', name: 'Lobster - Heavy Metals Cd Pb', price: 120, turnaround: 4, category: 'Seafood', subcategory: 'Crustaceans' },
      { id: 'AG-SEA-C-008', name: 'Lobster - Vibrio', price: 100, turnaround: 3, category: 'Seafood', subcategory: 'Crustaceans' },
      { id: 'AG-SEA-C-009', name: 'Crawfish - Salmonella', price: 85, turnaround: 3, category: 'Seafood', subcategory: 'Crustaceans' },
      { id: 'AG-SEA-C-010', name: 'Prawns - Antibiotic Screen', price: 140, turnaround: 4, category: 'Seafood', subcategory: 'Crustaceans' },
      { id: 'AG-SEA-C-011', name: 'Crab - Cadmium Content', price: 110, turnaround: 4, category: 'Seafood', subcategory: 'Crustaceans' },
      { id: 'AG-SEA-C-012', name: 'Shrimp - Nitrofuran Metabolites Banned', price: 150, turnaround: 5, category: 'Seafood', subcategory: 'Crustaceans' },
      { id: 'AG-SEA-C-013', name: 'Lobster - Paralytic Shellfish Poisoning PSP', price: 155, turnaround: 5, category: 'Seafood', subcategory: 'Crustaceans' },
      { id: 'AG-SEA-C-014', name: 'Crab - Listeria', price: 90, turnaround: 3, category: 'Seafood', subcategory: 'Crustaceans' },
      { id: 'AG-SEA-C-015', name: 'Shrimp - Water-Added Detection', price: 75, turnaround: 2, category: 'Seafood', subcategory: 'Crustaceans' }
    ],
    Mollusks: [
      { id: 'AG-SEA-M-001', name: 'Oysters - Vibrio vulnificus LETHAL', price: 115, turnaround: 3, category: 'Seafood', subcategory: 'Mollusks' },
      { id: 'AG-SEA-M-002', name: 'Oysters - Norovirus High Risk', price: 125, turnaround: 4, category: 'Seafood', subcategory: 'Mollusks' },
      { id: 'AG-SEA-M-003', name: 'Oysters - Paralytic Shellfish Poisoning PSP', price: 155, turnaround: 5, category: 'Seafood', subcategory: 'Mollusks' },
      { id: 'AG-SEA-M-004', name: 'Oysters - Hepatitis A', price: 130, turnaround: 4, category: 'Seafood', subcategory: 'Mollusks' },
      { id: 'AG-SEA-M-005', name: 'Clams - PSP Toxins', price: 155, turnaround: 5, category: 'Seafood', subcategory: 'Mollusks' },
      { id: 'AG-SEA-M-006', name: 'Mussels - Domoic Acid ASP', price: 145, turnaround: 5, category: 'Seafood', subcategory: 'Mollusks' },
      { id: 'AG-SEA-M-007', name: 'Scallops - Cadmium', price: 110, turnaround: 4, category: 'Seafood', subcategory: 'Mollusks' },
      { id: 'AG-SEA-M-008', name: 'Scallops - Water-Added Detection', price: 75, turnaround: 2, category: 'Seafood', subcategory: 'Mollusks' },
      { id: 'AG-SEA-M-009', name: 'Clams - Vibrio parahaemolyticus', price: 105, turnaround: 3, category: 'Seafood', subcategory: 'Mollusks' },
      { id: 'AG-SEA-M-010', name: 'Mussels - Heavy Metals Pb Cd As', price: 120, turnaround: 4, category: 'Seafood', subcategory: 'Mollusks' },
      { id: 'AG-SEA-M-011', name: 'Oysters - Salmonella', price: 85, turnaround: 3, category: 'Seafood', subcategory: 'Mollusks' },
      { id: 'AG-SEA-M-012', name: 'Clams - E.coli', price: 85, turnaround: 3, category: 'Seafood', subcategory: 'Mollusks' },
      { id: 'AG-SEA-M-013', name: 'Mussels - Listeria', price: 90, turnaround: 3, category: 'Seafood', subcategory: 'Mollusks' },
      { id: 'AG-SEA-M-014', name: 'Oysters - Diarrhetic Shellfish Poisoning DSP', price: 155, turnaround: 5, category: 'Seafood', subcategory: 'Mollusks' },
      { id: 'AG-SEA-M-015', name: 'Scallops - Species Verification', price: 110, turnaround: 3, category: 'Seafood', subcategory: 'Mollusks' }
    ],
    'Roe & Caviar': [
      { id: 'AG-SEA-R-001', name: 'Caviar - Species DNA Verification Sturgeon', price: 135, turnaround: 4, category: 'Seafood', subcategory: 'Roe & Caviar' },
      { id: 'AG-SEA-R-002', name: 'Caviar - Listeria', price: 90, turnaround: 3, category: 'Seafood', subcategory: 'Roe & Caviar' },
      { id: 'AG-SEA-R-003', name: 'Caviar - Salmonella', price: 85, turnaround: 3, category: 'Seafood', subcategory: 'Roe & Caviar' },
      { id: 'AG-SEA-R-004', name: 'Fish Roe - Mercury', price: 110, turnaround: 4, category: 'Seafood', subcategory: 'Roe & Caviar' },
      { id: 'AG-SEA-R-005', name: 'Fish Roe - PCBs', price: 145, turnaround: 5, category: 'Seafood', subcategory: 'Roe & Caviar' },
      { id: 'AG-SEA-R-006', name: 'Salmon Roe - Antibiotic Residue', price: 140, turnaround: 4, category: 'Seafood', subcategory: 'Roe & Caviar' },
      { id: 'AG-SEA-R-007', name: 'Caviar - Authenticity Testing', price: 150, turnaround: 5, category: 'Seafood', subcategory: 'Roe & Caviar' },
      { id: 'AG-SEA-R-008', name: 'Fish Roe - Heavy Metals', price: 120, turnaround: 4, category: 'Seafood', subcategory: 'Roe & Caviar' },
      { id: 'AG-SEA-R-009', name: 'Caviar - Borax Detection Preservative', price: 105, turnaround: 3, category: 'Seafood', subcategory: 'Roe & Caviar' },
      { id: 'AG-SEA-R-010', name: 'Fish Roe - Vibrio', price: 100, turnaround: 3, category: 'Seafood', subcategory: 'Roe & Caviar' },
      { id: 'AG-SEA-R-011', name: 'Caviar - Pasteurization Verification', price: 80, turnaround: 2, category: 'Seafood', subcategory: 'Roe & Caviar' },
      { id: 'AG-SEA-R-012', name: 'Fish Roe - Omega-3 Content', price: 95, turnaround: 3, category: 'Seafood', subcategory: 'Roe & Caviar' },
      { id: 'AG-SEA-R-013', name: 'Caviar - Adulteration Testing', price: 140, turnaround: 4, category: 'Seafood', subcategory: 'Roe & Caviar' },
      { id: 'AG-SEA-R-014', name: 'Fish Roe - Histamine', price: 105, turnaround: 3, category: 'Seafood', subcategory: 'Roe & Caviar' },
      { id: 'AG-SEA-R-015', name: 'Caviar - Color Additive Testing', price: 115, turnaround: 4, category: 'Seafood', subcategory: 'Roe & Caviar' }
    ]
  }
};

export const loadTestsByCategory = (categoryId, subcategory = null) => {
  const category = agTestDatabase[categoryId];
  if (!category) return [];
  
  if (subcategory) {
    return category[subcategory] || [];
  }
  
  return Object.values(category).flat();
};

export const getSubcategories = (categoryId) => {
  const category = agTestDatabase[categoryId];
  return category ? Object.keys(category) : [];
};

export const searchTests = (query) => {
  const results = [];
  const lowerQuery = query.toLowerCase();
  
  Object.values(agTestDatabase).forEach(category => {
    Object.values(category).forEach(tests => {
      tests.forEach(test => {
        if (test.name.toLowerCase().includes(lowerQuery) || 
            test.id.toLowerCase().includes(lowerQuery)) {
          results.push(test);
        }
      });
    });
  });
  
  return results;
};