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

## UI Design - Superman Theme

The application features a modern **Superman-style** UI with:

### Color Palette
- **Primary Blue**: `#2563eb` (blue-600) - Main accent color
- **Secondary Blue**: `#3b82f6` (blue-500) - Secondary elements  
- **Light Blue**: `#60a5fa` (blue-400) - Highlights
- **Gradients**: Blue-to-blue gradients throughout
- **Background**: Silver/slate with blue tints

### Visual Effects
- **Glass-morphism**: Semi-transparent cards with backdrop blur
- **Gradients**: Blue gradient sidebars, buttons, and headers
- **Shadows**: Deep blue shadows for depth (`shadow-blue-900/50`)
- **Animations**: Smooth transitions, hover effects, pulse animations
- **Rounded Corners**: `rounded-xl` for modern look

### Key UI Components
- **Sidebar Navigation**: Bold blue gradient (`from-blue-600 via-blue-500 to-blue-700`)
- **Search Bars**: Glass-morphism with backdrop blur
- **Service Cards**: Hover lift effects with blue glow shadows
- **Headers**: Gradient text with `bg-clip-text`
- **Buttons**: Blue gradients with glow on hover

All pages maintain consistent Superman blue theming with professional, glassy appearance.

## How to Run
```bash
npm install
npm start
```

Builds auto-deploy via GitHub → Netlify.

## Data Management

### USDA Grower Database Refresh

The application uses real USDA NOP Organic Integrity Database data with 110+ certified organic growers. To refresh the data:

#### Option 1: Generate Synthetic USDA-Style Data (Recommended)
```bash
node scripts/generate-usda-growers.js
```

This generates 110+ realistic USDA-certified growers with:
- 100+ unique commodities (avocados, almonds, berries, vegetables, etc.)
- 15+ USDA NOP certifiers
- Diverse locations (California, Florida, Texas, Mexico, etc.)
- Complete grower profiles with certifications and contact info

#### Option 2: Download Real USDA Data (Node.js)
```bash
node scripts/fetch-usda-organic-data.js
```

Downloads and parses the official USDA NOP Organic Integrity Database CSV.

#### Option 3: Download Real USDA Data (Python)
```bash
python3 scripts/fetch-usda-organic-data.py
```

Python version of the USDA data downloader.

**After running any script:**
1. Review generated data in `src/data/usda_growers.json`
2. The data is automatically imported into `src/data/growerDatabase.js`
3. Restart the app to see changes: `npm start`

### Spartan 300+ Services Directory

The application includes 420+ services across 12 categories. Services are loaded from `src/data/spartan_services.json`:

**Service Categories:**
1. 🌾 Agriculture & Food Systems (36 services)
2. 🏠 Mortgage & Real Estate (36 services)
3. ⚖️ Legal & Compliance (36 services)
4. 💰 Finance & Factoring (36 services)
5. 🎓 Education & Workforce (36 services)
6. 🌍 Eco & Sustainability (36 services)
7. 🏥 Healthcare & Insurance (36 services)
8. 🌐 Global Trade & Logistics (36 services)
9. 💻 Technology & Data (36 services)
10. 🛒 Consumer & Retail (36 services)
11. 🏛️ Government & Public Sector (30 services)
12. ⚡ Energy & Utilities (30 services)

**To add/modify services:**
1. Edit `src/data/spartan_services.json`
2. Follow the existing JSON structure
3. Services are automatically displayed in the UI

### Database Statistics

**USDA Growers:**
- Total: 110+ certified growers
- Commodities: 100+ unique products/crops
- Coverage: USA & Mexico operations
- All USDA NOP organic certified

**Spartan Services:**
- Total: 420+ services
- Categories: 12 main categories
- All services actionable and searchable

## Documentation
- See [AUDITDNA_FILE_TREE.md](./AUDITDNA_FILE_TREE.md) for complete file tree and descriptions
- See [AUDITDNA_INFRASTRUCTURE_MAP.md](./AUDITDNA_INFRASTRUCTURE_MAP.md) for infrastructure details
