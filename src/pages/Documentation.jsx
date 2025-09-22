import React, { useState } from "react";

// File organization data with expandable sections
const fileMapData = {
  frontend: {
    title: "Frontend Files",
    icon: "⚛️",
    color: "border-ocean-300 bg-ocean-50",
    sections: [
      {
        name: "Core App",
        icon: "🏗️",
        files: [
          { name: "App.jsx", desc: "Main application router & layout", route: "/src/App.jsx" },
          { name: "main.jsx", desc: "React app entry point", route: "/src/main.jsx" },
          { name: "index.css", desc: "Global styles & Tailwind", route: "/src/index.css" }
        ]
      },
      {
        name: "Components",
        icon: "🧩",
        files: [
          { name: "NavBar.jsx", desc: "Top navigation component", route: "/src/components/NavBar.jsx" },
          { name: "Sidebar.jsx", desc: "Side navigation panel", route: "/src/components/Sidebar.jsx" },
          { name: "Footer.jsx", desc: "Footer component", route: "/src/components/Footer.jsx" }
        ]
      },
      {
        name: "Pages",
        icon: "📄",
        files: [
          { name: "Dashboard.jsx", desc: "Main dashboard view", route: "/src/pages/Dashboard.jsx" },
          { name: "Services.jsx", desc: "Services listing page", route: "/src/pages/Services.jsx" },
          { name: "Admin.jsx", desc: "Admin panel interface", route: "/src/pages/Admin.jsx" },
          { name: "PricingUSDA.jsx", desc: "USDA pricing tools", route: "/src/pages/PricingUSDA.jsx" }
        ]
      },
      {
        name: "Features",
        icon: "⚡",
        files: [
          { name: "SearchUSDA.jsx", desc: "USDA data search engine", route: "/src/features/search/SearchUSDA.jsx" },
          { name: "SearchFactoring.jsx", desc: "Factoring search tools", route: "/src/features/search/SearchFactoring.jsx" },
          { name: "UsdaCommoditySearch.jsx", desc: "Commodity price search", route: "/src/features/usda/UsdaCommoditySearch.jsx" }
        ]
      }
    ]
  },
  backend: {
    title: "Backend Files",
    icon: "🔧",
    color: "border-emerald-300 bg-emerald-50",
    sections: [
      {
        name: "API Endpoints",
        icon: "🔌",
        files: [
          { name: "services.json", desc: "Service definitions", route: "/src/services.json" },
          { name: "servicesData.js", desc: "Service configuration", route: "/src/data/servicesData.js" }
        ]
      },
      {
        name: "Data Models",
        icon: "📊",
        files: [
          { name: "commodities.json", desc: "USDA commodity data", route: "/.localdata/commodities.json" },
          { name: "rules.json", desc: "Business rules engine", route: "/.localdata/rules.json" }
        ]
      },
      {
        name: "Configuration",
        icon: "⚙️",
        files: [
          { name: "vite.config.js", desc: "Vite build configuration", route: "/vite.config.js" },
          { name: "tailwind.config.js", desc: "Tailwind CSS config", route: "/tailwind.config.js" },
          { name: "package.json", desc: "Dependencies & scripts", route: "/package.json" }
        ]
      }
    ]
  },
  documentation: {
    title: "Documentation",
    icon: "📚",
    color: "border-purple-300 bg-purple-50",
    sections: [
      {
        name: "Project Docs",
        icon: "📖",
        files: [
          { name: "README.md", desc: "Project overview & setup", route: "/README.md" },
          { name: "BUILD_MILESTONE.md", desc: "Development milestones", route: "/BUILD_MILESTONE.md" },
          { name: "DOCTOR_LOG.txt", desc: "Debug & troubleshooting", route: "/DOCTOR_LOG.txt" }
        ]
      },
      {
        name: "API Documentation",
        icon: "🔗",
        files: [
          { name: "USDA API Integration", desc: "USDA data source docs", route: "#usda-api" },
          { name: "Search Engine Specs", desc: "Search functionality guide", route: "#search-specs" },
          { name: "Authentication Flow", desc: "User auth documentation", route: "#auth-flow" }
        ]
      },
      {
        name: "Deployment",
        icon: "🚀",
        files: [
          { name: "netlify.toml", desc: "Netlify deployment config", route: "/netlify.toml" },
          { name: ".env Configuration", desc: "Environment variables guide", route: "#env-config" },
          { name: "Build Scripts", desc: "Automated build process", route: "#build-scripts" }
        ]
      }
    ]
  }
};

const FileCard = ({ file, sectionColor }) => (
  <div className={`card p-4 hover:shadow-medium transition-all duration-200 ${sectionColor} border-l-4`}>
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <h4 className="font-semibold text-slate-800 mb-1">{file.name}</h4>
        <p className="text-sm text-slate-600">{file.desc}</p>
      </div>
      <div className="ml-3">
        <button 
          className="text-xs px-2 py-1 bg-white/70 rounded-lg hover:bg-white transition"
          onClick={() => console.log(`Navigate to: ${file.route}`)}
        >
          View
        </button>
      </div>
    </div>
  </div>
);

