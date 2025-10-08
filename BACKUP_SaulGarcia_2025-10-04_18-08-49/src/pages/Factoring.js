import React,{useState} from 'react';
import Skeleton from '../components/Skeleton';
export default function Factoring(){
  const [loading]=useState(false);
  const deals=[{debtor:'Grower X',lender:'FactorCo',amount:50000,advance:'80%',fee:'2%',status:'Funded'}];
  return(
    <div className='container'>
      <h1>Ag Factoring</h1>
      {loading?<Skeleton height='120px'/>:
      <table className='table'>
        <thead><tr><th>Debtor</th><th>Lender</th><th>Amount</th><th>Advance</th><th>Fee</th><th>Status</th></tr></thead>
        <tbody>{deals.map((d,i)=><tr key={i}><td>{d.debtor}</td><td>{d.lender}</td><td>\</td><td>{d.advance}</td><td>{d.fee}</td><td>{d.status}</td></tr>)}</tbody>
      </table>}
    </div>
  );
}



