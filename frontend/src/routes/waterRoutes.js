const express = require('express');
const router = express.Router();
const waterController = require('../controllers/waterController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// Public calculation endpoints
router.post('/calculate/tds', waterController.calculateTDS);
router.post('/calculate/hardness', waterController.calculateHardness);
router.post('/calculate/lsi', waterController.calculateLSI);
router.post('/calculate/chlorine', waterController.calculateChlorine);

// Water test management (protected)
router.post('/test', 
  protect, 
  waterController.createWaterTest
);

router.get('/test/:id', 
  protect, 
  waterController.getWaterTest
);

router.get('/tests/property/:propertyId', 
  protect, 
  waterController.getTestsByProperty
);

router.put('/test/:id', 
  protect, 
  waterController.updateWaterTest
);

router.delete('/test/:id', 
  protect, 
  restrictTo('admin', 'auditor'), 
  waterController.deleteWaterTest
);

// Analysis endpoints
router.post('/analyze', 
  protect, 
  waterController.analyzeWaterQuality
);

router.get('/test/:id/potability', 
  protect, 
  waterController.checkPotability
);

router.get('/test/:id/recommendations', 
  protect, 
  waterController.getRecommendations
);

// Batch operations
router.post('/tests/batch-upload', 
  protect, 
  restrictTo('admin', 'auditor'), 
  waterController.batchUploadTests
);

// Reporting
router.get('/reports/summary', 
  protect, 
  waterController.getTestSummary
);

router.get('/reports/flagged', 
  protect, 
  restrictTo('admin', 'auditor'), 
  waterController.getFlaggedTests
);

module.exports = router;