import React from "react";
import RequireLogin from "../components/RequireLogin";
import ProduceTrendsAll from "../components/ProduceTrendsAll";

export default function AgPage() {
  return (
    <RequireLogin>
      <ProduceTrendsAll areaTitle="USDA Ag Produce" />
    </RequireLogin>
  );
}
