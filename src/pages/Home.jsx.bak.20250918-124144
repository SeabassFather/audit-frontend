import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-emerald-400"></div>
          <span className="font-semibold">AUDITDNA</span>
        </div>
        <nav className="hidden md:flex gap-4 text-sm text-slate-600">
          <Link to="/">Home</Link>
          <Link to="/usda">USDA Pricing</Link>
          <Link to="/mortgage/moxxi">Mortgage (MoXi)</Link>
          <Link to="/real-estate">Real Estate (MX)</Link>
          <Link to="/produce">Produce Analytics</Link>
        </nav>
        <span className="px-2 py-1 text-xs rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          Backend: Online
        </span>
      </div>

      {/* Welcome */}
      <div className="glass rounded-2xl p-5 mb-6">
        <div className="font-semibold mb-1">Welcome to AUDITDNA</div>
        <div className="text-sm text-slate-600">
          A single workspace for cross-border lending, USDA pricing, compliance, water tech, and files.
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass rounded-2xl p-5 mb-6">
        <div className="font-semibold mb-3">Quick Actions</div>
        <div className="flex flex-wrap gap-3">
          <Link to="/mortgage/moxxi" className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm">
            New MX Mortgage Scenario
          </Link>
          <Link to="/usda" className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-sm">
            Open USDA Pricing
          </Link>
          <Link to="/files" className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm border border-slate-200">
            Upload Docs
          </Link>
        </div>
      </div>

      {/* Modules */}
      <div className="glass rounded-2xl p-5">
        <div className="font-semibold mb-4">Modules</div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link to="/mortgage/moxxi" className="glass rounded-2xl p-4 hover:shadow-md transition">
            <div className="font-semibold">Mortgage (USAMX)</div>
            <div className="text-xs text-slate-500">Cross-border lenders & scenarios</div>
          </Link>

          <Link to="/real-estate" className="glass rounded-2xl p-4 hover:shadow-md transition">
            <div className="font-semibold">Mexico Real Estate</div>
            <div className="text-xs text-slate-500">Listings + finance route</div>
          </Link>

          <Link to="/usda" className="glass rounded-2xl p-4 hover:shadow-md transition">
            <div className="font-semibold">USDA Pricing</div>
            <div className="text-xs text-slate-500">Commodity charts & feeds</div>
          </Link>

          <Link to="/produce" className="glass rounded-2xl p-4 hover:shadow-md transition">
            <div className="font-semibold">Produce Analytics</div>
            <div className="text-xs text-slate-500">5-year seasonality, volatility, YoY</div>
          </Link>

          <Link to="/water" className="glass rounded-2xl p-4 hover:shadow-md transition">
            <div className="font-semibold">Water Tech Upload</div>
            <div className="text-xs text-slate-500">Soil/Water lab uploads</div>
          </Link>

          <Link to="/files" className="glass rounded-2xl p-4 hover:shadow-md transition">
            <div className="font-semibold">Files & Docs</div>
            <div className="text-xs text-slate-500">Docs, templates, exports</div>
          </Link>
        </div>

        {/* Footer status */}
        <div className="mt-6 text-xs text-slate-500 flex items-center justify-between">
          <span>AuditDNA</span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            <span>FEBE linked via /api :5050</span>
          </span>
        </div>
      </div>
    </main>
  );
}