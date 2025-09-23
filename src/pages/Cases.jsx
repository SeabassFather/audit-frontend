import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  loadCases,
  deleteCase,
  clearCases,
  exportCasesAsCSV,
  exportCasesAsJSON,
} from "../utils/storage";
import { download } from "../utils/download";
import { Search, Trash2, FileDown, FileText, Eye } from "lucide-react";

export default function Cases() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("ts_desc");
  const navigate = useNavigate();
  useEffect(() => {
    setItems(loadCases());
  }, []);
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    let arr = !s
      ? items
      : items.filter(
          (c) =>
            (c.id || "").toLowerCase().includes(s) ||
            (c.service || "").toLowerCase().includes(s) ||
            JSON.stringify(c.data || {})
              .toLowerCase()
              .includes(s),
        );
    arr = arr
      .slice()
      .sort((a, b) =>
        sort === "ts_desc"
          ? (b.ts || "").localeCompare(a.ts || "")
          : sort === "ts_asc"
            ? (a.ts || "").localeCompare(b.ts || "")
            : sort === "service_asc"
              ? (a.service || "").localeCompare(b.service || "")
              : (b.service || "").localeCompare(a.service || ""),
      );
    return arr;
  }, [items, q, sort]);
  const remove = (id) => {
    if (!window.window.confirm("Delete this case?")) return;
    deleteCase(id);
    setItems(loadCases());
  };
  const removeAll = () => {
    if (!window.window.confirm("Delete ALL cases?")) return;
    clearCases();
    setItems([]);
  };
  const exportCSV = () =>
    download("AuditDNA_Cases_".csv, exportCasesAsCSV(filtered), "text/csv");
  const exportJSON = () =>
    download(
      "AuditDNA_Cases_".json,
      exportCasesAsJSON(filtered),
      "application/json",
    );

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Cases</h1>
        <Link to="/services" className="text-sm underline">
          {" "}
          Services
        </Link>
      </div>
      <div className="bg-white rounded-2xl shadow p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-2 flex-1 border rounded-xl px-3 py-2">
            <Search size={16} />
            <input
              className="outline-none w-full"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by ID, service, or fields..."
            />
          </div>
          <select
            className="border rounded-lg px-2 py-2"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="ts_desc">Newest first</option>
            <option value="ts_asc">Oldest first</option>
            <option value="service_asc">Service AZ</option>
            <option value="service_desc">Service ZA</option>
          </select>
          <button
            onClick={exportCSV}
            className="px-3 py-2 rounded-lg border hover:bg-gray-50 flex items-center gap-2"
          >
            <FileDown size={16} /> CSV
          </button>
          <button
            onClick={exportJSON}
            className="px-3 py-2 rounded-lg border hover:bg-gray-50 flex items-center gap-2"
          >
            <FileText size={16} /> JSON
          </button>
          <button
            onClick={removeAll}
            className="px-3 py-2 rounded-lg bg-red-600 text-white hover:brightness-95 flex items-center gap-2"
          >
            <Trash2 size={16} /> Clear All
          </button>
        </div>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 px-2">Case ID</th>
                <th className="py-2 px-2">Service</th>
                <th className="py-2 px-2">Created</th>
                <th className="py-2 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-2 font-mono">
                    {(c.id || "").slice(0, 12)}
                  </td>
                  <td className="py-2 px-2">{c.service}</td>
                  <td className="py-2 px-2">
                    {new Date(c.ts).toLocaleString()}
                  </td>
                  <td className="py-2 px-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(/cases/)}
                        className="px-2 py-1 rounded-lg border hover:bg-gray-50 flex items-center gap-1"
                      >
                        <Eye size={16} /> View
                      </button>
                      <button
                        onClick={() => remove(c.id)}
                        className="px-2 py-1 rounded-lg bg-red-600 text-white hover:brightness-95"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-gray-500">
                    No cases yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
