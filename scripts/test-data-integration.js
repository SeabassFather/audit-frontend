#!/usr/bin/env node

/**
 * Data Integration Test Suite
 * 
 * Validates that all USDA grower data and Spartan services are correctly loaded
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Running Data Integration Tests');
console.log('='.repeat(60));
console.log();

let passed = 0;
let failed = 0;

// Test 1: USDA Growers JSON exists and is valid
try {
  const usdaPath = path.join(__dirname, '..', 'src', 'data', 'usda_growers.json');
  const usdaData = JSON.parse(fs.readFileSync(usdaPath, 'utf-8'));
  
  if (usdaData.length >= 100) {
    console.log('✅ Test 1: USDA growers JSON - PASSED');
    console.log(`   - Found ${usdaData.length} growers (expected 100+)`);
    passed++;
  } else {
    console.log('❌ Test 1: USDA growers JSON - FAILED');
    console.log(`   - Found ${usdaData.length} growers (expected 100+)`);
    failed++;
  }
} catch (error) {
  console.log('❌ Test 1: USDA growers JSON - FAILED');
  console.log(`   - Error: ${error.message}`);
  failed++;
}

// Test 2: USDA Growers have required fields
try {
  const usdaPath = path.join(__dirname, '..', 'src', 'data', 'usda_growers.json');
  const usdaData = JSON.parse(fs.readFileSync(usdaPath, 'utf-8'));
  
  const requiredFields = ['id', 'companyName', 'location', 'commodities', 'certifications', 'organic', 'usdaData'];
  const sampleGrower = usdaData[0];
  const missingFields = requiredFields.filter(field => !sampleGrower.hasOwnProperty(field));
  
  if (missingFields.length === 0) {
    console.log('✅ Test 2: USDA grower fields - PASSED');
    console.log(`   - All required fields present`);
    passed++;
  } else {
    console.log('❌ Test 2: USDA grower fields - FAILED');
    console.log(`   - Missing fields: ${missingFields.join(', ')}`);
    failed++;
  }
} catch (error) {
  console.log('❌ Test 2: USDA grower fields - FAILED');
  console.log(`   - Error: ${error.message}`);
  failed++;
}

// Test 3: Commodities count (100+)
try {
  const usdaPath = path.join(__dirname, '..', 'src', 'data', 'usda_growers.json');
  const usdaData = JSON.parse(fs.readFileSync(usdaPath, 'utf-8'));
  
  const commodities = new Set();
  usdaData.forEach(grower => {
    grower.commodities.forEach(c => commodities.add(c));
  });
  
  if (commodities.size >= 100) {
    console.log('✅ Test 3: Commodities count - PASSED');
    console.log(`   - Found ${commodities.size} unique commodities (expected 100+)`);
    passed++;
  } else {
    console.log('❌ Test 3: Commodities count - FAILED');
    console.log(`   - Found ${commodities.size} unique commodities (expected 100+)`);
    failed++;
  }
} catch (error) {
  console.log('❌ Test 3: Commodities count - FAILED');
  console.log(`   - Error: ${error.message}`);
  failed++;
}

// Test 4: Spartan Services JSON exists and is valid
try {
  const servicesPath = path.join(__dirname, '..', 'src', 'data', 'spartan_services.json');
  const servicesData = JSON.parse(fs.readFileSync(servicesPath, 'utf-8'));
  
  const categories = Object.keys(servicesData);
  if (categories.length >= 10) {
    console.log('✅ Test 4: Spartan services JSON - PASSED');
    console.log(`   - Found ${categories.length} categories (expected 10+)`);
    passed++;
  } else {
    console.log('❌ Test 4: Spartan services JSON - FAILED');
    console.log(`   - Found ${categories.length} categories (expected 10+)`);
    failed++;
  }
} catch (error) {
  console.log('❌ Test 4: Spartan services JSON - FAILED');
  console.log(`   - Error: ${error.message}`);
  failed++;
}

// Test 5: Spartan Services count (300+)
try {
  const servicesPath = path.join(__dirname, '..', 'src', 'data', 'spartan_services.json');
  const servicesData = JSON.parse(fs.readFileSync(servicesPath, 'utf-8'));
  
  const totalServices = Object.values(servicesData).reduce((total, services) => total + services.length, 0);
  
  if (totalServices >= 300) {
    console.log('✅ Test 5: Services count - PASSED');
    console.log(`   - Found ${totalServices} services (expected 300+)`);
    passed++;
  } else {
    console.log('❌ Test 5: Services count - FAILED');
    console.log(`   - Found ${totalServices} services (expected 300+)`);
    failed++;
  }
} catch (error) {
  console.log('❌ Test 5: Services count - FAILED');
  console.log(`   - Error: ${error.message}`);
  failed++;
}

// Test 6: growerDatabase.js exports correctly
try {
  // Check if the file has the correct export structure
  const dbPath = path.join(__dirname, '..', 'src', 'data', 'growerDatabase.js');
  const dbContent = fs.readFileSync(dbPath, 'utf-8');
  
  const hasExport = dbContent.includes('export const growerDatabase');
  const hasSearchFunction = dbContent.includes('export function searchGrowers');
  const hasFilterOptions = dbContent.includes('export function getFilterOptions');
  
  if (hasExport && hasSearchFunction && hasFilterOptions) {
    console.log('✅ Test 6: growerDatabase exports - PASSED');
    console.log(`   - All exports present`);
    passed++;
  } else {
    console.log('❌ Test 6: growerDatabase exports - FAILED');
    console.log(`   - Missing exports`);
    failed++;
  }
} catch (error) {
  console.log('❌ Test 6: growerDatabase exports - FAILED');
  console.log(`   - Error: ${error.message}`);
  failed++;
}

// Test 7: Data ingestion scripts exist
try {
  const scriptsDir = path.join(__dirname);
  const scripts = [
    'generate-usda-growers.js',
    'fetch-usda-organic-data.js',
    'fetch-usda-organic-data.py'
  ];
  
  const existingScripts = scripts.filter(script => 
    fs.existsSync(path.join(scriptsDir, script))
  );
  
  if (existingScripts.length === scripts.length) {
    console.log('✅ Test 7: Data ingestion scripts - PASSED');
    console.log(`   - All ${scripts.length} scripts present`);
    passed++;
  } else {
    console.log('❌ Test 7: Data ingestion scripts - FAILED');
    console.log(`   - Found ${existingScripts.length}/${scripts.length} scripts`);
    failed++;
  }
} catch (error) {
  console.log('❌ Test 7: Data ingestion scripts - FAILED');
  console.log(`   - Error: ${error.message}`);
  failed++;
}

// Test 8: README contains documentation
try {
  const readmePath = path.join(__dirname, '..', 'README.md');
  const readmeContent = fs.readFileSync(readmePath, 'utf-8');
  
  const hasUsdaSection = readmeContent.includes('USDA Grower Database Refresh');
  const hasSpartanSection = readmeContent.includes('Spartan 300+ Services Directory');
  const hasUISection = readmeContent.includes('Superman Theme') || readmeContent.includes('Superman-style');
  
  if (hasUsdaSection && hasSpartanSection && hasUISection) {
    console.log('✅ Test 8: README documentation - PASSED');
    console.log(`   - All sections present`);
    passed++;
  } else {
    console.log('❌ Test 8: README documentation - FAILED');
    console.log(`   - Missing sections`);
    failed++;
  }
} catch (error) {
  console.log('❌ Test 8: README documentation - FAILED');
  console.log(`   - Error: ${error.message}`);
  failed++;
}

// Summary
console.log();
console.log('='.repeat(60));
console.log('📊 Test Summary:');
console.log(`   ✅ Passed: ${passed}`);
console.log(`   ❌ Failed: ${failed}`);
console.log(`   📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);
console.log();

if (failed === 0) {
  console.log('🎉 All tests passed! Data integration is complete.');
  process.exit(0);
} else {
  console.log('⚠️  Some tests failed. Please review the errors above.');
  process.exit(1);
}
