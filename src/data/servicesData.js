// Comprehensive services data for all modules
export const serviceCategories = [
  {
    id: "mortgage",
    title: "Mortgage & Lending Services",
    icon: "Home",
    description: "Complete mortgage auditing, compliance, and lending solutions",
    color: "bg-gradient-to-r from-emerald-500 to-green-600",
    services: [
      {
        id: "M001",
        name: "Purchase Loan Auditing",
        description: "Comprehensive auditing for conforming and jumbo purchase loans",
        route: "/services/mortgage/purchase",
        features: ["TRID Compliance", "Income Verification", "Asset Documentation"],
        price: "$850"
      },
      {
        id: "M002",
        name: "Refinance & Cash-Out Review",
        description: "Detailed review of refinance and cash-out refinance transactions",
        route: "/services/mortgage/refinance",
        features: ["Rate Analysis", "LTV Calculations", "Benefit Analysis"],
        price: "$750"
      },
      {
        id: "M003",
        name: "HELOC & Second Mortgage",
        description: "Home equity line of credit and second mortgage auditing",
        route: "/services/mortgage/heloc",
        features: ["Equity Assessment", "Payment Analysis", "Risk Evaluation"],
        price: "$650"
      },
      {
        id: "M004",
        name: "FHA/VA/USDA Loans",
        description: "Government-backed loan program compliance and auditing",
        route: "/services/mortgage/government",
        features: ["Program Compliance", "Eligibility Verification", "Documentation Review"],
        price: "$950"
      }
    ]
  },
  {
    id: "agriculture",
    title: "Agriculture & AgriTrade",
    icon: "Wheat",
    description: "Agricultural marketplace, pricing, and trade finance solutions",
    color: "bg-gradient-to-r from-lime-500 to-green-500",
    services: [
      {
        id: "A001",
        name: "USDA Pricing Analytics",
        description: "5-year historical pricing data and market analysis",
        route: "/services/agriculture/usda-pricing",
        features: ["Historical Data", "Price Forecasting", "Market Trends"],
        price: "$125/month"
      },
      {
        id: "A002",
        name: "Produce Marketplace",
        description: "B2B marketplace connecting growers and buyers",
        route: "/services/agriculture/marketplace",
        features: ["Direct Connections", "Quality Assurance", "Logistics Support"],
        price: "Commission-based"
      },
      {
        id: "A003",
        name: "GrowerBuyer Matching",
        description: "AI-powered matching system for agricultural partnerships",
        route: "/services/agriculture/matching",
        features: ["AI Matching", "Contract Templates", "Performance Tracking"],
        price: "$200/match"
      },
      {
        id: "A004",
        name: "Agricultural Factoring",
        description: "Invoice factoring and equipment financing for agriculture",
        route: "/services/agriculture/factoring",
        features: ["Quick Funding", "Equipment Loans", "Seasonal Support"],
        price: "3.5% factor rate"
      }
    ]
  },
  {
    id: "cross-border",
    title: "Cross-Border Mexico/US",
    icon: "Globe",
    description: "International lending and real estate solutions",
    color: "bg-gradient-to-r from-blue-500 to-cyan-600",
    services: [
      {
        id: "CB001",
        name: "Mexico Real Estate Loans",
        description: "Financing for US buyers purchasing in Mexico",
        route: "/services/cross-border/real-estate",
        features: ["Fideicomiso Support", "Currency Exchange", "Legal Compliance"],
        price: "Custom pricing"
      },
      {
        id: "CB002",
        name: "Estero Beach Projects",
        description: "Specialized financing for Estero Beach developments",
        route: "/services/cross-border/estero-beach",
        features: ["Developer Partnerships", "Leasehold Financing", "Project Oversight"],
        price: "Varies by project"
      },
      {
        id: "CB003",
        name: "Cross-Border Compliance",
        description: "Regulatory compliance for international transactions",
        route: "/services/cross-border/compliance",
        features: ["KYC/KYB Verification", "Anti-Money Laundering", "Regulatory Filing"],
        price: "$500 per transaction"
      }
    ]
  },
  {
    id: "audit-engines",
    title: "AI Audit Engines",
    icon: "Cpu",
    description: "Advanced AI-powered auditing and analysis tools",
    color: "bg-gradient-to-r from-purple-500 to-indigo-600",
    services: [
      {
        id: "AE001",
        name: "Document OCR & Analysis",
        description: "AI-powered document scanning and analysis",
        route: "/services/audit-engines/ocr",
        features: ["Text Extraction", "Data Validation", "Fraud Detection"],
        price: "$0.50 per document"
      },
      {
        id: "AE002",
        name: "Facial Recognition KYC",
        description: "Identity verification through facial recognition",
        route: "/services/audit-engines/facial-recognition",
        features: ["Live Detection", "Document Matching", "Fraud Prevention"],
        price: "$2.00 per verification"
      },
      {
        id: "AE003",
        name: "Auto Loan Auditing",
        description: "Automated auditing for auto loan portfolios",
        route: "/services/audit-engines/auto-loans",
        features: ["Portfolio Analysis", "Risk Assessment", "Compliance Check"],
        price: "$1,200 per portfolio"
      }
    ]
  },
  {
    id: "compliance",
    title: "Compliance & Privacy",
    icon: "Shield",
    description: "Global privacy compliance and regulatory management",
    color: "bg-gradient-to-r from-red-500 to-pink-600",
    services: [
      {
        id: "C001",
        name: "CCPA/CPRA Compliance",
        description: "California privacy law compliance management",
        route: "/services/compliance/ccpa",
        features: ["DSAR Handling", "Data Mapping", "Policy Generation"],
        price: "$2,500/setup + $500/month"
      },
      {
        id: "C002",
        name: "GDPR Management",
        description: "European data protection regulation compliance",
        route: "/services/compliance/gdpr",
        features: ["EU Representative", "Data Processing Records", "Breach Management"],
        price: "$3,500/setup + $750/month"
      },
      {
        id: "C003",
        name: "Global Privacy Dashboard",
        description: "Centralized privacy management across jurisdictions",
        route: "/services/compliance/global",
        features: ["Multi-Jurisdiction", "Automated Reporting", "Risk Dashboard"],
        price: "$5,000/setup + $1,200/month"
      }
    ]
  },
  {
    id: "marketing",
    title: "Marketing & Business Tools",
    icon: "TrendingUp",
    description: "Marketing automation and business development tools",
    color: "bg-gradient-to-r from-orange-500 to-red-500",
    services: [
      {
        id: "MK001",
        name: "Lead Generation",
        description: "Automated lead generation and qualification",
        route: "/services/marketing/leads",
        features: ["Multi-Channel Campaigns", "Lead Scoring", "CRM Integration"],
        price: "$300/month"
      },
      {
        id: "MK002",
        name: "Pitch Deck Builder",
        description: "Professional pitch deck creation and management",
        route: "/services/marketing/pitch-deck",
        features: ["Templates", "Analytics", "Collaboration Tools"],
        price: "$150/month"
      },
      {
        id: "MK003",
        name: "Client Portal",
        description: "Branded client portal and communication platform",
        route: "/services/marketing/client-portal",
        features: ["Custom Branding", "Secure Messaging", "Document Sharing"],
        price: "$250/month"
      }
    ]
  }
];

export const featuredServices = [
  {
    id: "featured-1",
    category: "mortgage",
    name: "Complete Mortgage Audit Suite",
    description: "End-to-end mortgage auditing with AI-powered analysis",
    price: "$2,500",
    features: ["Full Documentation Review", "Compliance Verification", "Risk Assessment", "Detailed Reporting"],
    popular: true
  },
  {
    id: "featured-2",
    category: "cross-border",
    name: "Mexico Real Estate Package",
    description: "Comprehensive solution for US buyers in Mexican real estate",
    price: "Custom",
    features: ["Legal Compliance", "Financing Options", "Currency Management", "Project Oversight"],
    popular: false
  },
  {
    id: "featured-3",
    category: "agriculture",
    name: "AgriTrade Complete",
    description: "Full agriculture marketplace and financing solution",
    price: "$500/month",
    features: ["Marketplace Access", "Pricing Analytics", "Trade Financing", "Quality Assurance"],
    popular: true
  }
];
