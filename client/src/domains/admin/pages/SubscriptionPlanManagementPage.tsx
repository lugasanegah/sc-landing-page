import React, { useState, useEffect } from 'react';
import { SubscriptionPlanForm } from '../components/SubscriptionPlanForm';
import { SubscriptionPlanTable } from '../components/SubscriptionPlanTable';
import { SubscriptionPlanCard } from '../components/SubscriptionPlanCard';
import { FeatureEditor } from '../components/FeatureEditor';

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

export const SubscriptionPlanManagementPage: React.FC = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [filterType, setFilterType] = useState<'ALL' | 'MONTHLY' | 'YEARLY'>('ALL');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL');

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/subscription-plans/plans');
      const result = await response.json();
      
      if (result.success) {
        setPlans(result.data);
      } else {
        console.error('Failed to fetch plans:', result.message);
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlan = async (planData: any) => {
    try {
      const response = await fetch('/api/admin/subscription-plans/plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(planData),
      });

      const result = await response.json();
      
      if (result.success) {
        setShowForm(false);
        fetchPlans();
        // Show success notification
        showNotification('Plan created successfully!', 'success');
      } else {
        showNotification(result.message || 'Failed to create plan', 'error');
      }
    } catch (error) {
      console.error('Error creating plan:', error);
      showNotification('Error creating plan', 'error');
    }
  };

  const handleUpdatePlan = async (planId: string, updateData: any) => {
    try {
      const response = await fetch(`/api/admin/subscription-plans/plans/${planId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const result = await response.json();
      
      if (result.success) {
        setEditingPlan(null);
        fetchPlans();
        showNotification('Plan updated successfully!', 'success');
      } else {
        showNotification(result.message || 'Failed to update plan', 'error');
      }
    } catch (error) {
      console.error('Error updating plan:', error);
      showNotification('Error updating plan', 'error');
    }
  };

  const handleDeletePlan = async (planId: string) => {
    if (!confirm('Are you sure you want to deactivate this plan?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/subscription-plans/plans/${planId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        fetchPlans();
        showNotification('Plan deactivated successfully!', 'success');
      } else {
        showNotification(result.message || 'Failed to deactivate plan', 'error');
      }
    } catch (error) {
      console.error('Error deactivating plan:', error);
      showNotification('Error deactivating plan', 'error');
    }
  };

  const handleDuplicatePlan = async (planId: string, newName: string) => {
    try {
      const response = await fetch(`/api/admin/subscription-plans/plans/${planId}/duplicate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newName }),
      });

      const result = await response.json();
      
      if (result.success) {
        fetchPlans();
        showNotification('Plan duplicated successfully!', 'success');
      } else {
        showNotification(result.message || 'Failed to duplicate plan', 'error');
      }
    } catch (error) {
      console.error('Error duplicating plan:', error);
      showNotification('Error duplicating plan', 'error');
    }
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    // Simple notification - you can replace this with a proper toast library
    alert(`${type.toUpperCase()}: ${message}`);
  };

  const filteredPlans = plans.filter(plan => {
    if (filterType !== 'ALL' && plan.type !== filterType) return false;
    if (filterStatus !== 'ALL') {
      if (filterStatus === 'ACTIVE' && !plan.is_active) return false;
      if (filterStatus === 'INACTIVE' && plan.is_active) return false;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Subscription Plans</h1>
              <p className="mt-2 text-gray-600">Manage your subscription plans and pricing</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create New Plan
            </button>
          </div>
        </div>

        {/* Filters and View Toggle */}
        <div className="mb-6 bg-white rounded-lg shadow p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Type Filter */}
              <div>
                <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Plan Type
                </label>
                <select
                  id="type-filter"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="ALL">All Types</option>
                  <option value="MONTHLY">Monthly</option>
                  <option value="YEARLY">Yearly</option>
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status-filter"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="ALL">All Status</option>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">View:</span>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-md ${
                  viewMode === 'table'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`p-2 rounded-md ${
                  viewMode === 'cards'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'table' ? (
          <SubscriptionPlanTable
            plans={filteredPlans}
            onEdit={setEditingPlan}
            onDelete={handleDeletePlan}
            onDuplicate={handleDuplicatePlan}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans.map((plan) => (
              <SubscriptionPlanCard
                key={plan._id}
                plan={plan}
                onEdit={setEditingPlan}
                onDelete={handleDeletePlan}
                onDuplicate={handleDuplicatePlan}
              />
            ))}
          </div>
        )}

        {/* Create/Edit Form Modal */}
        {showForm && (
          <SubscriptionPlanForm
            onSubmit={handleCreatePlan}
            onCancel={() => setShowForm(false)}
            title="Create New Subscription Plan"
          />
        )}

        {/* Edit Form Modal */}
        {editingPlan && (
          <SubscriptionPlanForm
            plan={editingPlan}
                            onSubmit={(data) => handleUpdatePlan(editingPlan._id, data)}
            onCancel={() => setEditingPlan(null)}
            title="Edit Subscription Plan"
          />
        )}
      </div>
    </div>
  );
}; 