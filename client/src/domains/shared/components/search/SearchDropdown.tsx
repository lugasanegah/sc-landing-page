import React from 'react';
import { SearchResultItem as SearchResultItemType } from '../../types/search';
import SearchTabs from './SearchTabs';
import SearchResultItem from './SearchResultItem';
import SearchFallbackItem from './SearchFallbackItem';

interface SearchDropdownProps {
  isOpen: boolean;
  results: SearchResultItemType[];
  isLoading: boolean;
  activeTab: 'profile' | 'hashtag';
  onTabChange: (tab: 'profile' | 'hashtag') => void;
  onResultClick: (result: SearchResultItemType) => void;
  onFallbackClick?: (
    platform: 'instagram' | 'twitter' | 'tiktok',
    query: string,
    activeTab: 'profile' | 'hashtag'
  ) => void;
  query: string;
  error?: string | null;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  isOpen,
  results,
  isLoading,
  activeTab,
  onTabChange,
  onResultClick,
  onFallbackClick,
  query,
  error = null,
  onMouseEnter,
  onMouseLeave
}) => {
  if (!isOpen) return null;

  const filteredResults = results.filter(result => result.service === activeTab);

  const renderContent = () => {
    if (error) {
      return (
        <div className="flex items-center justify-center py-8 w-full">
          <div className="text-center">
            <p className="text-red-500 text-sm mb-2">Search Error</p>
            <p className="text-gray-500 text-xs">{error}</p>
            <p className="text-gray-400 text-xs mt-1">Please try again later</p>
          </div>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-8 w-full">
          <div className="animate-spin h-6 w-6 border-2 border-gray-300 border-t-prelinecoblue-ribbon rounded-full" />
          <span className="ml-3 text-gray-600">Searching...</span>
        </div>
      );
    }

    if (filteredResults.length > 0) {
      return (
        <>
          {filteredResults.map((result, index) => (
            <SearchResultItem
              key={`${result.service}-${result.platform}-${index}`}
              item={result}
              onClick={() => onResultClick(result)}
            />
          ))}
        </>
      );
    }

    if (query.trim()) {
      return (
        <>
          <div className="w-full py-2">
            <p className="text-gray-500 text-xs text-center mb-3">
              No results found. Start analyzing on:
            </p>
          </div>
          <SearchFallbackItem
            platform="instagram"
            query={query}
            activeTab={activeTab}
            onClick={() => onFallbackClick?.('instagram', query, activeTab)}
            disabled={false}
          />
          <SearchFallbackItem
            platform="twitter"
            query={query}
            activeTab={activeTab}
            disabled={true}
          />
          <SearchFallbackItem
            platform="tiktok"
            query={query}
            activeTab={activeTab}
            disabled={true}
          />
        </>
      );
    }

    return (
      <div className="flex items-center justify-center py-8 w-full">
        <div className="text-center">
          <p className="text-gray-500 text-sm">Start typing to search for {activeTab}s</p>
          <p className="text-gray-400 text-xs mt-1">We'll help you find influencers and hashtags</p>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`
        absolute top-full left-0 z-50 mt-4 py-4 bg-white border border-gray-200
        rounded-lg shadow-lg overflow-hidden w-[420px] max-w-[90vw]
        transition-all duration-200 ease-out
        ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 invisible'}
      `}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="content-stretch flex flex-col gap-2 items-start justify-start relative w-full max-h-80 overflow-hidden">
        <SearchTabs activeTab={activeTab} onTabChange={onTabChange} />

        <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start px-4 py-0 relative shrink-0 w-full overflow-y-auto max-h-64">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SearchDropdown;
