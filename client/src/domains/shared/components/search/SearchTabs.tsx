import React from 'react';

interface SearchTabsProps {
  activeTab: 'profile' | 'hashtag';
  onTabChange: (tab: 'profile' | 'hashtag') => void;
  className?: string;
}

const SearchTabs: React.FC<SearchTabsProps> = ({ activeTab, onTabChange, className = "" }) => {
  return (
    <div className={`
      box-border content-stretch flex gap-3 items-start justify-start pb-2 pt-0
      px-6 relative shrink-0 w-full border-b border-gray-200
      ${className}
    `}>
      <button
        onClick={() => onTabChange('profile')}
        className={`
          content-stretch flex flex-col items-start justify-center relative rounded-lg shrink-0
          transition-colors duration-200
          ${activeTab === 'profile'
            ? 'bg-blue-100'
            : 'hover:bg-gray-100'
          }
        `}
      >
        <div className={`
          box-border content-stretch flex gap-2 items-center justify-start px-3 py-1.5
          relative rounded-lg shrink-0 transition-colors duration-200
          ${activeTab === 'profile'
            ? 'bg-blue-100'
            : ''
          }
        `}>
          <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0">
            <div className={`
              font-medium leading-5 not-italic relative shrink-0 text-sm
              text-nowrap tracking-[0.07px] transition-colors duration-200
              ${activeTab === 'profile'
                ? 'text-prelinecoblue-ribbon'
                : 'text-gray-600 hover:text-gray-800'
              }
            `}>
              Profile
            </div>
          </div>
        </div>
      </button>

      <button
        onClick={() => onTabChange('hashtag')}
        className={`
          box-border content-stretch flex flex-col items-start justify-center px-3 py-0
          relative rounded-lg shrink-0 transition-colors duration-200
          ${activeTab === 'hashtag'
            ? 'bg-blue-100'
            : 'hover:bg-gray-100'
          }
        `}
      >
        <div className="box-border content-stretch flex gap-2 items-center justify-start px-0 py-1.5 relative shrink-0">
          <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0">
            <div className={`
              font-medium leading-5 not-italic relative shrink-0 text-sm
              text-nowrap tracking-[0.07px] transition-colors duration-200
              ${activeTab === 'hashtag'
                ? 'text-prelinecoblue-ribbon'
                : 'text-gray-600 hover:text-gray-800'
              }
            `}>
              Hashtags
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default SearchTabs;