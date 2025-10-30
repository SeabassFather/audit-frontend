import React from "react";
import FileUpload from "./FileUpload";
export default function AgSearchForm() {
  return (
    <form
      style={{
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        padding: "2.5rem",
        minWidth: 340,
        maxWidth: 900,
        width: "100%",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "1.2rem",
        }}
      >
        <div>
          <label>Legal Name</label>
          <input className="input-main" />
          <label>DBA</label>
          <input className="input-main" />
          <label>Country</label>
          <input className="input-main" />
          <label>EIN/RFC</label>
          <input className="input-main" />
          <label>DUNS</label>
          <input className="input-main" />
          <label>Owners List</label>
          <input className="input-main" />
          <label>Years in Biz</label>
          <input className="input-main" />
          <label>Location(s)</label>
          <input className="input-main" />
          <label>Warehouse Option</label>
          <select className="input-main">
            <option>LA Partner</option>
          </select>
        </div>
        <div>
          <label>Certifications</label>
          <FileUpload />
          <label>Products</label>
          <input className="input-main" />
          <label>Crop Type</label>
          <input className="input-main" />
          <label>Variety</label>
          <input className="input-main" />
          <label>Grade/Spec</label>
          <input className="input-main" />
          <label>Harvest Window</label>
          <input className="input-main" />
          <label>Volume (per week/month)</label>
          <input className="input-main" />
          <label>Target Price</label>
          <input className="input-main" />
        </div>
        <div>
          <label>Buyer Name</label>
          <input className="input-main" />
          <label>Buyer Type</label>
          <select className="input-main">
            <option>Retail</option>
            <option>Wholesale</option>
            <option>Chain</option>
          </select>
          <label>PO #</label>
          <input className="input-main" />
          <label>PO Value</label>
          <input className="input-main" />
          <label>Payment Terms</label>
          <input className="input-main" />
          <label>Insurance</label>
          <FileUpload />
          <label>Compliance Docs</label>
          <FileUpload />
        </div>
        <div
          style={{
            gridColumn: "1/4",
            textAlign: "center",
            marginTop: "1.5rem",
          }}
        >
          <button className="btn-main" type="submit">
            Search / Match
          </button>
        </div>
      </div>
    </form>
  );
}
