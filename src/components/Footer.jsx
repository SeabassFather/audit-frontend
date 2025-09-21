export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="container py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-green-600 grid place-items-center font-bold text-white text-sm">
                AD
              </div>
              <span className="font-bold text-lg text-slate-800">AuditDNA</span>
            </div>
            <p className="text-sm text-slate-600">
              Modern audit platform for Agriculture, Mortgage, Compliance, and more. 
              Over 275+ services available.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-3">Services</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="/services" className="hover:text-blue-600 transition-colors">Browse All Services</a></li>
              <li><a href="/uploads" className="hover:text-blue-600 transition-colors">Document Upload</a></li>
              <li><a href="/engines" className="hover:text-blue-600 transition-colors">Audit Engines</a></li>
              <li><a href="/tickers" className="hover:text-blue-600 transition-colors">Market Tickers</a></li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-3">Tools</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="/chat" className="hover:text-blue-600 transition-colors">AI Chat Assistant</a></li>
              <li><a href="/usda" className="hover:text-blue-600 transition-colors">USDA Pricing</a></li>
              <li><a href="/modules" className="hover:text-blue-600 transition-colors">Audit Modules</a></li>
              <li><a href="/results" className="hover:text-blue-600 transition-colors">Results & Reports</a></li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="/marketing" className="hover:text-blue-600 transition-colors">Marketing</a></li>
              <li><a href="/pitch-deck" className="hover:text-blue-600 transition-colors">Pitch Deck</a></li>
              <li><a href="/agreements" className="hover:text-blue-600 transition-colors">Agreements</a></li>
              <li><a href="/admin" className="hover:text-blue-600 transition-colors">Admin Portal</a></li>
            </ul>
          </div>
        </div>

        <div className="divider"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <div className="flex flex-wrap items-center gap-4">
            <span>AuditDNA Platform</span>
            <span>•</span>
            <span>CFPB-aware</span>
            <span>•</span>
            <span>NMLS #137694</span>
          </div>
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} AuditDNA</span>
            <span>•</span>
            <span>All Rights Reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}