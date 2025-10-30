import React, { useState } from "react";
import SidebarNav from "../components/SidebarNav";
import ServicesComplianceAccordion from "../components/ServicesComplianceAccordion";
import AgreementsAccordion from "../components/AgreementsAccordion";
// If you want a separate compliance accordion, import it here

export default function ServicesAndCompliancePage() {
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
      <div style={{ flex: 1, maxWidth: 700, margin: "0 auto" }}>
        {active === "services" && <ServicesComplianceAccordion />}
        {active === "agreements" && <AgreementsAccordion />}
        {/* If you have a separate compliance accordion: */}
        {/* {active === "compliance" && <ComplianceAccordion />} */}
      </div>
    </div>
  );
}
