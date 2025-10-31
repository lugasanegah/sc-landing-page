import React, { useState } from 'react';

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

interface SubscriptionPlanCardProps {
  plan: SubscriptionPlan;
  onEdit: (plan: SubscriptionPlan) => void;
  onDelete: (planId: string) => void;
  onDuplicate: (planId: string, newName: string) => void;
}

export const SubscriptionPlanCard: React.FC<SubscriptionPlanCardProps> = ({
  plan,
  onEdit,
  onDelete,
  onDuplicate
}) => {
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [newPlanName, setNewPlanName] = useState('');

  const handleDuplicate = () => {
    if (newPlanName.trim()) {
      onDuplicate(plan._id, newPlanName.trim());
      setShowDuplicateModal(false);
      setNewPlanName('');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };

  const formatPriceIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (isActive: boolean) => {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isActive
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'
      }`}>
        {isActive ? 'Active' : 'Inactive'}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        type === 'MONTHLY'
          ? 'bg-blue-100 text-blue-800'
          : 'bg-purple-100 text-purple-800'
      }`}>
        {type}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              {getTypeBadge(plan.type)}
              {getStatusBadge(plan.is_active)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{formatPrice(plan.price_usd)}</div>
            <div className="text-sm text-gray-600">{formatPriceIDR(plan.price_idr)}</div>
            {plan.price_promo_usd && (
              <div className="text-sm text-green-600">
                Promo: {formatPrice(plan.price_promo_usd)} / {formatPriceIDR(plan.price_promo_idr || 0)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="px-6 py-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Features</h4>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
            Profile Reports: {plan.features.basic?.profile_reports || 'N/A'}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            Hashtag Reports: {plan.features.basic?.hashtag_reports || 'N/A'}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
            Historical Data: {plan.features.basic?.historical_data || 'N/A'}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
            Exports: {plan.features.basic?.exports?.join(', ') || 'N/A'}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
            Processing: {plan.features.basic?.processing_benefits || 'N/A'}
          </div>
        </div>

        {/* Advanced Features */}
        {plan.features.advanced && (
          <div className="mt-4">
            <h5 className="text-sm font-medium text-gray-900 mb-2">Advanced Features</h5>
            <div className="space-y-1">
              {plan.features.advanced.competitor_analysis && (
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Competitor Analysis
                </div>
              )}
              {plan.features.advanced.trend_analysis && (
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Trend Analysis
                </div>
              )}
              {plan.features.advanced.custom_insights && (
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Custom Insights
                </div>
              )}
            </div>
          </div>
        )}

        {/* Processing Benefits */}
        {plan.features.processing && (
          <div className="mt-4">
            <h5 className="text-sm font-medium text-gray-900 mb-2">Processing Benefits</h5>
            <div className="space-y-1">
              {plan.features.processing.priority_support && (
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                  Priority Support
                </div>
              )}
              {plan.features.processing.dedicated_analyst && (
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                  Dedicated Analyst
                </div>
              )}
              {plan.features.processing.custom_reporting && (
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                  Custom Reporting
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Created: {formatDate(plan.created_at)}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit(plan)}
              className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(plan._id)}
              className="px-3 py-1 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
            >
              Delete
            </button>
            <button
              onClick={() => setShowDuplicateModal(true)}
              className="px-3 py-1 text-sm font-medium text-green-600 hover:text-green-800 hover:bg-green-50 rounded-md transition-colors"
            >
              Duplicate
            </button>
          </div>
        </div>
      </div>

      {/* Duplicate Modal */}
      {showDuplicateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Duplicate Plan</h3>
              <input
                type="text"
                placeholder="Enter new plan name"
                value={newPlanName}
                onChange={(e) => setNewPlanName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => setShowDuplicateModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDuplicate}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Duplicate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 