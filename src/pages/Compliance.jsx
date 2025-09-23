import { useState } from "react";
export default function Compliance() {
  const [notes, setNotes] = useState("");
  return (
    <div className="grid grid-2">
      <section className="card">
        <div className="h1">Compliance & Ethics</div>
        <p className="subtle">
          Upload certifications, lab reports, GlobalGAP, water/soil tests,
          privacy & terms, etc.
        </p>
        <div className="controls">
          <div>
            <div className="subtle">Upload</div>
            <input type="file" />
          </div>
          <div>
            <div className="subtle">Category</div>
            <select>
              <option>USDA</option>
              <option>GlobalGAP</option>
              <option>Water/Sanitation</option>
              <option>Privacy/Terms</option>
            </select>
          </div>
          <button className="tab">Save</button>
        </div>
        <div className="mt-4">
          <div className="h3">Notes</div>
          <textarea
            rows="6"
            style={{ width: "100%" }}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add context, links, or action items"
          />
        </div>
      </section>
      <section className="card">
        <div className="h2">Regulatory Briefing Kits</div>
        <ul>
          <li>
            <a className="tab" href="#">
              Internationalized Privacy Policy
            </a>
          </li>
          <li>
            <a className="tab" href="#">
              Terms of Service
            </a>
          </li>
          <li>
            <a className="tab" href="#">
              USDA/AMS Pricing Kit
            </a>
          </li>
          <li>
            <a className="tab" href="#">
              Global Compliance & Ethics Dashboard
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
