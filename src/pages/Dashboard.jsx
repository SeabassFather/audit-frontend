import { Link } from "react-router-dom";

function Stat({ title, value }) {
  return (
    <div className="card p-4">
      <div className="text-xs uppercase tracking-wide text-slate-500">{title}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
    </div>
  );
}

export default function Dashboard(){
  return (
    <div className="dna-section">
      <h1 className="text-2xl font-bold">Welcome to AuditDNA</h1>

      <div className="grid md:grid-cols-3 gap-4 mt-4">
        <Stat title="Total Services" value="300" />
        <Stat title="Categories" value="4" />
        <Stat title="Status" value="Online" />
      </div>

      <div className="card p-4 mt-4">
        <p className="text-sm text-slate-600">
          Browse Services, run Auditing/Compliance modules, view USDA pricing, and manage the
          CaseFlow disbursement & regulator notice process.
        </p>
        <div className="mt-3 flex gap-2">
          <Link to="/services" className="border px-3 py-2 rounded">Open Services</Link>
          <Link to="/modules" className="border px-3 py-2 rounded">Open Modules</Link>
        </div>
      </div>
    </div>
  );
}