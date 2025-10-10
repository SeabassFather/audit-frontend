import React, { useEffect, useState } from "react";
import useTickers from "../hooks/useTickers";

export default function StockTicker() {
  const { stocks, loading, error } = useTickers();
  const [scrollPosition, setScrollPosition] = useState(0);

  // Mock data fallback if API is not available
  const mockStocks = {
    "AAPL": { price: "$185.42", change: "+1.25", percent: "+0.68%" },
    "GOOGL": { price: "$142.83", change: "-0.87", percent: "-0.60%" },
    "MSFT": { price: "$378.91", change: "+2.15", percent: "+0.57%" },
    "TSLA": { price: "$248.73", change: "+5.42", percent: "+2.23%" },
    "NVDA": { price: "$875.28", change: "-12.45", percent: "-1.40%" },
    "AMZN": { price: "$155.89", change: "+0.92", percent: "+0.59%" },
  };

  const displayStocks = Object.keys(stocks).length > 0 ? stocks : mockStocks;
  const stockEntries = Object.entries(displayStocks);

  // Auto-scroll animation
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition(prev => prev + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900 text-white py-2 px-4">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          <span className="text-sm">Loading market data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-600 text-white py-2 px-4">
        <div className="flex items-center justify-center">
          <span className="text-sm">Unable to load market data</span>
        </div>
      </div>
    );
  }

  if (stockEntries.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-900 text-white py-2 overflow-hidden">
      <div 
        className="flex space-x-8 animate-pulse"
        style={{
          transform: `translateX(-${scrollPosition % 400}px)`,
          transition: 'transform 0.05s linear'
        }}
      >
        {/* Repeat the stock data for seamless scrolling */}
        {[...Array(3)].map((_, repeatIndex) => (
          stockEntries.map(([symbol, data], index) => {
            const isPositive = data.change && data.change.startsWith('+');
            const isNegative = data.change && data.change.startsWith('-');
            
            return (
              <div 
                key={`${repeatIndex}-${index}`} 
                className="flex items-center space-x-2 whitespace-nowrap text-sm"
              >
                <span className="font-bold">{symbol}</span>
                <span className="font-medium">{data.price}</span>
                {data.change && (
                  <span className={`text-xs ${
                    isPositive ? 'text-green-400' : 
                    isNegative ? 'text-red-400' : 
                    'text-gray-400'
                  }`}>
                    {data.change}
                  </span>
                )}
                {data.percent && (
                  <span className={`text-xs px-1 py-0.5 rounded ${
                    isPositive ? 'bg-green-500/20 text-green-400' : 
                    isNegative ? 'bg-red-500/20 text-red-400' : 
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {data.percent}
                  </span>
                )}
              </div>
            );
          })
        ))}
      </div>
    </div>
  );
}
