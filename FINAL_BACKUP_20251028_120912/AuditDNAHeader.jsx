import React, { useState, useEffect } from 'react';
import audioSystem from './audioSystem';

const AuditDNAHeader = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={{
      position: 'relative',
      padding: '4rem 2rem',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      overflow: 'hidden',
      minHeight: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      
      {/* Animated Background Particles */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        {/* Red Particle */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '15%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float 15s ease-in-out infinite',
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }} />
        
        {/* White Particle */}
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '20%',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(50px)',
          animation: 'float 20s ease-in-out infinite reverse',
          transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`
        }} />
        
        {/* Green Particle */}
        <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '50%',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(70px)',
          animation: 'float 18s ease-in-out infinite',
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
        }} />
      </div>

      {/* Main Content Container */}
      <div
        onMouseEnter={() => {
          setIsHovered(true);
          audioSystem.playHover();
        }}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '3rem 4rem',
          background: isHovered 
            ? 'rgba(255, 255, 255, 0.15)'
            : 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '30px',
          boxShadow: isHovered
            ? '0 30px 80px rgba(0, 0, 0, 0.5), inset 0 0 50px rgba(255, 255, 255, 0.1)'
            : '0 20px 60px rgba(0, 0, 0, 0.4), inset 0 0 30px rgba(255, 255, 255, 0.05)',
          transition: 'all 0.5s ease',
          transform: isHovered 
            ? `perspective(1000px) rotateX(${mousePosition.y * 0.3}deg) rotateY(${mousePosition.x * 0.3}deg) translateZ(20px) scale(1.05)`
            : `perspective(1000px) rotateX(${mousePosition.y * 0.2}deg) rotateY(${mousePosition.x * 0.2}deg) translateZ(0px) scale(1)`,
          transformStyle: 'preserve-3d'
        }}
      >
        
        {/* Glassmorphic Shine Effect */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
          transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
          transition: 'transform 1s ease',
          pointerEvents: 'none'
        }} />

        {/* Logo/Icon */}
        <div style={{
          fontSize: '4rem',
          marginBottom: '1rem',
          transform: `translateZ(50px) scale(${isHovered ? 1.2 : 1})`,
          transition: 'all 0.4s ease',
          filter: `drop-shadow(0 0 ${isHovered ? '30px' : '15px'} rgba(16, 185, 129, 0.8))`
        }}>
          🧬
        </div>

        {/* Main Title with 3D Effect */}
        <h1 style={{
          fontSize: '4rem',
          fontWeight: '900',
          letterSpacing: '3px',
          margin: '0',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #ef4444 0%, #ffffff 50%, #10b981 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundSize: '200% 200%',
          animation: 'gradientShift 3s ease infinite',
          textShadow: isHovered
            ? '0 0 30px rgba(239, 68, 68, 0.5), 0 0 50px rgba(16, 185, 129, 0.3)'
            : '0 0 20px rgba(239, 68, 68, 0.3)',
          transform: `translateZ(40px) scale(${isHovered ? 1.1 : 1})`,
          transition: 'all 0.4s ease'
        }}>
          AuditDNA Powered AI
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '1.5rem',
          color: 'rgba(255, 255, 255, 0.9)',
          fontWeight: '600',
          margin: '0',
          marginBottom: '1.5rem',
          transform: 'translateZ(30px)',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
          transition: 'all 0.3s ease'
        }}>
          220+ Premium Tests | Real-Time Analysis | AI-Powered
        </p>

        {/* Feature Pills */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          transform: 'translateZ(20px)'
        }}>
          <FeaturePill icon="🌾" label="Produce" color="#10b981" />
          <FeaturePill icon="🌱" label="Soil" color="#ef4444" />
          <FeaturePill icon="🥩" label="Meat" color="#ffffff" />
          <FeaturePill icon="🐟" label="Seafood" color="#10b981" />
          <FeaturePill icon="💧" label="Water" color="#ef4444" />
        </div>

        {/* Floating Particles Inside Glass */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '20px',
          height: '20px',
          background: 'rgba(239, 68, 68, 0.6)',
          borderRadius: '50%',
          filter: 'blur(3px)',
          animation: 'floatParticle 4s ease-in-out infinite',
          transform: `translateZ(60px)`
        }} />
        <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '15%',
          width: '15px',
          height: '15px',
          background: 'rgba(16, 185, 129, 0.6)',
          borderRadius: '50%',
          filter: 'blur(3px)',
          animation: 'floatParticle 5s ease-in-out infinite reverse',
          transform: `translateZ(60px)`
        }} />
        <div style={{
          position: 'absolute',
          top: '60%',
          left: '80%',
          width: '18px',
          height: '18px',
          background: 'rgba(255, 255, 255, 0.5)',
          borderRadius: '50%',
          filter: 'blur(3px)',
          animation: 'floatParticle 6s ease-in-out infinite',
          transform: `translateZ(60px)`
        }} />
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translate(0, 0) rotate(0deg); 
          }
          33% { 
            transform: translate(30px, -30px) rotate(120deg); 
          }
          66% { 
            transform: translate(-20px, 20px) rotate(240deg); 
          }
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes floatParticle {
          0%, 100% { 
            transform: translateZ(60px) translateY(0px); 
            opacity: 0.6;
          }
          50% { 
            transform: translateZ(80px) translateY(-20px); 
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

// Feature Pill Component
const FeaturePill = ({ icon, label, color }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setIsHovered(true);
        audioSystem.playHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.6rem 1.2rem',
        background: isHovered 
          ? `linear-gradient(135deg, ${color}40 0%, ${color}20 100%)`
          : `rgba(255, 255, 255, 0.1)`,
        backdropFilter: 'blur(10px)',
        border: `2px solid ${color}`,
        borderRadius: '50px',
        color: '#fff',
        fontSize: '1rem',
        fontWeight: '700',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateZ(30px) scale(1.15)' : 'translateZ(10px) scale(1)',
        boxShadow: isHovered 
          ? `0 10px 30px ${color}60, inset 0 0 20px ${color}30`
          : `0 4px 15px ${color}40`
      }}
    >
      <span style={{ fontSize: '1.3rem' }}>{icon}</span>
      <span>{label}</span>
    </div>
  );
};

export default AuditDNAHeader;