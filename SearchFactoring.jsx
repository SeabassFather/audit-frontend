import React, { useMemo, useState } from "react";
import ContactCard from "../../components/ContactCard";
import { saveLead } from "../../lib/leads";

// Agriculture/Produce added!
const SECTORS = [
  "Agriculture/Produce",
  "Trucking",
  "Logistics",
  "Manufacturing",
  "Services",
  "Staffing",
  "General",
];

export default function SearchFactoring() {
  const [f, setF] = useState({
    sector: "Agriculture/Produce",
    monthlyVolume: 25000,
    advanceMin: 85,
    avgInvoice: 1500,
    customers: 15,
    topCustomerPct: 35,
    recourse: "Recourse",
    country: "US/MX",
    region: "North America",
    yearsInBiz: 2,
    arAgingGood: true,
  });

  const matches = useMemo(() => {
    // crude acceptance: advanceMin  92; monthlyVolume 5k2M; topCustomerPct  70
    const ok =
      f.monthlyVolume >= 5000 &&
      f.monthlyVolume <= 2000000 &&
      f.advanceMin <= 92 &&
      f.topCustomerPct <= 70;
    return ok;
  }, [f]);

  function change(k, v) {
    setF((s) => ({ ...s, [k]: v }));
  }

  function handleLead(lead) {
    const payload = {
      ...lead,
      service: "FACTOR",
      app: f,
      partner: "Liquid Capital",
    };
    if (saveLead(payload)) alert("Factoring lead saved to Inbox.");
  }

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 rounded-2xl border border-emerald-300 bg-emerald-50 p-4 space-y-3">
        <div className="grid md:grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-slate-600">Sector</label>
            <select
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              value={f.sector}
              onChange={(e) => change("sector", e.target.value)}
            >
              {SECTORS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-600">
              Monthly Invoice Volume (USD)
            </label>
            <input
              type="number"
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              value={f.monthlyVolume}
              onChange={(e) => change("monthlyVolume", +e.target.value || 0)}
            />
          </div>
          <div>
            <label className="text-xs text-slate-600">Minimum Advance %</label>
            <input
              type="number"
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              value={f.advanceMin}
              onChange={(e) => change("advanceMin", +e.target.value || 0)}
            />
          </div>
          <div>
            <label className="text-xs text-slate-600">
              Avg Invoice Size (USD)
            </label>
            <input
              type="number"
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              value={f.avgInvoice}
              onChange={(e) => change("avgInvoice", +e.target.value || 0)}
            />
          </div>
          <div>
            <label className="text-xs text-slate-600"># of Customers</label>
            <input
              type="number"
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              value={f.customers}
              onChange={(e) => change("customers", +e.target.value || 0)}
            />
          </div>
          <div>
            <label className="text-xs text-slate-600">
              Top Customer Concentration %
            </label>
            <input
              type="number"
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              value={f.topCustomerPct}
              onChange={(e) => change("topCustomerPct", +e.target.value || 0)}
            />
          </div>
          <div>
            <label className="text-xs text-slate-600">Recourse</label>
            <select
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              value={f.recourse}
              onChange={(e) => change("recourse", e.target.value)}
            >
              <option>Recourse</option>
              <option>Non-Recourse</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-600">Years in Business</label>
            <input
              type="number"
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              value={f.yearsInBiz}
              onChange={(e) => change("yearsInBiz", +e.target.value || 0)}
            />
          </div>
          <div>
            <label className="text-xs text-slate-600">AR Aging Healthy?</label>
            <select
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              value={f.arAgingGood}
              onChange={(e) => change("arAgingGood", e.target.value === "true")}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3 grid sm:grid-cols-3 gap-3">
          <div>
            <div className="text-xs text-slate-500">Prelim Eligibility</div>
            <div
              className={`text-sm font-semibold ${matches ? "text-emerald-700" : "text-rose-700"}`}
            >
              {matches ? "Likely fit" : "Edge case  review"}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Partner</div>
            <div className="text-sm">Liquid Capital</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Typical Advance</div>
            <div className="text-sm">8592%</div>
          </div>
        </div>
      </div>

      <ContactCard
        title="Factoring  Working Capital"
        partner="Partner: Liquid Capital"
        service="FACTOR"
        onSubmit={handleLead}
        targetEmail="saul@financelend.me"
      />
    </div>
  );
}
