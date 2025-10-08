const mongoose = require('mongoose');

const MortgageAuditSchema = new mongoose.Schema({
  loanNumber: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  borrower: {
    name: String,
    email: String,
    phone: String,
    ssn: String, // Encrypted in production
    creditScore: Number
  },
  property: {
    address: {
      street: String,
      city: String,
      state: String,
      zip: String
    },
    appraisedValue: Number,
    purchasePrice: Number,
    propertyType: {
      type: String,
      enum: ['single_family', 'multi_family', 'condo', 'townhouse', 'commercial', 'land']
    },
    occupancy: {
      type: String,
      enum: ['primary', 'secondary', 'investment']
    }
  },
  loan: {
    amount: {
      type: Number,
      required: true
    },
    loanType: {
      type: String,
      enum: ['conventional', 'fha', 'va', 'usda', 'jumbo', 'heloc', 'construction'],
      required: true
    },
    term: {
      type: Number,
      default: 360 // months
    },
    interestRate: {
      type: Number,
      required: true
    },
    monthlyPayment: Number,
    closingDate: Date,
    originationDate: Date,
    lender: String,
    servicer: String
  },
  income: {
    monthly: Number,
    annual: Number,
    sources: [{
      type: String,
      amount: Number,
      verified: Boolean
    }],
    rentalIncome: Number
  },
  dscr: {
    ratio: Number,
    qualifies: Boolean,
    minRequired: {
      type: Number,
      default: 1.0
    },
    calculation: {
      monthlyRent: Number,
      mortgagePayment: Number,
      taxes: Number,
      insurance: Number,
      hoa: Number,
      maintenance: Number
    }
  },
  financials: {
    ltv: Number, // Loan to Value
    dti: Number, // Debt to Income
    reserves: Number,
    downPayment: Number,
    downPaymentPercent: Number
  },
  audit: {
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed', 'flagged', 'approved'],
      default: 'pending'
    },
    riskLevel: {
      type: String,
      enum: ['low', 'moderate', 'high', 'critical']
    },
    redFlags: [{
      category: String,
      description: String,
      severity: {
        type: String,
        enum: ['info', 'warning', 'critical']
      },
      detected: Date
    }],
    complianceIssues: [{
      regulation: String, // CFPB, TILA, RESPA, etc.
      description: String,
      violation: Boolean
    }],
    documentReview: {
      loanApplication: Boolean,
      appraisal: Boolean,
      titleSearch: Boolean,
      creditReport: Boolean,
      incomeVerification: Boolean,
      assetVerification: Boolean,
      insurancePolicy: Boolean
    },
    findings: String,
    recommendations: [String],
    auditedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    auditDate: Date,
    completedDate: Date
  },
  rateComparison: {
    currentRate: Number,
    marketAverage: Number,
    savings: Number,
    competitorRates: [{
      lender: String,
      rate: Number,
      apr: Number,
      points: Number
    }]
  },
  documents: [{
    type: String,
    filename: String,
    url: String,
    uploadDate: Date,
    verified: Boolean
  }],
  timeline: [{
    event: String,
    date: Date,
    notes: String
  }],
  integrations: {
    pointId: String,
    calyxId: String,
    lastSync: Date
  }
}, {
  timestamps: true
});

// Indexes
MortgageAuditSchema.index({ loanNumber: 1 });
MortgageAuditSchema.index({ 'borrower.email': 1 });
MortgageAuditSchema.index({ 'audit.status': 1 });
MortgageAuditSchema.index({ 'audit.riskLevel': 1 });

// Calculate LTV
MortgageAuditSchema.pre('save', function(next) {
  if (this.loan.amount && this.property.appraisedValue) {
    this.financials.ltv = (this.loan.amount / this.property.appraisedValue) * 100;
  }
  if (this.loan.amount && this.property.purchasePrice) {
    this.financials.downPayment = this.property.purchasePrice - this.loan.amount;
    this.financials.downPaymentPercent = (this.financials.downPayment / this.property.purchasePrice) * 100;
  }
  next();
});

// Calculate DSCR
MortgageAuditSchema.methods.calculateDSCR = function() {
  const calc = this.dscr.calculation;
  if (!calc.monthlyRent || !calc.mortgagePayment) return null;

  const totalExpenses = calc.mortgagePayment + 
    (calc.taxes || 0) + 
    (calc.insurance || 0) + 
    (calc.hoa || 0) + 
    (calc.maintenance || 0);

  const ratio = calc.monthlyRent / totalExpenses;
  this.dscr.ratio = ratio;
  this.dscr.qualifies = ratio >= this.dscr.minRequired;

  return ratio;
};

// Calculate DTI
MortgageAuditSchema.methods.calculateDTI = function() {
  if (!this.income.monthly || !this.loan.monthlyPayment) return null;

  const dti = (this.loan.monthlyPayment / this.income.monthly) * 100;
  this.financials.dti = dti;

  return dti;
};

// Risk assessment
MortgageAuditSchema.methods.assessRisk = function() {
  let riskScore = 0;
  const redFlags = [];

  // LTV risk
  if (this.financials.ltv > 95) {
    riskScore += 3;
    redFlags.push({
      category: 'LTV',
      description: 'High loan-to-value ratio exceeds 95%',
      severity: 'critical'
    });
  } else if (this.financials.ltv > 80) {
    riskScore += 2;
    redFlags.push({
      category: 'LTV',
      description: 'Elevated LTV ratio above 80%',
      severity: 'warning'
    });
  }

  // DTI risk
  if (this.financials.dti > 50) {
    riskScore += 3;
    redFlags.push({
      category: 'DTI',
      description: 'Debt-to-income ratio exceeds 50%',
      severity: 'critical'
    });
  } else if (this.financials.dti > 43) {
    riskScore += 2;
    redFlags.push({
      category: 'DTI',
      description: 'DTI above qualified mortgage threshold (43%)',
      severity: 'warning'
    });
  }

  // Credit score risk
  if (this.borrower.creditScore < 620) {
    riskScore += 3;
    redFlags.push({
      category: 'Credit',
      description: 'Credit score below conventional lending threshold',
      severity: 'critical'
    });
  } else if (this.borrower.creditScore < 680) {
    riskScore += 1;
    redFlags.push({
      category: 'Credit',
      description: 'Below-average credit score',
      severity: 'warning'
    });
  }

  // DSCR risk (for investment properties)
  if (this.dscr.ratio && this.dscr.ratio < 1.0) {
    riskScore += 3;
    redFlags.push({
      category: 'DSCR',
      description: 'DSCR below 1.0 - property does not cover expenses',
      severity: 'critical'
    });
  }

  // Determine overall risk level
  if (riskScore >= 6) {
    this.audit.riskLevel = 'critical';
  } else if (riskScore >= 4) {
    this.audit.riskLevel = 'high';
  } else if (riskScore >= 2) {
    this.audit.riskLevel = 'moderate';
  } else {
    this.audit.riskLevel = 'low';
  }

  this.audit.redFlags = redFlags;
  return { riskLevel: this.audit.riskLevel, score: riskScore, flags: redFlags };
};

module.exports = mongoose.model('MortgageAudit', MortgageAuditSchema);