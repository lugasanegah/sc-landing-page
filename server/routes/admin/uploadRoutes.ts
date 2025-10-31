import { Router } from 'express';
import { uploadImage, uploadMultipleImages, uploadMiddleware } from '../../controllers/uploadController';
import { authenticateAdmin } from '../../middleware/auth';
import multer from 'multer';

const router = Router();

// Configure multer for multiple files
const uploadMultiple = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  },
}).array('images', 10); // Allow up to 10 images

// All upload routes require authentication
router.use(authenticateAdmin);

// Single image upload
router.post('/image', uploadMiddleware, uploadImage);

// Multiple images upload
router.post('/images', uploadMultiple, uploadMultipleImages);

export default router;