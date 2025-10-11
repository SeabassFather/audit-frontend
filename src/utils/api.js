const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

// API endpoints configuration
export const endpoints = {
  tickers: {
    stocks: '/api/tickers/stocks',
    rates: '/api/tickers/rates',
    commodities: '/api/tickers/commodities'
  },
  usda: {
    prices: '/api/usda/prices',
    commodities: '/api/usda/commodities'
  },
  mortgage: {
    rates: '/api/mortgage/rates'
  }
};

// Generic API GET function
export async function apiGet(endpoint) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`API GET failed for ${endpoint}:`, error);
    throw error;
  }
}

// Generic API POST function
export async function apiPost(endpoint, data) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`API POST failed for ${endpoint}:`, error);
    throw error;
  }
}

// ============== STOCK MARKET DATA ==============
export async function fetchRealStocks() {
  try {
    // Try backend first
    return await apiGet(endpoints.tickers.stocks);
  } catch (error) {
    // Fallback to Yahoo Finance API
    console.warn('Using Yahoo Finance API for stocks');
    const symbols = ['SPY', 'DIA', 'QQQ', 'AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA', 'AMZN'];
    const stockData = {};
    
    for (const symbol of symbols) {
      try {
        const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`);
        const data = await response.json();
        const quote = data.chart.result[0].meta;
        const change = quote.regularMarketPrice - quote.previousClose;
        const percentChange = (change / quote.previousClose * 100);
        
        stockData[symbol] = {
          price: `$${quote.regularMarketPrice.toFixed(2)}`,
          change: `${change >= 0 ? '+' : ''}${change.toFixed(2)}`,
          percent: `${percentChange >= 0 ? '+' : ''}${percentChange.toFixed(2)}%`
        };
      } catch (err) {
        console.error(`Failed to fetch ${symbol}:`, err);
      }
    }
    
    return stockData;
  }
}

// ============== FOREX RATES ==============
export async function fetchRealForex() {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    const mxnRate = data.rates.MXN;
    
    return {
      'MXN/USD': {
        value: mxnRate.toFixed(4),
        rate: mxnRate,
        timestamp: new Date(data.time_last_updated * 1000)
      }
    };
  } catch (error) {
    console.error('Forex API failed:', error);
    return {
      'MXN/USD': { value: '16.85', rate: 16.85 }
    };
  }
}

// ============== FEDERAL RESERVE (FRED) DATA ==============
export async function fetchFREDData() {
  try {
    // Federal funds rate, 10-year treasury, etc.
    // Note: FRED API requires a key, using public endpoint
    const treasuryResponse = await fetch('https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/avg_interest_rates?filter=security_desc:eq:Treasury%20Notes&sort=-record_date&page[size]=1');
    const treasuryData = await treasuryResponse.json();
    
    return {
      '10Y_TREASURY': {
        rate: treasuryData.data[0]?.avg_interest_rate_amt || '4.25',
        date: treasuryData.data[0]?.record_date || new Date().toISOString().split('T')[0]
      }
    };
  } catch (error) {
    console.error('FRED API failed:', error);
    return {
      '10Y_TREASURY': { rate: '4.25', date: new Date().toISOString().split('T')[0] }
    };
  }
}

// ============== FREDDIE MAC MORTGAGE RATES ==============
export async function fetchFreddieMacRates() {
  try {
    // Freddie Mac Primary Mortgage Market Survey
    // Using their JSON endpoint
    const response = await fetch('https://www.freddiemac.com/pmms/docs/historicalweeklydata.json');
    const data = await response.json();
    
    // Get most recent week
    const latest = data[data.length - 1];
    
    return {
      '30YR_FIXED': {
        rate: parseFloat(latest.MORTGAGE30US).toFixed(2),
        date: latest.DATE,
        change: calculateChange(data, 'MORTGAGE30US')
      },
      '15YR_FIXED': {
        rate: parseFloat(latest.MORTGAGE15US).toFixed(2),
        date: latest.DATE,
        change: calculateChange(data, 'MORTGAGE15US')
      }
    };
  } catch (error) {
    console.error('Freddie Mac API failed:', error);
    return {
      '30YR_FIXED': { rate: '6.80', change: '-0.10' },
      '15YR_FIXED': { rate: '6.10', change: '-0.15' }
    };
  }
}

// Helper function to calculate week-over-week change
function calculateChange(data, field) {
  if (data.length < 2) return '0.00';
  const current = parseFloat(data[data.length - 1][field]);
  const previous = parseFloat(data[data.length - 2][field]);
  const change = current - previous;
  return `${change >= 0 ? '+' : ''}${change.toFixed(2)}`;
}

// ============== USDA MARKET NEWS ==============
export async function fetchUSDAMarketNews() {
  try {
    // USDA Market News Service API
    // Fetching fresh produce prices
    const response = await fetch('https://marsapi.ams.usda.gov/services/v1.2/reports?q=fruits');
    const data = await response.json();
    
    const commodities = {};
    
    // Parse USDA data (simplified - actual parsing would be more complex)
    if (data && data.results) {
      data.results.slice(0, 5).forEach(item => {
        commodities[item.slug_name] = {
          commodity: item.report_title,
          price: 'See Report',
          date: item.published_date,
          url: item.report_url
        };
      });
    }
    
    return commodities;
  } catch (error) {
    console.error('USDA Market News API failed:', error);
    return {
      avocado: { price: '$32.50', change: '+3.8%', trend: 'up' },
      tomato: { price: '$28.75', change: '-1.7%', trend: 'down' },
      lettuce: { price: '$24.50', change: '+2.1%', trend: 'up' }
    };
  }
}

// ============== COMBINED TICKER DATA ==============
export async function fetchAllMarketData() {
  try {
    const [stocks, forex, fred, freddieMac, usda] = await Promise.all([
      fetchRealStocks(),
      fetchRealForex(),
      fetchFREDData(),
      fetchFreddieMacRates(),
      fetchUSDAMarketNews()
    ]);
    
    return {
      stocks,
      forex,
      treasury: fred,
      mortgage: freddieMac,
      commodities: usda,
      lastUpdate: new Date().toISOString()
    };
  } catch (error) {
    console.error('Failed to fetch all market data:', error);
    throw error;
  }
}

// ============== LEGACY FUNCTIONS (for backwards compatibility) ==============
export async function fetchRealUSDA() {
  return fetchUSDAMarketNews();
}

export async function fetchRealMortgageRates() {
  return fetchFreddieMacRates();
}
