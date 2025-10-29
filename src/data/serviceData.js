export const CATEGORIES = [
  {
    key: "consumer",
    title: "Consumer Protection",
    services: [
      {
        id: "CS001",
        name: "Mortgage Loan Audit",
        desc: "Compliance + math audit of note, TIL/RESPA, amortization, APR vs APOR.",
      },
      {
        id: "CS002",
        name: "Escrow Fee Reconciliation",
        desc: "Tax/insurance escrow analysis, shortages, over-collections, refund calc.",
      },
      {
        id: "CS003",
        name: "Promissory Note Audit",
        desc: "Truth-in-lending, usury, signature/authenticity checks.",
      },
      {
        id: "CS004",
        name: "Servicing Audit",
        desc: "Payment application, suspense, late fee legality, RESPA timelines.",
      },
      {
        id: "CS005",
        name: "Insurance Premium Refunds",
        desc: "Force-placed/duplicated coverages, pro-rata refunds.",
      },
      {
        id: "CS006",
        name: "Utilities Bill Audit",
        desc: "Gas/Water/Electric rate errors & refunds.",
      },
      {
        id: "CS007",
        name: "Internet & Mobile Overcharges",
        desc: "Plan misquotes, throttling, junk fees.",
      },
      {
        id: "CS008",
        name: "CFPB Complaint Trigger",
        desc: "Draft/submit; track responses.",
      },
      {
        id: "CS009",
        name: "Military/Veteran Financial Review",
        desc: "SCRA protections, caps, refunds.",
      },
      {
        id: "CS010",
        name: "Credit Report Clean-up",
        desc: "Dispute builder, validation letters.",
      },
    ],
  },
  {
    key: "mortgage",
    title: "Mortgage & Lending",
    services: [
      {
        id: "ML001",
        name: "Lender Match Engine",
        desc: "Purchase, Refi, Cash-Out, HELOC matching.",
      },
      {
        id: "ML002",
        name: "Underwriting Prep",
        desc: "Checklist, TRID docs, conditions tracker.",
      },
      {
        id: "ML003",
        name: "Rate/Lock Audit",
        desc: "Lock terms, extension fees, re-lock math.",
      },
      {
        id: "ML004",
        name: "Loan Estimate / CD Review",
        desc: "Fee accuracy, tolerance cures, prorations.",
      },
      {
        id: "ML005",
        name: "Servicer Transfer Audit",
        desc: "Payment misapplies across transfers.",
      },
    ],
  },
  {
    key: "agri",
    title: "Agriculture & Trade",
    services: [
      {
        id: "AG001",
        name: "Produce Market Explorer",
        desc: "Historical price trends; compare & export.",
      },
      {
        id: "AG002",
        name: "USDA Pricing & Volume",
        desc: "Commodity drilldowns by market/variety/grade.",
      },
      {
        id: "AG003",
        name: "Organic/Certification Lookup",
        desc: "USDA Organic, Primus, GlobalG.A.P.",
      },
      {
        id: "AG004",
        name: "Factoring & PO Finance",
        desc: "Invoice factoring, advances, term sheets.",
      },
      {
        id: "AG005",
        name: "Logistics & Cold Chain",
        desc: "Temp trace, chain-of-custody, claims.",
      },
      {
        id: "AG006",
        name: "Import/Export Docs",
        desc: "Phyto, FDA Prior Notice, customs packets.",
      },
    ],
  },
  {
    key: "legal",
    title: "Legal & Disputes",
    services: [
      {
        id: "LG001",
        name: "Debt Validation Letters",
        desc: "FDCPA 809 demand set.",
      },
      {
        id: "LG002",
        name: "UCC Demand/Notice Pack",
        desc: "State notices scaffold.",
      },
      {
        id: "LG003",
        name: "Pre-Arbitration File",
        desc: "Timeline, exhibits, damages summary.",
      },
    ],
  },
  {
    key: "insurance",
    title: "Insurance",
    services: [
      {
        id: "IN001",
        name: "Premium Audit",
        desc: "Overcharge discovery & refunds.",
      },
      {
        id: "IN002",
        name: "Claim Denial Review",
        desc: "Policy language challenge pack.",
      },
    ],
  },
  {
    key: "medical",
    title: "Medical & Student",
    services: [
      {
        id: "MD001",
        name: "Medical Billing Audit",
        desc: "CPT/ICD upcoding detection.",
      },
      {
        id: "MD002",
        name: "Student Loan Analysis",
        desc: "Repayment fit, capitalization errors.",
      },
    ],
  },
  {
    key: "biz",
    title: "Business & Compliance",
    services: [
      {
        id: "BZ001",
        name: "Entity & License Checklist",
        desc: "Formation docs, licenses.",
      },
      {
        id: "BZ002",
        name: "KYC/AML Pack",
        desc: "Policy templates, risk matrix.",
      },
    ],
  },
  {
    key: "elite",
    title: "AuditDNA Elite",
    services: [
      {
        id: "EL001",
        name: "Priority Triage",
        desc: "Fast-lane intake, SLA response.",
      },
      {
        id: "EL002",
        name: "Advanced Analytics",
        desc: "Custom dashboards & exports.",
      },
      {
        id: "EL003",
        name: "White-Glove Onboarding",
        desc: "Migration & concierge support.",
      },
    ],
  },
];

export const ALL_SERVICES = CATEGORIES.flatMap((c) =>
  c.services.map((s) => ({ ...s, category: c.title, catKey: c.key })),
);
