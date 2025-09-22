import React, { useEffect, useState } from "react";

export default function Ticker() {
  // Merge all unique ticker items from both branches
  const tickerItems = [
    "Factoring advances up to 80% • Avg fee ~2.2%",
    "USDA Pricing Updated Daily • W1W26 + 5-year average",
    "275+ Audit Services Available • Agriculture to Medical",
    "CFPB-aware Compliance Tools • NMLS #137694",
    "Real-time Market Data • Stock & Mortgage Tickers",
    "USDA W12 Lettuce avg: $12.50/case",
    "Mortgage 30yr fixed avg: 6.5%"
  ];

  // For animation, rotate through messages
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % tickerItems.length), 3000);
    return () => clearInterval(id);
  }, [tickerItems.length]);

  // Responsive, animated ticker (marquee effect on desktop, rotate on mobile)
  return (
    <div className="bg-gradient-to-r from-yellow-50 to-green-50 border-b border-yellow-200">
      <div className="container">
        <div className="overflow-hidden">
          {/* Desktop: scrolling marquee. Mobile: rotating message */}
          <div className="hidden md:block whitespace-nowrap animate-marquee py-2 text-sm text-slate-700">
            {tickerItems.map((item, idx) => (
              <span key={idx} className="inline-block mr-12">
                <span className="font-medium text-green-700">•</span> {item}
              </span>
            ))}
          </div>
          <div className="block md:hidden py-2 text-sm text-slate-700 text-center">
            <span className="font-medium text-green-700">•</span> {tickerItems[i]}
          </div>
        </div>
      </div>
    </div>
  );
}