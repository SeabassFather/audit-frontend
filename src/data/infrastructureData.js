// Deployment & Infrastructure - Cloud, Database, DevOps, Monitoring, Logging, Analytics
export const deploymentInfrastructure = {
  overview: {
    title: "Enterprise Deployment & Infrastructure",
    description: "Comprehensive cloud-native infrastructure with advanced monitoring and analytics",
    availability: "99.99%",
    globalRegions: 12,
    totalServers: 500,
    dailyTransactions: "2M+",
    lastUpdated: new Date().toISOString()
  },
  
  cloudInfrastructure: {
    providers: [
      {
        id: "aws",
        name: "Amazon Web Services",
        status: "primary",
        regions: [
          { name: "us-west-2", status: "active", usage: "85%", costs: "$15K/month" },
          { name: "us-east-1", status: "active", usage: "70%", costs: "$12K/month" },
          { name: "eu-west-1", status: "active", usage: "60%", costs: "$10K/month" },
          { name: "ap-southeast-1", status: "active", usage: "45%", costs: "$8K/month" }
        ],
        services: [
          "EC2 Auto Scaling",
          "RDS Multi-AZ",
          "S3 with CloudFront",
          "Lambda Functions",
          "EKS Kubernetes",
          "ElastiCache Redis",
          "CloudWatch Monitoring"
        ],
        totalCost: "$45K/month"
      },
      {
        id: "azure",
        name: "Microsoft Azure",
        status: "secondary",
        regions: [
          { name: "west-us-2", status: "active", usage: "30%", costs: "$5K/month" },
          { name: "east-us", status: "standby", usage: "10%", costs: "$2K/month" }
        ],
        services: [
          "Azure Kubernetes Service",
          "Azure SQL Database",
          "Blob Storage",
          "Azure Functions",
          "Application Insights"
        ],
        totalCost: "$7K/month"
      },
      {
        id: "gcp",
        name: "Google Cloud Platform",
        status: "development",
        regions: [
          { name: "us-central1", status: "active", usage: "20%", costs: "$3K/month" }
        ],
        services: [
          "Google Kubernetes Engine",
          "Cloud SQL",
          "Cloud Storage",
          "Cloud Functions",
          "BigQuery Analytics"
        ],
        totalCost: "$3K/month"
      }
    ],
    
    architecture: {
      pattern: "Microservices with Event-Driven Architecture",
      containers: "Docker with Kubernetes orchestration",
      serviceCount: 45,
      apiGateway: "Kong with rate limiting and authentication",
      loadBalancing: "HAProxy with automatic failover",
      cdn: "CloudFlare with global edge caching"
    }
  },
  
  databases: {
    primary: [
      {
        id: "mongodb-cluster",
        name: "MongoDB Atlas Cluster",
        type: "Document Database",
        status: "healthy",
        replication: "3-node replica set",
        sharding: "Enabled across 4 shards",
        storage: "2.5TB",
        dailyOperations: "5M+ reads, 500K writes",
        backups: "Continuous with point-in-time recovery",
        monitoring: "Real-time with Ops Manager"
      },
      {
        id: "postgresql-cluster",
        name: "PostgreSQL Cluster",
        type: "Relational Database",
        status: "healthy",
        replication: "Master-slave with automatic failover",
        storage: "1.8TB",
        dailyOperations: "2M+ reads, 200K writes",
        backups: "Daily full + continuous WAL",
        monitoring: "pgMonitor with Grafana"
      }
    ],
    
    analytics: [
      {
        id: "clickhouse-cluster",
        name: "ClickHouse Analytics",
        type: "OLAP Database",
        status: "healthy",
        nodes: 6,
        storage: "5TB compressed",
        queryPerformance: "Sub-second for 100M+ rows",
        retention: "2 years",
        compression: "LZ4 with 6:1 ratio"
      },
      {
        id: "elasticsearch",
        name: "Elasticsearch Cluster",
        type: "Search & Analytics",
        status: "healthy",
        nodes: 9,
        indices: 150,
        storage: "3TB",
        searchLatency: "<50ms",
        logIngestion: "100GB/day"
      }
    ],
    
    cache: [
      {
        id: "redis-cluster",
        name: "Redis Cluster",
        type: "In-Memory Cache",
        status: "healthy",
        nodes: 6,
        memory: "256GB",
        operations: "1M+ ops/sec",
        hitRate: "95%",
        persistence: "RDB snapshots + AOF"
      }
    ]
  },
  
  devOps: {
    cicd: {
      platform: "GitHub Actions + Jenkins",
      pipelines: [
        {
          name: "Frontend CI/CD",
          trigger: "Push to main",
          stages: ["Lint", "Test", "Build", "Deploy"],
          duration: "8 minutes",
          successRate: "98%",
          deployments: "15/day average"
        },
        {
          name: "Backend CI/CD",
          trigger: "Push to main",
          stages: ["Test", "Security Scan", "Build", "Deploy"],
          duration: "12 minutes",
          successRate: "96%",
          deployments: "8/day average"
        },
        {
          name: "Infrastructure as Code",
          trigger: "Infrastructure changes",
          stages: ["Validate", "Plan", "Apply"],
          duration: "15 minutes",
          successRate: "99%",
          deployments: "2/day average"
        }
      ]
    },
    
    containerization: {
      platform: "Docker + Kubernetes",
      clusters: [
        {
          name: "Production Cluster",
          nodes: 20,
          pods: 150,
          namespaces: 8,
          resourceUtilization: "75%",
          autoScaling: "Enabled"
        },
        {
          name: "Staging Cluster",
          nodes: 6,
          pods: 45,
          namespaces: 4,
          resourceUtilization: "40%",
          autoScaling: "Enabled"
        }
      ]
    },
    
    security: {
      scanning: [
        "Container image scanning with Trivy",
        "SAST with SonarQube",
        "DAST with OWASP ZAP",
        "Dependency scanning with Snyk",
        "Infrastructure scanning with Checkov"
      ],
      compliance: [
        "SOC 2 Type II",
        "ISO 27001",
        "GDPR compliance",
        "HIPAA compliance",
        "PCI DSS Level 1"
      ],
      policies: [
        "Zero-trust network architecture",
        "Multi-factor authentication",
        "Role-based access control",
        "Encryption at rest and in transit",
        "Regular security audits"
      ]
    }
  },
  
  monitoring: {
    platforms: [
      {
        id: "datadog",
        name: "Datadog",
        type: "Application Performance Monitoring",
        coverage: "Full stack monitoring",
        alerts: 150,
        dashboards: 25,
        retention: "15 months",
        features: [
          "Real-time metrics",
          "Distributed tracing",
          "Log analytics",
          "Synthetic monitoring",
          "Infrastructure monitoring"
        ]
      },
      {
        id: "newrelic",
        name: "New Relic",
        type: "Performance Monitoring",
        coverage: "Application performance",
        alerts: 75,
        dashboards: 15,
        retention: "12 months",
        features: [
          "APM insights",
          "Browser monitoring",
          "Mobile monitoring",
          "AI-powered alerts",
          "Error tracking"
        ]
      },
      {
        id: "prometheus",
        name: "Prometheus + Grafana",
        type: "Infrastructure Monitoring",
        coverage: "Kubernetes & infrastructure",
        alerts: 200,
        dashboards: 40,
        retention: "6 months",
        features: [
          "Time-series metrics",
          "Custom dashboards",
          "Alert manager",
          "Service discovery",
          "High availability"
        ]
      }
    ],
    
    sla: {
      availability: "99.99%",
      responseTime: "<100ms p95",
      errorRate: "<0.1%",
      mttr: "<5 minutes",
      mtbf: ">720 hours"
    },
    
    alerting: {
      channels: ["PagerDuty", "Slack", "Email", "SMS"],
      escalation: "Automated escalation after 5 minutes",
      onCall: "24/7 rotation with 3 engineers",
      responseTime: "<2 minutes for critical alerts"
    }
  },
  
  logging: {
    centralized: {
      platform: "ELK Stack (Elasticsearch, Logstash, Kibana)",
      ingestion: "100GB/day",
      retention: "90 days hot, 1 year warm, 7 years cold",
      searchCapability: "Real-time search across all logs",
      parsing: "Structured logging with JSON format"
    },
    
    sources: [
      "Application logs",
      "Web server logs",
      "Database logs",
      "Security logs",
      "Audit logs",
      "Infrastructure logs",
      "Container logs"
    ],
    
    compliance: {
      auditTrail: "Complete audit trail for compliance",
      retention: "7 years for regulatory compliance",
      encryption: "AES-256 encryption at rest",
      access: "Role-based access with approval workflow",
      integrity: "Cryptographic signatures for log integrity"
    }
  },
  
  operationalAnalytics: {
    realTimeMetrics: [
      {
        name: "Request Rate",
        current: "15K requests/minute",
        trend: "+5% from last hour",
        threshold: "20K requests/minute"
      },
      {
        name: "Response Time",
        current: "85ms average",
        trend: "-2ms from last hour",
        threshold: "<100ms p95"
      },
      {
        name: "Error Rate",
        current: "0.05%",
        trend: "-0.01% from last hour",
        threshold: "<0.1%"
      },
      {
        name: "Database Connections",
        current: "450 active",
        trend: "Stable",
        threshold: "<800 connections"
      }
    ],
    
    businessMetrics: [
      {
        name: "Active Users",
        current: "12.5K",
        trend: "+8% from yesterday",
        goal: "15K by month end"
      },
      {
        name: "Audit Reports Generated",
        current: "850/day",
        trend: "+12% from last week",
        goal: "1000/day"
      },
      {
        name: "Revenue per Hour",
        current: "$420",
        trend: "+15% from last week",
        goal: "$500/hour"
      }
    ],
    
    capacityPlanning: {
      cpuUtilization: "65% average",
      memoryUtilization: "70% average",
      diskUtilization: "55% average",
      networkBandwidth: "2.5 Gbps average",
      scalingTriggers: [
        "CPU > 80% for 5 minutes",
        "Memory > 85% for 3 minutes",
        "Response time > 200ms for 2 minutes"
      ],
      autoScaling: "Enabled with 2-20 instance range"
    }
  }
};

export const deploymentEnvironments = [
  {
    id: "production",
    name: "Production",
    status: "healthy",
    uptime: "99.98%",
    users: "active",
    deployment: "Blue-green with zero downtime",
    monitoring: "Full monitoring stack",
    backup: "Real-time replication + daily snapshots",
    security: "Maximum security posture"
  },
  {
    id: "staging",
    name: "Staging",
    status: "healthy",
    uptime: "99.95%",
    users: "internal testing",
    deployment: "Continuous deployment",
    monitoring: "Essential monitoring",
    backup: "Daily snapshots",
    security: "Production-like security"
  },
  {
    id: "development",
    name: "Development",
    status: "healthy",
    uptime: "99.9%",
    users: "development team",
    deployment: "Rapid iteration",
    monitoring: "Basic monitoring",
    backup: "Weekly snapshots",
    security: "Development security"
  },
  {
    id: "dr",
    name: "Disaster Recovery",
    status: "standby",
    uptime: "100%",
    users: "emergency only",
    deployment: "Hot standby",
    monitoring: "Health checks only",
    backup: "Synchronized with production",
    security: "Maximum security posture"
  }
];