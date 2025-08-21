import React, { createContext, useContext, useState, useCallback } from "react";
const Ctx = createContext({ push: (msg, kind)=>{} });
export function useToast(){ return useContext(Ctx); }
export default function ToastProvider({children}){
  const [items,setItems]=useState([]);
  const push = useCallback((msg, kind="info")=>{
    const id = Date.now() + Math.random();
    setItems(x=>[...x,{id,msg,kind}]);
    setTimeout(()=>setItems(x=>x.filter(i=>i.id!==id)), 3500);
  },[]);
  return (
    <Ctx.Provider value={{push}}>
      {children}
      <div style={{position:"fixed", right:16, bottom:16, display:"grid", gap:8, zIndex:9999}}>
        {items.map(i=>(
          <div key={i.id} className="card" style={{padding:"10px 12px", borderColor:i.kind==="error"?"#fecaca":"#e5e7eb", background:"#fff"}}>
            <div style={{fontSize:13}}>{i.msg}</div>
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}
