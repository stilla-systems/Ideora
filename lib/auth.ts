// Authentication utilities — uses Supabase when configured, mock sessionStorage as fallback
import { supabase } from './supabase';

export interface User {
  id: string;
  email: string;
  name: string;
}

// In-memory mock store (lost on refresh — only used when Supabase is not configured)
const mockUsers: Record<string, { email: string; password: string; name: string }> = {};

export async function signUp(
  email: string,
  password: string,
  name: string
): Promise<{ user: User | null; error: string | null }> {
  if (!email || !password || !name) {
    return { user: null, error: 'All fields are required' };
  }
  if (password.length < 6) {
    return { user: null, error: 'Password must be at least 6 characters' };
  }

  // Use Supabase when configured
  if (supabase) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name, name } },
    });
    if (error) return { user: null, error: error.message };
    if (data.user) {
      const user: User = { id: data.user.id, email: data.user.email || email, name };
      return { user, error: null };
    }
    return { user: null, error: 'Sign up failed. Please try again.' };
  }

  // Mock fallback (no Supabase)
  const existingUser = Object.values(mockUsers).find((u) => u.email === email);
  if (existingUser) {
    return { user: null, error: 'Email already registered' };
  }
  const userId = `user_${Date.now()}`;
  mockUsers[userId] = { email, password, name };
  const user: User = { id: userId, email, name };
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('stillatrends_user', JSON.stringify(user));
    sessionStorage.setItem('stillatrends_session', JSON.stringify(user));
  }
  return { user, error: null };
}

export async function logIn(
  email: string,
  password: string
): Promise<{ user: User | null; error: string | null }> {
  if (!email || !password) {
    return { user: null, error: 'Email and password are required' };
  }

  // Use Supabase when configured
  if (supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { user: null, error: error.message };
    if (data.user) {
      const user: User = {
        id: data.user.id,
        email: data.user.email || email,
        name:
          data.user.user_metadata?.full_name ||
          data.user.user_metadata?.name ||
          email,
      };
      return { user, error: null };
    }
    return { user: null, error: 'Login failed. Please try again.' };
  }

  // Mock fallback (no Supabase)
  const userEntry = Object.entries(mockUsers).find(([, u]) => u.email === email);
  if (!userEntry) {
    return { user: null, error: 'Invalid email or password' };
  }
  const [userId, userData] = userEntry;
  if (userData.password !== password) {
    return { user: null, error: 'Invalid email or password' };
  }
  const user: User = { id: userId, email, name: userData.name };
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('stillatrends_user', JSON.stringify(user));
    sessionStorage.setItem('stillatrends_session', JSON.stringify(user));
  }
  return { user, error: null };
}

export async function logOut(): Promise<void> {
  if (supabase) {
    await supabase.auth.signOut();
  }
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('stillatrends_user');
    sessionStorage.removeItem('stillatrends_session');
  }
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const userStr = sessionStorage.getItem('stillatrends_user');
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}
