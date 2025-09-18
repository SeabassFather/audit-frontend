import { useState } from "react";
/** This UI models the consumer-protection flow: compute overcharge, notify title company,
 *  escrow instructions, and auto-generate CFPB/regulator letters with consent on file.
 *  (Letters/API hooks can be wired later.)
 */
export default function CaseFlow(){
  const [form,setForm]=useState({
    consumerName:"", address:"", creditor:"", category:"Mortgage Servicing",
    overcharge: "", caseNotes:"", titleCompany:"", titleEmail:"", escrowAccount:""
  });
  const onChange = e => setForm(v=>({ ...v, [e.target.name]: e.target.value }));
  const payload = {
    notifyTitle: {
      titleCompany: form.titleCompany, titleEmail: form.titleEmail,
      consumer: { name: form.consumerName, address: form.address },
      creditor: form.creditor, category: form.category, overcharge: form.overcharge, notes: form.caseNotes
    },
    escrowInstruction: {
      escrowAccount: form.escrowAccount, reassign: true, amount: form.overcharge, creditor: form.creditor
    },
    regulators: [
      { agency: "CFPB", letter: "Overcharge notice + consent to reassign funds" },
      { agency: "State Authority", letter: "Copy of notice and remediation plan" }
    ]
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">CaseFlow — Disbursement & Regulator Notices</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-4 space-y-3">
          <div className="font-semibold">Case Intake</div>
          <input className="border rounded p-2 w-full" name="consumerName" placeholder="Consumer Full Name" value={form.consumerName} onChange={onChange}/>
          <input className="border rounded p-2 w-full" name="address" placeholder="Consumer Address" value={form.address} onChange={onChange}/>
          <input className="border rounded p-2 w-full" name="creditor" placeholder="Creditor / Company" value={form.creditor} onChange={onChange}/>
          <input className="border rounded p-2 w-full" name="category" placeholder="Category (e.g., Medical, Insurance, Note Impound)" value={form.category} onChange={onChange}/>
          <input className="border rounded p-2 w-full" name="overcharge" placeholder="Overcharge Amount (USD)" value={form.overcharge} onChange={onChange}/>
          <textarea className="border rounded p-2 w-full" rows="4" name="caseNotes" placeholder="Notes / Facts" value={form.caseNotes} onChange={onChange}/>
        </div>
        <div className="card p-4 space-y-3">
          <div className="font-semibold">Title & Escrow</div>
          <input className="border rounded p-2 w-full" name="titleCompany" placeholder="Title Company" value={form.titleCompany} onChange={onChange}/>
          <input className="border rounded p-2 w-full" name="titleEmail" placeholder="Title Email" value={form.titleEmail} onChange={onChange}/>
          <input className="border rounded p-2 w-full" name="escrowAccount" placeholder="Escrow Account #" value={form.escrowAccount} onChange={onChange}/>
        </div>
        <div className="md:col-span-2 card p-4">
          <div className="font-semibold mb-2">Generated Payload (to send to Title, Escrow, and Regulators)</div>
          <pre className="text-xs overflow-auto">{JSON.stringify(payload,null,2)}</pre>
          <div className="mt-3 flex gap-2">
            <button className="bg-dnaBlue text-white px-3 py-2 rounded">Send Title Notice</button>
            <button className="border px-3 py-2 rounded">Send Escrow Instruction</button>
            <button className="border px-3 py-2 rounded">Generate CFPB Letter</button>
          </div>
        </div>
      </div>
    </div>
  );
}