import React from "react";
export default function Home(){
  return (<div className="page">
    <section className="hero glass">
      <h1>AuditDNA Elite</h1>
      <p>Futuristic, professional platform for <b>Ag Pricing</b>, <b>FX</b>, <b>Mortgage</b>, and <b>Compliance</b>.</p>
      <div className="ctaRow">
        <a className="btn" href="#/programs">Open Ag Programs</a>
        <a className="btn ghost" href="#/services">Compliance</a>
      </div>
    </section>
  </div>);
}