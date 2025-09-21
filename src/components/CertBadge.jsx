export default function CertBadge({label="Cert", valid=true}){
 return <span className={px-2 py-0.5 rounded text-xs font-semibold ${valid?"bg-emerald-100 text-emerald-800":"bg-slate-200 text-slate-700"}}>{label}</span>;
}