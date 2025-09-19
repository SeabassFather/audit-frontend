import { createContext, useContext, useState } from "react";

const IntakeCtx = createContext(null);

export function IntakeProvider({ children }) {
  const [uploads, setUploads] = useState([]);
  const addUpload = (u) => setUploads((x) => [...x, u]);
  const value = { uploads, addUpload };
  return <IntakeCtx.Provider value={value}>{children}</IntakeCtx.Provider>;
}

export function useIntake() {
  const ctx = useContext(IntakeCtx);
  if (!ctx) throw new Error("useIntake must be used within <IntakeProvider>");
  return ctx;
}