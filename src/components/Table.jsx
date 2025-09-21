export default function Table({columns, rows}) {
 return (
 <div className="overflow-auto border border-silver-200 rounded-xl2">
 <table className="min-w-full text-sm">
 <thead className="bg-silver-100">
 <tr>
 {columns.map(c=> <th key={c.key} className="text-left px-3 py-2 font-semibold">{c.title}</th>)}
 </tr>
 </thead>
 <tbody>
 {rows.map((r,i)=> (
 <tr key={i} className="odd:bg-white even:bg-silver-50">
 {columns.map(c=> <td key={c.key} className="px-3 py-2 whitespace-nowrap">{c.render? c.render(r[c.key], r): r[c.key]}</td>)}
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 );
}