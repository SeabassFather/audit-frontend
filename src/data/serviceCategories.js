export const serviceCategories = [
  {
    section: "Mortgage & Real Estate",
    icon: "ðŸ ",
    description: "Escrow, PMI, TILA/RESPA, servicing transfers.",
    modules: [
      { label: "Mortgage Loan Audit", to: "/audit/mortgage-loan" },
      { label: "Escrow Fee Reconciliation", to: "/audit/escrow-fee" },
      { label: "Promissory Note Audit", to: "/audit/promissory-note" },
      { label: "Servicing Audit", to: "/audit/servicing" },
      { label: "PMI Removal Audit", to: "/audit/pmi-removal" },
      { label: "Title Insurance Overcharge Review", to: "/audit/title-overcharge" }
    ]
  },
  {
    section: "Banking & Credit",
    icon: "ðŸ’³",
    description: "Fees, interest, calculations, chargebacks.",
    modules: [
      { label: "Credit Card Rate/Fee Compliance Review", to: "/audit/credit-card-fee" },
      { label: "NSF/Overdraft Fee Analysis", to: "/audit/nsf-overdraft" },
      { label: "Wire & Transfer Overcharge Review", to: "/audit/wire-transfer" },
      { label: "Account Maintenance Fee Review", to: "/audit/account-maintenance" }
    ]
  },
  {
    section: "Auto & Student Loans",
    icon: "ðŸš—",
    description: "Dealer, lender, servicer practices.",
    modules: [
      { label: "Auto Loan Audit", to: "/audit/auto-loan" },
      { label: "Student Loan Overcharge Analysis", to: "/audit/student-loan" },
      { label: "Wage Garnishment Review", to: "/audit/wage-garnishment" }
    ]
  },
  {
    section: "Utilities & Telecom",
    icon: "ðŸ“¡",
    description: "Electric, water, gas, internet, mobile.",
    modules: [
      { label: "Utilities Audit (Gas/Water/Electric)", to: "/audit/utilities" },
      { label: "Internet & Cell Phone Overcharges", to: "/audit/internet-cell" },
      { label: "Equipment Rental Fee Review", to: "/audit/equipment-rental" }
    ]
  },
  {
    section: "Insurance",
    icon: "ðŸ›¡ï¸",
    description: "Premiums, refunds, coverage errors.",
    modules: [
      { label: "Insurance Premium Refunds", to: "/audit/insurance-refund" },
      { label: "GAP Insurance Verification", to: "/audit/gap-insurance" }
    ]
  },
  {
    section: "Medical Bills",
    icon: "ðŸ©º",
    description: "Billing errors, duplicates, out-of-network.",
    modules: [
      { label: "Medical Bill Overcharge Review", to: "/audit/medical-bill" }
    ]
  },
  {
    section: "Retirement & Investments",
    icon: "ðŸ’¼",
    description: "401(k), fees, fiduciary compliance.",
    modules: [
      { label: "401(k) & Retirement Plan Audit", to: "/audit/retirement-plan" }
    ]
  },
  {
    section: "Digital Payments & Subscriptions",
    icon: "ðŸ’¸",
    description: "Apps, streaming, P2P disputes.",
    modules: [
      { label: "Subscription / App Fee Audit", to: "/audit/app-fee" },
      { label: "Zelle/Venmo/CashApp Recovery", to: "/audit/payment-recovery" }
    ]
  },
  {
    section: "Elder & Military",
    icon: "ðŸŽ–ï¸",
    description: "Special protections and reviews.",
    modules: [
      { label: "Elder Financial Abuse Scan", to: "/audit/elder-abuse" },
      { label: "Military & Veteran Financial Review", to: "/audit/military-veteran" }
    ]
  },
  {
    section: "Unclaimed Property",
    icon: "ðŸ¦",
    description: "Search & recovery across registries.",
    modules: [
      { label: "Unclaimed Property Search & Recovery", to: "/audit/unclaimed-property" }
    ]
  }
];
