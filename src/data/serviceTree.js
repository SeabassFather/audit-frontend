const serviceTree = [
  {
    slug: "mortgages",
    title: "Mortgage & Real Estate",
    description: "Escrow, PMI, TILA/RESPA, servicing transfers.",
    services: [
      { title: "Mortgage Loan Audit", desc: "Full TILA/RESPA compliance sweep." },
      { title: "Escrow Fee Reconciliation", desc: "Tax/insurance escrow accuracy check." },
      { title: "Promissory Note Audit", desc: "Note terms vs. disclosures." },
      { title: "Servicing Audit", desc: "Transfer, payment, and payoff accuracy." },
      { title: "PMI Removal Audit", desc: "Validate trigger/termination rules." },
      { title: "Title Insurance Overcharge Review", desc: "Fee schedule & policy review." }
    ]
  },
  {
    slug: "banking",
    title: "Banking & Credit",
    description: "Fees, interest calculations, card charges.",
    services: [
      { title: "Credit Card Rate / Fee Compliance Review", desc: "APR & fee legality." },
      { title: "NSF / Overdraft Fee Analysis", desc: "Policy vs. posting order." },
      { title: "Wire & Transfer Overcharge Review", desc: "Domestic & intl transfers." },
      { title: "Account Maintenance Fee Review", desc: "Eligibility/waiver checks." }
    ]
  },
  {
    slug: "auto-student",
    title: "Auto & Student Loans",
    description: "Dealer, lender, and servicer practices.",
    services: [
      { title: "Auto Loan Audit", desc: "BHPH/lender abuse, add-ons, GAP." },
      { title: "Student Loan Overcharge Analysis", desc: "Capitalization & servicer errors." },
      { title: "Wage Garnishment Review", desc: "Compliance & amounts." }
    ]
  },
  {
    slug: "utilities-telecom",
    title: "Utilities & Telecom",
    description: "Electric, water, gas, internet, mobile.",
    services: [
      { title: "Utilities Audit (Gas/Water/Electric)", desc: "Metering & billing." },
      { title: "Internet & Cell Phone Overcharges", desc: "Plan vs. bill, throttling." },
      { title: "Equipment Rental Fee Review", desc: "Modem/router/TV boxes." }
    ]
  },
  {
    slug: "insurance",
    title: "Insurance",
    description: "Premiums, refunds, and coverage errors.",
    services: [
      { title: "Insurance Premium Refunds", desc: "Unearned premium detection." },
      { title: "GAP Insurance Verification", desc: "Auto finance add-on accuracy." }
    ]
  },
  {
    slug: "medical",
    title: "Medical Bills",
    description: "Provider billing, duplicates, out-of-network.",
    services: [
      { title: "Medical Bill Overcharge Review", desc: "Coding, duplicates, balance billing." }
    ]
  },
  {
    slug: "retirement",
    title: "Retirement & Investments",
    description: "Hidden fees & fiduciary compliance.",
    services: [
      { title: "401(k) & Retirement Plan Audit", desc: "Fee benchmarking, ERISA checks." }
    ]
  },
  {
    slug: "digital",
    title: "Digital Payments & Subscriptions",
    description: "Apps, streaming, P2P payment disputes.",
    services: [
      { title: "Subscription / App Fee Audit", desc: "Apple/Google/OTT bundles." },
      { title: "Zelle/Venmo/CashApp Recovery", desc: "Error tracking & disputes." }
    ]
  },
  {
    slug: "elder-military",
    title: "Elder & Military",
    description: "Special protections and reviews.",
    services: [
      { title: "Elder Financial Abuse Scan", desc: "Patterns & solicitations." },
      { title: "Military & Veteran Financial Review", desc: "SCRA/MLA benefits." }
    ]
  },
  {
    slug: "unclaimed",
    title: "Unclaimed Property",
    description: "Search & recovery across registries.",
    services: [
      { title: "Unclaimed Property Search & Recovery", desc: "State & federal sources." }
    ]
  }
];
export default serviceTree;