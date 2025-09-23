# 🧬 AuditDNA - AI Audit & Compliance Platform

![AuditDNA](https://img.shields.io/badge/AuditDNA-AI%20Powered-blue)
![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-5-yellow)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-green)
![Netlify](https://img.shields.io/badge/Deploy-Netlify-teal)

A sophisticated, AI-powered audit and compliance platform built with modern web technologies.

## ✨ Features

- 🤖 **AI-Powered Analytics**: Advanced audit engines with machine learning capabilities
- 📊 **Real-time Dashboard**: Comprehensive overview with live data visualization
- 📤 **Document Management**: Secure upload and processing of compliance documents
- 📋 **Agreement Tracking**: Contract and agreement lifecycle management
- 📈 **Market Data Integration**: Live tickers and financial data feeds
- 🏘️ **Real Estate Solutions**: Specialized Mexico real estate and loan processing
- 👥 **User Management**: Admin tools for client and partner management
- 🎯 **Marketing Tools**: Pitch deck generation and marketing automation

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment

The project includes automated GitHub Actions deployment to Netlify. See [DEPLOYMENT.md](./DEPLOYMENT.md) for setup instructions.

## 🏗️ Architecture

- **Frontend**: React 18 + TypeScript/JSX
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router with SPA configuration
- **State Management**: React hooks and context
- **Deployment**: Automated via GitHub Actions → Netlify

## 📱 UI/UX Features

### Navigation
- **Responsive Design**: Mobile-first approach with hamburger menu
- **Collapsible Sidebar**: Space-efficient navigation with detailed descriptions
- **Sticky Header**: Always-accessible top navigation with gradient branding

### Professional Design
- **Modern Layout**: Clean, white background with professional spacing
- **Gradient Effects**: Eye-catching branding and accent elements  
- **Icon System**: Comprehensive emoji-based iconography
- **Typography**: Consistent font hierarchy with gradient text effects

### Responsive Experience
- **Mobile Optimized**: Touch-friendly interface for all screen sizes
- **Desktop Enhanced**: Full-featured experience on larger screens
- **Progressive Enhancement**: Core functionality works across all devices

## 🛠️ Technology Stack

- **React 18**: Latest React with hooks and concurrent features
- **Vite**: Lightning-fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Axios**: HTTP client for API communication
- **Recharts**: Data visualization components
- **QR Code**: QR code generation utilities

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── NavBar.jsx      # Main navigation header
│   ├── Sidebar.jsx     # Collapsible side navigation
│   ├── Footer.jsx      # Professional footer
│   └── ...             # Other components
├── pages/              # Route components
│   ├── Dashboard.jsx   # Main dashboard
│   ├── Services.jsx    # Services management
│   └── ...             # Other pages
├── styles/             # Global styles and themes
├── utils/              # Utility functions
└── App.jsx             # Main application component
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for local development:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_NETLIFY_FUNCTIONS_URL=/.netlify/functions
```

### Build Configuration
The project uses Vite with custom configuration for:
- React plugin with SWC
- Development server on port 3000
- Optimized production builds

## 🚀 Deployment

### Automated Deployment
- **GitHub Actions**: Configured for automatic deployment
- **Netlify Integration**: Seamless deployment with preview builds
- **Environment Management**: Secure handling of secrets and tokens

### Manual Deployment
```bash
npm run build
npx netlify deploy --prod --dir=dist
```

## 📊 Performance

- **Fast Loading**: Optimized bundle sizes with code splitting
- **Responsive**: Smooth interactions across all devices
- **Accessible**: WCAG-compliant design patterns
- **SEO Ready**: Proper meta tags and semantic HTML

## 📋 Legal & Audit Traceability

AuditDNA maintains comprehensive legal and compliance documentation for full audit traceability:

### Legal Documentation
- **[Legal Audit Report](./docs/legal/AuditDNA_Legal_Audit_Report_2025-08-01_Version15.md)** - Comprehensive legal audit (Version 15)
- **[Financial Authorization](./docs/legal/Financial_Audit_Authorization.txt)** - Financial audit authorization
- **[Partner Access Disclosure](./docs/legal/Partner_Access_Disclosure.txt)** - Partner access management
- **[Business Platform Overview](./docs/legal/Business_Consumer_Protection_Platform_Overview.txt)** - Full business/consumer protection platform
- **[Due Diligence Checklist](./docs/legal/Financial_Due_Diligence_Checklist.txt)** - Financial due diligence documentation

### Compliance Framework
- ✅ **GDPR** - General Data Protection Regulation
- ✅ **CCPA** - California Consumer Privacy Act
- ✅ **GLBA** - Gramm-Leach-Bliley Act
- ✅ **PIPEDA** - Personal Information Protection
- ✅ **SOX** - Sarbanes-Oxley Act
- ✅ **CFPB** - Consumer Financial Protection Bureau
- ✅ **RESPA** - Real Estate Settlement Procedures Act
- ✅ **TILA** - Truth in Lending Act

📁 **[View Complete Legal Documentation](./docs/legal/README.md)**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 🎯 Roadmap

- [ ] Advanced AI model integration
- [ ] Real-time collaboration features
- [ ] Enhanced reporting capabilities
- [ ] API documentation portal
- [ ] Mobile native applications

---

**AuditDNA** - Revolutionizing audit and compliance through artificial intelligence.

For deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).