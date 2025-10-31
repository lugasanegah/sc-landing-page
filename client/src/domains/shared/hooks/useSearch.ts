import { useState, useEffect, useCallback, useRef } from 'react';
import { SearchResultItem, SearchHookResult } from '../types/search';
import { searchProfiles, searchHashtags, searchCombined } from '../api/search';

export const useSearch = (
  query: string,
  type: 'profile' | 'hashtag' | 'combined' = 'combined'
): SearchHookResult => {
  const [data, setData] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isError, setIsError] = useState(false);

  const performSearch = useCallback(async (searchQuery: string, searchType: typeof type) => {
    if (!searchQuery.trim()) {
      setData([]);
      setIsLoading(false);
      setError(null);
      setIsError(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setIsError(false);

    try {
      let results: SearchResultItem[] = [];

      switch (searchType) {
        case 'profile':
          results = await searchProfiles(searchQuery);
          break;
        case 'hashtag':
          results = await searchHashtags(searchQuery);
          break;
        case 'combined':
          results = await searchCombined(searchQuery);
          break;
      }

      setData(results);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      setIsError(true);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // React-based debounce implementation
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedSearch = useCallback((searchQuery: string, searchType: typeof type) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      performSearch(searchQuery, searchType);
    }, 300);
  }, [performSearch]);

  useEffect(() => {
    debouncedSearch(query, type);

    // Cleanup on unmount or when dependencies change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, type, debouncedSearch]);

  return {
    data,
    isLoading,
    error,
    isError,
    refetch: () => performSearch(query, type),
    results: data,
    search: () => performSearch(query, type),
    clearResults: () => {
      setData([]);
      setError(null);
      setIsError(false);
    }
  };
};

export const useFilteredSearch = (
  query: string,
  serviceType: 'profile' | 'hashtag'
) => {
  const { data, ...rest } = useSearch(query, 'combined');

  const filteredData = data.filter(item => item.service === serviceType);

  return {
    ...rest,
    data: filteredData,
    results: filteredData
  };
};