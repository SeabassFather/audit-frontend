<<<<<<< HEAD
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
=======
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
>>>>>>> my/push-branch
