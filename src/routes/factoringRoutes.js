const express = require('express');
const router = express.Router();
const factoringController = require('../controllers/factoringController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// Factoring file operations
router.post('/file', 
  protect, 
  factoringController.createFile
);

router.get('/file/:fileNumber', 
  protect, 
  factoringController.getFile
);

router.get('/files', 
  protect, 
  factoringController.getAllFiles
);

router.put('/file/:fileNumber', 
  protect, 
  factoringController.updateFile
);

router.delete('/file/:fileNumber', 
  protect, 
  restrictTo('admin', 'factoring_agent'), 
  factoringController.deleteFile
);

// Invoice parsing
router.post('/parse-invoice', 
  protect, 
  factoringController.parseInvoice
);

// Risk assessment
router.get('/file/:fileNumber/risk', 
  protect, 
  factoringController.calculateRisk
);

router.post('/file/:fileNumber/risk/recalculate', 
  protect, 
  factoringController.recalculateRisk
);

// Verification
router.post('/file/:fileNumber/verify', 
  protect, 
  restrictTo('admin', 'factoring_agent'), 
  factoringController.verifyInvoice
);

router.post('/file/:fileNumber/verify-debtor', 
  protect, 
  restrictTo('admin', 'factoring_agent'), 
  factoringController.verifyDebtor
);

// Advance calculations
router.post('/calculate-advance', 
  protect, 
  factoringController.calculateAdvance
);

router.post('/file/:fileNumber/approve', 
  protect, 
  restrictTo('admin', 'factoring_agent'), 
  factoringController.approveAdvance
);

router.post('/file/:fileNumber/fund', 
  protect, 
  restrictTo('admin', 'factoring_agent'), 
  factoringController.fundAdvance
);

// Repayment tracking
router.post('/file/:fileNumber/repayment', 
  protect, 
  factoringController.recordRepayment
);

router.get('/files/overdue', 
  protect, 
  restrictTo('admin', 'factoring_agent'), 
  factoringController.getOverdueFiles
);

// Client management
router.get('/clients', 
  protect, 
  factoringController.getClients
);

router.get('/client/:clientName/history', 
  protect, 
  factoringController.getClientHistory
);

router.get('/client/:clientName/credit-limit', 
  protect, 
  factoringController.getClientCreditLimit
);

// Debtor analysis
router.get('/debtor/:debtorName/history', 
  protect, 
  factoringController.getDebtorHistory
);

router.get('/debtor/:debtorName/risk', 
  protect, 
  factoringController.getDebtorRisk
);

// Reporting
router.get('/reports/portfolio', 
  protect, 
  restrictTo('admin', 'factoring_agent'), 
  factoringController.getPortfolioReport
);

router.get('/reports/aging', 
  protect, 
  restrictTo('admin', 'factoring_agent'), 
  factoringController.getAgingReport
);

router.get('/reports/concentration', 
  protect, 
  restrictTo('admin', 'factoring_agent'), 
  factoringController.getConcentrationReport
);

// Status updates
router.patch('/file/:fileNumber/status', 
  protect, 
  restrictTo('admin', 'factoring_agent'), 
  factoringController.updateStatus
);

module.exports = router;