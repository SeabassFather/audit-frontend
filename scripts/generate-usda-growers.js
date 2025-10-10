#!/usr/bin/env node

/**
 * Generate Comprehensive USDA-Style Grower Database
 * 
 * This script generates 100+ realistic grower entries based on USDA NOP standards
 * with diverse commodities, certifications, and locations.
 */

const fs = require('fs');
const path = require('path');

// Comprehensive commodity list (100+ USDA products/crops)
const COMMODITIES = [
  'avocados', 'almonds', 'apples', 'apricots', 'artichokes', 'asparagus', 'bananas', 
  'beans', 'beets', 'bell peppers', 'berries', 'blackberries', 'blueberries', 'broccoli',
  'brussels sprouts', 'cabbage', 'cantaloupe', 'carrots', 'cauliflower', 'celery',
  'cherries', 'chili peppers', 'citrus', 'corn', 'cranberries', 'cucumbers', 'dates',
  'eggplant', 'figs', 'garlic', 'ginger', 'grapefruit', 'grapes', 'green beans',
  'honeydew', 'jalapeños', 'kale', 'kiwi', 'lemons', 'lettuce', 'limes', 'mangoes',
  'melons', 'mushrooms', 'nectarines', 'okra', 'olives', 'onions', 'oranges', 'papayas',
  'peaches', 'pears', 'peas', 'pecans', 'peppers', 'persimmons', 'pineapples', 'pistachios',
  'plums', 'pomegranates', 'potatoes', 'pumpkins', 'radishes', 'raspberries', 'rhubarb',
  'romaine', 'spinach', 'squash', 'strawberries', 'sweet corn', 'sweet potatoes', 'tangerines',
  'tomatillos', 'tomatoes', 'turnips', 'walnuts', 'watermelon', 'yams', 'zucchini',
  'arugula', 'bok choy', 'chard', 'cilantro', 'collard greens', 'endive', 'fennel',
  'herbs', 'horseradish', 'leeks', 'microgreens', 'mint', 'parsley', 'radicchio',
  'shallots', 'sorrel', 'sprouts', 'tarragon', 'thyme', 'watercress', 'wheat',
  'barley', 'oats', 'rice', 'quinoa', 'sorghum', 'soybeans', 'chickpeas', 'lentils'
];

// USDA NOP Certifiers (real)
const CERTIFIERS = [
  'California Certified Organic Farmers (CCOF)',
  'Oregon Tilth',
  'Quality Assurance International (QAI)',
  'MOSA Certified Organic',
  'Organic Crop Improvement Association (OCIA)',
  'Global Organic Alliance',
  'Pennsylvania Certified Organic (PCO)',
  'Ecocert ICO',
  'Vermont Organic Farmers (VOF)',
  'OneCert',
  'Mayacert',
  'Certimex',
  'Control Union Certifications',
  'Clemson University',
  'USDA Accredited Certifying Agent'
];

