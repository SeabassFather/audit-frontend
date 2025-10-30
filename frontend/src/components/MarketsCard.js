import React from \"react\";
import DashboardCard from \"./DashboardCard\";

function MarketsCard({ indices, trendData, volatilitySignals, complianceFlags }) {
  return (
    <DashboardCard title=\"Markets: Indices & Volatility\" live gradient=\"linear-gradient(90deg,#e3f2fd,#e8f5e9)\">
      <div>
        {indices && (
          <div>{indices}</div>
        )}
        {trendData && (
          <div>{trendData}</div>
        )}
        {volatilitySignals && (
          <div>{volatilitySignals}</div>
        )}
        {complianceFlags && (
          <div>{complianceFlags}</div>
        )}
      </div>
    </DashboardCard>
  );
}

export default MarketsCard;
