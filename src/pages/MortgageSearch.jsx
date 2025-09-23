const MortgageSearch = () => (
  <div style={pageWrap}>
    <h1 style={title}>Mortgage Search</h1>
    <p style={desc}>Submit criteria; real API required. Errors will be shown inline.</p>
    <div style={card}>
      <h2 style={subtitle}>Mortgage Loan Search</h2>
      <p style={small}>POST /api/search/mortgages loanMatcher</p>
      <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
        <div>
          <label>Name</label><input style={input} />
          <label>Email</label><input style={input} />
          <label>Phone</label><input style={input} />
          <label><input type="checkbox" /> NMLS Consent</label>
          <label><input type="checkbox" /> Soft-Pull Consent</label>
        </div>
        <div>
          <label>Address</label><input style={input} />
          <label>Single Family</label>
          <div>
            <label><input type="radio" name="family" /> Owner</label>
            <label><input type="radio" name="family" /> Second</label>
            <label><input type="radio" name="family" /> Investment</label>
          </div>
          <label><input type="radio" name="purpose" /> Purchase</label>
          <label><input type="radio" name="purpose" /> Refi</label>
          <label>Purchase Price</label><input style={input} />
          <label>Est. Value</label><input style={input} />
        </div>
        <div>
          <label>Credit Score</label>
          <select style={input}><option>720-759</option></select>
          <label>DTI %</label><input style={input} />
          <label>Income $</label><input style={input} />
          <label>Assets $</label><input style={input} />
          <label>Loan Amount $</label><input style={input} />
          <label>Type</label>
          <select style={input}><option>Conventional</option></select>
          <label>Computed LTV: 0%</label>
        </div>
        <div>
          <label>Timing</label><input type="date" style={input} />
          <label>No Lock Preference</label>
          <label>Optional Docs</label>
          <input type="file" style={input} />
        </div>
        <div style={{ gridColumn: "1/3", textAlign: "center", marginTop: "1.5rem" }}>
          <button style={btn}>Search / Match</button>
        </div>
      </form>
    </div>
  </div>
);

const pageWrap = { padding: "3rem 0", display: "flex", flexDirection: "column", alignItems: "center", background: "#f7f8fa", minHeight: "calc(100vh - 64px)" };
const title = { fontSize: "2rem", marginBottom: "0.5rem", color: "#253858", fontWeight: "bold" };
const desc = { fontSize: "1rem", marginBottom: "2rem", color: "#3a4767" };
const card = { background: "#fff", borderRadius: "18px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", padding: "2.5rem", minWidth: "600px", maxWidth: "900px", width: "90%" };
const subtitle = { fontSize: "1.2rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#253858" };
const small = { fontSize: "0.9rem", marginBottom: "1.5rem", color: "#555" };
const input = { width: "100%", padding: "0.6rem", borderRadius: "6px", border: "1px solid #e4e7ec", marginBottom: "0.7rem" };
const btn = { background: "#253858", color: "#fff", borderRadius: "8px", padding: "0.9rem 3rem", border: "none", fontWeight: 700, fontSize: "1.1rem", cursor: "pointer" };

export default MortgageSearch;