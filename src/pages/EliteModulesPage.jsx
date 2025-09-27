import React from "react";
import modules from "../data/elite_modules.json";
export default function EliteModulesPage() {
  return (
    <div className="min-h-screen bg-[#f7f8fa] p-8">
      <header className="border-b border-gray-200 pb-4 mb-8 text-center">
        <h1 className="text-3xl font-bold">AuditDNA Elite Suite</h1>
        <p className="text-lg text-green-600 mt-2">All 12 Enterprise Modules</p>
      </header>
      <main className="max-w-3xl mx-auto">
        {modules.map((m, idx) => (
          <section key={m.title} className="mb-8 p-6 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{idx + 1}. {m.title}</h2>
            <p className="mb-2 text-gray-700">{m.description}</p>
            <div className="text-sm text-gray-500">{m.features.map(f => <li key={f}>{f}</li>)}</div>
          </section>
        ))}
      </main>
    </div>
  );
}