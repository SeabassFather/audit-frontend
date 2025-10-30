import React, { useState } from "react";
import axios from "axios";
import FileUploadComponent from './FileUploadComponent';
import ContactCardComponent from './ContactCardComponent';
import BillingComponent from './BillingComponent';
import QRCodeComponent from './QRCodeComponent';

export default function TestingServicesHub() {
  const [step, setStep] = useState(1);
  const [contactInfo, setContactInfo] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [paymentData, setPaymentData] = useState(null);
  const [selectedTests, setSelectedTests] = useState([]);
  const [orderData, setOrderData] = useState({
    sampleType: "",
    urgency: "standard",
    shippingAddress: "",
    specialInstructions: ""
  });
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const [loading, setLoading] = useState(false);

  const testPackages = [
    {
      id: 'basic-water',
      name: 'Basic Water Test',
      price: 45,
      turnaround: '3-5 business days',
      tests: ['pH', 'TDS', 'Turbidity', 'Temperature'],
      description: 'Essential water quality parameters for general use'
    },
    {
      id: 'ag-water',
      name: 'Agricultural Water Panel',
      price: 125,
      turnaround: '5-7 business days',
      tests: ['pH', 'TDS', 'Nitrate', 'Turbidity', 'Salinity', 'Heavy Metals', 'Bacteria'],
      description: 'Complete irrigation water analysis for crop production'
    },
    {
      id: 'drinking-water',
      name: 'Drinking Water Safety',
      price: 175,
      turnaround: '5-7 business days',
      tests: ['pH', 'TDS', 'Nitrate', 'Lead', 'Turbidity', 'Coliform/E.coli', 'Chlorine'],
      description: 'EPA-compliant drinking water testing'
    },
    {
      id: 'soil-basic',
      name: 'Basic Soil Test',
      price: 65,
      turnaround: '4-6 business days',
      tests: ['pH', 'NPK', 'Organic Matter', 'Salinity'],
      description: 'Essential soil fertility analysis'
    },
    {
      id: 'soil-complete',
      name: 'Complete Soil Panel',
      price: 150,
      turnaround: '7-10 business days',
      tests: ['pH', 'NPK', 'Micronutrients', 'CEC', 'Organic Matter', 'Salinity', 'Heavy Metals'],
      description: 'Comprehensive soil health and fertility testing'
    },
    {
      id: 'fuel-analysis',
      name: 'Fuel Quality Analysis',
      price: 185,
      turnaround: '5-7 business days',
      tests: ['Viscosity', 'Water Content', 'Particulates', 'Sulfur', 'Cetane Number', 'Flash Point'],
      description: 'ASTM-compliant fuel quality testing'
    }
  ];

  const toggleTest = (testId) => {
    if (selectedTests.includes(testId)) {
      setSelectedTests(selectedTests.filter(id => id !== testId));
    } else {
      setSelectedTests([...selectedTests, testId]);
    }
  };

  const handlePlaceOrder = async () => {
    if (selectedTests.length === 0) {
      alert('Please select at least one test package');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8001/api/testing/order", {
        contactInfo,
        selectedTests,
        orderData,
        uploadedFiles: uploadedFiles.map(f => f.filename)
      });
      setOrderConfirmation(response.data);
      setStep(3);
    } catch (err) {
      console.error(err);
      alert("Order error. Check backend!");
    }
    setLoading(false);
  };

  const calculateTotal = () => {
    return selectedTests.reduce((total, testId) => {
      const test = testPackages.find(t => t.id === testId);
      return total + (test ? test.price : 0);
    }, 0);
  };

  return (
    <div style={{padding: '40px', background: '#0f172a', minHeight: '100vh', color: 'white'}}>
      <h1 style={{fontSize: '2.5rem', color: '#3b82f6', marginBottom: '30px'}}>
        🔬 Professional Testing Services
      </h1>

      {/* PROGRESS STEPS */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '40px',
        padding: '20px',
        background: '#1e293b',
        borderRadius: '12px'
      }}>
        {[
          {num: 1, label: 'Contact', icon: '📋'},
          {num: 2, label: 'Select Tests', icon: '🔬'},
          {num: 3, label: 'Upload Samples', icon: '📤'},
          {num: 4, label: 'Payment', icon: '💳'},
          {num: 5, label: 'QR Code', icon: '📱'}
        ].map(s => (
          <div key={s.num} style={{
            textAlign: 'center',
            opacity: step >= s.num ? 1 : 0.4,
            flex: 1
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: step >= s.num ? '#3b82f6' : '#334155',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 10px',
              fontSize: '1.5rem',
              transition: 'all 0.3s'
            }}>
              {s.icon}
            </div>
            <div style={{
              color: step >= s.num ? '#3b82f6' : '#64748b',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* STEP 1: Contact */}
      {step === 1 && <ContactCardComponent onContactSubmit={(data) => {setContactInfo(data); setStep(2);}} moduleType="testing" />}

      {/* STEP 2: Select Tests */}
      {step === 2 && (
        <div>
          <div style={{
            background: 'rgba(59, 130, 246, 0.1)',
            border: '2px solid #3b82f6',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            <h2 style={{color: '#3b82f6', marginBottom: '10px'}}>🏆 ISO 17025 Certified Testing</h2>
            <p style={{color: '#94a3b8', marginBottom: '15px'}}>
              Laboratory-Grade Analysis for Agriculture, Industry & Environment
            </p>
            <div style={{display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap'}}>
              <span style={{padding: '6px 12px', background: '#0f172a', borderRadius: '6px', color: '#3b82f6', fontSize: '0.9rem'}}>Fast Turnaround</span>
              <span style={{padding: '6px 12px', background: '#0f172a', borderRadius: '6px', color: '#3b82f6', fontSize: '0.9rem'}}>International Shipping</span>
              <span style={{padding: '6px 12px', background: '#0f172a', borderRadius: '6px', color: '#3b82f6', fontSize: '0.9rem'}}>Flexible Payment</span>
            </div>
          </div>

          <h2 style={{color: '#10b981', marginBottom: '20px'}}>Select Test Packages</h2>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '25px', marginBottom: '30px'}}>
            {testPackages.map(test => (
              <div 
                key={test.id}
                onClick={() => toggleTest(test.id)}
                style={{
                  background: selectedTests.includes(test.id) ? 'rgba(59, 130, 246, 0.2)' : '#1e293b',
                  padding: '25px',
                  borderRadius: '16px',
                  border: `2px solid ${selectedTests.includes(test.id) ? '#3b82f6' : '#334155'}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px'}}>
                  <h3 style={{color: '#3b82f6', fontSize: '1.3rem', flex: 1}}>{test.name}</h3>
                  <div style={{
                    background: '#10b981',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontWeight: '800',
                    fontSize: '1.2rem'
                  }}>
                    ${test.price}
                  </div>
                </div>

                <p style={{color: '#94a3b8', marginBottom: '15px', lineHeight: '1.5'}}>
                  {test.description}
                </p>

                <div style={{display: 'flex', gap: '15px', marginBottom: '15px', fontSize: '0.9rem'}}>
                  <span style={{color: '#64748b'}}>⏱️ {test.turnaround}</span>
                  <span style={{color: '#64748b'}}>🧪 {test.tests.length} Tests</span>
                </div>

                <div style={{
                  background: '#0f172a',
                  padding: '15px',
                  borderRadius: '8px',
                  marginBottom: '15px'
                }}>
                  <div style={{color: '#94a3b8', fontSize: '0.85rem', marginBottom: '8px', fontWeight: '600'}}>
                    Tests Included:
                  </div>
                  <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
                    {test.tests.map((t, i) => (
                      <span key={i} style={{
                        background: '#1e293b',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        color: '#06b6d4'
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{
                  textAlign: 'center',
                  padding: '10px',
                  background: selectedTests.includes(test.id) ? '#3b82f6' : '#334155',
                  borderRadius: '8px',
                  fontWeight: '700',
                  color: 'white'
                }}>
                  {selectedTests.includes(test.id) ? '✓ Selected' : 'Click to Select'}
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          {selectedTests.length > 0 && (
            <div style={{
              background: '#1e293b',
              padding: '25px',
              borderRadius: '16px',
              border: '2px solid #3b82f6',
              marginBottom: '30px'
            }}>
              <h3 style={{color: '#3b82f6', marginBottom: '15px'}}>Order Summary</h3>
              {selectedTests.map(testId => {
                const test = testPackages.find(t => t.id === testId);
                return (
                  <div key={testId} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px 0',
                    borderBottom: '1px solid #334155'
                  }}>
                    <span style={{color: '#e2e8f0'}}>{test.name}</span>
                    <span style={{color: '#10b981', fontWeight: '700'}}>${test.price}</span>
                  </div>
                );
              })}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '15px 0',
                marginTop: '10px',
                borderTop: '2px solid #3b82f6'
              }}>
                <span style={{color: '#3b82f6', fontSize: '1.3rem', fontWeight: '800'}}>Total:</span>
                <span style={{color: '#10b981', fontSize: '1.8rem', fontWeight: '900'}}>${calculateTotal()}</span>
              </div>
            </div>
          )}

          <button 
            onClick={handlePlaceOrder}
            disabled={loading || selectedTests.length === 0}
            style={{
              width: '100%',
              padding: '16px',
              background: selectedTests.length === 0 ? '#334155' : 'linear-gradient(135deg, #3b82f6, #2563eb)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: '700',
              cursor: selectedTests.length === 0 ? 'not-allowed' : 'pointer',
              opacity: selectedTests.length === 0 ? 0.5 : 1
            }}
          >
            {loading ? '⏳ Processing...' : `🔬 Order ${selectedTests.length} Test${selectedTests.length !== 1 ? 's' : ''} - $${calculateTotal()}`}
          </button>
        </div>
      )}

      {/* STEP 3: Upload */}
      {step === 3 && <FileUploadComponent onUploadComplete={(data) => {setUploadedFiles(data.files || []); setStep(4);}} moduleType="testing" />}

      {/* STEP 4: Billing */}
      {step === 4 && <BillingComponent contactInfo={contactInfo} uploadedFiles={uploadedFiles} moduleType="testing" onPaymentComplete={(data) => {setPaymentData(data); setStep(5);}} />}

      {/* STEP 5: QR Code */}
      {step === 5 && (
        <div>
          <QRCodeComponent 
            data={`AUDITDNA-TESTING-${paymentData?.transactionId}`}
            orderInfo={{
              orderId: paymentData?.transactionId,
              moduleType: 'Professional Testing',
              customerName: contactInfo?.fullName,
              email: contactInfo?.email
            }}
          />
          <div style={{background: '#1e293b', padding: '30px', borderRadius: '16px', marginTop: '30px', textAlign: 'center'}}>
            <h2 style={{color: '#10b981', marginBottom: '20px'}}>✅ Order Confirmed!</h2>
            <div style={{fontSize: '3rem', marginBottom: '15px'}}>🔬</div>
            <p style={{color: '#94a3b8', fontSize: '1.2rem', marginBottom: '20px'}}>
              Your professional testing order has been received!
            </p>
            <div style={{
              background: '#0f172a',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '20px'
            }}>
              <div style={{marginBottom: '15px'}}>
                <span style={{color: '#94a3b8'}}>Order ID: </span>
                <span style={{color: '#3b82f6', fontWeight: '700'}}>{orderConfirmation?.orderId || paymentData?.transactionId}</span>
              </div>
              <div style={{marginBottom: '15px'}}>
                <span style={{color: '#94a3b8'}}>Tests Ordered: </span>
                <span style={{color: '#e2e8f0', fontWeight: '700'}}>{selectedTests.length}</span>
              </div>
              <div style={{marginBottom: '15px'}}>
                <span style={{color: '#94a3b8'}}>Estimated Completion: </span>
                <span style={{color: '#10b981', fontWeight: '700'}}>5-7 business days</span>
              </div>
            </div>
            <p style={{color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6'}}>
              📧 Sample collection kit and shipping instructions have been emailed to {contactInfo?.email}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}