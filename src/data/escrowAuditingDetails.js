// Escrow Auditing & Compliance - Detailed Process Steps and Checklists

export const ESCROW_AUDITING_DETAILS = {
  "Scope & Setup": {
    brief: "Define audit objectives, scope boundaries, and establish engagement parameters for escrow operations review.",
    category: "Planning & Preparation",
    priority: "Critical",
    timeframe: "1-2 days",
    process: [
      "Define audit objectives and scope boundaries",
      "Identify key stakeholders and audit team roles",
      "Establish timeline and resource requirements",
      "Review regulatory requirements and applicable standards",
      "Obtain necessary access rights and documentation",
      "Conduct preliminary risk assessment",
      "Document audit approach and methodology"
    ],
    checklist: [
      { item: "Audit charter signed and approved", completed: false },
      { item: "Engagement letter executed", completed: false },
      { item: "NDA and confidentiality agreements in place", completed: false },
      { item: "Access credentials and systems permissions obtained", completed: false },
      { item: "Key personnel interviews scheduled", completed: false },
      { item: "Document request list finalized", completed: false },
      { item: "Risk assessment framework established", completed: false }
    ],
    deliverables: ["Audit Charter", "Engagement Letter", "Risk Assessment Matrix", "Document Request List"],
    actionButtons: ["Start Scope Definition", "Schedule Kickoff Meeting", "Generate Document Request"]
  },

  "Core Trust-Accounting Controls": {
    brief: "Comprehensive review of trust account management, reconciliation processes, and accounting controls.",
    category: "Financial Controls",
    priority: "Critical",
    timeframe: "3-5 days",
    process: [
      "Review trust account setup and authorization procedures",
      "Examine segregation of client funds from operating accounts",
      "Test three-way reconciliation processes (bank, client ledger, general ledger)",
      "Validate interest calculations and distributions",
      "Review disbursement authorization and approval controls",
      "Test journal entry processes and supporting documentation",
      "Examine month-end close procedures and reporting"
    ],
    checklist: [
      { item: "Trust accounts properly established and designated", completed: false },
      { item: "Client funds segregated from operating funds", completed: false },
      { item: "Three-way reconciliations performed monthly", completed: false },
      { item: "Reconciliation variances investigated and resolved timely", completed: false },
      { item: "Interest calculations accurate and properly distributed", completed: false },
      { item: "Disbursement authorizations properly documented", completed: false },
      { item: "Journal entries supported with adequate documentation", completed: false },
      { item: "Month-end procedures documented and followed", completed: false }
    ],
    deliverables: ["Trust Account Analysis", "Reconciliation Testing Results", "Controls Assessment", "Exception Report"],
    actionButtons: ["Test Reconciliations", "Review Controls", "Generate Analysis Report"]
  },

  "AML/KYC": {
    brief: "Anti-Money Laundering and Know Your Customer compliance review and testing procedures.",
    category: "Compliance",
    priority: "Critical", 
    timeframe: "2-3 days",
    process: [
      "Review Customer Identification Program (CIP) procedures",
      "Test customer due diligence (CDD) processes",
      "Examine enhanced due diligence (EDD) for high-risk customers",
      "Review beneficial ownership identification procedures",
      "Test suspicious activity monitoring and reporting",
      "Validate OFAC and sanctions screening processes",
      "Review training and awareness programs"
    ],
    checklist: [
      { item: "Customer Identification Program documented and implemented", completed: false },
      { item: "Customer due diligence performed for all accounts", completed: false },
      { item: "Enhanced due diligence applied to high-risk customers", completed: false },
      { item: "Beneficial ownership information collected and verified", completed: false },
      { item: "Suspicious activity monitoring system operational", completed: false },
      { item: "OFAC screening performed on all transactions", completed: false },
      { item: "Staff AML training current and documented", completed: false },
      { item: "BSA compliance officer designated and qualified", completed: false }
    ],
    deliverables: ["AML Program Assessment", "CDD Testing Results", "SAR Filing Analysis", "Training Records Review"],
    actionButtons: ["Test CDD Procedures", "Review SAR Filings", "Validate OFAC Screening"]
  },

  "Testing Steps": {
    brief: "Systematic testing procedures for escrow operations, controls, and compliance requirements.",
    category: "Testing & Validation",
    priority: "High",
    timeframe: "4-6 days",
    process: [
      "Design test procedures based on risk assessment",
      "Select representative samples for testing",
      "Execute substantive testing of transactions",
      "Perform controls testing for key processes",
      "Test system controls and automated processes",
      "Validate data integrity and completeness",
      "Document test results and exceptions"
    ],
    checklist: [
      { item: "Test procedures designed and documented", completed: false },
      { item: "Sample sizes statistically appropriate", completed: false },
      { item: "Transaction testing completed for all material areas", completed: false },
      { item: "Controls testing performed and documented", completed: false },
      { item: "System controls validated", completed: false },
      { item: "Data integrity tests performed", completed: false },
      { item: "Exception tracking and resolution documented", completed: false }
    ],
    deliverables: ["Testing Procedures", "Sample Selection Documentation", "Test Results Summary", "Exception Log"],
    actionButtons: ["Execute Tests", "Review Results", "Track Exceptions"]
  },

  "Calculations & Re-performance": {
    brief: "Independent recalculation and verification of escrow account balances, interest, and disbursements.",
    category: "Analytical Procedures",
    priority: "High",
    timeframe: "2-4 days",
    process: [
      "Re-perform escrow balance calculations",
      "Validate interest calculations and accruals",
      "Recalculate disbursement amounts and timing",
      "Verify insurance and tax payment calculations",
      "Re-perform shortage and surplus calculations",
      "Validate escrow analysis accuracy",
      "Cross-reference with regulatory requirements"
    ],
    checklist: [
      { item: "Escrow balances recalculated and verified", completed: false },
      { item: "Interest calculations independently verified", completed: false },
      { item: "Disbursement calculations accurate", completed: false },
      { item: "Insurance payment calculations correct", completed: false },
      { item: "Tax payment calculations verified", completed: false },
      { item: "Shortage/surplus calculations accurate", completed: false },
      { item: "Escrow analyses comply with RESPA requirements", completed: false }
    ],
    deliverables: ["Calculation Workpapers", "Variance Analysis", "Recalculation Results", "Compliance Summary"],
    actionButtons: ["Perform Calculations", "Analyze Variances", "Validate Compliance"]
  },

  "Document Review Checklist": {
    brief: "Comprehensive review of escrow-related documentation for completeness and compliance.",
    category: "Documentation Review",
    priority: "Medium",
    timeframe: "2-3 days",
    process: [
      "Review escrow account opening documentation",
      "Examine initial escrow disclosures",
      "Validate annual escrow statements",
      "Review escrow shortage/surplus notices",
      "Examine disbursement authorizations",
      "Review customer correspondence",
      "Validate regulatory filings and reports"
    ],
    checklist: [
      { item: "Account opening documents complete", completed: false },
      { item: "Initial escrow disclosures provided", completed: false },
      { item: "Annual escrow statements issued timely", completed: false },
      { item: "Shortage/surplus notices properly formatted", completed: false },
      { item: "Disbursement authorizations documented", completed: false },
      { item: "Customer correspondence maintained", completed: false },
      { item: "Regulatory reports filed timely", completed: false }
    ],
    deliverables: ["Document Review Matrix", "Missing Documentation Report", "Compliance Summary", "Corrective Action Plan"],
    actionButtons: ["Review Documents", "Track Missing Items", "Generate Report"]
  },

  "Red Flags": {
    brief: "Identification and assessment of potential risk indicators and suspicious activities in escrow operations.",
    category: "Risk Assessment",
    priority: "Critical",
    timeframe: "1-2 days",
    process: [
      "Review transactions for unusual patterns",
      "Identify high-risk customer profiles",
      "Examine large or frequent cash transactions",
      "Review cross-border or international activities",
      "Analyze customer behavior patterns",
      "Investigate unexplained variances",
      "Document risk indicators and concerns"
    ],
    checklist: [
      { item: "Unusual transaction patterns identified", completed: false },
      { item: "High-risk customers flagged for review", completed: false },
      { item: "Large cash transactions investigated", completed: false },
      { item: "International activities reviewed", completed: false },
      { item: "Customer behavior anomalies documented", completed: false },
      { item: "Unexplained variances investigated", completed: false },
      { item: "Risk indicators escalated appropriately", completed: false }
    ],
    redFlags: [
      "Frequent large cash deposits or withdrawals",
      "Unusual payment sources or destinations",
      "Inconsistent customer information",
      "Rapid turnover of escrow accounts",
      "Unexplained account balances or shortages",
      "Missing or altered documentation",
      "Customer reluctance to provide information"
    ],
    deliverables: ["Red Flag Assessment", "Risk Indicator Report", "Investigation Summary", "Escalation Log"],
    actionButtons: ["Identify Red Flags", "Investigate Concerns", "Escalate Issues"]
  },

  "Reporting & Remediation": {
    brief: "Preparation of audit findings, recommendations, and remediation action plans.",
    category: "Reporting",
    priority: "High",
    timeframe: "2-3 days",
    process: [
      "Compile audit findings and observations",
      "Assess significance and impact of findings",
      "Develop recommendations for improvement",
      "Prepare formal audit report",
      "Present findings to management",
      "Develop remediation action plans",
      "Establish follow-up procedures"
    ],
    checklist: [
      { item: "All findings documented with evidence", completed: false },
      { item: "Risk ratings assigned to findings", completed: false },
      { item: "Recommendations developed for each finding", completed: false },
      { item: "Formal audit report prepared", completed: false },
      { item: "Management presentation conducted", completed: false },
      { item: "Action plans developed and agreed", completed: false },
      { item: "Follow-up schedule established", completed: false }
    ],
    deliverables: ["Audit Report", "Management Letter", "Action Plan", "Follow-up Schedule"],
    actionButtons: ["Generate Report", "Present Findings", "Track Actions"]
  },

  "Roles & RACI": {
    brief: "Definition of roles and responsibilities matrix (Responsible, Accountable, Consulted, Informed) for escrow audit process.",
    category: "Governance",
    priority: "Medium",
    timeframe: "1 day",
    process: [
      "Define audit team roles and responsibilities",
      "Establish client stakeholder responsibilities",
      "Create RACI matrix for audit activities",
      "Document escalation procedures",
      "Define decision-making authority",
      "Establish communication protocols",
      "Document approval processes"
    ],
    raciMatrix: [
      { activity: "Audit Planning", responsible: "Lead Auditor", accountable: "Audit Manager", consulted: "Client Management", informed: "Audit Committee" },
      { activity: "Testing Execution", responsible: "Audit Team", accountable: "Lead Auditor", consulted: "Process Owners", informed: "Audit Manager" },
      { activity: "Finding Documentation", responsible: "Audit Team", accountable: "Lead Auditor", consulted: "Client Staff", informed: "Audit Manager" },
      { activity: "Report Review", responsible: "Audit Manager", accountable: "Audit Director", consulted: "Lead Auditor", informed: "Client Management" }
    ],
    deliverables: ["RACI Matrix", "Role Definitions", "Escalation Procedures", "Communication Plan"],
    actionButtons: ["Define Roles", "Create RACI", "Document Procedures"]
  },

  "Day-1 Starter Tests": {
    brief: "Essential first-day testing procedures to quickly assess escrow operation health and identify critical issues.",
    category: "Quick Assessment",
    priority: "Critical",
    timeframe: "4-6 hours",
    process: [
      "Perform high-level account reconciliation",
      "Review recent month-end procedures",
      "Test sample of recent transactions",
      "Review exception reports and aging",
      "Validate key system controls",
      "Interview key personnel",
      "Document initial observations"
    ],
    quickTests: [
      { test: "Bank Reconciliation Review", description: "Review most recent bank reconciliation for completeness", duration: "30 min" },
      { test: "Trial Balance Validation", description: "Validate trust account trial balance ties to general ledger", duration: "45 min" },
      { test: "Transaction Sample", description: "Test 10 recent transactions for proper documentation", duration: "60 min" },
      { test: "Exception Report Review", description: "Review outstanding exceptions and aging", duration: "30 min" },
      { test: "System Access Test", description: "Validate system controls and user access", duration: "45 min" },
      { test: "Key Personnel Interview", description: "Brief interviews with escrow manager and staff", duration: "90 min" }
    ],
    deliverables: ["Day-1 Assessment", "Quick Test Results", "Initial Risk Assessment", "Priority Issues List"],
    actionButtons: ["Start Quick Tests", "Interview Staff", "Generate Day-1 Report"]
  }
};

export const getEscrowAuditDetail = (serviceName) => {
  return ESCROW_AUDITING_DETAILS[serviceName] || null;
};