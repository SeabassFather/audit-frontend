import React from "react";
export default function Footer() {
  return (
    <footer className="border-t bg-white/70">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600 text-sm">
        AuditDNA Platform Ã‚Â© {new Date().getFullYear()} | All Rights Reserved
      </div>
    </footer>
  );
}
