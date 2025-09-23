import React from "react";
import { FaSearch, FaPlus, FaFileAlt } from "react-icons/fa";

// Realistic financial/lending case data:
const cases = [
  {
    id: "C-10234",
    service: "Commercial Loan Review",
    client: "Midwest Grain Co.",
    status: "Open",
    created: "2025-09-02",
    amount: "$2,500,000",
    analyst: "J. Morrison",
    lastAction: "Docs Requested",
  },
  {
    id: "C-10233",
    service: "Mortgage Underwriting",
    client: "Sun Valley Realty",
    status: "In Review",
    created: "2025-08-28",
    amount: "$850,000",
    analyst: "A. Lee",
    lastAction: "Risk Assessed",
  },
  {
    id: "C-10232",
    service: "Ag Equipment Financing",
    client: "Agro Holdings",
    status: "Closed",
    created: "2025-08-21",
    amount: "$1,200,000",
    analyst: "R. Patel",
    lastAction: "Funded",
  },
  {
    id: "C-10231",
    service: "Credit Line Audit",
    client: "GreenFields Group",
    status: "Open",
    created: "2025-08-15",
    amount: "$3,000,000",
    analyst: "J. Morrison",
    lastAction: "Initial Review",
  },
  {
    id: "C-10230",
    service: "Risk Assessment",
    client: "Farmers United",
    status: "Declined",
    created: "2025-08-13",
    amount: "$400,000",
    analyst: "L. Kim",
    lastAction: "Declined - Noncompliance",
  }
];

// Status color mapping for financial style
const statusColors = {
  "Open": "#2e7d32",
  "In Review": "#f9a825",
  "Closed": "#1565c0",
  "Declined": "#c62828",
};

export default function CasesPage() {
  return (
    <div style={{ padding: "32px", minHeight: "100vh", background: "#f7f8fa" }}>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "32px"
      }}>
        <h1 style={{
          fontSize: "2.2rem",
          fontWeight: 700,
          letterSpacing: "-1px",
          color: "#181D2F"
        }}>
          <FaFileAlt style={{ marginRight: "12px", color: "#cb356b" }} />
          Cases
        </h1>
        <button style={{
          background: "linear-gradient(90deg,#cb356b,#bd3f32)",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "12px 28px",
          fontWeight: 600,
          fontSize: "1.08rem",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(203,53,107,0.08)"
        }}>
          <FaPlus style={{ marginRight: "8px" }} /> New Case
        </button>
      </div>

      {/* Search and Filter */}
      <div style={{
        display: "flex",
        gap: "16px",
        marginBottom: "24px"
      }}>
        <div style={{ flex: 2, position: "relative" }}>
          <FaSearch style={{
            position: "absolute",
            top: "50%",
            left: "16px",
            transform: "translateY(-50%)",
            opacity: 0.3,
            fontSize: "1.1em"
          }} />
          <input
            type="text"
            placeholder="Search by Case ID, client, or service…"
            style={{
              width: "100%",
              padding: "12px 16px 12px 40px",
              borderRadius: "8px",
              border: "1px solid #e1e5ea",
              fontSize: "1rem",
              background: "#fff"
            }}
          />
        </div>
        <select style={{
          flex: 1,
          borderRadius: "8px",
          border: "1px solid #e1e5ea",
          padding: "12px 16px",
          fontSize: "1rem",
          background: "#fff"
        }}>
          <option value="all">All status</option>
          <option value="open">Open</option>
          <option value="inreview">In Review</option>
          <option value="closed">Closed</option>
          <option value="declined">Declined</option>
        </select>
      </div>

      {/* Cases Table */}
      <div style={{
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        overflow: "hidden"
      }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          minWidth: "900px"
        }}>
          <thead>
            <tr style={{ background: "#f6f6f8" }}>
              <th style={thStyle}>Case ID</th>
              <th style={thStyle}>Service</th>
              <th style={thStyle}>Client</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Amount</th>
              <th style={thStyle}>Analyst</th>
              <th style={thStyle}>Created</th>
              <th style={thStyle}>Last Action</th>
              <th style={thStyle}></th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c, i) => (
              <tr key={c.id} style={{
                background: i % 2 === 0 ? "#fff" : "#f7f8fa",
                transition: "background 0.2s",
                ":hover": { background: "#f1f1f7" }
              }}>
                <td style={tdStyle}>{c.id}</td>
                <td style={tdStyle}>{c.service}</td>
                <td style={tdStyle}>{c.client}</td>
                <td style={tdStyle}>
                  <span style={{
                    background: statusColors[c.status] + '22',
                    color: statusColors[c.status],
                    borderRadius: "5px",
                    fontWeight: 600,
                    padding: "4px 12px",
                    fontSize: ".98rem"
                  }}>
                    {c.status}
                  </span>
                </td>
                <td style={tdStyle}>{c.amount}</td>
                <td style={tdStyle}>{c.analyst}</td>
                <td style={tdStyle}>{c.created}</td>
                <td style={tdStyle}>{c.lastAction}</td>
                <td style={tdStyle}>
                  <button style={{
                    background: "#f0f3fa",
                    border: "none",
                    borderRadius: "6px",
                    padding: "7px 18px",
                    color: "#cb356b",
                    fontWeight: 600,
                    cursor: "pointer"
                  }}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {cases.length === 0 && (
          <div style={{ textAlign: "center", color: "#8d98a8", padding: "48px" }}>
            <div style={{ fontSize: "1.3rem", fontWeight: 600 }}>
              No cases found
            </div>
            <div style={{ marginTop: 8 }}>Click "New Case" to get started.</div>
          </div>
        )}
      </div>
    </div>
  );
}

const thStyle = {
  padding: "16px 12px",
  borderBottom: "2px solid #e1e1e1",
  textAlign: "left",
  fontWeight: "bold",
  fontSize: "1.08rem",
  color: "#182042",
  letterSpacing: "-.5px",
};
const tdStyle = {
  padding: "14px 12px",
  borderBottom: "1px solid #e1e1e1",
  fontSize: "1rem",
  color: "#24304b",
};