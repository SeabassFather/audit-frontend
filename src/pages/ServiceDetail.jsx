import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import all from "../data/services.all.json";
import Tabs from "../components/Tabs";
import Toast from "../components/Toast";

function download(name, obj){
  const blob = new Blob([JSON.stringify(obj,null,2)], {type:"application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  URL.revokeObjectURL(a.href);
}

export default function ServiceDetail(){
  const { id } = useParams();
  const svc = all.find(s=>s.id===id);
  const [seeded,setSeeded] = useState(false);
  const seedPayload = useMemo(()=> svc ? ({
    caseId: "CASE-"+Math.floor(1000+Math.random()*9000),
    serviceId: svc.id,
    serviceName: svc.name,
    category: svc.category,
    phase: svc.phase,
    tier: svc.tier,
    createdAt: new Date().toISOString(),
    checklist: ["intake","scope","evidence","report","remediation"],
  }) : null, [svc]);

  if (!svc) return <div className="card p-5">Service not found. <Link to="/services" className="text-dnaBlue">Back</Link></div>;

  const Overview = (
    <div className="space-y-3">
      <p>{svc.summary}</p>
      <div>
        <h3 className="font-semibold mb-1">Key Features</h3>
        <ul className="list-disc ml-5 space-y-1">
          {svc.features.map((f,i)=><li key={i}>{f}</li>)}
        </ul>
      </div>
    </div>
  );

  const Checklist = (
    <ol className="list-decimal ml-5 space-y-1 text-sm">
      <li>Intake & scope confirmation</li>
      <li>Document upload / evidence gathering</li>
      <li>Automated checks (Engines)</li>
      <li>Findings review & severity</li>
      <li>Remediation plan & attestation</li>
    </ol>
  );

  const Artifacts = (
    <div className="text-sm">
      <p className="mb-2">Artifacts generated for this service:</p>
      <ul className="list-disc ml-5 space-y-1">
        <li>Checklist (JSON)</li>
        <li>Gap report (PDF)</li>
        <li>Remediation plan (DOCX)</li>
        <li>Final attestation (PDF)</li>
      </ul>
      <button onClick={()=>download(`${svc.id}-seed.json`, seedPayload)}
              className="mt-3 border px-3 py-2 rounded">Download seed JSON</button>
    </div>
  );

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {/* left/main */}
      <div className="md:col-span-2 space-y-3">
        <nav className="text-xs text-slate-500">
          <Link className="text-dnaBlue" to="/services">Services</Link> / <span>{svc.category}</span> / <span className="text-slate-900">{svc.name}</span>
        </nav>

        <div className="rounded bg-white shadow p-4 border">
          <div className="text-xs mb-2 text-slate-600">{svc.category} · {svc.phase} · {svc.tier}</div>
          <h1 className="text-2xl font-bold mb-3">{svc.name}</h1>
          <Tabs
            tabs={[
              {label:"Overview", content: Overview},
              {label:"Checklist", content: Checklist},
              {label:"Artifacts", content: Artifacts}
            ]}
          />
        </div>
      </div>

      {/* right/actions */}
      <div className="md:sticky md:top-20 h-max card p-4">
        <h3 className="font-semibold mb-2">Actions</h3>
        <button
          onClick={()=>setSeeded(true)}
          className="w-full mb-2 bg-dnaBlue text-white px-3 py-2 rounded">
          Start Engagement
        </button>
        <button onClick={()=>download(`${svc.id}-checklist.json`, {service:svc.id, checklist:["intake","scope","evidence","report","remediation"]})}
                className="w-full mb-2 border px-3 py-2 rounded">Download Checklist</button>
        <Link to="/caseflow" className="w-full inline-block text-center border px-3 py-2 rounded">Open CaseFlow</Link>
        <div className="text-xs text-slate-500 mt-3">ID: {svc.id}</div>
        <Link to="/services" className="text-dnaBlue text-sm inline-block mt-3">← Back to Services</Link>
      </div>

      {seeded && <Toast text="Case seeded — check Results & CaseFlow."/>}
    </div>
  );
}