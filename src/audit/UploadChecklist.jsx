import React, { useState, useEffect } from "react";
const REQUIRED_DOCS = ["Mortgage Statement", "Escrow Analysis", "Property Tax Bill"];

export default function UploadChecklist({ onComplete }) {
  const [uploaded, setUploaded] = useState({});

  useEffect(() => {
    if (onComplete) onComplete(Object.keys(uploaded).length === REQUIRED_DOCS.length);
  }, [uploaded, onComplete]);

  return (
    <div className="mb-4">
      <b>Required Documents:</b>
      <ul className="list-disc ml-6">
        {REQUIRED_DOCS.map(doc => (
          <li key={doc}>
            {doc} {" "}
            <input
              type="checkbox"
              checked={!!uploaded[doc]}
              onChange={() => setUploaded(up => ({ ...up, [doc]: !up[doc] }))}
            />
          </li>
        ))}
      </ul>
      {Object.keys(uploaded).length === REQUIRED_DOCS.length ? (
        <span className="text-green-600">All documents uploaded.</span>
      ) : (
        <span className="text-yellow-600">Upload all required documents to proceed.</span>
      )}
    </div>
  );
}