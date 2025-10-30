import React, { useState, useEffect } from 'react';
import { BarChart3, Shield, Search, Settings, TrendingUp, TrendingDown, Users, DollarSign, ChevronDown, ChevronRight, Play, FileText, Filter, Zap, Star, Globe } from 'lucide-react';

// Premium Animated Components
function AnimatedBackground() {
  return (
    <div className="animated-bg">
      <div className="grid-overlay"></div>
      <div className="floating-particles">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>
      <div className="gradient-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>
    </div>
  );
}

function GlowingCard({ children, className = "", ...props }) {
  return (
    <div className={`premium-card ${className}`} {...props}>
      <div className="card-glow"></div>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

// Live Tickers Component with Premium Effects
function useRotator(items, intervalMs = 3000) {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (items.length === 0) return;
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setIndex(prev => (prev + 1) % items.length);
        setIsAnimating(false);
      }, 150);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [items.length, intervalMs]);

  return { current: items[index] || null, isAnimating };
}

function PremiumTicker({ data, title, icon, color }) {
  const { current, isAnimating } = useRotator(data);

  if (!current) return null;

  return (
    <GlowingCard className={`ticker-card ${isAnimating ? 'ticker-updating' : ''}`}> 
      <div className="ticker-header">
        <div className="ticker-icon" style={{ color }}>
          {icon}
        </div>
        <span className="ticker-label">{title}</span>
        <div className="live-indicator">
          <div className="pulse-dot"></div>
          LIVE
        </div>
      </div>
      
      <div className={`ticker-value ${isAnimating ? 'value-updating' : ''}`}> 
        {current.value}
      </div>
      
      <div className="ticker-footer">
        <span className="ticker-type">{current.label}</span>
        <div className={`ticker-change ${current.isPositive ? 'positive' : 'negative'}`}> 
          {current.isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span className="change-value">{current.change}</span>
          <div className="change-sparkle"></div>
        </div>
      </div>
    </GlowingCard>
  );
}

function MortgageRatesTicker() {
  const rates = [
    { label: "30Y Fixed", value: "6.94%", change: "-0.02", isPositive: false },
    { label: "15Y Fixed", value: "6.23%", change: "+0.01", isPositive: true },
    { label: "5/1 ARM", value: "5.85%", change: "-0.05", isPositive: false },
    { label: "Jumbo 30Y", value: "7.12%", change: "+0.03", isPositive: true },
    { label: "FHA 30Y", value: "6.65%", change: "-0.01", isPositive: false },
    { label: "VA 30Y", value: "6.58%", change: "+0.02", isPositive: true }
  ];
  
  return <PremiumTicker data={rates} title="Mortgage Rates" icon={<TrendingUp size={18} />} color="#00ff88" />;
}

function AgCommoditiesTicker() {
  const commodities = [
    { label: "Corn", value: "$473.25", change: "+1.10", isPositive: true },
    { label: "Soybeans", value: "$1,264.50", change: "-3.25", isPositive: false },
    { label: "Wheat", value: "$604.75", change: "+0.75", isPositive: true },
    { label: "Cotton", value: "$67.80", change: "+0.45", isPositive: true },
    { label: "Rice", value: "$16.45", change: "-0.12", isPositive: false },
    { label: "Sugar", value: "$22.34", change: "+0.67", isPositive: true }
  ];
  
<<<<<<< HEAD
  return <PremiumTicker data={commodities} title="Ag Commodities" icon="🌾" color="#4a96ff" />;
=======
  return <PremiumTicker data={commodities} title="Ag Commodities" icon="Ã°Å¸Å’Â¾" color="#4a96ff" />;
>>>>>>> my/push-branch
}

function EquitiesTicker() {
  const markets = [
    { label: "S&P 500", value: "5,510", change: "+12", isPositive: true },
    { label: "NASDAQ", value: "23,784", change: "-31", isPositive: false },
    { label: "DOW", value: "39,210", change: "+48", isPositive: true },
    { label: "Russell 2K", value: "2,180", change: "-6", isPositive: false },
    { label: "VIX", value: "15.2", change: "-0.8", isPositive: false },
    { label: "Gold", value: "$2,031", change: "+15", isPositive: true }
  ];
  
<<<<<<< HEAD
  return <PremiumTicker data={markets} title="Markets" icon="📈" color="#ff6b35" />;
=======
  return <PremiumTicker data={markets} title="Markets" icon="Ã°Å¸â€œË†" color="#ff6b35" />;
>>>>>>> my/push-branch
}

// Complete Service Data
// [TRUNCATED: See original user file for full contents.]