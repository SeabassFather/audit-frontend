import { useTradeFinanceSearch } from "../hooks/searchHooks";
import TradeFinanceForm from "../forms/TradeFinanceForm";
import Spinner from "../components/Spinner";

export default function TradeFinanceSearchPage(){
 const {values,setValue,submit,loading,results} = useTradeFinanceSearch();
 return (
 <div className="dna-section">
 <h1 className="text-2xl font-bold">Trade Finance Search</h1>
 <div className="grid lg:grid-cols-2 gap-4">
 <TradeFinanceForm values={values} setValue={setValue} onSubmit={submit} loading={loading}/>
 <div className="card p-4">
 <div className="font-semibold">Matches</div>
 {loading && <Spinner/>}
 {!loading && results.length===0 && <div className="text-sm text-slate-500">Submit the form to view indicative terms.</div>}
 <ul className="mt-2 space-y-2">
 {results.map((m,i)=>(
 <li key={i} className="border rounded p-3">
 <div className="font-medium">{m.product} ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬" advance {m.advance}, tenor {m.tenor}</div>
 <div className="text-xs text-slate-600">{m.note}</div>
 </li>
 ))}
 </ul>
 </div>
 </div>
 </div>
 );
}
