import React from 'react';

export default function BadassProgressSteps({ currentStep, steps, color = '#06b6d4' }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '40px',
      padding: '20px',
      background: '#1e293b',
      borderRadius: '12px',
      gap: '10px'
    }}>
      {steps.map((s, index) => {
        const isActive = currentStep === s.num;
        const isCompleted = currentStep > s.num;

        return (
          <React.Fragment key={s.num}>
            <div style={{
              flex: 1,
              textAlign: 'center',
              opacity: isCompleted || isActive ? 1 : 0.4,
              transition: 'all 0.3s'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: isActive ? color : isCompleted ? '#10b981' : '#334155',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 10px',
                fontSize: '1.5rem',
                boxShadow: isActive ? `0 0 20px ${color}` : 'none',
                transition: 'all 0.3s'
              }}>
                {s.icon}
              </div>
              <div style={{
                color: isActive ? color : isCompleted ? '#10b981' : '#64748b',
                fontWeight: '600',
                fontSize: '0.9rem',
                textTransform: 'uppercase'
              }}>
                {s.label}
              </div>
            </div>
            
            {index < steps.length - 1 && (
              <div style={{
                width: '40px',
                height: '3px',
                background: isCompleted ? color : '#334155',
                transition: 'all 0.3s'
              }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}