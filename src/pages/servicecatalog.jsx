const categories = [
  { id: "mortgage", name: "Mortgage Audits", desc: "Loan, escrow, TRID, compliance" },
  { id: "agri", name: "AgriTrade Connect", desc: "USDA pricing, grower factoring, produce imports" },
  { id: "water", name: "Water Technology", desc: "Upload soil & water test reports" },
  { id: "realestate", name: "Mexico Real Estate", desc: "Cross-border finance + listings" },
  { id: "compliance", name: "Global Compliance", desc: "TRID, ECOA, GDPR, CCPA, PIPEDA, etc." },
  { id: "admin", name: "Admin Tools", desc: "Docs, Files, eSign, Dashboards" }
];

export default function ServiceCatalog() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {categories.map(cat => (
        <div key={cat.id} className="card hover:shadow-md transition">
          <div className="text-lg font-semibold text-[var(--primary)]">{cat.name}</div>
          <div className="text-sm mt-1 text-[var(--muted)]">{cat.desc}</div>
        </div>
      ))}
    </div>
  );
}
