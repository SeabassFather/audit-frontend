import React, { useEffect, useState } from "react";
import { getFxLatest } from "../services/fx";

export default function FXBoard() {
  const [rates, setRates] = useState({});
  const [prev, setPrev] = useState({});
  async function load() {
    try {
      const j = await getFxLatest("USD", "MXN,EUR,JPY,CAD,GBP");
      setPrev(rates);
      setRates(j.rates || {});
    } catch (e) {
      /* keep last */
    }
  }
  useEffect(() => {
    load();
    const id = setInterval(load, 5000);
    return () => clearInterval(id);
  }, []);
  const Row = ({ sym }) => {
    const v = rates[sym];
    const p = prev[sym];
    const chg = p && v ? ((v - p) / p) * 100 : 0;
    return (
      <div className={`tick ${chg >= 0 ? "up" : "dn"}`}>
        <span className="sym">USD/{sym}</span>
        <span className="px">{v?.toFixed(5) ?? ""}</span>
        <span className="chg">
          {chg >= 0 ? "" : ""} {Math.abs(chg).toFixed(3)}%
        </span>
      </div>
    );
  };
  return (
    <div className="page">
      <h2>FX Board</h2>
      <div className="tapes glass">
        <div className="tapeRow">
          {["MXN", "EUR", "JPY", "CAD", "GBP"].map((s) => (
            <Row key={s} sym={s} />
          ))}
        </div>
      </div>
      <p className="mut">
        Live via exchangerate.host proxy at <code>/api/fx/latest</code>.
      </p>
    </div>
  );
}