// Locations with coordinates
const LOCATIONS = [
  { region: 'california', city: 'Salinas', state: 'CA', country: 'USA', lat: 36.6777, lng: -121.6555 },
  { region: 'california', city: 'Fresno', state: 'CA', country: 'USA', lat: 36.7378, lng: -119.7871 },
  { region: 'california', city: 'Bakersfield', state: 'CA', country: 'USA', lat: 35.3733, lng: -119.0187 },
  { region: 'california', city: 'Watsonville', state: 'CA', country: 'USA', lat: 36.9101, lng: -121.7568 },
  { region: 'california', city: 'Oxnard', state: 'CA', country: 'USA', lat: 34.1975, lng: -119.1771 },
  { region: 'florida', city: 'Homestead', state: 'FL', country: 'USA', lat: 25.4687, lng: -80.4776 },
  { region: 'florida', city: 'Plant City', state: 'FL', country: 'USA', lat: 28.0192, lng: -82.1126 },
  { region: 'florida', city: 'Immokalee', state: 'FL', country: 'USA', lat: 26.4187, lng: -81.4176 },
  { region: 'texas', city: 'Rio Grande Valley', state: 'TX', country: 'USA', lat: 26.2034, lng: -98.2300 },
  { region: 'texas', city: 'Winter Garden', state: 'TX', country: 'USA', lat: 28.6328, lng: -99.5228 },
  { region: 'washington', city: 'Yakima', state: 'WA', country: 'USA', lat: 46.6021, lng: -120.5059 },
  { region: 'washington', city: 'Wenatchee', state: 'WA', country: 'USA', lat: 47.4235, lng: -120.3103 },
  { region: 'oregon', city: 'Hood River', state: 'OR', country: 'USA', lat: 45.7054, lng: -121.5212 },
  { region: 'oregon', city: 'Willamette Valley', state: 'OR', country: 'USA', lat: 44.0521, lng: -123.0868 },
  { region: 'arizona', city: 'Yuma', state: 'AZ', country: 'USA', lat: 32.6927, lng: -114.6277 },
  { region: 'arizona', city: 'Phoenix', state: 'AZ', country: 'USA', lat: 33.4484, lng: -112.0740 },
  { region: 'sinaloa', city: 'Culiacán', state: 'Sinaloa', country: 'Mexico', lat: 24.8091, lng: -107.3940 },
  { region: 'sinaloa', city: 'Los Mochis', state: 'Sinaloa', country: 'Mexico', lat: 25.7933, lng: -108.9864 },
  { region: 'michoacan', city: 'Uruapan', state: 'Michoacán', country: 'Mexico', lat: 19.4204, lng: -102.0631 },
  { region: 'baja', city: 'San Quintín', state: 'Baja California', country: 'Mexico', lat: 30.5786, lng: -115.9487 },
];

// Company name templates
const NAME_TEMPLATES = [
  '{location} Valley Farms',
  '{location} Organic Growers',
  '{commodity} Farms of {location}',
  '{location} Fresh Produce',
  'Organic {commodity} Co.',
  '{location} {commodity} Growers',
  'Premium {commodity} Farms',
  '{location} Agriculture Group',
  'Green Valley {commodity}',
  'Sustainable {location} Farms',
  '{commodity} International',
  'Heritage {commodity} Growers',
  '{location} Organic Collective',
  'Pure {commodity} Farms',
  '{location} Harvest Group'
];

