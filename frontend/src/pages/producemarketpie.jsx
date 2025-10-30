import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const USDA_API_KEY = "4F158DB1-85C2-3243-BFFA-58B53FB40D23";

// List your commodities here (match your main page)
const ALL_COMMODITIES = [
  {
    name: "Papaya",
    nass: {
      commodity_desc: "PAPAYAS",
      statisticcat_desc: "PRICE RECEIVED",
      unit_desc: "DOLLARS / LB",
    },
  },
  {
    name: "Oranges",
    nass: {
      commodity_desc: "ORANGES",
      statisticcat_desc: "PRICE RECEIVED",
      unit_desc: "DOLLARS / LB",
    },
  },
  {
    name: "Apples",
    nass: {
      commodity_desc: "APPLES",
      statisticcat_desc: "PRICE RECEIVED",
      unit_desc: "DOLLARS / LB",
    },
  },
  {
    name: "Grapes",
    nass: {
      commodity_desc: "GRAPES",
      statisticcat_desc: "PRICE RECEIVED",
      unit_desc: "DOLLARS / LB",
    },
  },
  {
    name: "Corn",
    nass: {
      commodity_desc: "CORN",
      statisticcat_desc: "PRICE RECEIVED",
      unit_desc: "DOLLARS / BU",
    },
  },
  {
    name: "Potatoes",
    nass: {
      commodity_desc: "POTATOES",
      statisticcat_desc: "PRICE RECEIVED",
      unit_desc: "DOLLARS / CWT",
    },
  },
  {
    name: "Onions",
    nass: {
      commodity_desc: "ONIONS",
      statisticcat_desc: "PRICE RECEIVED",
      unit_desc: "DOLLARS / CWT",
    },
  },
  {
    name: "Tomatoes",
    nass: {
      commodity_desc: "TOMATOES",
      statisticcat_desc: "PRICE RECEIVED",
      unit_desc: "DOLLARS / CWT",
    },
  },
];

const PIE_COLORS = [
  "#cb356b",
  "#1e90ff",
  "#ffa500",
  "#16a34a",
  "#f59e42",
  "#7c3aed",
  "#e11d48",
  "#facc15",
];

export default function ProduceMarketPie() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      let avgPrices = [];
      for (let i = 0; i < ALL_COMMODITIES.length; ++i) {
        const c = ALL_COMMODITIES[i];
        const year = new Date().getFullYear();
        const url =
          `https://quickstats.nass.usda.gov/api/api_GET/?key=${USDA_API_KEY}` +
          `&commodity_desc=${encodeURIComponent(c.nass.commodity_desc)}` +
          `&statisticcat_desc=${encodeURIComponent(c.nass.statisticcat_desc)}` +
          `&unit_desc=${encodeURIComponent(c.nass.unit_desc)}` +
          `&year__GE=${year - 4}&year__LE=${year}` +
          `&agg_level_desc=NATIONAL&format=JSON`;
        try {
          const resp = await fetch(url);
          const json = await resp.json();
          const raw = json.data || [];
          // Calculate 5-year average price
          let total = 0,
            count = 0;
          raw.forEach((d) => {
            const price = parseFloat(d.Value.replace(",", ""));
            if (!isNaN(price)) {
              total += price;
              count += 1;
            }
          });
          avgPrices.push(count ? total / count : 0);
        } catch {
          avgPrices.push(0);
        }
      }
      setData({
        labels: ALL_COMMODITIES.map((c) => c.name),
        datasets: [
          {
            label: "5-Year Avg Price",
            data: avgPrices,
            backgroundColor: PIE_COLORS,
            borderColor: "#fff",
            borderWidth: 2,
          },
        ],
      });
      setLoading(false);
    }
    fetchAll();
  }, []);

  if (loading)
    return (
      <div style={{ textAlign: "center", color: "#cb356b" }}>
<<<<<<< HEAD
        Loading market pie…
=======
        Loading market pieÃ¢â‚¬Â¦
>>>>>>> my/push-branch
      </div>
    );
  if (!data) return null;

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 12px 0 rgba(0,0,0,0.07)",
        padding: "1.6rem",
        marginBottom: 30,
        maxWidth: 540,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div style={{ fontSize: "1.12rem", fontWeight: 700, marginBottom: 12 }}>
        USDA Produce Market Pie (5-Year Avg Price)
      </div>
      <Pie data={data} />
    </div>
  );
}
