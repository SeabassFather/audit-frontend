# CI/CD Automation for AuditDNA Frontend

This repository includes a comprehensive GitHub Actions workflow that automatically builds and deploys the frontend applications when changes are pushed to the main branch.

## Workflow Overview

The CI/CD pipeline consists of the following jobs:

### 1. Build and Deploy Job (`build-and-deploy`)

This job builds multiple frontend projects in parallel using a matrix strategy:

- **Main Project** (root directory): Primary Vite + React application with Tailwind CSS
- **AuditDNA Frontend** (`auditdna-frontend/`): Secondary Vite + React application

Each project:
- Uses Node.js 18
- Performs clean install of dependencies
- Runs the build command (`npm run build`)
- Uploads build artifacts for 30 days retention

### 2. Deployment Job (`deploy-main`)

This job only runs on pushes to the main branch and:
- Downloads the main project's build artifacts
- Deploys to GitHub Pages (default configuration)
- Includes commented options for Netlify and Vercel deployment

### 3. Status Check Job (`status-check`)

This job provides comprehensive status reporting:
- Reports build and deployment status
- Provides clear success/failure indicators
- Exits with appropriate codes for CI/CD tools

## Deployment Options

### GitHub Pages (Active)
The workflow is configured to deploy the main project to GitHub Pages automatically.

**Setup Required:**
1. Go to Repository Settings → Pages
2. Set Source to "GitHub Actions"
3. The workflow will handle the rest automatically

### Netlify (Optional)
To enable Netlify deployment, uncomment the Netlify section and add these secrets:
- `NETLIFY_AUTH_TOKEN`: Your Netlify personal access token
- `NETLIFY_SITE_ID`: Your Netlify site ID

### Vercel (Optional)
To enable Vercel deployment, uncomment the Vercel section and add these secrets:
- `VERCEL_TOKEN`: Your Vercel access token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID

## Triggering the Workflow

The workflow triggers on:
- **Push to main branch**: Full build and deployment
- **Pull requests to main**: Build only (no deployment)

## Build Artifacts

Build artifacts are stored for 30 days and include:
- `main-build`: Main application build output (`dist/` folder)
- `auditdna-frontend-build`: Secondary app build output (`dist/` folder)

## Project Structure

```
├── .github/workflows/
│   └── ci-cd.yml                    # Main CI/CD workflow
├── src/                             # Main project source
├── auditdna-frontend/               # Secondary React app
├── package.json                     # Main project dependencies
└── README-CICD.md                   # This documentation
```

## Monitoring and Troubleshooting

### Viewing Workflow Status
1. Go to the "Actions" tab in your GitHub repository
2. Click on the latest workflow run
3. Expand individual jobs to see detailed logs

### Common Issues
- **Build failures**: Check the build logs for dependency or compilation errors
- **Deployment failures**: Verify that GitHub Pages is enabled and configured correctly
- **Artifact issues**: Ensure the build outputs to the correct directory (`dist/` or `build/`)

## Customization

### Adding New Projects
To add a new frontend project to the build matrix:

1. Edit `.github/workflows/ci-cd.yml`
2. Add a new entry to the `matrix.project` array:
```yaml
- name: "your-project-name"
  path: "path/to/your/project"
  build_command: "npm run build"
  artifact_name: "your-project-build"
  build_dir: "dist"  # or "build" for Create React App
```

### Changing Node.js Version
Update the `node-version` field in the workflow file to use a different Node.js version.

### Custom Build Commands
Modify the `build_command` field for any project that uses different build scripts.

## Integration with Existing Automation

This workflow integrates with the existing automation PR by:
- Building all frontend modules as part of the unified CI/CD pipeline
- Running after merges to main branch
- Providing status updates via GitHub's built-in PR status checks
- Storing all configuration in the repository for version control

## Security Considerations

- Secrets are properly scoped and not exposed in logs
- Build processes run in isolated environments
- Artifacts are automatically cleaned up after 30 days
- Deployment only occurs from the main branch

## Status Updates

The workflow provides real-time status updates through:
- GitHub's commit status API
- PR checks and status badges
- Detailed job logs and artifact information
- Clear success/failure indicators in the workflow summary