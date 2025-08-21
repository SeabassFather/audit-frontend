import React from "react";

export default function Settings(){
  const base = process.env.REACT_APP_USDA_API_BASE || "(not set)";
  const key  = process.env.REACT_APP_USDA_API_KEY ? "(set)" : "(not set)";
  return (
    <div className="p-4">
      <h2 className="h2">Settings</h2>
      <div className="kv"><span>REACT_APP_USDA_API_BASE:</span> <code>{base}</code></div>
      <div className="kv"><span>REACT_APP_USDA_API_KEY:</span> <code>{key}</code></div>
      <p className="subtext">Create a <b>.env</b> file in project root if needed; restart dev server after changes.</p>
    </div>
  );
}