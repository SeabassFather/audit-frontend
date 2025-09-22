export const AUDIT_CATEGORIES = [
  { id:'mortgage', label:'Mortgage Audits', items:[
    { id:'mortgage-fees', name:'Excess/Illegal Fees Review' },
    { id:'mortgage-escrow', name:'Escrow Analysis' },
    { id:'mortgage-tila-respa', name:'TILA/RESPA Compliance' }
  ]},
  { id:'banking', label:'Banking & Cards', items:[
    { id:'overdraft', name:'Overdraft Fee Audit' },
    { id:'nsf', name:'NSF/Returned Item Audit' },
    { id:'chargebacks', name:'Card Chargeback Disputes' }
  ]},
  { id:'medical', label:'Medical Billing', items:[
    { id:'medical-cpt', name:'CPT/ICD Code Validation' },
    { id:'medical-dupe', name:'Duplicate/Upcoding Review' }
  ]},
  { id:'remittance', label:'Remittance & Cross-Border', items:[
    { id:'fx-fees', name:'FX & Transfer Fee Audit' },
    { id:'mx-us', name:'MXâ†’US Remittance Compliance' }
  ]},
  { id:'student', label:'Student Loans', items:[
    { id:'capitalization', name:'Interest Capitalization Audit' },
    { id:'servicer-errors', name:'Servicer Error Review' }
  ]},
  { id:'compliance', label:'Compliance Checks', items:[
    { id:'kyc-aml', name:'KYC / AML' },
    { id:'ofac', name:'OFAC / Sanctions' },
    { id:'gdpr-ccpa', name:'GDPR / CCPA' },
    { id:'pci', name:'PCI-DSS' }
  ]}
];
