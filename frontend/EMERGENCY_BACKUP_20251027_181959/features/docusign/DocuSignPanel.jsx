import React, { useEffect, useState } from "react";
import { api } from "../../utils/api";

export default function DocuSignPanel() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [fileKey, setFileKey] = useState(""); // paste from FileUpload result
  const [envelope, setEnvelope] = useState(null);
  const [status, setStatus] = useState("");

  async function createEnvelope() {
    setStatus("Creating envelopeÃ¢â‚¬Â¦");
    const res = await api.post("/docusign/envelopes", {
      subject: "AuditDNA Document",
      recipients: [{ name, email, role: "signer" }],
      files: [{ fileKey }],
    });
    setEnvelope(res);
    setStatus("Envelope created");
  }

  useEffect(() => {
    if (!envelope?.id) return;
    const id = envelope.id;
    const i = setInterval(async () => {
      try {
        const s = await api.get(`/docusign/envelopes/${id}`);
        setEnvelope(s);
      } catch (e) {
        /* ignore */
      }
    }, 4000);
    return () => clearInterval(i);
  }, [envelope?.id]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold">DocuSign</h1>
      <p className="text-sm text-gray-600 mt-1">
        Backend must proxy DocuSign API and expose <code>/docusign/*</code>{" "}
        endpoints.
      </p>
      <div className="grid sm:grid-cols-2 gap-3 mt-4">
        <input
          className="h-10 rounded-xl border px-3 bg-white"
          placeholder="Signer name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="h-10 rounded-xl border px-3 bg-white"
          placeholder="Signer email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="sm:col-span-2 h-10 rounded-xl border px-3 bg-white"
          placeholder="fileKey from upload"
          value={fileKey}
          onChange={(e) => setFileKey(e.target.value)}
        />
      </div>
      <div className="mt-3">
        <button
          onClick={createEnvelope}
          className="px-4 h-10 rounded-xl border bg-black text-white disabled:opacity-50"
          disabled={!email || !name || !fileKey}
        >
          Create Envelope
        </button>
        {status && <span className="ml-3 text-sm">{status}</span>}
      </div>
      {envelope && (
        <pre className="mt-4 bg-gray-50 border p-3 rounded text-xs overflow-auto">
          {JSON.stringify(envelope, null, 2)}
        </pre>
      )}
    </div>
  );
}
