import React from "react";
export default function Select({ children, ...props }){ return <select {...props}>{children}</select>; }