const express = require('express');
const router = express.Router();
const complianceController = require('../controllers/complianceController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// Compliance validation endpoints
router.post('/validate/cfpb',
  protect,
  complianceController.validateCFPB
);

router.post('/validate/eco-housing',
  protect,
  complianceController.validateEcoHousing
);

router.post('/validate/lending',
  protect,
  complianceController.validateLendingCompliance
);

// Audit thresholds
router.post('/check-thresholds',
  protect,
  complianceController.checkThresholds
);

router.get('/thresholds/:industry',
  protect,
  complianceController.getIndustryThresholds
);

// Red flag detection
router.post('/detect-redflags',
  protect,
  complianceController.detectRedFlags
);

// Compliance reports
router.get('/report/:type',
  protect,
  restrictTo('admin', 'auditor'),
  complianceController.generateComplianceReport
);

router.get('/violations',
  protect,
  restrictTo('admin', 'auditor'),
  complianceController.getViolations
);

module.exports = router;