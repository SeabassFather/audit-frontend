import React, { useState } from "react";
import SidebarNav from "../components/SidebarNav";
// Import your content section components:
import ServicesPage from "./ServicesPage"; // accordion panel for services
import AgreementsSection from "./AgreementsSection"; // agreements/upload section
import ComplianceSection from "./ComplianceSection"; // regulatory compliance
import MarketTickersSection from "./MarketTickersSection"; // tickers

export default function AuditComplianceMain() {
  // This controls which section is shown on the right
  const [active, setActive] = useState("services");
  return (
    <div
      style={{
        display: "flex",
        minHeight: "90vh",
        background: "#f7f8fa",
        padding: "2.5rem 0 0 0",
      }}
    >
      <SidebarNav active={active} setActive={setActive} />
      <div style={{ flex: 1, maxWidth: 900, margin: "0 auto" }}>
        {active === "services" && <ServicesPage />}
        {active === "agreements" && <AgreementsSection />}
        {active === "compliance" && <ComplianceSection />}
        {active === "market" && <MarketTickersSection />}
      </div>
    </div>
  );
}
