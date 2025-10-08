import React, { useState } from "react";
import services from "../compliance_services.json";

export default function ComplianceDashboard() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">⚖️ Compliance & Auditing Dashboard</h2>

      {/* Accordion Categories */}
      {Object.keys(services).map((category, idx) => (
        <div
          key={idx}
          className="mb-4 border rounded-lg shadow bg-white overflow-hidden"
        >
          <div
            className="cursor-pointer px-4 py-2 font-semibold bg-gray-100 hover:bg-gray-200"
            onClick={() => setExpanded(expanded === idx ? null : idx)}
          >
            {category}
          </div>
          {expanded === idx && (
            <ul className="p-4 list-disc list-inside space-y-1">
              {services[category].map((svc, i) => (
                <li key={i}>{svc}</li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {/* Process Flow */}
      <div className="mt-8 p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg shadow">
        <h3 className="font-bold mb-2">📋 Compliance Process Flow</h3>
        <ol className="list-decimal list-inside space-y-1">
          <li>Data Intake: Upload docs, ledgers, contracts</li>
          <li>Audit Execution: TRID, RESPA, AML, KYC checks</li>
          <li>Risk Scoring: Low / Medium / High</li>
          <li>Notifications: CFPB, HUD, IRS, FinCEN, State AGs</li>
          <li>Regulator Filing: Auto-generate SAR, 1099-S, XML/CSV</li>
          <li>Dashboard Logs: Track escalations + acknowledgements</li>
        </ol>
      </div>
    </div>
  );
}



