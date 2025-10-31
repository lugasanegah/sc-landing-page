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

interface SubscriptionPlanTableProps {
  plans: SubscriptionPlan[];
  onEdit: (plan: SubscriptionPlan) => void;
  onDelete: (planId: string) => void;
  onDuplicate: (planId: string, newName: string) => void;
}

export const SubscriptionPlanTable: React.FC<SubscriptionPlanTableProps> = ({
  plans,
  onEdit,
  onDelete,
  onDuplicate
}) => {
  const [duplicatingPlan, setDuplicatingPlan] = useState<string | null>(null);
  const [newPlanName, setNewPlanName] = useState('');

  const handleDuplicate = (planId: string) => {
    if (newPlanName.trim()) {
      onDuplicate(planId, newPlanName.trim());
      setDuplicatingPlan(null);
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

  if (plans.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No subscription plans</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating your first subscription plan.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Plan Details
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Pricing
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Features
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {plans.map((plan) => (
            <tr key={plan._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">{plan.name}</div>
                  <div className="text-sm text-gray-500">{getTypeBadge(plan.type)}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  <div>{formatPrice(plan.price_usd)}</div>
                  <div className="text-gray-500">{formatPriceIDR(plan.price_idr)}</div>
                  {plan.price_promo_usd && (
                    <div className="text-xs text-green-600">
                      Promo: {formatPrice(plan.price_promo_usd)} / {formatPriceIDR(plan.price_promo_idr || 0)}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">
                  <div>Profile Reports: {plan.features.basic?.profile_reports || 'N/A'}</div>
                  <div>Hashtag Reports: {plan.features.basic?.hashtag_reports || 'N/A'}</div>
                  <div>Historical Data: {plan.features.basic?.historical_data || 'N/A'}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(plan.is_active)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(plan.created_at)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onEdit(plan)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(plan._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setDuplicatingPlan(plan._id)}
                    className="text-green-600 hover:text-green-900"
                  >
                    Duplicate
                  </button>
                </div>

                {/* Duplicate Modal */}
                {duplicatingPlan === plan._id && (
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
                            onClick={() => setDuplicatingPlan(null)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleDuplicate(plan._id)}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                          >
                            Duplicate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 