// Generate grower database
function generateGrowers(count = 100) {
  const growers = [];
  
  for (let i = 0; i < count; i++) {
    const location = LOCATIONS[i % LOCATIONS.length];
    const primaryCommodity = COMMODITIES[i % COMMODITIES.length];
    const numCommodities = Math.floor(Math.random() * 4) + 1;
    const commodities = [primaryCommodity];
    
    // Add additional commodities
    for (let j = 0; j < numCommodities - 1; j++) {
      const addCommodity = COMMODITIES[Math.floor(Math.random() * COMMODITIES.length)];
      if (!commodities.includes(addCommodity)) {
        commodities.push(addCommodity);
      }
    }
    
    // Generate company name
    const nameTemplate = NAME_TEMPLATES[i % NAME_TEMPLATES.length];
    const companyName = nameTemplate
      .replace('{location}', location.city)
      .replace('{commodity}', primaryCommodity.charAt(0).toUpperCase() + primaryCommodity.slice(1));
    
    const certifier = CERTIFIERS[i % CERTIFIERS.length];
    const type = ['grower', 'grower', 'grower', 'handler', 'processor'][Math.floor(Math.random() * 5)];
    
    const certifications = ['usda-organic', 'nop-certified'];
    if (Math.random() > 0.5) certifications.push('globalgap');
    if (Math.random() > 0.6) certifications.push('primusgfs');
    if (location.country === 'Mexico' && Math.random() > 0.5) certifications.push('senasica');
    
    const grower = {
      id: `USDA${String(i + 1).padStart(4, '0')}`,
      type: type,
      companyName: companyName,
      dba: companyName.split(' ').slice(0, 2).join(' '),
      location: {
        region: location.region,
        city: location.city,
        state: location.state,
        country: location.country,
        coordinates: {
          lat: location.lat + (Math.random() - 0.5) * 0.1,
          lng: location.lng + (Math.random() - 0.5) * 0.1
        }
      },
      commodities: commodities,
      certifications: certifications,
      foodSafetyBadges: ['organic-verified', 'usda-compliant', 'nop-approved'],
      organic: true,
      volume: {
        weekly: `${Math.floor(Math.random() * 500) + 50},000 lbs`,
        annual: `${Math.floor(Math.random() * 10) + 1}M lbs`
      },
      capacity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
      contact: {
        name: `Contact at ${companyName.split(' ')[0]}`,
        phone: `+1-${Math.floor(Math.random() * 900) + 100}-555-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
        email: `info@${companyName.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 20)}.com`,
        whatsapp: Math.random() > 0.5 ? `+1-${Math.floor(Math.random() * 900) + 100}-555-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}` : null
      },
      established: Math.floor(Math.random() * 40) + 1985,
      employees: Math.floor(Math.random() * 500) + 10,
      riskScore: Math.floor(Math.random() * 20) + 80,
      rating: Number((Math.random() * 1 + 4).toFixed(1)),
      reviewCount: Math.floor(Math.random() * 200) + 10,
      bio: `USDA NOP certified organic ${type}. Certifier: ${certifier}. Specializing in ${commodities.join(', ')}.`,
      documents: ['USDA Organic Certificate', 'NOP Compliance', certifier + ' Audit Report'],
      deals: Math.floor(Math.random() * 200) + 10,
      onTimeDelivery: Math.floor(Math.random() * 10) + 90,
      crm: { 
        salesforce: Math.random() > 0.7 ? `SF${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}` : null, 
        hubspot: Math.random() > 0.7 ? `HUB${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}` : null 
      },
      usdaData: {
        certifier: certifier,
        certificationDate: `${Math.floor(Math.random() * 5) + 2020}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-01`,
        scopes: commodities.join('; '),
        nopCompliant: true
      }
    };
    
    growers.push(grower);
  }
  
  return growers;
}

// Main execution
function main() {
  console.log('🌾 Generating USDA-Style Grower Database');
  console.log('=' .repeat(50));
  console.log();
  
  const growers = generateGrowers(110); // Generate 110 to ensure we have 100+
  
  const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'data');
  const JSON_OUTPUT = path.join(OUTPUT_DIR, 'usda_growers.json');
  
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  // Save JSON
  fs.writeFileSync(JSON_OUTPUT, JSON.stringify(growers, null, 2));
  
  console.log(`✅ Generated ${growers.length} USDA-certified growers`);
  console.log(`💾 Saved to: ${JSON_OUTPUT}`);
  console.log();
  
  // Statistics
  console.log('📈 Database Statistics:');
  console.log(`   Total growers: ${growers.length}`);
  console.log(`   Organic certified: ${growers.filter(g => g.organic).length}`);
  console.log(`   US operations: ${growers.filter(g => g.location.country === 'USA').length}`);
  console.log(`   Mexico operations: ${growers.filter(g => g.location.country === 'Mexico').length}`);
  
  const allCommodities = new Set();
  growers.forEach(g => g.commodities.forEach(c => allCommodities.add(c)));
  console.log(`   Unique commodities: ${allCommodities.size}`);
  
  const allCertifiers = new Set();
  growers.forEach(g => allCertifiers.add(g.usdaData.certifier));
  console.log(`   USDA Certifiers: ${allCertifiers.size}`);
  
  console.log();
  console.log('📦 Sample Commodities (100+ total):');
  const commoditySample = Array.from(allCommodities).slice(0, 20);
  commoditySample.forEach((c, i) => {
    if (i % 5 === 0) console.log('   ', c);
    else process.stdout.write(c + ', ');
  });
  console.log();
  
  console.log();
  console.log('✅ USDA grower database generation complete!');
  console.log();
  console.log('📝 Next steps:');
  console.log('   1. Review the generated data in src/data/usda_growers.json');
  console.log('   2. Update src/data/growerDatabase.js to include this data');
  console.log('   3. Run: npm start to test the integration');
}

if (require.main === module) {
  main();
}

module.exports = { generateGrowers, COMMODITIES, CERTIFIERS, LOCATIONS };
