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

## 📋 Legal & Compliance Documentation

AuditDNA maintains comprehensive legal and audit documentation for transparency and compliance:

### Available Documents
- **[Legal Audit Report](./public/forms/AuditDNA_Legal_Audit_Report_2025-08-01_Version15.md)** - Comprehensive legal audit covering compliance status and regulatory adherence
- **[Financial Audit Authorization](./public/forms/financial_audit_authorization.txt)** - Authorization forms for conducting financial audits
- **[Partner Access Disclosure](./public/forms/partner_access_disclosure.txt)** - Partner access policies and security requirements  
- **[Compliance Checklist](./public/forms/Untitled%20document.txt)** - Working checklist for maintaining operational compliance
- **[Business Continuity Plan](./public/forms/Untitled%20document%20(2).txt)** - Disaster recovery and business continuity procedures

### Access Methods
- **Web Interface**: Visit `/legal-audit` in the application for interactive document management
- **Direct Download**: All documents are available for download from the Legal & Audit Documentation section
- **API Access**: Documents can be accessed programmatically through the application's document management system

### Compliance Features
- 🔐 Secure document storage with encryption
- 📊 Access logging and audit trails  
- 🔄 Regular document updates and version control
- ⚖️ Legal framework compliance monitoring
- 📋 Automated compliance reporting

*These documents fulfill legal/compliance requirements and support audit/legal/business plan traceability.*

---

**AuditDNA** - Revolutionizing audit and compliance through artificial intelligence.

For deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).