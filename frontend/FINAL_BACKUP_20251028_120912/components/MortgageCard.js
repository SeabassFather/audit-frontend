import React from \"react\";
import DashboardCard from \"./DashboardCard\";

function MortgageCard({ thirtyYearRate, fifteenYearRate, trendData, auditInfo }) {
  return (
    <DashboardCard title=\"Mortgage Loans\" live gradient=\"linear-gradient(90deg,#e3f2fd,#f4d03f)\">
      <div>
        {thirtyYearRate && (
          <div>
            <strong>30Y Fixed:</strong> <span>{thirtyYearRate}</span>
          </div>
        )}
        {fifteenYearRate && (
          <div>
            <strong>15Y Fixed:</strong> <span>{fifteenYearRate}</span>
          </div>
        )}
        {trendData && (
          <div>{trendData}</div>
        )}
        {auditInfo && (
          <div style={{ fontSize: \"0.9rem\", marginTop: \"8px\" }}>
            {auditInfo}
          </div>
        )}
      </div>
    </DashboardCard>
  );
}

export default MortgageCard;
