import { supabase } from './supabase';

export async function signUpWithSupabase(
  email: string,
  password: string,
  name: string
) {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    if (authData.user) {
      const { error: userError } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user.id,
            email,
            name,
          },
        ]);

      if (userError) throw userError;
    }

    return { user: authData.user, error: null };
  } catch (error) {
    return { user: null, error: (error as Error).message };
  }
}

export async function logInWithSupabase(
  email: string,
  password: string
) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return { user: data.user, error: null };
  } catch (error) {
    return { user: null, error: (error as Error).message };
  }
}

export async function logOutFromSupabase() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function getCurrentUserFromSupabase() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.log('[v0] Error fetching current user:', error);
    return null;
  }
}

export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.log('[v0] Error fetching user profile:', error);
    return null;
  }
}

export async function getTrendsForUser(userId: string) {
  try {
    const { data, error } = await supabase
      .from('trends')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.log('[v0] Error fetching trends:', error);
    return [];
  }
}

export async function getUserPreferences(userId: string) {
  try {
    const { data, error } = await supabase
      .from('preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  } catch (error) {
    console.log('[v0] Error fetching preferences:', error);
    return null;
  }
}

export async function updateUserPreferences(
  userId: string,
  preferences: {
    platforms?: string[];
    categories?: string[];
    frequency?: string;
    email_notifications?: boolean;
  }
) {
  try {
    const existingPrefs = await getUserPreferences(userId);

    if (existingPrefs) {
      const { error } = await supabase
        .from('preferences')
        .update(preferences)
        .eq('user_id', userId);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('preferences')
        .insert([
          {
            user_id: userId,
            ...preferences,
          },
        ]);
      if (error) throw error;
    }

    return { error: null };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
