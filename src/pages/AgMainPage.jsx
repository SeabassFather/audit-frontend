import React from "react";
import RequireLogin from "../components/RequireLogin";
import ProduceTrendsAll from "../components/ProduceTrendsAll"; // Or your Ag-specific dashboard

export default function AgMainPage() {
  return (
    <RequireLogin>
      {/* Place your Ag area dashboard/component here */}
      <ProduceTrendsAll />
    </RequireLogin>
  );
}