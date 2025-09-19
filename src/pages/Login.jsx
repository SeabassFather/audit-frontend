import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login(){
  const [u,setU]=useState(""); const [p,setP]=useState(""); const nav=useNavigate();
  function submit(e){ e.preventDefault(); if(u&&p){ localStorage.setItem("auth_token","ok"); nav("/admin"); } }
  return (
    <div className="dna-section max-w-md">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={submit} className="card p-4 space-y-3">
        <input className="border rounded p-2 w-full" placeholder="User" value={u} onChange={e=>setU(e.target.value)} />
        <input className="border rounded p-2 w-full" placeholder="Password" type="password" value={p} onChange={e=>setP(e.target.value)} />
        <button className="bg-dnaBlue text-white px-3 py-2 rounded w-full">Sign in</button>
      </form>
    </div>
  );
}