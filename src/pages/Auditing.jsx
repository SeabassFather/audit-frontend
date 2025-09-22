export default function Auditing(){
  const audits = [
    { title:"USDA Audit Upload", desc:"Submit packhouse, cold storage, transportation, and field audits." },
    { title:"CPA Review", desc:"Financial statement review, payroll reconciliation, tax compliance." },
    { title:"GlobalGAP Certification", desc:"Checklists, corrective actions, renewal reminders." },
    { title:"Water/Soil Lab Upload", desc:"Attach PDFs/CSVs, auto-validate ranges, flag outliers." }
  ];
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Auditing</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {audits.map(a=>(
          <div key={a.title} className="card p-5">
            <h2 className="font-semibold">{a.title}</h2>
            <p className="text-sm text-slate-600">{a.desc}</p>
            <button className="mt-3 bg-dnaBlue text-white px-3 py-2 rounded">Open</button>
          </div>
        ))}
      </div>
    </div>
  );
}
