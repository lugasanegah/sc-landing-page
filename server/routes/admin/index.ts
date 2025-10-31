import { Router } from 'express';
import authRoutes from './authRoutes';
import blogRoutes from './blogRoutes';
import uploadRoutes from './uploadRoutes';
import subscriptionPlanRoutes from './subscriptionPlanRoutes';
import { adminCategoriesRouter } from '../adminCategories.js';

const router = Router();

// Admin API routes
router.use('/auth', authRoutes);
router.use('/blogs', blogRoutes);
router.use('/categories', adminCategoriesRouter);
router.use('/upload', uploadRoutes);
router.use('/subscription-plans', subscriptionPlanRoutes);

export default router;