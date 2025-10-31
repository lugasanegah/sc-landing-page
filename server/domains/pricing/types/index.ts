// Pricing domain types
export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  period: 'month' | 'year';
  description: string;
  features: string[];
  isPopular: boolean;
  maxAccounts?: number;
  supportLevel: 'email' | 'priority' | 'phone';
}

export interface Subscription {
  id: string;
  userId: number;
  planId: string;
  status: 'active' | 'canceled' | 'expired';
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
}