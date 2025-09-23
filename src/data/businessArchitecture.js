// Business Architecture and Operations Management Data
export const documentControlData = {
  documentTypes: [
    'Policy Document',
    'Process Document', 
    'Technical Specification',
    'User Manual',
    'Training Material',
    'Compliance Document',
    'Risk Assessment',
    'Business Plan',
    'Audit Report',
    'System Documentation'
  ],
  
  reviewCycles: [
    { id: 'weekly', name: 'Weekly', frequency: 7, description: 'Critical operational documents' },
    { id: 'monthly', name: 'Monthly', frequency: 30, description: 'Standard policy documents' },
    { id: 'quarterly', name: 'Quarterly', frequency: 90, description: 'Strategic documents' },
    { id: 'semi-annual', name: 'Semi-Annual', frequency: 180, description: 'Compliance documents' },
    { id: 'annual', name: 'Annual', frequency: 365, description: 'Governance documents' }
  ],
  
  documentStatuses: [
    { id: 'draft', name: 'Draft', color: 'yellow', description: 'Under development' },
    { id: 'review', name: 'Under Review', color: 'blue', description: 'Pending approval' },
    { id: 'active', name: 'Active', color: 'green', description: 'Currently effective' },
    { id: 'revision', name: 'Under Revision', color: 'orange', description: 'Being updated' },
    { id: 'retired', name: 'Retired', color: 'gray', description: 'No longer effective' },
    { id: 'archived', name: 'Archived', color: 'purple', description: 'Historical reference' }
  ],

  sampleDocuments: [
    {
      id: 'DOC-001',
      title: 'Audit Process Documentation',
      type: 'Process Document',
      version: '2.3',
      status: 'active',
      reviewCycle: 'quarterly',
      lastReview: '2024-10-15',
      nextReview: '2025-01-15',
      owner: 'Quality Assurance Team',
      approver: 'Chief Compliance Officer',
      distributionList: ['QA Team', 'Audit Team', 'Management'],
      revisionHistory: [
        { version: '2.3', date: '2024-10-15', author: 'Jane Smith', changes: 'Updated compliance requirements' },
        { version: '2.2', date: '2024-07-15', author: 'John Doe', changes: 'Added new audit procedures' },
        { version: '2.1', date: '2024-04-15', author: 'Jane Smith', changes: 'Minor formatting updates' }
      ]
    },
    {
      id: 'DOC-002', 
      title: 'Data Privacy Policy',
      type: 'Policy Document',
      version: '1.5',
      status: 'active',
      reviewCycle: 'semi-annual',
      lastReview: '2024-08-01',
      nextReview: '2025-02-01',
      owner: 'Legal Department',
      approver: 'Chief Legal Officer',
      distributionList: ['All Staff', 'Board Members', 'External Partners'],
      revisionHistory: [
        { version: '1.5', date: '2024-08-01', author: 'Legal Team', changes: 'Updated for new regulations' },
        { version: '1.4', date: '2024-02-01', author: 'Legal Team', changes: 'Annual compliance review' }
      ]
    }
  ]
};

export const supportMaintenanceData = {
  supportTiers: [
    { 
      id: 'tier1', 
      name: 'Tier 1 - Basic Support',
      responseTime: '4 hours',
      availability: 'Business Hours (9-5 EST)',
      channels: ['Email', 'Web Portal'],
      coverage: 'General inquiries, basic troubleshooting'
    },
    {
      id: 'tier2',
      name: 'Tier 2 - Standard Support', 
      responseTime: '2 hours',
      availability: 'Extended Hours (7AM-11PM EST)',
      channels: ['Email', 'Phone', 'Web Portal', 'Chat'],
      coverage: 'Technical issues, system problems'
    },
    {
      id: 'tier3',
      name: 'Tier 3 - Premium Support',
      responseTime: '1 hour', 
      availability: '24/7',
      channels: ['Email', 'Phone', 'Emergency Hotline', 'Web Portal', 'Chat'],
      coverage: 'Critical issues, emergency support'
    },
    {
      id: 'tier4',
      name: 'Tier 4 - Enterprise Support',
      responseTime: '30 minutes',
      availability: '24/7 with dedicated team',
      channels: ['All channels + Dedicated Account Manager'],
      coverage: 'Mission-critical support, custom solutions'
    }
  ],

  maintenanceSchedules: [
    {
      type: 'weekly',
      name: 'Weekly Maintenance',
      tasks: ['System health checks', 'Log rotation', 'Backup verification', 'Security scan'],
      duration: '2 hours',
      scheduledTime: 'Sunday 2:00 AM EST'
    },
    {
      type: 'monthly', 
      name: 'Monthly Maintenance',
      tasks: ['Security updates', 'Performance optimization', 'Database maintenance', 'Audit log review'],
      duration: '4 hours',
      scheduledTime: 'First Sunday 12:00 AM EST'
    },
    {
      type: 'quarterly',
      name: 'Quarterly Maintenance', 
      tasks: ['Major updates', 'Infrastructure review', 'Capacity planning', 'Disaster recovery testing'],
      duration: '8 hours',
      scheduledTime: 'End of quarter weekend'
    },
    {
      type: 'annual',
      name: 'Annual Maintenance',
      tasks: ['Full system upgrade', 'Hardware refresh', 'Security audit', 'Business continuity review'],
      duration: '24 hours',
      scheduledTime: 'Scheduled maintenance window'
    }
  ],

  resourceRequirements: [
    {
      phase: 'Planning',
      duration: '2-4 weeks',
      resources: ['Business Analyst', 'Project Manager', 'Technical Lead'],
      deliverables: ['Requirements document', 'Project plan', 'Resource allocation']
    },
    {
      phase: 'Development', 
      duration: '6-12 weeks',
      resources: ['Developers', 'UI/UX Designer', 'QA Engineer'],
      deliverables: ['Code implementation', 'User interface', 'Unit tests']
    },
    {
      phase: 'Testing',
      duration: '2-4 weeks', 
      resources: ['QA Team', 'Test Engineers', 'Business Users'],
      deliverables: ['Test results', 'Bug reports', 'User acceptance testing']
    },
    {
      phase: 'Deployment',
      duration: '1-2 weeks',
      resources: ['DevOps Engineer', 'System Administrator', 'Support Team'],
      deliverables: ['Production deployment', 'Monitoring setup', 'Documentation']
    },
    {
      phase: 'Maintenance',
      duration: 'Ongoing',
      resources: ['Support Team', 'Maintenance Staff', 'Monitoring Systems'],
      deliverables: ['System updates', 'Issue resolution', 'Performance monitoring']
    }
  ]
};

