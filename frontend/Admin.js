import React,{useState} from 'react';
const frameworks=[{name:'GDPR',status:' Compliant',details:['Right to be Forgotten','Cross-Border Transfers']},{name:'CCPA',status:' Pending',details:['Do Not Sell Links','Opt-Outs']}];
export default function Admin(){
  const [open,setOpen]=useState(null);
  return(
    <div className='container'>
      <h1>Global Compliance Dashboard</h1>
      {frameworks.map((fw,i)=>(
        <div key={i} className='accordion-card'>
          <div className='accordion-header' onClick={()=>setOpen(open===i?null:i)}>
            <div className='accordion-title'><span className={'chev '+(open===i?'open':'')}></span>{fw.name}</div>
            <span>{fw.status}</span>
          </div>
          {open===i && <div className='accordion-body'><ul>{fw.details.map((d,j)=><li key={j}>{d}</li>)}</ul></div>}
        </div>
      ))}
    </div>
  );
}
