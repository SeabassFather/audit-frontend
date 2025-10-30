import React, { useMemo, useState } from "react";
import { useI18n } from "../i18n/useI18n";

const buyersSeed = [
<<<<<<< HEAD
  {
    id: "B201",
    name: "GreenLine Imports",
    need: "Papaya 1 load/week",
    terms: "Net 21",
  },
  {
    id: "B202",
    name: "CitrusCo USA",
    need: "Oranges 2 loads/week",
    terms: "Net 30",
  },
  {
    id: "B203",
    name: "Roma Retailers",
    need: "Tomato Roma 1 load/week",
    terms: "Net 14",
  },
];

const sellersSeed = [
  {
    id: "S101",
    name: "Rancho Maya MX",
    offer: "Papaya 40k lb/week",
    certs: "GlobalG.A.P.",
    location: "Colima, MX",
  },
  {
    id: "S102",
    name: "Sonora Citrus",
    offer: "Navel Oranges 2 loads/week",
    certs: "PRIMUSGFS",
    location: "Sonora, MX",
  },
  {
    id: "S103",
    name: "Agri Norte",
    offer: "Tomato Roma 1 load/week",
    certs: "HACCP",
    location: "Sinaloa, MX",
  },
=======
  { id: "B201", name: "GreenLine Imports", need: "Papaya 1 load/week", terms: "Net 21" },
  { id: "B202", name: "CitrusCo USA", need: "Oranges 2 loads/week", terms: "Net 30" },
  { id: "B203", name: "Roma Retailers", need: "Tomato Roma 1 load/week", terms: "Net 14" },
];
const sellersSeed = [
  { id: "S101", name: "Rancho Maya MX", offer: "Papaya 40k lb/week", certs: "GlobalG.A.P.", location: "Colima, MX" },
  { id: "S102", name: "Sonora Citrus", offer: "Navel Oranges 2 loads/week", certs: "PRIMUSGFS", location: "Sonora, MX" },
  { id: "S103", name: "Agri Norte", offer: "Tomato Roma 1 load/week", certs: "HACCP", location: "Sinaloa, MX" },
>>>>>>> my/push-branch
];

function Card({ title, lines, selected, onSelect }) {
  return (
<<<<<<< HEAD
    <div
      onClick={onSelect}
      className={
        "p-4 rounded-xl border hover:bg-gray-50 cursor-pointer " +
        (selected ? "ring-2 ring-black" : "")
      }
    >
=======
    <div onClick={onSelect} className={"p-4 rounded-xl border hover:bg-gray-50 cursor-pointer " + (selected ? "ring-2 ring-black" : "")}>
>>>>>>> my/push-branch
      <div className="font-semibold mb-1">{title}</div>
      <ul className="text-sm text-gray-600 space-y-0.5">
        {lines.map((l, i) => (
          <li key={i}>{l}</li>
        ))}
      </ul>
    </div>
  );
}

export default function AgMarketplace() {
  const { t } = useI18n();
  const [buyer, setBuyer] = useState(null);
  const [seller, setSeller] = useState(null);

  const compare = useMemo(() => {
    if (!buyer || !seller) return null;
    const b = buyer.need.toLowerCase();
    const s = seller.offer.toLowerCase();

    let score = 50;
    ["papaya", "orange", "tomato"].forEach((k) => {
      if (b.includes(k) && s.includes(k)) score += 25;
    });
    score = Math.min(100, score);
    const match = score >= 85 ? "High" : score >= 65 ? "Medium" : "Low";
    return {
      match,
      score,
      notes: "Placeholder scoring. Replace with real matcher later.",
    };
  }, [buyer, seller]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("marketplace")}</h1>
      </div>
<<<<<<< HEAD

=======
>>>>>>> my/push-branch
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="text-sm font-semibold">{t("buyer")}</div>
          {buyersSeed.map((b) => (
<<<<<<< HEAD
            <Card
              key={b.id}
              onSelect={() => setBuyer(b)}
              selected={buyer?.id === b.id}
              title={b.name}
              lines={[`Need: ${b.need}`, `Terms: ${b.terms ?? ""}`]}
            />
          ))}
        </div>

        <div className="space-y-2">
          <div className="text-sm font-semibold">{t("seller")}</div>
          {sellersSeed.map((s) => (
            <Card
              key={s.id}
              onSelect={() => setSeller(s)}
              selected={seller?.id === s.id}
              title={s.name}
              lines={[`Offer: ${s.offer}`, `Certs: ${s.certs ?? ""}`]}
            />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-4">
        <div className="text-sm font-semibold mb-2">{t("compare")}</div>
        {!compare && (
          <div className="text-gray-500 text-sm">{t("selectBuyerSeller")}</div>
        )}
=======
            <Card key={b.id} onSelect={() => setBuyer(b)} selected={buyer?.id === b.id} title={b.name} lines={[`Need: ${b.need}`, `Terms: ${b.terms ?? ""}`]} />
          ))}
        </div>
        <div className="space-y-2">
          <div className="text-sm font-semibold">{t("seller")}</div>
          {sellersSeed.map((s) => (
            <Card key={s.id} onSelect={() => setSeller(s)} selected={seller?.id === s.id} title={s.name} lines={[`Offer: ${s.offer}`, `Certs: ${s.certs ?? ""}`]} />
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 p-4">
        <div className="text-sm font-semibold mb-2">{t("compare")}</div>
        {!compare && <div className="text-gray-500 text-sm">{t("selectBuyerSeller")}</div>}
>>>>>>> my/push-branch
        {compare && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-gray-50 border">
              <div className="text-xs text-gray-500">Buyer</div>
              <div className="font-semibold">{buyer.name}</div>
              <div className="text-sm text-gray-600">{buyer.need}</div>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 border">
              <div className="text-xs text-gray-500">Seller</div>
              <div className="font-semibold">{seller.name}</div>
              <div className="text-sm text-gray-600">{seller.offer}</div>
            </div>
            <div className="p-3 rounded-lg bg-green-50 border border-green-300">
              <div className="text-xs text-gray-500">{t("matchScore")}</div>
<<<<<<< HEAD
              <div className="text-2xl font-bold">
                {compare.match} ({compare.score}%)
              </div>
              <div className="w-full h-2 bg-white rounded mt-2 overflow-hidden">
                <div
                  className="h-2 bg-green-600"
                  style={{ width: `${compare.score}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-2">{compare.notes}</div>
              <button
                className="mt-3 w-full rounded-md bg-black text-white py-2"
                onClick={() =>
                  alert(`(placeholder) Contacting ${seller.name}...`)
                }
              >
=======
              <div className="text-2xl font-bold">{compare.match} ({compare.score}%)</div>
              <div className="w-full h-2 bg-white rounded mt-2 overflow-hidden">
                <div className="h-2 bg-green-600" style={{ width: `${compare.score}%` }} />
              </div>
              <div className="text-xs text-gray-500 mt-2">{compare.notes}</div>
              <button className="mt-3 w-full rounded-md bg-black text-white py-2" onClick={() => alert(`(placeholder) Contacting ${seller.name}...`)}>
>>>>>>> my/push-branch
                {t("contactSeller")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
