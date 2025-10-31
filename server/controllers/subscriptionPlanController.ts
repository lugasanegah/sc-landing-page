import { Request, Response } from 'express';
import { SubscriptionPlanService, CreatePlanInput, UpdatePlanInput } from '../services/subscriptionPlan.service';

export class SubscriptionPlanController {
  private subscriptionPlanService: SubscriptionPlanService;

  constructor() {
    this.subscriptionPlanService = new SubscriptionPlanService();
  }

  // Create new subscription plan
  async createPlan(req: Request, res: Response) {
    try {
      const planData: CreatePlanInput = req.body;

      // Validate required fields
      if (!planData.name || !planData.type || !planData.price_usd || !planData.price_idr || !planData.features) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: name, type, price_usd, price_idr, features'
        });
      }

      // Validate type
      if (!['MONTHLY', 'YEARLY'].includes(planData.type)) {
        return res.status(400).json({
          success: false,
          message: 'Type must be either MONTHLY or YEARLY'
        });
      }

      // Validate prices
      if (planData.price_usd <= 0 || planData.price_idr <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Prices must be greater than 0'
        });
      }

      const newPlan = await this.subscriptionPlanService.createPlan(planData);

      res.status(201).json({
        success: true,
        message: 'Subscription plan created successfully',
        data: newPlan
      });
    } catch (error) {
      console.error('Error in createPlan controller:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create subscription plan',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Update existing subscription plan
  async updatePlan(req: Request, res: Response) {
    try {
      const planId = req.params.id;
      const updateData: UpdatePlanInput = req.body;

      // Validate plan ID
      if (!planId) {
        return res.status(400).json({
          success: false,
          message: 'Plan ID is required'
        });
      }

      // Validate type if provided
      if (updateData.type && !['MONTHLY', 'YEARLY'].includes(updateData.type)) {
        return res.status(400).json({
          success: false,
          message: 'Type must be either MONTHLY or YEARLY'
        });
      }

      // Validate prices if provided
      if (updateData.price_usd !== undefined && updateData.price_usd <= 0) {
        return res.status(400).json({
          success: false,
          message: 'USD price must be greater than 0'
        });
      }

      if (updateData.price_idr !== undefined && updateData.price_idr <= 0) {
        return res.status(400).json({
          success: false,
          message: 'IDR price must be greater than 0'
        });
      }

      const updatedPlan = await this.subscriptionPlanService.updatePlan(planId, updateData);

      res.json({
        success: true,
        message: 'Subscription plan updated successfully',
        data: updatedPlan
      });
    } catch (error) {
      console.error('Error in updatePlan controller:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update subscription plan',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Delete (deactivate) subscription plan
  async deletePlan(req: Request, res: Response) {
    try {
      const planId = req.params.id;

      if (!planId) {
        return res.status(400).json({
          success: false,
          message: 'Plan ID is required'
        });
      }

      await this.subscriptionPlanService.deletePlan(planId);

      res.json({
        success: true,
        message: 'Subscription plan deactivated successfully'
      });
    } catch (error) {
      console.error('Error in deletePlan controller:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to deactivate subscription plan',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get plan by ID
  async getPlanById(req: Request, res: Response) {
    try {
      const planId = req.params.id;

      if (!planId) {
        return res.status(400).json({
          success: false,
          message: 'Plan ID is required'
        });
      }

      const plan = await this.subscriptionPlanService.getPlanById(planId);

      if (!plan) {
        return res.status(404).json({
          success: false,
          message: 'Subscription plan not found'
        });
      }

      res.json({
        success: true,
        data: plan
      });
    } catch (error) {
      console.error('Error in getPlanById controller:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get subscription plan',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get all active plans
  async getAllActivePlans(req: Request, res: Response) {
    try {
      const plans = await this.subscriptionPlanService.getAllActivePlans();

      res.json({
        success: true,
        data: plans,
        count: plans.length
      });
    } catch (error) {
      console.error('Error in getAllActivePlans controller:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get active subscription plans',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get all plans (including inactive)
  async getAllPlans(req: Request, res: Response) {
    try {
      const plans = await this.subscriptionPlanService.getAllPlans();

      res.json({
        success: true,
        data: plans,
        count: plans.length
      });
    } catch (error) {
      console.error('Error in getAllPlans controller:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get subscription plans',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get plans by type
  async getPlansByType(req: Request, res: Response) {
    try {
      const { type } = req.params;

      if (!type || !['MONTHLY', 'YEARLY'].includes(type)) {
        return res.status(400).json({
          success: false,
          message: 'Valid type parameter (MONTHLY or YEARLY) is required'
        });
      }

      const plans = await this.subscriptionPlanService.getPlansByType(type as 'MONTHLY' | 'YEARLY');

      res.json({
        success: true,
        data: plans,
        count: plans.length
      });
    } catch (error) {
      console.error('Error in getPlansByType controller:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get subscription plans by type',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Duplicate plan
  async duplicatePlan(req: Request, res: Response) {
    try {
      const planId = req.params.id;
      const { newName } = req.body;

      if (!planId) {
        return res.status(400).json({
          success: false,
          message: 'Plan ID is required'
        });
      }

      if (!newName || typeof newName !== 'string' || newName.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Valid new name is required'
        });
      }

      const duplicatedPlan = await this.subscriptionPlanService.duplicatePlan(planId, newName.trim());

      res.status(201).json({
        success: true,
        message: 'Subscription plan duplicated successfully',
        data: duplicatedPlan
      });
    } catch (error) {
      console.error('Error in duplicatePlan controller:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to duplicate subscription plan',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
} 