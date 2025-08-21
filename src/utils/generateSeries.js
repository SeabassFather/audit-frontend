function seedFrom(str){
  let h = 2166136261;
  for (let i=0;i<str.length;i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return Math.abs(h);
}
function randGen(seed){ let s = seed>>>0; return ()=> (s = Math.imul(s, 1664525) + 1013904223) >>> 0;

}
function round2(n){ return Math.round(n*100)/100; }

export function generateSeries(name, months = 60){
  const seed = seedFrom(name);
  const r = randGen(seed);
  // base price per commodity
  const bases = {
    Papaya: 1.2, Orange: 1.5, Apple: 1.8, Grape: 2.1, Tomato: 1.1,
    Avocado: 2.5, Lemon: 1.6, Lime: 1.4, Mango: 1.9, Banana: 0.9
  };
  const base = bases[name] ?? 1.5;
  const now = new Date(); const arr = [];
  for(let i=months-1;i>=0;i--){
    const d = new Date(now.getFullYear(), now.getMonth()-i, 1);
    const t = (months-1-i)/months;                  // 0..1
    const season = Math.sin((d.getMonth()/11)*2*Math.PI)*0.12;   // -0.12..0.12
    const trend = 0.25 * (t - 0.5);                 // mild up or down
    const noise = ((r()%1000)/1000 - 0.5)*0.08;     // 0.04
    const price = Math.max(0.2, base * (1+season+trend+noise));
    arr.push({ date: d.toISOString().slice(0,7), price: round2(price) });
  }
  return arr;
}