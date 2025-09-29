// src/pages/AuditReport.jsx
export default function AuditReport() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Audit Report Dashboard</h1>
      <p className="mb-4">
        View detailed audit results, compliance validation, and risk detection scores.
      </p>

      <div className="bg-slate-800 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Latest Report</h2>
        <ul className="list-disc list-inside">
          <li>Compliance Score: 95%</li>
          <li>High-Risk Violations: 1</li>
          <li>Medium-Risk Issues: 3</li>
          <li>Audit ID: #A-2025-0930</li>
        </ul>
      </div>
    </div>
  );
}
