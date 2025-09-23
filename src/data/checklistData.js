// Interactive Checklist System with Status Tracking
export const checklistSystem = {
  overview: {
    title: "Interactive Checklist Management System",
    description: "Comprehensive system for managing interactive checklists with real-time status tracking",
    totalChecklists: 25,
    totalItems: 450,
    completionRate: 68,
    lastUpdated: new Date().toISOString()
  },
  
  checklistTypes: [
    {
      id: "milestone-deadlines",
      name: "Milestone Deadlines",
      category: "Project Management",
      priority: "critical",
      items: [
        {
          id: "md-001",
          title: "Q4 2024 Revenue Target",
          description: "Achieve $2.5M quarterly revenue milestone",
          status: "in-progress",
          progress: 75,
          dueDate: "2024-12-31",
          assignee: "Revenue Team",
          dependencies: ["Product Launch", "Marketing Campaign"],
          checklist: [
            { item: "Product feature development complete", completed: true, required: true },
            { item: "Marketing campaign launched", completed: true, required: true },
            { item: "Sales team trained", completed: false, required: true },
            { item: "Customer success program active", completed: false, required: true },
            { item: "Pricing optimization implemented", completed: false, required: false }
          ],
          subFeatures: [
            { name: "Revenue Dashboard", status: "completed", link: "/dashboard/revenue" },
            { name: "Sales Tracking", status: "in-progress", link: "/sales/tracking" },
            { name: "Customer Analytics", status: "pending", link: "/analytics/customers" }
          ]
        },
        {
          id: "md-002",
          title: "International Expansion Milestone",
          description: "Launch services in 5 new countries",
          status: "planning",
          progress: 25,
          dueDate: "2025-06-30",
          assignee: "International Team",
          dependencies: ["Legal Framework", "Localization"],
          checklist: [
            { item: "Market research completed", completed: true, required: true },
            { item: "Legal compliance review", completed: false, required: true },
            { item: "Localization strategy", completed: false, required: true },
            { item: "Partnership agreements", completed: false, required: true },
            { item: "Local team hiring", completed: false, required: false }
          ],
          subFeatures: [
            { name: "Market Research Portal", status: "completed", link: "/research/markets" },
            { name: "Legal Compliance Tracker", status: "in-progress", link: "/legal/compliance" },
            { name: "Localization Dashboard", status: "pending", link: "/localization" }
          ]
        }
      ]
    },
    
    {
      id: "revenue-optimization",
      name: "Revenue Optimization",
      category: "Business Strategy",
      priority: "high",
      items: [
        {
          id: "ro-001",
          title: "Dynamic Pricing Implementation",
          description: "Implement AI-driven dynamic pricing system",
          status: "in-progress",
          progress: 60,
          dueDate: "2025-03-15",
          assignee: "Product Team",
          dependencies: ["AI Model Training", "Data Pipeline"],
          checklist: [
            { item: "Pricing algorithm development", completed: true, required: true },
            { item: "A/B testing framework", completed: true, required: true },
            { item: "Customer segmentation model", completed: false, required: true },
            { item: "Real-time price updates", completed: false, required: true },
            { item: "Competitor price monitoring", completed: false, required: false }
          ],
          subFeatures: [
            { name: "Pricing Engine", status: "in-progress", link: "/pricing/engine" },
            { name: "A/B Testing Dashboard", status: "completed", link: "/testing/ab" },
            { name: "Competitor Analysis", status: "planning", link: "/analysis/competitors" }
          ]
        },
        {
          id: "ro-002",
          title: "Customer Lifetime Value Optimization",
          description: "Increase CLV through retention and upselling",
          status: "active",
          progress: 45,
          dueDate: "2025-05-30",
          assignee: "Customer Success",
          dependencies: ["Analytics Platform", "CRM Integration"],
          checklist: [
            { item: "CLV calculation model", completed: true, required: true },
            { item: "Churn prediction algorithm", completed: false, required: true },
            { item: "Upselling automation", completed: false, required: true },
            { item: "Retention campaigns", completed: false, required: true },
            { item: "Loyalty program design", completed: false, required: false }
          ],
          subFeatures: [
            { name: "CLV Analytics", status: "completed", link: "/analytics/clv" },
            { name: "Churn Prediction", status: "in-progress", link: "/prediction/churn" },
            { name: "Upselling Engine", status: "planning", link: "/upselling" }
          ]
        }
      ]
    },
    
    {
      id: "monetization-strategies",
      name: "Monetization Strategies",
      category: "Revenue Generation",
      priority: "high",
      items: [
        {
          id: "ms-001",
          title: "Freemium to Premium Conversion",
          description: "Optimize conversion funnel from free to paid users",
          status: "active",
          progress: 70,
          dueDate: "2025-02-28",
          assignee: "Growth Team",
          dependencies: ["User Analytics", "Product Features"],
          checklist: [
            { item: "Conversion funnel analysis", completed: true, required: true },
            { item: "Feature gating strategy", completed: true, required: true },
            { item: "Onboarding optimization", completed: false, required: true },
            { item: "Trial period optimization", completed: false, required: true },
            { item: "Upgrade prompts implementation", completed: false, required: false }
          ],
          subFeatures: [
            { name: "Conversion Analytics", status: "completed", link: "/analytics/conversion" },
            { name: "Feature Gating", status: "completed", link: "/features/gating" },
            { name: "Onboarding Flow", status: "in-progress", link: "/onboarding" }
          ]
        },
        {
          id: "ms-002",
          title: "API Monetization Platform",
          description: "Create revenue streams through API usage",
          status: "planning",
          progress: 30,
          dueDate: "2025-08-31",
          assignee: "API Team",
          dependencies: ["API Gateway", "Billing System"],
          checklist: [
            { item: "API usage tracking", completed: true, required: true },
            { item: "Tiered pricing model", completed: false, required: true },
            { item: "Rate limiting implementation", completed: false, required: true },
            { item: "Developer portal", completed: false, required: true },
            { item: "Usage analytics dashboard", completed: false, required: false }
          ],
          subFeatures: [
            { name: "API Gateway", status: "in-progress", link: "/api/gateway" },
            { name: "Usage Tracking", status: "completed", link: "/api/usage" },
            { name: "Developer Portal", status: "planning", link: "/developers" }
          ]
        }
      ]
    }
  ],
  
  statusTypes: {
    "not-started": { 
      label: "Not Started", 
      color: "bg-gray-100 text-gray-800", 
      icon: "⚪", 
      progress: 0 
    },
    "planning": { 
      label: "Planning", 
      color: "bg-blue-100 text-blue-800", 
      icon: "🔵", 
      progress: 10 
    },
    "in-progress": { 
      label: "In Progress", 
      color: "bg-yellow-100 text-yellow-800", 
      icon: "🟡", 
      progress: 50 
    },
    "active": { 
      label: "Active", 
      color: "bg-green-100 text-green-800", 
      icon: "🟢", 
      progress: 75 
    },
    "completed": { 
      label: "Completed", 
      color: "bg-purple-100 text-purple-800", 
      icon: "🟣", 
      progress: 100 
    },
    "blocked": { 
      label: "Blocked", 
      color: "bg-red-100 text-red-800", 
      icon: "🔴", 
      progress: 0 
    },
    "on-hold": { 
      label: "On Hold", 
      color: "bg-orange-100 text-orange-800", 
      icon: "🟠", 
      progress: 25 
    }
  },
  
  priorityTypes: {
    "critical": { 
      label: "Critical", 
      color: "bg-red-500 text-white", 
      urgency: 1 
    },
    "high": { 
      label: "High", 
      color: "bg-orange-500 text-white", 
      urgency: 2 
    },
    "medium": { 
      label: "Medium", 
      color: "bg-yellow-500 text-white", 
      urgency: 3 
    },
    "low": { 
      label: "Low", 
      color: "bg-green-500 text-white", 
      urgency: 4 
    }
  }
};

