import React, { useMemo, useState } from "react";

export default function ContactCard({
  title = "Contact",
  partner = "",             // e.g. "Partner-backed (Liquid Capital)"; use "" to hide
  service = "",             // internal service code (e.g. "USDA", "MEX-RE", "FACTOR")
  initial = {},             // initial values to prefill
  onSubmit,                 // function(payload)
}) {
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "",
    company: "", notes: "", ...initial
  });

  function setField(k, v){ setForm((f)=>({ ...f, [k]: v })); }
  const canSend = useMemo(()=> form.fullName && (form.email || form.phone), [form]);

  function handleSubmit(){
    const payload = { ...form, service, ts: new Date().toISOString() };
    if (onSubmit) onSubmit(payload);
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        {partner ? <div className="text-xs px-2 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">{partner}</div> : null}
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-slate-600">Full Name</label>
          <input className="w-full rounded-lg border border-slate-300 px-3 py-2" value={form.fullName} onChange={e=>setField("fullName", e.target.value)} placeholder="Jane Doe"/>
        </div>
        <div>
          <label className="text-xs text-slate-600">Company (optional)</label>
          <input className="w-full rounded-lg border border-slate-300 px-3 py-2" value={form.company} onChange={e=>setField("company", e.target.value)} placeholder="Company LLC"/>
        </div>
        <div>
          <label className="text-xs text-slate-600">Email</label>
          <input className="w-full rounded-lg border border-slate-300 px-3 py-2" value={form.email} onChange={e=>setField("email", e.target.value)} placeholder="name@domain.com"/>
        </div>
        <div>
          <label className="text-xs text-slate-600">Phone</label>
          <input className="w-full rounded-lg border border-slate-300 px-3 py-2" value={form.phone} onChange={e=>setField("phone", e.target.value)} placeholder="+52 55 1234 5678"/>
        </div>
      </div>
      <div>
        <label className="text-xs text-slate-600">Notes</label>
        <textarea className="w-full rounded-lg border border-slate-300 px-3 py-2 min-h-[72px]" value={form.notes} onChange={e=>setField("notes", e.target.value)} placeholder="Context, timing, extra details" />
      </div>
      <div className="flex gap-2">
        <button disabled={!canSend} onClick={handleSubmit}
          className={`rounded-lg px-3 py-2 text-white ${canSend ? "bg-emerald-600 hover:bg-emerald-700" : "bg-slate-400 cursor-not-allowed"}`}>
          Save Lead
        </button>
      </div>
    </div>
  );
}
