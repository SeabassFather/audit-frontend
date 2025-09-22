/**
 * Comprehensive Compliance Categories for AuditDNA
 * 
 * This file defines the complete structure of compliance/audit categories 
 * and subcategories used throughout the application for document tagging,
 * categorization, and user navigation/audit selection.
 * 
 * Schema:
 * - id: unique identifier for the category
 * - name: display name for the category
 * - description: brief description of the category scope
 * - icon: emoji or icon identifier for UI display
 * - color: CSS color class for theming
 * - subcategories: array of subcategory objects with their own structure
 */

export const COMPLIANCE_CATEGORIES = [
  {
    id: 'business',
    name: 'Business Compliance',
    description: 'Corporate governance, operations, and regulatory compliance',
    icon: '🏢',
    color: 'border-blue-300 bg-blue-50',
    subcategories: [
      {
        id: 'corporate-governance',
        name: 'Corporate Governance',
        description: 'Board oversight, executive compliance, shareholder relations',
        items: [
          { id: 'board-resolutions', name: 'Board Resolutions & Minutes', tags: ['governance', 'board'] },
          { id: 'shareholder-agreements', name: 'Shareholder Agreements', tags: ['equity', 'governance'] },
          { id: 'executive-compensation', name: 'Executive Compensation', tags: ['compensation', 'disclosure'] },
          { id: 'conflict-of-interest', name: 'Conflict of Interest Policies', tags: ['ethics', 'compliance'] }
        ]
      },
      {
        id: 'financial-reporting',
        name: 'Financial Reporting',
        description: 'GAAP, SOX, financial disclosure requirements',
        items: [
          { id: 'sox-compliance', name: 'Sarbanes-Oxley Compliance', tags: ['sox', 'financial'] },
          { id: 'gaap-reporting', name: 'GAAP Financial Reporting', tags: ['gaap', 'accounting'] },
          { id: 'audit-committee', name: 'Audit Committee Charter', tags: ['audit', 'governance'] },
          { id: 'internal-controls', name: 'Internal Controls Documentation', tags: ['controls', 'risk'] }
        ]
      },
      {
        id: 'tax-compliance',
        name: 'Tax Compliance',
        description: 'Federal, state, and local tax obligations',
        items: [
          { id: 'corporate-tax', name: 'Corporate Tax Returns', tags: ['tax', 'corporate'] },
          { id: 'sales-tax', name: 'Sales Tax Compliance', tags: ['tax', 'sales'] },
          { id: 'payroll-tax', name: 'Payroll Tax Documentation', tags: ['tax', 'payroll'] },
          { id: 'tax-planning', name: 'Tax Planning Strategies', tags: ['tax', 'planning'] }
        ]
      }
    ]
  },
  {
    id: 'commercial',
    name: 'Commercial Compliance',
    description: 'Trade, contracts, and commercial transaction compliance',
    icon: '🤝',
    color: 'border-green-300 bg-green-50',
    subcategories: [
      {
        id: 'contract-management',
        name: 'Contract Management',
        description: 'Contract lifecycle, terms, and compliance monitoring',
        items: [
          { id: 'vendor-contracts', name: 'Vendor & Supplier Contracts', tags: ['contracts', 'vendors'] },
          { id: 'customer-agreements', name: 'Customer Service Agreements', tags: ['contracts', 'customers'] },
          { id: 'licensing-agreements', name: 'Licensing & IP Agreements', tags: ['ip', 'licensing'] },
          { id: 'employment-contracts', name: 'Employment Contracts', tags: ['employment', 'hr'] }
        ]
      },
      {
        id: 'trade-compliance',
        name: 'Trade & Export Compliance',
        description: 'Import/export regulations, customs, trade sanctions',
        items: [
          { id: 'export-controls', name: 'Export Control Compliance', tags: ['export', 'trade'] },
          { id: 'customs-documentation', name: 'Customs Documentation', tags: ['customs', 'import'] },
          { id: 'trade-sanctions', name: 'Trade Sanctions Compliance', tags: ['sanctions', 'ofac'] },
          { id: 'origin-certificates', name: 'Certificate of Origin', tags: ['origin', 'trade'] }
        ]
      },
      {
        id: 'antitrust',
        name: 'Antitrust & Competition',
        description: 'Competition law, merger control, pricing practices',
        items: [
          { id: 'merger-clearance', name: 'Merger Clearance Documentation', tags: ['merger', 'antitrust'] },
          { id: 'pricing-policies', name: 'Pricing Policies', tags: ['pricing', 'competition'] },
          { id: 'market-analysis', name: 'Market Analysis Reports', tags: ['market', 'competition'] },
          { id: 'competitor-intelligence', name: 'Competitive Intelligence', tags: ['intelligence', 'market'] }
        ]
      }
    ]
  },
  {
    id: 'legal',
    name: 'Legal Compliance',
    description: 'Regulatory, litigation, and legal risk management',
    icon: '⚖️',
    color: 'border-purple-300 bg-purple-50',
    subcategories: [
      {
        id: 'regulatory-compliance',
        name: 'Regulatory Compliance',
        description: 'Federal and state regulatory requirements',
        items: [
          { id: 'cfpb-compliance', name: 'CFPB Compliance', tags: ['cfpb', 'consumer'] },
          { id: 'sec-filings', name: 'SEC Filings & Disclosure', tags: ['sec', 'disclosure'] },
          { id: 'banking-regulations', name: 'Banking Regulations', tags: ['banking', 'federal'] },
          { id: 'environmental-compliance', name: 'Environmental Compliance', tags: ['environmental', 'epa'] }
        ]
      },
      {
        id: 'litigation-management',
        name: 'Litigation Management',
        description: 'Legal proceedings, discovery, settlement management',
        items: [
          { id: 'litigation-holds', name: 'Litigation Hold Notices', tags: ['litigation', 'holds'] },
          { id: 'discovery-responses', name: 'Discovery Responses', tags: ['discovery', 'litigation'] },
          { id: 'settlement-agreements', name: 'Settlement Agreements', tags: ['settlement', 'litigation'] },
          { id: 'court-filings', name: 'Court Filings', tags: ['court', 'filings'] }
        ]
      },
      {
        id: 'intellectual-property',
        name: 'Intellectual Property',
        description: 'Patents, trademarks, copyrights, trade secrets',
        items: [
          { id: 'patent-applications', name: 'Patent Applications', tags: ['patents', 'ip'] },
          { id: 'trademark-registrations', name: 'Trademark Registrations', tags: ['trademarks', 'ip'] },
          { id: 'copyright-notices', name: 'Copyright Notices', tags: ['copyright', 'ip'] },
          { id: 'trade-secrets', name: 'Trade Secret Policies', tags: ['trade-secrets', 'confidential'] }
        ]
      }
    ]
  },
  {
    id: 'medical',
    name: 'Medical Compliance',
    description: 'Healthcare regulations, patient privacy, medical device compliance',
    icon: '🏥',
    color: 'border-red-300 bg-red-50',
    subcategories: [
      {
        id: 'hipaa-compliance',
        name: 'HIPAA Compliance',
        description: 'Patient privacy and protected health information',
        items: [
          { id: 'hipaa-policies', name: 'HIPAA Privacy Policies', tags: ['hipaa', 'privacy'] },
          { id: 'business-associate', name: 'Business Associate Agreements', tags: ['hipaa', 'baa'] },
          { id: 'breach-notifications', name: 'Breach Notification Procedures', tags: ['breach', 'hipaa'] },
          { id: 'patient-consent', name: 'Patient Consent Forms', tags: ['consent', 'patients'] }
        ]
      },
      {
        id: 'fda-compliance',
        name: 'FDA Compliance',
        description: 'Medical device, drug, and clinical trial regulations',
        items: [
          { id: 'device-registration', name: 'Medical Device Registration', tags: ['fda', 'devices'] },
          { id: 'clinical-trials', name: 'Clinical Trial Documentation', tags: ['clinical', 'trials'] },
          { id: 'adverse-events', name: 'Adverse Event Reporting', tags: ['adverse', 'safety'] },
          { id: 'quality-systems', name: 'Quality System Regulations', tags: ['quality', 'qsr'] }
        ]
      },
      {
        id: 'billing-compliance',
        name: 'Medical Billing Compliance',
        description: 'Healthcare billing, coding, and reimbursement',
        items: [
          { id: 'cpt-coding', name: 'CPT Code Validation', tags: ['cpt', 'coding'] },
          { id: 'medicare-compliance', name: 'Medicare Compliance', tags: ['medicare', 'cms'] },
          { id: 'medicaid-compliance', name: 'Medicaid Compliance', tags: ['medicaid', 'state'] },
          { id: 'fraud-waste-abuse', name: 'Fraud, Waste & Abuse Prevention', tags: ['fraud', 'compliance'] }
        ]
      }
    ]
  },
  {
    id: 'educational',
    name: 'Educational Compliance',
    description: 'Academic institutions, student privacy, educational regulations',
    icon: '🎓',
    color: 'border-yellow-300 bg-yellow-50',
    subcategories: [
      {
        id: 'ferpa-compliance',
        name: 'FERPA Compliance',
        description: 'Student privacy and educational records',
        items: [
          { id: 'ferpa-policies', name: 'FERPA Privacy Policies', tags: ['ferpa', 'privacy'] },
          { id: 'student-records', name: 'Student Record Management', tags: ['records', 'students'] },
          { id: 'directory-information', name: 'Directory Information Policies', tags: ['directory', 'ferpa'] },
          { id: 'consent-disclosure', name: 'Consent for Disclosure', tags: ['consent', 'disclosure'] }
        ]
      },
      {
        id: 'title-ix',
        name: 'Title IX Compliance',
        description: 'Gender equity and discrimination prevention',
        items: [
          { id: 'title-ix-policies', name: 'Title IX Policies', tags: ['title-ix', 'discrimination'] },
          { id: 'grievance-procedures', name: 'Grievance Procedures', tags: ['grievance', 'title-ix'] },
          { id: 'training-materials', name: 'Training Materials', tags: ['training', 'title-ix'] },
          { id: 'incident-reporting', name: 'Incident Reporting', tags: ['reporting', 'incidents'] }
        ]
      },
      {
        id: 'accreditation',
        name: 'Accreditation',
        description: 'Academic accreditation and quality assurance',
        items: [
          { id: 'accreditation-reports', name: 'Accreditation Reports', tags: ['accreditation', 'reports'] },
          { id: 'curriculum-standards', name: 'Curriculum Standards', tags: ['curriculum', 'standards'] },
          { id: 'faculty-qualifications', name: 'Faculty Qualifications', tags: ['faculty', 'qualifications'] },
          { id: 'student-outcomes', name: 'Student Outcome Assessment', tags: ['outcomes', 'assessment'] }
        ]
      }
    ]
  },
  {
    id: 'travel',
    name: 'Travel Compliance',
    description: 'Corporate travel policies, expense management, visa/immigration',
    icon: '✈️',
    color: 'border-indigo-300 bg-indigo-50',
    subcategories: [
      {
        id: 'travel-policies',
        name: 'Travel Policies',
        description: 'Corporate travel guidelines and procedures',
        items: [
          { id: 'expense-policies', name: 'Expense Reimbursement Policies', tags: ['expenses', 'travel'] },
          { id: 'booking-procedures', name: 'Travel Booking Procedures', tags: ['booking', 'procedures'] },
          { id: 'safety-protocols', name: 'Travel Safety Protocols', tags: ['safety', 'travel'] },
          { id: 'approval-workflows', name: 'Travel Approval Workflows', tags: ['approval', 'workflows'] }
        ]
      },
      {
        id: 'immigration-compliance',
        name: 'Immigration Compliance',
        description: 'Visa requirements, work permits, immigration law',
        items: [
          { id: 'visa-documentation', name: 'Visa Documentation', tags: ['visa', 'immigration'] },
          { id: 'work-permits', name: 'Work Permit Applications', tags: ['permits', 'work'] },
          { id: 'i9-compliance', name: 'I-9 Employment Verification', tags: ['i9', 'employment'] },
          { id: 'immigration-tracking', name: 'Immigration Status Tracking', tags: ['tracking', 'status'] }
        ]
      },
      {
        id: 'international-compliance',
        name: 'International Compliance',
        description: 'Cross-border regulations and customs requirements',
        items: [
          { id: 'customs-declarations', name: 'Customs Declarations', tags: ['customs', 'international'] },
          { id: 'export-licenses', name: 'Export Licenses', tags: ['export', 'licenses'] },
          { id: 'foreign-registration', name: 'Foreign Business Registration', tags: ['foreign', 'registration'] },
          { id: 'tax-treaties', name: 'Tax Treaty Documentation', tags: ['treaties', 'tax'] }
        ]
      }
    ]
  },
  {
    id: 'insurance',
    name: 'Insurance Compliance',
    description: 'Insurance regulations, claims management, policy compliance',
    icon: '🛡️',
    color: 'border-teal-300 bg-teal-50',
    subcategories: [
      {
        id: 'policy-compliance',
        name: 'Policy Compliance',
        description: 'Insurance policy terms and regulatory compliance',
        items: [
          { id: 'underwriting-guidelines', name: 'Underwriting Guidelines', tags: ['underwriting', 'guidelines'] },
          { id: 'policy-forms', name: 'Policy Forms & Documentation', tags: ['policies', 'forms'] },
          { id: 'rate-filings', name: 'Insurance Rate Filings', tags: ['rates', 'filings'] },
          { id: 'reserve-calculations', name: 'Reserve Calculations', tags: ['reserves', 'actuarial'] }
        ]
      },
      {
        id: 'claims-management',
        name: 'Claims Management',
        description: 'Claims processing, investigation, and settlement',
        items: [
          { id: 'claims-procedures', name: 'Claims Processing Procedures', tags: ['claims', 'procedures'] },
          { id: 'investigation-reports', name: 'Investigation Reports', tags: ['investigation', 'claims'] },
          { id: 'settlement-documentation', name: 'Settlement Documentation', tags: ['settlement', 'claims'] },
          { id: 'fraud-detection', name: 'Fraud Detection Procedures', tags: ['fraud', 'detection'] }
        ]
      },
      {
        id: 'regulatory-reporting',
        name: 'Regulatory Reporting',
        description: 'State insurance department reporting and compliance',
        items: [
          { id: 'annual-statements', name: 'Annual Financial Statements', tags: ['financial', 'annual'] },
          { id: 'market-conduct', name: 'Market Conduct Examinations', tags: ['market', 'conduct'] },
          { id: 'solvency-monitoring', name: 'Solvency Monitoring', tags: ['solvency', 'monitoring'] },
          { id: 'consumer-complaints', name: 'Consumer Complaint Handling', tags: ['complaints', 'consumer'] }
        ]
      }
    ]
  },
  {
    id: 'consumer',
    name: 'Consumer Protection',
    description: 'Consumer rights, financial services, data protection',
    icon: '👥',
    color: 'border-orange-300 bg-orange-50',
    subcategories: [
      {
        id: 'financial-services',
        name: 'Financial Services Compliance',
        description: 'Banking, lending, and financial product regulations',
        items: [
          { id: 'truth-in-lending', name: 'Truth in Lending (TILA)', tags: ['tila', 'lending'] },
          { id: 'fair-credit', name: 'Fair Credit Reporting Act', tags: ['fcra', 'credit'] },
          { id: 'equal-credit', name: 'Equal Credit Opportunity Act', tags: ['ecoa', 'credit'] },
          { id: 'fair-debt', name: 'Fair Debt Collection Practices', tags: ['fdcpa', 'debt'] }
        ]
      },
      {
        id: 'data-protection',
        name: 'Data Protection & Privacy',
        description: 'Consumer data privacy and protection regulations',
        items: [
          { id: 'gdpr-compliance', name: 'GDPR Compliance', tags: ['gdpr', 'privacy'] },
          { id: 'ccpa-compliance', name: 'CCPA Compliance', tags: ['ccpa', 'privacy'] },
          { id: 'data-breach', name: 'Data Breach Response', tags: ['breach', 'response'] },
          { id: 'privacy-policies', name: 'Privacy Policy Management', tags: ['privacy', 'policies'] }
        ]
      },
      {
        id: 'consumer-rights',
        name: 'Consumer Rights & Protection',
        description: 'Consumer protection laws and complaint handling',
        items: [
          { id: 'complaint-handling', name: 'Consumer Complaint Procedures', tags: ['complaints', 'procedures'] },
          { id: 'warranty-compliance', name: 'Warranty & Guarantee Compliance', tags: ['warranty', 'guarantee'] },
          { id: 'advertising-standards', name: 'Advertising Standards', tags: ['advertising', 'standards'] },
          { id: 'product-safety', name: 'Product Safety Compliance', tags: ['safety', 'products'] }
        ]
      }
    ]
  }
];

