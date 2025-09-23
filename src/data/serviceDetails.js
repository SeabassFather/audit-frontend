export const SERVICE_DETAILS = {
  "Mortgage Loan Audit": {
    brief: "Line-by-line review of loan file, disclosures, and servicing for compliance and refund opportunities.",
    tags: ["Mortgage","Compliance","Consumer"],
    docs: ["NDA (Mutual)","Borrower Consent","Document Request List"],
    form: [
      { name:"borrowerName", label:"Borrower Full Name", type:"text", required:true },
      { name:"loanNumber", label:"Loan Number", type:"text" },
      { name:"propertyAddress", label:"Property Address", type:"text" },
      { name:"loanType", label:"Loan Type", type:"select", options:["Conventional","FHA","VA","USDA","Other"] },
      { name:"closingDate", label:"Closing Date", type:"date" },
      { name:"issues", label:"Describe Issues/Concerns", type:"textarea" }
    ]
  },
  "Promissory Note Audit": {
    brief: "Validate principal, interest, amortization, riders, and assignments.",
    tags: ["Mortgage","Forensics"],
    docs: ["NDA (Mutual)","Note/Deed Copy"],
    form: [
      { name:"borrowerName", label:"Borrower Full Name", type:"text", required:true },
      { name:"noteDate", label:"Note Date", type:"date" },
      { name:"interestRate", label:"Interest Rate (%)", type:"number" },
      { name:"attachments", label:"Attachments Listed", type:"textarea" }
    ]
  },
  "Cross-Border Factoring (MXUSA)": {
    brief: "Invoice factoring intake for produce + cross-border shipments with PACA/KYC steps.",
    tags: ["Trade Finance","Ag","Factoring"],
    docs: ["KYC/KYB Pack","UCC Search","Invoices"],
    form: [
      { name:"company", label:"Company Legal Name", type:"text", required:true },
      { name:"country", label:"Country", type:"select", options:["Mexico","USA","Canada","Other"], required:true },
      { name:"monthlyAR", label:"Monthly A/R (USD)", type:"number" },
      { name:"industry", label:"Industry", type:"select", options:["Produce","Manufacturing","Logistics","Other"] },
      { name:"notes", label:"Notes", type:"textarea" }
    ]
  },
  "Commodity Catalog (USDA codes)": {
    brief: "USDA-based commodity taxonomy for matching buyers/sellers and pricing views.",
    tags: ["Ag Marketplace","USDA"],
    docs: ["Commodity List","Grades/Specs"],
    form: [
      { name:"requester", label:"Requester Name", type:"text", required:true },
      { name:"commodity", label:"Commodity", type:"text", required:true },
      { name:"useCase", label:"Use Case", type:"textarea" }
    ]
  }
};

export const defaultDetails = (name) => ({
  brief: "Module description coming soon. Configure requirements, forms, and workflow in Admin.",
  tags: ["TBD"],
  docs: ["NDA (Mutual)"],
  form: [
    { name:"name", label:"Full Name", type:"text", required:true },
    { name:"email", label:"Email", type:"email", required:true },
    { name:"phone", label:"Phone", type:"text" },
    { name:"notes", label:"Notes / Scenario", type:"textarea" }
  ]
});