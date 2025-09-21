import React from "react";
import { auditEngines } from "../data/auditEngines";
export default function AuditEnginesList() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-brand-blue">Audit & Compliance Engines</h1>
      {auditEngines.map((engine) => (
        <div key={engine.id} className="bg-white rounded-xl shadow border border-brand-silver p-6">
          <h2 className="text-2xl font-bold text-brand-green mb-2">{engine.name}</h2>
          <p className="mb-3 text-gray-700">{engine.description}</p>
          <ul className="list-disc pl-6 text-gray-800">
            {engine.features.map(f => <li key={f}>{f}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}
