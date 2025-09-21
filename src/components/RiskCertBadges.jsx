export function RiskBadge({level="Low", reason=""}){
 const map={Low:"bg-green-100 text-green-800",Medium:"bg-amber-100 text-amber-800",High:"bg-red-100 text-red-800"};
 return <span className={badge ${map[level]||"bg-slate-100 text-slate-700"}}>Risk: {level}{reason? ÃƒÆ"Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ${reason}:""}</span>;
}
export function CertBadge({label, valid=true}){
 return <span className={badge ${valid?"bg-green-100 text-green-800":"bg-slate-100 text-slate-700"}}>{label}{valid?" ÃƒÆ"Ã‚Â¢Ãƒâ€¦"ÃƒÂ¢Ã¢â€šÂ¬Ã…"":" ÃƒÆ"Ã‚Â¢Ãƒâ€¦"ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢"}</span>;
}