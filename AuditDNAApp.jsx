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
      
      <div className={`ticker-value ${isAnimating ? 'value-updating' : ''}`}>...