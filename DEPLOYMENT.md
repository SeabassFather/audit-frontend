# AuditDNA Deployment Guide

## GitHub Actions + Netlify Setup

This repository includes a professional GitHub Actions workflow for automated deployment to Netlify.

### Prerequisites

1. **Netlify Account**: Sign up at [netlify.com](https://netlify.com)
2. **Netlify Site**: Create a new site in your Netlify dashboard
3. **GitHub Secrets**: Configure the following secrets in your repository

### Required GitHub Secrets

Navigate to your repository → Settings → Secrets and variables → Actions, then add:

```
NETLIFY_AUTH_TOKEN: Your Netlify personal access token
NETLIFY_SITE_ID: Your Netlify site ID
```

#### Getting Your Netlify Tokens

1. **Auth Token**: 
   - Go to Netlify → User settings → Personal access tokens
   - Generate new token with appropriate scopes

2. **Site ID**:
   - Go to your Netlify site → Site settings → General
   - Copy the Site ID under "Site information"

### Workflow Features

The `.github/workflows/deploy-netlify.yml` workflow provides:

- ✅ **Automatic Deployment**: Triggers on push to `main` branch
- ✅ **Build Process**: `npm ci` → `npm run build` → deploy
- ✅ **PR Previews**: Deploy preview for pull requests
- ✅ **Status Comments**: Automatic deployment status in PRs
- ✅ **Error Handling**: Comprehensive error reporting

### Manual Deployment

To deploy manually:

```bash
# Install dependencies
npm ci

# Build the application
npm run build

# Deploy using Netlify CLI (optional)
npx netlify deploy --prod --dir=dist
```

### Build Configuration

The app uses Vite as the build tool with the following configuration:

- **Source**: React 18 + TypeScript/JSX
- **Styling**: Tailwind CSS
- **Output**: `dist/` directory
- **Routing**: React Router with SPA redirects

### Environment Variables

For local development, create a `.env.local` file:

```env
# Add any environment-specific variables here
VITE_API_BASE_URL=http://localhost:3000
```

### Troubleshooting

1. **Build Failures**: Check Node.js version compatibility
2. **Deployment Issues**: Verify Netlify secrets are correctly set
3. **Routing Problems**: Ensure `netlify.toml` redirects are configured

For support, check the GitHub Actions logs or contact the development team.