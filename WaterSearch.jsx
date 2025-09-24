import { useState } from "react";

export default function WaterSearch() {
  const [filters, setFilters] = useState({
    property: "",
    region: "",
    lab: "",
    certification: "",
  });
  const [results, setResults] = useState([]);

  async function handleSearch() {
    const query = new URLSearchParams(filters);
    const res = await fetch("/api/uploads/search?" + query.toString());
    setResults(await res.json());
  }

  return (
    <div className="p-4 border rounded">
      <h2 className="font-bold mb-2">Search Uploaded Reports</h2>
      <input
        placeholder="Property"
        onChange={(e) => setFilters({ ...filters, property: e.target.value })}
      />
      <input
        placeholder="Region"
        onChange={(e) => setFilters({ ...filters, region: e.target.value })}
      />
      <input
        placeholder="Lab Name"
        onChange={(e) => setFilters({ ...filters, lab: e.target.value })}
      />
      <input
        placeholder="Certification"
        onChange={(e) =>
          setFilters({ ...filters, certification: e.target.value })
        }
      />
      <button
        className="bg-blue-600 text-white px-3 py-2 rounded mt-2"
        onClick={handleSearch}
      >
        Search
      </button>

      <table className="w-full mt-4 border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Property</th>
            <th className="border p-2">Region</th>
            <th className="border p-2">Lab</th>
            <th className="border p-2">Test Date</th>
            <th className="border p-2">Certification</th>
            <th className="border p-2">File</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={i}>
              <td className="border p-2">{r.property}</td>
              <td className="border p-2">{r.region}</td>
              <td className="border p-2">{r.lab}</td>
              <td className="border p-2">{r.testDate}</td>
              <td className="border p-2">{r.certification}</td>
              <td className="border p-2">
                <a
                  className="text-blue-500 underline"
                  href={r.fileUrl}
                  target="_blank"
                >
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
