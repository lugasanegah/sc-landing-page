import axios from 'axios';
import {
  SearchResultItem,
  SearchApiResponse,
  SearchRequest,
  SearchProfileData,
  SearchHashtagData
} from '../types/search';

const API_BASE_URL = import.meta.env.VITE_SOCIALCRAB_APP_API_URL || 'http://localhost:3600';

// Utility functions for data validation
function isValidProfileData(data: SearchProfileData): boolean {
  if (!data || typeof data !== 'object') return false;
  const hasUsername = !!(data.username && typeof data.username === 'string' && data.username.trim());
  const hasFollowerData = typeof data.totalFollower === 'number' && data.totalFollower > 0;
  const hasProfilePicture = !!(data.profilePict && typeof data.profilePict === 'string' && data.profilePict.trim());
  return hasUsername && (hasFollowerData || hasProfilePicture);
}

function isValidHashtagData(data: SearchHashtagData): boolean {
  if (!data || typeof data !== 'object') return false;
  const hasHashtag = !!(data.hashtag && typeof data.hashtag === 'string' && data.hashtag.trim());
  const hasPostData = typeof data.totalPost === 'number' && data.totalPost > 0;
  return hasHashtag && hasPostData;
}

function isValidResultData(service: 'profile' | 'hashtag', data: SearchProfileData | SearchHashtagData): boolean {
  if (service === 'profile') {
    return isValidProfileData(data as SearchProfileData);
  } else {
    return isValidHashtagData(data as SearchHashtagData);
  }
}

// Main search function
async function executeSearch(request: SearchRequest): Promise<SearchResultItem[]> {
  try {
    const response = await axios.get<SearchApiResponse>(
      `${API_BASE_URL}/check-data?key=${encodeURIComponent(request.query)}`
    );

    if (!response.data.success) {
      console.warn('API returned unsuccessful response');
      return [];
    }

    const results: SearchResultItem[] = [];

    response.data.data.forEach(serviceData => {
      if (!serviceData || !Array.isArray(serviceData.data)) {
        console.warn('Invalid service data structure:', serviceData);
        return;
      }

      serviceData.data.forEach(platformData => {
        if (!platformData || !platformData.data || !platformData.platform) {
          console.warn('Invalid platform data structure:', platformData);
          return;
        }

        // Filter by type if specified
        if (request.type && serviceData.service !== request.type) {
          return;
        }

        if (isValidResultData(serviceData.service, platformData.data)) {
          results.push({
            service: serviceData.service,
            platform: platformData.platform,
            data: platformData.data
          });
        } else {
          console.log(`Filtered out invalid ${serviceData.service} result for ${platformData.platform}:`, platformData.data);
        }
      });
    });

    return results;
  } catch (error) {
    console.error('Error searching:', error);
    if (axios.isAxiosError(error)) {
      // Handle specific axios errors
      if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else if (error.response?.status === 404) {
        throw new Error('Search service temporarily unavailable.');
      } else if (error.code === 'ECONNABORTED') {
        throw new Error('Search timeout. Please try again.');
      }
    }
    throw new Error('Failed to search. Please try again later.');
  }
}

// Export search functions
export const searchProfiles = async (query: string): Promise<SearchResultItem[]> => {
  return executeSearch({ query: query.trim(), type: 'profile' });
};

export const searchHashtags = async (query: string): Promise<SearchResultItem[]> => {
  return executeSearch({ query: query.trim(), type: 'hashtag' });
};

export const searchCombined = async (query: string): Promise<SearchResultItem[]> => {
  return executeSearch({ query: query.trim() });
};

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}