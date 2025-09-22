export default function SeverityPill({ level = "Info" }) {
 const map = {
 Info: "bg-slate-200 text-slate-800",
 Low: "bg-green-200 text-green-900",
 Medium: "bg-yellow-200 text-yellow-900",
 High: "bg-red-200 text-red-900"
 };

 return (
 <span className={"px-2 py-0.5 rounded text-xs font-semibold ${map[level]}"}>
 {level}
 </span>
 );
}
