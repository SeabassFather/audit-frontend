export const ESCROW_AUDITING_DETAILS = {
  // ...
  "Escrow Fee Reconciliation": {
    brief: "Detailed review and reconciliation of escrow fees, shortages, and over-collections.",
    category: "Fee Analysis",
    priority: "High",
    timeframe: "1-2 days",
    process: [
      "Collect escrow statements and fee schedules",
      "Compare with regulatory/contractual requirements",
      "Identify discrepancies and calculate over/underpayments",
      "Document findings and recommendations"
    ],
    checklist: [
      { item: "All statements obtained", completed: false },
      { item: "Fee schedules reviewed", completed: false }
    ],
    deliverables: ["Escrow Fee Audit Report", "Refund/Collection Summary"],
    actionButtons: ["Start Audit", "Generate Report"]
  },
  // ...
}