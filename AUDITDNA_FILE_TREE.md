# AuditDNA Frontend - File Tree & Documentation

## Overview
This document provides a comprehensive file tree and descriptions for all files in the AuditDNA repository after the integration of Spartan Services.

## Key Changes - Spartan Services Integration
- **spartan_services.json**: Contains 201 services across 10 categories (Agriculture & Food Systems, Mortgage & Real Estate, Legal & Compliance, Finance & Factoring, Education & Workforce, Eco & Sustainability, Healthcare & Insurance, Global Trade & Logistics, Technology & Data, Consumer & Retail)
- **App.js**: Updated to dynamically load services from spartan_services.json
- **Services Component**: Now displays all 10 categories with proper icons and service counts

---

## Core Application Files

### Entry Points
- **`index.html`** - Main HTML entry point for the application
- **`src/index.js`** - React application entry point, renders App component with React Router
- **`src/main.jsx`** - Alternative entry point for Vite builds

### Main Application Components
- **`src/App.js`** - Primary application component with dashboard, services catalog, and search engines
  - Integrates spartan_services.json for services display
  - Contains ServicesTab, Dashboard, and SearchEngines components
  - Manages navigation between Dashboard, Services, and Search tabs

- **`src/AuditDNAApp.jsx`** - Premium AuditDNA application with advanced UI
  - Dark themed interface with neon accents (#00ff88, #4a96ff, #84cc16)
  - Accordion navigation for services
  - Integration with USDA, Water Tech, Mortgage, and Compliance modules

- **`src/SpartanApp.jsx`** - Spartan 300 Service Catalog application
  - Displays services from spartan_services.json
  - Yellow-themed UI with categories accordion

### Services Components
- **`src/SpartanServicesComponent.jsx`** - Enhanced services component with contact forms
  - Loads from spartan_services.json
  - Contact card with security verification (SSN, DOB, property address)
  - File upload support for audit documents
  - Category icons and service counts display

---

## Data Files

### Service Catalogs
- **`src/data/spartan_services.json`** - ⭐ PRIMARY SERVICE DATA
  - 10 categories, 201 total services
  - Agriculture & Food Systems (21)
  - Mortgage & Real Estate (20)
  - Legal & Compliance (20)
  - Finance & Factoring (20)
  - Education & Workforce (20)
  - Eco & Sustainability (20)
  - Healthcare & Insurance (20)
  - Global Trade & Logistics (20)
  - Technology & Data (20)
  - Consumer & Retail (20)

- **`src/data/services.json`** - Legacy service data (12 categories, 300+ services)
- **`src/data/Services.js`** - Export of service categories with icons and counts
- **`src/data/serviceData.js`** - Structured service data with categories (Consumer, Insurance, Medical, Business, Elite)
- **`src/data/serviceTree.js`** - Hierarchical service tree structure
- **`src/data/serviceCategories.js`** - Service category definitions
- **`src/data/elite_modules.json`** - Elite/premium service modules

### Domain-Specific Data
- **`src/data/lenders.json`** - Mortgage lender database
- **`src/data/escrowProviders.json`** - Escrow service providers
- **`src/data/agriTests.json`** - Agriculture test types
- **`src/data/waterSoilTests.json`** - Water and soil testing data
- **`src/data/waterSources.json`** - Water source information
- **`src/data/admins.json`** - Admin user configuration
- **`src/data/commodityPrices.sample.json`** - Sample commodity pricing data
- **`src/data/producePrices.sample.json`** - Sample produce pricing

---

## Page Components

### Main Pages
- **`src/pages/Dashboard.js`** - Main dashboard with metrics, compliance reports, audit status
- **`src/pages/ServicesPage.jsx`** - Services listing and catalog page
- **`src/pages/ServicesExplorer.jsx`** - Interactive services explorer
- **`src/pages/ServiceCategoryDetail.jsx`** - Detailed view of service categories
- **`src/pages/ServiceDetail.jsx`** - Individual service details
- **`src/pages/ServiceStart.jsx`** - Service onboarding/start page
- **`src/pages/ConsumerServices.jsx`** - Consumer-focused services page

### Specialized Modules
- **`src/pages/USDA.jsx`** - USDA pricing engine (W1-W26 weekly pricing)
- **`src/pages/WaterTech.jsx`** - Water technology and lab analysis
- **`src/pages/Mortgage.jsx`** - Mortgage search and audit tools
- **`src/pages/MortgageTabUS.jsx`** - US mortgage services
- **`src/pages/MortgageTabMexico.jsx`** - Mexico mortgage services
- **`src/pages/MortgageTabRealEstate.jsx`** - Real estate mortgage services
- **`src/pages/PropertySearch.jsx`** - Property search interface
- **`src/pages/PropertyUploadForm.jsx`** - Property upload and management
- **`src/pages/MexicoLoanMatcher.jsx`** - Mexico loan matching service

### Data Services
- **`src/pages/dataService.js`** - Data service utilities
- **`dataService.js`** - Mock data service for services, dashboards, commodities, markets

---

## UI Components

### Forms & Input
- **`src/components/AgentRegistrationCard.jsx`** - Real estate agent registration
- **`src/components/AppraisalServicesCard.jsx`** - Appraisal services request
- **`src/components/LegalQuestionnaireCard.jsx`** - Legal questionnaire form
- **`src/components/OwnerBuyerForm.jsx`** - Owner/buyer information form
- **`src/components/PropertyProfileCard.jsx`** - Property profile details
- **`src/components/ReferralPartnerCard.jsx`** - Referral partner registration
- **`src/components/StatementOfIdentityForm.jsx`** - Identity verification form
- **`src/components/DocumentUploader.jsx`** - Document upload component
- **`src/components/EscrowFeatureCard.jsx`** - Escrow feature display

### Search & Navigation
- **`src/components/TitleSearchEngine.jsx`** - Title search functionality
- **`src/components/MexicoRealEstate.jsx`** - Mexico real estate search
- **`src/components/MexicoRefiCard.jsx`** - Mexico refinance options

### Services & Compliance
- **`src/components/ServicesPage.jsx`** - Services page wrapper
- **`src/components/ServicesAccordion.jsx`** - Accordion UI for services
- **`src/components/ServicesComplianceAccordion.jsx`** - Compliance-focused services accordion
- **`src/components/ServiceAndCompliancePage.jsx`** - Combined services and compliance page
- **`src/components/AuditComplianceMain.jsx`** - Main audit compliance component
- **`src/components/TickerSection.jsx`** - Ticker display for real-time data
- **`src/components/CategoriesAccordion.jsx`** - Categories navigation accordion

---

## Styling & Assets

### Stylesheets
- **`src/index.css`** - Global styles
- **`src/styles.css`** - Additional global styles
- **`src/App.css`** - App-specific styles
- **`src/utils/styles/auditdna-premium.css`** - Premium dark theme styles
  - Background: #0a0e27 (dark blue)
  - Accent colors: #00ff88 (neon green), #4a96ff (blue)
  - Card styles with transparency and borders

### Theme Configuration
- **`src/theme.js`** - Theme configuration and variables

---

## Configuration Files

### Build & Development
- **`package.json`** - Project dependencies and scripts
- **`package-lock.json`** - Locked dependency versions
- **`.eslintrc.json`** - ESLint configuration
- **`postcss.config.js`** - PostCSS configuration
- **`tailwind.config.js`** - Tailwind CSS configuration
- **`vite.config.js`** - Vite build configuration
- **`netlify.toml`** - Netlify deployment configuration

### Environment
- **`.env`** - Environment variables
- **`.gitignore`** - Git ignore rules

---

## Service Architecture

### Categories Overview
1. **Agriculture & Food Systems (21 services)**
   - USDA Pricing, Produce Search, Ag Factoring, GlobalGAP, Water Quality, Soil Analysis, Organic Certification, Pesticide Compliance, AgriTrade Connect, Commodity Futures, Crop Insurance, Farm Equipment Leasing, Carbon Credits, Cold Chain Logistics, Grower-Buyer Contracts, Sustainability Scorecards, Export Licensing, Food Safety Audits, Climate Reports, Yield Prediction, Hydroponics

2. **Mortgage & Real Estate (20 services)**
   - Mortgage Search, Lender Matching, Cross-Border Leasehold, ADU Builder, Green Housing, Construction Lending, Escrow & Compliance, Foreclosure Tracker, REIT Dashboard, Property Insurance, Loan Factoring, Reverse Mortgage, Energy Efficiency, Land Title, Property Tax, HOA Compliance, Leasehold Verification, Zoning Law, International Lending, Tenant Screening

3. **Legal & Compliance (20 services)**
   - Contracts & Templates, E-Signature, IP Audit, Privacy Compliance (GDPR, CCPA, GLBA, PDPA, PIPEDA), Global Ethics, Employment Law, NDA Generator, Corporate Governance, Tax Compliance, Whistleblower Reporting, SOX, AML/KYC, FCPA Audit, Cross-Border Contract, Data Retention, Cybersecurity Laws, HR Compliance, Insurance Law, Litigation Tracker, Patent Verification

4. **Finance & Factoring (20 services)**
   - AR Factoring, Trade Finance, Credit Risk, Currency Exchange, Invoice Audit, Treasury Management, Payroll Compliance, 401k Tracker, Crypto Assets Audit, Bank Licensing, Securities Compliance, Cross-Border Payments, FinTech Licensing, Loan Servicing, Microfinance, Financial Statements, Fraud Detection, AML Transaction Monitor, Credit Bureau, Blockchain Compliance

5. **Education & Workforce (20 services)**
   - Report Card Upload, Attendance Tracker, Teacher Audit, Workforce Training, OSHA Certifications, Continuing Education, Professional Licensing, Internship Tracker, Curriculum Compliance, Grant Auditing, FERPA, Accreditation, Financial Aid, Scholarship Compliance, Credential Verification, Exam Proctoring, Academic Misconduct, Special Education, Faculty Contracts, Union Labor

6. **Eco & Sustainability (20 services)**
   - Carbon Footprint, Green Building, LEED, Renewable Energy, Water Tech Marketplace, Waste Management, Circular Economy, Biodiversity Credits, ESG Score, Solar Subsidy, Carbon Trading, Recycling Audits, Plastic Reduction, Ocean Impact, Sustainable Sourcing, Forest Management, Climate Reporting, Energy Grid, Sustainability Bonds, Eco Labeling

7. **Healthcare & Insurance (20 services)**
   - HIPAA Compliance, Insurance Policy Tracker, Claims Audit, Provider Licensing, Pharma Supply Chain, Wellness Incentives, Telehealth Compliance, FDA Audit, Medicare/Medicaid, Insurance Fraud Detection, Patient Consent, Hospital Accreditation, Clinical Trial, Drug Pricing, Insurance Licensing, Healthcare Cybersecurity, EHR Audit, Billing Compliance, Worker Comp, Cross-Border Insurance

8. **Global Trade & Logistics (20 services)**
   - Tariff Tracker, Customs Compliance, Import/Export Licensing, Bill of Lading, Port Authority, Logistics Insurance, Freight Forwarder, Trade Zone, NAFTA/USMCA, Supply Chain Security, Shipping Emissions, Maritime Law, Air Cargo, Truck Safety, Warehouse Certification, Bonded Warehouse, Hazmat Compliance, Cross-Border VAT, Incoterms, International Sanctions

9. **Technology & Data (20 services)**
   - Cybersecurity Compliance, Data Breach Response, AI Audit, Cloud Vendor Compliance, Open Banking API, IoT Sensor Integration, Blockchain Audit, IT Licensing, Software Supply Chain, SOC 2, PCI DSS, ISO Certification, Bug Bounty, Data Residency, Digital Identity, Smart Contract, Penetration Test, Encryption Standards, Network Infrastructure, Disaster Recovery

10. **Consumer & Retail (20 services)**
    - Product Recall, Consumer Finance, Retail Audit, Supply Chain Transparency, E-Commerce Compliance, Advertising Standards, Food Labeling, Child Safety, Consumer Warranty, Fair Trade, CSR Reporting, ISO Retail, Retail Lease, Point-of-Sale Security, Merchandise Import, Franchise Agreement, Online Privacy, Retail Safety, Return Policy, Consumer Complaint Tracker

---

## Documentation Files
- **`README.md`** - Project overview and setup instructions
- **`AUDITDNA_INFRASTRUCTURE_MAP.md`** - Infrastructure architecture documentation
- **`AUDITDNA_FILE_TREE.md`** - This file, comprehensive file tree and descriptions
- **`data_preparation.md`** - Data preparation guidelines

---

## Build Artifacts (Excluded from Git)
- **`build/`** - Production build output
- **`dist/`** - Distribution files
- **`node_modules/`** - NPM dependencies

---

## Integration Summary

The Spartan Services integration successfully:
✅ Loads all 201 services dynamically from `spartan_services.json`
✅ Displays 10 service categories with appropriate icons
✅ Shows accurate service counts per category
✅ Maintains AuditDNA branding and styling
✅ Provides contact forms for service requests
✅ Includes security verification (SSN, DOB, property address, loan number)
✅ Supports document uploads for audit requests

All services are live data from the JSON file - no demo or placeholder data is used.
