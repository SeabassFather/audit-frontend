import React, { useState } from 'react';
import { Globe, MapPin, DollarSign, Building, FileText, AlertCircle, CheckCircle } from 'lucide-react';

export default function MexicoLoans() {
  const [loanType, setLoanType] = useState('purchase');
  const [propertyRegion, setPropertyRegion] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [citizenship, setCitizenship] = useState('');
  const [results, setResults] = useState([]);

  // Anonymous lenders - Lender 1 uses Moxxi guidelines
  const mexicoLenders = [
    {
      id: 1,
      regions: ['CDMX', 'Cancun', 'Tulum', 'Los Cabos', 'Puerto Vallarta', 'Guadalajara', 'Playa del Carmen', 'Monterrey', 'Mazatlán', 'La Paz', 'Sayulita', 'Punta Mita', 'Riviera Nayarit', 'Cozumel', 'Akumal'],
      minAmount: 50000,
      maxAmount: 5000000,
      baseRate: 7.50,
      foreignNational: true,
      loanTypes: ['purchase', 'refinance']
    },
    {
      id: 2,
      regions: ['CDMX', 'Cancun', 'Tulum', 'Los Cabos', 'Puerto Vallarta', 'Guadalajara', 'Playa del Carmen'],
      minAmount: 75000,
      maxAmount: 2000000,
      baseRate: 8.25,
      foreignNational: true,
      loanTypes: ['purchase', 'refinance']
    },
    {
      id: 3,
      regions: ['Cancun', 'Tulum', 'Playa del Carmen', 'Los Cabos', 'Puerto Vallarta'],
      minAmount: 100000,
      maxAmount: 1500000,
      baseRate: 8.75,
      foreignNational: true,
      loanTypes: ['purchase', 'refinance']
    },
    {
      id: 4,
      regions: ['Los Cabos', 'Puerto Vallarta', 'Mazatlán', 'La Paz'],
      minAmount: 50000,
      maxAmount: 1000000,
      baseRate: 9.125,
      foreignNational: true,
      loanTypes: ['purchase', 'refinance']
    },
    {
      id: 5,
      regions: ['CDMX', 'Guadalajara', 'Monterrey'],
      minAmount: 80000,
      maxAmount: 1800000,
      baseRate: 7.875,
      foreignNational: true,
      loanTypes: ['purchase', 'refinance']
    }
  ];

  const calculateRates = () => {
    const amount = parseFloat(loanAmount);
    
    if (!amount || amount < 50000) {
      alert('Por favor ingrese un monto válido (mínimo $50,000 USD)');
      return;
    }
    
    if (!propertyRegion) {
      alert('Por favor seleccione una región');
      return;
    }

    const foreignAdjustment = citizenship === 'foreign' ? 0.25 : 0;
    const loanTypeAdjustment = loanType === 'refinance' ? 0.125 : 0;

    const matchedLenders = mexicoLenders.filter(lender => 
      lender.regions.includes(propertyRegion) &&
      amount >= lender.minAmount &&
      amount <= lender.maxAmount &&
      lender.loanTypes.includes(loanType) &&
      (citizenship !== 'foreign' || lender.foreignNational)
    );

    const calculatedResults = matchedLenders.map((lender) => {
      const adjustedRate = lender.baseRate + foreignAdjustment + loanTypeAdjustment;
      const monthlyPayment = calculatePayment(amount, adjustedRate, 20);
      
      return {
        id: lender.id,
        estimatedRate: adjustedRate.toFixed(3),
        monthlyPayment: monthlyPayment,
        loanRange: `$${lender.minAmount.toLocaleString()} - $${lender.maxAmount.toLocaleString()} USD`,
        regions: lender.regions.join(', ')
      };
    });

    setResults(calculatedResults.sort((a, b) => parseFloat(a.estimatedRate) - parseFloat(b.estimatedRate)));
  };

  const calculatePayment = (principal, annualRate, years) => {
    const monthlyRate = annualRate / 100 / 12;
    const numPayments = years * 12;
    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    return payment.toFixed(2);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-lg shadow-2xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <Globe className="w-12 h-12" />
          <div>
            <h1 className="text-4xl font-bold">Préstamos Hipotecarios en México</h1>
            <p className="text-xl">Mexico Mortgage Loan Search Engine</p>
          </div>
        </div>
        <p className="text-lg opacity-90">Financing solutions for property purchases in Mexico's premier destinations</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <Building className="w-7 h-7 text-blue-600" />
          Search Criteria / Criterios de Búsqueda
        </h2>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-bold mb-2">Loan Purpose / Propósito</label>
            <select 
              value={loanType}
              onChange={(e) => setLoanType(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg"
            >
              <option value="purchase">Purchase / Compra</option>
              <option value="refinance">Refinance / Refinanciamiento</option>
            </select>
          </div>

          <div>
            <label className="block font-bold mb-2">Property Region / Región</label>
            <select 
              value={propertyRegion}
              onChange={(e) => setPropertyRegion(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg"
            >
              <option value="">-- Select Region --</option>
              <option value="CDMX">Ciudad de México (CDMX)</option>
              <option value="Cancun">Cancún, Quintana Roo</option>
              <option value="Tulum">Tulum, Quintana Roo</option>
              <option value="Playa del Carmen">Playa del Carmen, Quintana Roo</option>
              <option value="Los Cabos">Los Cabos, Baja California Sur</option>
              <option value="Puerto Vallarta">Puerto Vallarta, Jalisco</option>
              <option value="Guadalajara">Guadalajara, Jalisco</option>
              <option value="Monterrey">Monterrey, Nuevo León</option>
              <option value="Mazatlán">Mazatlán, Sinaloa</option>
              <option value="La Paz">La Paz, Baja California Sur</option>
              <option value="Sayulita">Sayulita, Nayarit</option>
              <option value="Punta Mita">Punta Mita, Nayarit</option>
              <option value="Riviera Nayarit">Riviera Nayarit</option>
              <option value="Cozumel">Cozumel, Quintana Roo</option>
              <option value="Akumal">Akumal, Quintana Roo</option>
            </select>
          </div>

          <div>
            <label className="block font-bold mb-2">Loan Amount (USD) / Monto</label>
            <input 
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Enter amount in USD"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg"
            />
          </div>

          <div>
            <label className="block font-bold mb-2">Citizenship / Ciudadanía</label>
            <select 
              value={citizenship}
              onChange={(e) => setCitizenship(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg"
            >
              <option value="">-- Select / Seleccionar --</option>
              <option value="mexican">Mexican National / Nacional Mexicano</option>
              <option value="foreign">Foreign National / Extranjero</option>
            </select>
          </div>
        </div>

        <button 
          onClick={calculateRates}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-lg font-bold text-xl flex items-center justify-center gap-3 shadow-lg"
        >
          <DollarSign className="w-6 h-6" />
          Search Available Options / Buscar Opciones
        </button>
      </div>

      {results.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-gray-800">
                <strong>IMPORTANT / IMPORTANTE:</strong> Estimated rates shown are approximate and based on general criteria. Final rates require full application, property appraisal, fideicomiso setup, and underwriting approval.
              </p>
              <p className="text-sm text-gray-700 mt-1">
                Las tasas estimadas son aproximadas. Las tasas finales requieren solicitud completa, avalúo de propiedad, configuración de fideicomiso y aprobación de suscripción.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-4">Available Loan Options ({results.length})</h3>
          
          <div className="space-y-4">
            {results.map((result, index) => (
              <div key={result.id} className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-400 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-800">Lender Option {index + 1}</h4>
                    <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Available Regions: All major Mexico destinations
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                      <DollarSign className="w-4 h-4" />
                      Loan Range: {result.loanRange}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Estimated Rate*</p>
                    <p className="text-3xl font-bold text-blue-600">{result.estimatedRate}%</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold">Estimated Monthly Payment:</span>
                    <span className="text-2xl font-bold text-gray-800">${result.monthlyPayment} USD</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">*Based on 20-year term. Principal & Interest only. Does not include property taxes, insurance, or fideicomiso fees.</p>
                  <p className="text-xs text-gray-500">*Basado en plazo de 20 años. Solo capital e interés. No incluye impuestos prediales, seguro o cuotas de fideicomiso.</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Required Documentation / Documentación Requerida:
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                Valid passport and proof of legal status in Mexico / Pasaporte válido y comprobante de estatus legal
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                Proof of income (2 years tax returns, bank statements) / Comprobante de ingresos (2 años de declaraciones, estados de cuenta)
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                Property appraisal by approved Mexican appraiser / Avalúo por tasador mexicano aprobado
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                Fideicomiso (bank trust) setup for foreign buyers / Configuración de fideicomiso para compradores extranjeros
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                Credit report from home country / Reporte de crédito del país de origen
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                Down payment typically 30-50% for foreign nationals / Enganche típicamente 30-50% para extranjeros
              </li>
            </ul>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-lg p-8 border-2 border-gray-300">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Licensed Mortgage Professional</h3>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Profesional Hipotecario Licenciado</h3>
          <div className="h-1 w-24 bg-blue-600 mx-auto rounded"></div>
        </div>

        <div className="space-y-3 text-center">
          <p className="text-xl font-bold text-gray-800">Saul Garcia</p>
          <p className="text-lg font-semibold text-gray-700">NMLS License #337526</p>
          <p className="text-lg font-bold text-blue-700">Everwise Home Loans & Realty</p>
          <p className="text-base font-semibold text-gray-700">Company NMLS #1739012 | DRE #02067255</p>
          <p className="text-sm text-gray-600">15615 Alton Pkwy, Suite 450, Irvine, CA 92618</p>
          <p className="text-sm text-gray-600">Phone: 1-844-853-9300</p>
        </div>

        <div className="mt-6 pt-6 border-t-2 border-gray-300 space-y-3 text-sm text-gray-600">
          <p className="font-semibold">MEXICO PROPERTY FINANCING:</p>
          <p>
            We broker Mexico property loans through our network of approved lenders. All loans subject to Mexican banking regulations and require establishment of a fideicomiso (bank trust) for properties within the restricted zone. Full documentation, property title verification, appraisal by Mexican-licensed appraiser, and lender underwriting approval required.
          </p>
          <p className="font-semibold mt-4">FINANCIAMIENTO DE PROPIEDAD EN MÉXICO:</p>
          <p>
            Intermediamos préstamos de propiedades en México a través de nuestra red de prestamistas aprobados. Todos los préstamos están sujetos a regulaciones bancarias mexicanas y requieren el establecimiento de un fideicomiso para propiedades dentro de la zona restringida.
          </p>
          <p className="font-semibold mt-4">EQUAL HOUSING OPPORTUNITY:</p>
          <p>
            We are committed to providing equal service to all qualified borrowers regardless of race, color, religion, national origin, sex, handicap, or familial status.
          </p>
          <p className="text-xs text-gray-500 mt-4 text-center">
            © {new Date().getFullYear()} Everwise Home Loans & Realty. All Rights Reserved. | Todos los Derechos Reservados.
          </p>
        </div>
      </div>
    </div>
  );
}