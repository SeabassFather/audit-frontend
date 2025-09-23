import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null;
  const loc = useLocation();
  if (!token || !(role === "agpro" || role === "admin")) {
    const next = encodeURIComponent(loc.pathname + loc.search);
    return <Navigate to={`/login?next=${next}`} replace />;
  }
  return children;
}
