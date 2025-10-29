import React, { useState } from 'react';
import { Shield, Building, Leaf, Scale, Heart, Briefcase, Crown } from 'lucide-react';
import { CATEGORIES } from '../data/serviceData';

// Icon mapping for categories
const categoryIcons = {
  consumer: Shield,
  mortgage: Building,
  agri: Leaf,
  legal: Scale,
  insurance: Heart,
  medical: Heart,
  biz: Briefcase,
  elite: Crown,
};

// Superman-style AuditDNA Catalog Page
export default function AuditCatalogPage({ data = CATEGORIES }) {
  const [activeCategoryKey, setActiveCategoryKey] = useState(data[0]?.key || '');
  const [selectedService, setSelectedService] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const activeCategory = data.find((c) => c.key === activeCategoryKey);

  // Filter services based on search
  const getFilteredServices = (services) => {
    if (!searchQuery) return services;
    return services.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const CategoryIcon = ({ categoryKey, className = '' }) => {
    const Icon = categoryIcons[categoryKey] || Shield;
    return <Icon className={className} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 flex">
      {/* Sidebar with Bold Blue Gradients */}
      <nav className="w-80 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 shadow-2xl border-r border-blue-400/30 backdrop-blur-sm">
        <div className="p-6 border-b border-blue-400/40 bg-gradient-to-r from-blue-700/40 to-transparent">
          <h1 className="text-3xl font-extrabold text-white drop-shadow-lg flex items-center gap-3">
            <Shield className="w-8 h-8 animate-pulse" />
            AuditDNA
          </h1>
          <p className="text-sm text-blue-100 pt-2 font-medium">
            Audit &amp; Compliance Catalog
          </p>
        </div>

        {/* Search Bar */}
        <div className="p-4">
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white/30 transition-all"
          />
        </div>

        {/* Category Navigation */}
        <ul className="mt-2 space-y-2 px-4 pb-6 overflow-y-auto max-h-[calc(100vh-220px)]">
          {data.map((cat) => (
            <li key={cat.key}>
              <button
                onClick={() => {
                  setActiveCategoryKey(cat.key);
                  setSelectedService(null);
                }}
                className={`flex items-center w-full px-4 py-3 rounded-xl font-bold text-left transition-all transform hover:scale-105 hover:shadow-xl ${
                  cat.key === activeCategoryKey
                    ? 'bg-white text-blue-600 shadow-lg shadow-blue-900/50'
                    : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
                }`}
              >
                <CategoryIcon
                  categoryKey={cat.key}
                  className={`mr-3 w-5 h-5 ${
                    cat.key === activeCategoryKey ? 'text-blue-600' : 'text-blue-100'
                  }`}
                />
                <span className="flex-1">{cat.title}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    cat.key === activeCategoryKey
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-white/20 text-blue-100'
                  }`}
                >
                  {cat.services.length}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeCategory && (
          <div>
            {/* Animated Header with Gradient and Glow */}
            <div className="mb-8 animate-fadeIn">
              <h2 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-transparent bg-clip-text mb-3 drop-shadow-lg">
                {activeCategory.title}
              </h2>
              <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full shadow-lg shadow-blue-500/50"></div>
              <p className="text-slate-600 mt-4 text-lg font-medium">
                {getFilteredServices(activeCategory.services).length} services available
              </p>
            </div>

            {/* Services Grid with Glass-morphism Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredServices(activeCategory.services).map((service) => (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className="group relative bg-white/60 backdrop-blur-lg rounded-2xl border border-white/40 shadow-lg hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
                >
                  {/* Gradient Glow Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative p-6">
                    {/* Service Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                          {service.name}
                        </h3>
                        <span className="text-xs text-blue-600 font-semibold mt-1 inline-block">
                          {service.id}
                        </span>
                      </div>
                      <div className="ml-2 p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all">
                        <CategoryIcon categoryKey={activeCategory.key} className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Service Description */}
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {service.desc}
                    </p>

                    {/* Animated Button */}
                    <button className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl shadow-md hover:shadow-xl hover:shadow-blue-500/50 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                      View Details
                    </button>
                  </div>

                  {/* Glowing Border Effect */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-400/50 transition-all pointer-events-none"></div>
                </div>
              ))}
            </div>

            {/* No Results Message */}
            {getFilteredServices(activeCategory.services).length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-500 text-lg">No services match your search.</p>
              </div>
            )}
          </div>
        )}

        {/* Service Detail Modal with Glass Effect */}
        {selectedService && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
            onClick={() => setSelectedService(null)}
          >
            <div
              className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-2xl w-full relative border border-white/50 transform transition-all animate-scaleIn"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 bg-slate-200/80 backdrop-blur-sm hover:bg-slate-300 rounded-full w-10 h-10 flex items-center justify-center text-slate-700 font-bold transition-all hover:scale-110"
              >
                ✕
              </button>

              {/* Modal Header */}
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-lg mr-4">
                  <CategoryIcon categoryKey={activeCategory?.key} className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 text-transparent bg-clip-text">
                    {selectedService.name}
                  </h3>
                  <p className="text-sm text-blue-600 font-semibold mt-1">
                    {selectedService.id} • {activeCategory?.title}
                  </p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="space-y-4">
                <div className="p-4 bg-blue-50/50 backdrop-blur-sm rounded-xl border border-blue-100">
                  <h4 className="text-sm font-bold text-blue-800 uppercase tracking-wide mb-2">
                    Description
                  </h4>
                  <p className="text-slate-700 leading-relaxed">{selectedService.desc}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                    Start Audit
                  </button>
                  <button className="flex-1 px-6 py-3 bg-white/80 backdrop-blur-sm text-blue-600 font-bold rounded-xl border-2 border-blue-500 hover:bg-blue-50 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
