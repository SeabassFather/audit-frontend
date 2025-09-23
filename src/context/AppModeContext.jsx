import React, {createContext, useContext, useEffect, useState} from "react";
const Ctx = createContext();
export function AppModeProvider({children}) {
  const [mode, setMode] = useState(()=> localStorage.getItem("adna.mode") || "demo");
  useEffect(()=>{ localStorage.setItem("adna.mode", mode); },[mode]);
  return <Ctx.Provider value={{mode, setMode}}>{children}</Ctx.Provider>;
}
export function useAppMode(){ return useContext(Ctx); }