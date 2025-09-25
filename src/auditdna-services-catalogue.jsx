// AuditDNA Services Catalogue
// Categories: Consumer, Commercial, Agriculture, Elite
import { Building, Shield, Leaf, Crown, CreditCard, DollarSign, TrendingUp, FileText, Users, Globe, Home, Car, GraduationCap, Zap, HeartHandshake, Briefcase, Flag, Coins, Smartphone } from "lucide-react";

const servicesCatalogue = [
  {
    key: "consumer",
    label: "Consumer Services",
    color: "#00ff88",
    icon: <CreditCard size={22} />,
    subCategories: [
      {
        key: "mortgage-real-estate",
        label: "Mortgage & Real Estate",
        icon: <Home size={18} />,
        services: [
          "Mortgage Loan Audit",
          "Escrow Fee Reconciliation", 
          "Promissory Note Audit",
          "Servicing Audit",
          "PMI Removal Audit",
          "Title Insurance Overcharge Review",
          "TRID Compliance Review",
          "ECOA/Fair Lending Audit",
          "Appraisal Dispute & Rebuttal Helper",
          "Property Tax Overpayment Review"
        ]
      },
      {
        key: "banking-credit",
        label: "Banking & Credit",
        icon: <CreditCard size={18} />,
        services: [
          "Credit Card Rate/Fee Compliance Review",
          "NSF/Overdraft Fee Analysis",
          "Wire & Transfer Overcharge Review", 
          "Account Maintenance Fee Review",
          "Banking Fee Analysis",
          "Chargeback/Dispute Prep"
        ]
      },
      {
        key: "auto-student",
        label: "Auto & Student Loans",
        icon: <Car size={18} />,
        services: [
          "Auto Loan Audit",
          "Student Loan Overcharge Analysis",
          "Wage Garnishment Review"
        ]
      },
      {
        key: "utilities-telecom",
        label: "Utilities & Telecom",
        icon: <Zap size={18} />,
        services: [
          "Utilities Audit (Gas/Water/Electric)",
          "Internet & Cell Phone Overcharges",
          "Equipment Rental Fee Review"
        ]
      },
      {
        key: "insurance",
        label: "Insurance",
        icon: <Shield size={18} />,
        services: [
          "Insurance Premium Refunds",
          "GAP Insurance Verification"
        ]
      },
      {
        key: "digital-payments",
        label: "Digital Payments & Subscriptions",
        icon: <Smartphone size={18} />,
        services: [
          "Subscription / App Fee Audit",
          "Zelle/Venmo/CashApp Recovery"
        ]
      }
    ]
  },
  {
    key: "commercial", 
    label: "Commercial Services",
    color: "#4a96ff",
    icon: <Building size={22} />,
    subCategories: [
      {
        key: "business-lending",
        label: "Business Lending",
        icon: <DollarSign size={18} />,
        services: [
          "Commercial Loan Audit",
          "Equipment Financing Review",
          "Commercial Real Estate Audit",
          "SBA 7(a) & 504 Eligibility Screener",
          "Cash Management Review"
        ]
      },
      {
        key: "trade-finance",
        label: "Trade Finance",
        icon: <Globe size={18} />,
        services: [
          "Cross-Border Factoring (MXUSA)",
          "PO Financing Intake",
          "Invoice Factoring Eligibility",
          "AR Aging & Risk Flags",
          "UCC Filing Monitor",
          "Export Credit Insurance Prep"
        ]
      },
      {
        key: "business-operations",
        label: "Business Operations",
        icon: <Briefcase size={18} />,
        services: [
          "Business Credit Analysis",
          "Vendor Risk Register",
          "Payment Processor Fee Audit",
          "KYC/KYB Pack (Docs Collector)"
        ]
      }
    ]
  },
  {
    key: "agriculture",
    label: "Agriculture Services", 
    color: "#84cc16",
    icon: <Leaf size={22} />,
    subCategories: [
      {
        key: "farm-finance",
        label: "Farm Finance",
        icon: <DollarSign size={18} />,
        services: [
          "Farm Loan Audit",
          "Agricultural Equipment Financing",
          "USDA Program Compliance",
          "Cross-Border Factoring (MXUSA)"
        ]
      },
      {
        key: "ag-marketplace",
        label: "Ag Marketplace",
        icon: <TrendingUp size={18} />,
        services: [
          "Commodity Catalog (USDA codes)",
          "Grower Onboarding (KYC/KYB/GlobalG.A.P.)",
          "Quality & Grade Intake",
          "Market Bid/Ask Board",
          "Buyer Matchmaking",
          "Cold-Chain Checklist",
          "PACA Notice Helper"
        ]
      },
      {
        key: "compliance-insurance",
        label: "Compliance & Insurance",
        icon: <Shield size={18} />,
        services: [
          "Crop Insurance Review",
          "Water Rights Review",
          "Commodity Price Analysis",
          "Labeling & Country-of-Origin Audit",
          "Receiver Claim/Allowance Tracker"
        ]
      }
    ]
  },
  {
    key: "elite",
    label: "Elite Services",
    color: "#ffb347", 
    icon: <Crown size={22} />,
    subCategories: [
      {
        key: "escrow-compliance",
        label: "Escrow Auditing & Compliance",
        icon: <Shield size={18} />,
        services: [
          "Scope & Setup",
          "Core Trust-Accounting Controls",
          "AML/KYC", 
          "Testing Steps",
          "Calculations & Re-performance",
          "Document Review Checklist",
          "Red Flags",
          "Reporting & Remediation",
          "Roles & RACI",
          "Day-1 Starter Tests"
        ]
      },
      {
        key: "regulatory-compliance",
        label: "Regulatory Compliance",
        icon: <FileText size={18} />,
        services: [
          "CCPA/GDPR/GLBA Readiness",
          "AML / OFAC Checks (attest/record only)",
          "Record Retention Matrix",
          "Consent & Disclosures Hub",
          "Do-Not-Call / TCPA Audit",
          "Accessibility (WCAG) Checklist"
        ]
      },
      {
        key: "risk-management",
        label: "Risk Management",
        icon: <Flag size={18} />,
        services: [
          "Risk Management Assessment",
          "Internal Controls Review",
          "Vendor Risk Register",
          "Incident & Breach Triage Log",
          "Complaint Handling (CFPB/AG) Log"
        ]
      },
      {
        key: "trust-fiduciary",
        label: "Trust & Fiduciary",
        icon: <HeartHandshake size={18} />,
        services: [
          "Trust Account Review",
          "Fiduciary Compliance Audit",
          "Elder Financial Abuse Scan",
          "Military & Veteran Financial Review",
          "Unclaimed Property Search & Recovery"
        ]
      }
    ]
  }
];

export default servicesCatalogue;