// Ticker data for real-time financial and commodity information
export const tickerData = {
  commodities: [
    {
      symbol: 'CORN',
      name: 'Corn Futures',
      price: 452.75,
      change: +12.25,
      changePercent: +2.78,
      volume: '125K',
      high: 458.00,
      low: 441.50,
      lastUpdate: new Date().toISOString()
    },
    {
      symbol: 'WHEAT',
      name: 'Wheat Futures',
      price: 627.50,
      change: -8.75,
      changePercent: -1.37,
      volume: '89K',
      high: 635.25,
      low: 622.00,
      lastUpdate: new Date().toISOString()
    },
    {
      symbol: 'SOY',
      name: 'Soybean Futures',
      price: 1342.25,
      change: +18.50,
      changePercent: +1.40,
      volume: '156K',
      high: 1348.75,
      low: 1325.00,
      lastUpdate: new Date().toISOString()
    },
    {
      symbol: 'CATTLE',
      name: 'Live Cattle',
      price: 186.75,
      change: +2.25,
      changePercent: +1.22,
      volume: '67K',
      high: 188.00,
      low: 184.25,
      lastUpdate: new Date().toISOString()
    },
    {
      symbol: 'COFFEE',
      name: 'Coffee Futures',
      price: 245.80,
      change: -5.20,
      changePercent: -2.07,
      volume: '43K',
      high: 251.50,
      low: 244.10,
      lastUpdate: new Date().toISOString()
    }
  ],
  currencies: [
    {
      symbol: 'USD/MXN',
      name: 'US Dollar / Mexican Peso',
      price: 17.82,
      change: +0.15,
      changePercent: +0.85,
      lastUpdate: new Date().toISOString()
    },
    {
      symbol: 'EUR/USD',
      name: 'Euro / US Dollar',
      price: 1.0742,
      change: -0.0023,
      changePercent: -0.21,
      lastUpdate: new Date().toISOString()
    },
    {
      symbol: 'GBP/USD',
      name: 'British Pound / US Dollar',
      price: 1.2654,
      change: +0.0087,
      changePercent: +0.69,
      lastUpdate: new Date().toISOString()
    }
  ],
  mortgageRates: [
    {
      term: '30-Year Fixed',
      rate: 7.125,
      change: +0.025,
      points: 0.8,
      apr: 7.234
    },
    {
      term: '15-Year Fixed',
      rate: 6.625,
      change: +0.015,
      points: 0.6,
      apr: 6.712
    },
    {
      term: '5/1 ARM',
      rate: 6.250,
      change: -0.010,
      points: 0.4,
      apr: 7.145
    },
    {
      term: 'FHA 30-Year',
      rate: 6.875,
      change: +0.020,
      points: 0.5,
      apr: 6.987
    },
    {
      term: 'VA 30-Year',
      rate: 6.750,
      change: +0.030,
      points: 0.0,
      apr: 6.895
    }
  ],
  marketIndices: [
    {
      symbol: 'SPY',
      name: 'S&P 500 ETF',
      price: 542.18,
      change: +3.45,
      changePercent: +0.64,
      volume: '2.1M'
    },
    {
      symbol: 'QQQ',
      name: 'NASDAQ 100 ETF',
      price: 467.89,
      change: -2.11,
      changePercent: -0.45,
      volume: '1.8M'
    },
    {
      symbol: 'IWM',
      name: 'Russell 2000 ETF',
      price: 218.76,
      change: +1.23,
      changePercent: +0.57,
      volume: '987K'
    }
  ]
};

export const alertSettings = [
  {
    id: 'alert-001',
    type: 'commodity',
    symbol: 'CORN',
    condition: 'price_above',
    threshold: 450.00,
    active: true,
    userId: 'user-001'
  },
  {
    id: 'alert-002',
    type: 'currency',
    symbol: 'USD/MXN',
    condition: 'change_percent_above',
    threshold: 1.0,
    active: true,
    userId: 'user-001'
  },
  {
    id: 'alert-003',
    type: 'mortgage',
    term: '30-Year Fixed',
    condition: 'rate_below',
    threshold: 7.0,
    active: false,
    userId: 'user-001'
  }
];