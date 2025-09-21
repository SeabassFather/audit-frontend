import React from "react";
export default function Footer() {
  return (
    <footer className="border-t border-brand-silver bg-white/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 text-center">
        <div className="text-base font-semibold">AuditDNA Platform</div>
        <div className="text-sm text-gray-600">CFPB-aware  NMLS #137694   {new Date().getFullYear()} All Rights Reserved</div>
      </div>
    </footer>
  );
}
