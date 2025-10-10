import React from "react";
import services from "./data/spartan_services.json";

export default function SpartanApp() {
  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <header className="border-b border-gray-200 py-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800 mt-2">Spartan 300 Service Catalog</h1>
        <p className="text-lg text-green-600 mt-2">Professional Services Catalog</p>
      </header>
      <main className="px-4 py-8 max-w-3xl mx-auto">
        {Object.entries(services).map(([category, items]) => (
          <section key={category} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">{category}</h2>
            <ul className="bg-yellow-50 p-4 rounded-lg shadow">
              {items.map((item, idx) => (
                <li key={item} className="py-2 pl-4 border-b last:border-b-0 text-gray-800">{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </main>
      <footer className="mt-12 text-center text-xs text-gray-500 pb-4">
        Raider Nation • CFPB-aware • Escrow Traceable • Consent-Driven • Patent Pending
      </footer>
    </div>
  );
}