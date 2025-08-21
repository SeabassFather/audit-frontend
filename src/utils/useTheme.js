import { useEffect, useState } from "react";
export function useTheme(){
  const [theme,setTheme] = useState(()=> localStorage.getItem("theme") || "dark");
  useEffect(()=>{ document.documentElement.dataset.theme = theme; localStorage.setItem("theme", theme); },[theme]);
  return { theme, toggle:()=> setTheme(t=> t==="dark"?"light":"dark") };
}