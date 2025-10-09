import React, { useState } from "react";
import { Search, ExternalLink, CheckCircle, Globe } from "lucide-react";

const searchEngines = [
  {
    id: "E-1001",
    name: "Google",
    type: "General",
    country: "Global",
    url: "https://www.google.com",
    status: "Active",
    lastChecked: "2025-09-06",
  },
  {
    id: "E-1002",
    name: "Bing",
    type: "General",
    country: "Global",
    url: "https://www.bing.com",
    status: "Active",
    lastChecked: "2025-09-06",
  },
  {
    id: "E-1003",
    name: "DuckDuckGo",
    type: "Privacy",
    country: "Global",
    url: "https://duckduckgo.com",
    status: "Active",
    lastChecked: "2025-09-06",
  },
  {
    id: "E-1004",
    name: "Yahoo",
    type: "General",
    country: "Global",
    url: "https://search.yahoo.com",
    status: "Active",
    lastChecked: "2025-09-05",
  },
  {
    id: "E-1005",
    name: "Yandex",
    type: "General",
    country: "Russia, Global",
    url: "https://yandex.com",
    status: "Active",
    lastChecked: "2025-09-05",
  },
  {
    id: "E-1006",
    name: "Baidu",
    type: "General",
    country: "China",
    url: "https://www.baidu.com",
    status: "Active",
    lastChecked: "2025-09-04",
  },
  {
    id: "E-1007",
    name: "USDA Market News",
    type: "Agriculture",
    country: "USA",
    url: "https://www.ams.usda.gov/market-news",
    status: "Active",
    lastChecked: "2025-09-04",
  },
  {
    id: "E-1008",
    name: "AgWeb",
    type: "Agriculture News",
    country: "USA",
    url: "https://www.agweb.com/markets",
    status: "Active",
    lastChecked: "2025-09-02",
  },
  {
    id: "E-1009",
    name: "Commodity Markets Council",
    type: "Commodity",
    country: "USA",
    url: "https://www.commoditymarketscouncil.org/",
    status: "Active",
    lastChecked: "2025-09-01",
  },
  {
    id: "E-1010",
    name: "AgFunderNews",
    type: "AgTech News",
    country: "Global",
    url: "https://agfundernews.com/",
    status: "Active",
    lastChecked: "2025-09-01",
  },
  {
    id: "E-1011",
    name: "Startpage",
    type: "Privacy",
    country: "Global",
    url: "https://www.startpage.com",
    status: "Active",
    lastChecked: "2025-09-06",
  },
  {
    id: "E-1012",
    name: "Ecosia",
    type: "Eco-conscious",
    country: "Global",
    url: "https://www.ecosia.org",
    status: "Active",
    lastChecked: "2025-09-03",
  },
];

export default function SearchEnginesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");

  const types = ["All", ...new Set(searchEngines.map(e => e.type))];
  
  const filteredEngines = searchEngines.filter(engine => {
    const matchesSearch = engine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         engine.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         engine.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "All" || engine.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 mb-6 shadow-xl shadow-blue-500/50">
            <Search className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
            USDA 100+ Search Engines & Analytics
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Comprehensive search engine directory for agriculture, commodities, market news, and global data sources
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-blue-100 shadow-xl mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search engines by name, type, or country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {types.map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterType === type
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50"
                      : "bg-white/80 text-slate-600 hover:bg-blue-100"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-lg text-slate-700 font-medium">
            Found <span className="text-blue-600 font-bold">{filteredEngines.length}</span> search engines
          </p>
        </div>

        {/* Search Engines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEngines.map((engine) => (
            <div
              key={engine.id}
              className="group bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-blue-100 shadow-lg hover:shadow-2xl transition-all hover:scale-105"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-800 mb-1">{engine.name}</h3>
                  <p className="text-sm text-slate-500">{engine.id}</p>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-xs font-medium">{engine.status}</span>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg font-medium">
                    {engine.type}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Globe className="w-4 h-4" />
                  <span>{engine.country}</span>
                </div>
                <div className="text-xs text-slate-500">
                  Last checked: {engine.lastChecked}
                </div>
              </div>

              <a
                href={engine.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-800 transition-all group-hover:shadow-lg group-hover:shadow-blue-500/50"
              >
                <span>Visit Engine</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {filteredEngines.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No search engines found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
