import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">AD</span>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  AuditDNA
                </h3>
                <p className="text-sm text-gray-400">AI Audit & Compliance Platform</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              Revolutionizing audit and compliance through artificial intelligence. 
              Streamline your processes with our cutting-edge platform designed for 
              modern businesses.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/dashboard" className="text-gray-300 hover:text-green-400 transition-colors text-sm">Dashboard</a></li>
              <li><a href="/services" className="text-gray-300 hover:text-green-400 transition-colors text-sm">Services</a></li>
              <li><a href="/audit-engines" className="text-gray-300 hover:text-green-400 transition-colors text-sm">AI Engines</a></li>
              <li><a href="/admin" className="text-gray-300 hover:text-green-400 transition-colors text-sm">Administration</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">Documentation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">Contact Support</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">API Reference</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} AuditDNA. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
