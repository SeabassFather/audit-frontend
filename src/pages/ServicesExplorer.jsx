import React, { useState } from "react";
import { serviceCategories } from "../data/serviceCategories";
import Accordion from "../components/Accordion";

export default function ServicesExplorer() {
  const [open, setOpen] = useState(-1);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-3">
        <span className="inline-block w-12 h-12 bg-gradient-to-tr from-sky-400 to-green-300 rounded-xl grid place-items-center text-2xl font-bold shadow">AD</span>
        AuditDNA: Explore Services
      </h1>
      <div className="space-y-5">
        {serviceCategories.map((cat, idx) => (
          <Accordion
            key={cat.section}
            open={open === idx}
            onToggle={() => setOpen(open === idx ? -1 : idx)}
            title={
              <span className="flex items-center gap-3 text-xl font-semibold">
                <span>{cat.icon}</span>
                <span>{cat.section}</span>
                <span className="text-sm font-normal text-gray-400">{cat.description}</span>
              </span>
            }
            content={
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                {cat.modules.map(m => (
                  <a
                    key={m.label}
                    href={m.to}
                    className="block bg-white shadow hover:shadow-lg border border-gray-200 rounded-xl px-5 py-4 transition-all group"
                  >
                    <span className="font-semibold text-base group-hover:text-sky-700">{m.label}</span>
                    <div className="text-xs text-gray-500 mt-1">{cat.description}</div>
                  </a>
                ))}
              </div>
            }
          />
        ))}
      </div>
      <div className="mt-12 text-center text-xs text-gray-500 opacity-70">
        CFPB-aware â€¢ Escrow Traceable â€¢ Consent-Driven â€¢ Patent Pending
      </div>
    </div>
  );
}
