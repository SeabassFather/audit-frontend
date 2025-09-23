// Comprehensive Module System based on AuditDNA Service Tree and Requirements
// This file contains all modules organized by major categories from the uploaded images

export const bankingFinanceModules = {
  id: "banking-finance",
  title: "Banking & Finance Modules", 
  description: "Complete financial services audit and compliance suite",
  icon: "Building2",
  status: "active",
  modules: [
    {
      id: "mortgage-audit",
      name: "Mortgage Loan Audit",
      description: "TILA/RESPA compliance, escrow analysis, fee validation",
      status: "active",
      features: ["Excess fee detection", "Escrow reconciliation", "TILA compliance check"],
      actionable: true,
      drillDownPath: "/modules/banking/mortgage-audit"
    },
    {
      id: "banking-fees",
      name: "Banking Fee Analysis",
      description: "Overdraft, NSF, and hidden fee auditing",
      status: "active", 
      features: ["Overdraft fee audit", "NSF analysis", "Chargeback disputes"],
      actionable: true,
      drillDownPath: "/modules/banking/fees"
    },
    {
      id: "credit-compliance",
      name: "Credit Card Compliance Review",
      description: "Rate changes, fee structures, regulatory compliance",
      status: "active",
      features: ["Rate compliance", "Fee structure analysis", "Terms validation"],
      actionable: true,
      drillDownPath: "/modules/banking/credit"
    },
    {
      id: "utilities-audit",
      name: "Utilities Audit System",
      description: "Gas, water, electric billing verification",
      status: "active",
      features: ["Rate verification", "Usage analysis", "Billing accuracy"],
      actionable: true,
      drillDownPath: "/modules/banking/utilities"
    },
    {
      id: "student-loans",
      name: "Student Loan Analysis",
      description: "Interest capitalization and servicer error detection",
      status: "active",
      features: ["Capitalization audit", "Servicer errors", "Payment tracking"],
      actionable: true,
      drillDownPath: "/modules/banking/student-loans"
    }
  ]
};

export const insuranceProtectionModules = {
  id: "insurance-protection",
  title: "Insurance & Protection Modules",
  description: "Comprehensive insurance audit and protection services",
  icon: "Shield",
  status: "active",
  modules: [
    {
      id: "insurance-premiums",
      name: "Insurance Premium Refunds",
      description: "Auto, home, life insurance premium analysis",
      status: "active",
      features: ["Premium calculation verification", "Coverage analysis", "Refund processing"],
      actionable: true,
      drillDownPath: "/modules/insurance/premiums"
    },
    {
      id: "claims-audit",
      name: "Insurance Claims Audit",
      description: "Claims processing and denial analysis",
      status: "active",
      features: ["Claim validation", "Denial review", "Appeal preparation"],
      actionable: true,
      drillDownPath: "/modules/insurance/claims"
    },
    {
      id: "policy-compliance",
      name: "Policy Compliance Review",
      description: "Insurance policy terms and regulatory compliance",
      status: "active",
      features: ["Policy term analysis", "State compliance", "Coverage gaps"],
      actionable: true,
      drillDownPath: "/modules/insurance/compliance"
    }
  ]
};

export const healthcareMedicalModules = {
  id: "healthcare-medical",
  title: "Healthcare & Medical Modules",
  description: "Medical billing, lab results, and healthcare audit suite",
  icon: "Heart",
  status: "active",
  modules: [
    {
      id: "medical-billing",
      name: "Medical Bill Overcharge Review",
      description: "CPT/ICD code validation and billing accuracy",
      status: "active",
      features: ["CPT code validation", "Duplicate billing detection", "Upcoding analysis"],
      actionable: true,
      drillDownPath: "/modules/healthcare/billing"
    },
    {
      id: "lab-validation",
      name: "Lab Results Validation",
      description: "Water, soil, medical lab result verification",
      status: "active",
      features: ["Lab accuracy verification", "Reference range validation", "Quality control"],
      actionable: true,
      drillDownPath: "/modules/healthcare/lab"
    },
    {
      id: "medical-test-audit",
      name: "Medical Test Audit",
      description: "CBC, CMP, SpO2 trends and health monitoring",
      status: "active",
      features: ["Trend analysis", "Alert systems", "Health monitoring"],
      actionable: true,
      drillDownPath: "/modules/healthcare/tests"
    },
    {
      id: "oxygen-monitoring",
      name: "Oxygen Monitoring System",
      description: "SpO2 trend analysis and alert system",
      status: "active",
      features: ["Real-time monitoring", "Trend alerts", "Historical analysis"],
      actionable: true,
      drillDownPath: "/modules/healthcare/oxygen"
    }
  ]
};

export const realEstateModules = {
  id: "real-estate",
  title: "Real Estate Modules",
  description: "Property transactions, mortgage services, and real estate auditing",
  icon: "Home",
  status: "active",
  modules: [
    {
      id: "mexico-real-estate",
      name: "Mexico Real Estate Services",
      description: "Cross-border property purchase for US buyers",
      status: "active",
      features: ["Purchase guidance", "Legal compliance", "Financing options"],
      actionable: true,
      drillDownPath: "/modules/realestate/mexico"
    },
    {
      id: "mortgage-products",
      name: "Mortgage Products & Rates",
      description: "Rate comparison and mortgage product analysis",
      status: "active",
      features: ["Rate comparison", "Product analysis", "Qualification assessment"],
      actionable: true,
      drillDownPath: "/modules/realestate/mortgage"
    },
    {
      id: "property-search",
      name: "Property Search Engine",
      description: "Real estate search and market analysis",
      status: "active",
      features: ["Property search", "Market analysis", "Valuation tools"],
      actionable: true,
      drillDownPath: "/modules/realestate/search"
    },
    {
      id: "closing-audit",
      name: "Real Estate Closing Audit",
      description: "Closing cost analysis and fee verification",
      status: "active",
      features: ["Closing cost breakdown", "Fee validation", "Document review"],
      actionable: true,
      drillDownPath: "/modules/realestate/closing"
    }
  ]
};

