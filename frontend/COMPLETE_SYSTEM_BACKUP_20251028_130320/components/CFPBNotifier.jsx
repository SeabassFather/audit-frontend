import React, { useState } from "react";

export default function CFPBNotifier({ auditId, consumer, violationSummary }) {
  // auditId: string (unique identifier for the audit case, optional)
  // consumer: object (consumer info, optional)
  // violationSummary: string (brief summary of compliance issue)

  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Simulated async send function. Replace with your real API call as needed.
  async function notifyCFPB() {
    setStatus("sending");
    setError(null);
    setResult(null);
    try {
      // Simulate API call: replace with real endpoint
      // Example: await api.post("/api/cfpb-notify", { auditId, consumer, violationSummary })
      await new Promise((r) => setTimeout(r, 1200));
      setResult({
        message: "CFPB complaint submitted successfully.",
        trackingId: auditId ? "CFPB-" + auditId.slice(-6) : undefined,
      });
      setStatus("sent");
    } catch (e) {
      setError("Failed to notify CFPB. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div className="border rounded-xl p-4 bg-yellow-50 mb-4">
      <div className="font-bold mb-2">CFPB Notification</div>
      <div className="text-gray-700 mb-2">
        By using this feature, you can auto-file a complaint with the CFPB regarding compliance violations or overcharges. 
        <br />
        <b>Your data will be securely transmitted to the CFPB as required.</b>
      </div>

      {violationSummary && (
        <div className="mb-2 text-sm text-gray-800">
          <b>Issue:</b> {violationSummary}
        </div>
      )}

      {status === "idle" && (
        <button
          onClick={notifyCFPB}
          className="bg-gradient-to-r from-yellow-300 to-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg hover:from-yellow-400"
        >
          Notify CFPB
        </button>
      )}
      {status === "sending"