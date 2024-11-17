const express = require('express');
const upload = require('../config/multer'); // Multer configuration
const { uploadFile, listFiles, downloadFile } = require('../controllers/fileController');
const authMiddleware = require('../middlewares/authMiddleware');
const rolesMiddleware = require('../middlewares/rolesMiddleware');

const router = express.Router();


router.post(
  '/upload',
  authMiddleware,
  rolesMiddleware('Ops User'),
  (req, res, next) => {
    console.log('Multer middleware running');
    next(); // Proceed to next middleware
  },
  upload,
  (req, res, next) => {
    console.log('After Multer middleware: File:', req.file);
    next();
  },
  uploadFile
);

// Other routes
router.get('/list-files', authMiddleware, rolesMiddleware('Client User'), listFiles);
router.get('/download-file/:file_id', authMiddleware, rolesMiddleware('Client User'), downloadFile);

module.exports = router;
