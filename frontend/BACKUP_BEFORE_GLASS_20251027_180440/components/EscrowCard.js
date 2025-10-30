import React from \"react\";
import DashboardCard from \"./DashboardCard\";

function EscrowCard({ transactionStatus, volumeData, complianceInfo }) {
  return (
    <DashboardCard title=\"Escrow\" live gradient=\"linear-gradient(90deg,#e8f5e9,#e3f2fd)\">
      <div>
        {transactionStatus && (
          <div>{transactionStatus}</div>
        )}
        {volumeData && (
          <div>{volumeData}</div>
        )}
        {complianceInfo && (
          <div style={{ marginTop: \"8px\", fontSize: \"0.9rem\" }}>
            {complianceInfo}
          </div>
        )}
      </div>
    </DashboardCard>
  );
}

export default EscrowCard;
