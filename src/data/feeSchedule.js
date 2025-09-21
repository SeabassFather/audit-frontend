export const feeSchedule = [
  {
    category: "Agricultural Audits",
    services: [
      { service: "USDA Organic Certification", standardFee: "$850", expeditedFee: "$1,200", premiumFee: "$1,500" },
      { service: "GlobalGAP Compliance", standardFee: "$750", expeditedFee: "$1,050", premiumFee: "$1,300" },
      { service: "Food Safety Audit", standardFee: "$650", expeditedFee: "$925", premiumFee: "$1,150" },
      { service: "Soil & Water Testing", standardFee: "$450", expeditedFee: "$650", premiumFee: "$825" }
    ]
  },
  {
    category: "Financial Services", 
    services: [
      { service: "Financial Statement Review", standardFee: "$1,250", expeditedFee: "$1,750", premiumFee: "$2,200" },
      { service: "Payroll Reconciliation", standardFee: "$550", expeditedFee: "$775", premiumFee: "$975" },
      { service: "Tax Compliance Audit", standardFee: "$950", expeditedFee: "$1,350", premiumFee: "$1,675" },
      { service: "Internal Controls Assessment", standardFee: "$1,150", expeditedFee: "$1,600", premiumFee: "$2,000" }
    ]
  },
  {
    category: "Mortgage & Lending",
    services: [
      { service: "Loan File Review", standardFee: "$275", expeditedFee: "$385", premiumFee: "$485" },
      { service: "Appraisal Review", standardFee: "$195", expeditedFee: "$275", premiumFee: "$345" },
      { service: "Compliance Check", standardFee: "$325", expeditedFee: "$455", premiumFee: "$575" },
      { service: "Risk Assessment", standardFee: "$425", expeditedFee: "$595", premiumFee: "$745" }
    ]
  },
  {
    category: "Environmental",
    services: [
      { service: "Water Quality Analysis", standardFee: "$375", expeditedFee: "$525", premiumFee: "$665" },
      { service: "Soil Contamination Test", standardFee: "$425", expeditedFee: "$595", premiumFee: "$745" },
      { service: "Environmental Impact", standardFee: "$850", expeditedFee: "$1,200", premiumFee: "$1,500" },
      { service: "Remediation Planning", standardFee: "$1,150", expeditedFee: "$1,600", premiumFee: "$2,000" }
    ]
  },
  {
    category: "Equipment & Factoring",
    services: [
      { service: "Equipment Appraisal", standardFee: "$450", expeditedFee: "$650", premiumFee: "$825" },
      { service: "Invoice Factoring Review", standardFee: "$225", expeditedFee: "$315", premiumFee: "$395" },
      { service: "Credit Assessment", standardFee: "$175", expeditedFee: "$245", premiumFee: "$305" },
      { service: "Collateral Evaluation", standardFee: "$525", expeditedFee: "$735", premiumFee: "$925" }
    ]
  }
];

export const serviceTiers = {
  standard: {
    name: "Standard",
    timeline: "10-14 business days",
    features: ["Standard review process", "Email updates", "Digital delivery"]
  },
  expedited: {
    name: "Expedited", 
    timeline: "5-7 business days",
    features: ["Priority processing", "Phone updates", "Digital + express delivery"]
  },
  premium: {
    name: "Premium",
    timeline: "2-3 business days",
    features: ["Rush processing", "Real-time updates", "White-glove service", "Dedicated analyst"]
  }
};