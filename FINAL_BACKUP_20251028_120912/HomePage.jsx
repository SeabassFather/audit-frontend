import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuditDNAHeader from './AuditDNAHeader';
import audioSystem from './audioSystem';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
    }}>
      
      {/* BADASS 3D HEADER */}
      <AuditDNAHeader />

      {/* Module Cards */}
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
          Select Testing Module
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          <ModuleCard icon="" title="AG Sciences" tests="220" color="#10b981" path="/ag" />
          <ModuleCard icon="" title="Water Testing" tests="50" color="#06b6d4" path="/water" />
          <ModuleCard icon="" title="Soil Analysis" tests="40" color="#10b981" path="/soil" />
          <ModuleCard icon="" title="Fuel & Oil" tests="30" color="#8b5cf6" path="/fuel" />
          <ModuleCard icon="" title="Engine Performance" tests="20" color="#f97316" path="/engine" />
          <ModuleCard icon="" title="Alcohol Testing" tests="25" color="#ec4899" path="/alcohol" />
          <ModuleCard icon="" title="AI Analysis" tests="500+" color="#be185d" path="/ai" />
          <ModuleCard icon="" title="Testing Hub" tests="165" color="#f59e0b" path="/testing" />
          <ModuleCard icon="" title="Lab Dashboard" tests="" color="#06b6d4" path="/lab" />
          <ModuleCard icon="" title="Traceability" tests="" color="#047857" path="/traceability" />
        </div>
      </div>
    </div>
  );
};

const ModuleCard = ({ icon, title, tests, color, path }) => {
  const navigate = useNavigate();
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
