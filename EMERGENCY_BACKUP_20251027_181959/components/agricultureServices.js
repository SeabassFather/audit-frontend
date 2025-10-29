// src/data/services/agricultureServices.js

export const AGRICULTURE_SERVICES = [
  "USDA Pricing Engine (W1Ã¢â‚¬â€œW26)",
  "Produce Search Engine",
  "Ag Factoring (MexicoÃ¢â‚¬â€œUS)",
  "GlobalGAP Certification Uploads",
  "Water Quality Lab Uploads",
  "Soil Analysis Reports",
  "Organic Certification Tracker",
  "Pesticide Compliance",
  "AgriTrade Connect (Mexico to US buyers)",
  "Commodity Futures Dashboard",
  "Crop Insurance",
  "Farm Equipment Leasing",
  "Ag Carbon Credits",
  "Cold Chain Logistics Tracker",
  "GrowerÃ¢â‚¬â€œBuyer Contracts",
  "Sustainability Scorecards",
  "Export Licensing (Ag)",
  "Food Safety Audits",
  "Climate Impact Reports",
  "Yield Prediction Models",
  "Hydroponics Audit",
  "USDA Subsidy Audit",
  "Farm Credit Compliance",
  "Organic Certification Review",
  "Produce Safety Rule Audit",
  "Agricultural Loan Review"
];

export const AGRICULTURE_SERVICE_DETAILS = {
  "USDA Pricing Engine (W1Ã¢â‚¬â€œW26)": {
    description: "Real-time USDA commodity pricing across all 26 weekly reports with historical trends and export capabilities",
    pricing: "$297/mo",
    estimatedRefund: "N/A",
    timeline: "Real-time access",
    regulation: "USDA AMS Regulations",
    agency: "USDA Agricultural Marketing Service",
    agencyContact: "ams.usda.gov | 202-720-8998",
    requiredDocs: ["Account registration", "Business verification"],
    commonViolations: []
  },
  "GlobalGAP Certification Uploads": {
    description: "Complete GlobalGAP certification management, audit preparation, and document tracking",
    pricing: "$497/mo",
    estimatedRefund: "N/A",
    timeline: "Ongoing compliance tracking",
    regulation: "GlobalGAP IFA Version 5.4",
    agency: "GlobalGAP",
    agencyContact: "globalgap.org",
    requiredDocs: ["Farm documentation", "Previous audit reports", "Corrective action plans"],
    commonViolations: ["Missing traceability records", "Incomplete food safety plans", "Worker training gaps"]
  },
  "Organic Certification Tracker": {
    description: "USDA Organic certification compliance and renewal management with audit-ready documentation",
    pricing: "$297/mo",
    estimatedRefund: "N/A",
    timeline: "Annual renewal tracking",
    regulation: "USDA NOP 7 CFR Part 205",
    agency: "USDA National Organic Program",
    agencyContact: "usda.gov/organic | 202-720-3252",
    requiredDocs: ["Organic System Plan", "Input lists", "Land history", "Harvest records"],
    commonViolations: ["Prohibited substance use", "Buffer zone violations", "Record-keeping failures"]
  },
  "Pesticide Compliance": {
    description: "Monitor and document pesticide usage for EPA and state regulatory compliance",
    pricing: "$247/mo",
    estimatedRefund: "N/A",
    timeline: "Ongoing monitoring",
    regulation: "FIFRA, EPA 40 CFR Part 170",
    agency: "EPA, State Agriculture Departments",
    agencyContact: "epa.gov/pesticides | 800-858-7378",
    requiredDocs: ["Application records", "Safety Data Sheets", "Worker training logs", "REI documentation"],
    commonViolations: ["Improper application rates", "Missing worker training", "Storage violations"]
  },
  "Cold Chain Compliance Audit": {
    description: "Temperature monitoring and cold chain compliance for produce transportation and storage",
    pricing: "$397/mo",
    estimatedRefund: "N/A",
    timeline: "Real-time monitoring",
    regulation: "FSMA, 21 CFR Part 1 Subpart O",
    agency: "FDA",
    agencyContact: "fda.gov/food | 888-723-3366",
    requiredDocs: ["Temperature logs", "Equipment calibration records", "Transportation manifests"],
    commonViolations: ["Temperature excursions", "Inadequate monitoring", "Equipment failures"]
  }
};