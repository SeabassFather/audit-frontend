// src/pages/Dashboard.jsx
import { Link } from "react-router-dom";

export default function Dashboard() {
  const modules = [
    { to: "/usda", label: "USDA 5-Year Avg Pricing" },
    { to: "/water-tech", label: "Water Tech Upload/Analysis" },
    { to: "/compliance", label: "Global Compliance & Ethics" },
    { to: "/mortgage", label: "Mortgage Search" },
    { to: "/factoring", label: "Ag Factoring" },
    { to: "/audit-report", label: "Audit Reports" }
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Welcome to AuditDNA</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {modules.map(m => (
          <Link
            key={m.to}
            to={m.to}
            className="bg-slate-800 hover:bg-slate-700 text-white p-6 rounded-xl shadow text-center"
          >
            {m.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
