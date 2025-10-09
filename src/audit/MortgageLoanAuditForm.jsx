import React, { useState } from "react";
import { submitMortgageLoanAudit } from "./MortgageLoanAuditService";

/**
 * Mortgage Loan Audit Form
 * Handles user input, file uploads, and submits to service.
 */
export default function MortgageLoanAuditForm({ onResult }) {
  const [values, setValues] = useState({
    loanNumber: "",
    lender: "",
    servicer: "",
    state: "",
    notes: "",
  });
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const change = e =>
    setValues(v => ({ ...v, [e.target.name]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([k, v]) => formData.append(k, v));
      if(file) formData.append("document", file);
      const res = await submitMortgageLoanAudit(formData);
      if (onResult) onResult(res);
    } catch (e) {
      setError(e?.response?.data || e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <input
        name="loanNumber"
        value={values.loanNumber}
        onChange={change}
        placeholder="Loan Number"
        className="block w-full rounded border px-3 py-2"
        required
      />
      <input
        name="lender"
        value={values.lender}
        onChange={change}
        placeholder="Lender"
        className="block w-full rounded border px-3 py-2"
      />
      <input
        name="servicer"
        value={values.servicer}
        onChange={change}
        placeholder="Servicer"
        className="block w-full rounded border px-3 py-2"
      />
      <input
        name="state"
        value={values.state}
        onChange={change}
        placeholder="Property State"
        className="block w-full rounded border px-3 py-2"
      />
      <textarea
        name="notes"
        value={values.notes}
        onChange={change}
        placeholder="Additional Notes"
        className="block w-full rounded border px-3 py-2"
        rows={3}
      />
      <div>
        <label className="block mb-1 font-medium">Upload Mortgage Statement or Docs</label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={e => setFile(e.target.files?.[0] || null)}
          className="block"
        />
      </div>
      <button
        disabled={busy}
        className="rounded bg-blue-500 text-white px-4 py-2 font-semibold hover:bg-blue-600"
      >
        {busy ? "Submitting..." : "Submit Audit"}
      </button>
      {error && <div className="text-red-700 text-sm">{String(error)}</div>}
    </form>
  );
}