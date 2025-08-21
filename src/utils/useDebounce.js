import { useEffect, useState } from "react";
export function useDebounce(v, d=300){
  const [val,setVal]=useState(v);
  useEffect(()=>{ const t=setTimeout(()=>setVal(v),d); return ()=>clearTimeout(t); },[v,d]);
  return val;
}