import React from \"react\";
import DashboardCard from \"./DashboardCard\";

function AuditFrameworkCard({ workflowEngine, riskScoring, complianceModules }) {
  return (
    <DashboardCard title=\"Audit & Compliance Framework\" gradient=\"linear-gradient(90deg,#e3f2fd,#dcedc8)\">
      <div>
        {workflowEngine && (
          <div>{workflowEngine}</div>
        )}
        {riskScoring && (
          <div style={{ marginTop: \"8px\" }}>{riskScoring}</div>
        )}
        {complianceModules && (
          <div style={{ marginTop: \"8px\", fontSize: \"0.9rem\" }}>{complianceModules}</div>
        )}
      </div>
    </DashboardCard>
  );
}

export default AuditFrameworkCard;
