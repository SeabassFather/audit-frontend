export default function Dashboard() {
  return (
    <div className="grid grid-3">
      <section className="card" style={{ gridColumn: "span 2" }}>
        <div className="h1">Welcome to AuditDNA</div>
        <p className="subtle">
          USDA Prices Mortgage Search Ag Factoring Services Compliance Global
          Search.
        </p>
      </section>
      <section className="card">
        <div className="h2">Quick Links</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginTop: 10,
          }}
        >
          <a className="tab" href="/prices">
            USDA Prices
          </a>
          <a className="tab" href="/mortgage">
            Mortgage Search
          </a>
          <a className="tab" href="/factoring">
            Ag Factoring
          </a>
          <a className="tab" href="/services">
            Services Tree
          </a>
          <a className="tab" href="/compliance">
            Compliance
          </a>
          <a className="tab" href="/search">
            Global Search
          </a>
        </div>
      </section>
    </div>
  );
}
