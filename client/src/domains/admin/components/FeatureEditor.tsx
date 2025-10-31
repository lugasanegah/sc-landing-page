import React, { useState } from 'react';

interface FeatureEditorProps {
  features: Record<string, any>;
  onChange: (features: Record<string, any>) => void;
}

export const FeatureEditor: React.FC<FeatureEditorProps> = ({ features, onChange }) => {
  const [activeTab, setActiveTab] = useState('basic');

  const updateFeature = (key: string, value: any) => {
    const newFeatures = { ...features };
    if (key.includes('.')) {
      const [section, field] = key.split('.');
      if (!newFeatures[section]) {
        newFeatures[section] = {};
      }
      newFeatures[section][field] = value;
    } else {
      newFeatures[key] = value;
    }
    onChange(newFeatures);
  };

  const addExportOption = () => {
    const currentExports = features.basic?.exports || [];
    updateFeature('basic.exports', [...currentExports, '']);
  };

  const removeExportOption = (index: number) => {
    const currentExports = features.basic?.exports || [];
    const newExports = currentExports.filter((_: any, i: number) => i !== index);
    updateFeature('basic.exports', newExports);
  };

  const updateExportOption = (index: number, value: string) => {
    const currentExports = features.basic?.exports || [];
    const newExports = [...currentExports];
    newExports[index] = value;
    updateFeature('basic.exports', newExports);
  };

  const tabs = [
    { id: 'basic', name: 'Basic Features', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'advanced', name: 'Advanced Features', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { id: 'processing', name: 'Processing Benefits', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 012 2v6a2 2 0 002 2h2a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2zm0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2H9a2 2 0 01-2-2z' }
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                <span>{tab.name}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'basic' && (
          <div className="space-y-4">
            <h5 className="text-lg font-medium text-gray-900">Basic Features</h5>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Reports
                </label>
                <input
                  type="number"
                  value={features.basic?.profile_reports || 0}
                  onChange={(e) => updateFeature('basic.profile_reports', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hashtag Reports
                </label>
                <input
                  type="number"
                  value={features.basic?.hashtag_reports || 0}
                  onChange={(e) => updateFeature('basic.hashtag_reports', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Historical Data
                </label>
                <input
                  type="text"
                  value={features.basic?.historical_data || ''}
                  onChange={(e) => updateFeature('basic.historical_data', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 30 days, 500 posts"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Processing Benefits
                </label>
                <select
                  value={features.basic?.processing_benefits || ''}
                  onChange={(e) => updateFeature('basic.processing_benefits', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select processing speed</option>
                  <option value="Standard">Standard</option>
                  <option value="Fast">Fast</option>
                  <option value="Very Fast">Very Fast</option>
                  <option value="Instant">Instant</option>
                </select>
              </div>
            </div>

            {/* Export Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Export Formats
              </label>
              <div className="space-y-2">
                {(features.basic?.exports || []).map((exportOption: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={exportOption}
                      onChange={(e) => updateExportOption(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., PDF, Excel, CSV"
                    />
                    <button
                      type="button"
                      onClick={() => removeExportOption(index)}
                      className="px-3 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addExportOption}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md border border-blue-200"
                >
                  + Add Export Format
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="space-y-4">
            <h5 className="text-lg font-medium text-gray-900">Advanced Features</h5>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="competitor_analysis"
                  checked={features.advanced?.competitor_analysis || false}
                  onChange={(e) => updateFeature('advanced.competitor_analysis', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="competitor_analysis" className="ml-2 block text-sm text-gray-900">
                  Competitor Analysis
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="trend_analysis"
                  checked={features.advanced?.trend_analysis || false}
                  onChange={(e) => updateFeature('advanced.trend_analysis', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="trend_analysis" className="ml-2 block text-sm text-gray-900">
                  Trend Analysis
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="custom_insights"
                  checked={features.advanced?.custom_insights || false}
                  onChange={(e) => updateFeature('advanced.custom_insights', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="custom_insights" className="ml-2 block text-sm text-gray-900">
                  Custom Insights
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'processing' && (
          <div className="space-y-4">
            <h5 className="text-lg font-medium text-gray-900">Processing Benefits</h5>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="priority_support"
                  checked={features.processing?.priority_support || false}
                  onChange={(e) => updateFeature('processing.priority_support', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="priority_support" className="ml-2 block text-sm text-gray-900">
                  Priority Support
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="dedicated_analyst"
                  checked={features.processing?.dedicated_analyst || false}
                  onChange={(e) => updateFeature('processing.dedicated_analyst', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="dedicated_analyst" className="ml-2 block text-sm text-gray-900">
                  Dedicated Analyst
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="custom_reporting"
                  checked={features.processing?.custom_reporting || false}
                  onChange={(e) => updateFeature('processing.custom_reporting', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="custom_reporting" className="ml-2 block text-sm text-gray-900">
                  Custom Reporting
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 