export const qaTestingData = {
  testingPyramid: {
    unit: {
      level: 'Unit Testing',
      percentage: '70%',
      description: 'Component and function level testing',
      types: ['Component Tests', 'Function Tests', 'Mocking Tests', 'Isolated Tests'],
      tools: ['Jest', 'React Testing Library', 'Vitest', 'Cypress Component Testing'],
      frequency: 'Continuous'
    },
    integration: {
      level: 'Integration Testing', 
      percentage: '20%',
      description: 'Module and API integration testing',
      types: ['API Tests', 'Database Tests', 'Service Integration', 'End-to-End Workflows'],
      tools: ['Cypress', 'Postman', 'Newman', 'Supertest'],
      frequency: 'Daily'
    },
    manual: {
      level: 'Manual Testing',
      percentage: '10%', 
      description: 'User experience and exploratory testing',
      types: ['User Acceptance Testing', 'Exploratory Testing', 'Usability Testing', 'Security Testing'],
      tools: ['Manual Test Cases', 'Accessibility Tools', 'Security Scanners', 'Performance Tools'],
      frequency: 'Sprint-based'
    }
  },

  qaProcesses: [
    {
      id: 'test-planning',
      name: 'Test Planning',
      description: 'Define test strategy and approach',
      activities: ['Requirements analysis', 'Test scope definition', 'Resource planning', 'Risk assessment'],
      deliverables: ['Test Plan', 'Test Strategy', 'Test Schedule']
    },
    {
      id: 'test-design',
      name: 'Test Design', 
      description: 'Create test cases and test data',
      activities: ['Test case creation', 'Test data preparation', 'Test environment setup', 'Automation script development'],
      deliverables: ['Test Cases', 'Test Data', 'Automated Scripts']
    },
    {
      id: 'test-execution',
      name: 'Test Execution',
      description: 'Execute tests and track results',
      activities: ['Manual test execution', 'Automated test execution', 'Defect reporting', 'Test progress tracking'],
      deliverables: ['Test Results', 'Defect Reports', 'Test Metrics']
    },
    {
      id: 'test-closure',
      name: 'Test Closure',
      description: 'Complete testing and document lessons learned',
      activities: ['Test completion criteria verification', 'Test artifact archival', 'Lessons learned documentation'],
      deliverables: ['Test Summary Report', 'Lessons Learned', 'Process Improvements']
    }
  ]
};

export const businessContinuityData = {
  exitStrategies: [
    {
      id: 'data-migration',
      name: 'Data Migration Strategy',
      description: 'Plan for complete data export and transfer',
      components: ['Data mapping', 'Export procedures', 'Data validation', 'Transfer protocols'],
      timeline: '30-90 days',
      responsibility: 'Data Management Team'
    },
    {
      id: 'service-transition',
      name: 'Service Transition Strategy',
      description: 'Transition services to alternative providers',
      components: ['Service inventory', 'Provider identification', 'Transition planning', 'Knowledge transfer'],
      timeline: '60-180 days', 
      responsibility: 'Operations Team'
    },
    {
      id: 'asset-liquidation',
      name: 'Asset Liquidation Strategy',
      description: 'Systematic disposal of business assets',
      components: ['Asset inventory', 'Valuation', 'Sale procedures', 'Legal compliance'],
      timeline: '90-365 days',
      responsibility: 'Finance Team'
    }
  ],

  backupStrategies: [
    {
      type: 'daily',
      name: 'Daily Incremental Backup',
      frequency: 'Every 24 hours',
      retention: '30 days',
      scope: 'Changed data only',
      location: 'Cloud storage + Local'
    },
    {
      type: 'weekly',
      name: 'Weekly Full Backup', 
      frequency: 'Every Sunday',
      retention: '12 weeks',
      scope: 'Complete system',
      location: 'Offsite cloud storage'
    },
    {
      type: 'monthly',
      name: 'Monthly Archive Backup',
      frequency: 'End of month',
      retention: '7 years',
      scope: 'Complete system + historical data',
      location: 'Long-term archival storage'
    }
  ],

  successionPlanning: [
    {
      role: 'Chief Executive Officer',
      successor: 'Chief Operating Officer',
      timeline: 'Immediate',
      requirements: ['Board approval', 'Executive transition plan', 'Stakeholder communication'],
      documentation: 'CEO Succession Plan v2.1'
    },
    {
      role: 'Technical Lead',
      successor: 'Senior Developer',
      timeline: '2-4 weeks',
      requirements: ['Knowledge transfer', 'System access transfer', 'Documentation review'],
      documentation: 'Technical Leadership Transition Guide'
    },
    {
      role: 'Compliance Officer',
      successor: 'Senior Compliance Analyst',
      timeline: '1-2 weeks',
      requirements: ['Regulatory notification', 'Certification transfer', 'Audit continuity'],
      documentation: 'Compliance Succession Procedures'
    }
  ]
};