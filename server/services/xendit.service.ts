import axios, { AxiosResponse } from 'axios';

export interface CreatePlanData {
  reference_id: string;
  customer_id: string;
  amount: number;
  currency: string;
  recurring_action: 'CREATE' | 'UPDATE' | 'DELETE';
  items: Array<{
    name: string;
    reference_id: string;
    type: 'DIGITAL_PRODUCT' | 'PHYSICAL_PRODUCT' | 'DIGITAL_SERVICE' | 'PHYSICAL_SERVICE' | 'FEES' | 'DISCOUNT';
    quantity: number;
    unit_amount: number;
    net_unit_amount: number;
    unit_amount_currency: string;
    category: string;
    url: string;
  }>;
  recurring: {
    interval: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
    interval_count: number;
  };
  metadata?: Record<string, any>;
}

export interface UpdatePlanData {
  items?: Array<{
    name: string;
    reference_id: string;
    type: 'DIGITAL_PRODUCT' | 'PHYSICAL_PRODUCT' | 'DIGITAL_SERVICE' | 'PHYSICAL_SERVICE' | 'FEES' | 'DISCOUNT';
    quantity: number;
    unit_amount: number;
    net_unit_amount: number;
    unit_amount_currency: string;
    category: string;
    url: string;
  }>;
  metadata?: Record<string, any>;
}

export interface XenditPlanResponse {
  id: string;
  reference_id: string;
  customer_id: string;
  amount: number;
  currency: string;
  recurring_action: string;
  items: Array<{
    name: string;
    reference_id: string;
    type: string;
    quantity: number;
    unit_amount: number;
    net_unit_amount: number;
    unit_amount_currency: string;
    category: string;
    url: string;
  }>;
  recurring: {
    interval: string;
    interval_count: number;
  };
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  created_at: string;
  updated_at: string;
}

export class XenditService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.XENDIT_API_KEY!;
    this.baseUrl = process.env.XENDIT_BASE_URL || 'https://api.xendit.co';
    
    if (!this.apiKey) {
      throw new Error('XENDIT_API_KEY environment variable is required');
    }
  }

  private getAuthHeader(): string {
    const credentials = `${this.apiKey}:`;
    return `Basic ${Buffer.from(credentials).toString('base64')}`;
  }

  private async makeRequest<T>(
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    endpoint: string,
    data?: any
  ): Promise<T> {
    try {
      const config = {
        method,
        url: `${this.baseUrl}${endpoint}`,
        headers: {
          'Authorization': this.getAuthHeader(),
          'Content-Type': 'application/json',
        },
        data,
      };

      const response: AxiosResponse<T> = await axios(config);
      return response.data;
    } catch (error: any) {
      console.error('Xendit API Error:', error.response?.data || error.message);
      throw new Error(`Xendit API Error: ${error.response?.data?.message || error.message}`);
    }
  }

  // Create subscription plan di Xendit
  async createSubscriptionPlan(planData: CreatePlanData): Promise<XenditPlanResponse> {
    return this.makeRequest<XenditPlanResponse>('POST', '/recurring/plans', planData);
  }

  // Get subscription plan dari Xendit
  async getSubscriptionPlan(planId: string): Promise<XenditPlanResponse> {
    return this.makeRequest<XenditPlanResponse>('GET', `/recurring/plans/${planId}`);
  }

  // Update subscription plan di Xendit
  async updateSubscriptionPlan(planId: string, updateData: UpdatePlanData): Promise<XenditPlanResponse> {
    return this.makeRequest<XenditPlanResponse>('PATCH', `/recurring/plans/${planId}`, updateData);
  }

  // Deactivate subscription plan di Xendit
  async deactivateSubscriptionPlan(planId: string): Promise<{ message: string }> {
    return this.makeRequest<{ message: string }>('POST', `/recurring/plans/${planId}/deactivate`);
  }

  // Get list of subscription plans
  async getSubscriptionPlans(): Promise<{ data: XenditPlanResponse[] }> {
    return this.makeRequest<{ data: XenditPlanResponse[] }>('GET', '/recurring/plans');
  }

  // Create customer (if needed)
  async createCustomer(customerData: {
    reference_id: string;
    given_names: string;
    email?: string;
    mobile_number?: string;
    address?: string;
    description?: string;
    metadata?: Record<string, any>;
  }): Promise<{ id: string; reference_id: string }> {
    return this.makeRequest<{ id: string; reference_id: string }>('POST', '/customers', customerData);
  }

  // Get customer
  async getCustomer(customerId: string): Promise<any> {
    return this.makeRequest<any>('GET', `/customers/${customerId}`);
  }
} 