import React, { useState } from "react";
import servicesData from "../data/servicesExpanded.json";
import DynamicAuditModule from "../components/DynamicAuditModule";

export default function AuditDNAServiceCatalog() {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedService, setExpandedService] = useState(null);
  const [selectedAudit, setSelectedAudit] = useState(null);

  return (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>
        AuditDNA Master Audit & Compliance Catalog
      </h1>
      <p style={{ color: "#555", marginBottom: 30 }}>
        Explore all categories, services, and subsections. Select any subsection to launch a full audit workflow.
      </p>

<<<<<<< HEAD
      {/* Accordion: Category → Services → Subsections */}
=======
      {/* Accordion: Category Ã¢â€ â€™ Services Ã¢â€ â€™ Subsections */}
>>>>>>> my/push-branch
      {servicesData.map((cat, catIdx) => (
        <div key={catIdx} style={{ marginBottom: 18, border: "1px solid #e2e8f0", borderRadius: 10 }}>
          <button
            onClick={() => setExpandedCategory(expandedCategory === catIdx ? null : catIdx)}
            style={{ width: "100%", background: "#f6fafb", border: "none", textAlign: "left", padding: 18, fontWeight: 600, fontSize: 20, borderRadius: 10, cursor: "pointer" }}
          >
            {cat.category}
          </button>
          {expandedCategory === catIdx && (
            <div style={{ padding: "12px 32px 16px" }}>
              <div style={{ fontWeight: 500, color: "#222", marginBottom: 8 }}>{cat.service}</div>
              {cat.subsections && cat.subsections.length > 0 && (
                <div>
                  {cat.subsections.map((subsec, subIdx) => (
                    <div key={subIdx} style={{ marginBottom: 6 }}>
                      <button
                        onClick={() =>
                          setSelectedAudit({
                            category: cat.category,
                            service: cat.service,
                            subsection: subsec,
                          })
                        }
                        style={{
                          background: "#fff",
                          border: "1px solid #cbd5e1",
                          fontSize: 16,
                          borderRadius: 8,
                          padding: "8px 16px",
                          width: "100%",
                          textAlign: "left",
                          cursor: "pointer",
                        }}
                      >
                        {subsec}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {/* DYNAMIC AUDIT MODULE */}
      {selectedAudit && (
        <DynamicAuditModule
          category={selectedAudit.category}
          service={selectedAudit.service}
          subsection={selectedAudit.subsection}
          onClose={() => setSelectedAudit(null)}
        />
      )}
    </div>
  );
}