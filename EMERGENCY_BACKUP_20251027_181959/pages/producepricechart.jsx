import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default function ProducePriceChart({ commodity, usdaParams }) {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const USDA_API_KEY = "4F158DB1-85C2-3243-BFFA-58B53FB40D23";

  useEffect(() => {
    if (!commodity || !usdaParams) return;
    setLoading(true);
    setError("");
    const year = new Date().getFullYear();
    const url =
      `https://quickstats.nass.usda.gov/api/api_GET/?key=${USDA_API_KEY}` +
      `&commodity_desc=${encodeURIComponent(usdaParams.commodity_desc)}` +
      `&statisticcat_desc=${encodeURIComponent(usdaParams.statisticcat_desc)}` +
      `&unit_desc=${encodeURIComponent(usdaParams.unit_desc)}` +
      `&year__GE=${year - 4}&year__LE=${year}` +
      `&agg_level_desc=NATIONAL&format=JSON`;

    fetch(url)
      .then((resp) => resp.json())
      .then((json) => {
        const raw = json.data || [];
        let byYear = {};
        raw.forEach((d) => {
          const yr = d.year;
          const price = parseFloat(d.Value.replace(",", ""));
          if (!isNaN(price)) {
            if (!byYear[yr]) byYear[yr] = [];
            byYear[yr].push(price);
          }
        });
        const years = Object.keys(byYear).sort();
        const prices = years.map(
          (yr) => byYear[yr].reduce((a, b) => a + b, 0) / byYear[yr].length,
        );
        setChartData({
          labels: years,
          datasets: [
            {
              label: `${commodity} Price`,
              data: prices,
              borderColor: "#cb356b",
              backgroundColor: "#cb356b55",
              tension: 0.3,
              pointRadius: 4,
              pointHoverRadius: 7,
              borderWidth: 3,
            },
          ],
        });
      })
      .catch(() => setError("Failed to load USDA data."))
      .finally(() => setLoading(false));
  }, [commodity, usdaParams]);

  if (loading)
    return (
      <div style={{ textAlign: "center", color: "#cb356b" }}>
        Loading chartÃ¢â‚¬Â¦
      </div>
    );
  if (error)
    return <div style={{ color: "#c62828", textAlign: "center" }}>{error}</div>;
  if (!chartData) return null;

  return (
    <Line
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: false },
        },
        scales: {
          x: { title: { display: true, text: "Year" } },
          y: { title: { display: true, text: "Price (USD)" } },
        },
      }}
      height={120}
    />
  );
}
