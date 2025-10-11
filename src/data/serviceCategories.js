cd "C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend\src\data"

@'
export const serviceCategories = {
  mortgage: [
    "Mortgage Loan Audit",
    "Escrow Fee Reconciliation", 
    "Escrow Account Analysis",
    "Title Insurance Audit",
    "Property Tax Assessment Review",
    "Homeowners Insurance Premium Audit",
    "PMI Removal Analysis",
    "Promissory Note Audit",
    "Servicing Audit",
    "TRID Compliance Review",
    "QM/ATR Documentation Review",
    "Appraisal Independence Review",
    "FHA Loan File Review",
    "VA Loan Compliance Audit",
    "HMDA Data Integrity Review",
    "Mortgage Servicing Transfer Audit"
  ],
  consumer: [
    "Auto Loan Audit",
    "Student Loan Overcharge Analysis",
    "Credit Card Rate/Fee Compliance",
    "Subscription Fee Audit",
    "Medical Bill Overcharge Review",
    "Utilities Audit (Gas/Water/Electric)",
    "Internet & Cell Phone Overcharges",
    "Insurance Premium Refunds",
    "401(k) Fee Audit",
    "Elder Financial Abuse Scan",
    "CFPB Complaint Filing"
  ],
  agriculture: [
    "USDA Subsidy Audit",
    "Farm Credit Compliance",
    "Organic Certification Review",
    "Produce Safety Rule Audit",
    "Agricultural Loan Review"
  ],
  factoring: [
    "Invoice Verification Audit",
    "UCC Filing Compliance",
    "Debtor Credit Analysis",
    "Advance Rate Optimization",
    "Collections Process Audit"
  ],
  legal: [
    "GDPR Compliance Assessment",
    "CCPA/CPRA Audit",
    "AML Program Review",
    "BSA Compliance Audit",
    "OFAC Sanctions Screening",
    "SOC 2 Compliance",
    "Contract Review"
  ]
};
'@ | Set-Content -Encoding utf8 serviceCategories.js


