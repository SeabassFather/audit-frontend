import React from "react";
import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 to-blue-900 text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-lg">AuditDNA</div>
              <div className="text-sm text-blue-300">Spartan 300 Elite Platform</div>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-blue-200">
              CFPB-aware • Escrow Traceable • Consent-Driven
            </p>
            <p className="text-xs text-blue-300 mt-1">
              © {new Date().getFullYear()} AuditDNA. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
