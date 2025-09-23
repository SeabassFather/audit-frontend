import React, { useState, useMemo } from "react";
import { fetchNassPriceOverlay } from "../features/usda/nassClient";
import { searchReports, fetchReportSeries } from "../features/usda/mmnClient";
import { Download, Search, Filter } from "lucide-react";

const COMMODITIES = [
  "Papaya", "Oranges", "Oranges Valencia", "Avocado", "Tomato Roma", 
  "Lettuce", "Grapes", "Berries", "Apples", "Bananas", "Potatoes", 
  "Onions", "Carrots", "Broccoli", "Spinach"
];

const REGIONS = [
  "All Regions", "California", "Florida", "Texas", "Arizona", 
  "Washington", "Oregon", "Georgia", "North Carolina", "Mexico"
];

export default function Eco() {
  const [commodity, setCommodity] = useState(COMMODITIES[0]);
  const [region, setRegion] = useState(REGIONS[0]);
  const [source, setSource] = useState("MMN");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Filter rows based on date range
  const filteredRows = useMemo(() => {
    if (!dateRange.from && !dateRange.to) return rows;
    
    return rows.filter(row => {
      const rowDate = new Date(row.date);
      const fromDate = dateRange.from ? new Date(dateRange.from) : null;
      const toDate = dateRange.to ? new Date(dateRange.to) : null;
      
      if (fromDate && rowDate < fromDate) return false;
      if (toDate && rowDate > toDate) return false;
      return true;
    });
  }, [rows, dateRange]);

  // Generate CSV download
  const csvData = useMemo(() => {
    if (!filteredRows.length) return null;
    
    const headers = ["Date", "Commodity", "Region", "Price", "Source"];
    const csvRows = [
      headers.join(","),
      ...filteredRows.map(r => [
        r.date,
        commodity,
        region,
        r.value,
        source
      ].join(","))
    ];
    
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    return URL.createObjectURL(blob);
  }, [filteredRows, commodity, region, source]);

  const excelData = useMemo(() => {
    if (!filteredRows.length) return null;
    
    // Simple tab-separated format for Excel
    const headers = ["Date", "Commodity", "Region", "Price", "Source"];
    const rows = [
      headers.join("\t"),
      ...filteredRows.map(r => [
        r.date,
        commodity,
        region,
        r.value,
        source
      ].join("\t"))
    ];
    
    const content = rows.join("\n");
    const blob = new Blob([content], { type: "application/vnd.ms-excel" });
    return URL.createObjectURL(blob);
  }, [filteredRows, commodity, region, source]);

  async function handleSearch() {
    setLoading(true);
    setError("");
    setRows([]);
    setSearchPerformed(true);

    try {
      const now = new Date();
      const since = new Date();
      since.setFullYear(since.getFullYear() - 5);

      if (source === "NASS") {
        const overlay = await fetchNassPriceOverlay(commodity);
        const flat = [];
        overlay.rows.forEach(r => {
          overlay.years.forEach(y => {
            if (r[y] != null) {
              flat.push({
                date: `Y${y}-W${r.week}`,
                value: r[y],
                region: region === "All Regions" ? "National" : region
              });
            }
          });
        });
        setRows(flat);
      } else {
        const reports = await searchReports({ commodity });
        if (!reports.length) throw new Error(`No MMN reports for ${commodity}`);
        
        const rep = reports[0];
        const json = await fetchReportSeries({
          reportId: rep.slug_id || rep.report_id || rep.id,
          commodity,
          since
        });
        
        const entries = (json.results || json.report || json || []).flatMap(page => {
          const sections = page?.sections || page?.body || [];
          return sections.flatMap(sec => sec?.table || sec?.results || []);
        });
        
        const out = [];
        for (const e of entries) {
          const ds = e.report_date || e.trans_date || e.date || e.published_date;
          const raw = e.avg_price ?? e.price ?? e.fob ?? e.low ?? e.high;
          if (!ds || raw == null) continue;
          
          const val = Number(String(raw).replace(/[^0-9.\-]/g, ""));
          if (!isFinite(val)) continue;
          
          out.push({
            date: ds,
            value: +val.toFixed(2),
            region: region === "All Regions" ? "National" : region
          });
        }
        
        out.sort((a, b) => new Date(a.date) - new Date(b.date));
        setRows(out.slice(-800));
      }
    } catch (ex) {
      setError(ex.message || String(ex));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          USDA Commodities Search Engine
        </h1>

        {/* Search Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Commodity
            </label>
            <select
              value={commodity}
              onChange={(e) => setCommodity(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-emerald-500"
            >
              {COMMODITIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Region
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-emerald-500"
            >
              {REGIONS.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data Source
            </label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-emerald-500"
            >
              <option value="MMN">Market News (MMN)</option>
              <option value="NASS">NASS Statistics</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleSearch}
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search className="w-4 h-4 mr-2" />
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {/* Date Range Filter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Date
            </label>
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Date
            </label>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setDateRange({ from: "", to: "" })}
              className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-4 h-4 mr-1" />
              Clear Filter
            </button>
          </div>
        </div>

        {/* Export Options */}
        {filteredRows.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-6">
            <a
              href={csvData}
              download={`USDA_${commodity}_${region}_${new Date().toISOString().split('T')[0]}.csv`}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Download CSV
            </a>
            <a
              href={excelData}
              download={`USDA_${commodity}_${region}_${new Date().toISOString().split('T')[0]}.xls`}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Excel
            </a>
          </div>
        )}

        {/* Status Messages */}
        {loading && (
          <div className="text-center py-4">
            <div className="text-sm text-gray-600">Loading commodity data...</div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
            <div className="text-sm text-red-700">Error: {error}</div>
          </div>
        )}

        {/* Results Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commodity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Region
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRows.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {commodity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.region || region}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${row.value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {source}
                    </td>
                  </tr>
                ))}
                {filteredRows.length === 0 && searchPerformed && !loading && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                      No results found. Try adjusting your search criteria.
                    </td>
                  </tr>
                )}
                {!searchPerformed && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                      Enter search criteria and click "Search" to view commodity data.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results Summary */}
        {filteredRows.length > 0 && (
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredRows.length} results for {commodity} in {region}
            {dateRange.from || dateRange.to ? (
              <span>
                {" "}filtered by date range
                {dateRange.from && ` from ${dateRange.from}`}
                {dateRange.to && ` to ${dateRange.to}`}
              </span>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}