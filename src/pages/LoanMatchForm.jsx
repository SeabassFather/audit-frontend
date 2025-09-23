import React, { useState } from "react";

export default function LoanMatchForm({ onSearch }) {
  const [values, setValues] = useState({
    name: "", email: "", phone: "",
    address: "", propertyType: "", occupancy: "", purpose: "", purchasePrice: "", estValue: "",
    creditScore: "", dti: "", ltv: "", income: "", assets: "", loanAmount: "", product: "",
    closeTarget: "", lockPref: "", docs: ""
  });
  const change = e => setValues(v => ({ ...v, [e.target.name]: e.target.value }));
  const submit = e => { e.preventDefault(); onSearch && onSearch(values); };
  return (
    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <input name="name" placeholder="Borrower Name" className="border rounded p-2" value={values.name} onChange={change} />
      <input name="email" placeholder="Email" className="border rounded p-2" value={values.email} onChange={change} />
      <input name="phone" placeholder="Phone" className="border rounded p-2" value={values.phone} onChange={change} />
      <input name="address" placeholder="Property Address" className="border rounded p-2" value={values.address} onChange={change} />
      <input name="propertyType" placeholder="Property Type" className="border rounded p-2" value={values.propertyType} onChange={change} />
      <input name="occupancy" placeholder="Occupancy" className="border rounded p-2" value={values.occupancy} onChange={change} />
      <input name="purpose" placeholder="Purchase/Refi" className="border rounded p-2" value={values.purpose} onChange={change} />
      <input name="purchasePrice" placeholder="Purchase Price" className="border rounded p-2" value={values.purchasePrice} onChange={change} />
      <input name="estValue" placeholder="Estimated Value" className="border rounded p-2" value={values.estValue} onChange={change} />
      <input name="creditScore" placeholder="Credit Score" className="border rounded p-2" value={values.creditScore} onChange={change} />
      <input name="dti" placeholder="DTI" className="border rounded p-2" value={values.dti} onChange={change} />
      <input name="ltv" placeholder="LTV" className="border rounded p-2" value={values.ltv} onChange={change} />
      <input name="income" placeholder="Income" className="border rounded p-2" value={values.income} onChange={change} />
      <input name="assets" placeholder="Assets" className="border rounded p-2" value={values.assets} onChange={change} />
      <input name="loanAmount" placeholder="Loan Amount" className="border rounded p-2" value={values.loanAmount} onChange={change} />
      <input name="product" placeholder="Product (FHA/VA/Conv/USDA/Jumbo)" className="border rounded p-2" value={values.product} onChange={change} />
      <input name="closeTarget" placeholder="Target Close Date" className="border rounded p-2" value={values.closeTarget} onChange={change} />
      <input name="lockPref" placeholder="Lock Preference" className="border rounded p-2" value={values.lockPref} onChange={change} />
      <input name="docs" placeholder="Docs (W-2, IDs, etc)" className="border rounded p-2" value={values.docs} onChange={change} />
      <button className="md:col-span-3 bg-blue-700 text-white py-2 rounded">Search</button>
    </form>
  );
}