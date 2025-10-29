import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuditDNAHeader from './AuditDNAHeader';
import audioSystem from './audioSystem';
import { useLanguage } from './LanguageContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const featuredCards = [
    {
      icon: '💧',
      title: 'Water Analysis',
      titleEs: 'Análisis de Agua',
      tests: 50,
      color: '#06b6d4',
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      route: '/water'
    },
    {
      icon: '🌱',
      title: 'Soil Testing',
      titleEs: 'Pruebas de Suelo',
      tests: 40,
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      route: '/soil'
    },
    {
      icon: '⛽',
      title: 'Fuel Analysis',
      titleEs: 'Análisis de Combustible',
      tests: 30,
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      route: '/fuel'
    },
    {
      icon: '🍷',
      title: 'Alcohol Testing',
      titleEs: 'Pruebas de Alcohol',
      tests: 25,
      color: '#ec4899',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
      route: '/alcohol'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
    }}>
      
      <AuditDNAHeader />

      {/* FEATURED 4 CARDS SECTION */}
      <div style={{
        padding: '3rem 2rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          textAlign: 'center',
          color: '#10b981',
          marginBottom: '3rem'
        }}>
          {language === 'es' ? 'Módulos Destacados' : 'Featured Modules'}
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {featuredCards.map((card, idx) => (
            <FeaturedCard key={idx} card={card} language={language} navigate={navigate} />
          ))}
        </div>

        {/* ALL MODULES GRID */}
        <h2 style={{
          fontSize: '2rem',
          textAlign: 'center',
          color: '#06b6d4',
          marginBottom: '2rem'
        }}>
          {language === 'es' ? 'Todos los Módulos' : 'All Modules'}
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          <ModuleCard icon="🌾" title="AG Sciences" tests="220" color="#10b981" path="/ag" navigate={navigate} />
          <ModuleCard icon="💧" title="Water Testing" tests="50" color="#06b6d4" path="/water" navigate={navigate} />
          <ModuleCard icon="🌱" title="Soil Analysis" tests="40" color="#10b981" path="/soil" navigate={navigate} />
          <ModuleCard icon="⛽" title="Fuel & Oil" tests="30" color="#8b5cf6" path="/fuel" navigate={navigate} />
          <ModuleCard icon="🔧" title="Engine Performance" tests="20" color="#f97316" path="/engine" navigate={navigate} />
          <ModuleCard icon="🍷" title="Alcohol Testing" tests="25" color="#ec4899" path="/alcohol" navigate={navigate} />
          <ModuleCard icon="🤖" title="AI Analysis" tests="500+" color="#be185d" path="/ai" navigate={navigate} />
          <ModuleCard icon="🧪" title="Testing Hub" tests="165" color="#f59e0b" path="/testing" navigate={navigate} />
          <ModuleCard icon="🔬" title="Lab Dashboard" tests="" color="#06b6d4" path="/lab" navigate={navigate} />
          <ModuleCard icon="📍" title="Traceability" tests="" color="#047857" path="/traceability" navigate={navigate} />
          <ModuleCard icon="📝" title="Field Logger" tests="" color="#0ea5e9" path="/field" navigate={navigate} />
          <ModuleCard icon="📊" title="Results Portal" tests="" color="#8b5cf6" path="/results" navigate={navigate} />
        </div>
      </div>
    </div>
  );
};

const FeaturedCard = ({ card, language, navigate }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      onClick={() => {
        audioSystem.playClick();
        navigate(card.route);
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        audioSystem.playHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered
          ? `${card.gradient}, rgba(30, 41, 59, 0.8)`
          : 'rgba(30, 41, 59, 0.6)',
        backdropFilter: 'blur(20px)',
        border: `3px solid ${isHovered ? card.color : 'rgba(100, 116, 139, 0.3)'}`,
        borderRadius: '25px',
        padding: '3rem 2rem',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transform: isHovered ? 'translateY(-15px) scale(1.05)' : 'translateY(0) scale(1)',
        boxShadow: isHovered 
          ? `0 25px 60px ${card.color}60, inset 0 0 40px ${card.color}20`
          : '0 10px 30px rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated glow effect */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: `radial-gradient(circle, ${card.color}30 0%, transparent 70%)`,
          animation: 'pulse 2s ease-in-out infinite'
        }} />
      )}

      <div style={{ 
        fontSize: '5rem', 
        marginBottom: '1.5rem',
        filter: isHovered ? `drop-shadow(0 0 20px ${card.color})` : 'none',
        transition: 'all 0.3s ease',
        position: 'relative',
        zIndex: 1
      }}>
        {card.icon}
      </div>
      
      <h3 style={{ 
        fontSize: '2rem', 
        color: isHovered ? card.color : '#fff', 
        marginBottom: '1rem',
        fontWeight: 'bold',
        transition: 'all 0.3s ease',
        textShadow: isHovered ? `0 0 20px ${card.color}80` : 'none',
        position: 'relative',
        zIndex: 1
      }}>
        {language === 'es' ? card.titleEs : card.title}
      </h3>

      <div style={{
        fontSize: '3rem',
        fontWeight: 'bold',
        color: card.color,
        marginBottom: '0.5rem',
        textShadow: `0 0 20px ${card.color}60`,
        position: 'relative',
        zIndex: 1
      }}>
        {card.tests}
      </div>

      <p style={{ 
        color: '#94a3b8', 
        fontSize: '1rem',
        position: 'relative',
        zIndex: 1
      }}>
        {language === 'es' ? 'pruebas disponibles' : 'tests available'}
      </p>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.3; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

const ModuleCard = ({ icon, title, tests, color, path, navigate }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      onClick={() => {
        audioSystem.playClick();
        navigate(path);
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        audioSystem.playHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered
          ? `linear-gradient(135deg, ${color}30 0%, ${color}15 100%)`
          : 'rgba(30, 41, 59, 0.6)',
        backdropFilter: 'blur(10px)',
        border: `2px solid ${isHovered ? color : 'rgba(100, 116, 139, 0.3)'}`,
        borderRadius: '20px',
        padding: '2rem',
        cursor: 'pointer',
        transition: 'all 0.4s ease',
        transform: isHovered ? 'translateY(-10px) scale(1.05)' : 'translateY(0) scale(1)',
        boxShadow: isHovered 
          ? `0 20px 50px ${color}60`
          : '0 10px 30px rgba(0, 0, 0, 0.3)',
        textAlign: 'center'
      }}
    >
      <div style={{ 
        fontSize: '4rem', 
        marginBottom: '1rem',
        filter: isHovered ? `drop-shadow(0 0 20px ${color})` : 'none',
        transition: 'all 0.3s ease'
      }}>
        {icon}
      </div>
      <h3 style={{ 
        fontSize: '1.5rem', 
        color: isHovered ? color : '#fff', 
        marginBottom: '0.5rem',
        fontWeight: 'bold',
        transition: 'all 0.3s ease'
      }}>
        {title}
      </h3>
      {tests && (
        <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
          {tests} tests
        </p>
      )}
    </div>
  );
};

export default HomePage;
