import React from "react";

export default function Topbar(){
  return (
    <header className="topbar">
      <div className="left">
        <span className="title">Control Panel</span>
      </div>
      <div className="right">
        <span className="pill">Local 3000</span>
      </div>
    </header>
  );
}