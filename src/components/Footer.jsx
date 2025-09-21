import React from "react";
export default function Footer() {
  return (
    <footer className="w-full bg-white py-3 px-6 flex justify-between items-center shadow-inner text-sm text-gray-600">
      <span>&copy; {new Date().getFullYear()} AuditDNA. All Rights Reserved.</span>
      <span>Powered by Copilot & Team AuditDNA</span>
    </footer>
  );
}
