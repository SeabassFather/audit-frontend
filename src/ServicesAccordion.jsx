// src/components/ServicesAccordion.jsx
import { useState } from "react";
import spartan300 from "../data/spartan300.json";

export default function ServicesAccordion() {
  const [open, setOpen] = useState(null);

  return (
    <div className="space-y-4">
      {Object.entries(spartan300).map(([category, subcats], i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600"
          >
            {category}
          </button>
          {open === i && (
            <div className="pl-6 py-2 space-y-2">
              {Object.entries(subcats).map(([subcat, services], j) => (
                <div key={j}>
                  <h4 className="font-semibold text-sm text-green-400">{subcat}</h4>
                  <ul className="pl-4 list-disc text-slate-300 text-sm">
                    {services.map((svc, k) => (
                      <li key={k}>{svc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
