const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const { protect } = require('../middleware/authMiddleware');
const { uploadLimiter } = require('../middleware/rateLimiter');
const multer = require('multer');

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx|xls|xlsx|csv|png|jpg|jpeg/;
    const extname = allowedTypes.test(file.originalname.toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, DOCX, XLS, XLSX, CSV, and images allowed.'));
    }
  }
});

// Upload routes
router.post('/document',
  protect,
  uploadLimiter,
  upload.single('file'),
  uploadController.uploadDocument
);

router.post('/documents/batch',
  protect,
  uploadLimiter,
  upload.array('files', 10),
  uploadController.uploadMultipleDocuments
);

router.get('/document/:id',
  protect,
  uploadController.getDocument
);

router.delete('/document/:id',
  protect,
  uploadController.deleteDocument
);

router.get('/documents',
  protect,
  uploadController.listDocuments
);

module.exports = router;