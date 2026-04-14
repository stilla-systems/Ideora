// User preferences - Store platform and niche selections
export interface UserPreferences {
  userId: string;
  selectedPlatforms: string[];
  selectedNiches: string[];
  updateFrequency: 'daily' | 'weekly' | 'monthly';
  emailNotifications: boolean;
}

const STORAGE_KEY = 'ideora_preferences';

export function getUserPreferences(userId: string): UserPreferences {
  if (typeof window === 'undefined') {
    return {
      userId,
      selectedPlatforms: [],
      selectedNiches: [],
      updateFrequency: 'daily',
      emailNotifications: true,
    };
  }

  try {
    const stored = sessionStorage.getItem(`${STORAGE_KEY}_${userId}`);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading preferences:', error);
  }

  return {
    userId,
    selectedPlatforms: ['TikTok', 'YouTube'],
    selectedNiches: ['Entertainment'],
    updateFrequency: 'daily',
    emailNotifications: true,
  };
}

export function saveUserPreferences(preferences: UserPreferences): void {
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.setItem(`${STORAGE_KEY}_${preferences.userId}`, JSON.stringify(preferences));
  } catch (error) {
    console.error('Error saving preferences:', error);
  }
}

export function updateUserPlatforms(userId: string, platforms: string[]): void {
  const prefs = getUserPreferences(userId);
  prefs.selectedPlatforms = platforms;
  saveUserPreferences(prefs);
}

export function updateUserNiches(userId: string, niches: string[]): void {
  const prefs = getUserPreferences(userId);
  prefs.selectedNiches = niches;
  saveUserPreferences(prefs);
}
