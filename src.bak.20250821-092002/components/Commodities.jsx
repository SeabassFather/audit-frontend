import React, { useMemo, useRef, useState } from "react";
export const SERIES = {
  Tomatoes: [
    18, 19, 19, 20, 19, 20, 21, 20, 19, 18, 17, 16, 17, 18, 19, 20, 19, 18, 18,
    19, 20, 21, 22, 21, 22, 23,
  ],
  Avocado: [
    25, 24, 24, 23, 23, 22, 22, 21, 21, 20, 19, 18, 18, 18, 18, 19, 20, 21, 21,
    22, 23, 23, 24, 25, 26, 27,
  ],
  Strawberries: [
    14, 14, 15, 15, 14, 14, 13, 13, 12, 12, 12, 12, 13, 13, 14, 14, 15, 15, 15,
    16, 16, 17, 17, 18, 18, 19,
  ],
  Pineapple: [
    7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 10, 10,
    10,
  ],
  Papaya: [
    9, 9, 9, 8, 8, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9,
    9,
  ],
  "Roma Tomato": [
    13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 15, 16, 16, 16, 16,
    16, 17, 17, 17, 17, 18, 18,
  ],
  Apples: [
    12, 12, 12, 13, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 17, 18, 18, 18, 19,
    19, 19, 20, 20, 21, 21, 22,
  ],
  Lettuce: [
    8, 8, 8, 8, 8, 9, 9, 9, 10, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 13,
    13, 13, 14, 14, 14,
  ],
  Blueberries: [
    20, 21, 22, 22, 21, 21, 20, 19, 18, 17, 17, 16, 16, 17, 17, 18, 18, 19, 19,
    20, 20, 21, 21, 22, 23, 24,
  ],
  Corn: [
    5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 10, 10,
    10,
  ],
  Beef: [
    40, 40, 39, 39, 41, 41, 42, 42, 43, 43, 42, 42, 41, 41, 40, 40, 41, 41, 42,
    42, 43, 43, 44, 44, 45, 45,
  ],
};
const COLORS = [
  "#4f9dff",
  "#62d48a",
  "#f57aa9",
  "#ffb24d",
  "#ffe066",
  "#b38cff",
  "#5ad2e6",
  "#b7e07c",
  "#ff6f91",
  "#a0776b",
  "#ff7d4f",
  "#d7e66f",
  "#90caf9",
  "#ffd08a",
  "#d7b7f4",
];
function Chart({ selected }) {
  const names = Object.keys(selected).filter((k) => selected[k]);
  const list = names.map((n) => SERIES[n]).filter(Boolean);
  const w = 1180,
    h = 520,
    p = 64,
    weeks = 26;
  const flat = list.flat();
  const max = flat.length ? Math.max(...flat) : 1;
  const min = flat.length ? Math.min(...flat) : 0;
  const stepX = (w - p * 2) / (weeks - 1);
  const sy = (v) => h - p - ((v - min) / (max - min || 1)) * (h - p * 2);
  const ref = useRef(null);
  const [tip, setTip] = useState(null);
  return (
    <div className="chartWrap" ref={ref}>
      <svg viewBox={`0 0 ${w} ${h}`} className="bigChart">
        <g stroke="#273040">
          {Array.from({ length: 6 }, (_, i) => (
            <line
              key={i}
              x1={p}
              x2={w - p}
              y1={p + i * ((h - p * 2) / 5)}
              y2={p + i * ((h - p * 2) / 5)}
            />
          ))}
        </g>
        {names.map((name, i) => {
          const s = SERIES[name];
          const d = s
            .map((v, idx) => `${idx ? "L" : "M"} ${p + idx * stepX} ${sy(v)}`)
            .join(" ");
          return (
            <g key={name}>
              <path
                d={d}
                stroke={COLORS[i % COLORS.length]}
                strokeWidth="3"
                fill="none"
              />
              {s.map((v, idx) => (
                <circle
                  key={idx}
                  cx={p + idx * stepX}
                  cy={sy(v)}
                  r="5"
                  fill={COLORS[i % COLORS.length]}
                  onMouseEnter={(e) => {
                    const r = ref.current.getBoundingClientRect();
                    setTip({
                      left: e.clientX - r.left + 10,
                      top: e.clientY - r.top - 34,
                      text: `${name}  W${idx + 1}: $${v}`,
                    });
                  }}
                  onMouseLeave={() => setTip(null)}
                />
              ))}
            </g>
          );
        })}
        <text x={w / 2} y={32} textAnchor="middle" className="chartTitle">
          Elite Multi-Commodity Pricing (USDA Demo)
        </text>
        <text x={w / 2} y={h - 18} textAnchor="middle" className="axisLabel">
          Weeks (W1W26)
        </text>
        <text
          x="26"
          y={h / 2}
          transform={`rotate(-90 26 ${h / 2})`}
          textAnchor="middle"
          className="axisLabel"
        >
          USD per unit
        </text>
      </svg>
      {tip && (
        <div className="tooltip" style={{ left: tip.left, top: tip.top }}>
          {tip.text}
        </div>
      )}
    </div>
  );
}
export default function CommoditiesExplorer() {
  const all = useMemo(() => Object.keys(SERIES).sort(), []);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(() => {
    const s = localStorage.getItem("adna:selected");
    if (s) return JSON.parse(s);
    const i = {};
    [
      "Tomatoes",
      "Avocado",
      "Strawberries",
      "Pineapple",
      "Papaya",
      "Roma Tomato",
    ].forEach((n) => (i[n] = true));
    return i;
  });
  const save = (next) => {
    setSel(next);
    localStorage.setItem("adna:selected", JSON.stringify(next));
  };
  const toggle = (n) => save({ ...sel, [n]: !sel[n] });
  const addAll = () => {
    const x = {};
    all.forEach((n) => (x[n] = true));
    save(x);
  };
  const clear = () => save({});
  const shown = all.filter((n) => n.toLowerCase().includes(q.toLowerCase()));
  return (
    <section className="panel">
      <div className="panelHead">
        <h2>Elite Multi-Commodity Pricing (USDA)</h2>
      </div>
      <div className="searchBar">
        <div className="searchRow">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search commodity"
          />
          <div className="searchActions">
            <button onClick={addAll}>Add All</button>
            <button onClick={clear} className="ghost">
              Clear
            </button>
          </div>
        </div>
        <div className="results">
          {shown.map((n) => (
            <button
              key={n}
              onClick={() => toggle(n)}
              className={sel[n] ? "on" : ""}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
      <Chart selected={sel} />
      <p className="mut">
        Filter & click chips to add/remove series. Hover points for values.
        (Demo data until your USDA endpoint is wired.)
      </p>
    </section>
  );
}
