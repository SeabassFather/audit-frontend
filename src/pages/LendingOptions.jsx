const LendingOptions = () => (
  <div style={pageWrap}>
    <h1 style={title}>Lending Options</h1>
    <div style={card}>
      <ul style={list}>
        <li>Mortgage Loans</li>
        <li>Trade Finance Facilities</li>
        <li>Business Loans</li>
        <li>Personal Loans</li>
        <li>Asset-Based Lending</li>
        <li>Custom Solutions</li>
      </ul>
      <button style={btn}>Explore Lending Options</button>
    </div>
  </div>
);

const pageWrap = { padding: "3rem 0", display: "flex", flexDirection: "column", alignItems: "center", background: "#f7f8fa", minHeight: "calc(100vh - 64px)" };
const title = { fontSize: "2rem", marginBottom: "1.5rem", color: "#253858", fontWeight: "bold" };
const card = { background: "#fff", borderRadius: "18px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", padding: "2.5rem", minWidth: "400px", maxWidth: "600px", width: "90%" };
const btn = { background: "#253858", color: "#fff", borderRadius: "8px", padding: "0.9rem 2rem", border: "none", fontWeight: 700, fontSize: "1.1rem", cursor: "pointer", marginTop: "2rem" };
const list = { fontSize: '1.1rem', color: '#253858', lineHeight: '2.2rem', margin: 0, padding: 0, listStyle: 'none' };

export default LendingOptions;