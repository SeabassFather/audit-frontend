import React, { useState } from "react";

export default function Factoring(){
  const [amount,setAmount] = useState(0);
  const [advance,setAdvance] = useState(80);
  const [fee,setFee] = useState(2);
  const net = (amount*(advance/100)) - (amount*(fee/100));

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Factoring Calculator</h2>
      <div className="mb-2">
        <label>Invoice Amount: </label>
        <input type="number" value={amount} onChange={e=>setAmount(+e.target.value)} className="border p-1 ml-2"/>
      </div>
      <div className="mb-2">
        <label>Advance %: </label>
        <input type="number" value={advance} onChange={e=>setAdvance(+e.target.value)} className="border p-1 ml-2"/>
      </div>
      <div className="mb-2">
        <label>Fee %: </label>
        <input type="number" value={fee} onChange={e=>setFee(+e.target.value)} className="border p-1 ml-2"/>
      </div>
      <div className="mt-3 p-2 bg-gray-100">
        Net Disbursement: <b>${net.toFixed(2)}</b>
      </div>
    </div>
  );
}