// Mexico Loan Products Database
// Inspired by globalmortgage.mx and US-to-Mexico loan services
// Does NOT use Moxxi as business name but references qualification criteria

export const loanProducts = [
  {
    id: 'mx-expat-premium',
    name: 'Mexico Expat Premium',
    lender: 'Global Cross-Border Partners',
    type: 'Purchase/Refinance',
    description: 'Premium loan program for US nationals purchasing Mexico real estate',
    criteria: {
      minFICO: 700,
      maxLTV: 0.75,
      maxDTI: 0.43,
      minIncome: 150000, // USD annually
      minDownPayment: 0.25,
      residencyTypes: ['Foreign National', 'US Citizen'],
      propertyTypes: ['Residential', 'Condo', 'Villa'],
      regions: ['QROO', 'JAL', 'BCS', 'YUC', 'ROO'],
      currencies: ['USD', 'MXN'],
      terms: [15, 20, 25, 30]
    },
    features: [
      'Remote e-signature capability',
      'Currency transfer assistance',
      'Title insurance coordination',
      'Legal due diligence support',
      'Bilingual documentation',
      'US-based servicing'
    ],
    complianceFeatures: [
      'FINCEN compliance',
      'Mexican banking trust (fideicomiso) setup',
      'Tax ID assistance',
      'CFPB disclosure compliance'
    ],
    qualificationNote: 'Uses similar qualification matrix as major Mexico lending platforms'
  },
  {
    id: 'mx-resident-standard',
    name: 'Mexico Resident Standard',
    lender: 'Banco Nacional Partners',
    type: 'Purchase/Refinance/Construction',
    description: 'Standard program for Mexican residents and permanent residents',
    criteria: {
      minFICO: 650,
      maxLTV: 0.80,
      maxDTI: 0.45,
      minIncome: 50000, // MXN monthly
      minDownPayment: 0.20,
      residencyTypes: ['Mexican Resident', 'Temporary/Permanent Resident'],
      propertyTypes: ['Residential', 'Condo', 'Land', 'Mixed-use'],
      regions: ['CDMX', 'JAL', 'NLE', 'QRO', 'MEX', 'PUE', 'GTO'],
      currencies: ['MXN', 'USD'],
      terms: [10, 15, 20, 25, 30]
    },
    features: [
      'Local bank partnership',
      'Peso and USD options',
      'Construction loan capability',
      'Quick local approval',
      'Mexican banking relationship'
    ],
    complianceFeatures: [
      'CNBV compliance',
      'Local tax reporting',
      'Mexican notary coordination'
    ],
    qualificationNote: 'Standard Mexican banking criteria with enhanced documentation'
  },
  {
    id: 'mx-alternative-doc',
    name: 'Mexico Alternative Documentation',
    lender: 'International Bridge Lending',
    type: 'Purchase/Cash-out Refinance',
    description: 'Alternative documentation program for high-net-worth foreign nationals',
    criteria: {
      minFICO: 680,
      maxLTV: 0.70,
      maxDTI: 0.40,
      minIncome: 200000, // USD annually
      minDownPayment: 0.30,
      residencyTypes: ['Foreign National'],
      propertyTypes: ['Residential', 'Condo', 'Villa', 'Investment'],
      regions: ['QROO', 'BCS', 'JAL', 'ROO', 'YUC', 'SIN'],
      currencies: ['USD'],
      terms: [15, 20, 25]
    },
    features: [
      'Bank statement qualification',
      'Asset-based underwriting',
      'International income verification',
      'Escrow management',
      'Investment property expertise'
    ],
    complianceFeatures: [
      'Enhanced due diligence',
      'Source of funds verification',
      'International compliance',
      'AML documentation'
    ],
    qualificationNote: 'Qualification logic similar to leading Mexico investment property lenders'
  },
  {
    id: 'mx-construction-specialist',
    name: 'Mexico Construction Specialist',
    lender: 'Development Finance Group',
    type: 'Construction/Land',
    description: 'Specialized construction and land development financing',
    criteria: {
      minFICO: 720,
      maxLTV: 0.65,
      maxDTI: 0.38,
      minIncome: 250000, // USD annually
      minDownPayment: 0.35,
      residencyTypes: ['Foreign National', 'Mexican Resident'],
      propertyTypes: ['Land', 'Construction', 'Development'],
      regions: ['QROO', 'BCS', 'JAL', 'YUC', 'PUE'],
      currencies: ['USD', 'MXN'],
      terms: [10, 15, 20]
    },
    features: [
      'Draw schedule management',
      'Architect/contractor approval',
      'Progress inspection',
      'Permit assistance',
      'Development expertise'
    ],
    complianceFeatures: [
      'Environmental compliance',
      'Building permit verification',
      'Local authority coordination'
    ],
    qualificationNote: 'Construction lending criteria adapted from major Mexico development financiers'
  },
  {
    id: 'mx-refinance-equity',
    name: 'Mexico Refinance & Equity',
    lender: 'Equity Release Partners',
    type: 'Refinance/Cash-out Refinance',
    description: 'Refinance and equity extraction for existing Mexico property owners',
    criteria: {
      minFICO: 660,
      maxLTV: 0.75,
      maxDTI: 0.45,
      minIncome: 100000, // USD annually
      minDownPayment: 0.25,
      residencyTypes: ['Foreign National', 'Mexican Resident', 'Temporary/Permanent Resident'],
      propertyTypes: ['Residential', 'Condo', 'Villa'],
      regions: ['QROO', 'JAL', 'BCS', 'YUC', 'CDMX', 'ROO'],
      currencies: ['USD', 'MXN'],
      terms: [15, 20, 25, 30]
    },
    features: [
      'Equity extraction capability',
      'Rate and term refinance',
      'Debt consolidation',
      'Flexible documentation',
      'Existing relationship credit'
    ],
    complianceFeatures: [
      'Property revaluation',
      'Updated title verification',
      'Current tax compliance check'
    ],
    qualificationNote: 'Refinance qualification standards aligned with Mexico market leaders'
  }
];

