import React, { useState } from "react";

const clickSound = new Audio("/sounds/click.mp3"); // place file in public/sounds

const FileUpload = ({ label }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      clickSound.play();
      alert("`\${label} uploaded successfully");
      setFile(null);
    } else {
      alert("Please choose a file first.");
    }
  };

  return (
    <div
      className="upload-box"
      style={{
        margin: "1rem",
        padding: "1rem",
        border: "1px solid #ddd",
        borderRadius: "8px",
        background: "white",
        transition: "all 0.3s ease",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 0 12px rgba(30,144,255,0.6)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <h4>{label}</h4>
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        style={{
          marginTop: "0.5rem",
          background: "#1e90ff",
          color: "white",
          border: "none",
          padding: "6px 12px",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#63b3ff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#1e90ff";
        }}
      >
        Upload
      </button>
    </div>
  );
};

function Compliance() {
  return (
    <div className="compliance-page" style={{ padding: "2rem" }}>
      <h2>Compliance</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        <FileUpload label="Upload: Purchase Orders" />
        <FileUpload label="Upload: Invoices" />
        <FileUpload label="Upload: Shipping Docs (BOL/POD)" />
        <FileUpload label="Upload: Buyer Agreement" />
        <FileUpload label="Upload: PACA License" />
      </div>
    </div>
  );
}

export default Compliance;
