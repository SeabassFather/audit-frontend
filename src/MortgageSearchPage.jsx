import { useEffect, useState } from "react";

export default function MortgageSearchPage() {
  const [lenders, setLenders] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    async function fetchLenders() {
      try {
        const resp = await fetch("/api/lenders");
        const json = await resp.json();
        setLenders(json);
      } catch (err) {
        console.error(err);
      }
    }
    fetchLenders();
  }, []);

  const results = lenders.filter(l => l.name?.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mortgage Lender Search</h1>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search lenders..." className="p-2 mb-4 w-64" />
      <ul>
        {results.map(l => (
          <li key={l.id} className="mb-3 p-3 bg-slate-700 rounded">
            <div className="font-semibold">{l.name}</div>
            <div className="text-sm text-slate-300">{l.state} • {l.rate}%</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
