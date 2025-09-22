const deals = [
 {debtor:"Grower A", amount:200000, advance:"80%", fee:"2.0%", status:"Active"},
 {debtor:"Grower B", amount:150000, advance:"75%", fee:"2.5%", status:"Pending"},
 {debtor:"Grower C", amount: 50000, advance:"70%", fee:"3.0%", status:"Closed"}
];
export default function Factoring(){
 return (
 <div>
 <h1 className="text-2xl font-bold mb-4">Produce Factoring</h1>
 <table className="table-auto border-collapse w-full card">
 <thead className="bg-dnaBlue text-white">
 <tr><th className="p-2 border">Debtor</th><th className="p-2 border">Amount</th><th className="p-2 border">Advance</th><th className="p-2 border">Fee</th><th className="p-2 border">Status</th></tr>
 </thead>
 <tbody>
 {deals.map((d,i)=>(
 <tr key={i} className="odd:bg-slate-50">
 <td className="p-2 border">{d.debtor}</td>
 <td className="p-2 border">${d.amount.toLocaleString()}</td>
 <td className="p-2 border">{d.advance}</td>
 <td className="p-2 border">{d.fee}</td>
 <td className="p-2 border">{d.status}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 );
}