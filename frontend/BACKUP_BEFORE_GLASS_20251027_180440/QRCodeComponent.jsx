import React, { useEffect, useRef } from 'react';

export default function QRCodeComponent({ 
  data, 
  size = 256,
  orderInfo = {},
  showDetails = true 
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && data) {
      generateQRCode(data);
    }
  }, [data]);

  const generateQRCode = (text) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, size, size);
    
    // Simple QR code simulation (in production, use a proper QR library)
    // For now, we'll create a visually similar pattern
    const cellSize = size / 25;
    const data = text.split('').map(c => c.charCodeAt(0));
    
    ctx.fillStyle = 'black';
    
    // Create QR-like pattern
    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        const seed = (data[i % data.length] + data[j % data.length]) % 256;
        if (seed > 128) {
          ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
      }
    }
    
    // Add positioning squares (QR code corners)
    drawPositioningSquare(ctx, 0, 0, cellSize * 7);
    drawPositioningSquare(ctx, size - cellSize * 7, 0, cellSize * 7);
    drawPositioningSquare(ctx, 0, size - cellSize * 7, cellSize * 7);
    
    // Add center logo placeholder
    const centerSize = cellSize * 5;
    const centerX = (size - centerSize) / 2;
    const centerY = (size - centerSize) / 2;
    ctx.fillStyle = 'white';
    ctx.fillRect(centerX, centerY, centerSize, centerSize);
    ctx.fillStyle = '#06b6d4';
    ctx.fillRect(centerX + 5, centerY + 5, centerSize - 10, centerSize - 10);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('DNA', size / 2, size / 2);
  };

  const drawPositioningSquare = (ctx, x, y, size) => {
    ctx.fillStyle = 'black';
    ctx.fillRect(x, y, size, size);
    ctx.fillStyle = 'white';
    ctx.fillRect(x + size * 0.14, y + size * 0.14, size * 0.72, size * 0.72);
    ctx.fillStyle = 'black';
    ctx.fillRect(x + size * 0.28, y + size * 0.28, size * 0.44, size * 0.44);
  };

  const downloadQR = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `AuditDNA-QR-${orderInfo.orderId || 'order'}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const printQR = () => {
    const canvas = canvasRef.current;
    const win = window.open('', '_blank');
    win.document.write(`
      <html>
        <head>
          <title>AuditDNA Order QR Code</title>
          <style>
            body { 
              margin: 0; 
              padding: 40px; 
              font-family: Arial, sans-serif;
              text-align: center;
            }
            .qr-container {
              border: 3px solid #06b6d4;
              padding: 30px;
              display: inline-block;
              border-radius: 12px;
            }
            h1 { color: #06b6d4; }
            .order-info {
              margin-top: 20px;
              text-align: left;
              max-width: 400px;
              margin-left: auto;
              margin-right: auto;
            }
            .info-row {
              display: flex;
              justify-content: space-between;
              padding: 8px 0;
              border-bottom: 1px solid #ddd;
            }
            @media print {
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="qr-container">
            <h1>🌍 AuditDNA Order</h1>
            <img src="${canvas.toDataURL()}" style="display: block; margin: 20px auto;" />
            <div class="order-info">
              <div class="info-row">
                <strong>Order ID:</strong>
                <span>${orderInfo.orderId || 'N/A'}</span>
              </div>
              <div class="info-row">
                <strong>Service:</strong>
                <span>${orderInfo.moduleType || 'N/A'}</span>
              </div>
              <div class="info-row">
                <strong>Date:</strong>
                <span>${new Date().toLocaleDateString()}</span>
              </div>
              <div class="info-row">
                <strong>Customer:</strong>
                <span>${orderInfo.customerName || 'N/A'}</span>
              </div>
            </div>
            <p style="margin-top: 30px; color: #666; font-size: 14px;">
              Scan this QR code to track your order and view results
            </p>
          </div>
          <button onclick="window.print()" style="
            margin-top: 30px;
            padding: 12px 30px;
            background: #06b6d4;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
          ">Print QR Code</button>
        </body>
      </html>
    `);
    win.document.close();
    setTimeout(() => win.print(), 500);
  };

  return (
    <div style={{
      background: '#1e293b',
      padding: '30px',
      borderRadius: '16px',
      border: '2px solid #06b6d4',
      textAlign: 'center'
    }}>
      <div style={{fontSize: '3rem', marginBottom: '15px'}}>📱</div>
      <h3 style={{color: '#06b6d4', marginBottom: '20px', fontSize: '1.5rem'}}>
        Your Order QR Code
      </h3>
      
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        display: 'inline-block',
        marginBottom: '20px'
      }}>
        <canvas 
          ref={canvasRef} 
          width={size} 
          height={size}
          style={{display: 'block'}}
        />
      </div>

      {showDetails && orderInfo && (
        <div style={{
          background: '#0f172a',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '20px',
          textAlign: 'left'
        }}>
          <h4 style={{color: '#94a3b8', marginBottom: '15px'}}>Order Details</h4>
          <div style={{display: 'grid', gap: '10px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #334155'}}>
              <span style={{color: '#94a3b8'}}>Order ID:</span>
              <span style={{color: '#e2e8f0', fontWeight: '700'}}>{orderInfo.orderId}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #334155'}}>
              <span style={{color: '#94a3b8'}}>Service:</span>
              <span style={{color: '#e2e8f0', fontWeight: '700', textTransform: 'capitalize'}}>{orderInfo.moduleType}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #334155'}}>
              <span style={{color: '#94a3b8'}}>Date:</span>
              <span style={{color: '#e2e8f0', fontWeight: '700'}}>{new Date().toLocaleDateString()}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #334155'}}>
              <span style={{color: '#94a3b8'}}>Customer:</span>
              <span style={{color: '#e2e8f0', fontWeight: '700'}}>{orderInfo.customerName}</span>
            </div>
            {orderInfo.email && (
              <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #334155'}}>
                <span style={{color: '#94a3b8'}}>Email:</span>
                <span style={{color: '#e2e8f0', fontWeight: '700'}}>{orderInfo.email}</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div style={{
        background: 'rgba(6, 182, 212, 0.1)',
        border: '2px solid #06b6d4',
        borderRadius: '12px',
        padding: '15px',
        marginBottom: '20px'
      }}>
        <p style={{color: '#06b6d4', margin: 0, lineHeight: '1.6'}}>
          📱 <strong>Scan this QR code</strong> to track your order status, view results, and download reports. 
          QR code has been emailed to you.
        </p>
      </div>

      <div style={{display: 'flex', gap: '15px', justifyContent: 'center'}}>
        <button
          onClick={downloadQR}
          style={{
            padding: '14px 28px',
            background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
            border: 'none',
            borderRadius: '10px',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>💾</span>
          Download QR
        </button>

        <button
          onClick={printQR}
          style={{
            padding: '14px 28px',
            background: '#334155',
            border: '2px solid #06b6d4',
            borderRadius: '10px',
            color: '#06b6d4',
            fontSize: '1rem',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>🖨️</span>
          Print QR
        </button>
      </div>

      <p style={{
        color: '#64748b',
        fontSize: '0.85rem',
        marginTop: '20px',
        lineHeight: '1.6'
      }}>
        Keep this QR code safe. You'll need it to access your results and track your order.
        A copy has been sent to your email.
      </p>
    </div>
  );
}