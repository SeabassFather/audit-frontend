export default function Ticker() {
  const tickerItems = [
    "Factoring advances up to 80% • Avg fee ~2.2%",
    "USDA Pricing Updated Daily • W1W26 + 5-year average",
    "275+ Audit Services Available • Agriculture to Medical",
    "CFPB-aware Compliance Tools • NMLS #137694",
    "Real-time Market Data • Stock & Mortgage Tickers"
  ];

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-green-50 border-b border-yellow-200">
      <div className="container">
        <div className="overflow-hidden">
          <div className="whitespace-nowrap animate-marquee py-2 text-sm text-slate-700">
            {tickerItems.map((item, index) => (
              <span key={index} className="inline-block mr-12">
                <span className="font-medium text-green-700">•</span> {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}