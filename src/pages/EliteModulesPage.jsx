import React from "react";

const eliteModules = [
  {
    id: 1,
    emoji: "🚀",
    title: "Advanced Analytics Engine",
    description: "Real-time business intelligence with predictive modeling, risk analytics, and automated report generation with AI-powered insights."
  },
  {
    id: 2,
    emoji: "🔒",
    title: "Enterprise Security Suite",
    description: "Military-grade encryption, multi-factor authentication, advanced threat detection, and compliance monitoring with SOC 2 Type II certification."
  },
  {
    id: 3,
    emoji: "🏢",
    title: "Multi-Entity Management",
    description: "Centralized control for multiple business entities, subsidiaries, and divisions with role-based access and consolidated reporting."
  },
  {
    id: 4,
    emoji: "🤖",
    title: "AI-Powered Automation",
    description: "Intelligent workflow automation, document processing, anomaly detection, and smart recommendations powered by machine learning."
  },
  {
    id: 5,
    emoji: "📊",
    title: "Executive Dashboard",
    description: "C-suite level insights with customizable KPIs, real-time metrics, performance scorecards, and strategic planning tools."
  },
  {
    id: 6,
    emoji: "🌐",
    title: "Global Compliance Manager",
    description: "Multi-jurisdiction regulatory compliance, automated policy updates, audit trail management, and international standards adherence."
  },
  {
    id: 7,
    emoji: "💼",
    title: "Premium API Gateway",
    description: "Enterprise-grade API access with unlimited calls, priority support, custom integrations, and white-label solutions."
  },
  {
    id: 8,
    emoji: "🔄",
    title: "Advanced Workflow Engine",
    description: "Complex multi-stage approval processes, conditional logic, parallel processing, and integration with external systems."
  },
  {
    id: 9,
    emoji: "📈",
    title: "Predictive Risk Assessment",
    description: "AI-driven risk scoring, early warning systems, scenario modeling, and proactive mitigation recommendations."
  },
  {
    id: 10,
    emoji: "🎯",
    title: "Custom Solution Builder",
    description: "Build tailored audit solutions with drag-and-drop interface, custom fields, branded reports, and specialized workflows."
  },
  {
    id: 11,
    emoji: "☁️",
    title: "Enterprise Cloud Platform",
    description: "Dedicated cloud infrastructure, 99.9% uptime SLA, auto-scaling, disaster recovery, and premium technical support."
  },
  {
    id: 12,
    emoji: "👥",
    title: "Strategic Consulting Services",
    description: "Dedicated account management, custom training programs, implementation support, and ongoing strategic advisory services."
  }
];

export default function EliteModulesPage() {
  return (
    <div className="page">
      <div className="hero">
        <h1 className="h1">🏆 Elite Modules / Enterprise Suite</h1>
        <p className="subtext">
          Unlock the full potential of AuditDNA with our premium enterprise-grade modules. 
          Designed for large organizations requiring advanced functionality, enhanced security, 
          and dedicated support.
        </p>
      </div>

      <div className="grid">
        {eliteModules.map((module) => (
          <div key={module.id} className="card">
            <div className="card-header">
              <span className="card-emoji">{module.emoji}</span>
              <h3 className="card-title">{module.title}</h3>
            </div>
            <p className="card-description">{module.description}</p>
            <div className="card-footer">
              <button className="btn btn-primary">Learn More</button>
              <span className="badge">Enterprise</span>
            </div>
          </div>
        ))}
      </div>

      <div className="hero" style={{ marginTop: "2rem" }}>
        <h2 className="h2">Ready to Upgrade?</h2>
        <p className="subtext">
          Contact our enterprise sales team to discuss your specific requirements and 
          get a customized proposal for your organization.
        </p>
        <div className="inline" style={{ gap: "1rem", marginTop: "1rem" }}>
          <button className="btn btn-primary">Contact Sales</button>
          <button className="btn">Schedule Demo</button>
        </div>
      </div>
    </div>
  );
}