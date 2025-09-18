export default function ResultBadge({status="Open"}){
  const s = { Open:"bg-sky-100 text-sky-800", Pending:"bg-amber-100 text-amber-800", Closed:"bg-emerald-100 text-emerald-800" }[status] || "bg-slate-100 text-slate-800";
  return <span className={`px-2 py-0.5 rounded text-xs font-semibold ${s}`}>{status}</span>;
}