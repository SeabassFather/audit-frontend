import React from 'react';

const AuditDNALogo = ({ size = 'medium', className = '' }) => {
  const sizes = {
    small: { width: 24, height: 24, text: 'text-sm' },
    medium: { width: 40, height: 40, text: 'text-lg' },
    large: { width: 60, height: 60, text: 'text-xl' }
  };

  const { width, height, text } = sizes[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div 
        className="flex items-center justify-center rounded-lg font-bold text-white"
        style={{
          width: width,
          height: height,
          background: 'linear-gradient(135deg, #87CEEB 0%, #32CD32 100%)',
          boxShadow: '0 4px 8px rgba(50, 205, 50, 0.3)'
        }}
      >
        <span className={`${text} font-extrabold`}>A</span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-primary">AuditDNA</span>
        {size !== 'small' && (
          <span className="text-xs text-medium opacity-75">Professional Audit Platform</span>
        )}
      </div>
    </div>
  );
};

export default AuditDNALogo;