import { useState } from "react";
import { getUSDAData } from "../../lib/api";
import Chart from "../../components/ui/Chart";
import Table from "../../components/ui/Table";

export default function USDAIndex() {
  const [commodity, setCommodity] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!commodity) return;
    setLoading(true);
    const data = await getUSDAData(commodity);
    const normalized = data.map((r, i) => ({
      week: r.week || r.WEEK || `W${i + 1}`,
      price: r.price || r.VALUE || null
    }));
    setResults(normalized);
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">USDA Commodity Pricing</h1>
      <div className="flex gap-4 mb-4">
        <input
          value={commodity}
          onChange={e => setCommodity(e.target.value)}
          placeholder="Enter commodity (e.g., Avocados)"
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {results.length === 0 ? (
        <p>No Data Available</p>
      ) : (
        <>
          <Chart data={results} xKey="week" yKey="price" />
          <div className="mt-6">
            <Table
              headers={["Week", "Price"]}
              rows={results.map(r => [r.week, r.price ? `$${r.price}` : "—"])}
            />
          </div>
        </>
      )}
    </div>
  );
}
