// ====================================
// WATER TECH MODULE - FULLY INTEGRATED
// With SearchableTestSelector + Traceability
// Author: SeabassFather (SG)
// Date: 2025-10-27 22:49:18 UTC
// ====================================

import React, { useState } from "react";
import SearchableTestSelector from './SearchableTestSelector';
import TraceabilityTracker from './TraceabilityTracker';
import FieldConditionsLogger from './FieldConditionsLogger';
import FileUploadComponent from './FileUploadComponent';
import ContactCardComponent from './ContactCardComponent';
import BillingComponent from './BillingComponent';
import QRCodeComponent from './QRCodeComponent';
import { waterTestCatalog } from './waterTestCatalog';
import { useLanguage } from './LanguageContext';

export default function WaterTechModuleAdvanced() {
  const [step, setStep] = useState(1);
  const [contactInfo, setContactInfo] = useState(null);
  const [selectedTests, setSelectedTests] = useState([]);
  const [locationData, setLocationData] = useState(null);
  const [fieldConditions, setFieldConditions] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [paymentData, setPaymentData] = useState(null);
  const { t, language } = useLanguage();

  return (
    <div style={{padding: '40px', background: '#0f172a', minHeight: '100vh', color: 'white'}}>
      <h1 style={{fontSize: '2.5rem', color: '#06b6d4', marginBottom: '30px'}}>
        💧 {language === 'es' ? 'Análisis de Calidad del Agua' : 'Water Quality Analysis'}
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
          {num: 1, label: language === 'es' ? 'Contacto' : 'Contact', icon: '📋'},
          {num: 2, label: language === 'es' ? 'Pruebas' : 'Tests', icon: '🔬'},
          {num: 3, label: language === 'es' ? 'Ubicación' : 'Location', icon: '📍'},
          {num: 4, label: language === 'es' ? 'Condiciones' : 'Conditions', icon: '🌡️'},
          {num: 5, label: language === 'es' ? 'Cargar' : 'Upload', icon: '📤'},
          {num: 6, label: language === 'es' ? 'Pago' : 'Payment', icon: '💳'},
          {num: 7, label: language === 'es' ? 'QR' : 'QR Code', icon: '📱'}
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
              background: step >= s.num ? '#06b6d4' : '#334155',
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
              color: step >= s.num ? '#06b6d4' : '#64748b',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* STEP 1: CONTACT */}
      {step === 1 && (
        <ContactCardComponent 
          onContactSubmit={(data) => {
            setContactInfo(data); 
            setStep(2);
          }} 
          moduleType="water" 
        />
      )}

      {/* STEP 2: SEARCHABLE TEST SELECTOR */}
      {step === 2 && (
        <>
          <SearchableTestSelector
            testCatalog={waterTestCatalog}
            onSelectionChange={(tests) => setSelectedTests(tests)}
            moduleType="water"
            color="#06b6d4"
          />
          <button
            onClick={() => {
              if (selectedTests.length === 0) {
                alert(language === 'es' ? '⚠️ Seleccione al menos una prueba!' : '⚠️ Please select at least one test!');
                return;
              }
              setStep(3);
            }}
            style={{
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: '700',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            {language === 'es' ? '✅ Continuar a Ubicación' : '✅ Continue to Location'}
          </button>
        </>
      )}

      {/* STEP 3: TRACEABILITY */}
      {step === 3 && (
        <TraceabilityTracker
          sampleType="water"
          onLocationSubmit={(data) => {
            setLocationData(data);
            setStep(4);
          }}
        />
      )}

      {/* STEP 4: FIELD CONDITIONS */}
      {step === 4 && (
        <FieldConditionsLogger
          sampleType="water"
          onConditionsSubmit={(data) => {
            setFieldConditions(data);
            setStep(5);
          }}
        />
      )}

      {/* STEP 5: FILE UPLOAD */}
      {step === 5 && (
        <FileUploadComponent 
          onUploadComplete={(data) => {
            setUploadedFiles(data.files || []); 
            setStep(6);
          }} 
          moduleType="water" 
        />
      )}

      {/* STEP 6: BILLING */}
      {step === 6 && (
        <BillingComponent 
          contactInfo={contactInfo}
          selectedTests={selectedTests}
          testCatalog={waterTestCatalog}
          uploadedFiles={uploadedFiles}
          moduleType="water"
          onPaymentComplete={(data) => {
            setPaymentData(data); 
            setStep(7);
          }}
        />
      )}

      {/* STEP 7: QR CODE */}
      {step === 7 && (
        <div>
          <QRCodeComponent 
            data={`AUDITDNA-WATER-${paymentData?.transactionId}-${locationData?.traceabilityID}`}
            orderInfo={{
              orderId: paymentData?.transactionId,
              traceabilityID: locationData?.traceabilityID,
              moduleType: 'Water Analysis',
              customerName: contactInfo?.fullName,
              email: contactInfo?.email,
              farmName: locationData?.farmName,
              fieldNumber: locationData?.fieldNumber,
              gps: `${locationData?.latitude}, ${locationData?.longitude}`,
              testsSelected: selectedTests.length,
              sampleConditions: {
                waterTemp: fieldConditions?.waterTemp,
                airTemp: fieldConditions?.airTemp,
                timestamp: fieldConditions?.timestamp
              }
            }}
          />
          <div style={{
            background: '#1e293b',
            padding: '30px',
            borderRadius: '16px',
            marginTop: '30px',
            textAlign: 'center'
          }}>
            <h2 style={{color: '#10b981', marginBottom: '20px'}}>
              ✅ {language === 'es' ? '¡Análisis Completo!' : 'Analysis Complete!'}
            </h2>
            <div style={{fontSize: '4rem', marginBottom: '15px'}}>💧</div>
            <p style={{color: '#94a3b8', fontSize: '1.1rem', marginBottom: '20px'}}>
              {language === 'es' 
                ? `${selectedTests.length} pruebas ordenadas para ${locationData?.farmName} - Campo ${locationData?.fieldNumber}`
                : `${selectedTests.length} tests ordered for ${locationData?.farmName} - Field ${locationData?.fieldNumber}`
              }
            </p>
            <div style={{
              background: '#0f172a',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '20px'
            }}>
              <div style={{color: '#06b6d4', fontWeight: '700', marginBottom: '10px'}}>
                {language === 'es' ? 'ID de Trazabilidad:' : 'Traceability ID:'}
              </div>
              <div style={{color: '#10b981', fontSize: '1.2rem', fontFamily: 'monospace'}}>
                {locationData?.traceabilityID}
              </div>
            </div>
            <button 
              onClick={() => window.print()} 
              style={{
                padding: '14px 32px',
                background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                border: 'none',
                borderRadius: '10px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '700',
                cursor: 'pointer',
                marginRight: '15px'
              }}
            >
              📄 {language === 'es' ? 'Descargar Reporte' : 'Download Report'}
            </button>
            <button 
              onClick={() => {
                setStep(1); 
                setSelectedTests([]);
                setLocationData(null);
                setFieldConditions(null);
              }} 
              style={{
                padding: '14px 32px',
                background: '#334155',
                border: '2px solid #06b6d4',
                borderRadius: '10px',
                color: '#06b6d4',
                fontSize: '1rem',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              🔄 {language === 'es' ? 'Nuevo Análisis' : 'New Analysis'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}