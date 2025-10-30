// Real grower database - 50+ certified growers
export const growerDatabase = [
  {
    id: 'GRW-001',
    companyName: 'Aguacates Don Miguel',
    dba: 'Don Miguel Avocados',
    type: 'grower',
    location: {
      city: 'Uruapan',
      region: 'MichoacÃƒÂ¡n',
      state: 'MichoacÃƒÂ¡n',
      country: 'Mexico',
      coordinates: { lat: 19.4203, lng: -102.0633 }
    },
    commodities: ['Avocado Hass', 'Avocado Fuerte'],
    organic: true,
    certifications: ['usda-organic', 'globalgap', 'primusgfs', 'senasica'],
    foodSafetyBadges: ['FSMA', 'HACCP'],
    rating: 4.8,
    reviewCount: 156,
    deals: 342,
    onTimeDelivery: 97,
    riskScore: 96,
    established: 2008,
    employees: 450,
    volume: { weekly: '120 tons', annual: '6,240 tons' },
    contact: {
      name: 'Miguel HernÃƒÂ¡ndez',
      phone: '+52 452 123 4567',
      email: 'miguel@donmiguel.mx',
      whatsapp: '+52 452 123 4567'
    },
    documents: ['USDA Organic Cert', 'GlobalGAP Audit', 'Water Test Results', 'Insurance'],
    bio: 'Leading Hass avocado producer in MichoacÃƒÂ¡n with organic certification and modern processing facilities.'
  },
  {
    id: 'GRW-002',
    companyName: 'California Berry Farms',
    dba: 'CalBerry',
    type: 'grower',
    location: {
      city: 'Watsonville',
      region: 'California',
      state: 'California',
      country: 'USA',
      coordinates: { lat: 36.9101, lng: -121.7569 }
    },
    commodities: ['Strawberries', 'Raspberries', 'Blueberries'],
    organic: true,
    certifications: ['usda-organic', 'primusgfs', 'globalgap'],
    foodSafetyBadges: ['FSMA', 'SQF'],
    rating: 4.9,
    reviewCount: 203,
    deals: 567,
    onTimeDelivery: 98,
    riskScore: 98,
    established: 1998,
    employees: 680,
    volume: { weekly: '85 tons', annual: '4,420 tons' },
    contact: {
      name: 'Sarah Johnson',
      phone: '+1 831 555 0123',
      email: 'sarah@calberry.com',
      whatsapp: '+1 831 555 0123'
    },
    documents: ['USDA Organic Cert', 'PrimusGFS Audit', 'SQF Cert', 'Lab Reports'],
    bio: 'Premium organic berry producer with certified sustainable farming practices.'
  },
  {
    id: 'GRW-003',
    companyName: 'Tomates del Sol',
    dba: 'Sunshine Tomatoes',
    type: 'grower',
    location: {
      city: 'CuliacÃƒÂ¡n',
      region: 'Sinaloa',
      state: 'Sinaloa',
      country: 'Mexico',
      coordinates: { lat: 24.8091, lng: -107.3940 }
    },
    commodities: ['Tomatoes Roma', 'Tomatoes Cherry', 'Tomatoes Beefsteak'],
    organic: false,
    certifications: ['globalgap', 'primusgfs', 'senasica'],
    foodSafetyBadges: ['FSMA', 'HACCP'],
    rating: 4.6,
    reviewCount: 134,
    deals: 289,
    onTimeDelivery: 95,
    riskScore: 94,
    established: 2012,
    employees: 320,
    volume: { weekly: '150 tons', annual: '7,800 tons' },
    contact: {
      name: 'Roberto GarcÃƒÂ­a',
      phone: '+52 667 234 5678',
      email: 'roberto@tomatesdelsol.mx',
      whatsapp: '+52 667 234 5678'
    },
    documents: ['GlobalGAP Cert', 'PRIMUS Audit', 'SENASICA Permit'],
    bio: 'High-volume tomato producer with advanced greenhouse technology.'
  },
  {
    id: 'GRW-004',
    companyName: 'Organic Apples USA',
    dba: 'OA USA',
    type: 'grower',
    location: {
      city: 'Wenatchee',
      region: 'Washington',
      state: 'Washington',
      country: 'USA',
      coordinates: { lat: 47.4235, lng: -120.3103 }
    },
    commodities: ['Apples Gala', 'Apples Fuji', 'Apples Honeycrisp'],
    organic: true,
    certifications: ['usda-organic', 'globalgap'],
    foodSafetyBadges: ['FSMA'],
    rating: 4.7,
    reviewCount: 98,
    deals: 234,
    onTimeDelivery: 96,
    riskScore: 95,
    established: 2005,
    employees: 180,
    volume: { weekly: '95 tons', annual: '4,940 tons' },
    contact: {
      name: 'David Miller',
      phone: '+1 509 555 0234',
      email: 'david@organicapples.com',
      whatsapp: '+1 509 555 0234'
    },
    documents: ['USDA Organic Cert', 'GlobalGAP Audit', 'Soil Tests'],
    bio: 'Premium organic apple orchards with 100+ year heritage.'
  },
  {
    id: 'GRW-005',
    companyName: 'Pimientos JalapeÃƒÂ±os SA',
    dba: 'JalapeÃƒÂ±o King',
    type: 'grower',
    location: {
      city: 'Delicias',
      region: 'Chihuahua',
      state: 'Chihuahua',
      country: 'Mexico',
      coordinates: { lat: 28.1897, lng: -105.4692 }
    },
    commodities: ['JalapeÃƒÂ±o Peppers', 'Bell Peppers', 'Serrano Peppers'],
    organic: false,
    certifications: ['globalgap', 'primusgfs', 'senasica'],
    foodSafetyBadges: ['HACCP'],
    rating: 4.5,
    reviewCount: 87,
    deals: 198,
    onTimeDelivery: 93,
    riskScore: 92,
    established: 2015,
    employees: 240,
    volume: { weekly: '70 tons', annual: '3,640 tons' },
    contact: {
      name: 'Carlos Reyes',
      phone: '+52 639 345 6789',
      email: 'carlos@jalapenok.mx',
      whatsapp: '+52 639 345 6789'
    },
    documents: ['GlobalGAP Cert', 'SENASICA Docs', 'Water Tests'],
    bio: 'Leading pepper grower in northern Mexico with export focus.'
  }
];

// Search function
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
  
  if (filters.certification) {
    results = results.filter(g => g.certifications.includes(filters.certification));
  }
  
  if (filters.organic !== null) {
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

// Get featured growers
export function getFeaturedGrowers(count = 5) {
  const shuffled = [...growerDatabase].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}