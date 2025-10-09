import React from "react";
import { Link } from "react-router-dom";
import { Shield, Building2, Leaf, Search, Upload, TrendingUp, FileText, Globe } from "lucide-react";

const StatCard = ({ icon: Icon, value, label, color = "blue" }) => (
  <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-blue-100 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br from-${color}-500 to-${color}-700 mb-4`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-1">
      {value}
    </div>
    <div className="text-sm text-slate-600 font-medium">{label}</div>
  </div>
);

const ServiceCard = ({ to, icon: Icon, title, description, gradient }) => (
  <Link
    to={to}
    className="group relative bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-blue-100 shadow-lg hover:shadow-2xl transition-all hover:scale-105 overflow-hidden"
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
    <div className="relative z-10">
      <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 mb-4 group-hover:scale-110 transition-transform">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  </Link>
);

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 text-white py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')] opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md mb-6 animate-pulse">
              <Shield className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Welcome to <span className="bg-gradient-to-r from-blue-100 to-white bg-clip-text text-transparent">AuditDNA</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              The premier platform for lending, audit, compliance, ag marketplace, finance, and regulatory solutions
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                to="/audit-catalog"
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-2xl hover:shadow-blue-300/50 hover:scale-105"
              >
                Explore Services
              </Link>
              <Link
                to="/upload"
                className="px-8 py-4 bg-blue-500/30 backdrop-blur-md text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-blue-400/40 transition-all hover:scale-105"
              >
                Upload Documents
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 -mt-24 relative z-20">
            <StatCard icon={Shield} value="300+" label="Spartan Services" color="blue" />
            <StatCard icon={Building2} value="100+" label="USDA Engines" color="green" />
            <StatCard icon={FileText} value="24/7" label="Compliance Monitor" color="purple" />
            <StatCard icon={Globe} value="50+" label="Jurisdictions" color="cyan" />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
              Comprehensive Platform Services
            </h2>
            <p className="text-lg text-slate-600">
              Access our full suite of audit, compliance, and financial solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              to="/audit-catalog"
              icon={Shield}
              title="Audit Services Catalog"
              description="300+ professional services across consumer protection, mortgage, legal, and more"
              gradient="from-blue-500 to-blue-700"
            />
            <ServiceCard
              to="/search-engines"
              icon={Search}
              title="USDA Search Engines"
              description="100+ search engines for agriculture, market news, and commodity data"
              gradient="from-green-500 to-green-700"
            />
            <ServiceCard
              to="/mortgages"
              icon={Building2}
              title="Mortgage Audit"
              description="Compliance and mathematical audit of loans, TIL/RESPA, amortization analysis"
              gradient="from-purple-500 to-purple-700"
            />
            <ServiceCard
              to="/ag-market"
              icon={Leaf}
              title="Ag Marketplace"
              description="Agricultural marketplace, trade finance, and commodity tracking"
              gradient="from-emerald-500 to-emerald-700"
            />
            <ServiceCard
              to="/upload"
              icon={Upload}
              title="Document Upload"
              description="Secure file upload and processing for audit and compliance workflows"
              gradient="from-cyan-500 to-cyan-700"
            />
            <ServiceCard
              to="/tickers"
              icon={TrendingUp}
              title="Real-time Tickers"
              description="Live market data, compliance alerts, and regulatory updates"
              gradient="from-orange-500 to-orange-700"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals using AuditDNA for comprehensive compliance and audit solutions
          </p>
          <Link
            to="/audit-catalog"
            className="inline-block px-10 py-5 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-2xl hover:shadow-blue-300/50 hover:scale-105"
          >
            Browse All Services
          </Link>
        </div>
      </section>
    </div>
  );
}
