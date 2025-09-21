export default function ResultBadge({ status = "OK" }) {
 const colors = {
 OK: "bg-green-100 text-green-700",
 WARN: "bg-yellow-100 text-yellow-700",
 FAIL: "bg-red-100 text-red-700"
 };

 return (
 <span className={"px-2 py-0.5 rounded text-xs font-semibold ${colors[status]}"}>
 {status}
 </span>
 );
}
