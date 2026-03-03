'use client';

import { useEffect, useState } from 'react';
import { getTrendsForUser, getUserPreferences } from '@/lib/supabase-auth';
import { useAuth } from '@/lib/auth-context';

interface Trend {
  id: string;
  title: string;
  description: string;
  category: string;
  platform: string;
  relevance_score: number;
  created_at: string;
}

interface Preferences {
  id: string;
  user_id: string;
  platforms: string[];
  categories: string[];
  frequency: string;
  email_notifications: boolean;
  updated_at: string;
}

/**
 * Hook to fetch trends for authenticated user
 */
export function useTrends() {
  const { user, isLoading } = useAuth();
  const [trends, setTrends] = useState<Trend[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || isLoading) return;

    const fetchTrends = async () => {
      setIsFetching(true);
      try {
        const data = await getTrendsForUser(user.id);
        setTrends(data);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
        setTrends([]);
      } finally {
        setIsFetching(false);
      }
    };

    fetchTrends();
  }, [user, isLoading]);

  return { trends, isFetching, error };
}

/**
 * Hook to fetch user preferences
 */
export function useUserPreferences() {
  const { user, isLoading } = useAuth();
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || isLoading) return;

    const fetchPreferences = async () => {
      setIsFetching(true);
      try {
        const data = await getUserPreferences(user.id);
        setPreferences(data);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
        setPreferences(null);
      } finally {
        setIsFetching(false);
      }
    };

    fetchPreferences();
  }, [user, isLoading]);

  return { preferences, isFetching, error };
}

/**
 * Hook to handle async operations with loading and error states
 */
export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate = true
) {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const execute = async () => {
    setStatus('pending');
    setData(null);
    setError(null);

    try {
      const response = await asyncFunction();
      setData(response);
      setStatus('success');
      return response;
    } catch (err) {
      setError(err as Error);
      setStatus('error');
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate]);

  return { execute, status, data, error };
}

/**
 * Hook to debounce values
 */
export function useDebounce<T>(value: T, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
