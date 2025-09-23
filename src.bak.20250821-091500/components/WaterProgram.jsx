import React from "react";
export default function WaterProgram() {
  return (
    <div className="page">
      <h2>Water Program</h2>
      <div className="grid2">
        <div className="card glass">
          <h3>Program Overview</h3>
          <p className="mut">
            Water rights due diligence, conservation incentives, and financing
            packages. Upload property docs and we will return an underwriting
            view.
          </p>
          <a className="btn">Get Started</a>
        </div>
        <div className="card glass">
          <h3>Request Form</h3>
          <div className="grid2 s">
            <input placeholder="Owner / Entity" />
            <input placeholder="County / State" />
            <input placeholder="Acreage" />
            <input placeholder="Water Source / Right" />
            <input placeholder="Email" />
            <input placeholder="Phone" />
          </div>
          <div className="inline">
            <input type="file" />
            <button className="btn">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
