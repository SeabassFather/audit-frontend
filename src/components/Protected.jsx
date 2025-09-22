﻿import { Navigate } from "react-router-dom";
export default function Protected({children}){
 const token = localStorage.getItem("auth_token");
 return token ? children : <Navigate to="/login" replace />;
}
