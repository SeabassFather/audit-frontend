// src/pages/HomePage.jsx
import React from "react";
import Accordion from "../components/Accordion";
import { serviceCategories } from "../data/servicesData";
import USDAPricing from "../features/usda/USDAPricing";
export default function HomePage() {
 const elite = serviceCategories.find((c) => c.id === "elite");
 const rest = serviceCategories.filter((c) => c.id !== "elite");
 return (
 <div className="mx-auto max-w-7xl px-4 py-6">
 <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-emerald-100 via-teal-100 to-sky-100 p-6 mb-6">
 <h1 className="text-2xl font-bold text-slate-900">AuditDNA Unified Compliance & Trade Platform</h1>
 <p className="text-slate-700 mt-1">Modern, light UI Demo/Live toggle No black backgrounds.</p>
 </div>
 {elite && (
 <section className="mb-6">
 <h2 className="mb-3 text-lg font-semibold text-slate-800">Featured {elite.title}</h2>
 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
 {elite.services.map((s) => (
 <div key={s.id} className="rounded-2xl border border-blue-300 bg-blue-50 p-4">
 <div className="text-slate-900 font-medium">{s.name}</div>
 <div className="text-xs text-slate-600">Bundle ID: {s.id}</div>
 </div>
 ))}
 </div>
 </section>
 )}
 <section className="mb-6">
 <h2 className="mb-3 text-lg font-semibold text-slate-800">All Services</h2>
 <Accordion categories={rest} />
 </section>
 <section>
 <USDAPricing />
 </section>
 </div>
 );
}