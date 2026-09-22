import { Router } from 'express';
import dashboardRouter from './dashboard.js';
import authRouter from './auth.js';
import healthRouter from './health.js';
import madarsaRouter from './madarsa.js';
import studentsRouter from './students.js';

const router = Router();

// Authentication
router.use('/auth', authRouter);

// System Status
router.use('/system/status', healthRouter);

// Dashboard
router.use('/madarsa/dashboard', dashboardRouter);
router.use('/madarsa/students', studentsRouter);

// Madarsa Modules - Students, Academics, Accounting, Library, Kitchen, Hostel, Administration
router.use('/madarsa', madarsaRouter);

export default router;