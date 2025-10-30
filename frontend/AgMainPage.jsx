import React from "react";
import RequireLogin from "../components/RequireLogin";
import ProduceTrendsAll from "../components/ProduceTrendsAll";
export default function AgMainPage() {
  return (
    <RequireLogin>
      <ProduceTrendsAll />
    </RequireLogin>
  );
}
