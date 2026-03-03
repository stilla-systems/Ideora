// Authentication utilities - Ready to connect to Supabase or your backend
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthSession {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Mock user database - Replace with actual backend/Supabase calls
const mockUsers: Record<string, { email: string; password: string; name: string }> = {};

export async function signUp(
  email: string,
  password: string,
  name: string
): Promise<{ user: User | null; error: string | null }> {
  // Validation
  if (!email || !password || !name) {
    return { user: null, error: 'All fields are required' };
  }

  if (password.length < 6) {
    return { user: null, error: 'Password must be at least 6 characters' };
  }

  // Check if user exists
  const existingUser = Object.values(mockUsers).find((u) => u.email === email);
  if (existingUser) {
    return { user: null, error: 'Email already registered' };
  }

  // Create user
  const userId = `user_${Date.now()}`;
  mockUsers[userId] = { email, password, name };

  // Store session
  const user: User = { id: userId, email, name };
  sessionStorage.setItem('stillatrends_user', JSON.stringify(user));
  sessionStorage.setItem('stillatrends_session', JSON.stringify(user));

  return { user, error: null };
}

export async function logIn(
  email: string,
  password: string
): Promise<{ user: User | null; error: string | null }> {
  // Validation
  if (!email || !password) {
    return { user: null, error: 'Email and password are required' };
  }

  // Find user
  const userEntry = Object.entries(mockUsers).find((entry) => entry[1].email === email);

  if (!userEntry) {
    return { user: null, error: 'Invalid email or password' };
  }

  const [userId, userData] = userEntry;

  // Check password
  if (userData.password !== password) {
    return { user: null, error: 'Invalid email or password' };
  }

  // Create session
  const user: User = { id: userId, email, name: userData.name };
  sessionStorage.setItem('stillatrends_user', JSON.stringify(user));
  sessionStorage.setItem('stillatrends_session', JSON.stringify(user));

  return { user, error: null };
}

export async function logOut(): Promise<void> {
  sessionStorage.removeItem('stillatrends_user');
  sessionStorage.removeItem('stillatrends_session');
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') {
    return null;
  }

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
