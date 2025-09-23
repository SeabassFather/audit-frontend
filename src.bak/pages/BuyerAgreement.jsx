import React, { useState } from "react";
import SmartUpload from "../components/SmartUpload";
export default function BuyerAgreement() {
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div style={{ padding: 20 }}>
      <h1>Buyer Agreement</h1>
      <SmartUpload
        title="Upload Buyer Agreement"
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
        to="/api/upload/buyer-agreement"
        extraFields={{ company, contact, email }}
      />
    </div>
  );
}
