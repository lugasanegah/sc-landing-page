// Search types for the SearchAnything component

export interface SearchProfileData {
  username: string;
  profilePict?: string;
  totalFollower?: number;
}

export interface SearchHashtagData {
  hashtag: string;
  totalPost?: number;
}

export interface SearchResultItem {
  service: 'profile' | 'hashtag';
  platform: 'instagram' | 'twitter' | 'tiktok';
  data: SearchProfileData | SearchHashtagData;
}

export interface SearchServiceData {
  service: 'profile' | 'hashtag';
  data: {
    platform: 'instagram' | 'twitter' | 'tiktok';
    data: SearchProfileData | SearchHashtagData;
  }[];
}

export interface SearchApiResponse {
  success: boolean;
  data: SearchServiceData[];
}

export interface SearchRequest {
  query: string;
  type?: 'profile' | 'hashtag';
}

export interface SearchState {
  query: string;
  activeTab: 'profile' | 'hashtag';
  isDropdownOpen: boolean;
  selectedResult: SearchResultItem | null;
  isInputFocused: boolean;
  isDropdownHover: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface SearchHookResult {
  data: SearchResultItem[];
  isLoading: boolean;
  error: Error | null;
  isError: boolean;
  refetch: () => void;
  results: SearchResultItem[];
  search: () => void;
  clearResults: () => void;
}