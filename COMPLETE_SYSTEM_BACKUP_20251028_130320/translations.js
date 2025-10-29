// AuditDNA Supreme - Complete Translations
export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      lab: 'Lab Dashboard',
      water: 'Water Testing',
      soil: 'Soil Analysis',
      alcohol: 'Alcohol Analysis',
      fuel: 'Fuel Testing',
      engine: 'Engine Diagnostics',
      traceability: 'Traceability',
      field: 'Field Logger',
      ai: 'AI Analysis',
      results: 'Results Portal',
      testing: 'Testing Hub',
      contact: 'Contact',
      payment: 'Payment'
    },
    
    // Home Page
    home: {
      title: 'Welcome to AuditDNA',
      subtitle: 'Professional Agricultural & Environmental Analysis Platform',
      tagline: '165 Premium Tests | Real-Time Results | AI-Powered Insights | QR Tracking',
      modules: {
        lab: { title: 'Lab Dashboard', desc: 'Manage orders, track samples, analytics' },
        water: { title: 'Water Testing', desc: '50 tests - pH, TDS, bacteria, metals, compliance' },
        soil: { title: 'Soil Analysis', desc: '40 tests - NPK, pH, organic matter, fertility' },
        alcohol: { title: 'Alcohol Analysis', desc: '25 tests - purity, methanol, ethanol, beverage QC' },
        fuel: { title: 'Fuel Testing', desc: '30 tests - octane, sulfur, contamination, biodiesel' },
        engine: { title: 'Engine Diagnostics', desc: '20 tests - oil analysis, wear metals, performance' },
        traceability: { title: 'Traceability', desc: 'Chain of custody, QR codes, GPS tracking, compliance' },
        field: { title: 'Field Logger', desc: 'GPS, weather, photos, field notes, sampling data' },
        ai: { title: 'AI Analysis', desc: 'Predictive insights, trend analysis, recommendations' },
        results: { title: 'Results Portal', desc: 'View reports, download PDFs, track history' },
        testing: { title: 'Testing Hub', desc: 'Order tests, upload samples, manage orders' },
        contact: { title: 'Contact & Support', desc: 'Get help, contact lab, emergency support' },
        payment: { title: 'Payment & Billing', desc: 'View invoices, make payments, pricing' }
      },
      accessNow: 'ACCESS NOW'
    },
    
    // Lab Dashboard
    lab: {
      title: 'Lab Dashboard',
      pending: 'Pending Orders',
      processing: 'Processing',
      completed: 'Completed',
      testsAvailable: 'Tests Available',
      backendAPI: 'Backend API'
    },
    
    // Water Testing
    water: {
      title: 'Water Testing',
      subtitle: 'Select Water Quality Tests',
      description: 'Choose from chemical, microbiological, and heavy metal analysis',
      categories: {
        chemical: 'Chemical Tests',
        microbiological: 'Microbiological Tests',
        heavyMetals: 'Heavy Metals',
        physical: 'Physical Parameters',
        organic: 'Organic Compounds'
      },
      totalCost: 'Total Cost',
      testsSelected: 'tests selected',
      summary: 'Selected Tests Summary',
      noTests: 'No tests selected yet',
      total: 'TOTAL',
      submit: 'Submit Order',
      clear: 'Clear Selection',
      backendConnection: 'Backend API Connection'
    },
    
    // Soil Analysis
    soil: {
      title: 'Soil Analysis',
      subtitle: 'Select Soil Tests',
      description: 'Choose from fertility, nutrient, and contamination analysis',
      categories: {
        macronutrients: 'Macronutrients',
        micronutrients: 'Micronutrients',
        physical: 'Physical Properties',
        heavyMetals: 'Heavy Metals',
        biological: 'Biological Analysis'
      }
    },
    
    // Alcohol Analysis
    alcohol: {
      title: 'Alcohol Analysis',
      subtitle: 'Select Alcohol Tests',
      description: 'Choose from purity, congener, and quality control tests',
      categories: {
        purity: 'Purity Tests',
        congeners: 'Congeners',
        quality: 'Quality Control',
        contaminants: 'Contaminants'
      }
    },
    
    // Fuel Testing
    fuel: {
      title: 'Fuel Testing',
      subtitle: 'Select Fuel Tests',
      description: 'Choose from gasoline, diesel, biodiesel, and contamination tests',
      categories: {
        gasoline: 'Gasoline Tests',
        diesel: 'Diesel Tests',
        biodiesel: 'Biodiesel',
        contamination: 'Contamination Tests'
      }
    },
    
    // Engine Diagnostics
    engine: {
      title: 'Engine Diagnostics',
      subtitle: 'Select Engine Tests',
      description: 'Choose from oil analysis, wear metals, and performance tests',
      categories: {
        oilAnalysis: 'Oil Analysis',
        wearMetals: 'Wear Metals',
        contaminants: 'Contaminants',
        performance: 'Performance Tests'
      }
    },
    
    // Traceability
    traceability: {
      title: 'Traceability & Chain of Custody',
      subtitle: 'Full Sample Tracking',
      description: 'QR Codes, GPS Logging, Chain of Custody, ISO-17025 Compliance',
      features: {
        qr: 'QR Code Generation',
        gps: 'GPS Coordinate Logging',
        custody: 'Chain of Custody Forms',
        iso: 'ISO-17025 Compliance',
        audit: 'Audit Trail',
        timestamp: 'Timestamped Events'
      }
    },
    
    // Field Logger
    field: {
      title: 'Field Conditions Logger',
      subtitle: 'Document Field Conditions',
      description: 'GPS, Weather, Photos, Notes, Sampling Data',
      fields: {
        gps: 'GPS Coordinates',
        weather: 'Weather Conditions',
        temp: 'Temperature',
        humidity: 'Humidity',
        photo: 'Photo Upload',
        notes: 'Field Notes',
        sample: 'Sample ID'
      }
    },
    
    // AI Analysis
    ai: {
      title: 'AI Environmental Analysis',
      subtitle: 'AI-Powered Insights',
      description: 'Predictive Analysis, Trend Detection, Recommendations',
      features: {
        predictive: 'Predictive Analytics',
        trends: 'Trend Analysis',
        anomaly: 'Anomaly Detection',
        recommendations: 'Automated Recommendations',
        risk: 'Risk Assessment',
        compliance: 'Compliance Forecasting'
      }
    },
    
    // Results Portal
    results: {
      title: 'Results Portal',
      subtitle: 'View Test Results',
      description: 'Download PDFs, Track History, Compare Data',
      actions: {
        view: 'View Report',
        download: 'Download PDF',
        email: 'Email Report',
        compare: 'Compare Results',
        history: 'View History'
      }
    },
    
    // Testing Hub
    testingHub: {
      title: 'Testing Services Hub',
      subtitle: 'Order Tests & Manage Samples',
      description: 'Browse 165 Tests, Upload Samples, Track Orders',
      search: 'Search tests...',
      filter: 'Filter by category',
      cart: 'Shopping Cart',
      checkout: 'Proceed to Checkout'
    },
    
    // Contact
    contact: {
      title: 'Contact & Support',
      subtitle: 'Get Help & Support',
      description: 'Lab Contact, Emergency Support, Technical Help',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      hours: 'Business Hours',
      emergency: 'Emergency Contact'
    },
    
    // Payment
    payment: {
      title: 'Payment & Billing',
      subtitle: 'Invoices & Payments',
      description: 'View Invoices, Make Payments, Pricing Information',
      invoice: 'Invoice',
      pay: 'Pay Now',
      history: 'Payment History',
      methods: 'Payment Methods',
      card: 'Credit Card',
      bank: 'Bank Transfer'
    },
    
    // Common
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      remove: 'Remove',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      export: 'Export',
      import: 'Import',
      print: 'Print',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      finish: 'Finish',
      online: 'ONLINE',
      offline: 'OFFLINE',
      port: 'PORT'
    }
  },
  
  es: {
    // Navegación
    nav: {
      home: 'Inicio',
      lab: 'Panel de Laboratorio',
      water: 'Análisis de Agua',
      soil: 'Análisis de Suelo',
      alcohol: 'Análisis de Alcohol',
      fuel: 'Pruebas de Combustible',
      engine: 'Diagnóstico de Motor',
      traceability: 'Trazabilidad',
      field: 'Registro de Campo',
      ai: 'Análisis IA',
      results: 'Portal de Resultados',
      testing: 'Centro de Pruebas',
      contact: 'Contacto',
      payment: 'Pagos'
    },
    
    // Página de Inicio
    home: {
      title: 'Bienvenido a AuditDNA',
      subtitle: 'Plataforma Profesional de Análisis Agrícola y Ambiental',
      tagline: '165 Pruebas Premium | Resultados en Tiempo Real | Análisis con IA | Seguimiento QR',
      modules: {
        lab: { title: 'Panel de Laboratorio', desc: 'Gestionar pedidos, rastrear muestras, analíticas' },
        water: { title: 'Análisis de Agua', desc: '50 pruebas - pH, TDS, bacterias, metales, cumplimiento' },
        soil: { title: 'Análisis de Suelo', desc: '40 pruebas - NPK, pH, materia orgánica, fertilidad' },
        alcohol: { title: 'Análisis de Alcohol', desc: '25 pruebas - pureza, metanol, etanol, control de calidad' },
        fuel: { title: 'Pruebas de Combustible', desc: '30 pruebas - octanaje, azufre, contaminación, biodiesel' },
        engine: { title: 'Diagnóstico de Motor', desc: '20 pruebas - análisis de aceite, metales de desgaste, rendimiento' },
        traceability: { title: 'Trazabilidad', desc: 'Cadena de custodia, códigos QR, seguimiento GPS, cumplimiento' },
        field: { title: 'Registro de Campo', desc: 'GPS, clima, fotos, notas de campo, datos de muestreo' },
        ai: { title: 'Análisis IA', desc: 'Perspectivas predictivas, análisis de tendencias, recomendaciones' },
        results: { title: 'Portal de Resultados', desc: 'Ver informes, descargar PDFs, historial de seguimiento' },
        testing: { title: 'Centro de Pruebas', desc: 'Ordenar pruebas, cargar muestras, gestionar pedidos' },
        contact: { title: 'Contacto y Soporte', desc: 'Obtener ayuda, contactar laboratorio, soporte de emergencia' },
        payment: { title: 'Pagos y Facturación', desc: 'Ver facturas, realizar pagos, información de precios' }
      },
      accessNow: 'ACCEDER AHORA'
    },
    
    // Panel de Laboratorio
    lab: {
      title: 'Panel de Laboratorio',
      pending: 'Pedidos Pendientes',
      processing: 'En Procesamiento',
      completed: 'Completados',
      testsAvailable: 'Pruebas Disponibles',
      backendAPI: 'API del Backend'
    },
    
    // Análisis de Agua
    water: {
      title: 'Análisis de Agua',
      subtitle: 'Seleccionar Pruebas de Calidad del Agua',
      description: 'Elija entre análisis químico, microbiológico y de metales pesados',
      categories: {
        chemical: 'Pruebas Químicas',
        microbiological: 'Pruebas Microbiológicas',
        heavyMetals: 'Metales Pesados',
        physical: 'Parámetros Físicos',
        organic: 'Compuestos Orgánicos'
      },
      totalCost: 'Costo Total',
      testsSelected: 'pruebas seleccionadas',
      summary: 'Resumen de Pruebas Seleccionadas',
      noTests: 'Aún no se han seleccionado pruebas',
      total: 'TOTAL',
      submit: 'Enviar Pedido',
      clear: 'Limpiar Selección',
      backendConnection: 'Conexión API del Backend'
    },
    
    // Análisis de Suelo
    soil: {
      title: 'Análisis de Suelo',
      subtitle: 'Seleccionar Pruebas de Suelo',
      description: 'Elija entre análisis de fertilidad, nutrientes y contaminación',
      categories: {
        macronutrients: 'Macronutrientes',
        micronutrients: 'Micronutrientes',
        physical: 'Propiedades Físicas',
        heavyMetals: 'Metales Pesados',
        biological: 'Análisis Biológico'
      }
    },
    
    // Análisis de Alcohol
    alcohol: {
      title: 'Análisis de Alcohol',
      subtitle: 'Seleccionar Pruebas de Alcohol',
      description: 'Elija entre pruebas de pureza, congéneres y control de calidad',
      categories: {
        purity: 'Pruebas de Pureza',
        congeners: 'Congéneres',
        quality: 'Control de Calidad',
        contaminants: 'Contaminantes'
      }
    },
    
    // Pruebas de Combustible
    fuel: {
      title: 'Pruebas de Combustible',
      subtitle: 'Seleccionar Pruebas de Combustible',
      description: 'Elija entre pruebas de gasolina, diesel, biodiesel y contaminación',
      categories: {
        gasoline: 'Pruebas de Gasolina',
        diesel: 'Pruebas de Diesel',
        biodiesel: 'Biodiesel',
        contamination: 'Pruebas de Contaminación'
      }
    },
    
    // Diagnóstico de Motor
    engine: {
      title: 'Diagnóstico de Motor',
      subtitle: 'Seleccionar Pruebas de Motor',
      description: 'Elija entre análisis de aceite, metales de desgaste y pruebas de rendimiento',
      categories: {
        oilAnalysis: 'Análisis de Aceite',
        wearMetals: 'Metales de Desgaste',
        contaminants: 'Contaminantes',
        performance: 'Pruebas de Rendimiento'
      }
    },
    
    // Trazabilidad
    traceability: {
      title: 'Trazabilidad y Cadena de Custodia',
      subtitle: 'Seguimiento Completo de Muestras',
      description: 'Códigos QR, Registro GPS, Cadena de Custodia, Cumplimiento ISO-17025',
      features: {
        qr: 'Generación de Código QR',
        gps: 'Registro de Coordenadas GPS',
        custody: 'Formularios de Cadena de Custodia',
        iso: 'Cumplimiento ISO-17025',
        audit: 'Pista de Auditoría',
        timestamp: 'Eventos con Marca de Tiempo'
      }
    },
    
    // Registro de Campo
    field: {
      title: 'Registro de Condiciones de Campo',
      subtitle: 'Documentar Condiciones de Campo',
      description: 'GPS, Clima, Fotos, Notas, Datos de Muestreo',
      fields: {
        gps: 'Coordenadas GPS',
        weather: 'Condiciones Climáticas',
        temp: 'Temperatura',
        humidity: 'Humedad',
        photo: 'Subir Foto',
        notes: 'Notas de Campo',
        sample: 'ID de Muestra'
      }
    },
    
    // Análisis IA
    ai: {
      title: 'Análisis Ambiental con IA',
      subtitle: 'Perspectivas con IA',
      description: 'Análisis Predictivo, Detección de Tendencias, Recomendaciones',
      features: {
        predictive: 'Analítica Predictiva',
        trends: 'Análisis de Tendencias',
        anomaly: 'Detección de Anomalías',
        recommendations: 'Recomendaciones Automatizadas',
        risk: 'Evaluación de Riesgos',
        compliance: 'Pronóstico de Cumplimiento'
      }
    },
    
    // Portal de Resultados
    results: {
      title: 'Portal de Resultados',
      subtitle: 'Ver Resultados de Pruebas',
      description: 'Descargar PDFs, Historial de Seguimiento, Comparar Datos',
      actions: {
        view: 'Ver Informe',
        download: 'Descargar PDF',
        email: 'Enviar Informe por Correo',
        compare: 'Comparar Resultados',
        history: 'Ver Historial'
      }
    },
    
    // Centro de Pruebas
    testingHub: {
      title: 'Centro de Servicios de Pruebas',
      subtitle: 'Ordenar Pruebas y Gestionar Muestras',
      description: 'Explorar 165 Pruebas, Cargar Muestras, Rastrear Pedidos',
      search: 'Buscar pruebas...',
      filter: 'Filtrar por categoría',
      cart: 'Carrito de Compras',
      checkout: 'Proceder al Pago'
    },
    
    // Contacto
    contact: {
      title: 'Contacto y Soporte',
      subtitle: 'Obtener Ayuda y Soporte',
      description: 'Contacto de Laboratorio, Soporte de Emergencia, Ayuda Técnica',
      email: 'Correo Electrónico',
      phone: 'Teléfono',
      address: 'Dirección',
      hours: 'Horario de Atención',
      emergency: 'Contacto de Emergencia'
    },
    
    // Pagos
    payment: {
      title: 'Pagos y Facturación',
      subtitle: 'Facturas y Pagos',
      description: 'Ver Facturas, Realizar Pagos, Información de Precios',
      invoice: 'Factura',
      pay: 'Pagar Ahora',
      history: 'Historial de Pagos',
      methods: 'Métodos de Pago',
      card: 'Tarjeta de Crédito',
      bank: 'Transferencia Bancaria'
    },
    
    // Común
    common: {
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      save: 'Guardar',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      edit: 'Editar',
      add: 'Agregar',
      remove: 'Quitar',
      search: 'Buscar',
      filter: 'Filtrar',
      sort: 'Ordenar',
      export: 'Exportar',
      import: 'Importar',
      print: 'Imprimir',
      close: 'Cerrar',
      back: 'Atrás',
      next: 'Siguiente',
      previous: 'Anterior',
      finish: 'Finalizar',
      online: 'EN LÍNEA',
      offline: 'DESCONECTADO',
      port: 'PUERTO'
    }
  }
};
