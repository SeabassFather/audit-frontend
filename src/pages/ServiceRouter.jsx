import { useParams, Navigate } from "react-router-dom";
import PricingUSDA from "./PricingUSDA.jsx";
import MortgageSearch from "./mortgage/MortgageSearch.jsx";
import AgMarketplace from "./ag/AgMarketplace.jsx";
import Factoring from "./finance/Factoring.jsx";
import CrossBorder from "./mortgage/CrossBorder.jsx";
import ComplianceDashboard from "./compliance/ComplianceDashboard.jsx";
import AuditCenter from "./compliance/AuditCenter.jsx";
import WaterSoil from "./ag/WaterSoil.jsx";
import Reports from "./reports/Reports.jsx";

const registry = {
  "usda-prices": PricingUSDA,
  "marketplace": AgMarketplace,
  "factoring": Factoring,
  "mortgage-search": MortgageSearch,
  "cross-border": CrossBorder,
  "global-privacy": ComplianceDashboard,
  "audits": AuditCenter,
  "water-soil": WaterSoil,
  "reports": Reports,
};

export default function ServiceRouter(){
  const { id } = useParams();
  const Comp = registry[id];
  if (!Comp) return <Navigate to="/services" replace />;
  return <Comp />;
}