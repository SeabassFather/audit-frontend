// AuditDNA Elite 2.0 Development Checklist
// This represents the comprehensive development roadmap and implementation checklist

export const auditDNAElite2Checklist = {
  id: "auditdna-elite-2.0",
  title: "AuditDNA Elite 2.0 Development Checklist",
  description: "Comprehensive development roadmap and implementation tracking",
  version: "2.0",
  lastUpdated: new Date().toISOString(),
  categories: [
    {
      id: "core-infrastructure",
      title: "Core Infrastructure",
      priority: "ASAP",
      status: "in-progress",
      items: [
        {
          id: "auth-system",
          name: "Authentication & Authorization (JWT, OAuth2)",
          status: "completed",
          priority: "ASAP",
          assignee: "Backend Team",
          dueDate: "2024-01-15",
          dependencies: [],
          notes: "JWT implementation complete, OAuth2 integration tested"
        },
        {
          id: "database-layer",
          name: "Database & Data Layer (MongoDB, CLI Loader)",
          status: "completed",
          priority: "ASAP",
          assignee: "Backend Team",
          dueDate: "2024-01-20",
          dependencies: ["auth-system"],
          notes: "MongoDB setup complete, data migration tools implemented"
        },
        {
          id: "document-management",
          name: "Document Management (OCR, S3, PDF/CSV, QR)",
          status: "in-progress",
          priority: "ASAP",
          assignee: "Full Stack Team",
          dueDate: "2024-01-25",
          dependencies: ["database-layer"],
          notes: "OCR integration 80% complete, S3 storage configured"
        }
      ]
    },
    {
      id: "ai-automation",
      title: "AI & Automation",
      priority: "HIGH",
      status: "in-progress",
      items: [
        {
          id: "audit-chain",
          name: "Audit Chain (OCR → AI Validation → Rules Engine)",
          status: "in-progress",
          priority: "HIGH",
          assignee: "AI Team",
          dueDate: "2024-02-01",
          dependencies: ["document-management"],
          notes: "OCR pipeline functional, AI validation model training"
        },
        {
          id: "letter-generation",
          name: "Automated Letter Generation (CFPB, Demand, Escrow)",
          status: "planned",
          priority: "HIGH",
          assignee: "AI Team",
          dueDate: "2024-02-10",
          dependencies: ["audit-chain"],
          notes: "Templates designed, automation logic pending"
        },
        {
          id: "notifications",
          name: "Notifications (Email, SMS, Calendar)",
          status: "in-progress",
          priority: "MEDIUM",
          assignee: "Backend Team",
          dueDate: "2024-02-05",
          dependencies: ["auth-system"],
          notes: "Email notifications working, SMS integration pending"
        }
      ]
    },
    {
      id: "regulatory-compliance",
      title: "Regulatory Compliance Audits",
      priority: "HIGH",
      status: "in-progress",
      items: [
        {
          id: "financial-audits",
          name: "Financial (Mortgages, Utilities, Insurance, Credit)",
          status: "in-progress",
          priority: "HIGH",
          assignee: "Compliance Team",
          dueDate: "2024-02-15",
          dependencies: ["audit-chain"],
          notes: "Mortgage audit module 70% complete"
        },
        {
          id: "legal-audits",
          name: "Legal (Contract Audits, CFPB Complaints, UCC)",
          status: "planned",
          priority: "HIGH",
          assignee: "Legal Tech Team",
          dueDate: "2024-02-20",
          dependencies: ["financial-audits"],
          notes: "Legal framework analysis in progress"
        },
        {
          id: "agriculture-audits",
          name: "Food & Agriculture (FDA, USDA, Organic, HACCP)",
          status: "planned",
          priority: "MEDIUM",
          assignee: "Agriculture Team",
          dueDate: "2024-03-01",
          dependencies: ["financial-audits"],
          notes: "USDA integration requirements gathered"
        },
        {
          id: "environmental-audits",
          name: "Environmental & Travel (Carbon, ESG, Pollution Reporting)",
          status: "planned",
          priority: "MEDIUM",
          assignee: "Environmental Team",
          dueDate: "2024-03-10",
          dependencies: ["agriculture-audits"],
          notes: "ESG reporting standards research phase"
        }
      ]
    },
    {
      id: "professional-services",
      title: "Professional Services & IP",
      priority: "MEDIUM",
      status: "planned",
      items: [
        {
          id: "patent-strategy",
          name: "Patent Strategy & Portfolio Management",
          status: "planned",
          priority: "MEDIUM",
          assignee: "IP Team",
          dueDate: "2024-03-15",
          dependencies: ["legal-audits"],
          notes: "IP management system design phase"
        },
        {
          id: "attorney-tools",
          name: "Attorney Tools (Legal Filing Audits, Case Prep)",
          status: "planned",
          priority: "MEDIUM",
          assignee: "Legal Tech Team",
          dueDate: "2024-03-20",
          dependencies: ["patent-strategy"],
          notes: "Legal workflow automation requirements"
        },
        {
          id: "cpa-tax-tools",
          name: "CPA/Tax Tools (Compliance Reviews, Deduction Audits)",
          status: "planned",
          priority: "MEDIUM",
          assignee: "Tax Team",
          dueDate: "2024-03-25",
          dependencies: ["attorney-tools"],
          notes: "Tax compliance framework design"
        }
      ]
    },
    {
      id: "verticals-expansion",
      title: "Verticals & Expansion Modules",
      priority: "MEDIUM",
      status: "planned",
      items: [
        {
          id: "healthcare-audits",
          name: "Healthcare Audits (Lab Results, Oxygen Monitoring)",
          status: "planned",
          priority: "MEDIUM",
          assignee: "Healthcare Team",
          dueDate: "2024-04-01",
          dependencies: ["cpa-tax-tools"],
          notes: "HIPAA compliance requirements analysis"
        },
        {
          id: "education-audits",
          name: "Education Audits (Transcripts, Guidance, IEP/ADA)",
          status: "planned",
          priority: "LOW",
          assignee: "Education Team",
          dueDate: "2024-04-10",
          dependencies: ["healthcare-audits"],
          notes: "Educational compliance standards review"
        },
        {
          id: "government-military",
          name: "Government & Military (ASVAB, Civil Service, Promotion)",
          status: "planned",
          priority: "LOW",
          assignee: "Government Team",
          dueDate: "2024-04-15",
          dependencies: ["education-audits"],
          notes: "Government compliance requirements gathering"
        }
      ]
    },
    {
      id: "investor-partner-portal",
      title: "Investor & Partner Portal",
      priority: "HIGH",
      status: "in-progress",
      items: [
        {
          id: "pledge-intake",
          name: "Pledge Intake Form & API",
          status: "in-progress",
          priority: "HIGH",
          assignee: "Frontend Team",
          dueDate: "2024-02-01",
          dependencies: ["auth-system"],
          notes: "Form design complete, API integration pending"
        },
        {
          id: "tokenized-equity",
          name: "Tokenized Equity (ERC-1400 Smart Contracts)",
          status: "planned",
          priority: "HIGH",
          assignee: "Blockchain Team",
          dueDate: "2024-02-20",
          dependencies: ["pledge-intake"],
          notes: "Smart contract architecture design phase"
        },
        {
          id: "dashboard-exports",
          name: "Dashboard (Charts, CSV/PDF Exports)",
          status: "in-progress",
          priority: "MEDIUM",
          assignee: "Frontend Team",
          dueDate: "2024-02-10",
          dependencies: ["pledge-intake"],
          notes: "Chart library integration complete"
        }
      ]
    },
    {
      id: "deployment-devops",
      title: "Deployment & DevOps",
      priority: "ASAP",
      status: "in-progress",
      items: [
        {
          id: "frontend-deployment",
          name: "Frontend: Netlify (netlify.toml)",
          status: "completed",
          priority: "ASAP",
          assignee: "DevOps Team",
          dueDate: "2024-01-10",
          dependencies: [],
          notes: "Netlify deployment pipeline configured and tested"
        },
        {
          id: "backend-deployment",
          name: "Backend: Render (render.yaml)",
          status: "completed",
          priority: "ASAP",
          assignee: "DevOps Team",
          dueDate: "2024-01-12",
          dependencies: ["frontend-deployment"],
          notes: "Render deployment successful, monitoring enabled"
        },
        {
          id: "ci-cd-monitoring",
          name: "CI/CD & Monitoring (GitHub Actions, Sentry)",
          status: "in-progress",
          priority: "HIGH",
          assignee: "DevOps Team",
          dueDate: "2024-01-30",
          dependencies: ["backend-deployment"],
          notes: "GitHub Actions configured, Sentry integration pending"
        }
      ]
    },
    {
      id: "future-addons",
      title: "Future Add-Ons",
      priority: "LOW",
      status: "planned",
      items: [
        {
          id: "fraud-detection",
          name: "Financial Fraud Detection API",
          status: "planned",
          priority: "LOW",
          assignee: "AI Team",
          dueDate: "2024-05-01",
          dependencies: ["ai-automation"],
          notes: "Machine learning model research phase"
        },
        {
          id: "smart-city-iot",
          name: "Smart City & Industrial IoT Audits",
          status: "planned",
          priority: "LOW",
          assignee: "IoT Team",
          dueDate: "2024-06-01",
          dependencies: ["fraud-detection"],
          notes: "IoT integration standards evaluation"
        },
        {
          id: "blockchain-credentialing",
          name: "Blockchain-Based Credentialing",
          status: "planned",
          priority: "LOW",
          assignee: "Blockchain Team",
          dueDate: "2024-07-01",
          dependencies: ["tokenized-equity"],
          notes: "Credentialing blockchain architecture design"
        }
      ]
    }
  ],
  
  // Progress statistics
  getProgressStats() {
    const allItems = this.categories.flatMap(cat => cat.items);
    const completed = allItems.filter(item => item.status === 'completed').length;
    const inProgress = allItems.filter(item => item.status === 'in-progress').length;
    const planned = allItems.filter(item => item.status === 'planned').length;
    const total = allItems.length;
    
    return {
      total,
      completed,
      inProgress,
      planned,
      completionPercentage: Math.round((completed / total) * 100),
      inProgressPercentage: Math.round((inProgress / total) * 100)
    };
  },
  
  // Get items by priority
  getItemsByPriority(priority) {
    return this.categories
      .flatMap(cat => cat.items)
      .filter(item => item.priority === priority);
  },
  
  // Get overdue items
  getOverdueItems() {
    const now = new Date();
    return this.categories
      .flatMap(cat => cat.items)
      .filter(item => new Date(item.dueDate) < now && item.status !== 'completed');
  }
};

// Status types for checklist items
export const checklistStatusTypes = {
  COMPLETED: "completed",
  IN_PROGRESS: "in-progress", 
  PLANNED: "planned",
  BLOCKED: "blocked",
  ON_HOLD: "on-hold"
};

// Priority levels
export const priorityLevels = {
  ASAP: "ASAP",
  HIGH: "HIGH",
  MEDIUM: "MEDIUM", 
  LOW: "LOW"
};