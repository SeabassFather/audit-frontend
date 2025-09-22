export const auditEngines = [
  {
    id: "ocr-ai",
    name: "OCR & AI Discrepancy Engine",
    description: "AI-automated document scanning, OCR, and discrepancy flagging for all uploads.",
    features: [
      "Multi-language OCR (EN/ES/FR/CH)",
      "Regulatory compliance extraction (CFPB, RESPA, TILA, UCC, etc.)",
      "Auto-highlight of missing/invalid fields",
      "Consent and signature verification"
    ]
  },
  {
    id: "cfpb-trigger",
    name: "CFPB Complaint Auto-Trigger",
    description: "Auto-generates and routes complaint packets to CFPB for qualifying violations.",
    features: [
      "Jurisdiction auto-detection",
      "PDF generator for complaint letters",
      "QR-based tracking links",
      "Audit log and PDF download"
    ]
  },
  {
    id: "loan-match",
    name: "Loan Match Engine",
    description: "Matches consumer profiles to optimal lenders/funders in real-time.",
    features: [
      "Custom scoring for mortgage, auto, business loans",
      "Partner lender API integrations",
      "Track record and approval odds estimation"
    ]
  },
  {
    id: "uploader",
    name: "Evidence Uploader & Chain of Custody",
    description: "Secure file upload with audit trail and compliance checks.",
    features: [
      "AI file type detection",
      "Chain-of-custody log",
      "Multi-format (PDF, DOCX, JPG, XLSX, ZIP)"
    ]
  }
];
