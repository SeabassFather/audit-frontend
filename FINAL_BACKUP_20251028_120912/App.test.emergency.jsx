import React from 'react';

function App() {
  return (
    <div style={{
      padding: '40px',
      background: '#1e293b',
      minHeight: '100vh',
      color: 'white'
    }}>
      <h1 style={{fontSize: '3rem', color: '#06b6d4'}}>
         EMERGENCY TEST - IF YOU SEE THIS, REACT IS WORKING!
      </h1>
      
      <div style={{
        marginTop: '40px',
        padding: '30px',
        background: '#334155',
        borderRadius: '16px'
      }}>
        <h2 style={{color: '#10b981', marginBottom: '20px'}}> React is rendering!</h2>
        <p style={{fontSize: '1.2rem'}}>
          This means your React setup is working.
        </p>
        <p style={{fontSize: '1.2rem', marginTop: '20px'}}>
          Now we just need to fix the module imports.
        </p>
      </div>

      <div style={{
        marginTop: '30px',
        padding: '30px',
        background: '#334155',
        borderRadius: '16px'
      }}>
        <h3 style={{color: '#f59e0b'}}> Next Steps:</h3>
        <ol style={{fontSize: '1.1rem', lineHeight: '2'}}>
          <li>Tell SeabassFather you see this message</li>
          <li>We'll add modules one by one</li>
          <li>Test each one as we go</li>
        </ol>
      </div>

      <div style={{
        marginTop: '30px',
        padding: '30px',
        background: '#1f2937',
        borderRadius: '16px',
        border: '3px solid #ef4444'
      }}>
        <h3 style={{color: '#ef4444'}}> If you DON'T see this:</h3>
        <ul style={{fontSize: '1.1rem', lineHeight: '2'}}>
          <li>Check browser console (F12)</li>
          <li>Look for error messages</li>
          <li>Tell me what they say</li>
        </ul>
      </div>
    </div>
  );
}

export default App;