import React from \"react\";
import DashboardCard from \"./DashboardCard\";

function ComplianceCard({ agencyStatus, auditFlows }) {
  return (
    <DashboardCard title=\"Cross-Border & Compliance\" gradient=\"linear-gradient(90deg,#e3f2fd,#c8e6c9)\">
      <div>
        {agencyStatus && (
          <div>{agencyStatus}</div>
        )}
        {auditFlows && (
          <div style={{ marginTop: \"10px\" }}>
            {auditFlows}
          </div>
        )}
      </div>
    </DashboardCard>
  );
}

export default ComplianceCard;
