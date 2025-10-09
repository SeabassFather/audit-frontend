// Comprehensive crops taxonomy for agricultural search
export const cropsTaxonomy = {
  vegetables: {
    label: "Vegetables",
    items: [
      { value: "tomatoes", label: "Tomatoes", varieties: ["Roma", "Beefsteak", "Cherry", "Heirloom"] },
      { value: "peppers", label: "Peppers", varieties: ["Bell", "Jalapeño", "Serrano", "Habanero"] },
      { value: "cucumbers", label: "Cucumbers", varieties: ["English", "Persian", "Pickling"] },
      { value: "lettuce", label: "Lettuce", varieties: ["Romaine", "Iceberg", "Butter", "Red Leaf"] },
      { value: "broccoli", label: "Broccoli", varieties: ["Crown", "Bunched"] },
      { value: "cauliflower", label: "Cauliflower", varieties: ["White", "Purple", "Orange"] },
      { value: "onions", label: "Onions", varieties: ["Yellow", "Red", "White", "Sweet"] },
      { value: "carrots", label: "Carrots", varieties: ["Orange", "Purple", "Baby"] },
      { value: "squash", label: "Squash", varieties: ["Zucchini", "Yellow", "Butternut"] },
      { value: "eggplant", label: "Eggplant", varieties: ["Globe", "Italian", "Japanese"] }
    ]
  },
  fruits: {
    label: "Fruits",
    items: [
      { value: "avocados", label: "Avocados", varieties: ["Hass", "Fuerte", "Bacon", "Reed"] },
      { value: "berries", label: "Berries", varieties: ["Strawberries", "Blueberries", "Raspberries", "Blackberries"] },
      { value: "citrus", label: "Citrus", varieties: ["Oranges", "Lemons", "Limes", "Grapefruit"] },
      { value: "melons", label: "Melons", varieties: ["Watermelon", "Cantaloupe", "Honeydew"] },
      { value: "grapes", label: "Grapes", varieties: ["Red Globe", "Green Thompson", "Black"] },
      { value: "apples", label: "Apples", varieties: ["Gala", "Fuji", "Granny Smith", "Honeycrisp"] },
      { value: "stone-fruits", label: "Stone Fruits", varieties: ["Peaches", "Plums", "Nectarines", "Apricots"] },
      { value: "tropical", label: "Tropical", varieties: ["Mango", "Papaya", "Pineapple", "Dragon Fruit"] }
    ]
  },
  leafyGreens: {
    label: "Leafy Greens",
    items: [
      { value: "spinach", label: "Spinach", varieties: ["Baby", "Savoy", "Flat Leaf"] },
      { value: "kale", label: "Kale", varieties: ["Curly", "Lacinato", "Red Russian"] },
      { value: "arugula", label: "Arugula", varieties: ["Wild", "Standard"] },
      { value: "chard", label: "Chard", varieties: ["Rainbow", "Swiss"] },
      { value: "microgreens", label: "Microgreens", varieties: ["Mixed", "Sunflower", "Pea Shoots"] }
    ]
  },
  herbs: {
    label: "Herbs",
    items: [
      { value: "basil", label: "Basil", varieties: ["Sweet", "Thai", "Purple"] },
      { value: "cilantro", label: "Cilantro", varieties: ["Standard", "Santo"] },
      { value: "parsley", label: "Parsley", varieties: ["Curly", "Italian Flat"] },
      { value: "mint", label: "Mint", varieties: ["Spearmint", "Peppermint"] }
    ]
  },
  specialty: {
    label: "Specialty Crops",
    items: [
      { value: "mushrooms", label: "Mushrooms", varieties: ["Button", "Portobello", "Shiitake", "Oyster"] },
      { value: "asparagus", label: "Asparagus", varieties: ["Green", "White", "Purple"] },
      { value: "artichokes", label: "Artichokes", varieties: ["Globe", "Baby"] }
    ]
  }
};

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

export const regions = [
  { value: "california", label: "California", country: "USA" },
  { value: "florida", label: "Florida", country: "USA" },
  { value: "texas", label: "Texas", country: "USA" },
  { value: "arizona", label: "Arizona", country: "USA" },
  { value: "washington", label: "Washington", country: "USA" },
  { value: "oregon", label: "Oregon", country: "USA" },
  { value: "sinaloa", label: "Sinaloa", country: "Mexico" },
  { value: "sonora", label: "Sonora", country: "Mexico" },
  { value: "baja", label: "Baja California", country: "Mexico" },
  { value: "jalisco", label: "Jalisco", country: "Mexico" },
  { value: "michoacan", label: "Michoacán", country: "Mexico" },
  { value: "chihuahua", label: "Chihuahua", country: "Mexico" },
  { value: "guatemala", label: "Guatemala", country: "Guatemala" },
  { value: "chile", label: "Chile", country: "Chile" },
  { value: "peru", label: "Peru", country: "Peru" },
  { value: "ecuador", label: "Ecuador", country: "Ecuador" }
];

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