const FileSection = ({ section, categoryColor, isExpanded, onToggle }) => (
  <div className="mb-6">
    <button 
      onClick={onToggle}
      className="w-full flex items-center justify-between p-3 bg-white rounded-lg shadow-soft hover:shadow-medium transition-all duration-200 border-l-4 border-gray-300"
    >
      <div className="flex items-center gap-3">
        <span className="text-xl">{section.icon}</span>
        <div className="text-left">
          <h3 className="font-semibold text-slate-800">{section.name}</h3>
          <p className="text-xs text-slate-500">{section.files.length} files</p>
        </div>
      </div>
      <span className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
        ▶️
      </span>
    </button>
    
    {isExpanded && (
      <div className="mt-3 space-y-3 ml-4">
        {section.files.map((file, index) => (
          <FileCard key={index} file={file} sectionColor={categoryColor} />
        ))}
      </div>
    )}
  </div>
);

const CategorySection = ({ category, data }) => {
  const [expandedSections, setExpandedSections] = useState(new Set());

  const toggleSection = (sectionName) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionName)) {
      newExpanded.delete(sectionName);
    } else {
      newExpanded.add(sectionName);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <div className="mb-8">
      <div className={`p-6 rounded-xl2 ${data.color} border-2`}>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">{data.icon}</span>
          <div>
            <h2 className="text-xl font-bold text-slate-800">{data.title}</h2>
            <p className="text-sm text-slate-600">{data.sections.length} sections, {data.sections.reduce((acc, s) => acc + s.files.length, 0)} files</p>
          </div>
        </div>

        {data.sections.map((section, index) => (
          <FileSection 
            key={index}
            section={section}
            categoryColor={data.color}
            isExpanded={expandedSections.has(section.name)}
            onToggle={() => toggleSection(section.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default function Documentation() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter files based on search term
  const filteredData = Object.entries(fileMapData).reduce((acc, [key, categoryData]) => {
    if (activeCategory !== "all" && activeCategory !== key) return acc;
    
    const filteredSections = categoryData.sections.map(section => ({
      ...section,
      files: section.files.filter(file => 
        file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.desc.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(section => section.files.length > 0);

    if (filteredSections.length > 0) {
      acc[key] = { ...categoryData, sections: filteredSections };
    }
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-ocean-600 to-ocean-700 text-white rounded-xl2 p-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">📚</span>
          <div>
            <h1 className="text-3xl font-bold">Documentation Center</h1>
            <p className="text-ocean-100">Explore AuditDNA's complete file structure and documentation</p>
          </div>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search files, components, or documentation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-ocean-300"
            />
          </div>
          <div className="flex gap-2">
            {[
              { key: "all", label: "All", icon: "🔍" },
              { key: "frontend", label: "Frontend", icon: "⚛️" },
              { key: "backend", label: "Backend", icon: "🔧" },
              { key: "documentation", label: "Docs", icon: "📚" }
            ].map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                  activeCategory === key 
                    ? 'bg-white text-ocean-700 font-semibold' 
                    : 'bg-ocean-800/50 text-ocean-100 hover:bg-ocean-800/70'
                }`}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        {Object.entries(fileMapData).map(([key, data]) => {
          const totalFiles = data.sections.reduce((acc, s) => acc + s.files.length, 0);
          return (
            <div key={key} className={`card p-4 ${data.color} border-l-4`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{data.icon}</span>
                <div>
                  <h3 className="font-semibold text-slate-800">{data.title}</h3>
                  <p className="text-sm text-slate-600">{totalFiles} files</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* File Categories */}
      <div>
        {Object.keys(filteredData).length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl2 shadow-soft">
            <span className="text-4xl mb-4 block">🔍</span>
            <h3 className="text-lg font-semibold text-slate-600">No files found</h3>
            <p className="text-slate-500">Try adjusting your search terms or filters</p>
          </div>
        ) : (
          Object.entries(filteredData).map(([key, data]) => (
            <CategorySection key={key} category={key} data={data} />
          ))
        )}
      </div>

      {/* Help Section */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl2 p-6 border border-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">💡</span>
          <h3 className="text-lg font-semibold text-slate-800">Quick Navigation Tips</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600">
          <div>
            <h4 className="font-medium text-slate-700 mb-2">🔍 Search Features</h4>
            <ul className="space-y-1">
              <li>• Search by filename or description</li>
              <li>• Use category filters to narrow results</li>
              <li>• Click section headers to expand/collapse</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-slate-700 mb-2">📂 File Organization</h4>
            <ul className="space-y-1">
              <li>• Frontend: React components & pages</li>
              <li>• Backend: APIs, data, and configuration</li>
              <li>• Documentation: Guides and references</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}