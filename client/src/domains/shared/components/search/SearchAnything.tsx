import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SearchResultItem as SearchResultItemType, SearchProfileData, SearchHashtagData } from '../../types/search';
import SearchInput, { SearchInputRef } from './SearchInput';
import SearchDropdown from './SearchDropdown';
import { useFilteredSearch } from '../../hooks/useSearch';

interface SearchAnythingProps {
  className?: string;
  placeholder?: string;
  maxResults?: number;
  showTabs?: boolean;
}

const SearchAnything: React.FC<SearchAnythingProps> = ({
  className = "",
  placeholder = "Enter Instagram Profile or Hashtag",
  maxResults = 50,
  showTabs = true
}) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'hashtag'>('profile');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState<SearchResultItemType | null>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isDropdownHover, setIsDropdownHover] = useState(false);
  const [isResultClicked, setIsResultClicked] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<SearchInputRef>(null);
  const searchQuery = useFilteredSearch(query, activeTab);

  const { data: results = [], isLoading, error, isError } = searchQuery;

  // Get app host from environment
  const appHost = (import.meta as any).env?.VITE_SOCIALCRAB_APP_URL
    ? String((import.meta as any).env.VITE_SOCIALCRAB_APP_URL).replace(/\/$/, "")
    : "http://localhost:3000";

  // Simplified focus preservation: Only restore focus after debounce completes
  useEffect(() => {
    // Only restore focus if:
    // 1. We were previously focused
    // 2. Loading just finished
    // 3. There's still a query (user hasn't cleared it)
    if (!isLoading && isInputFocused && query.trim()) {
      // Small delay to ensure DOM is ready after state updates
      const timer = setTimeout(() => {
        // Only restore if the input isn't already focused
        if (searchInputRef.current?.getInput() !== document.activeElement) {
          searchInputRef.current?.focus();
        }
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [isLoading, isInputFocused, query]);

  const handleSearchChange = useCallback((value: string) => {
    setQuery(value);
    if (value.trim()) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  }, []);

  const handleTabChange = useCallback((tab: 'profile' | 'hashtag') => {
    setActiveTab(tab);
    // Keep dropdown open if there's a query
    if (query.trim()) {
      setIsDropdownOpen(true);
    }
  }, [query]);

  const handleResultClick = useCallback((result: SearchResultItemType) => {
    // Set flag to prevent blur from closing dropdown
    setIsResultClicked(true);

    // Build detail URL: /search/{serviceName}/{hashtag|profile}/{name}?refresh=false&postCount=200
    const serviceName = result.platform; // e.g., instagram | twitter | tiktok
    const type = result.service; // 'profile' | 'hashtag'

    const name =
      type === 'profile'
        ? (result.data as SearchProfileData).username
        : (result.data as SearchHashtagData).hashtag;

    const encodedName = encodeURIComponent(name);
    const url = `${appHost}/search/${serviceName}/${type}/${encodedName}?refresh=false&postCount=200`;

    setSelectedResult(result);
    setIsDropdownOpen(false);

    // Reset the flag after a short delay
    setTimeout(() => setIsResultClicked(false), 100);

    // Open in new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [appHost]);

  const handleFallbackClick = useCallback((
    platform: 'instagram' | 'twitter' | 'tiktok',
    q: string,
    active: 'profile' | 'hashtag'
  ) => {
    const encodedQuery = encodeURIComponent(q);
    const url = `${appHost}/search/${platform}/${active}/${encodedQuery}?refresh=false&postCount=200`;
    setIsDropdownOpen(false);
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [appHost]);

  const handleInputFocus = useCallback(() => {
    setIsInputFocused(true);
    if (query.trim()) {
      setIsDropdownOpen(true);
    }
  }, [query]);

  const handleInputBlur = useCallback(() => {
    setIsInputFocused(false);
    // Only close dropdown if not hovering and no result was just clicked
    if (!isDropdownHover && !isResultClicked) {
      setIsDropdownOpen(false);
    }
  }, [isDropdownHover, isResultClicked]);

  // Memoized mouse event handlers
  const handleMouseEnter = useCallback(() => setIsDropdownHover(true), []);
  const handleMouseLeave = useCallback(() => setIsDropdownHover(false), []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Auto-open dropdown when results are available
  useEffect(() => {
    if (query.trim() && (results.length > 0 || isLoading || isError)) {
      setIsDropdownOpen(true);
    }
  }, [results.length, isLoading, isError, query]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const shouldShowDropdown = isDropdownOpen && (isInputFocused || isDropdownHover);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
    >
      <SearchInput
        ref={searchInputRef}
        value={query}
        onChange={handleSearchChange}
        placeholder={placeholder}
        isLoading={isLoading}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />

      {showTabs && shouldShowDropdown && (
        <SearchDropdown
          isOpen={shouldShowDropdown}
          results={results.slice(0, maxResults)}
          isLoading={isLoading}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onResultClick={handleResultClick}
          onFallbackClick={handleFallbackClick}
          query={query}
          error={error?.message || (isError ? 'Search failed' : null)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )}
    </div>
  );
};

export default SearchAnything;