/**
 * Helper functions for working with compliance categories
 */

// Get all categories as a flat array
export const getAllCategories = () => COMPLIANCE_CATEGORIES;

// Get a specific category by ID
export const getCategoryById = (categoryId) => 
  COMPLIANCE_CATEGORIES.find(cat => cat.id === categoryId);

// Get all subcategories for a specific category
export const getSubcategoriesByCategoryId = (categoryId) => {
  const category = getCategoryById(categoryId);
  return category ? category.subcategories : [];
};

// Get a specific subcategory by category and subcategory ID
export const getSubcategoryById = (categoryId, subcategoryId) => {
  const subcategories = getSubcategoriesByCategoryId(categoryId);
  return subcategories.find(sub => sub.id === subcategoryId);
};

// Get all items for a specific subcategory
export const getItemsBySubcategoryId = (categoryId, subcategoryId) => {
  const subcategory = getSubcategoryById(categoryId, subcategoryId);
  return subcategory ? subcategory.items : [];
};

// Search across all categories and subcategories
export const searchCompliance = (searchTerm) => {
  const term = searchTerm.toLowerCase().trim();
  if (!term) return COMPLIANCE_CATEGORIES;

  return COMPLIANCE_CATEGORIES.map(category => {
    const matchingSubcategories = category.subcategories.map(subcategory => {
      const matchingItems = subcategory.items.filter(item =>
        item.name.toLowerCase().includes(term) ||
        item.tags.some(tag => tag.toLowerCase().includes(term))
      );

      const subcategoryMatches = 
        subcategory.name.toLowerCase().includes(term) ||
        subcategory.description.toLowerCase().includes(term);

      if (matchingItems.length > 0 || subcategoryMatches) {
        return {
          ...subcategory,
          items: matchingItems.length > 0 ? matchingItems : subcategory.items
        };
      }
      return null;
    }).filter(Boolean);

    const categoryMatches = 
      category.name.toLowerCase().includes(term) ||
      category.description.toLowerCase().includes(term);

    if (matchingSubcategories.length > 0 || categoryMatches) {
      return {
        ...category,
        subcategories: matchingSubcategories.length > 0 ? matchingSubcategories : category.subcategories
      };
    }
    return null;
  }).filter(Boolean);
};

// Get all tags across all items
export const getAllTags = () => {
  const tags = new Set();
  COMPLIANCE_CATEGORIES.forEach(category => {
    category.subcategories.forEach(subcategory => {
      subcategory.items.forEach(item => {
        item.tags.forEach(tag => tags.add(tag));
      });
    });
  });
  return Array.from(tags).sort();
};