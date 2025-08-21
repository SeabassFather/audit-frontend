import React,{useState} from "react";
import { useDebounce } from "../../utils/useDebounce";
export default function SearchBox(){
  const [q,setQ]=useState("");
  const d=useDebounce(q,250);
  return(<div className='search'>
    <input placeholder='Search' value={q} onChange={e=>setQ(e.target.value)}/>
    {d && <span className='muted small'>Searching for {d}</span>}
  </div>);
}