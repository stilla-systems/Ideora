'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        if (!supabase) {
          // Fallback: check sessionStorage for mock auth user
          if (typeof window !== 'undefined') {
            const storedUser = sessionStorage.getItem('ideora_user');
            if (storedUser) {
              const parsed = JSON.parse(storedUser);
              setUser({ id: parsed.id, email: parsed.email, name: parsed.name || parsed.email });
            }
          }
          setIsLoading(false);
          return;
        }

        const { data: { user: currentUser } } = await supabase.auth.getUser();
        if (currentUser) {
          setUser({
            id: currentUser.id,
            email: currentUser.email || '',
            name: (
              currentUser.user_metadata?.full_name ||
              currentUser.user_metadata?.name ||
              currentUser.email ||
              'User'
            ),
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log('[Auth] Error checking session:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    if (!supabase) return;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (_event: any, session: any) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: (
              session.user.user_metadata?.full_name ||
              session.user.user_metadata?.name ||
              session.user.email ||
              'User'
            ),
          });
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      if (supabase) {
        await supabase.auth.signOut();
      } else if (typeof window !== 'undefined') {
        sessionStorage.removeItem('ideora_user');
        sessionStorage.removeItem('ideora_session');
      }
      setUser(null);
    } catch (error) {
      console.log('[Auth] Error logging out:', error);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isLoading,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
