import { useState } from 'react';

export default function DemoLiveToggle(){
 const [mode,setMode]=useState('Demo');
 return(
 <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:8}}>
 <span style={{fontSize:13,fontWeight:600}}>{mode} Mode</span>
 <button className='btn' onClick={()=>setMode(mode==='Demo'?'Live':'Demo')}>
 Switch
 </button>
 </div>
 );
}
