import React from "react";
export default function Home(){
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="card">
        <h2 className="text-lg font-semibold">Welcome to AuditDNA</h2>
        <p className="mt-2 text-sm text-gray-700">Services, USDA, Mortgage, and Ag Factoring.</p>
      </div>
      <div className="card">
        <h2 className="text-lg font-semibold">Status</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
          <li>Vite + React + Tailwind + Recharts</li>
          <li>W1W26 chart + 5-yr avg</li>
          <li>Light, clean UI</li>
        </ul>
      </div>
    </div>
  );
}
