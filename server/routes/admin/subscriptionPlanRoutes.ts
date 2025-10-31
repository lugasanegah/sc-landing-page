import { Router } from 'express';
import { SubscriptionPlanController } from '../../controllers/subscriptionPlanController';

const router = Router();
const subscriptionPlanController = new SubscriptionPlanController();

// Create new subscription plan
router.post('/plans', subscriptionPlanController.createPlan.bind(subscriptionPlanController));

// Get all subscription plans (admin view - including inactive)
router.get('/plans', subscriptionPlanController.getAllPlans.bind(subscriptionPlanController));

// Get all active subscription plans
router.get('/plans/active', subscriptionPlanController.getAllActivePlans.bind(subscriptionPlanController));

// Get plans by type
router.get('/plans/type/:type', subscriptionPlanController.getPlansByType.bind(subscriptionPlanController));

// Get subscription plan by ID
router.get('/plans/:id', subscriptionPlanController.getPlanById.bind(subscriptionPlanController));

// Update subscription plan
router.put('/plans/:id', subscriptionPlanController.updatePlan.bind(subscriptionPlanController));

// Delete/deactivate subscription plan
router.delete('/plans/:id', subscriptionPlanController.deletePlan.bind(subscriptionPlanController));

// Duplicate subscription plan
router.post('/plans/:id/duplicate', subscriptionPlanController.duplicatePlan.bind(subscriptionPlanController));

export default router; 