import React, { useMemo, useState } from "react";

// Demo inventory; replace with your DB
const DEMO = [
  {
    id: 1,
    item: "Tomatoes",
    origin: "MX",
    grade: "Roma 25lb",
    price: 16.25,
    qty: "1+ pallets",
    seller: "Verde Farms",
    verified: true,
  },
  {
    id: 2,
    item: "Avocado",
    origin: "MX",
    grade: "48ct",
    price: 27.5,
    qty: "2+ pallets",
    seller: "Sierra Produce",
    verified: true,
  },
  {
    id: 3,
    item: "Strawberries",
    origin: "USA-CA",
    grade: "8/1lb clamshell",
    price: 18.9,
    qty: "1+ pallets",
    seller: "BerryCo",
    verified: false,
  },
  {
    id: 4,
    item: "Pineapple",
    origin: "CR",
    grade: "MD2 8ct",
    price: 13.4,
    qty: "2+ pallets",
    seller: "Pacifica",
    verified: true,
  },
];

export default function AgMarketplace() {
  const [q, setQ] = useState("");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(999);
  const list = useMemo(
    () =>
      DEMO.filter(
        (r) =>
          r.item.toLowerCase().includes(q.toLowerCase()) &&
          r.price >= min &&
          r.price <= max,
      ),
    [q, min, max],
  );

  return (
    <div className="page">
      <h2>Ag Marketplace</h2>
      <div className="searchBar glass">
        <div className="searchRow">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search inventory (e.g., Tomatoes, Avocado)"
          />
          <div className="searchActions">
            <input
              type="number"
              value={min}
              onChange={(e) => setMin(+e.target.value || 0)}
              placeholder="Min $"
            />
            <input
              type="number"
              value={max}
              onChange={(e) => setMax(+e.target.value || 0)}
              placeholder="Max $"
            />
          </div>
        </div>
      </div>

      <div className="cards">
        {list.map((r) => (
          <div key={r.id} className="card product glass">
            <div className="tagRow">
              <span className="tag">{r.origin}</span>
              {r.verified && <span className="tag good">PACA </span>}
            </div>
            <h3>{r.item}</h3>
            <div className="mut">{r.grade}</div>
            <div className="price">
              ${r.price.toFixed(2)} <span className="mut">/ unit</span>
            </div>
            <div className="mut">MOQ: {r.qty}</div>
            <div className="mut">Seller: {r.seller}</div>
            <div className="cardActions">
              <a className="btn">Request Quote</a>
              <a className="btn ghost">Open Listing</a>
            </div>
          </div>
        ))}
      </div>
      <p className="mut">
        Listings are demo-only here. Hook to your DB/API for real-time inventory
        and secure offers.
      </p>
    </div>
  );
}
