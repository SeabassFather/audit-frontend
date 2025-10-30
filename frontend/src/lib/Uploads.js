import React, { useState, useEffect } from "react";
import { uploadDoc, fetchReports } from "../lib/api";

export default function Uploads() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReports().then(setDocs).catch(console.error);
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const res = await uploadDoc(file);
    setDocs((prev) => [...prev, res]);
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Document Uploads</h1>
      <input type="file" onChange={handleUpload} />
      {loading && <p>Uploading...</p>}
      <ul>
        {docs.map((d, i) => (
          <li key={i}>
<<<<<<< HEAD
            {d.name} – {d.status || "⏳ Pending"}
=======
            {d.name} Ã¢â‚¬â€œ {d.status || "Ã¢ÂÂ³ Pending"}
>>>>>>> my/push-branch
          </li>
        ))}
      </ul>
    </div>
  );
}



