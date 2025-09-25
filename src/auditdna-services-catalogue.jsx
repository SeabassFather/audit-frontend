// AuditDNA Services Catalogue
// Categories: Consumer, Commercial, Agriculture, Elite
import { Building, Shield, Leaf, Crown, CreditCard, DollarSign, TrendingUp, FileText, Users, Globe } from "lucide-react";

const servicesCatalogue = [
  {
    key: "consumer",
    label: "Consumer Services",
    color: "#00ff88",
    icon: <CreditCard size={22} />,
    services: [
      "Mortgage Loan Audit",
      "Escrow Fee Reconciliation", 
      "Promissory Note Audit",
      "Credit Card Fee Review",
      "Auto Loan Audit",
      "Student Loan Review",
      "Banking Fee Analysis",
      "Insurance Premium Review"
    ]
  },
  {
    key: "commercial", 
    label: "Commercial Services",
    color: "#4a96ff",
    icon: <Building size={22} />,
    services: [
      "Commercial Loan Audit",
      "Cash Management Review",
      "Business Credit Analysis", 
      "Equipment Financing Review",
      "Commercial Real Estate Audit",
      "Trade Finance Review"
    ]
  },
  {
    key: "agriculture",
    label: "Agriculture Services", 
    color: "#84cc16",
    icon: <Leaf size={22} />,
    services: [
      "Farm Loan Audit",
      "Crop Insurance Review",
      "USDA Program Compliance",
      "Agricultural Equipment Financing",
      "Commodity Price Analysis",
      "Water Rights Review",
      "Cross-Border Factoring (MXUSA)"
    ]
  },
  {
    key: "elite",
    label: "Elite Services",
    color: "#ffb347", 
    icon: <Crown size={22} />,
    services: [
      "Escrow Auditing & Compliance",
      "Trust Account Review",
      "Fiduciary Compliance Audit",
      "Regulatory Compliance Review",
      "Risk Management Assessment",
      "Internal Controls Review"
    ]
  }
];

export default servicesCatalogue;