import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Megadashboard() {
  const navigate = useNavigate();

  const tickers = {
    mortgage: [
      { label: '30-Year Fixed', value: '6.99%', change: '-0.05%', isPositive: false },
      { label: 'FHA', value: '6.80%', change: '+0.02%', isPositive: true },
    ],
    commodities: [
      { label: 'Corn', value: '$4.23/bu', change: '-0.45%', isPositive: false },
      { label: 'Wheat', value: '$6.67/bu', change: '+1.12%', isPositive: true },
    ],
    markets: [
      { label: 'S&P 500', value: '5,918', change: '+0.85%', isPositive: true },
      { label: 'DOW', value: '42,864', change: '+1.02%', isPositive: true },
    ],
  };

  const stats = [
    { label: 'Total Deals', value: '247', bg: '#23293a', border: '#3b82f6', text: '#fff' },
    { label: 'Active Loans', value: '89', bg: '#23293a', border: '#22c55e', text: '#fff' },
    { label: 'Portfolio Value', value: '$15.7M', bg: '#23293a', border: '#eab308', text: '#fff' },
    { label: 'Monthly Revenue', value: '$2.34M', bg: '#23293a', border: '#64748b', text: '#fff' },
  ];

  const modules = [
    { name: 'Financial Services', icon: '💰', path: '/financial', desc: 'Click to Access →', border: '#3b82f6', bg: '#23293a', color: '#fff' },
    { name: 'Real Estate', icon: '🏠', path: '/real-estate', desc: 'Click to Access →', border: '#22c55e', bg: '#23293a', color: '#fff' },
    { name: 'Agriculture', icon: '🌽', path: '/agriculture', desc: 'Click to Access →', border: '#eab308', bg: '#23293a', color: '#fff' },
    { name: 'Compliance', icon: '✅', path: '/compliance', desc: 'Click to Access →', border: '#64748b', bg: '#23293a', color: '#fff' },
    { name: 'Analytics', icon: <img alt="analytics" src="https://img.icons8.com/fluency/48/000000/combo-chart.png" style={{height:"2rem"}} />, path: '/analytics', desc: 'Click to Access →', border: '#3b82f6', bg: '#23293a', color: '#fff' },
    { name: 'Mexico Ops', icon: 'MX', path: '/mexico', desc: 'Click to Access →', border: '#22c55e', bg: '#23293a', color: '#fff' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#15192a', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* HEADER */}
        <div style={{
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: '900',
              color: '#fff',
              letterSpacing: '-1.5px',
              marginBottom: '2px'
            }}>
              Supreme AuditDNA MegaDashboard
            </h1>
            <div style={{
              color: '#4ade80',
              fontWeight: 'bold',
              fontSize: '1rem',
              marginBottom: '4px'
            }}>All Systems Operational</div>
            <div style={{
              color: '#a1a1aa',
              fontSize: '1rem',
              fontWeight: '500',
              marginBottom: '2px'
            }}>Supreme Edition v1.0</div>
          </div>
          <div style={{
            display: 'flex',
            gap: '14px',
            alignItems: 'center'
          }}>
            <input type="text" placeholder="Search..." style={{
              padding: '8px 18px',
              borderRadius: '12px',
              border: 'none',
              background: '#23293a',
              color: '#fff',
              fontSize: '1rem',
              marginRight: '12px'
            }} />
            <div style={{
              color: '#4ade80',
              fontSize: '0.95rem',
              fontWeight: 'bold',
              marginRight: '14px'
            }}>Multi-Region | 24/7 Support</div>
            <div style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1rem',
              padding: '10px 18px',
              background: '#23293a',
              borderRadius: '20px'
            }}>
              SeabassFather <span style={{
                color: '#a1a1aa',
                fontWeight: '500',
                fontSize: '0.88rem'
              }}>Supreme Admin</span>
            </div>
          </div>
        </div>

        {/* NAVIGATION BAR */}
        <div style={{
          display: 'flex',
          gap: '24px',
          marginBottom: '32px',
          flexWrap: 'wrap'
        }}>
          {['Dashboard', 'Financial Services', 'Real Estate', 'Agriculture', 'USDA', 'Compliance'].map((nav, idx) => (
            <button
              key={nav}
              onClick={() => navigate('/' + nav.toLowerCase().replace(/\s+/g, '-'))}
              style={{
                background: '#23293a',
                color: '#fff',
                fontWeight: '700',
                fontSize: '1.1rem',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 28px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                letterSpacing: '0.02em'
              }}
            >{nav}</button>
          ))}
        </div>

        {/* LIVE TICKERS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {/* MORTGAGE RATES */}
          <div style={{
            background: '#23293a',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(15, 23, 42, 0.12)',
            border: '2px solid #212936'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              paddingBottom: '12px',
              borderBottom: '2px solid #212936'
            }}>
              <span style={{
                fontSize: '1rem',
                fontWeight: '700',
                color: '#fff'
              }}>
                🏠 Mortgage Rates
              </span>
              <span style={{
                fontSize: '0.7rem',
                background: '#22c55e',
                color: 'white',
                padding: '4px 10px',
                borderRadius: '6px',
                fontWeight: 'bold'
              }}>
                LIVE
              </span>
            </div>
            {tickers.mortgage.map((item, idx) => (
              <div key={idx} style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px',
                padding: '10px',
                background: '#181b23',
                borderRadius: '6px'
              }}>
                <span style={{
                  color: '#a1a1aa',
                  fontSize: '0.95rem',
                  fontWeight: '600'
                }}>{item.label}</span>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: '0.95rem'
                  }}>{item.value}</span>
                  <span style={{
                    color: item.isPositive ? '#22c55e' : '#ef4444',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    minWidth: '60px',
                    textAlign: 'right'
                  }}>
                    {item.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* COMMODITIES */}
          <div style={{
            background: '#23293a',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(15, 23, 42, 0.12)',
            border: '2px solid #212936'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              paddingBottom: '12px',
              borderBottom: '2px solid #212936'
            }}>
              <span style={{
                fontSize: '1rem',
                fontWeight: '700',
                color: '#fff'
              }}>
                🌾 Commodities
              </span>
              <span style={{
                fontSize: '0.7rem',
                background: '#22c55e',
                color: 'white',
                padding: '4px 10px',
                borderRadius: '6px',
                fontWeight: 'bold'
              }}>
                LIVE
              </span>
            </div>
            {tickers.commodities.map((item, idx) => (
              <div key={idx} style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px',
                padding: '10px',
                background: '#181b23',
                borderRadius: '6px'
              }}>
                <span style={{
                  color: '#a1a1aa',
                  fontSize: '0.95rem',
                  fontWeight: '600'
                }}>{item.label}</span>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: '0.95rem'
                  }}>{item.value}</span>
                  <span style={{
                    color: item.isPositive ? '#22c55e' : '#ef4444',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    minWidth: '60px',
                    textAlign: 'right'
                  }}>
                    {item.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* MARKETS */}
          <div style={{
            background: '#23293a',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(15, 23, 42, 0.12)',
            border: '2px solid #212936'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              paddingBottom: '12px',
              borderBottom: '2px solid #212936'
            }}>
              <span style={{
                fontSize: '1rem',
                fontWeight: '700',
                color: '#fff'
              }}>
                📈 Markets
              </span>
              <span style={{
                fontSize: '0.7rem',
                background: '#22c55e',
                color: 'white',
                padding: '4px 10px',
                borderRadius: '6px',
                fontWeight: 'bold'
              }}>
                LIVE
              </span>
            </div>
            {tickers.markets.map((item, idx) => (
              <div key={idx} style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px',
                padding: '10px',
                background: '#181b23',
                borderRadius: '6px'
              }}>
                <span style={{
                  color: '#a1a1aa',
                  fontSize: '0.95rem',
                  fontWeight: '600'
                }}>{item.label}</span>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: '0.95rem'
                  }}>{item.value}</span>
                  <span style={{
                    color: item.isPositive ? '#22c55e' : '#ef4444',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    minWidth: '60px',
                    textAlign: 'right'
                  }}>
                    {item.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* STATS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {stats.map((stat, idx) => (
            <div key={idx} style={{
              background: stat.bg,
              borderRadius: '12px',
              padding: '28px',
              border: `3px solid ${stat.border}`,
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.12)'
            }}>
              <div style={{
                fontSize: '0.95rem',
                fontWeight: '700',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1.2px',
                color: stat.text,
                opacity: '0.8'
              }}>
                {stat.label}
              </div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '900',
                color: stat.text
              }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* MODULES */}
        <h2 style={{
          fontSize: '1.6rem',
          fontWeight: '900',
          color: '#fff',
          marginBottom: '24px',
          letterSpacing: '-0.5px'
        }}>
          Modules
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {modules.map((module, idx) => (
            <div
              key={idx}
              onClick={() => navigate(module.path)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(15, 23, 42, 0.20)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(15, 23, 42, 0.10)';
              }}
              style={{
                background: module.bg,
                borderRadius: '12px',
                padding: '32px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(15, 23, 42, 0.10)',
                border: `3px solid ${module.border}`,
                color: module.color,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontWeight: '700'
              }}
            >
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '16px',
                height: "2.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                {module.icon}
              </div>
              <div style={{
                fontSize: '1.2rem',
                fontWeight: '800',
                color: module.color,
                marginBottom: '8px',
                letterSpacing: '-0.3px'
              }}>
                {module.name}
              </div>
              <div style={{
                fontSize: '0.98rem',
                color: '#a1a1aa',
                marginBottom: '12px',
                lineHeight: '1.5',
                fontWeight: '500',
                textAlign: 'center'
              }}>
                {module.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}