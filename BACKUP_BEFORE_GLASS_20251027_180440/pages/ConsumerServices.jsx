const ConsumerServices = () => (
  <div style={card}>
    <h2 style={title}>Mortgage & Real Estate Services</h2>
    <ul style={list}>
      <li>Escrow, PMI, TILA/RESPA, Servicing Transfers</li>
      <li>Mortgage Loan Audit</li>
      <li>Fee Audit</li>
      <li>Reconciliation</li>
      <li>Promissory Note Audit</li>
      <li>Servicing</li>
      <li>Title Audit</li>
      <li>PMI Removal</li>
      <li>Insurance Overcharge Review</li>
    </ul>
  </div>
);

const card = {
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
  padding: "2rem",
  minWidth: "350px",
  maxWidth: "450px",
  margin: "2rem auto",
};
const title = {
  fontSize: "1.2rem",
  fontWeight: "bold",
  marginBottom: "1rem",
  color: "#253858",
};
const list = {
  fontSize: "1rem",
  color: "#3a4767",
  lineHeight: "2rem",
  margin: 0,
  paddingLeft: "1.2rem",
};

export default ConsumerServices;
