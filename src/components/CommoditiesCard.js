import React from \"react\";
import DashboardCard from \"./DashboardCard\";

function CommoditiesCard({ avocadoStats, overlays, complianceInfo }) {
  return (
    <DashboardCard title=\"Commodities: Avocado Exports & Produce\" live gradient=\"linear-gradient(90deg,#e8f5e9,#f4d03f)\">
      <div>
        {avocadoStats && (
          <div>{avocadoStats}</div>
        )}
        {overlays && (
          <div>{overlays}</div>
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

export default CommoditiesCard;
