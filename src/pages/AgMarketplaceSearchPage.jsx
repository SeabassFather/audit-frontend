import { useAgMarketplaceSearch } from "../hooks/searchHooks";
import AgSearchForm from "../forms/AgSearchForm";
import Spinner from "../components/Spinner";
import { RiskBadge, CertBadge } from "../components/RiskCertBadges";
import UploadAndQR from "../components/UploadAndQR";

export default function AgMarketplaceSearchPage(){
  const {values,setValue,submit,loading,results} = useAgMarketplaceSearch();
  return (
    <div className="dna-section">
      <h1 className="text-2xl font-bold">Ag Marketplace Search</h1>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <AgSearchForm values={values} setValue={setValue} onSubmit={submit} loading={loading}/>
        </div>
        <div className="space-y-4">
          <UploadAndQR title="Lab results file" accept=".pdf,.csv,.xlsx"/>
          <div className="card p-4">
            <div className="font-semibold">Results</div>
            {loading && <Spinner/>}
            {!loading && results.length===0 && <div className="text-sm text-slate-500">Submit the form to see growers.</div>}
            <ul className="mt-2 space-y-2">
              {results.map((g,i)=>(
                <li key={i} className="border rounded p-3">
                  <div className="font-medium">{g.grower} — {g.crop} ({g.weekly}/week)</div>
                  <div className="flex items-center gap-2 mt-1">
                    <RiskBadge level={g.risk}/>
                    {g.certs?.map(c=><CertBadge key={c} label={c} valid/>)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}