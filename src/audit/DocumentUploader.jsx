import React, { useState } from "react";
export default function DocumentUploader() {
  const [file, setFile] = useState(null);
  return (
    <div className="mb-4">
      <label className="font-medium">Upload Document:</label>
      <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
      {file && <div className="text-sm mt-1">Selected: {file.name}</div>}
    </div>
  );
}