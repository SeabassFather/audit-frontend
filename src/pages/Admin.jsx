import React from "react";
import QRManager from "../features/admin/QRManager";

export default function Admin() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <QRManager />
        <div className="rounded-2xl border p-4 bg-white">
          <h3 className="font-semibold">Environment</h3>
          <ul className="text-sm mt-2 list-disc ml-5">
            <li>
              Set <code>REACT_APP_API_BASE</code>{" "}
              for API
            </li>
            <li>Use Navbar button to toggle Demo/Live data</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
