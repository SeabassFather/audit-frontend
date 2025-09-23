import React from "react";
import { Link } from "react-router-dom";
export default function Home(){
  const items = [
    {to:"/services", title:"Services"},
    {to:"/ag", title:"USDA Commodity Explorer"},
    {to:"/files", title:"File Uploads"},
    {to:"/docusign", title:"DocuSign"},
    {to:"/admin", title:"Admin Dashboard"},
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold">Welcome to AuditDNA</h1>
      <p className="text-gray-600 mt-2">Choose a section below.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
        {items.map(x=>(
          <Link key={x.to} to={x.to} className="rounded-xl border p-4 hover:shadow bg-white">
            <div className="text-lg font-semibold">{x.title}</div>
            <div className="text-xs text-gray-500 mt-1">{x.to}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}