export const securityIdentityModules = {
  id: "security-identity",
  title: "Security & Identity Modules",
  description: "KYC/AML, compliance, and identity verification systems",
  icon: "UserCheck",
  status: "active",
  modules: [
    {
      id: "kyc-aml",
      name: "KYC/AML Compliance",
      description: "Know Your Customer and Anti-Money Laundering verification",
      status: "active",
      features: ["Identity verification", "AML screening", "Risk assessment"],
      actionable: true,
      drillDownPath: "/modules/security/kyc-aml"
    },
    {
      id: "ofac-sanctions",
      name: "OFAC & Sanctions Screening",
      description: "Sanctions list screening and compliance",
      status: "active",
      features: ["OFAC screening", "Sanctions checking", "Compliance reporting"],
      actionable: true,
      drillDownPath: "/modules/security/sanctions"
    },
    {
      id: "gdpr-ccpa",
      name: "GDPR/CCPA Compliance",
      description: "Privacy regulation compliance and data protection",
      status: "active",
      features: ["Privacy compliance", "Data protection", "Consent management"],
      actionable: true,
      drillDownPath: "/modules/security/privacy"
    },
    {
      id: "pci-dss",
      name: "PCI-DSS Compliance",
      description: "Payment card industry data security standards",
      status: "active",
      features: ["Security assessment", "Compliance validation", "Risk mitigation"],
      actionable: true,
      drillDownPath: "/modules/security/pci"
    }
  ]
};

export const legalDocumentationSystem = {
  id: "legal-documentation",
  title: "Legal Documentation System",
  description: "Contract audits, CFPB complaints, and legal compliance tools",
  icon: "Scale",
  status: "active",
  modules: [
    {
      id: "contract-audit",
      name: "Contract Audit System",
      description: "Legal contract analysis and compliance verification",
      status: "active",
      features: ["Contract analysis", "Compliance checking", "Risk identification"],
      actionable: true,
      drillDownPath: "/modules/legal/contracts"
    },
    {
      id: "cfpb-complaints",
      name: "CFPB Complaint System",
      description: "Automated complaint generation and tracking",
      status: "active",
      features: ["Complaint generation", "Filing automation", "Status tracking"],
      actionable: true,
      drillDownPath: "/modules/legal/cfpb"
    },
    {
      id: "ucc-tracking",
      name: "UCC Tracking System",
      description: "Uniform Commercial Code filing and tracking",
      status: "active",
      features: ["UCC filing", "Status tracking", "Notification system"],
      actionable: true,
      drillDownPath: "/modules/legal/ucc"
    },
    {
      id: "attorney-tools",
      name: "Attorney Tools Suite",
      description: "Legal filing audits and case preparation",
      status: "active",
      features: ["Filing audits", "Case preparation", "Document generation"],
      actionable: true,
      drillDownPath: "/modules/legal/attorney"
    },
    {
      id: "patent-management",
      name: "Patent Strategy & Portfolio",
      description: "Intellectual property management and strategy",
      status: "active",
      features: ["Patent tracking", "Portfolio analysis", "Strategy planning"],
      actionable: true,
      drillDownPath: "/modules/legal/patents"
    }
  ]
};

// Core Functionality Modules (ASAP Priority)
export const coreFunctionalityModules = {
  id: "core-functionality",
  title: "Core Functionality Modules (ASAP)",
  description: "Essential operational modules requiring immediate deployment",
  icon: "Zap",
  status: "priority",
  priority: "ASAP",
  modules: [
    {
      id: "authentication",
      name: "Authentication & Authorization",
      description: "JWT, OAuth2, multi-factor authentication",
      status: "active",
      priority: "ASAP",
      features: ["JWT tokens", "OAuth2 integration", "MFA support"],
      actionable: true,
      drillDownPath: "/modules/core/auth"
    },
    {
      id: "document-management",
      name: "Document Management System",
      description: "OCR, S3 storage, PDF/CSV processing, QR codes",
      status: "active",
      priority: "ASAP",
      features: ["OCR processing", "Cloud storage", "Format conversion"],
      actionable: true,
      drillDownPath: "/modules/core/documents"
    },
    {
      id: "audit-chain",
      name: "Audit Chain Processor",
      description: "OCR → AI Validation → Rules Engine pipeline",
      status: "active",
      priority: "ASAP",
      features: ["OCR processing", "AI validation", "Rules engine"],
      actionable: true,
      drillDownPath: "/modules/core/audit-chain"
    },
    {
      id: "notification-system",
      name: "Notification System",
      description: "Email, SMS, calendar integration",
      status: "active",
      priority: "ASAP",
      features: ["Email notifications", "SMS alerts", "Calendar sync"],
      actionable: true,
      drillDownPath: "/modules/core/notifications"
    }
  ]
};

// All comprehensive modules combined
export const comprehensiveModules = [
  bankingFinanceModules,
  insuranceProtectionModules,
  healthcareMedicalModules,
  realEstateModules,
  securityIdentityModules,
  legalDocumentationSystem,
  coreFunctionalityModules
];