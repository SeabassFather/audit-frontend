import React from "react";
import Sidebar from "./components/Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-gray-200 to-gray-100">
      <Sidebar categories={[]} />
      <main className="flex-1 ml-72 px-10 py-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-green-700 bg-gradient-to-r from-gray-100 to-green-100 rounded-xl px-6 py-4 shadow border border-green-200">
            Welcome to AuditDNA ELITE
          </h1>
        </div>
        {children}
      </main>
    </div>
  );
}