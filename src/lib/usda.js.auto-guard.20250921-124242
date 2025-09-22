// Minimal AMS/NASS wrapper with graceful synthetic fallback for dev
const NASS_API = "https://quickstats.nass.usda.gov/api/api_GET/"; // placeholder; use your own fetch later

export function listCommodities(){
 return ["Papaya","Orange","Lemon","Avocado","Tomato","Bell Pepper","Onion","Corn","Carrot"];
}

export async function fetchWeeklySeries(commodity){
 const weeks = Array.from({length:26},(_,i)=> i+1);
 // Try live (stubbed for now). In dev we immediately fallback to synthetic.
 try {
 // TODO: implement real fetch with import.meta.env.VITE_NASS_KEY
 // const key = import.meta.env.VITE_NASS_KEY;
 // if(key){ /* perform real request(s) and map to {week, price, avg5} */ }
 throw new Error("dev synthetic");
 } catch {
 // Synthetic: smooth curve per commodity name hash + 5yr avg line
 const base = Math.abs(hash(commodity)) % 30 + 20; // 20..49
 const amp = 5 + (Math.abs(hash(commodity+"amp")) % 12); // 5..16
 const avg = base - 2; // simple offset for 5yr average
 return weeks.map(w=>({
 week: W${w},
 price: round(base + Math.sin(w/4)*amp + noise(w, commodity)),
 avg5: round(avg + Math.sin((w+1)/4)*(amp*0.6))
 }));
 }
}

function noise(w, seed){ return ((hash(seed+":"+w)%7)-3); }
function hash(s){ let h=0; for(let i=0;i<s.length;i++){ h=((h<<5)-h)+s.charCodeAt(i); h|=0;} return h; }
function round(n){ return Math.round(n*100)/100; }