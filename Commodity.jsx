import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUSDAData } from "../../lib/api";
import Chart from "../../components/ui/Chart";
import Table from "../../components/ui/Table";

export default function USDACommodity() {
  const { id } = useParams(); // e.g. "avocados"
  const [results, setResults] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getUSDAData(id);
      const normalized = data.map((r, i) => ({
        week: r.week || r.WEEK || `W${i + 1}`,
        price: r.price || r.VALUE || null
      }));
      setResults(normalized);
    })();
  }, [id]);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">{id} Pricing (USDA)</h1>
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
