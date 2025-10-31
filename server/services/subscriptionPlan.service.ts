import { SubscriptionPlan, ISubscriptionPlan } from '../../shared/schema';
import { XenditService, CreatePlanData, UpdatePlanData } from './xendit.service';

export interface CreatePlanInput {
  name: string;
  type: 'MONTHLY' | 'YEARLY';
  price_usd: number;
  price_idr: number;
  price_promo_usd?: number;
  price_promo_idr?: number;
  features: Record<string, any>;
}

export interface UpdatePlanInput {
  name?: string;
  type?: 'MONTHLY' | 'YEARLY';
  price_usd?: number;
  price_idr?: number;
  price_promo_usd?: number;
  price_promo_idr?: number;
  features?: Record<string, any>;
  is_active?: boolean;
}

export class SubscriptionPlanService {
  private xenditService: XenditService;

  constructor() {
    this.xenditService = new XenditService();
  }

  // Create new subscription plan
  async createPlan(planData: CreatePlanInput): Promise<ISubscriptionPlan> {
    try {
      // Create customer first if not exists
      let customerId = process.env.XENDIT_DEFAULT_CUSTOMER_ID;
      
      if (!customerId) {
        // Create a default customer for the system
        const customerData = {
          reference_id: `customer_socialcrab_${Date.now()}`,
          given_names: 'SocialCrab System',
          email: 'system@socialcrab.com',
          description: 'Default customer for SocialCrab subscription plans'
        };
        
        const customer = await this.xenditService.createCustomer(customerData);
        customerId = customer.id;
        
        // Save customer ID to environment for future use
        console.log('Created default customer with ID:', customerId);
      }

      // Create plan di Xendit terlebih dahulu
      const xenditPlanData: CreatePlanData = {
        reference_id: `plan_${Date.now()}`,
        customer_id: customerId!,
        amount: planData.price_idr,
        currency: 'IDR',
        recurring_action: 'CREATE',
        items: [
          {
            name: planData.name,
            reference_id: `item_${Date.now()}`,
            type: 'DIGITAL_SERVICE',
            quantity: 1,
            unit_amount: planData.price_idr,
            net_unit_amount: planData.price_idr,
            unit_amount_currency: 'IDR',
            category: 'subscription',
            url: 'https://socialcrab.com',
          },
        ],
        recurring: {
          interval: planData.type === 'MONTHLY' ? 'MONTH' : 'YEAR',
          interval_count: 1,
        },
      };

      const xenditPlan = await this.xenditService.createSubscriptionPlan(xenditPlanData);

      // Simpan ke database lokal
      const newPlan = new SubscriptionPlan({
        ...planData,
        xendit_plan_id: xenditPlan.id,
        is_active: true,
      });

      const savedPlan = await newPlan.save();
      return savedPlan;
    } catch (error) {
      console.error('Error creating subscription plan:', error);
      throw new Error(`Failed to create subscription plan: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Update existing subscription plan
  async updatePlan(planId: string, updateData: UpdatePlanInput): Promise<ISubscriptionPlan> {
    try {
      const currentPlan = await SubscriptionPlan.findById(planId);
      if (!currentPlan) {
        throw new Error('Subscription plan not found');
      }

      // Update di Xendit jika ada perubahan yang relevan
      if (currentPlan.xendit_plan_id && (updateData.price_idr || updateData.name)) {
        const xenditUpdateData: UpdatePlanData = {};
        
        if (updateData.price_idr) {
          xenditUpdateData.items = [
            {
              name: updateData.name || currentPlan.name,
              reference_id: `item_${Date.now()}`,
              type: 'DIGITAL_SERVICE',
              quantity: 1,
              unit_amount: updateData.price_idr,
              net_unit_amount: updateData.price_idr,
              unit_amount_currency: 'IDR',
              category: 'subscription',
              url: 'https://socialcrab.com',
            },
          ];
        }

        await this.xenditService.updateSubscriptionPlan(currentPlan.xendit_plan_id, xenditUpdateData);
      }

      // Update di database lokal
      const updatedPlan = await SubscriptionPlan.findByIdAndUpdate(
        planId,
        { ...updateData, updated_at: new Date() },
        { new: true, runValidators: true }
      );

      if (!updatedPlan) {
        throw new Error('Failed to update subscription plan');
      }

      return updatedPlan;
    } catch (error) {
      console.error('Error updating subscription plan:', error);
      throw new Error(`Failed to update subscription plan: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Delete (deactivate) subscription plan
  async deletePlan(planId: string): Promise<void> {
    try {
      const currentPlan = await SubscriptionPlan.findById(planId);
      if (!currentPlan) {
        throw new Error('Subscription plan not found');
      }

      // Deactivate di Xendit
      if (currentPlan.xendit_plan_id) {
        await this.xenditService.deactivateSubscriptionPlan(currentPlan.xendit_plan_id);
      }

      // Update status di database lokal
      await SubscriptionPlan.findByIdAndUpdate(planId, { 
        is_active: false, 
        updated_at: new Date() 
      });
    } catch (error) {
      console.error('Error deleting subscription plan:', error);
      throw new Error(`Failed to delete subscription plan: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Get plan by ID
  async getPlanById(planId: string): Promise<ISubscriptionPlan | null> {
    try {
      const plan = await SubscriptionPlan.findById(planId);
      return plan;
    } catch (error) {
      console.error('Error getting subscription plan by ID:', error);
      throw new Error(`Failed to get subscription plan: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Get all active plans
  async getAllActivePlans(): Promise<ISubscriptionPlan[]> {
    try {
      return await SubscriptionPlan.find({ is_active: true })
        .sort({ created_at: -1 });
    } catch (error) {
      console.error('Error getting all active plans:', error);
      throw new Error(`Failed to get subscription plans: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Get all plans (including inactive)
  async getAllPlans(): Promise<ISubscriptionPlan[]> {
    try {
      return await SubscriptionPlan.find()
        .sort({ created_at: -1 });
    } catch (error) {
      console.error('Error getting all plans:', error);
      throw new Error(`Failed to get subscription plans: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Get plans by type
  async getPlansByType(type: 'MONTHLY' | 'YEARLY'): Promise<ISubscriptionPlan[]> {
    try {
      return await SubscriptionPlan.find({ 
        type, 
        is_active: true 
      }).sort({ created_at: -1 });
    } catch (error) {
      console.error('Error getting plans by type:', error);
      throw new Error(`Failed to get subscription plans by type: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Duplicate plan
  async duplicatePlan(planId: string, newName: string): Promise<ISubscriptionPlan> {
    try {
      const originalPlan = await this.getPlanById(planId);
      if (!originalPlan) {
        throw new Error('Original subscription plan not found');
      }

      const duplicateData: CreatePlanInput = {
        name: newName,
        type: originalPlan.type,
        price_usd: originalPlan.price_usd,
        price_idr: originalPlan.price_idr,
        price_promo_usd: originalPlan.price_promo_usd,
        price_promo_idr: originalPlan.price_promo_idr,
        features: originalPlan.features,
      };

      return await this.createPlan(duplicateData);
    } catch (error) {
      console.error('Error duplicating subscription plan:', error);
      throw new Error(`Failed to duplicate subscription plan: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
} 