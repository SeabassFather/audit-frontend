import React, { useState } from "react";
import { Shield, Leaf, Droplets, ShoppingBag, Factory } from "lucide-react";
import SideTickers from "./SideTickers";
import MortgageSearchPage from "../pages/MortgageSearchPage";
import WaterTechSearchPage from "../pages/WaterTechSearchPage";
import TradeFinancePage from "../pages/TradeFinancePage";
import MarketplacePage from "../pages/MarketplacePage";
import AgMarketplaceSearchPage from "../pages/AgMarketplaceSearchPage";

const ENGINES = [
  {
    key: "ag",
    label: "Ag Intake",
    icon: Leaf,
    component: AgMarketplaceSearchPage,
  },
  {
    key: "water",
    label: "Water Tech",
    icon: Droplets,
    component: WaterTechSearchPage,
  },
  {
    key: "mortgage",
    label: "Mortgage",
    icon: Shield,
    component: MortgageSearchPage,
  },
  {
    key: "trade",
    label: "Trade Finance",
    icon: Factory,
    component: TradeFinancePage,
  },
  {
    key: "market",
    label: "Ag Marketplace",
    icon: ShoppingBag,
    component: MarketplacePage,
  },
];

export default function EnginesPanel() {
  const [active, setActive] = useState("ag");
  const Comp =
    ENGINES.find((x) => x.key === active)?.component || ENGINES[0].component;
  return (
    <div className="grid" style={{ gridTemplateColumns: "260px 1fr", gap: 16 }}>
      <div>
        <SideTickers />
      </div>
      <div className="page-card">
        <div className="tabs">
          {ENGINES.map((x) => {
            const Icon = x.icon;
            return (
              <button
                key={x.key}
                className={"tab" + (active === x.key ? " active" : "")}
                onClick={() => setActive(x.key)}
              >
                <span style={{ display: "inline-flex", marginRight: 6 }}>
                  <Icon size={16} />
                </span>
                {x.label}
              </button>
            );
          })}
        </div>
        <div style={{ marginTop: 12 }}>
          <Comp />
        </div>
      </div>
    </div>
  );
}
