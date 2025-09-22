import React from "react";
import FeeScheduleTable from "../components/InfoModules/FeeScheduleTable";
import ServiceCategoryList from "../components/InfoModules/ServiceCategoryList";
export default function Services() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">AuditDNA Services & Fees</h1>
      <div className="mb-8">
        <FeeScheduleTable />
      </div>
      <ServiceCategoryList />
    </div>
  );
}
