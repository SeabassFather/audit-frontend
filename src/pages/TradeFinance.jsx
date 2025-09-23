const TradeFinance = () => (
  <div style={pageWrap}>
    <h1 style={title}>Trade Finance</h1>
    <p style={desc}>Invoice factoring & PO finance. No mock data; UI will show real errors.</p>
    <div style={card}>
      <h2 style={subtitle}>Trade Finance Search</h2>
      <p style={small}>POST /api/search/trade-finance</p>
      <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.2rem' }}>
        <div>
          <label>Legal Name</label><input style={input} />
          <label>DUNS</label><input style={input} />
          <label>Country</label><input style={input} value="US" />
          <label>Annual Revenue $</label><input style={input} />
          <label>AR Aging Summary</label><input style={input} />
          <label><input type="checkbox" /> Factoring</label>
          <label><input type="checkbox" /> PO Financing</label>
        </div>
        <div>
          <label>Amount</label><input style={input} />
          <label>Currency</label>
          <input style={input} value="USD" />
          <label>Debtor/Buyer</label><input style={input} />
          <label>Terms</label>
          <input style={input} value="Net 30" />
          <label>Type</label><input style={input} value="One-off" />
          <label>Season</label><input style={input} />
        </div>
        <div>
          <label>Inventory/Collateral</label><input style={input} />
          <label>Shipping Terms</label><input style={input} />
          <label>Insurance</label><input style={input} />
          <label>Commitment</label><input style={input} value="30" />
          <label>Regions</label>
          <div>
            <label><input type="checkbox" /> MX</label>
            <label><input type="checkbox" /> Central Am.</label>
            <label><input type="checkbox" /> South Am.</label>
          </div>
          <label>Upload PO/Invoice/MSA/Insurance</label>
          <input type="file" style={input} />
        </div>
        <div style={{ gridColumn: "1/4", textAlign: "center", marginTop: "1.5rem" }}>
          <button style={btn}>Find Facilities / Matches</button>
        </div>
      </form>
    </div>
  </div>
);

const pageWrap = { padding: "3rem 0", display: "flex", flexDirection: "column", alignItems: "center", background: "#f7f8fa", minHeight: "calc(100vh - 64px)" };
const title = { fontSize: "2rem", marginBottom: "0.5rem", color: "#253858", fontWeight: "bold" };
const desc = { fontSize: "1rem", marginBottom: "2rem", color: "#3a4767" };
const card = { background: "#fff", borderRadius: "18px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", padding: "2.5rem", minWidth: "600px", maxWidth: "1100px", width: "90%" };
const subtitle = { fontSize: "1.2rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#253858" };
const small = { fontSize: "0.9rem", marginBottom: "1.5rem", color: "#555" };
const input = { width: "100%", padding: "0.6rem", borderRadius: "6px", border: "1px solid #e4e7ec", marginBottom: "0.7rem" };
const btn = { background: "#253858", color: "#fff", borderRadius: "8px", padding: "0.9rem 3rem", border: "none", fontWeight: 700, fontSize: "1.1rem", cursor: "pointer" };

export default TradeFinance;