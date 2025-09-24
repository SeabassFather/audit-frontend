import React, { useMemo, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { SERVICE_DETAILS, defaultDetails } from "../data/serviceDetails";
import { newCaseId } from "../utils/id";
import { saveCase } from "../utils/storage";
import { generateIntakePdf } from "../utils/pdf";

function fieldInput(field, value, onChange) {
  const base = "mt-1 w-full border rounded-lg px-3 py-2";
  switch (field.type) {
    case "textarea":
      return (
        <textarea
          rows="4"
          className={base}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "select":
      return (
        <select
          className={base}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Select</option>
          {(field.options || []).map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      );
    default:
      return (
        <input
          type={field.type || "text"}
          className={base}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
        />
      );
  }
}

export default function ServiceStart() {
  const { slug } = useParams();
  const loc = useLocation();
  const serviceName =
    (loc.state && loc.state.serviceName) || (slug || "").replace(/-/g, " ");
  const meta = useMemo(
    () => SERVICE_DETAILS[serviceName] || defaultDetails(serviceName),
    [serviceName],
  );
  const [form, setForm] = useState(
    Object.fromEntries((meta.form || []).map((f) => [f.name, ""])),
  );
  const [savedId, setSavedId] = useState(null);
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    for (const f of meta.form || []) {
      if (f.required && !form[f.name]) {
        alert("Please fill: " + f.label);
        return;
      }
    }
    const id = newCaseId();
    saveCase({
      id,
      service: serviceName,
      slug,
      ts: new Date().toISOString(),
      data: form,
    });
    setSavedId(id);
    alert("Saved. Case ID: " + id);
  };

  const downloadPdf = () => {
    const doc = generateIntakePdf(serviceName, savedId, form);
    doc.save(serviceName.replace(/\s+/g, "_") + "_Intake.pdf");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{serviceName} Start</h1>
        <div className="flex items-center gap-3">
          <Link to="/cases" className="text-sm underline">
            Cases
          </Link>
          <Link to="/services" className="text-sm underline">
            {" "}
            Back to Services
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-5 space-y-4">
        <div className="text-gray-600">{meta.brief}</div>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(meta.form || []).map((f) => (
              <label key={f.name} className="block">
                <span className="text-sm font-medium">
                  {f.label}
                  {f.required ? " *" : ""}
                </span>
                {fieldInput(f, form[f.name], (v) => update(f.name, v))}
              </label>
            ))}
          </div>
          <div className="pt-2 flex gap-2">
            <button className="px-4 py-2 rounded-xl bg-green-600 text-white font-semibold hover:brightness-95">
              Submit Intake
            </button>
            <button
              type="button"
              onClick={downloadPdf}
              className="px-4 py-2 rounded-xl border hover:bg-gray-50"
            >
              Download PDF
            </button>
            {savedId && (
              <span className="text-sm text-gray-500 self-center">
                Saved as <span className="font-mono">{savedId}</span>
              </span>
            )}
          </div>
        </form>
      </div>
      <div className="text-xs text-gray-500">
        Frontend-only stub. Later well POST to backend and show a case
        dashboard.
      </div>
    </div>
  );
}
