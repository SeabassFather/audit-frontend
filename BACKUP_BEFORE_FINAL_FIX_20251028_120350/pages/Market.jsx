const Market = () => (
  <div style={pageWrap}>
    <h1 style={title}>Market</h1>
    <div style={card}>
      <p style={{ fontSize: "1.1rem", color: "#253858", marginBottom: "1rem" }}>
        Live Market Data & Lending Rates
      </p>
      <ul style={{ fontSize: "1rem", color: "#3a4767", lineHeight: "2rem" }}>
        <li>Real-time mortgage rates</li>
        <li>Trade finance rates</li>
        <li>Risk assessment indexes</li>
        <li>Regulatory updates</li>
      </ul>
    </div>
  </div>
);

const pageWrap = {
  padding: "3rem 0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "#f7f8fa",
  minHeight: "calc(100vh - 64px)",
};
const title = {
  fontSize: "2rem",
  marginBottom: "1.5rem",
  color: "#253858",
  fontWeight: "bold",
};
const card = {
  background: "#fff",
  borderRadius: "18px",
  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
  padding: "2.5rem",
  minWidth: "400px",
  maxWidth: "600px",
  width: "90%",
};

export default Market;
