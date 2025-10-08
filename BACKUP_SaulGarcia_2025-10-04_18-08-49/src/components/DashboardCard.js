import React from \"react\";
import \"./DashboardCard.css\";

function DashboardCard({ title, live, children, gradient }) {
  return (
    <div
      className=\"dashboard-card\"
      style={{
        background: gradient || \"linear-gradient(90deg,#e3f2fd 0%,#e8f5e9 100%)\",
      }}
    >
      <div className=\"dashboard-card-header\">
        <span>{title}</span>
        {live && <span className=\"dashboard-card-live\">LIVE</span>}
      </div>
      <div className=\"dashboard-card-content\">{children}</div>
    </div>
  );
}

export default DashboardCard;
