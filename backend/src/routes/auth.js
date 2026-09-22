import { Router } from 'express';
import { changePassword, getCurrentUser, login, logout, logoutAll } from '../controllers/authController.js';
import { authenticate } from '../middleware/authenticate.js';
import { rateLimit } from '../middleware/rateLimit.js';

const router = Router();

router.post('/login', rateLimit({ max: 30 }), login);
router.post('/change-password', rateLimit({ max: 10 }), changePassword);
router.get('/me', authenticate, getCurrentUser);
router.post('/logout', authenticate, logout);
router.post('/logout-all', authenticate, logoutAll);

export default router;