export const lenderCriteria = {
  // Admin-configurable criteria for each lender type
  'Global Cross-Border Partners': {
    maxLTV: 0.75,
    minFICO: 700,
    maxDTI: 0.43,
    acceptedResidency: ['Foreign National', 'US Citizen'],
    preferredRegions: ['QROO', 'JAL', 'BCS', 'YUC']
  },
  'Banco Nacional Partners': {
    maxLTV: 0.80,
    minFICO: 650,
    maxDTI: 0.45,
    acceptedResidency: ['Mexican Resident', 'Temporary/Permanent Resident'],
    preferredRegions: ['CDMX', 'JAL', 'NLE', 'QRO']
  },
  'International Bridge Lending': {
    maxLTV: 0.70,
    minFICO: 680,
    maxDTI: 0.40,
    acceptedResidency: ['Foreign National'],
    preferredRegions: ['QROO', 'BCS', 'JAL', 'ROO']
  },
  'Development Finance Group': {
    maxLTV: 0.65,
    minFICO: 720,
    maxDTI: 0.38,
    acceptedResidency: ['Foreign National', 'Mexican Resident'],
    preferredRegions: ['QROO', 'BCS', 'JAL', 'YUC']
  },
  'Equity Release Partners': {
    maxLTV: 0.75,
    minFICO: 660,
    maxDTI: 0.45,
    acceptedResidency: ['Foreign National', 'Mexican Resident', 'Temporary/Permanent Resident'],
    preferredRegions: ['QROO', 'JAL', 'BCS', 'YUC', 'CDMX']
  }
};

export const complianceRequirements = {
  'Foreign National': [
    'Valid passport',
    'Tourist permit or FM3/FM2',
    'Bank account verification',
    'Source of funds documentation',
    'Mexican tax ID (RFC) assistance',
    'Fideicomiso (bank trust) setup',
    'FINCEN compliance documentation'
  ],
  'Mexican Resident': [
    'Mexican ID (INE/IFE)',
    'CURP certificate',
    'RFC tax ID',
    'Proof of residence',
    'Income verification',
    'CNBV compliance'
  ],
  'Temporary/Permanent Resident': [
    'Resident card',
    'RFC tax ID',
    'Local bank account',
    'Income verification',
    'Residence proof'
  ]
};

// Qualification engine inspired by major Mexico lending platforms
export function evaluateQualification(application, product) {
  const qualificationScore = {
    eligible: true,
    score: 100,
    warnings: [],
    requirements: [],
    strengths: []
  };

  // FICO Score Check
  if (application.creditScore < product.criteria.minFICO) {
    qualificationScore.eligible = false;
    qualificationScore.score -= 30;
    qualificationScore.warnings.push(`Credit score ${application.creditScore} below minimum ${product.criteria.minFICO}`);
  } else if (application.creditScore >= product.criteria.minFICO + 50) {
    qualificationScore.strengths.push('Strong credit score');
  }

  // LTV Check
  const ltv = (application.loanAmount / application.propertyValue);
  if (ltv > product.criteria.maxLTV) {
    qualificationScore.eligible = false;
    qualificationScore.score -= 25;
    qualificationScore.warnings.push(`LTV ${(ltv * 100).toFixed(1)}% exceeds maximum ${(product.criteria.maxLTV * 100)}%`);
  }

  // DTI Check
  if (application.dti > product.criteria.maxDTI) {
    qualificationScore.eligible = false;
    qualificationScore.score -= 20;
    qualificationScore.warnings.push(`DTI ${(application.dti * 100).toFixed(1)}% exceeds maximum ${(product.criteria.maxDTI * 100)}%`);
  }

  // Income Check
  if (application.annualIncome < product.criteria.minIncome) {
    qualificationScore.eligible = false;
    qualificationScore.score -= 25;
    qualificationScore.warnings.push(`Income below minimum requirement`);
  }

  // Residency Check
  if (!product.criteria.residencyTypes.includes(application.residency)) {
    qualificationScore.eligible = false;
    qualificationScore.score -= 35;
    qualificationScore.warnings.push(`Residency type not accepted for this product`);
  }

  // Property Type Check
  if (!product.criteria.propertyTypes.includes(application.propertyType)) {
    qualificationScore.score -= 10;
    qualificationScore.warnings.push(`Property type has limited availability`);
  }

  // Region Check
  if (!product.criteria.regions.includes(application.state)) {
    qualificationScore.score -= 15;
    qualificationScore.warnings.push(`Limited lending in this region`);
  } else {
    qualificationScore.strengths.push('Property in preferred lending region');
  }

  // Compliance Requirements
  const complianceReqs = complianceRequirements[application.residency] || [];
  qualificationScore.requirements = complianceReqs;

  return qualificationScore;
}