import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200/60 bg-white/80 backdrop-blur-sm py-4 px-6">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <span>&copy; {new Date().getFullYear()} AuditDNA. All Rights Reserved.</span>
            <div className="hidden md:flex items-center gap-4">
              <a href="#" className="hover:text-ocean-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-ocean-600 transition-colors">Terms of Service</a>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span>Powered by</span>
            <span className="font-medium text-ocean-600">AI & AuditDNA Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
}