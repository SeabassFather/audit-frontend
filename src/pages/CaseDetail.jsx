import React, { useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { findCase, deleteCase } from "../utils/storage";
import { generateIntakePdf } from "../utils/pdf";

export default function CaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const rec = useMemo(() => findCase(id), [id]);
  if (!rec) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="mb-3">
          <Link to="/cases" className="underline">
            {" "}
            Back to Cases
          </Link>
        </div>
        <div className="bg-white rounded-2xl shadow p-5">Case not found.</div>
      </div>
    );
  }
  const downloadPdf = () => {
    const doc = generateIntakePdf(rec.service, rec.id, rec.data);
    doc.save(rec.service.replace(/\s+/g, "_") + "__Intake.pdf");
  };
  const remove = () => {
    if (!window.confirm("Delete this case?")) return;
    deleteCase(rec.id);
    navigate("/cases", { replace: true, state: { reload: Date.now() } });
  };
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-gray-500">
            Case
          </div>
          <h1 className="text-2xl font-bold">{rec.service}</h1>
          <div className="text-sm text-gray-500 font-mono">ID: {rec.id}</div>
          <div className="text-sm text-gray-500">
            Created: {new Date(rec.ts).toLocaleString()}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={downloadPdf}
            className="px-3 py-2 rounded-lg border hover:bg-gray-50"
          >
            Download PDF
          </button>
          <button
            onClick={remove}
            className="px-3 py-2 rounded-lg bg-red-600 text-white hover:brightness-95"
          >
            Delete
          </button>
          <Link
            to="/cases"
            className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Back
          </Link>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow p-5">
        <div className="text-sm font-semibold mb-3">Submitted Fields</div>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(rec.data || {}).map(([k, v]) => (
            <div
              key={k}
              className="bg-gray-50 border border-gray-200 rounded-lg p-3"
            >
              <dt className="text-xs uppercase tracking-wide text-gray-500">
                {k}
              </dt>
              <dd className="mt-1">{String(v ?? "")}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
