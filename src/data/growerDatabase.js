// Mock grower database - 100+ certified produce growers/exporters/importers
export const growerDatabase = [
  // California Growers
  {
    id: "GRW001",
    type: "grower",
    companyName: "Salinas Valley Fresh Farms",
    dba: "SV Fresh",
    location: { region: "california", city: "Salinas", country: "USA", coordinates: { lat: 36.6777, lng: -121.6555 } },
    commodities: ["lettuce", "broccoli", "cauliflower", "spinach"],
    certifications: ["usda-organic", "globalgap", "primusgfs", "fsma"],
    foodSafetyBadges: ["traceability", "cold-chain", "water-tested", "soil-tested"],
    organic: true,
    volume: { weekly: "100,000 lbs", annual: "5M lbs" },
    capacity: "high",
    contact: {
      name: "Maria Rodriguez",
      phone: "+1-831-555-0101",
      email: "maria@svfresh.com",
      whatsapp: "+1-831-555-0101"
    },
    established: 1998,
    employees: 250,
    riskScore: 95,
    rating: 4.8,
    reviewCount: 142,
    bio: "Leading organic leafy greens producer in Salinas Valley with state-of-the-art food safety systems.",
    documents: ["USDA Organic Cert", "GlobalGAP Audit", "Water Test Results", "Insurance Docs"],
    deals: 89,
    onTimeDelivery: 98,
    crm: { salesforce: "SF001234", hubspot: null }
  },
  {
    id: "GRW002",
    type: "grower",
    companyName: "Coastal Berries Inc.",
    dba: "Coastal Berries",
    location: { region: "california", city: "Watsonville", country: "USA", coordinates: { lat: 36.9101, lng: -121.7568 } },
    commodities: ["berries"],
    certifications: ["usda-organic", "primusgfs", "sqf", "non-gmo"],
    foodSafetyBadges: ["traceability", "cold-chain", "recall-ready", "gmp"],
    organic: true,
    volume: { weekly: "50,000 lbs", annual: "2.5M lbs" },
    capacity: "high",
    contact: {
      name: "David Chen",
      phone: "+1-831-555-0202",
      email: "david@coastalberries.com",
      whatsapp: "+1-831-555-0202"
    },
    established: 2005,
    employees: 180,
    riskScore: 92,
    rating: 4.9,
    reviewCount: 218,
    bio: "Premium organic berry producer specializing in strawberries, blueberries, and raspberries.",
    documents: ["USDA Organic Cert", "PrimusGFS Audit", "SQF Cert", "Lab Reports"],
    deals: 156,
    onTimeDelivery: 97,
    crm: { salesforce: null, hubspot: "HUB5678" }
  },
  {
    id: "GRW003",
    type: "exporter",
    companyName: "West Coast Avocados LLC",
    dba: "WC Avocados",
    location: { region: "california", city: "Escondido", country: "USA", coordinates: { lat: 33.1192, lng: -117.0864 } },
    commodities: ["avocados"],
    certifications: ["globalgap", "primusgfs", "fsma", "gfsi"],
    foodSafetyBadges: ["traceability", "cold-chain", "food-defense", "supplier-approved"],
    organic: false,
    volume: { weekly: "200,000 lbs", annual: "10M lbs" },
    capacity: "very-high",
    contact: {
      name: "Robert Johnson",
      phone: "+1-760-555-0303",
      email: "robert@wcavocados.com",
      whatsapp: "+1-760-555-0303"
    },
    established: 1995,
    employees: 320,
    riskScore: 96,
    rating: 4.7,
    reviewCount: 198,
    bio: "Major Hass avocado exporter with year-round supply capabilities.",
    documents: ["GlobalGAP Cert", "PrimusGFS Audit", "Traceability Plan", "Food Defense Plan"],
    deals: 267,
    onTimeDelivery: 99,
    crm: { salesforce: "SF009876", hubspot: "HUB2345" }
  },
  
  // Florida Growers
  {
    id: "GRW004",
    type: "grower",
    companyName: "Sunshine Citrus Groves",
    dba: "Sunshine Citrus",
    location: { region: "florida", city: "Lake Wales", country: "USA", coordinates: { lat: 27.9014, lng: -81.5859 } },
    commodities: ["citrus"],
    certifications: ["globalgap", "primusgfs", "fsma"],
    foodSafetyBadges: ["traceability", "water-tested", "supplier-approved"],
    organic: false,
    volume: { weekly: "500,000 lbs", annual: "25M lbs" },
    capacity: "very-high",
    contact: {
      name: "Patricia Martinez",
      phone: "+1-863-555-0404",
      email: "patricia@sunshinecitrus.com",
      whatsapp: "+1-863-555-0404"
    },
    established: 1982,
    employees: 450,
    riskScore: 94,
    rating: 4.6,
    reviewCount: 176,
    bio: "Third-generation family citrus operation with 5,000 acres under cultivation.",
    documents: ["GlobalGAP Cert", "PrimusGFS Audit", "Pest Management Plan"],
    deals: 312,
    onTimeDelivery: 96,
    crm: { salesforce: "SF123456", hubspot: null }
  },
  {
    id: "GRW005",
    type: "grower",
    companyName: "Florida Fresh Tomatoes",
    dba: "FL Fresh",
    location: { region: "florida", city: "Immokalee", country: "USA", coordinates: { lat: 26.4187, lng: -81.4176 } },
    commodities: ["tomatoes", "peppers"],
    certifications: ["primusgfs", "sqf", "fsma", "haccp"],
    foodSafetyBadges: ["traceability", "cold-chain", "recall-ready", "gmp"],
    organic: false,
    volume: { weekly: "300,000 lbs", annual: "15M lbs" },
    capacity: "high",
    contact: {
      name: "James Wilson",
      phone: "+1-239-555-0505",
      email: "james@flfresh.com",
      whatsapp: "+1-239-555-0505"
    },
    established: 2001,
    employees: 280,
    riskScore: 91,
    rating: 4.5,
    reviewCount: 134,
    bio: "Leading Florida tomato grower with advanced greenhouse technology.",
    documents: ["PrimusGFS Audit", "SQF Cert", "HACCP Plan", "Insurance Docs"],
    deals: 203,
    onTimeDelivery: 95,
    crm: { salesforce: null, hubspot: "HUB7890" }
  },
  
  // Mexico - Sinaloa
  {
    id: "GRW006",
    type: "exporter",
    companyName: "Productores Unidos de Sinaloa",
    dba: "ProSinaloa",
    location: { region: "sinaloa", city: "Culiacán", country: "Mexico", coordinates: { lat: 24.8091, lng: -107.3940 } },
    commodities: ["tomatoes", "peppers", "cucumbers", "squash"],
    certifications: ["globalgap", "primusgfs", "senasica", "fsma"],
    foodSafetyBadges: ["traceability", "cold-chain", "water-tested", "soil-tested"],
    organic: false,
    volume: { weekly: "400,000 lbs", annual: "20M lbs" },
    capacity: "very-high",
    contact: {
      name: "Carlos Hernandez",
      phone: "+52-667-555-0606",
      email: "carlos@prosinaloa.mx",
      whatsapp: "+52-667-555-0606"
    },
    established: 1990,
    employees: 520,
    riskScore: 93,
    rating: 4.8,
    reviewCount: 245,
    bio: "Premier Mexican vegetable exporter with USDA-approved facilities and full traceability.",
    documents: ["GlobalGAP Cert", "SENASICA Permit", "PrimusGFS Audit", "Export License"],
    deals: 398,
    onTimeDelivery: 97,
    crm: { salesforce: "SF234567", hubspot: "HUB3456" }
  },
  {
    id: "GRW007",
    type: "grower",
    companyName: "Organicos del Norte",
    dba: "Organi-Norte",
    location: { region: "sinaloa", city: "Los Mochis", country: "Mexico", coordinates: { lat: 25.7933, lng: -108.9864 } },
    commodities: ["tomatoes", "peppers", "squash"],
    certifications: ["usda-organic", "globalgap", "senasica", "fair-trade"],
    foodSafetyBadges: ["traceability", "water-tested", "soil-tested", "supplier-approved"],
    organic: true,
    volume: { weekly: "150,000 lbs", annual: "7.5M lbs" },
    capacity: "medium",
    contact: {
      name: "Ana Garcia",
      phone: "+52-668-555-0707",
      email: "ana@organinorte.mx",
      whatsapp: "+52-668-555-0707"
    },
    established: 2008,
    employees: 190,
    riskScore: 90,
    rating: 4.9,
    reviewCount: 167,
    bio: "Certified organic vegetable producer with Fair Trade certification.",
    documents: ["USDA Organic Cert", "Fair Trade Cert", "GlobalGAP Cert", "SENASICA Docs"],
    deals: 178,
    onTimeDelivery: 96,
    grm: { salesforce: null, hubspot: "HUB8901" }
  },
  
  // Mexico - Sonora
  {
    id: "GRW008",
    type: "grower",
    companyName: "Sonora Fresh Produce",
    dba: "Sonora Fresh",
    location: { region: "sonora", city: "Hermosillo", country: "Mexico", coordinates: { lat: 29.0729, lng: -110.9559 } },
    commodities: ["grapes", "citrus", "melons"],
    certifications: ["globalgap", "primusgfs", "senasica"],
    foodSafetyBadges: ["traceability", "cold-chain", "food-defense"],
    organic: false,
    volume: { weekly: "250,000 lbs", annual: "12M lbs" },
    capacity: "high",
    contact: {
      name: "Miguel Ortiz",
      phone: "+52-662-555-0808",
      email: "miguel@sonorafresh.mx",
      whatsapp: "+52-662-555-0808"
    },
    established: 1997,
    employees: 310,
    riskScore: 92,
    rating: 4.7,
    reviewCount: 189,
    bio: "Top Sonoran table grape and citrus producer with modern packing facilities.",
    documents: ["GlobalGAP Cert", "PrimusGFS Audit", "SENASICA Export Permit"],
    deals: 256,
    onTimeDelivery: 98,
    crm: { salesforce: "SF345678", hubspot: null }
  },
  
  // Mexico - Michoacán
  {
    id: "GRW009",
    type: "exporter",
    companyName: "Aguacates Premium de Michoacán",
    dba: "Premium Avocados MX",
    location: { region: "michoacan", city: "Uruapan", country: "Mexico", coordinates: { lat: 19.4203, lng: -102.0631 } },
    commodities: ["avocados"],
    certifications: ["globalgap", "primusgfs", "senasica", "rainforest"],
    foodSafetyBadges: ["traceability", "cold-chain", "supplier-approved", "gmp"],
    organic: false,
    volume: { weekly: "600,000 lbs", annual: "30M lbs" },
    capacity: "very-high",
    contact: {
      name: "Fernando Lopez",
      phone: "+52-452-555-0909",
      email: "fernando@premiumavo.mx",
      whatsapp: "+52-452-555-0909"
    },
    established: 1985,
    employees: 680,
    riskScore: 97,
    rating: 4.9,
    reviewCount: 312,
    bio: "Largest Hass avocado exporter in Michoacán with USDA-approved orchards.",
    documents: ["GlobalGAP Cert", "SENASICA Cert", "Rainforest Alliance", "Export License"],
    deals: 456,
    onTimeDelivery: 99,
    crm: { salesforce: "SF456789", hubspot: "HUB4567" }
  },
  
  // Mexico - Jalisco
  {
    id: "GRW010",
    type: "grower",
    companyName: "Berries de Jalisco",
    dba: "Jalisco Berries",
    location: { region: "jalisco", city: "Guadalajara", country: "Mexico", coordinates: { lat: 20.6597, lng: -103.3496 } },
    commodities: ["berries"],
    certifications: ["usda-organic", "globalgap", "primusgfs", "senasica"],
    foodSafetyBadges: ["traceability", "cold-chain", "water-tested", "recall-ready"],
    organic: true,
    volume: { weekly: "80,000 lbs", annual: "4M lbs" },
    capacity: "medium",
    contact: {
      name: "Rosa Ramirez",
      phone: "+52-33-555-1010",
      email: "rosa@jaliscoberries.mx",
      whatsapp: "+52-33-555-1010"
    },
    established: 2010,
    employees: 145,
    riskScore: 89,
    rating: 4.6,
    reviewCount: 98,
    bio: "Organic berry specialist with hydroponic growing systems.",
    documents: ["USDA Organic Cert", "GlobalGAP Cert", "PrimusGFS Audit", "Water Tests"],
    deals: 124,
    onTimeDelivery: 94,
    crm: { salesforce: null, hubspot: "HUB5678" }
  },
  
  // Additional US Growers
  {
    id: "GRW011",
    type: "grower",
    companyName: "Pacific Northwest Apples",
    dba: "PNW Apples",
    location: { region: "washington", city: "Wenatchee", country: "USA", coordinates: { lat: 47.4235, lng: -120.3103 } },
    commodities: ["apples", "stone-fruits"],
    certifications: ["globalgap", "primusgfs", "fsma"],
    foodSafetyBadges: ["traceability", "cold-chain", "supplier-approved"],
    organic: false,
    volume: { weekly: "1,000,000 lbs", annual: "50M lbs" },
    capacity: "very-high",
    contact: {
      name: "Sarah Thompson",
      phone: "+1-509-555-1111",
      email: "sarah@pnwapples.com",
      whatsapp: "+1-509-555-1111"
    },
    established: 1976,
    employees: 550,
    riskScore: 95,
    rating: 4.8,
    reviewCount: 267,
    bio: "Leading Washington apple producer with controlled atmosphere storage.",
    documents: ["GlobalGAP Cert", "PrimusGFS Audit", "Storage Facility Cert"],
    deals: 389,
    onTimeDelivery: 98,
    crm: { salesforce: "SF567890", hubspot: null }
  },
  {
    id: "GRW012",
    type: "grower",
    companyName: "Arizona Desert Greens",
    dba: "AZ Desert Greens",
    location: { region: "arizona", city: "Yuma", country: "USA", coordinates: { lat: 32.6927, lng: -114.6277 } },
    commodities: ["lettuce", "broccoli", "cauliflower"],
    certifications: ["primusgfs", "sqf", "fsma", "haccp"],
    foodSafetyBadges: ["traceability", "water-tested", "soil-tested", "gmp"],
    organic: false,
    volume: { weekly: "350,000 lbs", annual: "18M lbs" },
    capacity: "high",
    contact: {
      name: "John Martinez",
      phone: "+1-928-555-1212",
      email: "john@azdesertgreens.com",
      whatsapp: "+1-928-555-1212"
    },
    established: 2003,
    employees: 290,
    riskScore: 93,
    rating: 4.7,
    reviewCount: 145,
    bio: "Year-round leafy greens production in Yuma growing region.",
    documents: ["PrimusGFS Audit", "SQF Cert", "Water Quality Tests"],
    deals: 234,
    onTimeDelivery: 97,
    crm: { salesforce: "SF678901", hubspot: "HUB6789" }
  },
  
  // Import/Export Companies
  {
    id: "GRW013",
    type: "importer",
    companyName: "Global Produce Imports USA",
    dba: "GPI USA",
    location: { region: "texas", city: "McAllen", country: "USA", coordinates: { lat: 26.2034, lng: -98.2300 } },
    commodities: ["tomatoes", "peppers", "avocados", "berries"],
    certifications: ["fsma", "haccp", "gfsi"],
    foodSafetyBadges: ["traceability", "cold-chain", "recall-ready", "supplier-approved"],
    organic: false,
    volume: { weekly: "800,000 lbs", annual: "40M lbs" },
    capacity: "very-high",
    contact: {
      name: "Michael Chen",
      phone: "+1-956-555-1313",
      email: "michael@gpiusa.com",
      whatsapp: "+1-956-555-1313"
    },
    established: 1992,
    employees: 420,
    riskScore: 94,
    rating: 4.8,
    reviewCount: 298,
    bio: "Major fresh produce importer with distribution centers across the US.",
    documents: ["FSMA Cert", "HACCP Plan", "Supplier Audit Program", "Insurance"],
    deals: 567,
    onTimeDelivery: 98,
    crm: { salesforce: "SF789012", hubspot: "HUB7890" }
  },
  {
    id: "GRW014",
    type: "importer",
    companyName: "Fresh Americas Trading",
    dba: "Fresh Americas",
    location: { region: "california", city: "Nogales", country: "USA", coordinates: { lat: 31.3405, lng: -110.9343 } },
    commodities: ["tomatoes", "peppers", "cucumbers", "squash", "melons"],
    certifications: ["fsma", "primusgfs", "haccp"],
    foodSafetyBadges: ["traceability", "cold-chain", "food-defense", "supplier-approved"],
    organic: false,
    volume: { weekly: "1,200,000 lbs", annual: "60M lbs" },
    capacity: "very-high",
    contact: {
      name: "Laura Sanchez",
      phone: "+1-520-555-1414",
      email: "laura@freshamericas.com",
      whatsapp: "+1-520-555-1414"
    },
    established: 1988,
    employees: 580,
    riskScore: 96,
    rating: 4.9,
    reviewCount: 412,
    bio: "Leading Nogales-based importer specializing in Mexican produce.",
    documents: ["FSMA Cert", "PrimusGFS Supplier Audits", "Import License"],
    deals: 678,
    onTimeDelivery: 99,
    crm: { salesforce: "SF890123", hubspot: "HUB8901" }
  },
  
  // Central/South American Exporters
  {
    id: "GRW015",
    type: "exporter",
    companyName: "Guatemala Tropical Exports",
    dba: "GT Tropical",
    location: { region: "guatemala", city: "Guatemala City", country: "Guatemala", coordinates: { lat: 14.6349, lng: -90.5069 } },
    commodities: ["tropical"],
    certifications: ["globalgap", "rainforest", "fair-trade"],
    foodSafetyBadges: ["traceability", "supplier-approved"],
    organic: true,
    volume: { weekly: "100,000 lbs", annual: "5M lbs" },
    capacity: "medium",
    contact: {
      name: "Diego Morales",
      phone: "+502-2555-1515",
      email: "diego@gttropical.com",
      whatsapp: "+502-2555-1515"
    },
    established: 2005,
    employees: 210,
    riskScore: 88,
    rating: 4.5,
    reviewCount: 87,
    bio: "Sustainable tropical fruit exporter with Rainforest Alliance certification.",
    documents: ["GlobalGAP Cert", "Rainforest Alliance", "Export License"],
    deals: 145,
    onTimeDelivery: 93,
    crm: { salesforce: null, hubspot: "HUB9012" }
  },
  {
    id: "GRW016",
    type: "exporter",
    companyName: "Chilean Fresh Exports SA",
    dba: "Chile Fresh",
    location: { region: "chile", city: "Santiago", country: "Chile", coordinates: { lat: -33.4489, lng: -70.6693 } },
    commodities: ["grapes", "stone-fruits", "berries"],
    certifications: ["globalgap", "primusgfs", "brc"],
    foodSafetyBadges: ["traceability", "cold-chain", "supplier-approved"],
    organic: false,
    volume: { weekly: "400,000 lbs", annual: "20M lbs" },
    capacity: "very-high",
    contact: {
      name: "Alejandro Silva",
      phone: "+56-2-555-1616",
      email: "alejandro@chilefresh.cl",
      whatsapp: "+56-2-555-1616"
    },
    established: 1995,
    employees: 380,
    riskScore: 93,
    rating: 4.7,
    reviewCount: 201,
    bio: "Counter-season fruit exporter serving North American markets.",
    documents: ["GlobalGAP Cert", "BRC Cert", "Phytosanitary Docs"],
    deals: 289,
    onTimeDelivery: 96,
    crm: { salesforce: "SF901234", hubspot: null }
  },
  {
    id: "GRW017",
    type: "exporter",
    companyName: "Peruvian Asparagus Growers",
    dba: "Peru Asparagus",
    location: { region: "peru", city: "Lima", country: "Peru", coordinates: { lat: -12.0464, lng: -77.0428 } },
    commodities: ["asparagus", "avocados", "grapes"],
    certifications: ["globalgap", "primusgfs", "brc", "rainforest"],
    foodSafetyBadges: ["traceability", "cold-chain", "supplier-approved"],
    organic: true,
    volume: { weekly: "200,000 lbs", annual: "10M lbs" },
    capacity: "high",
    contact: {
      name: "Carmen Diaz",
      phone: "+51-1-555-1717",
      email: "carmen@peruasparagus.pe",
      whatsapp: "+51-1-555-1717"
    },
    established: 2000,
    employees: 320,
    riskScore: 91,
    rating: 4.6,
    reviewCount: 167,
    bio: "Leading Peruvian asparagus and avocado exporter with organic certification.",
    documents: ["GlobalGAP Cert", "Organic Cert", "BRC Audit"],
    deals: 223,
    onTimeDelivery: 95,
    crm: { salesforce: null, hubspot: "HUB0123" }
  },
  {
    id: "GRW018",
    type: "exporter",
    companyName: "Ecuador Banana Corporation",
    dba: "Ecuador Bananas",
    location: { region: "ecuador", city: "Guayaquil", country: "Ecuador", coordinates: { lat: -2.1709, lng: -79.9224 } },
    commodities: ["tropical"],
    certifications: ["globalgap", "rainforest", "fair-trade"],
    foodSafetyBadges: ["traceability", "supplier-approved"],
    organic: true,
    volume: { weekly: "500,000 lbs", annual: "25M lbs" },
    capacity: "very-high",
    contact: {
      name: "Roberto Vargas",
      phone: "+593-4-555-1818",
      email: "roberto@ecuadorbananas.ec",
      whatsapp: "+593-4-555-1818"
    },
    established: 1978,
    employees: 890,
    riskScore: 92,
    rating: 4.8,
    reviewCount: 345,
    bio: "Major organic banana and tropical fruit exporter with Fair Trade certification.",
    documents: ["Rainforest Alliance", "Fair Trade Cert", "Export License"],
    deals: 498,
    onTimeDelivery: 97,
    crm: { salesforce: "SF012345", hubspot: "HUB1234" }
  },
  
  // More US Growers (Specialty/Organic)
  {
    id: "GRW019",
    type: "grower",
    companyName: "Oregon Organic Farms",
    dba: "OR Organic",
    location: { region: "oregon", city: "Portland", country: "USA", coordinates: { lat: 45.5152, lng: -122.6784 } },
    commodities: ["berries", "leafyGreens", "herbs"],
    certifications: ["usda-organic", "globalgap", "non-gmo"],
    foodSafetyBadges: ["traceability", "water-tested", "soil-tested"],
    organic: true,
    volume: { weekly: "40,000 lbs", annual: "2M lbs" },
    capacity: "medium",
    contact: {
      name: "Emily Green",
      phone: "+1-503-555-1919",
      email: "emily@ororganic.com",
      whatsapp: "+1-503-555-1919"
    },
    established: 2012,
    employees: 95,
    riskScore: 87,
    rating: 4.9,
    reviewCount: 78,
    bio: "Family-owned organic farm focusing on sustainable practices and local distribution.",
    documents: ["USDA Organic Cert", "Non-GMO Cert", "Soil Test Results"],
    deals: 89,
    onTimeDelivery: 94,
    crm: { salesforce: null, hubspot: "HUB2345" }
  },
  {
    id: "GRW020",
    type: "grower",
    companyName: "Texas Hill Country Farms",
    dba: "TX Hill Farms",
    location: { region: "texas", city: "Austin", country: "USA", coordinates: { lat: 30.2672, lng: -97.7431 } },
    commodities: ["herbs", "microgreens", "leafyGreens"],
    certifications: ["usda-organic", "fsma", "non-gmo"],
    foodSafetyBadges: ["traceability", "water-tested", "gmp"],
    organic: true,
    volume: { weekly: "15,000 lbs", annual: "750K lbs" },
    capacity: "small",
    contact: {
      name: "William Davis",
      phone: "+1-512-555-2020",
      email: "william@txhillfarms.com",
      whatsapp: "+1-512-555-2020"
    },
    established: 2015,
    employees: 42,
    riskScore: 85,
    rating: 4.7,
    reviewCount: 56,
    bio: "Boutique organic herb and microgreen producer serving Austin restaurants.",
    documents: ["USDA Organic Cert", "Water Quality Tests", "FSMA Plan"],
    deals: 67,
    onTimeDelivery: 92,
    crm: { salesforce: null, hubspot: "HUB3456" }
  },
  
  // More Mexico Growers
  {
    id: "GRW021",
    type: "grower",
    companyName: "Baja Fresh Vegetables",
    dba: "Baja Fresh",
    location: { region: "baja", city: "Ensenada", country: "Mexico", coordinates: { lat: 31.8670, lng: -116.5952 } },
    commodities: ["tomatoes", "cucumbers", "peppers"],
    certifications: ["globalgap", "primusgfs", "senasica"],
    foodSafetyBadges: ["traceability", "cold-chain", "water-tested"],
    organic: false,
    volume: { weekly: "180,000 lbs", annual: "9M lbs" },
    capacity: "high",
    contact: {
      name: "Gabriel Reyes",
      phone: "+52-646-555-2121",
      email: "gabriel@bajafresh.mx",
      whatsapp: "+52-646-555-2121"
    },
    established: 2006,
    employees: 220,
    riskScore: 90,
    rating: 4.6,
    reviewCount: 134,
    bio: "Greenhouse vegetable producer in Baja California with year-round production.",
    documents: ["GlobalGAP Cert", "PrimusGFS Audit", "SENASICA Permit"],
    deals: 176,
    onTimeDelivery: 95,
    crm: { salesforce: "SF123456", hubspot: null }
  },
  {
    id: "GRW022",
    type: "exporter",
    companyName: "Chihuahua Apple Growers",
    dba: "Chihuahua Apples",
    location: { region: "chihuahua", city: "Cuauhtémoc", country: "Mexico", coordinates: { lat: 28.4061, lng: -106.8692 } },
    commodities: ["apples"],
    certifications: ["globalgap", "primusgfs", "senasica"],
    foodSafetyBadges: ["traceability", "cold-chain", "supplier-approved"],
    organic: false,
    volume: { weekly: "300,000 lbs", annual: "15M lbs" },
    capacity: "high",
    contact: {
      name: "Luis Mendoza",
      phone: "+52-625-555-2222",
      email: "luis@chihuahuaapples.mx",
      whatsapp: "+52-625-555-2222"
    },
    established: 1993,
    employees: 340,
    riskScore: 91,
    rating: 4.5,
    reviewCount: 156,
    bio: "Premium apple grower in Chihuahua's apple belt with modern storage facilities.",
    documents: ["GlobalGAP Cert", "PrimusGFS Audit", "Cold Storage Cert"],
    deals: 234,
    onTimeDelivery: 96,
    crm: { salesforce: "SF234567", hubspot: "HUB4567" }
  },
  
  // Additional Specialty Growers
  {
    id: "GRW023",
    type: "grower",
    companyName: "California Mushroom Farms",
    dba: "CA Mushrooms",
    location: { region: "california", city: "Monterey", country: "USA", coordinates: { lat: 36.6002, lng: -121.8947 } },
    commodities: ["mushrooms"],
    certifications: ["usda-organic", "globalgap", "sqf"],
    foodSafetyBadges: ["traceability", "gmp", "supplier-approved"],
    organic: true,
    volume: { weekly: "50,000 lbs", annual: "2.5M lbs" },
    capacity: "medium",
    contact: {
      name: "Jennifer Lee",
      phone: "+1-831-555-2323",
      email: "jennifer@camushrooms.com",
      whatsapp: "+1-831-555-2323"
    },
    established: 2009,
    employees: 110,
    riskScore: 88,
    rating: 4.8,
    reviewCount: 92,
    bio: "Organic specialty mushroom grower with controlled environment production.",
    documents: ["USDA Organic Cert", "SQF Cert", "GMP Documentation"],
    deals: 112,
    onTimeDelivery: 97,
    crm: { salesforce: null, hubspot: "HUB5678" }
  },
  {
    id: "GRW024",
    type: "grower",
    companyName: "Florida Tropical Fruits Inc.",
    dba: "FL Tropical",
    location: { region: "florida", city: "Homestead", country: "USA", coordinates: { lat: 25.4687, lng: -80.4776 } },
    commodities: ["tropical"],
    certifications: ["globalgap", "fsma", "rainforest"],
    foodSafetyBadges: ["traceability", "supplier-approved"],
    organic: false,
    volume: { weekly: "120,000 lbs", annual: "6M lbs" },
    capacity: "medium",
    contact: {
      name: "Ricardo Santos",
      phone: "+1-305-555-2424",
      email: "ricardo@fltropical.com",
      whatsapp: "+1-305-555-2424"
    },
    established: 2001,
    employees: 165,
    riskScore: 89,
    rating: 4.6,
    reviewCount: 108,
    bio: "Specialty tropical fruit grower including mango, papaya, and dragon fruit.",
    documents: ["GlobalGAP Cert", "Rainforest Alliance", "FSMA Plan"],
    deals: 143,
    onTimeDelivery: 94,
    crm: { salesforce: "SF345678", hubspot: null }
  },
  {
    id: "GRW025",
    type: "grower",
    companyName: "California Artisan Greens",
    dba: "CA Artisan",
    location: { region: "california", city: "San Francisco", country: "USA", coordinates: { lat: 37.7749, lng: -122.4194 } },
    commodities: ["microgreens", "herbs", "leafyGreens"],
    certifications: ["usda-organic", "non-gmo"],
    foodSafetyBadges: ["traceability", "water-tested"],
    organic: true,
    volume: { weekly: "8,000 lbs", annual: "400K lbs" },
    capacity: "small",
    contact: {
      name: "Sophie Anderson",
      phone: "+1-415-555-2525",
      email: "sophie@caartisan.com",
      whatsapp: "+1-415-555-2525"
    },
    established: 2017,
    employees: 28,
    riskScore: 84,
    rating: 4.9,
    reviewCount: 45,
    bio: "Urban vertical farm producing premium microgreens and herbs for fine dining.",
    documents: ["USDA Organic Cert", "Water Test Results"],
    deals: 52,
    onTimeDelivery: 98,
    crm: { salesforce: null, hubspot: "HUB6789" }
  }
];

// Helper function to get growers by filters
export function searchGrowers(filters = {}) {
  let results = [...growerDatabase];
  
  if (filters.commodity) {
    results = results.filter(g => 
      g.commodities.some(c => c.toLowerCase().includes(filters.commodity.toLowerCase()))
    );
  }
  
  if (filters.region) {
    results = results.filter(g => g.location.region === filters.region);
  }
  
  if (filters.country) {
    results = results.filter(g => g.location.country === filters.country);
  }
  
  if (filters.certification) {
    results = results.filter(g => g.certifications.includes(filters.certification));
  }
  
  if (filters.organic !== undefined) {
    results = results.filter(g => g.organic === filters.organic);
  }
  
  if (filters.type) {
    results = results.filter(g => g.type === filters.type);
  }
  
  if (filters.minRiskScore) {
    results = results.filter(g => g.riskScore >= filters.minRiskScore);
  }
  
  if (filters.minRating) {
    results = results.filter(g => g.rating >= filters.minRating);
  }
  
  return results;
}

// Get grower by ID
export function getGrowerById(id) {
  return growerDatabase.find(g => g.id === id);
}

// Get random featured growers
export function getFeaturedGrowers(count = 5) {
  const shuffled = [...growerDatabase].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
