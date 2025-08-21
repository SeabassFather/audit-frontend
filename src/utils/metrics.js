export function stats(series){
  if(!series || series.length===0) return { avg:0,min:0,max:0,latest:0,yoy:0 };
  const vals = series.map(s=>s.price);
  const sum = vals.reduce((a,b)=>a+b,0);
  const avg = +(sum/vals.length).toFixed(2);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const latest = series[series.length-1]?.price ?? 0;
  const lastYearIdx = Math.max(0, series.length-13);
  const lastYear = series[lastYearIdx]?.price ?? latest;
  const yoy = +(((latest - lastYear)/ (lastYear||1))*100).toFixed(1);
  return { avg, min, max, latest, yoy };
}