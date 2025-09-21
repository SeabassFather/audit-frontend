import { createContext, useContext, useState, useMemo } from "react";
const IntakeCtx = createContext(null);
export function IntakeProvider({ children }){
 const [sheet, setSheet] = useState({ open:false, svc:null });
 const api = useMemo(()=>({ sheet, setSheet }), [sheet]);
 return <IntakeCtx.Provider value={api}>{children}</IntakeCtx.Provider>;
}
export function useIntake(){ const c = useContext(IntakeCtx); if(!c) throw new Error("useIntake must be used within <IntakeProvider>"); return c; }