import React, { useState } from "react";
import axios from "axios";

export default function USDAPricing(){
 const [commodity,setCommodity] = useState("");
 const [data,setData] = useState(null);

 async function search(){
 try {
 const res = await axios.get("/api/usda?commodity=${commodity}");
 setData(res.data);
 } catch(err){
 setData({error:"Failed to fetch USDA data"});
 }
 }

 return (
 <div className="p-4">
 <h2 className="text-xl font-bold mb-2">USDA Pricing Search</h2>
 <input value={commodity} onChange={e=>setCommodity(e.target.value)} placeholder="Commodity..." className="border p-2 mr-2"/>
 <button onClick={search} className="bg-blue-600 text-white px-3 py-1 rounded">Search</button>
 {data && <pre className="mt-3 bg-gray-100 p-2">{JSON.stringify(data,null,2)}</pre>}
 </div>
 );
}
