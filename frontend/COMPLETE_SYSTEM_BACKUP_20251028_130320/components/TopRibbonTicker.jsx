import React, { useState, useEffect } from 'react';

export default function TopRibbonTicker() {
  const [tickers, setTickers] = useState([
    { symbol: 'S&P 500', value: '5,918', change: '+0.85%', isUp: true },
    { symbol: 'DOW', value: '42,864', change: '+1.02%', isUp: true },
    { symbol: 'NASDAQ', value: '18,343', change: '+0.73%', isUp: true },
    { symbol: 'CORN', value: '$4.23', change: '-0.45%', isUp: false },
    { symbol: 'WHEAT', value: '$5.67', change: '+1.12%', isUp: true },
    { symbol: 'SOYBEANS', value: '$10.45', change: '+0.34%', isUp: true },
    { symbol: 'COFFEE', value: '$2.87', change: '+2.15%', isUp: true },
    { symbol: 'AVOCADO', value: '$1.85', change: '-0.23%', isUp: false },
    { symbol: '30YR MORT', value: '6.95%', change: '-0.05%', isUp: true },
    { symbol: 'USD/MXN', value: '$20.15', change: '+0.12%', isUp: true },
  ]);

  const cssAnimation = `
    @keyframes tickerScroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .ticker-animate {
      animation: tickerScroll 30s linear infinite;
    }
    .ticker-animate:hover {
      animation-play-state: paused;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssAnimation }} />
      <div className='bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b-2 border-green-500 overflow-hidden'>
        <div className='flex ticker-animate'>
          <div className='flex whitespace-nowrap py-2'>
            {tickers.concat(tickers).map((ticker, idx) => (
              <div key={idx} className='inline-flex items-center mx-6 px-4 py-1 bg-gray-800/50 rounded-lg border border-gray-700'>
                <span className='text-white font-bold text-sm mr-2'>{ticker.symbol}</span>
                <span className='text-white text-sm mr-2'>{ticker.value}</span>
                <span className={'text-sm font-semibold ' + (ticker.isUp ? 'text-green-400' : 'text-red-400')}>
                  {ticker.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
