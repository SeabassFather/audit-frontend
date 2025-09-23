import React, { useEffect, useState } from "react";
import { THEME_PRESETS, applyTheme } from "../theme";

export default function ThemeToggle(){
  const [t, setT] = useState(localStorage.getItem("auditdna_theme") || "fire");
  useEffect(()=>{ applyTheme(t); }, [t]);
  return (
    <div className="theme-toggle">
      <select value={t} onChange={(e)=>setT(e.target.value)}>
        {Object.keys(THEME_PRESETS).map(k=> <option key={k} value={k}>{k.toUpperCase()}</option>)}
      </select>
    </div>
  );
}