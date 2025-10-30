import { useState } from "react";
import UploadWidget from "../components/UploadWidget";
import WaterSearch from "../components/WaterSearch";
import Tariffs from "./Tariffs";

export default function Compliance() {
  const [downloading, setDownloading] = useState(false);

  async function downloadKit() {
    setDownloading(true);
    const res = await fetch("/api/compliance/download-kit");
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "AuditDNA_Compliance_Tariff_Kit.zip";
    a.click();
    setDownloading(false);
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Global Compliance Dashboard</h1>
      <p className="text-gray-600">Federal, State, International Law, USDA pricing, Tariffs, and Eco uploads.</p>
      <section>
        <h2 className="text-xl font-semibold mb-2">Federal & State Compliance</h2>
        <ul className="list-disc list-inside text-gray-700">
<<<<<<< HEAD
          <li>CFPB – Consumer Lending, Fair Credit, UDAAP</li>
          <li>IRS – Capital Gains, Corporate Tax, Income Tax</li>
=======
          <li>CFPB Ã¢â‚¬â€œ Consumer Lending, Fair Credit, UDAAP</li>
          <li>IRS Ã¢â‚¬â€œ Capital Gains, Corporate Tax, Income Tax</li>
>>>>>>> my/push-branch
          <li>State Privacy + Tax Codes (CA, TX, NY, FL)</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Water & Soil Compliance</h2>
        <UploadWidget />
        <WaterSearch />
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">International Trade & Tariffs</h2>
        <Tariffs />
      </section>
      <section>
        <button
          onClick={downloadKit}
          disabled={downloading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {downloading ? "Preparing Kit..." : "Download Compliance + Tariff Kit"}
        </button>
      </section>
    </div>
  );
}