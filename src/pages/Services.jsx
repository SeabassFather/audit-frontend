import { useMemo, useState } from "react";
import byCat from "../data/services.byCategory.json";
import UploadSheet from "../components/UploadSheet";
import { Link } from "react-router-dom";

const allCats = Object.keys(byCat).sort();
const allPhases = ["Assessment","Implementation","Monitoring"];
const allTiers  = ["Starter","Pro","Elite"];

export default function Services(){
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [phase, setPhase] = useState("All");
  const [tier, setTier] = useState("All");
  const [open, setOpen] = useState(() => Object.fromEntries(allCats.map(c=>[c,true])));
  const [sheet, setSheet] = useState({ open:false, svc:null });

  const cats = useMemo(()=>["All", ...allCats], []);
  const filtered = useMemo(()=>{
    const match = (s) => {
      const text = (s.name + " " + (s.tags||[]).join(" ")).toLowerCase();
      const okQ = !q || text.includes(q.toLowerCase());
      const okPhase = phase==="All" || text.includes(phase.toLowerCase());
      const okTier  = tier==="All"  || text.includes(tier.toLowerCase());
      return okQ && okPhase && okTier;
    };
    const src = cat==="All" ? byCat : { [cat]: byCat[cat] || [] };
    const out = {};
    for(const k of Object.keys(src)) out[k] = (src[k]||[]).filter(match);
    return out;
  }, [q, cat, phase, tier]);

  const totalShown = useMemo(()=>Object.values(filtered).reduce((n,arr)=>n+arr.length,0), [filtered]);

  return (
    <div className="dna-section">
      <h1 className="text-2xl font-bold mb-3">AuditDNA Services</h1>

      {/* Filters */}
      <div className="card p-3 sticky top-2 z-10 bg-white/90 backdrop-blur">
        <div className="grid md:grid-cols-4 gap-2">
          <input
            placeholder="Search name or tags…"
            className="border p-2 rounded"
            value={q}
            onChange={e=>setQ(e.target.value)}
          />
          <select className="border p-2 rounded" value={cat} onChange={e=>setCat(e.target.value)}>
            {cats.map(c => <option key={c}>{c}</option>)}
          </select>
          <select className="border p-2 rounded" value={phase} onChange={e=>setPhase(e.target.value)}>
            {["All", ...allPhases].map(p => <option key={p}>{p}</option>)}
          </select>
          <select className="border p-2 rounded" value={tier} onChange={e=>setTier(e.target.value)}>
            {["All", ...allTiers].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="text-xs text-slate-600 mt-2">{totalShown.toLocaleString()} results</div>
      </div>

      {/* Accordion by category */}
      <div className="mt-3 space-y-3">
        {allCats.map(catName=>{
          const list = filtered[catName] || [];
          const isOpen = !!open[catName];
          return (
            <div key={catName} className="card overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-4 py-3 bg-slate-100 hover:bg-slate-200"
                onClick={()=>setOpen({...open, [catName]:!isOpen})}
              >
                <span className="font-semibold">{catName}</span>
                <span className="text-sm text-slate-600">{list.length}</span>
              </button>

              {isOpen && (
                <div className="p-3">
                  {list.length===0 && <div className="text-sm text-slate-500">No matches in this category.</div>}
                  <ul className="grid md:grid-cols-2 gap-2">
                    {list.map(s => (
                      <li key={s.id} className="border rounded p-3 bg-white">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <Link to={`/service/${s.id}`} className="text-dnaBlue font-medium hover:underline">
                              {s.name}
                            </Link>
                            <div className="text-xs text-slate-600 mt-1">
                              {(s.tags||[]).slice(0,6).join("  ")}
                            </div>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <button
                              className="border px-2 py-1 rounded text-sm"
                              onClick={()=>setSheet({ open:true, svc:s })}
                              title="Upload docs for intake"
                            >
                              Upload
                            </button>
                            <Link
                              to={`/service/${s.id}`}
                              className="border px-2 py-1 rounded text-sm"
                              title="Open details"
                            >
                              Details
                            </Link>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <UploadSheet open={sheet.open} service={sheet.svc} onClose={()=>setSheet({open:false, svc:null})}/>
    </div>
  );
}