# AuditDNA Frontend

![Build Status](https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME/actions/workflows/ci.yml/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_NETLIFY_SITE_ID/deploy-status)](https://app.netlify.com/sites/YOUR_NETLIFY_SITE_NAME/deploys)

## Overview
AuditDNA is a unified compliance, audit, and trade-finance ecosystem spanning agriculture, mortgage & real estate, legal/CPA, education, eco-sustainability, insurance, payroll, global trade, healthcare, government, and utilities.

This frontend includes:
- **Spartan Services Catalog** - 201 services across 10 categories loaded from spartan_services.json
- **Dashboard** (Home.js) with live tickers from Spartan 300 services
- **Services Accordion** (Spartan 300 categories)
- **USDA Pricing Module** (W1W26 chart)
- **Mortgage Engine** (loan search + results)
- **Factoring Engine** (invoice uploads + trade finance)
- **Admin Dashboard** (global compliance frameworks w/ AuditDNA color palette)

## Services Integration
The application now dynamically loads all services from `src/data/spartan_services.json`:

### Service Categories (201 total services)
1. 🌾 **Agriculture & Food Systems** (21 services)
2. 🏠 **Mortgage & Real Estate** (20 services)
3. ⚖️ **Legal & Compliance** (20 services)
4. 💰 **Finance & Factoring** (20 services)
5. 🎓 **Education & Workforce** (20 services)
6. 🌍 **Eco & Sustainability** (20 services)
7. 🏥 **Healthcare & Insurance** (20 services)
8. 🌐 **Global Trade & Logistics** (20 services)
9. 💻 **Technology & Data** (20 services)
10. 🛒 **Consumer & Retail** (20 services)

All services are displayed with:
- Category-specific icons
- Service counts
- Interactive accordion UI
- Contact forms with security verification
- Document upload capabilities

## Tech Stack
- React (CRA)
- React Router
- Recharts
- Lucide React Icons
- Tailwind CSS
- Node 20.19.0 (GitHub Actions)
- Netlify CI/CD

## How to Run
```bash
npm install
npm start
```

Builds auto-deploy via GitHub → Netlify.

## Documentation
- See [AUDITDNA_FILE_TREE.md](./AUDITDNA_FILE_TREE.md) for complete file tree and descriptions
- See [AUDITDNA_INFRASTRUCTURE_MAP.md](./AUDITDNA_INFRASTRUCTURE_MAP.md) for infrastructure details
