import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import audioSystem from './audioSystem';

const HomePage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const featuredModules = [
    { name: 'Water Analysis', nameEs: 'Análisis de Agua', icon: '💧', tests: 53, route: '/water' },
    { name: 'Soil Analysis', nameEs: 'Análisis de Suelo', icon: '🌱', tests: 38, route: '/soil' },
    { name: 'Fuel Analysis', nameEs: 'Análisis de Combustible', icon: '⛽', tests: 13, route: '/fuel' },
    { name: 'Alcohol Analysis', nameEs: 'Análisis de Alcohol', icon: '🍷', tests: 26, route: '/alcohol' }
  ];

  const allServices = [
    { name: 'AG Sciences', icon: '🌾', route: '/ag' },
    { name: 'Engine Performance', icon: '🔧', route: '/engine' },
    { name: 'Field Logger', icon: '📍', route: '/field' },
    { name: 'Lab Dashboard', icon: '🔬', route: '/lab' },
    { name: 'AI Analysis', icon: '🤖', route: '/ai' },
    { name: 'Analysis Hub', icon: '🧪', route: '/testing' },
    { name: 'Traceability', icon: '🔗', route: '/traceability' },
    { name: 'Results Portal', icon: '📊', route: '/results' }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      padding: '2rem', 
      color: '#fff',
      position: 'relative',
      overflow: 'hidden',
      perspective: '1500px'
    }}>
      
      {/* LIGHT BLUE PARTICLES */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 200 + 100 + 'px',
              height: Math.random() * 200 + 100 + 'px',
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(100, 181, 246, ${Math.random() * 0.3 + 0.1}) 0%, transparent 70%)`,
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `float-blue ${10 + Math.random() * 20}s ease-in-out infinite`,
              animationDelay: Math.random() * 5 + 's',
              filter: 'blur(60px)'
            }}
          />
        ))}
      </div>

      {/* SILVER SPARKLES */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #e0e0e0 0%, #ffffff 100%)',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.9 + 0.1,
              animation: `sparkle-silver ${Math.random() * 2 + 1}s ease-in-out infinite`,
              animationDelay: Math.random() * 2 + 's',
              boxShadow: '0 0 10px rgba(224, 224, 224, 0.9)'
            }}
          />
        ))}
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        
        {/* LANGUAGE TOGGLE */}
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 1000 }}>
          <button
            onClick={() => {
              const newLang = language === 'en' ? 'es' : 'en';
              localStorage.setItem('language', newLang);
              window.location.reload();
              audioSystem.playClick();
            }}
            style={{
              padding: '0.8rem 1.5rem',
              background: 'linear-gradient(135deg, rgba(45, 55, 72, 0.95) 0%, rgba(26, 32, 46, 0.98) 100%)',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(100, 181, 246, 0.4)',
              borderRadius: '15px',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 5px 20px rgba(0, 0, 0, 0.5), 0 0 15px rgba(100, 181, 246, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.borderColor = '#64b5f6';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(100, 181, 246, 0.5), 0 0 30px rgba(100, 181, 246, 0.4)';
              audioSystem.playHover();
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.borderColor = 'rgba(100, 181, 246, 0.4)';
              e.currentTarget.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5), 0 0 15px rgba(100, 181, 246, 0.2)';
            }}
          >
            <span style={{ fontSize: '1.3rem' }}>🌐</span>
            <span>{language === 'en' ? 'ES' : 'EN'}</span>
          </button>
        </div>
        
        {/* INTERACTIVE TITLE */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const rotateY = (x - centerX) / 15;
              const rotateX = (centerY - y) / 15;
              e.currentTarget.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.08)`;
              e.currentTarget.style.filter = 'drop-shadow(0 0 30px rgba(100, 181, 246, 0.6)) drop-shadow(0 0 50px rgba(224, 224, 224, 0.3))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
              e.currentTarget.style.filter = 'drop-shadow(0 0 40px rgba(100, 181, 246, 0.9)) drop-shadow(0 0 80px rgba(224, 224, 224, 0.6))';
            }}
            style={{ 
              fontSize: '5.5rem', 
              background: 'linear-gradient(135deg, #ffffff 0%, #64b5f6 20%, #42a5f5 40%, #64b5f6 60%, #e0e0e0 80%, #ffffff 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1rem',
              fontWeight: 'bold',
              filter: 'drop-shadow(0 0 20px rgba(100, 181, 246, 0.4)) drop-shadow(0 0 40px rgba(224, 224, 224, 0.2))',
              animation: 'glow-pulse-blue 2s ease-in-out infinite alternate, shimmer-bg 4s ease-in-out infinite, float-title 5s ease-in-out infinite',
              letterSpacing: '4px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transformStyle: 'preserve-3d',
              textShadow: '0 10px 40px rgba(100, 181, 246, 0.8), 0 20px 80px rgba(224, 224, 224, 0.5)',
              position: 'relative',
              userSelect: 'none'
            }}
          >
            AuditDNA
          </h1>
          <p style={{ fontSize: '1.5rem', color: '#b0bec5', marginBottom: '0.5rem', textShadow: '0 0 20px rgba(100, 181, 246, 0.5)' }}>
            {language === 'es' ? 'Auditoría y Cumplimiento de Pruebas con IA' : 'Test Audit & Compliance Powered by AI'}
          </p>
          <p style={{ fontSize: '1.3rem', color: '#64b5f6', fontWeight: 'bold', textShadow: '0 0 30px rgba(100, 181, 246, 0.8)' }}>
            252+ {language === 'es' ? 'Análisis Disponibles' : 'Analyses Available'}
          </p>
        </div>

        <h2 style={{ 
          fontSize: '2.8rem', 
          textAlign: 'center', 
          color: '#64b5f6', 
          marginBottom: '3rem', 
          textTransform: 'uppercase', 
          letterSpacing: '4px',
          textShadow: '0 0 40px rgba(100, 181, 246, 0.7)',
          fontWeight: 'bold'
        }}>
          {language === 'es' ? 'Módulos Destacados' : 'Featured Modules'}
        </h2>

        {/* SHARP CARDS - GREY/SILVER + LIGHT BLUE */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', marginBottom: '5rem' }}>
          {featuredModules.map((module, index) => (
            <div
              key={module.route}
              onClick={() => { audioSystem.playClick(); navigate(module.route); }}
              style={{
                background: 'linear-gradient(135deg, rgba(45, 55, 72, 0.95) 0%, rgba(26, 32, 46, 0.98) 100%)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                border: '2px solid rgba(100, 181, 246, 0.3)',
                borderRadius: '25px',
                padding: '2.5rem 1.5rem',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                boxShadow: '0 15px 50px rgba(0, 0, 0, 0.8), inset 0 2px 0 rgba(255, 255, 255, 0.1), 0 0 30px rgba(100, 181, 246, 0.2)',
                position: 'relative',
                overflow: 'hidden',
                transformStyle: 'preserve-3d',
                animation: `float-card ${3 + index * 0.5}s ease-in-out infinite`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-30px) scale(1.12) rotateX(15deg) rotateY(10deg) rotateZ(2deg)';
                e.currentTarget.style.boxShadow = '0 40px 100px rgba(100, 181, 246, 0.7), inset 0 2px 0 rgba(255, 255, 255, 0.3), 0 0 80px rgba(100, 181, 246, 0.9)';
                e.currentTarget.style.borderColor = '#64b5f6';
                audioSystem.playHover();
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg)';
                e.currentTarget.style.boxShadow = '0 15px 50px rgba(0, 0, 0, 0.8), inset 0 2px 0 rgba(255, 255, 255, 0.1), 0 0 30px rgba(100, 181, 246, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(100, 181, 246, 0.3)';
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                e.currentTarget.style.transform = `translateY(-30px) scale(1.12) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
              }}
            >
              {/* ROTATING BORDER GLOW - LIGHT BLUE */}
              <div style={{
                position: 'absolute',
                top: '-3px',
                left: '-3px',
                right: '-3px',
                bottom: '-3px',
                borderRadius: '25px',
                background: 'conic-gradient(from 0deg, transparent 0deg, #64b5f6 90deg, #42a5f5 180deg, transparent 270deg)',
                animation: 'rotate-border-sharp 4s linear infinite',
                pointerEvents: 'none',
                zIndex: -1,
                opacity: 0.7
              }} />

              {/* PULSING HALO - LIGHT BLUE */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '250%',
                height: '250%',
                background: 'radial-gradient(circle, rgba(100, 181, 246, 0.25) 0%, transparent 60%)',
                opacity: 0.6,
                pointerEvents: 'none',
                animation: 'pulse-halo-sharp 3s ease-in-out infinite'
              }} />

              {/* SHINE SWEEP */}
              <div style={{
                position: 'absolute',
                top: '-100%',
                left: '-100%',
                width: '300%',
                height: '300%',
                background: 'linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.15) 50%, transparent 60%)',
                animation: 'shine-sweep-sharp 6s ease-in-out infinite',
                pointerEvents: 'none'
              }} />

              <div style={{ 
                fontSize: '4.5rem', 
                marginBottom: '1.5rem', 
                filter: 'drop-shadow(0 0 30px rgba(100, 181, 246, 0.9)) drop-shadow(0 0 50px rgba(224, 224, 224, 0.5))',
                position: 'relative',
                zIndex: 1,
                animation: 'float-icon-sharp 2.5s ease-in-out infinite'
              }}>
                {module.icon}
              </div>
              <h3 style={{ 
                fontSize: '1.5rem', 
                color: '#fff', 
                marginBottom: '1rem', 
                fontWeight: 'bold',
                textShadow: '0 0 20px rgba(100, 181, 246, 0.6), 0 2px 10px rgba(0,0,0,0.9)',
                position: 'relative',
                zIndex: 1
              }}>
                {language === 'es' ? module.nameEs : module.name}
              </h3>
              <div style={{ 
                fontSize: '2.8rem', 
                background: 'linear-gradient(135deg, #64b5f6 0%, #42a5f5 50%, #64b5f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold', 
                marginBottom: '0.5rem',
                position: 'relative',
                zIndex: 1,
                filter: 'drop-shadow(0 0 25px rgba(100, 181, 246, 0.8))'
              }}>
                {module.tests}
              </div>
              <p style={{ 
                color: '#b0bec5',
                fontSize: '0.95rem',
                position: 'relative',
                zIndex: 1,
                textShadow: '0 2px 10px rgba(0,0,0,0.8)'
              }}>
                {language === 'es' ? 'análisis disponibles' : 'analyses available'}
              </p>
            </div>
          ))}
        </div>

        <h2 style={{ 
          fontSize: '2.3rem', 
          textAlign: 'center', 
          color: '#64b5f6', 
          marginBottom: '2.5rem', 
          textTransform: 'uppercase', 
          letterSpacing: '3px',
          textShadow: '0 0 30px rgba(100, 181, 246, 0.6)',
          fontWeight: 'bold'
        }}>
          {language === 'es' ? 'Todos los Servicios' : 'All Services'}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
          {allServices.map((service, index) => (
            <div
              key={service.route}
              onClick={() => { audioSystem.playClick(); navigate(service.route); }}
              style={{
                background: 'linear-gradient(135deg, rgba(45, 55, 72, 0.9) 0%, rgba(26, 32, 46, 0.95) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1.5px solid rgba(100, 181, 246, 0.25)',
                borderRadius: '20px',
                padding: '2.5rem 1.5rem',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(100, 181, 246, 0.15)',
                position: 'relative',
                animation: `float-card-small ${2.5 + index * 0.3}s ease-in-out infinite`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-15px) scale(1.08) rotateZ(5deg)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(100, 181, 246, 0.6), 0 0 50px rgba(100, 181, 246, 0.7)';
                e.currentTarget.style.borderColor = '#64b5f6';
                audioSystem.playHover();
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1) rotateZ(0deg)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(100, 181, 246, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(100, 181, 246, 0.25)';
              }}
            >
              <div style={{ 
                fontSize: '3.5rem', 
                marginBottom: '0.8rem', 
                filter: 'drop-shadow(0 0 20px rgba(100, 181, 246, 0.8))',
                animation: 'float-icon-small-sharp 3s ease-in-out infinite'
              }}>
                {service.icon}
              </div>
              <h4 style={{ 
                fontSize: '1.15rem', 
                color: '#fff', 
                fontWeight: '600',
                textShadow: '0 0 15px rgba(100, 181, 246, 0.5)'
              }}>
                {service.name}
              </h4>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes float-blue {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.2; }
          50% { transform: translate(60px, -60px) rotate(180deg); opacity: 0.5; }
        }
        @keyframes sparkle-silver {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes glow-pulse-blue {
          0% { filter: drop-shadow(0 0 20px rgba(100, 181, 246, 0.4)) drop-shadow(0 0 40px rgba(224, 224, 224, 0.2)); }
          100% { filter: drop-shadow(0 0 30px rgba(100, 181, 246, 0.6)) drop-shadow(0 0 50px rgba(224, 224, 224, 0.3)); }
        }
        @keyframes shimmer-bg {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float-title {
          0%, 100% { transform: perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px) scale(1); }
          50% { transform: perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(-10px) scale(1); }
        }
        @keyframes float-card {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-card-small {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes rotate-border-sharp {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse-halo-sharp {
          0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.3); }
        }
        @keyframes shine-sweep-sharp {
          0% { transform: translateX(-150%) translateY(-150%) rotate(45deg); }
          100% { transform: translateX(150%) translateY(150%) rotate(45deg); }
        }
        @keyframes float-icon-sharp {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes float-icon-small-sharp {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
};

export default HomePage;


