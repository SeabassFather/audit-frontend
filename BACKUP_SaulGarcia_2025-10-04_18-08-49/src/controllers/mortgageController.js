const MortgageAudit = require('../models/MortgageAudit');
const mortgageService = require('../services/mortgageService');
const { AppError } = require('../middleware/errorHandler');
const logger = require('../config/logger');

// Create mortgage audit
exports.createAudit = async (req, res, next) => {
  try {
    const audit = await MortgageAudit.create({
      ...req.body,
      'audit.auditedBy': req.user._id
    });

    // Calculate key metrics
    audit.calculateDSCR();
    audit.calculateDTI();
    audit.assessRisk();
    await audit.save();

    res.status(201).json({
      status: 'success',
      data: audit
    });
  } catch (error) {
    logger.error('Error creating mortgage audit:', error);
    next(error);
  }
};

// Get audit
exports.getAudit = async (req, res, next) => {
  try {
    const audit = await MortgageAudit.findOne({ loanNumber: req.params.loanNumber })
      .populate('audit.auditedBy', 'name email');

    if (!audit) {
      return next(new AppError('Mortgage audit not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: audit
    });
  } catch (error) {
    next(error);
  }
};

// Get all audits
exports.getAllAudits = async (req, res, next) => {
  try {
    const { status, riskLevel, lender, limit = 50, page = 1 } = req.query;

    const query = {};
    if (status) query['audit.status'] = status;
    if (riskLevel) query['audit.riskLevel'] = riskLevel;
    if (lender) query['loan.lender'] = lender;

    const audits = await MortgageAudit.find(query)
      .limit(parseInt(limit))
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .populate('audit.auditedBy', 'name email');

    const total = await MortgageAudit.countDocuments(query);

    res.status(200).json({
      status: 'success',
      results: audits.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: audits
    });
  } catch (error) {
    next(error);
  }
};

// Update audit
exports.updateAudit = async (req, res, next) => {
  try {
    const audit = await MortgageAudit.findOneAndUpdate(
      { loanNumber: req.params.loanNumber },
      req.body,
      { new: true, runValidators: true }
    );

    if (!audit) {
      return next(new AppError('Mortgage audit not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: audit
    });
  } catch (error) {
    next(error);
  }
};

// Delete audit
exports.deleteAudit = async (req, res, next) => {
  try {
    const audit = await MortgageAudit.findOneAndDelete({ loanNumber: req.params.loanNumber });

    if (!audit) {
      return next(new AppError('Mortgage audit not found', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};

// Calculate DSCR
exports.calculateDSCR = async (req, res, next) => {
  try {
    const { monthlyRent, mortgagePayment, taxes, insurance, hoa, maintenance } = req.body;

    const dscr = mortgageService.calculateDSCR({
      monthlyRent,
      mortgagePayment,
      taxes,
      insurance,
      hoa,
      maintenance
    });

    res.status(200).json({
      status: 'success',
      data: {
        dscr,
        qualifies: dscr >= 1.0,
        interpretation: mortgageService.interpretDSCR(dscr)
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get DSCR analysis
exports.getDSCRAnalysis = async (req, res, next) => {
  try {
    const audit = await MortgageAudit.findOne({ loanNumber: req.params.loanNumber });

    if (!audit) {
      return next(new AppError('Mortgage audit not found', 404));
    }

    const dscr = audit.calculateDSCR();

    res.status(200).json({
      status: 'success',
      data: {
        ratio: dscr,
        qualifies: audit.dscr.qualifies,
        calculation: audit.dscr.calculation,
        minRequired: audit.dscr.minRequired
      }
    });
  } catch (error) {
    next(error);
  }
};

// Calculate DTI
exports.calculateDTI = async (req, res, next) => {
  try {
    const { monthlyIncome, monthlyPayment } = req.body;
    const dti = (monthlyPayment / monthlyIncome) * 100;

    res.status(200).json({
      status: 'success',
      data: {
        dti,
        qualifies: dti <= 43,
        interpretation: mortgageService.interpretDTI(dti)
      }
    });
  } catch (error) {
    next(error);
  }
};

// Assess risk
exports.assessRisk = async (req, res, next) => {
  try {
    const audit = await MortgageAudit.findOne({ loanNumber: req.params.loanNumber });

    if (!audit) {
      return next(new AppError('Mortgage audit not found', 404));
    }

    const riskAssessment = audit.assessRisk();
    await audit.save();

    res.status(200).json({
      status: 'success',
      data: riskAssessment
    });
  } catch (error) {
    next(error);
  }
};

// Add red flag
exports.addRedFlag = async (req, res, next) => {
  try {
    const { category, description, severity } = req.body;

    const audit = await MortgageAudit.findOne({ loanNumber: req.params.loanNumber });

    if (!audit) {
      return next(new AppError('Mortgage audit not found', 404));
    }

    audit.audit.redFlags.push({
      category,
      description,
      severity,
      detected: new Date()
    });

    await audit.save();

    res.status(200).json({
      status: 'success',
      data: audit
    });
  } catch (error) {
    next(error);
  }
};

// Check compliance
exports.checkCompliance = async (req, res, next) => {
  try {
    const audit = await MortgageAudit.findOne({ loanNumber: req.params.loanNumber });

    if (!audit) {
      return next(new AppError('Mortgage audit not found', 404));
    }

    const complianceCheck = await mortgageService.checkCompliance(audit);

    res.status(200).json({
      status: 'success',
      data: complianceCheck
    });
  } catch (error) {
    next(error);
  }
};

// Add compliance issue
exports.addComplianceIssue = async (req, res, next) => {
  try {
    const { regulation, description, violation } = req.body;

    const audit = await MortgageAudit.findOne({ loanNumber: req.params.loanNumber });

    if (!audit) {
      return next(new AppError('Mortgage audit not found', 404));
    }

    audit.audit.complianceIssues.push({
      regulation,
      description,
      violation
    });

    await audit.save();

    res.status(200).json({
      status: 'success',
      data: audit
    });
  } catch (error) {
    next(error);
  }
};

// Compare rates
exports.compareRates = async (req, res, next) => {
  try {
    const { loanAmount, creditScore, loanType } = req.body;

    const rateComparison = await mortgageService.compareRates({
      loanAmount,
      creditScore,
      loanType
    });

    res.status(200).json({
      status: 'success',
      data: rateComparison
    });
  } catch (error) {
    next(error);
  }
};

// Get market rates
exports.getMarketRates = async (req, res, next) => {
  try {
    const marketRates = await mortgageService.getMarketRates();

    res.status(200).json({
      status: 'success',
      data: marketRates
    });
  } catch (error) {
    next(error);
  }
};

// Check HELOC eligibility
exports.checkHELOCEligibility = async (req, res, next) => {
  try {
    const { propertyValue, mortgageBalance, creditScore } = req.body;

    const eligibility = mortgageService.checkHELOCEligibility({
      propertyValue,
      mortgageBalance,
      creditScore
    });

    res.status(200).json({
      status: 'success',
      data: eligibility
    });
  } catch (error) {
    next(error);
  }
};

// Calculate HELOC
exports.calculateHELOC = async (req, res, next) => {
  try {
    const { propertyValue, mortgageBalance } = req.body;

    const helocCalc = mortgageService.calculateHELOC({
      propertyValue,
      mortgageBalance
    });

    res.status(200).json({
      status: 'success',
      data: helocCalc
    });
  } catch (error) {
    next(error);
  }
};

// Sync with Point
exports.syncWithPoint = async (req, res, next) => {
  try {
    const audit = await MortgageAudit.findOne({ loanNumber: req.params.loanNumber });

    if (!audit) {
      return next(new AppError('Mortgage audit not found', 404));
    }

    const syncResult = await mortgageService.syncWithPoint(audit);
    
    audit.integrations.pointId = syncResult.pointId;
    audit.integrations.lastSync = new Date();
    await audit.save();

    res.status(200).json({
      status: 'success',
      data: syncResult
    });
  } catch (error) {
    next(error);
  }
};

// Sync with Calyx
exports.syncWithCalyx = async (req, res, next) => {
  try {
    const audit = await MortgageAudit.findOne({ loanNumber: req.params.loanNumber });

    if (!audit) {
      return next(new AppError('Mortgage audit not found', 404));
    }

    const syncResult = await mortgageService.syncWithCalyx(audit);
    
    audit.integrations.calyxId = syncResult.calyxId;
    audit.integrations.lastSync = new Date();
    await audit.save();

    res.status(200).json({
      status: 'success',
      data: syncResult
    });
  } catch (error) {
    next(error);
  }
};

// Verify document
exports.verifyDocument = async (req, res, next) => {
  try {
    const { documentType } = req.body;

    const audit = await MortgageAudit.findOne({ loanNumber: req.params.loanNumber });

    if (!audit) {
      return next(new AppError('Mortgage audit not found', 404));
    }

    if (audit.audit.documentReview[documentType] !== undefined) {
      audit.audit.documentReview[documentType] = true;
      await audit.save();
    }

    res.status(200).json({
      status: 'success',
      data: audit.audit.documentReview
    });
  } catch (error) {
    next(error);
  }
};

// Get risk summary
exports.getRiskSummary = async (req, res, next) => {
  try {
    const summary = await MortgageAudit.aggregate([
      {
        $group: {
          _id: '$audit.riskLevel',
          count: { $sum: 1 },
          avgLTV: { $avg: '$financials.ltv' },
          avgDTI: { $avg: '$financials.dti' }
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: summary
    });
  } catch (error) {
    next(error);
  }
};

// Get flagged loans
exports.getFlaggedLoans = async (req, res, next) => {
  try {
    const flagged = await MortgageAudit.find({
      $or: [
        { 'audit.status': 'flagged' },
        { 'audit.riskLevel': { $in: ['high', 'critical'] } },
        { 'audit.redFlags.0': { $exists: true } }
      ]
    })
      .sort({ createdAt: -1 })
      .populate('audit.auditedBy', 'name email');

    res.status(200).json({
      status: 'success',
      results: flagged.length,
      data: flagged
    });
  } catch (error) {
    next(error);
  }
};

// Get pipeline report
exports.getPipelineReport = async (req, res, next) => {
  try {
    const pipeline = await MortgageAudit.aggregate([
      {
        $group: {
          _id: '$audit.status',
          count: { $sum: 1 },
          totalLoanAmount: { $sum: '$loan.amount' },
          avgInterestRate: { $avg: '$loan.interestRate' }
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: pipeline
    });
  } catch (error) {
    next(error);
  }
};