// Import comprehensive USDA commodity data
import { usdaCommodities, packagingTypes, handlingMethods } from './usdaCommodities';

// Generate cropsTaxonomy from USDA commodities
export const cropsTaxonomy = (() => {
  const taxonomy = {};
  
  // Group commodities by category
  usdaCommodities.forEach(commodity => {
    const category = commodity.category;
    
    if (!taxonomy[category]) {
      taxonomy[category] = {
        label: category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' '),
        items: []
      };
    }
    
    taxonomy[category].items.push({
      value: commodity.id,
      label: commodity.name,
      varieties: commodity.varieties,
      packaging: commodity.packaging,
      sizes: commodity.sizes,
      handling: commodity.handling
    });
  });
  
  // Sort items alphabetically within each category
  Object.keys(taxonomy).forEach(category => {
    taxonomy[category].items.sort((a, b) => a.label.localeCompare(b.label));
  });
  
  return taxonomy;
})();

// Export packaging and handling options
export { packagingTypes, handlingMethods };

export const certificationTypes = [
  { value: "usda-organic", label: "USDA Organic", icon: "🌿", color: "green" },
  { value: "globalgap", label: "GlobalG.A.P.", icon: "🌍", color: "blue" },
  { value: "primusgfs", label: "PrimusGFS", icon: "✓", color: "purple" },
  { value: "sqf", label: "SQF (Safe Quality Food)", icon: "🛡️", color: "red" },
  { value: "brc", label: "BRC Global Standards", icon: "⭐", color: "orange" },
  { value: "fsma", label: "FSMA Compliant", icon: "📋", color: "indigo" },
  { value: "haccp", label: "HACCP", icon: "🔬", color: "teal" },
  { value: "senasica", label: "SENASICA (Mexico)", icon: "🇲🇽", color: "green" },
  { value: "gfsi", label: "GFSI Recognized", icon: "🏆", color: "yellow" },
  { value: "fair-trade", label: "Fair Trade", icon: "🤝", color: "brown" },
  { value: "rainforest", label: "Rainforest Alliance", icon: "🌳", color: "green" },
  { value: "non-gmo", label: "Non-GMO Project", icon: "🧬", color: "orange" }
];

// Import comprehensive USDA regions data
import { getFormattedRegions } from './usdaRegions';

// Export regions from USDA data
export const regions = getFormattedRegions();

export const foodSafetyBadges = [
  { type: "traceability", label: "Full Traceability", icon: "🔍" },
  { type: "cold-chain", label: "Cold Chain Certified", icon: "❄️" },
  { type: "recall-ready", label: "Recall Plan Ready", icon: "🚨" },
  { type: "food-defense", label: "Food Defense Plan", icon: "🛡️" },
  { type: "water-tested", label: "Water Testing Current", icon: "💧" },
  { type: "soil-tested", label: "Soil Testing Current", icon: "🌱" },
  { type: "gmp", label: "GMP Certified", icon: "⚙️" },
  { type: "supplier-approved", label: "Supplier Approved", icon: "✅" }
];
