/**
 * @file Custom hook for making API calls with caching and refetching capabilities.
 */

import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

/**
 * Configuration for an API request.
 */
interface ApiRequestConfig {
  /** The URL for the API request. */
  url: string;
  /** The HTTP method to use for the request. */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  /** The headers to include in the request. */
  headers?: Record<string, string>;
  /** The body of the request. */
  data?: Record<string, unknown> | BodyInit | null;
  /** The URL parameters to include in the request. */
  params?: Record<string, string | number | boolean>;
}

/**
 * The result of an API request made with the useApi hook.
 * @template T The expected type of the data returned by the API.
 */
interface UseApiResult<T> {
  /** The data returned by the API. */
  data: T | null;
  /** Whether the API request is currently in progress. */
  loading: boolean;
  /** Any error that occurred during the API request. */
  error: string | null;
  /** A function to refetch the data from the API. */
  refetch: () => void;
}

// Cache to store API responses
const apiCache = new Map<string, { data: any; timestamp: number }>();

/**
 * Creates a cache key for an API request based on its configuration.
 * @param config The configuration for the API request.
 * @returns A unique cache key for the request.
 */
const createCacheKey = (config: ApiRequestConfig): string => {
  const { url, method = 'GET', params = {}, data } = config;
  
  // Sort parameters for consistent cache key
  const sortedParams = Object.keys(params)
    .sort()
    .reduce((acc, key) => {
      acc[key] = params[key];
      return acc;
    }, {} as Record<string, string | number | boolean>);

  return `${method}:${url}?${JSON.stringify(sortedParams)}:${JSON.stringify(data)}`;
};

/**
 * A custom hook for making API calls with loading, error, and caching functionality.
 * @template T The expected type of the data returned by the API.
 * @param config The configuration for the API request.
 * @param skip Whether to skip the initial API request.
 * @returns An object containing the data, loading state, error, and a refetch function.
 */
export const useApi = <T>(config: ApiRequestConfig, skip: boolean = false): UseApiResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(!skip);
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
        if (cachedResult && Date.now() - cachedResult.timestamp < 300000) {
          setData(cachedResult.data);
          setLoading(false);
          return;
        } else {
          // Remove expired cache entry
          apiCache.delete(cacheKey);
        }
      }

      // Prepare axios options
      const axiosOptions: AxiosRequestConfig = {
        url: config.url,
        method: config.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...config.headers,
        },
        params: config.params,
        data: config.data,
      };

      // Make the API call
      const response = await axios(axiosOptions);

      const result = response.data;
      setData(result);

      // Cache the result
      apiCache.set(cacheKey, {
        data: result,
        timestamp: Date.now(),
      });
    } catch (err) {
      console.error('API Error:', err);
      if (axios.isAxiosError(err)) {
        setError(err.message || 'An error occurred while fetching data');
      } else if (err instanceof Error) {
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

  /**
   * A function to refetch the data from the API, bypassing the cache.
   */
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
 * Clears the entire API cache.
 */
export const clearApiCache = (): void => {
  apiCache.clear();
};

/**
 * Clears specific cache entries from the API cache based on a URL.
 * @param url The URL to clear from the cache.
 * @param method The HTTP method of the requests to clear from the cache.
 */
export const clearApiCacheByUrl = (url: string, method?: string): void => {
  for (const [key] of apiCache) {
    if (key.includes(url) && (method ? key.startsWith(method) : true)) {
      apiCache.delete(key);
    }
  }
};