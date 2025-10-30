function HomePage() {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const modules = [
    { name: 'AG Science', tests: '55 tests', color: '#10b981', icon: '🌾', path: '/ag', description: 'Produce, Veggies, Fruits' },
    { name: 'AI Analysis', tests: 'Smart AI', color: '#ec4899', icon: '🤖', path: '/ai', description: 'Environmental Intelligence' },
    { name: 'Alcohol Testing', tests: '25 tests', color: '#facc15', icon: '🍷', path: '/alcohol', description: 'Purity & Safety' },
    { name: 'Billing', tests: 'Payments', color: '#10b981', icon: '💳', path: '/payment', description: 'Secure Processing' },
    { name: 'Contact', tests: 'Support', color: '#64748b', icon: '📧', path: '/contact', description: 'Get In Touch' },
    { name: 'Engine Diagnostics', tests: '20 tests', color: '#f97316', icon: '🔧', path: '/engine', description: 'Oil & Performance' },
    { name: 'Field Logger', tests: 'Live Data', color: '#f59e0b', icon: '📝', path: '/field', description: 'Real-Time Conditions' },
    { name: 'Fuel Testing', tests: '30 tests', color: '#94a3b8', icon: '⛽', path: '/fuel', description: 'Quality Control' },
    { name: 'Lab Dashboard', tests: '220 Total', color: '#3b82f6', icon: '🔬', path: '/lab', description: 'Central Hub' },
    { name: 'Results Portal', tests: 'Reports', color: '#ec4899', icon: '📊', path: '/results', description: 'Public Showcase' },
    { name: 'Soil Analysis', tests: '40 tests', color: '#4ade80', icon: '🌱', path: '/soil', description: 'NPK & Nutrients' },
    { name: 'Testing Hub', tests: 'Workflow', color: '#f97316', icon: '🧪', path: '/testing', description: 'Order Process' },
    { name: 'Traceability', tests: 'QR + GPS', color: '#10b981', icon: '📍', path: '/traceability', description: 'Chain of Custody' },
    { name: 'Water Analysis', tests: '50 tests', color: '#06b6d4', icon: '💧', path: '/water', description: 'Purity & Safety' }
  ];

  return (
    <div style={{ padding: '60px 40px', position: 'relative', overflow: 'hidden' }}>
      
      {/* FLOATING PARTICLES */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 100 + 50 + 'px',
              height: Math.random() * 100 + 50 + 'px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${['#3b82f6', '#10b981', '#06b6d4', '#facc15'][i % 4]}20, transparent)`,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `floatParticle ${10 + Math.random() * 20}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              filter: 'blur(40px)',
              transform: `translate(${(mousePos.x / window.innerWidth - 0.5) * 50}px, ${(mousePos.y / window.innerHeight - 0.5) * 50}px)`
            }}
          />
        ))}
      </div>

      <div style={{ maxWidth: '1800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* INTERACTIVE HERO SECTION - NO MORE PURPLE! */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 
            style={{ 
              fontSize: '72px', 
              fontWeight: 'bold', 
              color: 'white', 
              marginBottom: '20px',
              textShadow: '0 0 40px rgba(59, 130, 246, 0.8), 0 0 80px rgba(6, 182, 212, 0.6), 0 4px 8px rgba(0,0,0,0.5)',
              background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #10b981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'floatTitle 4s ease-in-out infinite, shimmerGradient 3s ease-in-out infinite',
              transform: `perspective(1000px) rotateX(${(mousePos.y / window.innerHeight - 0.5) * 15}deg) rotateY(${(mousePos.x / window.innerWidth - 0.5) * 15}deg) translateZ(50px)`,
              transition: 'transform 0.1s ease-out',
              cursor: 'pointer',
              letterSpacing: '2px'
            }}
            onMouseEnter={(e) => {
              audioSystem.playHover();
              e.currentTarget.style.transform = 'perspective(1000px) scale(1.05) translateZ(80px)';
              e.currentTarget.style.textShadow = '0 0 60px rgba(59, 130, 246, 1), 0 0 100px rgba(6, 182, 212, 0.8), 0 8px 16px rgba(0,0,0,0.7)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = `perspective(1000px) rotateX(${(mousePos.y / window.innerHeight - 0.5) * 15}deg) rotateY(${(mousePos.x / window.innerWidth - 0.5) * 15}deg) translateZ(50px)`;
              e.currentTarget.style.textShadow = '0 0 40px rgba(59, 130, 246, 0.8), 0 0 80px rgba(6, 182, 212, 0.6), 0 4px 8px rgba(0,0,0,0.5)';
            }}
            onClick={() => audioSystem.playClick()}
          >
            AuditDNA Complete
          </h1>
          <p 
            style={{ 
              fontSize: '24px', 
              color: '#94a3b8', 
              marginBottom: '40px',
              animation: 'fadeInUp 1s ease-out 0.3s both'
            }}
          >
            220 Premium Laboratory Tests | AI-Powered Analysis | Real-Time Results
          </p>
          <div 
            style={{ 
              display: 'inline-block', 
              background: 'rgba(16,185,129,0.15)', 
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(16,185,129,0.4)', 
              borderRadius: '16px', 
              padding: '20px 40px',
              boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              animation: 'pulseGlow 3s ease-in-out infinite',
              transform: `translateY(${Math.sin(Date.now() / 1000) * 5}px)`,
              transition: 'transform 0.3s ease-out'
            }}
            onMouseEnter={(e) => {
              audioSystem.playHover();
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
            }}
          >
            <span style={{ fontSize: '18px', color: '#10b981', fontWeight: '700' }}>
              ✅ Alphabetically Organized | Fully Bilingual | 220+ Tests Available
            </span>
          </div>
        </div>

        {/* GLASS MODULE CARDS WITH PARALLAX */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
          {modules.map((module, idx) => (
            <Link key={idx} to={module.path} style={{ textDecoration: 'none' }}>
              <div 
                style={{
                  background: `linear-gradient(135deg, rgba(${hexToRgb(module.color)}, 0.15), rgba(15, 23, 42, 0.9))`,
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: `1px solid rgba(${hexToRgb(module.color)}, 0.4)`,
                  borderRadius: '24px',
                  padding: '40px',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), 0 0 40px rgba(${hexToRgb(module.color)}, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
                  animation: `slideIn 0.6s ease-out ${idx * 0.08}s both, cardFloat ${4 + (idx % 3)}s ease-in-out infinite`,
                  animationDelay: `0s, ${idx * 0.2}s`,
                  position: 'relative',
                  overflow: 'hidden',
                  transform: `translateY(${Math.sin((Date.now() / 1000) + idx) * 8}px)`
                }}
                onMouseEnter={(e) => {
                  audioSystem.playHover();
                  e.currentTarget.style.transform = 'translateY(-15px) scale(1.05) rotateX(8deg)';
                  e.currentTarget.style.boxShadow = `0 25px 70px rgba(${hexToRgb(module.color)}, 0.5), 0 0 100px rgba(${hexToRgb(module.color)}, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)`;
                  e.currentTarget.style.border = `2px solid rgba(${hexToRgb(module.color)}, 0.8)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
                  e.currentTarget.style.boxShadow = `0 8px 32px rgba(0, 0, 0, 0.3), 0 0 40px rgba(${hexToRgb(module.color)}, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)`;
                  e.currentTarget.style.border = `1px solid rgba(${hexToRgb(module.color)}, 0.4)`;
                }}
                onClick={() => audioSystem.playSwoosh()}
              >
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: `linear-gradient(45deg, transparent 40%, rgba(${hexToRgb(module.color)}, 0.2) 50%, transparent 60%)`,
                  animation: 'shimmerMove 3s ease-in-out infinite',
                  pointerEvents: 'none'
                }}></div>

                <div style={{ 
                  fontSize: '80px', 
                  textAlign: 'center', 
                  marginBottom: '20px', 
                  animation: 'iconBounce 2s ease-in-out infinite',
                  animationDelay: `${idx * 0.1}s`,
                  filter: `drop-shadow(0 0 15px ${module.color}60)`
                }}>
                  {module.icon}
                </div>
                <h3 style={{ 
                  fontSize: '24px', 
                  color: module.color, 
                  marginBottom: '10px', 
                  fontWeight: '700', 
                  textAlign: 'center',
                  textShadow: `0 0 20px ${module.color}80, 0 0 40px ${module.color}40`
                }}>
                  {module.name}
                </h3>
                <p style={{ fontSize: '18px', color: '#94a3b8', textAlign: 'center', marginBottom: '8px' }}>
                  {module.tests}
                </p>
                <p style={{ fontSize: '14px', color: '#64748b', textAlign: 'center', fontStyle: 'italic' }}>
                  {module.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ENHANCED ANIMATIONS */}
      <style>{`
        @keyframes floatTitle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes shimmerGradient {
          0%, 100% { filter: brightness(1) hue-rotate(0deg); }
          50% { filter: brightness(1.3) hue-rotate(10deg); }
        }
        @keyframes floatParticle {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          50% { transform: translate(100px, -100px) scale(1.3); opacity: 0.6; }
        }
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px) rotateZ(0deg); }
          25% { transform: translateY(-8px) rotateZ(1deg); }
          75% { transform: translateY(-8px) rotateZ(-1deg); }
        }
        @keyframes iconBounce {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.1); }
        }
        @keyframes shimmerMove {
          0% { transform: translateX(-100%) translateY(-100%); }
          100% { transform: translateX(100%) translateY(100%); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 8px 32px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1); }
          50% { box-shadow: 0 8px 32px rgba(16, 185, 129, 0.6), 0 0 60px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
