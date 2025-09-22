﻿import { useParams, Link } from "react-router-dom";
import all from "../data/services.all.json";
export default function ServiceDetail(){
  const { id } = useParams();
  const svc = all.find(s=>s.id===id);
  if (!svc) return <div className="card p-5">Service not found.</div>;
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="md:col-span-2 card p-5">
        <h1 className="text-2xl font-bold">{svc.name}</h1>
        <div className="text-sm text-slate-600 mb-3">{svc.category}  {svc.phase}  {svc.tier}</div>
        <p className="mb-4">{svc.summary}</p>
        <h2 className="font-semibold mb-2">Key Features</h2>
        <ul className="list-disc ml-5 space-y-1">
          {svc.features.map((f,i)=><li key={i}>{f}</li>)}
        </ul>
      </div>
      <div className="card p-5">
        <h3 className="font-semibold mb-2">Actions</h3>
        <button className="w-full mb-2 bg-dnaBlue text-white px-3 py-2 rounded">Start Engagement</button>
        <button className="w-full mb-2 border px-3 py-2 rounded">Download Checklist</button>
        <button className="w-full border px-3 py-2 rounded">Contact AuditDNA</button>
        <div className="text-xs text-slate-500 mt-3">ID: {svc.id}</div>
        <Link to="/services" className="text-dnaBlue text-sm inline-block mt-3"> Back to Services</Link>
      </div>
    </div>
  );
}
