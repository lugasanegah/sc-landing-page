import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { login, logout, getProfile, createAdmin, loginValidation } from '../../controllers/authController';
import { authenticateAdmin, requireSuperAdmin } from '../../middleware/auth';

const router = Router();

// Rate limiting for login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many login attempts, please try again later.'
  },
  trustProxy: true // Fix for proxy headers
});

// Auth routes
router.post('/login', loginLimiter, loginValidation, login);
router.post('/logout', logout);
router.get('/profile', authenticateAdmin, getProfile);
router.post('/create-admin', authenticateAdmin, requireSuperAdmin, createAdmin);

export default router;