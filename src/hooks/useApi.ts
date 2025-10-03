import { useState, useEffect, useCallback } from 'react';

// Define the structure for API request configuration
interface ApiRequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: Record<string, unknown> | BodyInit | null;
  params?: Record<string, string | number | boolean>;
}

// Define the structure for the hook's return value
interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Cache to store API responses
const apiCache = new Map();

// Function to create cache key based on request configuration
const createCacheKey = (config: ApiRequestConfig): string => {
  const { url, method = 'GET', params = {}, body } = config;
  
  // Sort parameters for consistent cache key
  const sortedParams = Object.keys(params)
    .sort()
    .reduce((acc, key) => {
      acc[key] = params[key];
      return acc;
    }, {} as Record<string, string | number | boolean>);

  return `${method}:${url}?${JSON.stringify(sortedParams)}:${JSON.stringify(body)}`;
};

/**
 * Custom hook for making API calls with loading, error, and caching functionality
 * @param config API request configuration
 * @param skip Optional flag to skip the request
 * @returns Object containing data, loading state, error state, and refetch function
 */
export const useApi = <T>(config: ApiRequestConfig, skip: boolean = false): UseApiResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  // Function to make the API call
  const fetchData = useCallback(async () => {
    if (skip) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Create cache key
      const cacheKey = createCacheKey(config);

      // Check if result is already cached
      if (apiCache.has(cacheKey)) {
        const cachedResult = apiCache.get(cacheKey);
        // Use cached value for 5 minutes (300000ms)
        if (Date.now() - cachedResult.timestamp < 300000) {
          setData(cachedResult.data);
          setLoading(false);
          return;
        } else {
          // Remove expired cache entry
          apiCache.delete(cacheKey);
        }
      }

      // Construct the URL with query parameters
      const url = new URL(config.url, window.location.origin);
      
      // Add parameters to the URL
      if (config.params) {
        Object.entries(config.params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            url.searchParams.append(key, String(value));
          }
        });
      }

      // Prepare fetch options
      const fetchOptions: RequestInit = {
        method: config.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...config.headers,
        },
      };

      // Add body for non-GET requests
      if (config.method && !['GET', 'HEAD'].includes(config.method) && config.body) {
        fetchOptions.body = JSON.stringify(config.body);
      }

      // Make the API call
      const response = await fetch(url.toString(), fetchOptions);

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);

      // Cache the result
      apiCache.set(cacheKey, {
        data: result,
        timestamp: Date.now(),
      });
    } catch (err) {
      console.error('API Error:', err);
      if (err instanceof Error) {
        setError(err.message || 'An error occurred while fetching data');
      } else {
        setError('An error occurred while fetching data');
      }
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [config, skip]);

  // Execute the API call when dependencies change
  useEffect(() => {
    fetchData();
  }, [fetchData, refreshTrigger]);

  // Function to refetch data (bypassing cache)
  const refetch = useCallback(() => {
    // Remove cached entry if exists
    const cacheKey = createCacheKey(config);
    apiCache.delete(cacheKey);
    // Trigger a new fetch by changing the refresh trigger
    setRefreshTrigger(prev => prev + 1);
  }, [config]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};

/**
 * Function to clear the API cache
 */
export const clearApiCache = (): void => {
  apiCache.clear();
};

/**
 * Function to clear specific cache entries
 * @param url URL to clear from cache
 * @param method HTTP method (optional)
 */
export const clearApiCacheByUrl = (url: string, method?: string): void => {
  for (const [key] of apiCache) {
    if (key.includes(url) && (method ? key.startsWith(method) : true)) {
      apiCache.delete(key);
    }
  }
};