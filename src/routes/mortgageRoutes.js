const express = require('express');
const router = express.Router();
const mortgageController = require('../controllers/mortgageController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// Mortgage audit operations
router.post('/audit', 
  protect, 
  mortgageController.createAudit
);

router.get('/audit/:loanNumber', 
  protect, 
  mortgageController.getAudit
);

router.get('/audits', 
  protect, 
  mortgageController.getAllAudits
);

router.put('/audit/:loanNumber', 
  protect, 
  mortgageController.updateAudit
);

router.delete('/audit/:loanNumber', 
  protect, 
  restrictTo('admin', 'auditor'), 
  mortgageController.deleteAudit
);

// DSCR calculations
router.post('/calculate/dscr', 
  protect, 
  mortgageController.calculateDSCR
);

router.get('/audit/:loanNumber/dscr', 
  protect, 
  mortgageController.getDSCRAnalysis
);

// DTI calculations
router.post('/calculate/dti', 
  protect, 
  mortgageController.calculateDTI
);

// Risk assessment
router.get('/audit/:loanNumber/risk', 
  protect, 
  mortgageController.assessRisk
);

router.post('/audit/:loanNumber/redflag', 
  protect, 
  mortgageController.addRedFlag
);

// Compliance checks
router.get('/audit/:loanNumber/compliance', 
  protect, 
  mortgageController.checkCompliance
);

router.post('/audit/:loanNumber/compliance-issue', 
  protect, 
  mortgageController.addComplianceIssue
);

// Rate comparison
router.post('/compare-rates', 
  protect, 
  mortgageController.compareRates
);

router.get('/market-rates', 
  mortgageController.getMarketRates
);

// HELOC specific
router.post('/heloc/eligibility', 
  protect, 
  mortgageController.checkHELOCEligibility
);

router.post('/heloc/calculator', 
  mortgageController.calculateHELOC
);

// Point/Calyx integration
router.post('/sync/point/:loanNumber', 
  protect, 
  restrictTo('admin', 'lender'), 
  mortgageController.syncWithPoint
);

router.post('/sync/calyx/:loanNumber', 
  protect, 
  restrictTo('admin', 'lender'), 
  mortgageController.syncWithCalyx
);

// Document verification
router.post('/audit/:loanNumber/verify-document', 
  protect, 
  mortgageController.verifyDocument
);

// Reporting
router.get('/reports/risk-summary', 
  protect, 
  restrictTo('admin', 'auditor', 'lender'), 
  mortgageController.getRiskSummary
);

router.get('/reports/flagged', 
  protect, 
  restrictTo('admin', 'auditor'), 
  mortgageController.getFlaggedLoans
);

router.get('/reports/pipeline', 
  protect, 
  restrictTo('admin', 'lender'), 
  mortgageController.getPipelineReport
);

module.exports = router;