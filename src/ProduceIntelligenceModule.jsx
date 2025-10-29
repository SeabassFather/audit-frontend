import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import audioSystem from './audioSystem';

const ProduceIntelligenceModule = () => {
  const { language } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedTests, setSelectedTests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [uploadedReport, setUploadedReport] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);

  const regions = [
    { id: 'michoacan', name: 'Michoacán', nameEs: 'Michoacán', icon: '🥑', color: '#10b981', products: 85, flagship: 'Avocado Capital' },
    { id: 'queretaro', name: 'Querétaro', nameEs: 'Querétaro', icon: '🌶️', color: '#ef4444', products: 72, flagship: 'Chili & Tomato Hub' },
    { id: 'baja', name: 'Baja California', nameEs: 'Baja California', icon: '🍓', color: '#ec4899', products: 95, flagship: 'Berry Capital' },
    { id: 'mexicali', name: 'Mexicali Valley', nameEs: 'Valle de Mexicali', icon: '🥬', color: '#06b6d4', products: 68, flagship: 'Winter Vegetable Source' },
    { id: 'imperial', name: 'Imperial Valley, CA', nameEs: 'Valle Imperial, CA', icon: '🥕', color: '#f59e0b', products: 78, flagship: 'Year-Round Produce' },
    { id: 'salinas', name: 'Salinas Valley, CA', nameEs: 'Valle de Salinas, CA', icon: '🥬', color: '#10b981', products: 92, flagship: 'Salad Bowl of America' },
    { id: 'oxnard', name: 'Oxnard, CA', nameEs: 'Oxnard, CA', icon: '🍓', color: '#be185d', products: 65, flagship: 'Strawberry Coast' },
    { id: 'santamaria', name: 'Santa Maria, CA', nameEs: 'Santa María, CA', icon: '🥦', color: '#059669', products: 73, flagship: 'Broccoli & Cauliflower' }
  ];

  const productDatabase = {
    michoacan: {
      name: 'Michoacán Products',
      products: [
        'Hass Avocado', 'Fuerte Avocado', 'Bacon Avocado', 'Reed Avocado', 'Pinkerton Avocado',
        'Zutano Avocado', 'Gwen Avocado', 'Lamb Hass Avocado', 'Blackberries', 'Raspberries',
        'Strawberries', 'Blueberries', 'Guava', 'Mango (Kent)', 'Mango (Ataulfo)', 'Papaya',
        'Lime (Persian)', 'Lime (Key)', 'Lemon', 'Orange', 'Mandarin', 'Grapefruit',
        'Tomato (Roma)', 'Tomato (Beefsteak)', 'Cherry Tomato', 'Bell Pepper', 'Jalapeño',
        'Serrano Pepper', 'Poblano Pepper', 'Habanero', 'Corn (White)', 'Corn (Yellow)',
        'Cucumber', 'Zucchini', 'Squash', 'Cilantro', 'Parsley', 'Mint', 'Oregano'
      ]
    },
    queretaro: {
      name: 'Querétaro Products',
      products: [
        'Tomato (Saladette)', 'Tomato (Cherry)', 'Tomato (Grape)', 'Tomato (Heirloom)',
        'Bell Pepper (Green)', 'Bell Pepper (Red)', 'Bell Pepper (Yellow)', 'Bell Pepper (Orange)',
        'Jalapeño', 'Serrano', 'Poblano', 'Anaheim Pepper', 'Güero Pepper',
        'Lettuce (Romaine)', 'Lettuce (Iceberg)', 'Lettuce (Butter)', 'Lettuce (Red Leaf)',
        'Spinach', 'Arugula', 'Kale', 'Chard', 'Broccoli', 'Cauliflower',
        'Cabbage (Green)', 'Cabbage (Red)', 'Brussels Sprouts', 'Asparagus', 'Green Beans',
        'Carrot', 'Radish', 'Beet', 'Turnip', 'Onion (White)', 'Onion (Red)', 'Onion (Yellow)',
        'Garlic', 'Shallot', 'Leek', 'Scallion'
      ]
    },
    baja: {
      name: 'Baja California Products',
      products: [
        'Strawberry (Albion)', 'Strawberry (San Andreas)', 'Strawberry (Camarosa)', 'Strawberry (Festival)',
        'Strawberry (Monterey)', 'Raspberry (Heritage)', 'Raspberry (Meeker)', 'Blackberry (Marion)',
        'Blackberry (Triple Crown)', 'Blueberry (Duke)', 'Blueberry (Bluecrop)', 'Blueberry (Legacy)',
        'Tomato (Roma)', 'Tomato (Cluster)', 'Tomato (TOV)', 'Cherry Tomato', 'Grape Tomato',
        'Bell Pepper', 'Cucumber (English)', 'Cucumber (Persian)', 'Zucchini', 'Yellow Squash',
        'Eggplant (Globe)', 'Eggplant (Japanese)', 'Green Beans', 'Sugar Snap Peas', 'Snow Peas',
        'Cilantro', 'Parsley', 'Basil', 'Mint', 'Dill', 'Lettuce (Romaine)', 'Lettuce (Mixed Greens)',
        'Arugula', 'Spinach', 'Kale (Lacinato)', 'Kale (Curly)', 'Chard', 'Bok Choy'
      ]
    },
    mexicali: {
      name: 'Mexicali Valley Products',
      products: [
        'Lettuce (Iceberg)', 'Lettuce (Romaine)', 'Lettuce (Leaf)', 'Lettuce (Butterhead)',
        'Cabbage (Green)', 'Cabbage (Red)', 'Cabbage (Napa)', 'Broccoli', 'Cauliflower',
        'Celery', 'Asparagus', 'Green Onion', 'Radish', 'Turnip', 'Beet', 'Carrot',
        'Bell Pepper (Green)', 'Bell Pepper (Red)', 'Cucumber', 'Zucchini', 'Yellow Squash',
        'Eggplant', 'Green Beans', 'Sugar Snap Peas', 'Jalapeño', 'Serrano',
        'Tomato (Roma)', 'Cherry Tomato', 'Cilantro', 'Parsley', 'Spinach', 'Arugula',
        'Kale', 'Chard', 'Bok Choy', 'Leek', 'Fennel', 'Kohlrabi'
      ]
    },
    imperial: {
      name: 'Imperial Valley Products',
      products: [
        'Lettuce (Iceberg)', 'Lettuce (Romaine)', 'Lettuce (Green Leaf)', 'Lettuce (Red Leaf)',
        'Spinach (Flat Leaf)', 'Spinach (Savoy)', 'Arugula', 'Kale', 'Chard', 'Bok Choy',
        'Cabbage (Green)', 'Cabbage (Red)', 'Broccoli', 'Cauliflower', 'Brussels Sprouts',
        'Carrot', 'Radish', 'Beet', 'Turnip', 'Onion (Yellow)', 'Onion (Red)', 'Onion (White)',
        'Leek', 'Scallion', 'Garlic', 'Celery', 'Asparagus', 'Green Beans',
        'Bell Pepper', 'Jalapeño', 'Serrano', 'Cucumber', 'Zucchini', 'Yellow Squash',
        'Tomato', 'Cherry Tomato', 'Cilantro', 'Parsley', 'Basil', 'Dill', 'Mint'
      ]
    },
    salinas: {
      name: 'Salinas Valley Products',
      products: [
        'Lettuce (Iceberg)', 'Lettuce (Romaine)', 'Lettuce (Green Leaf)', 'Lettuce (Red Leaf)',
        'Lettuce (Butter)', 'Lettuce (Oak Leaf)', 'Mixed Salad Greens', 'Spring Mix',
        'Arugula', 'Spinach (Baby)', 'Spinach (Mature)', 'Kale (Curly)', 'Kale (Lacinato)',
        'Chard (Rainbow)', 'Chard (Red)', 'Bok Choy', 'Cabbage (Green)', 'Cabbage (Red)',
        'Broccoli (Crown)', 'Broccoli (Florets)', 'Broccolini', 'Cauliflower (White)', 'Cauliflower (Purple)',
        'Cauliflower (Orange)', 'Romanesco', 'Brussels Sprouts', 'Artichoke', 'Celery', 'Celery Root',
        'Fennel', 'Leek', 'Scallion', 'Parsley (Flat)', 'Parsley (Curly)', 'Cilantro',
        'Basil', 'Mint', 'Dill', 'Oregano', 'Thyme', 'Rosemary', 'Sage',
        'Bell Pepper', 'Jalapeño', 'Cucumber', 'Zucchini', 'Yellow Squash'
      ]
    },
    oxnard: {
      name: 'Oxnard Products',
      products: [
        'Strawberry (Albion)', 'Strawberry (San Andreas)', 'Strawberry (Monterey)', 'Strawberry (Cabrillo)',
        'Strawberry (Portola)', 'Raspberry (Heritage)', 'Raspberry (Autumn Bliss)', 'Blackberry (Marion)',
        'Blackberry (Thornless)', 'Blueberry (Duke)', 'Blueberry (Bluecrop)', 'Blueberry (Emerald)',
        'Tomato (Cherry)', 'Tomato (Grape)', 'Tomato (Heirloom)', 'Bell Pepper (Red)', 'Bell Pepper (Yellow)',
        'Cucumber (English)', 'Cucumber (Persian)', 'Zucchini', 'Yellow Squash', 'Eggplant',
        'Green Beans', 'Sugar Snap Peas', 'Snow Peas', 'Lettuce (Mixed)', 'Arugula',
        'Spinach', 'Kale', 'Chard', 'Cilantro', 'Parsley', 'Basil', 'Mint', 'Dill'
      ]
    },
    santamaria: {
      name: 'Santa Maria Products',
      products: [
        'Broccoli (Crown)', 'Broccoli (Florets)', 'Broccolini', 'Cauliflower (White)', 'Cauliflower (Purple)',
        'Cauliflower (Orange)', 'Romanesco', 'Cabbage (Green)', 'Cabbage (Red)', 'Cabbage (Savoy)',
        'Brussels Sprouts', 'Lettuce (Iceberg)', 'Lettuce (Romaine)', 'Lettuce (Leaf)', 'Spinach',
        'Kale', 'Chard', 'Bok Choy', 'Celery', 'Celery Root', 'Leek', 'Scallion',
        'Carrot', 'Radish', 'Beet', 'Turnip', 'Parsnip', 'Rutabaga', 'Kohlrabi',
        'Artichoke', 'Asparagus', 'Green Beans', 'Sugar Snap Peas', 'Snow Peas',
        'Bell Pepper', 'Jalapeño', 'Cucumber', 'Zucchini', 'Yellow Squash', 'Tomato',
        'Cherry Tomato', 'Cilantro', 'Parsley', 'Basil', 'Dill', 'Oregano'
      ]
    }
  };

  const testCategories = [
    {
      id: 'pesticide',
      name: 'Pesticide Residue Analysis',
      nameEs: 'Análisis de Residuos de Pesticidas',
      icon: '🔬',
      color: '#ef4444',
      tests: [
        { id: 'PEST-001', name: 'Multi-Residue Screen (400+ compounds)', price: 285, days: 5, critical: true },
        { id: 'PEST-002', name: 'Organophosphate Panel (50 compounds)', price: 165, days: 4 },
        { id: 'PEST-003', name: 'Carbamate Panel (30 compounds)', price: 145, days: 4 },
        { id: 'PEST-004', name: 'Pyrethroid Panel (25 compounds)', price: 135, days: 3 },
        { id: 'PEST-005', name: 'Neonicotinoid Screen (7 compounds)', price: 125, days: 3 },
        { id: 'PEST-006', name: 'Glyphosate Detection', price: 115, days: 3 },
        { id: 'PEST-007', name: 'Chlorpyrifos Analysis', price: 95, days: 2 },
        { id: 'PEST-008', name: 'Fungicide Panel (60 compounds)', price: 175, days: 4 },
        { id: 'PEST-009', name: 'Herbicide Screen (40 compounds)', price: 155, days: 4 },
        { id: 'PEST-010', name: 'MRL Compliance Check (Mexico/USA/EU)', price: 195, days: 3, critical: true }
      ]
    },
    {
      id: 'heavy-metals',
      name: 'Heavy Metals Screening',
      nameEs: 'Detección de Metales Pesados',
      icon: '⚗️',
      color: '#8b5cf6',
      tests: [
        { id: 'MET-001', name: 'Lead (Pb) Analysis', price: 85, days: 2, critical: true },
        { id: 'MET-002', name: 'Cadmium (Cd) Test', price: 85, days: 2, critical: true },
        { id: 'MET-003', name: 'Arsenic (As) Detection', price: 95, days: 3, critical: true },
        { id: 'MET-004', name: 'Mercury (Hg) Analysis', price: 105, days: 3 },
        { id: 'MET-005', name: 'Chromium (Cr) Test', price: 85, days: 2 },
        { id: 'MET-006', name: 'Complete Heavy Metals Panel (12 elements)', price: 245, days: 4, critical: true },
        { id: 'MET-007', name: 'Aluminum (Al) Test', price: 75, days: 2 },
        { id: 'MET-008', name: 'Nickel (Ni) Analysis', price: 80, days: 2 }
      ]
    },
    {
      id: 'microbial',
      name: 'Microbial Contamination',
      nameEs: 'Contaminación Microbiana',
      icon: '🦠',
      color: '#dc2626',
      tests: [
        { id: 'MIC-001', name: 'E.coli O157:H7 Detection', price: 125, days: 3, critical: true },
        { id: 'MIC-002', name: 'Salmonella Screen', price: 135, days: 4, critical: true },
        { id: 'MIC-003', name: 'Listeria monocytogenes', price: 145, days: 4, critical: true },
        { id: 'MIC-004', name: 'Shigella Detection', price: 125, days: 3 },
        { id: 'MIC-005', name: 'Total Coliform Count', price: 85, days: 2 },
        { id: 'MIC-006', name: 'Aerobic Plate Count', price: 75, days: 2 },
        { id: 'MIC-007', name: 'Yeast & Mold Count', price: 95, days: 3 },
        { id: 'MIC-008', name: 'Complete Pathogen Panel', price: 325, days: 5, critical: true },
        { id: 'MIC-009', name: 'Campylobacter Test', price: 115, days: 3 },
        { id: 'MIC-010', name: 'Enterobacteriaceae Count', price: 85, days: 2 }
      ]
    },
    {
      id: 'nutritional',
      name: 'Nutritional Analysis',
      nameEs: 'Análisis Nutricional',
      icon: '📊',
      color: '#10b981',
      tests: [
        { id: 'NUT-001', name: 'Complete Nutritional Profile', price: 195, days: 4 },
        { id: 'NUT-002', name: 'Vitamin C Content', price: 75, days: 2 },
        { id: 'NUT-003', name: 'Beta-Carotene Analysis', price: 85, days: 2 },
        { id: 'NUT-004', name: 'Folate/Folic Acid', price: 95, days: 3 },
        { id: 'NUT-005', name: 'Antioxidant Capacity (ORAC)', price: 105, days: 3 },
        { id: 'NUT-006', name: 'Phenolic Compounds', price: 115, days: 3 },
        { id: 'NUT-007', name: 'Lycopene Content', price: 95, days: 2 },
        { id: 'NUT-008', name: 'Total Fiber Analysis', price: 85, days: 2 },
        { id: 'NUT-009', name: 'Sugar Profile (Brix)', price: 65, days: 1 },
        { id: 'NUT-010', name: 'Mineral Panel (Ca, K, Mg, Fe)', price: 125, days: 3 }
      ]
    },
    {
      id: 'quality',
      name: 'Quality & Freshness',
      nameEs: 'Calidad y Frescura',
      icon: '⭐',
      color: '#f59e0b',
      tests: [
        { id: 'QLT-001', name: 'Firmness Testing', price: 55, days: 1 },
        { id: 'QLT-002', name: 'Color Analysis (Colorimeter)', price: 65, days: 1 },
        { id: 'QLT-003', name: 'Brix/Acid Ratio', price: 75, days: 1 },
        { id: 'QLT-004', name: 'Moisture Content', price: 60, days: 1 },
        { id: 'QLT-005', name: 'Post-Harvest Decay Assessment', price: 85, days: 2 },
        { id: 'QLT-006', name: 'Respiration Rate', price: 95, days: 2 },
        { id: 'QLT-007', name: 'Ethylene Production', price: 105, days: 2 },
        { id: 'QLT-008', name: 'Shelf Life Prediction', price: 125, days: 7 },
        { id: 'QLT-009', name: 'Visual Defect Analysis', price: 65, days: 1 },
        { id: 'QLT-010', name: 'Taste Profile (Sensory)', price: 145, days: 1 }
      ]
    },
    {
      id: 'allergens',
      name: 'Allergen Testing',
      nameEs: 'Pruebas de Alérgenos',
      icon: '⚠️',
      color: '#f97316',
      tests: [
        { id: 'ALG-001', name: 'Gluten Detection', price: 95, days: 2 },
        { id: 'ALG-002', name: 'Soy Protein Test', price: 85, days: 2 },
        { id: 'ALG-003', name: 'Milk Protein (Casein)', price: 90, days: 2 },
        { id: 'ALG-004', name: 'Egg Protein Test', price: 85, days: 2 },
        { id: 'ALG-005', name: 'Peanut Protein Detection', price: 95, days: 2 },
        { id: 'ALG-006', name: 'Tree Nut Panel', price: 125, days: 3 },
        { id: 'ALG-007', name: 'Shellfish Protein Test', price: 105, days: 2 },
        { id: 'ALG-008', name: 'Complete Allergen Panel (14 allergens)', price: 245, days: 3 }
      ]
    },
    {
      id: 'mycotoxins',
      name: 'Mycotoxin Analysis',
      nameEs: 'Análisis de Micotoxinas',
      icon: '🍄',
      color: '#be185d',
      tests: [
        { id: 'MYC-001', name: 'Aflatoxin B1/B2/G1/G2', price: 135, days: 4, critical: true },
        { id: 'MYC-002', name: 'Ochratoxin A', price: 115, days: 3 },
        { id: 'MYC-003', name: 'Patulin (Apple/Pear)', price: 125, days: 3 },
        { id: 'MYC-004', name: 'Fumonisin Panel', price: 145, days: 4 },
        { id: 'MYC-005', name: 'Complete Mycotoxin Screen (20+ toxins)', price: 295, days: 5, critical: true }
      ]
    },
    {
      id: 'authenticity',
      name: 'Authenticity & Origin',
      nameEs: 'Autenticidad y Origen',
      icon: '✅',
      color: '#06b6d4',
      tests: [
        { id: 'AUT-001', name: 'DNA Variety Verification', price: 165, days: 5 },
        { id: 'AUT-002', name: 'Geographic Origin (Isotope)', price: 195, days: 6 },
        { id: 'AUT-003', name: 'Organic Certification Verification', price: 145, days: 4 },
        { id: 'AUT-004', name: 'GMO Detection Panel', price: 175, days: 5 },
        { id: 'AUT-005', name: 'Adulteration Screen', price: 155, days: 4 },
        { id: 'AUT-006', name: 'Species Identification (DNA)', price: 185, days: 5 }
      ]
    }
  ];

  const intelligenceFeatures = [
    { icon: '🧠', title: 'AI-Powered Analysis', desc: 'Automated report interpretation' },
    { icon: '📈', title: 'Trend Detection', desc: 'Historical comparison & patterns' },
    { icon: '⚠️', title: 'Risk Assessment', desc: 'Compliance & safety scoring' },
    { icon: '💡', title: 'Recommendations', desc: 'Actionable insights & solutions' }
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    audioSystem.playClick();
    const results = [];
    Object.entries(productDatabase).forEach(([regionId, data]) => {
      const matches = data.products.filter(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
      if (matches.length > 0) {
        const region = regions.find(r => r.id === regionId);
        results.push({ region, matches });
      }
    });
    setSearchResults(results);
    audioSystem.playSuccess();
  };

  const RegionCard = ({ region }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
      <div
        onClick={() => { audioSystem.playClick(); setSelectedRegion(region.id); }}
        onMouseEnter={() => { setIsHovered(true); audioSystem.playHover(); }}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: isHovered ? `linear-gradient(135deg, ${region.color}40 0%, ${region.color}20 100%)` : 'rgba(30, 41, 59, 0.6)',
          backdropFilter: 'blur(20px)',
          border: `3px solid ${isHovered ? region.color : 'rgba(100, 116, 139, 0.3)'}`,
          borderRadius: '25px',
          padding: '3rem 2rem',
          cursor: 'pointer',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: isHovered ? 'translateY(-15px) scale(1.05)' : 'translateY(0)',
          boxShadow: isHovered ? `0 25px 60px ${region.color}60, inset 0 0 40px ${region.color}20` : '0 10px 30px rgba(0,0,0,0.3)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {isHovered && (
          <div style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: `radial-gradient(circle, ${region.color}30 0%, transparent 70%)`,
            animation: 'pulse 2s ease-in-out infinite'
          }} />
        )}
        <div style={{ fontSize: '5rem', marginBottom: '1rem', filter: isHovered ? `drop-shadow(0 0 20px ${region.color})` : 'none', position: 'relative', zIndex: 1 }}>
          {region.icon}
        </div>
        <h3 style={{ fontSize: '1.8rem', color: isHovered ? region.color : '#fff', marginBottom: '0.5rem', fontWeight: 'bold', position: 'relative', zIndex: 1 }}>
          {language === 'es' ? region.nameEs : region.name}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
          {region.flagship}
        </p>
        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: region.color, marginBottom: '0.3rem', position: 'relative', zIndex: 1 }}>
          {region.products}
        </div>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', position: 'relative', zIndex: 1 }}>
          {language === 'es' ? 'productos' : 'products'}
        </p>
        <style>{`@keyframes pulse { 0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.3; } 50% { transform: scale(1.2) rotate(180deg); opacity: 0.6; } }`}</style>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '2rem', color: '#fff' }}>
      
      {/* HERO SECTION */}
      <div style={{ textAlign: 'center', marginBottom: '3rem', position: 'relative' }}>
        <h1 style={{ fontSize: '3.5rem', background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem' }}>
          Produce Intelligence System
        </h1>
        <p style={{ fontSize: '1.3rem', color: '#94a3b8', marginBottom: '2rem' }}>
          {language === 'es' 
            ? 'Análisis Avanzado • Verificación de Cumplimiento • Recomendaciones Inteligentes' 
            : 'Advanced Analysis • Compliance Verification • Intelligent Recommendations'}
        </p>

        {/* INTELLIGENCE FEATURES */}
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {intelligenceFeatures.map((feature, idx) => (
            <div key={idx} style={{ background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(10px)', border: '2px solid rgba(16, 185, 129, 0.3)', borderRadius: '15px', padding: '1.5rem', textAlign: 'center', minWidth: '200px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{feature.icon}</div>
              <div style={{ fontSize: '1.1rem', color: '#10b981', fontWeight: 'bold', marginBottom: '0.3rem' }}>{feature.title}</div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{feature.desc}</div>
            </div>
          ))}
        </div>

        {/* UPLOAD LAB REPORT */}
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(20px)', borderRadius: '20px', padding: '2rem', maxWidth: '800px', margin: '0 auto 3rem', border: '2px solid rgba(16, 185, 129, 0.3)' }}>
          <h3 style={{ fontSize: '1.5rem', color: '#10b981', marginBottom: '1rem' }}>
            {language === 'es' ? '📤 Cargar Informe de Laboratorio' : '📤 Upload Lab Report'}
          </h3>
          <input type="file" id="reportUpload" accept=".pdf,.xlsx,.csv" style={{ display: 'none' }} onChange={(e) => setUploadedReport(e.target.files[0])} />
          <button onClick={() => document.getElementById('reportUpload').click()} style={{ padding: '1rem 3rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem', marginRight: '1rem' }}>
            {language === 'es' ? 'Seleccionar Archivo' : 'Choose File'}
          </button>
          {uploadedReport && (
            <span style={{ color: '#10b981' }}>✅ {uploadedReport.name}</span>
          )}
        </div>

        {/* SEARCH 500+ PRODUCTS */}
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(20px)', borderRadius: '20px', padding: '2rem', maxWidth: '1000px', margin: '0 auto 3rem', border: '2px solid rgba(6, 182, 212, 0.3)' }}>
          <h3 style={{ fontSize: '1.8rem', color: '#06b6d4', marginBottom: '1.5rem' }}>
            {language === 'es' ? '🔍 Buscar en 500+ Productos' : '🔍 Search 500+ Products'}
          </h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="text"
              placeholder={language === 'es' ? 'Ej: Aguacate Hass, Fresa, Tomate...' : 'e.g., Hass Avocado, Strawberry, Tomato...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              style={{ flex: 1, padding: '1.2rem', background: 'rgba(15, 23, 42, 0.8)', border: '2px solid #334155', borderRadius: '12px', color: '#fff', fontSize: '1.1rem' }}
            />
            <button onClick={handleSearch} style={{ padding: '1.2rem 2.5rem', background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem' }}>
              {language === 'es' ? 'Buscar' : 'Search'}
            </button>
          </div>

          {searchResults.length > 0 && (
            <div style={{ marginTop: '2rem' }}>
              <h4 style={{ color: '#10b981', marginBottom: '1rem' }}>
                ✅ {language === 'es' ? 'Encontrado' : 'Found'} {searchResults.reduce((sum, r) => sum + r.matches.length, 0)} {language === 'es' ? 'productos' : 'products'}
              </h4>
              {searchResults.map((result, idx) => (
                <div key={idx} style={{ marginBottom: '2rem' }}>
                  <h5 style={{ color: result.region.color, fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                    {result.region.icon} {result.region.name}
                  </h5>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {result.matches.map((product, pIdx) => (
                      <div key={pIdx} onClick={() => { setSelectedProduct(product); setSelectedRegion(result.region.id); }} style={{ padding: '0.5rem 1rem', background: `${result.region.color}30`, border: `1px solid ${result.region.color}`, borderRadius: '20px', cursor: 'pointer', color: '#fff' }}>
                        {product}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* REGION SELECTION */}
      {!selectedRegion && (
        <>
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', color: '#10b981', marginBottom: '3rem' }}>
            {language === 'es' ? 'Seleccionar Región de Producción' : 'Select Production Region'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1600px', margin: '0 auto' }}>
            {regions.map(region => <RegionCard key={region.id} region={region} />)}
          </div>
        </>
      )}

      {/* CART */}
      {selectedTests.length > 0 && (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: 'rgba(15, 23, 42, 0.98)', backdropFilter: 'blur(20px)', border: '3px solid #10b981', borderRadius: '25px', padding: '2rem', minWidth: '350px', boxShadow: '0 30px 80px rgba(0,0,0,0.5)', zIndex: 1000 }}>
          <h3 style={{ color: '#10b981', marginBottom: '1rem', fontSize: '1.5rem' }}>🧪 Cart ({selectedTests.length})</h3>
          <div style={{ fontSize: '2.5rem', color: '#10b981', fontWeight: 'bold', marginBottom: '1rem' }}>
            ${selectedTests.reduce((sum, t) => sum + t.price, 0)}
          </div>
          <button style={{ width: '100%', padding: '1rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem' }}>
            {language === 'es' ? 'Proceder al Pago' : 'Proceed to Checkout'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProduceIntelligenceModule;
