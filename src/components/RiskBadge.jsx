export default function RiskBadge({level="Medium"}){
 const map={Low:"bg-green-100 text-green-800",Medium:"bg-yellow-100 text-yellow-800",High:"bg-red-100 text-red-800"};
 return <span className={`px-2 py-0.5 rounded text-xs font-semibold ${map[level]||"bg-slate-100 text-slate-800"}`}>{level}</span>;
}
