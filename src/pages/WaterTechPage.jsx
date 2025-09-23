import React from "react";
import RequireLogin from "../components/RequireLogin";
import ProduceTrendsAll from "../components/ProduceTrendsAll";

const WATER_TECH_COMMODITIES = [
  { name: "Irrigated Corn", nass: { commodity_desc: "CORN", statisticcat_desc: "PRICE RECEIVED", unit_desc: "DOLLARS / BU" } },
  { name: "Rice", nass: { commodity_desc: "RICE", statisticcat_desc: "PRICE RECEIVED", unit_desc: "DOLLARS / CWT" } }
];

export default function WaterTechPage() {
  return (
    <RequireLogin>
      <ProduceTrendsAll areaTitle="USDA Water Tech" commodityList={WATER_TECH_COMMODITIES} />
    </RequireLogin>
  );
}
