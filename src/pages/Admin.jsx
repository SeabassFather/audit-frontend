import React, { useState } from "react";

export default function USDAAgLogin({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = e => {
    e.preventDefault();
    // Demo: hardcoded credentials; replace with real auth
    if (user === "usda_user" && pass === "usda_pass") {
      setError("");
      onLogin();
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleLogin} style={{maxWidth:350,margin:"2rem auto"}}>
      <h2>USDA-AG Factoring-WaterTechnology Login</h2>
      <input className="input" placeholder="Username" value={user} onChange={e=>setUser(e.target.value)} /><br />
      <input className="input" placeholder="Password" type="password" value={pass} onChange={e=>setPass(e.target.value)} /><br />
      <button type="submit">Login</button>
      {error && <div style={{color:"red"}}>{error}</div>}
    </form>
  );
}