import React, { useState, useEffect } from 'react';
import { FeatureEditor } from './FeatureEditor';

interface SubscriptionPlan {
  _id: string;
  name: string;
  type: 'MONTHLY' | 'YEARLY';
  price_usd: number;
  price_idr: number;
  price_promo_usd?: number;
  price_promo_idr?: number;
  features: Record<string, any>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface SubscriptionPlanFormProps {
  plan?: SubscriptionPlan | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  title: string;
}

export const SubscriptionPlanForm: React.FC<SubscriptionPlanFormProps> = ({
  plan,
  onSubmit,
  onCancel,
  title
}) => {
  const [formData, setFormData] = useState({
    name: plan?.name || '',
    type: plan?.type || 'MONTHLY',
    price_usd: plan?.price_usd || 0,
    price_idr: plan?.price_idr || 0,
    price_promo_usd: plan?.price_promo_usd || 0,
    price_promo_idr: plan?.price_promo_idr || 0,
    features: plan?.features || {
      basic: {
        profile_reports: 0,
        hashtag_reports: 0,
        historical_data: '',
        exports: [],
        processing_benefits: ''
      },
      advanced: {
        competitor_analysis: false,
        trend_analysis: false,
        custom_insights: false
      },
      processing: {
        priority_support: false,
        dedicated_analyst: false,
        custom_reporting: false
      }
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (plan) {
      setFormData({
        name: plan.name,
        type: plan.type,
        price_usd: plan.price_usd,
        price_idr: plan.price_idr,
        price_promo_usd: plan.price_promo_usd || 0,
        price_promo_idr: plan.price_promo_idr || 0,
        features: plan.features
      });
    }
  }, [plan]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Plan name is required';
    }

    if (formData.price_usd <= 0) {
      newErrors.price_usd = 'USD price must be greater than 0';
    }

    if (formData.price_idr <= 0) {
      newErrors.price_idr = 'IDR price must be greater than 0';
    }

    if (formData.price_promo_usd > 0 && formData.price_promo_usd >= formData.price_usd) {
      newErrors.price_promo_usd = 'Promo price must be less than regular price';
    }

    if (formData.price_promo_idr > 0 && formData.price_promo_idr >= formData.price_idr) {
      newErrors.price_promo_idr = 'Promo price must be less than regular price';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const submitData = {
        ...formData,
        price_promo_usd: formData.price_promo_usd > 0 ? formData.price_promo_usd : undefined,
        price_promo_idr: formData.price_promo_idr > 0 ? formData.price_promo_idr : undefined
      };
      
      onSubmit(submitData);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFeaturesChange = (newFeatures: Record<string, any>) => {
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Plan Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Basic, Pro, Premium, Enterprise"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  Plan Type *
                </label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="MONTHLY">Monthly</option>
                  <option value="YEARLY">Yearly</option>
                </select>
              </div>
            </div>

            {/* Pricing */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Pricing</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="price_usd" className="block text-sm font-medium text-gray-700 mb-2">
                    USD Price *
                  </label>
                  <input
                    type="number"
                    id="price_usd"
                    value={formData.price_usd}
                    onChange={(e) => handleInputChange('price_usd', parseFloat(e.target.value) || 0)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.price_usd ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                  {errors.price_usd && <p className="mt-1 text-sm text-red-600">{errors.price_usd}</p>}
                </div>

                <div>
                  <label htmlFor="price_idr" className="block text-sm font-medium text-gray-700 mb-2">
                    IDR Price *
                  </label>
                  <input
                    type="number"
                    id="price_idr"
                    value={formData.price_idr}
                    onChange={(e) => handleInputChange('price_idr', parseFloat(e.target.value) || 0)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.price_idr ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0"
                    min="0"
                  />
                  {errors.price_idr && <p className="mt-1 text-sm text-red-600">{errors.price_idr}</p>}
                </div>

                <div>
                  <label htmlFor="price_promo_usd" className="block text-sm font-medium text-gray-700 mb-2">
                    Promo USD Price
                  </label>
                  <input
                    type="number"
                    id="price_promo_usd"
                    value={formData.price_promo_usd}
                    onChange={(e) => handleInputChange('price_promo_usd', parseFloat(e.target.value) || 0)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.price_promo_usd ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                  {errors.price_promo_usd && <p className="mt-1 text-sm text-red-600">{errors.price_promo_usd}</p>}
                </div>

                <div>
                  <label htmlFor="price_promo_idr" className="block text-sm font-medium text-gray-700 mb-2">
                    Promo IDR Price
                  </label>
                  <input
                    type="number"
                    id="price_promo_idr"
                    value={formData.price_promo_idr}
                    onChange={(e) => handleInputChange('price_promo_idr', parseFloat(e.target.value) || 0)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.price_promo_idr ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0"
                    min="0"
                  />
                  {errors.price_promo_idr && <p className="mt-1 text-sm text-red-600">{errors.price_promo_idr}</p>}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Features</h4>
              <FeatureEditor
                features={formData.features}
                onChange={handleFeaturesChange}
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {plan ? 'Update Plan' : 'Create Plan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}; 