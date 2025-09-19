import { useMortgageSearch } from "../hooks/searchHooks";
import LoanMatchForm from "../forms/LoanMatchForm";
import Spinner from "../components/Spinner";

export default function MortgageSearchPage(){
  const {values,setValue,submit,loading,results} = useMortgageSearch();
  return (
    <div className="dna-section">
      <h1 className="text-2xl font-bold">Mortgage Loan Search</h1>
      <div className="grid lg:grid-cols-2 gap-4">
        <LoanMatchForm values={values} setValue={setValue} onSubmit={submit} loading={loading}/>
        <div className="space-y-2">
          <div className="card p-4"><div className="font-semibold">Matches</div>
            {loading && <Spinner/>}
            {!loading && results.length===0 && <div className="text-sm text-slate-500">No results yet. Submit the form.</div>}
            <ul className="mt-2 space-y-2">
              {results.map((r,i)=>(
                <li key={i} className="border rounded p-3">
                  <div className="font-medium">{r.lender} — {r.product} • {r.rate}</div>
                  <div className="text-xs text-slate-600">Fit: {r.fit} · {r.reasons.join(", ")}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}