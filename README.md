# AuditDNA Frontend

[![CI/CD Status](https://github.com/SeabassFather/audit-frontend/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/SeabassFather/audit-frontend/actions/workflows/ci-cd.yml)

AI-powered audit and compliance platform frontend applications.

## Projects

This repository contains multiple frontend applications:

- **Main Application** (root): Primary Vite + React application with Tailwind CSS
- **AuditDNA Frontend** (`auditdna-frontend/`): Secondary Vite + React application  
- **AuditDNA Platform** (`auditdna-platform/`): Create React App-based application
- **Audit Frontend** (`audit-frontend/`): Alternative Vite + React implementation

## Quick Start

### Main Application
```bash
npm install
npm run dev    # Development server
npm run build  # Production build
```

### AuditDNA Frontend
```bash
cd auditdna-frontend
npm install
npm run dev    # Development server
npm run build  # Production build
```

## Deployment

The repository includes automated CI/CD via GitHub Actions that:
- Builds all frontend applications on every push
- Deploys the main application to GitHub Pages on main branch
- Stores build artifacts for 30 days
- Supports multiple deployment targets (Netlify, Vercel)

See [CI/CD Documentation](README-CICD.md) for detailed information.

## Build Status

All builds are automatically tested on every pull request and deployment happens automatically when changes are merged to the main branch.

## Development

Each project has its own package.json and can be developed independently. The CI/CD pipeline ensures all projects build successfully before deployment.