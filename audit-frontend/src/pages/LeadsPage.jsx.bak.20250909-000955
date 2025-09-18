import React, { useMemo, useState } from "react";
import { getLeads, clearLeads, toCSV } from "../lib/leads";

export default function LeadsPage(){
  const [leads, setLeads] = useState(getLeads());
  const csvHref = useMemo(()=>{
    if(!leads.length) return null;
    const blob = new Blob([toCSV(leads)], {type:"text/csv;charset=utf-8"});
    return URL.createObjectURL(blob);
  },[leads]);

  function purge(){ if(confirm("Clear all saved leads?")){ clearLeads(); setLeads([]); } }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl font-bold text-slate-900">Leads Inbox</h1>
        <div className="flex gap-2">
          {csvHref && <a href={csvHref} download="auditdna_leads.csv" className="rounded-lg border border-slate-300 bg-white px-3 py-2 hover:bg-slate-50">Export CSV</a>}
          <button onClick={purge} className="rounded-lg bg-rose-600 text-white px-3 py-2 hover:bg-rose-700">Clear</button>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 sticky top-0">
            <tr>
              <th className="text-left px-3 py-2">When</th>
              <th className="text-left px-3 py-2">Service</th>
              <th className="text-left px-3 py-2">Name</th>
              <th className="text-left px-3 py-2">Company</th>
              <th className="text-left px-3 py-2">Email</th>
              <th className="text-left px-3 py-2">Phone</th>
              <th className="text-left px-3 py-2">Details (JSON)</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l,i)=>(
              <tr key={i} className="border-t align-top">
                <td className="px-3 py-2">{new Date(l.ts||Date.now()).toLocaleString()}</td>
                <td className="px-3 py-2">{l.service}</td>
                <td className="px-3 py-2">{l.fullName}</td>
                <td className="px-3 py-2">{l.company}</td>
                <td className="px-3 py-2">{l.email}</td>
                <td className="px-3 py-2">{l.phone}</td>
                <td className="px-3 py-2"><pre className="whitespace-pre-wrap text-xs">{JSON.stringify(l,null,2)}</pre></td>
              </tr>
            ))}
            {!leads.length && <tr><td className="px-3 py-3 text-slate-500" colSpan="7">No leads saved yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}