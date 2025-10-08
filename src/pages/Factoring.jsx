export default function Factoring(){
  const invoices = [
    { debtor: "Farm Co.", lender: "AgriBank", amount: 50000, advance: "80%", fee: "3%", status: "Pending" },
    { debtor: "Produce LLC", lender: "FinanceCorp", amount: 75000, advance: "85%", fee: "2.5%", status: "Approved" }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ag Factoring</h1>
      <table className="w-full border-collapse bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Debtor</th>
            <th className="p-2 text-left">Lender</th>
            <th className="p-2 text-left">Amount</th>
            <th className="p-2 text-left">Advance</th>
            <th className="p-2 text-left">Fee</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv,i)=>(
            <tr key={i} className="border-t">
              <td className="p-2">{inv.debtor}</td>
              <td className="p-2">{inv.lender}</td>
              <td className="p-2">${inv.amount.toLocaleString()}</td>
              <td className="p-2">{inv.advance}</td>
              <td className="p-2">{inv.fee}</td>
              <td className="p-2">{inv.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


