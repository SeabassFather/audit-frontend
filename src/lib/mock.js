export function rng(seed){ let h=0; for(const ch of seed){ h=((h<<5)-h)+ch.charCodeAt(0); h|=0 } return ()=> (h = (h*48271) % 0x7fffffff)/0x7fffffff; }
export function pick(arr, r){ return arr[Math.floor(r()*arr.length)] }
export function mkLoans(n, seed="loans"){
 const r = rng(seed), states=["CA","TX","AZ","NV","FL","WA"], prods=["DSCR","SBA","Conventional","HELOC"];
 return Array.from({length:n},(_,i)=>({
 id: "L"+(1000+i),
 state: pick(states,r),
 product: pick(prods,r),
 fico: 620 + Math.floor(r()*180),
 ltv: 50 + Math.floor(r()*45),
 dti: 10 + Math.floor(r()*40),
 rate: (5 + r()*6).toFixed(2)+"%"
 }));
}
export function mkListings(n, seed="listings"){
 const r = rng(seed), items=["Papaya","Orange","Avocado","Tomato","Onion","Corn","Carrot","Bell Pepper"];
 return Array.from({length:n},(_,i)=>({
 id: "S"+(2000+i), commodity: pick(items,r), grade: pick(["A","B","C"],r),
 qty: 100 + Math.floor(r()*900), price: (12 + r()*20).toFixed(2),
 origin: pick(["BC","SON","SIN","JAL","MICH"],r), status: pick(["Available","Pending","Sold"],r)
 }));
}