export const endToEndFlowSimulation = {
  workflows: [
    {
      id: "audit-workflow",
      name: "Complete Audit Workflow",
      description: "End-to-end audit process from initiation to completion",
      steps: [
        {
          id: "step-1",
          name: "Audit Request Initiation",
          status: "automated",
          duration: "5 minutes",
          inputs: ["Client information", "Audit type", "Requirements"],
          outputs: ["Audit ID", "Initial assessment"],
          actions: ["Validate client", "Assign audit team", "Generate checklist"]
        },
        {
          id: "step-2",
          name: "Document Collection",
          status: "automated",
          duration: "2-5 days",
          inputs: ["Document requirements", "Client uploads"],
          outputs: ["Document inventory", "Completeness check"],
          actions: ["OCR processing", "Document validation", "Missing item alerts"]
        },
        {
          id: "step-3",
          name: "Audit Execution",
          status: "semi-automated",
          duration: "3-7 days",
          inputs: ["Processed documents", "Audit templates"],
          outputs: ["Audit findings", "Compliance status"],
          actions: ["Automated analysis", "Manual review", "Exception handling"]
        },
        {
          id: "step-4",
          name: "Report Generation",
          status: "automated",
          duration: "1 day",
          inputs: ["Audit findings", "Report templates"],
          outputs: ["Final report", "Executive summary"],
          actions: ["Report compilation", "Quality review", "Client delivery"]
        }
      ],
      metrics: {
        totalProcessingTime: "7-14 days",
        automationLevel: "85%",
        accuracyRate: "99.2%",
        clientSatisfaction: "4.8/5"
      }
    },
    
    {
      id: "compliance-workflow",
      name: "Compliance Monitoring Workflow",
      description: "Continuous compliance monitoring and alerting system",
      steps: [
        {
          id: "step-1",
          name: "Regulatory Updates Monitoring",
          status: "automated",
          duration: "Continuous",
          inputs: ["Regulatory feeds", "AI monitoring"],
          outputs: ["Change notifications", "Impact assessments"],
          actions: ["Feed parsing", "Change detection", "Impact analysis"]
        },
        {
          id: "step-2",
          name: "Client Impact Assessment",
          status: "automated",
          duration: "Real-time",
          inputs: ["Client profiles", "Regulatory changes"],
          outputs: ["Impact scores", "Action requirements"],
          actions: ["Profile matching", "Risk assessment", "Priority ranking"]
        },
        {
          id: "step-3",
          name: "Automated Compliance Updates",
          status: "automated",
          duration: "1-24 hours",
          inputs: ["Action requirements", "Update templates"],
          outputs: ["Updated policies", "Client notifications"],
          actions: ["Policy updates", "Client communication", "Implementation tracking"]
        }
      ],
      metrics: {
        responseTime: "<4 hours",
        automationLevel: "95%",
        complianceRate: "99.8%",
        regulatoryUpdates: "50+ sources"
      }
    }
  ],
  
  integrationPoints: [
    {
      name: "CRM Integration",
      systems: ["Salesforce", "HubSpot", "Custom CRM"],
      dataSync: "Real-time bidirectional",
      status: "active"
    },
    {
      name: "Document Management",
      systems: ["SharePoint", "Box", "Google Drive"],
      dataSync: "Event-driven",
      status: "active"
    },
    {
      name: "Financial Systems",
      systems: ["QuickBooks", "SAP", "NetSuite"],
      dataSync: "Daily batch",
      status: "active"
    },
    {
      name: "Communication Platforms",
      systems: ["Slack", "Microsoft Teams", "Email"],
      dataSync: "Real-time notifications",
      status: "active"
    }
  ]
};