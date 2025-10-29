// ====================================
// ENGINE PERFORMANCE TEST CATALOG
// Diagnostic & Efficiency Analysis
// Author: SeabassFather (SG)
// Date: 2025-10-27 22:21:52 UTC
// ====================================

export const engineTestCatalog = [
  // FUEL EFFICIENCY
  { id: 'eng-btu-efficiency', name: 'BTU Efficiency Analysis', category: 'Fuel Efficiency', price: 85, popular: true, description: 'Measures heat energy conversion efficiency', parameters: ['BTU Output', 'Fuel Input', 'Efficiency %'], tags: ['efficiency', 'BTU', 'performance'] },
  { id: 'eng-fuel-burn-rate', name: 'Fuel Burn Rate', category: 'Fuel Efficiency', price: 65, popular: true, description: 'Gallons per hour consumption analysis', parameters: ['Fuel Consumption', 'GPH', 'Hours Operated'], tags: ['fuel', 'consumption', 'cost'] },
  { id: 'eng-cost-per-hour', name: 'Cost Per Operating Hour', category: 'Fuel Efficiency', price: 45, description: 'Calculate hourly operational costs', parameters: ['Fuel Cost', 'Operating Hours', '$/hr'], tags: ['cost', 'economics'] },
  { id: 'eng-mpg-efficiency', name: 'Miles Per Gallon (MPG)', category: 'Fuel Efficiency', price: 55, description: 'Fuel economy for mobile equipment', parameters: ['Distance', 'Fuel Used', 'MPG'], tags: ['fuel economy', 'mobile'] },
  
  // OIL ANALYSIS
  { id: 'eng-oil-degradation', name: 'Oil Degradation Analysis', category: 'Oil Analysis', price: 95, popular: true, description: 'Assess oil quality and remaining life', parameters: ['Viscosity', 'TBN', 'Oxidation', 'Nitration'], tags: ['oil', 'condition', 'maintenance'] },
  { id: 'eng-oil-viscosity', name: 'Oil Viscosity Test', category: 'Oil Analysis', price: 55, description: 'Measure oil thickness at operating temp', parameters: ['Viscosity', 'Temperature'], tags: ['oil', 'viscosity'] },
  { id: 'eng-oil-contaminants', name: 'Oil Contamination Panel', category: 'Oil Analysis', price: 125, popular: true, description: 'Detect fuel, coolant, dirt in oil', parameters: ['Fuel Dilution', 'Coolant', 'Dirt', 'Water'], tags: ['contamination', 'oil', 'diagnosis'] },
  { id: 'eng-oil-metals', name: 'Wear Metals Analysis', category: 'Oil Analysis', price: 135, popular: true, description: 'Detect engine wear from metal particles', parameters: ['Iron', 'Copper', 'Lead', 'Aluminum', 'Chrome'], tags: ['wear', 'metals', 'predictive'] },
  { id: 'eng-oil-tbn', name: 'Total Base Number (TBN)', category: 'Oil Analysis', price: 65, description: 'Remaining alkalinity reserve in oil', parameters: ['TBN'], tags: ['oil', 'acidity', 'life'] },
  { id: 'eng-oil-tan', name: 'Total Acid Number (TAN)', category: 'Oil Analysis', price: 65, description: 'Oil oxidation and acidity level', parameters: ['TAN'], tags: ['oil', 'oxidation'] },
  
  // PERFORMANCE DIAGNOSTICS
  { id: 'eng-compression', name: 'Compression Test', category: 'Performance', price: 75, description: 'Cylinder compression measurement', parameters: ['Compression PSI', 'Cylinders'], tags: ['cylinder', 'power', 'diagnosis'] },
  { id: 'eng-power-output', name: 'Power Output Test', category: 'Performance', price: 125, description: 'Dyno test for horsepower/torque', parameters: ['HP', 'Torque', 'RPM'], tags: ['power', 'dyno', 'performance'] },
  { id: 'eng-rpm-analysis', name: 'RPM Performance Analysis', category: 'Performance', price: 85, description: 'Engine speed under load testing', parameters: ['RPM', 'Load', 'Throttle'], tags: ['RPM', 'speed'] },
  { id: 'eng-temperature', name: 'Operating Temperature Analysis', category: 'Performance', price: 55, description: 'Monitor engine heat levels', parameters: ['Coolant Temp', 'Oil Temp'], tags: ['temperature', 'cooling'] },
  { id: 'eng-emissions', name: 'Emissions Test', category: 'Performance', price: 95, description: 'Exhaust gas analysis (CO, HC, NOx)', parameters: ['CO', 'HC', 'NOx', 'O2'], tags: ['emissions', 'environmental', 'compliance'] },
  
  // MAINTENANCE PREDICTION
  { id: 'eng-oil-change-prediction', name: 'Oil Change Interval Prediction', category: 'Maintenance', price: 75, popular: true, description: 'Predict next oil change based on condition', parameters: ['Current Hours', 'Oil Condition', 'Predicted Hours'], tags: ['maintenance', 'prediction', 'oil'] },
  { id: 'eng-filter-analysis', name: 'Filter Condition Analysis', category: 'Maintenance', price: 65, description: 'Air/oil/fuel filter efficiency check', parameters: ['Restriction', 'Efficiency'], tags: ['filter', 'maintenance'] },
  { id: 'eng-belt-tension', name: 'Belt Tension & Wear', category: 'Maintenance', price: 45, description: 'Drive belt condition assessment', parameters: ['Tension', 'Wear', 'Cracks'], tags: ['belts', 'maintenance'] },
  { id: 'eng-coolant-analysis', name: 'Coolant Condition Test', category: 'Maintenance', price: 85, description: 'pH, inhibitors, contamination in coolant', parameters: ['pH', 'Inhibitors', 'Freeze Point'], tags: ['coolant', 'corrosion'] },
  
  // SAVINGS ANALYSIS
  { id: 'eng-fuel-optimization', name: 'Fuel Optimization Report', category: 'Savings', price: 125, popular: true, description: 'Calculate potential fuel cost savings', parameters: ['Current Consumption', 'Optimized Rate', 'Annual Savings'], tags: ['savings', 'fuel', 'optimization'] },
  { id: 'eng-maintenance-prevention', name: 'Maintenance Cost Prevention', category: 'Savings', price: 95, description: 'Estimate avoided repair costs', parameters: ['Potential Failures', 'Prevention Cost', 'Savings'], tags: ['savings', 'prevention'] },
  { id: 'eng-lifespan-extension', name: 'Equipment Lifespan Extension', category: 'Savings', price: 85, description: 'Calculate extended equipment life value', parameters: ['Current Life', 'Extended Life', 'Value'], tags: ['savings', 'lifespan'] },
  
  // PACKAGES
  { id: 'eng-pkg-basic', name: 'Basic Engine Check', category: 'Packages', price: 185, popular: true, description: 'BTU efficiency, fuel burn rate, oil degradation', parameters: ['BTU', 'Fuel Rate', 'Oil Condition'], tags: ['package', 'basic'] },
  { id: 'eng-pkg-oil-complete', name: 'Complete Oil Analysis', category: 'Packages', price: 325, popular: true, description: 'All oil tests: degradation, contaminants, metals, TBN, TAN, viscosity', parameters: ['Oil Tests'], tags: ['package', 'oil', 'complete'] },
  { id: 'eng-pkg-performance', name: 'Performance Diagnostic Package', category: 'Packages', price: 375, description: 'Compression, power output, RPM, temperature, emissions', parameters: ['Performance Tests'], tags: ['package', 'diagnostic'] },
  { id: 'eng-pkg-maintenance', name: 'Predictive Maintenance Package', category: 'Packages', price: 295, popular: true, description: 'Oil life, filter analysis, coolant, belt check, predictions', parameters: ['Maintenance Tests'], tags: ['package', 'predictive'] },
  { id: 'eng-pkg-savings', name: 'Cost Savings Analysis Package', category: 'Packages', price: 285, description: 'Fuel optimization, maintenance prevention, lifespan extension', parameters: ['Savings Projections'], tags: ['package', 'savings', 'ROI'] },
  { id: 'eng-pkg-complete', name: 'Complete Engine Analysis', category: 'Packages', price: 695, popular: true, description: 'Every test: efficiency, oil, performance, maintenance, savings (SG Complete)', parameters: ['All Engine Tests'], tags: ['package', 'complete', 'comprehensive', 'SG'] }
];