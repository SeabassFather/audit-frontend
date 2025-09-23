import React from "react";
export default function Page({ title, subtitle, children }) {
  return (
    <div className="app-container">
      {title && <h1 className="page-title">{title}</h1>}
      {subtitle && <div className="page-sub">{subtitle}</div>}
      {children}
    </div>
  );
}