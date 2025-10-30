import React, { useState } from "react";
import { api } from "../../utils/api";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [result, setResult] = useState(null);

  async function startUpload() {
    if (!file) return;
    setStatus("Requesting pre-signed URLÃ¢â‚¬Â¦");
    const presign = await api.requestPresign({
      filename: file.name,
      type: file.type,
      size: file.size,
    });
    setStatus("Uploading to storageÃ¢â‚¬Â¦");
    await fetch(presign.uploadUrl, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type || "application/octet-stream" },
    });
    setStatus("Confirming with backendÃ¢â‚¬Â¦");
    const confirmed = await api.confirmUpload({
      fileKey: presign.fileKey,
      originalName: file.name,
      size: file.size,
      type: file.type,
    });
    setResult(confirmed);
    setStatus("Done");
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold">File Uploads</h1>
      <p className="text-sm text-gray-600 mt-1">
        Pre-signed URL pattern (S3/R2). Virus-scan/ingest can run in backend
        worker.
      </p>
      <div className="mt-4 flex items-center gap-3">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button
          disabled={!file}
          onClick={startUpload}
          className="px-4 h-10 rounded-xl border bg-black text-white disabled:opacity-50"
        >
          Upload
        </button>
      </div>
      {status && <div className="mt-3 text-sm">{status}</div>}
      {result && (
        <pre className="mt-3 bg-gray-50 border p-3 rounded text-xs overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
      <p className="text-xs text-gray-500 mt-2">
        Expected backend: <code>POST /files/presign</code> Ã¢â€ â€™{" "}
        <code>PUT uploadUrl</code> Ã¢â€ â€™ <code>POST /files/confirm</code>.
      </p>
    </div>
  );
}
